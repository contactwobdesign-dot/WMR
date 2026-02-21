import { useState, useEffect } from 'react'
import { Lock, Crown, ArrowRight, Check } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import FreeCalculatorForm from './FreeCalculatorForm'
import PremiumCalculatorForm from './PremiumCalculatorForm'
import FreeResultCard from './FreeResultCard'
import PremiumResultCard from './PremiumResultCard'
import { evaluateOffer, calculateFullPrice } from '../../lib/calculatePrice'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useTranslation } from 'react-i18next'

const STORAGE_KEY = 'sponsorprice_calculations'
const FREE_MONTHLY_LIMIT = 2

const PENDING_CALCULATION_KEY = 'pending_calculation_inputs'

function Calculator({ defaultPlatform = '', isPremium: isPremiumProp = false, user: userProp = null, allowGuestSubmit = false }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user: authUser, isPremium: isPremiumFromAuth } = useAuth()
  const { t } = useTranslation()
  const user = userProp || authUser
  const effectiveIsPremium = isPremiumProp || (authUser && isPremiumFromAuth?.())

  const [result, setResult] = useState(null)
  const [formData, setFormData] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [usageCount, setUsageCount] = useState(0)
  const [savedMessage, setSavedMessage] = useState(false)

  // R�cup�ration du nombre de calculs r�els du mois depuis la base (source de v�rit� pour la limite Free)
  useEffect(() => {
    const fetchUsage = async () => {
      if (!user) return

      try {
        const date = new Date()
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString()

        const { count, error } = await supabase
          .from('calculations')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id)
          .gte('created_at', firstDay)

        if (!error && count !== null) {
          console.log('Debug Calculator Usage:', count)
          setUsageCount(count)
        }
      } catch (err) {
        console.error('Error fetching usage:', err)
      }
    }

    fetchUsage()
  }, [user])

  const limitReached = usageCount >= FREE_MONTHLY_LIMIT

  // Free submission handler (n'appel� que lorsque effectiveIsPremium est false)
  const handleFreeSubmit = async (data) => {
    if (isGuest) {
      try {
        sessionStorage.setItem(PENDING_CALCULATION_KEY, JSON.stringify(data))
        navigate('/signup', { replace: true })
      } catch (e) {
        console.error('Failed to save pending calculation', e)
        navigate('/signup', { replace: true })
      }
      return
    }

    if (usageCount >= FREE_MONTHLY_LIMIT) {
      if (location.pathname === '/') {
        navigate('/dashboard')
      }
      return
    }

    setIsCalculating(true)
    setFormData(data)

    const offeredPriceValue = data.offeredPrice !== undefined && data.offeredPrice !== '' && data.offeredPrice !== null
      ? parseInt(data.offeredPrice, 10)
      : null
    const evaluation = evaluateOffer({
      ...data,
      offeredPrice: offeredPriceValue ?? 0,
    })
    const calculatedPrice = evaluation.calculatedPrice || { min: 0, max: 0, average: 0 }

    if (user && supabase && location.pathname === '/') {
      const cleanDate = !data.partnership_end_date && !data.partnershipEndDate
        ? null
        : (data.partnership_end_date || data.partnershipEndDate || null)
      const calculationData = {
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
        verdict: evaluation.verdict,
      }
      const { data: inserted, error } = await supabase
        .from('calculations')
        .insert(calculationData)
        .select()
        .single()

      setIsCalculating(false)
      if (error) {
        console.error('Failed to save calculation from Home:', error)
        setResult(evaluation)
        setShowResult(true)
        setUsageCount((prev) => prev + 1)
        setTimeout(() => document.getElementById('calculator-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
        return
      }
      navigate('/dashboard', { state: { openedCalculation: inserted } })
      return
    }

    setResult(evaluation)
    setShowResult(true)
    setIsCalculating(false)
    setUsageCount((prev) => prev + 1)
    setTimeout(() => {
      document.getElementById('calculator-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Premium submission handler
  const handlePremiumSubmit = async (data) => {
    setIsCalculating(true)
    setFormData(data)
    setSavedMessage(false)

    await new Promise(resolve => setTimeout(resolve, 500))

    const calculation = calculateFullPrice(data)

    if (user && supabase) {
      const cleanDate = !data.partnership_end_date && !data.partnershipEndDate ? null : (data.partnership_end_date || data.partnershipEndDate || null)
      const offeredPriceValue = data.offeredPrice !== undefined && data.offeredPrice !== '' && data.offeredPrice !== null
        ? parseInt(data.offeredPrice, 10)
        : null
      const insertPayload = {
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
        price_min: calculation.min,
        price_max: calculation.max,
        price_average: calculation.average,
        verdict: null,
      }
      const { data: inserted, error } = await supabase
        .from('calculations')
        .insert(insertPayload)
        .select()
        .single()

      setIsCalculating(false)
      if (!error && inserted && location.pathname === '/') {
        navigate('/dashboard', { state: { openedCalculation: inserted } })
        return
      }
      if (!error) {
        setSavedMessage(true)
        setTimeout(() => setSavedMessage(false), 3000)
      } else {
        console.error('Failed to save calculation:', error)
      }
    } else {
      setIsCalculating(false)
    }

    setResult(calculation)
    setShowResult(true)
    setTimeout(() => {
      document.getElementById('calculator-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  // Save calculation (premium only)
  const handleSave = async () => {
    if (!user) {
      alert(t('alerts.login_to_save'))
      return
    }

    try {
      const { error } = await supabase
        .from('calculations')
        .insert({
          user_id: user.id,
          result: result,
          form_data: formData,
          is_premium: effectiveIsPremium,
          created_at: new Date().toISOString(),
        })

      if (error) throw error

      // Show success message
      alert(t('alerts.saved_to_history'))
      // TODO: Replace with toast notification
    } catch (error) {
      console.error('Error saving calculation:', error)
      alert(t('alerts.save_failed'))
    }
  }

  // Reset calculator
  const handleReset = () => {
    setResult(null)
    setFormData(null)
    setShowResult(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Get first day of next month for limit reset message
  const getNextMonthResetDate = () => {
    const now = new Date()
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    return nextMonth.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
  }

  // Logique de verrouillage consolid�e
  const isGuest = !user && allowGuestSubmit
  const isFreeUserWithCredits = user && !effectiveIsPremium && !limitReached
  const isPremiumUser = effectiveIsPremium

  const showForm = isGuest || isFreeUserWithCredits || isPremiumUser
  const showLock = (!user && !allowGuestSubmit) || (user && !effectiveIsPremium && limitReached)

  if (showLock) {
    if (!user && !allowGuestSubmit) {
      return (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {t('seo_calculators.locked_card.title')}
          </h3>
          <p className="text-gray-600 mb-6">
            {t('seo_calculators.locked_card.desc')}
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/signup')}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              {t('seo_calculators.locked_card.btn_create')}
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg transition-colors"
            >
              {t('seo_calculators.locked_card.btn_login')}
            </button>
          </div>
        </div>
      )
    }
    // user && !effectiveIsPremium && limitReached ? overlay "Limit Reached" uniquement
    return (
      <div className="bg-white rounded-xl shadow-md border-2 border-gray-200 p-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
          <Lock size={40} className="text-gray-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          You've used your {FREE_MONTHLY_LIMIT} free evaluations this month
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Upgrade to Pro for unlimited calculations, exact rates, and full breakdowns
        </p>
        <Link
          to="/pricing"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          <Crown size={24} />
          Upgrade to Pro
          <ArrowRight size={20} />
        </Link>
        <p className="text-sm text-gray-500 mt-6">
          Resets on {getNextMonthResetDate()}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Calculations Counter (Free avec cr�dits uniquement, masqu� pour Premium et invit�s) */}
      {showForm && isFreeUserWithCredits && !showResult && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-900">
              {usageCount}/{FREE_MONTHLY_LIMIT}
            </span>{' '}
            free evaluations used this month
          </p>
          {usageCount >= 1 && (
            <p className="text-xs text-gray-500 mt-1">
              {t('calculator.want_unlimited')} <Link to="/pricing" className="text-primary-600 hover:text-primary-700 font-medium underline">{t('calculator.upgrade_pro')}</Link>
            </p>
          )}
        </div>
      )}

      {/* Form : affich� si showForm (invit� autoris�, Pro, ou Free avec cr�dits) */}
      {showForm && !showResult && (
        <div>
          {isPremiumUser ? (
            <PremiumCalculatorForm
              onSubmit={handlePremiumSubmit}
              disabled={isCalculating}
              defaultPlatform={defaultPlatform}
            />
          ) : (
            <FreeCalculatorForm
              onSubmit={handleFreeSubmit}
              disabled={isCalculating}
            />
          )}
        </div>
      )}

      {/* Results */}
      {showResult && result && (
        <div id="calculator-results">
          {/* Saved Message */}
          {savedMessage && effectiveIsPremium && (
            <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 animate-fadeIn">
              <Check size={20} className="text-green-600" />
              <p className="text-sm font-medium text-green-700">
                Saved to history ?
              </p>
            </div>
          )}
          
          {effectiveIsPremium ? (
            <PremiumResultCard
              result={result}
              formData={formData}
              onReset={handleReset}
              onSave={user ? handleSave : undefined}
            />
          ) : (
            <FreeResultCard
              result={result}
              onReset={handleReset}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default Calculator
