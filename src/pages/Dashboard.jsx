import { useState, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  Calculator, 
  TrendingUp, 
  Download, 
  Mail, 
  Crown,
  Lightbulb,
  List,
  BarChart3,
  Youtube,
  Instagram as InstagramIcon,
  Twitter,
  Mic,
  Sparkles,
  Lock,
  Edit2,
  DollarSign,
  Settings,
  HelpCircle,
  Trash2,
  RefreshCcw,
  Eye,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useCurrency } from '../context/CurrencyContext.jsx'
import { useNotifications } from '../context/NotificationsContext'
import { supabase } from '../lib/supabase'
import { EmailTemplates, MediaKitButton, UpdateFinalPriceModal } from '../components/Premium'
import UpcomingRenewals from '../components/Premium/UpcomingRenewals'
import PersonalizedInsights from '../components/Premium/PersonalizedInsights'
import CalculationDetailsModal from '../components/Premium/CalculationDetailsModal'
import BusinessDashboard from '../components/BusinessDashboard'
import HelpBubble from '../components/HelpBubble'
import PremiumCalculatorForm from '../components/Calculator/PremiumCalculatorForm'
import PremiumResultCard from '../components/Calculator/PremiumResultCard'
import FreeCalculatorForm from '../components/Calculator/FreeCalculatorForm'
import { calculateFullPrice, evaluateOffer } from '../lib/calculatePrice'
import { calculateRateResult } from '../utils/calculateData'

const FREE_MONTHLY_LIMIT = 2
import { PageGradient } from '../components/Layout/PageGradient'
import { ResponsiveContainer, AreaChart, Area, ComposedChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

function Dashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading, isPremium, subscription } = useAuth()
  const { formatPrice, currencySymbol } = useCurrency()

  // Bloquer tout le rendu tant que l'auth + abonnement ne sont pas chargés (évite le flash Free pour les Pro)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    )
  }

  const [calculations, setCalculations] = useState([])
  const [stats, setStats] = useState({ total: 0, thisMonth: 0, avgRate: 0, negGain: 0 })
  const [calculationsLoading, setCalculationsLoading] = useState(true)
  const [isEmailTemplatesOpen, setIsEmailTemplatesOpen] = useState(false)
  const [initialEmailTemplateIndex, setInitialEmailTemplateIndex] = useState(null)
  const [activeChart, setActiveChart] = useState('revenue') // dépend du contexte (all vs platform)
  
  // Calculator state
  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  // History view state
  const [viewMode, setViewMode] = useState('list') // 'list' or 'chart'
  const [platformFilter, setPlatformFilter] = useState('all')
  const [showEstimates, setShowEstimates] = useState(true)
  const [showFinals, setShowFinals] = useState(false)
  const [showBrandOffer, setShowBrandOffer] = useState(true)
  
  // Final price modal state
  const [isFinalPriceModalOpen, setIsFinalPriceModalOpen] = useState(false)
  const [selectedCalculation, setSelectedCalculation] = useState(null)
  // Details modal state
  const [detailsModalOpen, setDetailsModalOpen] = useState(false)
  const [viewCalculation, setViewCalculation] = useState(null)

  // Tabs: calculator vs business (conformité & contrats)
  const [activeTab, setActiveTab] = useState('calculator')

  // Filtre de période global (affecte graphiques, listes, estimations)
  const [dateRange, setDateRange] = useState('365')

  // Clients + deals pour les alertes de conformité (seuil légal 1 000 €)
  const [complianceClients, setComplianceClients] = useState([])

  const { setRenewals, setNotifications } = useNotifications()

  const LEGAL_THRESHOLD_CENTIMES = 100000 // 1 000 €
  const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000

  // Renouvellements : calculs dont la date de fin de partenariat est dans les 7 prochains jours (même logique que UpcomingRenewals)
  const renewalsFromCalculations = useMemo(() => {
    if (!Array.isArray(calculations)) return []
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return calculations
      .filter((calc) => {
        if (!calc.partnership_end_date) return false
        const endDate = new Date(calc.partnership_end_date)
        endDate.setHours(0, 0, 0, 0)
        const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
        return diffDays >= 0 && diffDays <= 7
      })
      .sort((a, b) => new Date(a.partnership_end_date) - new Date(b.partnership_end_date))
  }, [calculations])

  // Notifications dérivées des renouvellements (texte dynamique avec délai restant)
  const derivedNotifications = useMemo(() => {
    return renewalsFromCalculations.map((r) => {
      const daysLeft = Math.ceil((new Date(r.partnership_end_date) - new Date()) / (1000 * 60 * 60 * 24))
      const brandName = (r.platform && String(r.platform).trim()) ? String(r.platform).trim() : 'Client'
      return {
        id: r.id,
        type: 'renewal',
        title: 'Partenariat à renouveler',
        description: `Collaboration avec « ${brandName} » arrive à échéance dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}.`,
      }
    })
  }, [renewalsFromCalculations])

  // Alertes de conformité : marques >= 1 000 € sur 12 mois avec au moins un deal en brouillon (draft)
  const legalDraftNotifications = useMemo(() => {
    const oneYearAgo = new Date(Date.now() - ONE_YEAR_MS)
    const dateStr = oneYearAgo.toISOString().slice(0, 10)
    return (complianceClients || [])
      .filter((client) => {
        const deals = client.deals || []
        const dealsInYear = deals.filter((d) => d.contract_date && String(d.contract_date).slice(0, 10) >= dateStr)
        const totalCentimes = dealsInYear.reduce((sum, d) => sum + (Number(d?.total_deal_value) || 0), 0)
        const hasDraft = deals.some((d) => d?.status === 'draft' || d?.status === 'brouillon')
        return totalCentimes >= LEGAL_THRESHOLD_CENTIMES && hasDraft
      })
      .map((client) => ({
        id: `legal-draft-${client.id}`,
        type: 'legal',
        title: 'Contrat obligatoire en attente',
        description: `La marque « ${(client.company_name && String(client.company_name).trim()) || 'Client'} » a franchi le seuil des 1 000 €. Vous avez des missions en brouillon nécessitant un contrat.`,
      }))
  }, [complianceClients])

  useEffect(() => {
    setRenewals(renewalsFromCalculations)
    setNotifications([...derivedNotifications, ...legalDraftNotifications])
  }, [renewalsFromCalculations, derivedNotifications, legalDraftNotifications, setRenewals, setNotifications])

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login')
    }
  }, [user, loading, navigate])

  // Ouverture auto de la modale si arrivée depuis la Home avec un calcul (state.openedCalculation)
  useEffect(() => {
    const opened = location.state?.openedCalculation
    if (!opened || !user) return
    setViewCalculation(opened)
    setDetailsModalOpen(true)
    navigate(location.pathname, { replace: true })
  }, [location.state?.openedCalculation, location.pathname, user, navigate])

  // Fetch calculations
  useEffect(() => {
    const fetchCalculations = async () => {
      if (!user) return
      
      try {
        if (!supabase) {
          console.warn('Supabase not available')
          setCalculations([])
          setCalculationsLoading(false)
          return
        }

        const { data, error } = await supabase
          .from('calculations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching calculations:', error)
          setCalculations([])
        } else {
          setCalculations(data || [])
          calculateStats(data || [])
        }
      } catch (err) {
        console.error('Error fetching calculations:', err)
        setCalculations([])
      } finally {
        setCalculationsLoading(false)
      }
    }

    if (user) {
      fetchCalculations()
    } else {
      setCalculationsLoading(false)
    }
  }, [user])

  // Fetch clients + deals pour les alertes de conformité (seuil 1 000 € / brouillon)
  useEffect(() => {
    if (!user?.id || !supabase) return
    let mounted = true
    supabase
      .from('clients')
      .select('*, deals(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!mounted) return
        if (!error && data) setComplianceClients(data)
        else setComplianceClients([])
      })
    return () => { mounted = false }
  }, [user?.id])

  // Flux "pending calculation" : après signup depuis la Home, ouvrir la modale avec le résultat
  useEffect(() => {
    const raw = sessionStorage.getItem('pending_calculation_inputs')
    if (!raw) return
    try {
      const inputs = JSON.parse(raw)
      const result = calculateRateResult(inputs)
      if (!result) return
      const formatted = {
        id: 'pending-' + Date.now(),
        created_at: new Date().toISOString(),
        platform: inputs.platform,
        niche: inputs.niche,
        subscribers: inputs.subscribers,
        average_views: inputs.averageViews ?? inputs.average_views,
        engagement_rate: inputs.engagementRate ?? inputs.engagement_rate,
        content_type: inputs.contentType ?? inputs.content_type,
        company_size: inputs.companySize ?? inputs.company_size,
        audience_location: inputs.audienceLocation ?? inputs.audience_location,
        offered_price: inputs.offeredPrice != null && inputs.offeredPrice !== '' ? parseInt(inputs.offeredPrice, 10) : null,
        price_min: result.min,
        price_max: result.max,
        price_average: result.average,
        deal_status: null,
        final_negotiated_price: null,
      }
      setViewCalculation(formatted)
      setDetailsModalOpen(true)
      sessionStorage.removeItem('pending_calculation_inputs')
    } catch (e) {
      console.error('Failed to process pending calculation', e)
      sessionStorage.removeItem('pending_calculation_inputs')
    }
  }, [])

  const getNextMonthResetDate = () => {
    const next = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)
    return next.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }

  const usageCount = useMemo(() => {
    const now = new Date()
    return calculations.filter(c => {
      const d = new Date(c.created_at)
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    }).length
  }, [calculations])

  // Calculate stats (exclut les deals "declined")
  const calculateStats = (calcs) => {
    const activeCalcs = calcs.filter(c => c.deal_status !== 'declined')
    const total = activeCalcs.length

    // This month count
    const now = new Date()
    const thisMonthCount = activeCalcs.filter(calc => {
      const calcDate = new Date(calc.created_at)
      return calcDate.getMonth() === now.getMonth() && 
             calcDate.getFullYear() === now.getFullYear()
    }).length

    // Average rate
    const totalRate = activeCalcs.reduce((sum, calc) => {
      return sum + (calc.price_average || 0)
    }, 0)
    const avgRate = total > 0 ? Math.round(totalRate / total) : 0

    // Négotiation gain: somme des (final - offer) sur les deals actifs
    const negGain = activeCalcs.reduce((sum, calc) => {
      const offer = calc.offered_price || 0
      const finalPrice = calc.final_negotiated_price || calc.price_average || 0
      if (offer > 0 && finalPrice > offer) {
        return sum + (finalPrice - offer)
      }
      return sum
    }, 0)

    setStats({ total, thisMonth: thisMonthCount, avgRate, negGain })
  }
  
  // Handle opening final price modal
  const handleOpenFinalPriceModal = (calculation) => {
    setSelectedCalculation(calculation)
    setIsFinalPriceModalOpen(true)
  }

  // Handle opening calculation details modal
  const handleOpenDetails = (calculation) => {
    if (!calculation) return
    setViewCalculation(calculation)
    setDetailsModalOpen(true)
  }

  // Handle calculator submit
  const handleSubmit = async (data) => {
    if (!isPremium() && usageCount >= FREE_MONTHLY_LIMIT) return
    setIsCalculating(true)
    setFormData(data)

    if (!isPremium()) {
      if (!user || !supabase) {
        setIsCalculating(false)
        return
      }
      const offeredPriceValue = data.offeredPrice !== undefined && data.offeredPrice !== '' && data.offeredPrice !== null
        ? parseInt(data.offeredPrice, 10)
        : null
      const evaluation = evaluateOffer({
        ...data,
        offeredPrice: offeredPriceValue ?? 0,
      })
      const { calculatedPrice, verdict } = evaluation
      const cleanDate = !data.partnership_end_date || data.partnership_end_date === '' ? null : data.partnership_end_date
      try {
        const { data: inserted, error } = await supabase
          .from('calculations')
          .insert({
            user_id: user.id,
            platform: data.platform,
            niche: data.niche,
            subscribers: data.subscribers,
            average_views: data.averageViews,
            engagement_rate: data.engagementRate,
            content_type: data.contentType,
            company_size: data.companySize,
            audience_location: data.audienceLocation,
            partnership_end_date: cleanDate,
            offered_price: offeredPriceValue,
            price_min: calculatedPrice.min,
            price_max: calculatedPrice.max,
            price_average: calculatedPrice.average,
            verdict,
          })
          .select()
          .single()

        if (error) {
          console.error('Error saving calculation:', error)
          alert(t('alerts.error_saving_calculation') + ': ' + error.message)
          setIsCalculating(false)
          return
        }

        const { data: updatedData, error: refreshError } = await supabase
          .from('calculations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (!refreshError && updatedData) {
          setCalculations(updatedData)
          calculateStats(updatedData)
        }
        setViewCalculation(inserted)
        setDetailsModalOpen(true)
      } catch (err) {
        console.error('Failed to save Free calculation', err)
      }
      setIsCalculating(false)
      return
    }

    setTimeout(() => {
      const baseResult = calculateFullPrice(data)
      const calculatedResult = { ...baseResult, input: data }
      setResult(calculatedResult)
      setIsCalculating(false)
      saveCalculation(data, calculatedResult)
    }, 500)
  }

  // Save calculation
  const saveCalculation = async (data, calculatedResult) => {
    if (!user || !supabase) return

    try {
      // Nettoyer la date avant envoi (jamais de string vide)
      const cleanDate =
        !data.partnership_end_date || data.partnership_end_date === ''
          ? null
          : data.partnership_end_date

      // Nettoyer l'offre de la marque (offered_price)
      const offeredPriceValue =
        data.offeredPrice === undefined || data.offeredPrice === '' || data.offeredPrice === null
          ? null
          : parseInt(data.offeredPrice, 10)

      const { error } = await supabase.from('calculations').insert({
        user_id: user.id,
        platform: data.platform,
        niche: data.niche,
        subscribers: data.subscribers,
        average_views: data.averageViews,
        engagement_rate: data.engagementRate,
        content_type: data.contentType,
        company_size: data.companySize,
        audience_location: data.audienceLocation,
        partnership_end_date: cleanDate,
        offered_price: offeredPriceValue,
        price_min: calculatedResult.min,
        price_max: calculatedResult.max,
        price_average: calculatedResult.average,
        verdict: null,
      })

      if (error) {
        console.error('Error saving calculation:', error)
        alert(t('alerts.error_saving_calculation') + ': ' + error.message)
        return
      }
      
      // Refresh calculations
      const { data: updatedData, error: refreshError } = await supabase
        .from('calculations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
      
      if (refreshError) {
        console.error('Error refreshing calculations after save:', refreshError)
        return
      }

      if (updatedData) {
        setCalculations(updatedData)
        calculateStats(updatedData)
      }
    } catch (err) {
      console.error('Failed to save calculation:', err)
    }
  }

  // Reset calculator
  const handleReset = () => {
    setResult(null)
    setFormData(null)
  }

  // Toggle deal status (declined / active)
  const toggleDealStatus = async (calc) => {
    if (!user || !supabase) return

    const newStatus = calc.deal_status === 'declined' ? null : 'declined'

    try {
      const { error } = await supabase
        .from('calculations')
        .update({ deal_status: newStatus })
        .eq('id', calc.id)

      if (error) {
        console.error('Error updating deal status:', error)
        alert(t('alerts.error_updating_deal_status') + ': ' + error.message)
        return
      }

      // Mettre à jour le state local et les stats
      setCalculations(prev => {
        const updated = prev.map(c =>
          c.id === calc.id ? { ...c, deal_status: newStatus } : c
        )
        calculateStats(updated)
        return updated
      })
    } catch (err) {
      console.error('Failed to update deal status:', err)
    }
  }

  // Mise à jour du nom principal (marque / plateforme) depuis le widget renouvellements
  const handleUpdateRenewalName = async (calcId, newValue) => {
    if (!user?.id || !calcId) return
    const value = (newValue ?? '').trim() || null
    if (value == null) return
    try {
      const { error } = await supabase
        .from('calculations')
        .update({ platform: value })
        .eq('id', calcId)
        .eq('user_id', user.id)
      if (error) {
        console.error('Error updating renewal name (platform):', error)
        return
      }
      setCalculations(prev =>
        prev.map(c => (c.id === calcId ? { ...c, platform: value } : c))
      )
    } catch (err) {
      console.error('Failed to update renewal name:', err)
    }
  }

  // Handle chart click (works for both chart background and direct Dot click)
  const handleChartPointClick = (data) => {
    let calc = null

    // Case 1: click on chart area (Recharts sends state with activePayload)
    if (data && data.activePayload && data.activePayload.length > 0) {
      const item = data.activePayload[0].payload
      calc = item.payload || item
    }

    // Case 2: direct click on Dot (Recharts sends the payload directly)
    else if (data && (data.payload || data.id)) {
      calc = data.payload || data
    }

    if (calc && calc.id) {
      handleOpenDetails(calc)
    } else {
      console.log('Click detected but no valid calculation found in payload:', data)
    }
  }

  // Filter calculations by platform
  const filteredCalculations = platformFilter === 'all' 
    ? calculations 
    : calculations.filter(calc => calc.platform.toLowerCase() === platformFilter)

  // Ancien moteur d'insights remplacé par PersonalizedInsights

  // Réinitialiser l'onglet de graphique quand on change de plateforme
  useEffect(() => {
    if (platformFilter === 'all') {
      setActiveChart('revenue')
    } else {
      setActiveChart('rate')
    }
  }, [platformFilter])

  // Définition dynamique des onglets de graphiques selon la plateforme sélectionnée
  const isAllPlatforms = platformFilter === 'all'
  const chartTabs = isAllPlatforms
    ? [
        { id: 'revenue' },
        { id: 'velocity' },
        { id: 'gap' },
      ]
    : [
        { id: 'rate' },
        { id: 'efficiency' },
        { id: 'power' },
      ]

  // Données de graphiques basées sur les vraies calculs et le filtre plateforme
  const chartData = useMemo(() => {
    // Exclure les deals refusés des graphiques
    const activeCalcs = calculations.filter(c => c.deal_status !== 'declined')
    const sourceCalcs = isAllPlatforms
      ? activeCalcs
      : activeCalcs.filter(calc => calc.platform.toLowerCase() === platformFilter)

    if (!sourceCalcs?.length) {
      return {
        revenue: [],
        velocity: [],
        marketGap: [],
        rateTrend: [],
        valueEfficiency: [],
        negotiationPower: [],
      }
    }

    if (isAllPlatforms) {
      // Vue ALL : regrouper par mois (Revenue Potential, Deal Velocity, Market Gap)
      const monthlyMap = sourceCalcs.reduce((acc, curr) => {
        if (!curr.created_at) return acc
        const date = new Date(curr.created_at)
        if (Number.isNaN(date.getTime())) return acc

        const sortKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        const label = date.toLocaleString('default', { month: 'short', year: 'numeric' })

        if (!acc[sortKey]) {
          acc[sortKey] = {
            sortKey,
            label,
            sumAvg: 0,
            count: 0,
            sumOffered: 0,
            countOffered: 0,
          }
        }

        const avg = curr.price_average || 0
        const offered = curr.offered_price || 0

        acc[sortKey].sumAvg += avg
        acc[sortKey].count += 1

        if (offered > 0) {
          acc[sortKey].sumOffered += offered
          acc[sortKey].countOffered += 1
        }

        return acc
      }, {})

      const monthlyList = Object.values(monthlyMap).sort((a, b) =>
        a.sortKey.localeCompare(b.sortKey)
      )

      const revenue = monthlyList.map(m => ({
        name: m.label,
        value: Math.round(m.sumAvg), // somme des price_average
      }))

      const velocity = monthlyList.map(m => ({
        name: m.label,
        value: m.count, // nombre de deals
      }))

      const marketGap = monthlyList.map(m => ({
        name: m.label,
        offer:
          m.countOffered > 0
            ? Math.round(m.sumOffered / m.countOffered)
            : 0,
        fair:
          m.count > 0 ? Math.round(m.sumAvg / m.count) : 0,
      }))

      return {
        revenue,
        velocity,
        marketGap,
        rateTrend: [],
        valueEfficiency: [],
        negotiationPower: [],
      }
    }

    // Vue plateforme spécifique : chaque deal = un point (pas de regroupement par mois)
    // Tri strictement chronologique
    const sorted = [...sourceCalcs].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    )

    // Limiter aux 30 derniers deals pour ne pas surcharger
    const recent = sorted.slice(-30)

    const rateTrend = recent.map(calc => {
      const dateObj = new Date(calc.created_at)
      const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj
      const offered = calc.offered_price != null && Number(calc.offered_price) > 0 ? Number(calc.offered_price) : null

      return {
        timestamp: validDate.getTime(), // clé numérique pour l'axe X
        dateLabel: validDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }),
        fullDate: validDate.toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        value: calc.price_average || 0,
        finalValue: calc.final_negotiated_price || null,
        brandOffer: offered,
        tooltipLabel: calc.niche || 'Deal',
        payload: calc,
      }
    })

    const valueEfficiency = recent.map(calc => {
      const dateObj = new Date(calc.created_at)
      const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj

      const avg = calc.price_average || 0
      const subs = calc.subscribers || 0
      const eff = subs > 0 && avg > 0 ? (avg / subs) * 1000 : 0

      return {
        timestamp: validDate.getTime(),
        dateLabel: validDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }),
        fullDate: validDate.toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        value: Number(eff.toFixed(2)),
        tooltipLabel: calc.niche || 'Deal',
        payload: calc,
      }
    })

    const negotiationPower = recent.map(calc => {
      const dateObj = new Date(calc.created_at)
      const validDate = isNaN(dateObj.getTime()) ? new Date() : dateObj

      const avg = calc.price_average || 0
      const offer = calc.offered_price || 0
      let power = 0
      if (avg > 0 && offer > 0) {
        power = ((avg - offer) / avg) * 100
      }

      return {
        timestamp: validDate.getTime(),
        dateLabel: validDate.toLocaleDateString(undefined, { day: '2-digit', month: 'short' }),
        fullDate: validDate.toLocaleString(undefined, {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        value: Number(power.toFixed(1)),
        tooltipLabel: calc.niche || 'Deal',
        payload: calc,
      }
    })

    return {
      revenue: [],
      velocity: [],
      marketGap: [],
      rateTrend,
      valueEfficiency,
      negotiationPower,
    }
  }, [calculations, filteredCalculations, isAllPlatforms, platformFilter])

  // Show loading only while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">{t('dashboard.loading')}</p>
        </div>
      </div>
    )
  }

  // If no user after auth check, will redirect (but show nothing meanwhile)
  if (!user) {
    return null
  }

  // Check if user is premium
  if (!isPremium()) {
    return (
      <PageGradient>
        <Helmet>
          <title>{t('dashboard.page_title')}</title>
        </Helmet>
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.header.title')}</h1>
            <p className="text-gray-600">{t('dashboard.header.welcome', { name: user?.email || 'Creator' })}</p>
          </div>

          {/* Onglets + filtre période */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex justify-center gap-10 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`py-2 text-sm transition-colors ${
                  activeTab === 'calculator'
                    ? 'text-gray-900 font-semibold border-b-2 border-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t('dashboard.tabs.calculator')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('business')}
                className={`py-2 text-sm transition-colors ${
                  activeTab === 'business'
                    ? 'text-gray-900 font-semibold border-b-2 border-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t('dashboard.tabs.business')}
              </button>
            </div>
            <div className="flex-shrink-0">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-auto rounded-lg border border-gray-300 bg-white text-xs py-1.5 pl-2 pr-7 md:text-sm md:py-2 md:pl-3 md:pr-8 appearance-none shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="30">{t('dashboard.dateRange.30')}</option>
                <option value="90">{t('dashboard.dateRange.90')}</option>
                <option value="180">{t('dashboard.dateRange.180')}</option>
                <option value="270">{t('dashboard.dateRange.270')}</option>
                <option value="365">{t('dashboard.dateRange.365')}</option>
                <option value="all">{t('dashboard.dateRange.all')}</option>
              </select>
            </div>
          </div>

          {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GAUCHE : Calculateur (avec overlay si limite Free atteinte) */}
            <div className="relative bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h2 className="text-lg font-bold text-gray-900">{t('dashboard.sections.new_calculation')}</h2>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${usageCount >= FREE_MONTHLY_LIMIT ? 'text-orange-600' : 'text-green-600'}`}>
                    {t('dashboard.credits.remaining', { count: Math.max(0, FREE_MONTHLY_LIMIT - usageCount), limit: FREE_MONTHLY_LIMIT })}
                  </p>
                  <p className="text-xs text-gray-500">{t('dashboard.credits.reset_on', { date: getNextMonthResetDate() })}</p>
                </div>
              </div>
              <FreeCalculatorForm onSubmit={handleSubmit} />
              {usageCount >= FREE_MONTHLY_LIMIT && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-sm bg-white/90 z-10">
                  <div className="text-center max-w-sm px-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                      <Lock size={32} className="text-gray-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {t('dashboard.lock_overlay.title', { limit: FREE_MONTHLY_LIMIT })}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('dashboard.lock_overlay.reset_on', { date: getNextMonthResetDate() })}
                    </p>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    >
                      <Crown size={18} />
                      {t('dashboard.lock_overlay.upgrade')}
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* DROITE : Historique & Upgrade */}
            <div className="space-y-6">
              {/* Historique Simple */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-900">{t('dashboard.sections.recent_history')}</h2>
                {calculations?.length === 0 ? (
                  <p className="text-gray-500 text-sm">{t('dashboard.empty.no_calculations')}</p>
                ) : (
                  <ul className="space-y-3">
                    {calculations?.slice(0, 5).map(calc => (
                      <li
                        key={calc.id}
                        onClick={() => handleOpenDetails(calc)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleOpenDetails(calc)}
                        className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <span className="font-medium text-gray-900 block">{calc.platform}</span>
                          <span className="text-xs text-gray-500 block">{new Date(calc.created_at).toLocaleDateString()}</span>
                          <span className="text-sm font-bold text-gray-900 mt-0.5">
                            {calc.offered_price != null && calc.offered_price > 0 ? formatPrice(calc.offered_price) : t('dashboard.no_offer')}
                          </span>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          calc.verdict === 'GOOD' ? 'bg-green-100 text-green-700' : 
                          calc.verdict === 'ACCEPTABLE' ? 'bg-blue-100 text-blue-700' : 
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {calc.verdict?.replace(/_/g, ' ')}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* CTA Upgrade */}
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 shadow-sm">
                <h3 className="font-bold text-indigo-900 mb-2">{t('dashboard.upgrade_cta.title')}</h3>
                <p className="text-sm text-indigo-700 mb-4">
                  {t('dashboard.upgrade_cta.desc')}
                </p>
                <Link
                  to="/pricing"
                  className="inline-block w-full text-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  {t('dashboard.upgrade_cta.button')}
                </Link>
              </div>
            </div>
          </div>
          )}
          {activeTab === 'business' && (
            <div className="relative min-h-[400px]">
              <BusinessDashboard dateRange={dateRange} />
            </div>
          )}
        </div>

        <CalculationDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => {
            setDetailsModalOpen(false)
            setViewCalculation(null)
          }}
          calculation={viewCalculation}
          onOpenMediaKit={() => {}}
          onOpenEmail={() => {}}
        />

        <HelpBubble context="free" />
      </PageGradient>
    )
  }

  const helpContext = activeTab === 'calculator' ? 'pro-calculator' : 'pro-business'

  return (
    <PageGradient>
      <Helmet>
        <title>{t('dashboard.page_title')}</title>
        <meta name="description" content="Your WMR Dashboard" />
      </Helmet>

      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {t('dashboard.header.title')}
                </h1>
                <p className="text-gray-600 mt-1">
                  {t('dashboard.header.welcome', { name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || user?.email || 'Creator' })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Crown className="text-premium-600" size={24} />
                <span className="text-sm font-semibold text-premium-700">{t('dashboard.badge.premium')}</span>
              </div>
            </div>
          </div>

          {/* Onglets + filtre période */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex justify-center gap-10 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => setActiveTab('calculator')}
                className={`py-2 text-sm transition-colors ${
                  activeTab === 'calculator'
                    ? 'text-gray-900 font-semibold border-b-2 border-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t('dashboard.tabs.calculator')}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('business')}
                className={`py-2 text-sm transition-colors ${
                  activeTab === 'business'
                    ? 'text-gray-900 font-semibold border-b-2 border-black'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {t('dashboard.tabs.business')}
              </button>
            </div>
            <div className="flex-shrink-0">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-auto rounded-lg border border-gray-300 bg-white text-xs py-1.5 pl-2 pr-7 md:text-sm md:py-2 md:pl-3 md:pr-8 appearance-none shadow-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400"
              >
                <option value="30">{t('dashboard.dateRange.30')}</option>
                <option value="90">{t('dashboard.dateRange.90')}</option>
                <option value="180">{t('dashboard.dateRange.180')}</option>
                <option value="270">{t('dashboard.dateRange.270')}</option>
                <option value="365">{t('dashboard.dateRange.365')}</option>
                <option value="all">{t('dashboard.dateRange.all')}</option>
              </select>
            </div>
          </div>

          {activeTab === 'calculator' && (
          <>
          {/* Grid 2x2 Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* TOP LEFT - Calculator Form */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-premium-400">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="text-premium-600" size={24} />
                <h2 className="text-xl font-bold text-gray-900">
                  {t('dashboard.sections.calculate_rate')}
                </h2>
              </div>
              
              {!result ? (
                <PremiumCalculatorForm 
                  onSubmit={handleSubmit}
                  isLoading={isCalculating}
                />
              ) : (
                <div className="space-y-4">
                  <PremiumResultCard 
                    result={result}
                    formData={formData}
                    onReset={handleReset}
                  />
                </div>
              )}
            </div>

            {/* TOP RIGHT - Stats & History / Performance Analytics */}
            <div className="bg-white rounded-xl shadow-lg p-6 min-w-0 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {t('dashboard.sections.stats_history')}
                </h2>
                
                {/* Toggle List/Chart */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <List size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('chart')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'chart' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <BarChart3 size={20} />
                  </button>
                </div>
              </div>

              {/* Stats Cards - 2x2 sur mobile, 4 colonnes sur desktop */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 mb-6 w-full">
                <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-center overflow-hidden flex flex-col items-center justify-center">
                  <div className="text-xl md:text-2xl font-bold font-display text-gray-900 truncate w-full">{stats.total}</div>
                  <div className="text-xs text-gray-600">{t('dashboard.stats.total')}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-center overflow-hidden flex flex-col items-center justify-center">
                  <div className="text-xl md:text-2xl font-bold font-display text-gray-900 truncate w-full">{stats.thisMonth}</div>
                  <div className="text-xs text-gray-600">{t('dashboard.stats.this_month')}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 md:p-4 text-center overflow-hidden flex flex-col items-center justify-center">
                  <div className="text-xl md:text-2xl font-bold font-display text-gray-900 truncate w-full">{formatPrice(stats.avgRate)}</div>
                  <div className="text-xs text-gray-600">{t('dashboard.stats.avg_rate')}</div>
                </div>
                <div className="bg-white rounded-xl p-3 md:p-4 border border-gray-100 shadow-sm relative group overflow-hidden flex flex-col">
                  <div className="flex justify-between items-start shrink-0">
                    <span className="text-gray-500 text-xs font-medium uppercase tracking-wide">{t('dashboard.stats.neg_gain')}</span>
                    <div className="relative">
                      <HelpCircle className="w-4 h-4 text-green-500 cursor-help" />
                      <div className="absolute right-0 top-6 w-48 p-2 text-xs text-white bg-gray-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-xl">
                        {t('dashboard.stats.neg_gain_tooltip')}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1 min-w-0">
                    <span className={`text-xl md:text-2xl font-bold font-display truncate w-full ${stats.negGain > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                      {formatPrice(stats.negGain ?? 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Platform Filters - défilement horizontal sur mobile */}
              <div className="flex overflow-x-auto gap-2 pb-2 w-full mb-4 items-center">
                <button
                  onClick={() => setPlatformFilter('all')}
                  className={`shrink-0 whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    platformFilter === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {t('dashboard.filters.all')}
                </button>
                <button
                  onClick={() => setPlatformFilter('youtube')}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    platformFilter === 'youtube'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Youtube size={16} />
                  YouTube
                </button>
                <button
                  onClick={() => setPlatformFilter('instagram')}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    platformFilter === 'instagram'
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <InstagramIcon size={16} />
                  Instagram
                </button>
                <button
                  onClick={() => setPlatformFilter('tiktok')}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    platformFilter === 'tiktok'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Twitter size={16} />
                  TikTok
                </button>
                <button
                  onClick={() => setPlatformFilter('twitch')}
                  className={`shrink-0 whitespace-nowrap inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    platformFilter === 'twitch'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Mic size={16} />
                  Twitch
                </button>
              </div>

              {/* List or Chart View */}
              {viewMode === 'list' ? (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {calculationsLoading ? (
                    <div className="text-center py-8 text-gray-500">{t('dashboard.loading')}</div>
                  ) : filteredCalculations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      {t('dashboard.empty.no_calculations_filter')}
                    </div>
                  ) : (
                      filteredCalculations.slice(0, 10).map((calc, index) => (
                      <div 
                        key={index}
                        className={`group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors ${calc.deal_status === 'declined' ? 'opacity-60 line-through' : ''}`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 capitalize">
                              {calc.platform} • {calc.niche}
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(calc.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-bold text-gray-900">
                              {formatPrice(calc.price_min)} - {formatPrice(calc.price_max)}
                            </div>
                            <div className="text-sm text-gray-600">
                              Avg: {formatPrice(calc.price_average)}
                            </div>
                            
                            {/* Final Negotiated Price Section + Lost Deal toggle */}
                            {isPremium() ? (
                              <div className="mt-2 flex items-center justify-end gap-3">
                                {calc.final_negotiated_price ? (
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm font-semibold text-green-700">
                                      Final: {formatPrice(calc.final_negotiated_price)}
                                    </div>
                                    <button
                                      onClick={() => handleOpenFinalPriceModal(calc)}
                                      className="text-primary-600 hover:text-primary-700 transition-colors"
                                      title={t('dashboard.edit_final_price')}
                                    >
                                      <Edit2 size={14} />
                                    </button>
                                  </div>
                                ) : (
<button
                                      onClick={() => handleOpenFinalPriceModal(calc)}
                                      className="text-xs text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 transition-colors"
                                    >
                                      <DollarSign size={14} />
                                      {t('dashboard.actions.update_final_price')}
                                    </button>
                                )}

                                {/* Lost / Restore Deal */}
                                <button
                                  onClick={() => toggleDealStatus(calc)}
                                  className={`text-xs font-medium flex items-center gap-1 transition-colors ${
                                    calc.deal_status === 'declined'
                                      ? 'text-gray-500 hover:text-gray-700'
                                      : 'text-red-500 hover:text-red-700'
                                  }`}
                                  title={calc.deal_status === 'declined' ? 'Restore deal' : 'Mark as Lost/Declined'}
                                >
                                  {calc.deal_status === 'declined' ? (
                                    <>
                                      <RefreshCcw size={14} />
                                      {t('dashboard.actions.restore')}
                                    </>
                                  ) : (
                                    <>
                                      <Trash2 size={14} />
                                      {t('dashboard.actions.lost')}
                                    </>
                                  )}
                                </button>

                                {/* View Details */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    console.log('Click View')
                                    e.stopPropagation()
                                    handleOpenDetails(calc)
                                  }}
                                  className="relative z-20 text-xs text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1 transition-colors cursor-pointer"
                                  title={t('dashboard.view_calculation_details')}
                                  style={{ pointerEvents: 'auto' }}
                                >
                                  <Eye size={14} />
                                  {t('dashboard.actions.view')}
                                </button>
                              </div>
                            ) : (
                              <div className="mt-2 relative group">
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                  <Lock size={12} />
                                  <span>{t('dashboard.actions.track_negotiation')}</span>
                                </div>
                                <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                                  {t('dashboard.actions.track_negotiation_tooltip')}
                                  <div className="absolute top-full right-4 border-4 border-transparent border-t-gray-900"></div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ) : (
                <div className="mt-4">
                  {calculationsLoading ? (
                    <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                      {t('dashboard.loading_analytics')}
                    </div>
                  ) : !calculations.length ? (
                    <div className="bg-gray-50 rounded-lg p-8 text-center text-gray-500">
                      {t('dashboard.empty.no_data')}
                    </div>
                  ) : filteredCalculations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-100 rounded-lg bg-gray-50/50">
                      <BarChart3 className="w-8 h-8 text-gray-300 mb-2" />
                      <p className="text-sm font-medium text-gray-400">{t('dashboard.empty.no_calculations_filter')}</p>
                      <button 
                        onClick={() => setPlatformFilter('all')}
                        className="mt-2 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        {t('dashboard.empty.clear_filter')}
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Chart Tabs dynamiques */}
                      <div className="flex items-center gap-2 mb-4">
                        {chartTabs.map(tab => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveChart(tab.id)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                              activeChart === tab.id
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {t(`dashboard.chart_tabs.${tab.id}`)}
                          </button>
                        ))}
                      </div>

                      {/* Toggles for Base Rate vs Final Price vs Brand Offer (Rate Trend) */}
                      {!isAllPlatforms && activeChart === 'rate' && (
                        <div className="flex flex-wrap gap-4 mb-2 justify-end">
                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showEstimates}
                              onChange={e => setShowEstimates(e.target.checked)}
                              className="rounded text-amber-500 focus:ring-amber-500"
                            />
                            <span className="text-gray-600">{t('dashboard.chart_labels.recommended_rate')}</span>
                          </label>
                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showFinals}
                              onChange={e => setShowFinals(e.target.checked)}
                              className="rounded text-emerald-500 focus:ring-emerald-500"
                            />
                            <span className="text-gray-600">{t('dashboard.chart_labels.final_price')}</span>
                          </label>
                          <label className="flex items-center gap-2 text-xs cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showBrandOffer}
                              onChange={e => setShowBrandOffer(e.target.checked)}
                              className="rounded text-gray-600 focus:ring-gray-500"
                            />
                            <span className="text-gray-600">{t('dashboard.chart_labels.brand_offer')}</span>
                          </label>
                        </div>
                      )}

                      <div className="h-96">
                        {/* Contexte ALL : Revenue / Velocity / Market Gap */}
                        {isAllPlatforms && activeChart === 'revenue' && (
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            className="cursor-pointer outline-none focus:outline-none"
                          >
                            <BarChart
                              data={chartData.revenue}
                              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                              onClick={handleChartPointClick}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis dataKey="name" interval="preserveStartEnd" tick={{ fontSize: 12, fill: '#6b7280' }} />
                              <YAxis
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                tickFormatter={(value) => formatPrice(value)}
                              />
                              <Tooltip
                                formatter={(value) => [
                                  formatPrice(value),
                                  'Revenue Potential',
                                ]}
                                contentStyle={{
                                  borderRadius: '8px',
                                  border: '1px solid #e5e7eb',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                  fontSize: 12,
                                }}
                                wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                              />
                              <Bar
                                dataKey="value"
                                fill="#f59e0b"
                                barSize={50}
                                radius={[4, 4, 0, 0]}
                                cursor="pointer"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        )}

                        {isAllPlatforms && activeChart === 'velocity' && (
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            className="cursor-pointer outline-none focus:outline-none"
                          >
                            <BarChart
                              data={chartData.velocity}
                              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                              onClick={handleChartPointClick}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis dataKey="name" interval="preserveStartEnd" tick={{ fontSize: 12, fill: '#6b7280' }} />
                              <YAxis
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                allowDecimals={false}
                              />
                              <Tooltip
                                formatter={(value) => [
                                  `${Number(value).toLocaleString()} deals`,
                                  'Deal Velocity',
                                ]}
                                contentStyle={{
                                  borderRadius: '8px',
                                  border: '1px solid #e5e7eb',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                  fontSize: 12,
                                }}
                                wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                              />
                              <Bar
                                dataKey="value"
                                fill="#6366f1"
                                barSize={50}
                                radius={[4, 4, 0, 0]}
                                cursor="pointer"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        )}

                        {isAllPlatforms && activeChart === 'gap' && (
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            className="cursor-pointer outline-none focus:outline-none"
                          >
                            <AreaChart
                              data={chartData.marketGap}
                              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                              onClick={handleChartPointClick}
                            >
                              <defs>
                                <linearGradient id="colorOffer" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorFair" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis dataKey="name" interval="preserveStartEnd" tick={{ fontSize: 12, fill: '#6b7280' }} />
                              <YAxis
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                tickFormatter={(value) => formatPrice(value)}
                              />
                              <Tooltip
                                formatter={(value, key) => [
                                  formatPrice(value),
                                  key === 'offer' ? t('dashboard.chart_labels.brand_offer') : t('dashboard.chart_labels.fair_value'),
                                ]}
                                contentStyle={{
                                  borderRadius: '8px',
                                  border: '1px solid #e5e7eb',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                  fontSize: 12,
                                }}
                                wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                              />
                              <Legend
                                wrapperStyle={{ fontSize: 12 }}
                                formatter={(value) =>
                                  value === 'offer' ? t('dashboard.chart_labels.brand_offer') : t('dashboard.chart_labels.fair_value')
                                }
                              />
                              <Area
                                type="linear"
                                dataKey="offer"
                                stroke="#ef4444"
                                strokeWidth={2}
                                fill="url(#colorOffer)"
                                dot={{ r: 3 }}
                                activeDot={{ r: 5, style: { cursor: 'pointer' } }}
                              />
                              <Area
                                type="linear"
                                dataKey="fair"
                                stroke="#10b981"
                                strokeWidth={2}
                                fill="url(#colorFair)"
                                dot={{ r: 3 }}
                                activeDot={{ r: 5, style: { cursor: 'pointer' } }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}

                        {/* Contexte plateforme spécifique : Rate / Efficiency / Power */}
                        {!isAllPlatforms && activeChart === 'rate' && (
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            className="cursor-pointer outline-none focus:outline-none"
                          >
                            <ComposedChart
                              data={chartData.rateTrend}
                              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                              onClick={handleChartPointClick}
                            >
                              <defs>
                                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis
                                dataKey="timestamp"
                                type="number"
                                domain={['auto', 'auto']}
                                padding={{ left: 20, right: 20 }}
                                interval="preserveStartEnd"
                                tickFormatter={(unixTime) =>
                                  new Date(unixTime).toLocaleDateString(undefined, {
                                    day: '2-digit',
                                    month: 'short',
                                  })
                                }
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                              />
                              <YAxis
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                tickFormatter={(value) => formatPrice(value)}
                              />
                              <Tooltip
                                formatter={(value, name) => {
                                  const key = name === 'value' ? 'recommended_rate' : name === 'finalValue' ? 'final_price' : 'brand_offer'
                                  const label = t(`dashboard.chart_labels.${key}`)
                                  if (value == null || (typeof value === 'number' && Number.isNaN(value))) return ['—', label]
                                  return [formatPrice(value), label]
                                }}
                                labelFormatter={(unixTime) =>
                                  new Date(unixTime).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                  })
                                }
                                contentStyle={{
                                  borderRadius: '8px',
                                  border: '1px solid #e5e7eb',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                  fontSize: 12,
                                }}
                                wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                              />
                              <Legend
                                wrapperStyle={{ fontSize: 12 }}
                                formatter={(value) => {
                                  if (value === 'value') return t('dashboard.chart_labels.recommended_rate')
                                  if (value === 'finalValue') return t('dashboard.chart_labels.final_price')
                                  if (value === 'brandOffer') return t('dashboard.chart_labels.brand_offer')
                                  return value
                                }}
                              />
                              {showEstimates && (
                                <Area
                                  type="linear"
                                  dataKey="value"
                                  stroke="#f59e0b"
                                  strokeWidth={3}
                                  fill="url(#colorRate)"
                                  dot={{ r: 3 }}
                                  activeDot={{ r: 6, style: { cursor: 'pointer' }, onClick: handleChartPointClick }}
                                />
                              )}
                              {showFinals && (
                                <Line
                                  type="monotone"
                                  dataKey="finalValue"
                                  stroke="#059669"
                                  strokeWidth={2}
                                  dot={{ r: 3 }}
                                  activeDot={{ r: 6, style: { cursor: 'pointer' }, onClick: handleChartPointClick }}
                                  connectNulls
                                />
                              )}
                              {showBrandOffer && (
                                <Line
                                  type="monotone"
                                  dataKey="brandOffer"
                                  stroke="#64748B"
                                  strokeWidth={2}
                                  dot={{ r: 3 }}
                                  activeDot={{ r: 6, style: { cursor: 'pointer' }, onClick: handleChartPointClick }}
                                  connectNulls
                                />
                              )}
                            </ComposedChart>
                          </ResponsiveContainer>
                        )}

                        {!isAllPlatforms && activeChart === 'efficiency' && (
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            className="cursor-pointer outline-none focus:outline-none"
                          >
                            <AreaChart
                              data={chartData.valueEfficiency}
                              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                              onClick={handleChartPointClick}
                            >
                              <defs>
                                <linearGradient id="colorEfficiency" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis
                                dataKey="timestamp"
                                type="number"
                                domain={['auto', 'auto']}
                                padding={{ left: 20, right: 20 }}
                                interval="preserveStartEnd"
                                tickFormatter={(unixTime) =>
                                  new Date(unixTime).toLocaleDateString(undefined, {
                                    day: '2-digit',
                                    month: 'short',
                                  })
                                }
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                              />
                              <YAxis
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                tickFormatter={(value) =>
                                  `${formatPrice(value)} / 1k subs`
                                }
                              />
                              <Tooltip
                                formatter={(value, _name, entry) => {
                                  const payload = entry?.payload
                                  const label = payload?.tooltipLabel || payload?.fullDate || 'Value Efficiency'
                                  return [
                                    `${formatPrice(value)} / 1k subs`,
                                    label,
                                  ]
                                }}
                                labelFormatter={(unixTime) =>
                                  new Date(unixTime).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                  })
                                }
                                contentStyle={{
                                  borderRadius: '8px',
                                  border: '1px solid #e5e7eb',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                  fontSize: 12,
                                }}
                                wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                              />
                              <Area
                                type="linear"
                                dataKey="value"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                fill="url(#colorEfficiency)"
                                dot={{ r: 3 }}
                                activeDot={{ r: 6, style: { cursor: 'pointer' }, onClick: handleChartPointClick }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}

                        {!isAllPlatforms && activeChart === 'power' && (
                          <ResponsiveContainer
                            width="100%"
                            height="100%"
                            className="cursor-pointer outline-none focus:outline-none"
                          >
                            <AreaChart
                              data={chartData.negotiationPower}
                              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                              onClick={handleChartPointClick}
                            >
                              <defs>
                                <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                                  <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis
                                dataKey="timestamp"
                                type="number"
                                domain={['auto', 'auto']}
                                padding={{ left: 20, right: 20 }}
                                interval="preserveStartEnd"
                                tickFormatter={(unixTime) =>
                                  new Date(unixTime).toLocaleDateString(undefined, {
                                    day: '2-digit',
                                    month: 'short',
                                  })
                                }
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                              />
                              <YAxis
                                tick={{ fontSize: 12, fill: '#6b7280' }}
                                tickFormatter={(value) => `${Number(value).toFixed(1)}%`}
                              />
                              <Tooltip
                                formatter={(value, _name, entry) => {
                                  const payload = entry?.payload
                                  const label = payload?.tooltipLabel || payload?.fullDate || 'Negotiation Power'
                                  return [
                                    `${Number(value).toFixed(1)}%`,
                                    label,
                                  ]
                                }}
                                labelFormatter={(unixTime) =>
                                  new Date(unixTime).toLocaleString(undefined, {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                  })
                                }
                                contentStyle={{
                                  borderRadius: '8px',
                                  border: '1px solid #e5e7eb',
                                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                  fontSize: 12,
                                }}
                                wrapperStyle={{ outline: 'none', pointerEvents: 'none' }}
                              />
                              <Area
                                type="linear"
                                dataKey="value"
                                stroke="#ec4899"
                                strokeWidth={3}
                                fill="url(#colorPower)"
                                dot={{ r: 3 }}
                                activeDot={{ r: 6, style: { cursor: 'pointer' }, onClick: handleChartPointClick }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Personalized Insights (moved into right column) */}
              <PersonalizedInsights calculations={calculations} stats={stats} />

              {/* Upcoming Renewals (moved to bottom of card) */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <UpcomingRenewals
                  calculations={calculations}
                  renewals={renewalsFromCalculations}
                  onPrepare={(calc) => {
                    setSelectedCalculation(calc)
                    setIsEmailTemplatesOpen(true)
                  }}
                  onUpdateRenewalName={handleUpdateRenewalName}
                />
              </div>

              {/* Quick Actions (kept at very bottom) */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 mb-3">{t('dashboard.sections.quick_actions')}</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Media Kit */}
                  {calculations.length > 0 ? (
                    <MediaKitButton
                      userData={{ email: user.email }}
                      user={user}
                      calculationData={{
                        platform: calculations[0].platform,
                        niche: calculations[0].niche,
                        subscribers: calculations[0].subscribers,
                        averageViews: calculations[0].average_views,
                        engagementRate: calculations[0].engagement_rate,
                        contentType: calculations[0].content_type,
                        audienceLocation: calculations[0].audience_location,
                        priceMin: calculations[0].price_min,
                        priceMax: calculations[0].price_max,
                        priceAverage: calculations[0].price_average,
                      }}
                      currencySymbol={currencySymbol}
                    />
                  ) : (
                    <button 
                      disabled 
                      title={t('dashboard.make_calculation_first')}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span className="font-medium">{t('dashboard.actions.media_kit')}</span>
                    </button>
                  )}

                  {/* Email Templates */}
                  <button
                    onClick={() => setIsEmailTemplatesOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">{t('dashboard.actions.email_templates')}</span>
                  </button>

                  {/* View Pricing */}
                  <button
                    onClick={() => navigate('/pricing')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    <Crown className="w-4 h-4" />
                    <span className="font-medium">{t('dashboard.actions.view_pricing')}</span>
                  </button>

                  {/* Settings */}
                  <button
                    onClick={() => navigate('/settings')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm text-gray-700 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="font-medium">{t('dashboard.actions.settings')}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          </>
          )}
          {activeTab === 'business' && (
            <div className="relative min-h-[400px]">
              <BusinessDashboard dateRange={dateRange} />
            </div>
          )}
        </div>
      </div>

      {/* Email Templates Modal */}
      <EmailTemplates 
        isOpen={isEmailTemplatesOpen}
        onClose={() => {
          setIsEmailTemplatesOpen(false)
          setInitialEmailTemplateIndex(null)
        }}
        calculationData={selectedCalculation}
        initialTemplateIndex={initialEmailTemplateIndex}
      />
      
      {/* Update Final Price Modal */}
      <UpdateFinalPriceModal
        isOpen={isFinalPriceModalOpen}
        onClose={() => {
          setIsFinalPriceModalOpen(false)
          setSelectedCalculation(null)
        }}
        calculation={selectedCalculation}
        onSave={async (id, price, status) => {
          if (!user || !supabase) return
          try {
            const { error } = await supabase
              .from('calculations')
              .update({
                final_negotiated_price: price,
                deal_status: status,
              })
              .eq('id', id)

            if (error) {
              console.error('Error updating final price:', error)
              alert(t('alerts.error_updating_deal') + ': ' + error.message)
              return
            }

            const { data: updatedData, error: refreshError } = await supabase
              .from('calculations')
              .select('*')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })

            if (refreshError) {
              console.error('Error refreshing calculations after deal update:', refreshError)
              return
            }

            if (updatedData) {
              setCalculations(updatedData)
              calculateStats(updatedData)
            }

            setIsFinalPriceModalOpen(false)
            setSelectedCalculation(null)
          } catch (err) {
            console.error('Failed to update deal:', err)
          }
        }}
      />

      {/* Calculation Details Modal */}
      <CalculationDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false)
          setViewCalculation(null)
        }}
        calculation={viewCalculation}
        onOpenMediaKit={() => {
          alert(t('alerts.media_kit_coming_soon'))
        }}
        onOpenEmail={(calc, templateIndex) => {
          setDetailsModalOpen(false)
          setViewCalculation(null)
          setSelectedCalculation(calc)
          setInitialEmailTemplateIndex(templateIndex ?? null)
          setIsEmailTemplatesOpen(true)
        }}
      />

      <HelpBubble context={helpContext} />
    </PageGradient>
  )
}

export default Dashboard;
