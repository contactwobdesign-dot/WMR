import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import ClientCard from './ClientCard'
import { Building2, LayoutGrid, PieChart as PieChartIcon, BarChart3, Crown, X } from 'lucide-react'

const DAY_MS = 24 * 60 * 60 * 1000

function getPeriodLabel(dateRange, t) {
  const key = dateRange === 'all' ? 'all' : String(dateRange)
  return t('compliance.period_labels.' + key) || (dateRange === 'all' ? 'All' : `${dateRange} days`)
}

function getCutoffDate(dateRange) {
  if (dateRange === 'all') return null
  const days = parseInt(dateRange, 10) || 365
  return new Date(Date.now() - days * DAY_MS)
}

function dealInRange(d, cutoff) {
  if (!cutoff) return true
  const date = d.contract_date ? new Date(d.contract_date + 'Z') : null
  if (!date) return false
  return date >= cutoff
}

function getDealsInRange(clients, dateRange) {
  const cutoff = getCutoffDate(dateRange)
  const deals = []
  clients.forEach((c) => {
    (c.deals || []).forEach((d) => {
      if (!dealInRange(d, cutoff)) return
      deals.push({
        ...d,
        client_id: c.id,
        clientName: c.company_name || 'Sans nom',
      })
    })
  })
  return deals
}

/** Retourne les clients avec uniquement les deals dans la période (pour liste + totaux période). */
function getClientsWithFilteredDeals(clients, dateRange) {
  const cutoff = getCutoffDate(dateRange)
  return clients.map((c) => ({
    ...c,
    deals: (c.deals || []).filter((d) => dealInRange(d, cutoff)),
  }))
}

/** Génère une couleur HSL déterministe à partir d'une chaîne (ex. nom de marque). Angle d'or pour disperser les teintes. S=70%, L=45%. */
function getStringColor(str) {
  const s = str != null ? String(str) : ''
  if (!s) return 'hsl(0, 0%, 50%)'
  let hash = 0
  for (let i = 0; i < s.length; i++) {
    hash = s.charCodeAt(i) + ((hash << 5) - hash)
  }
  // L'angle d'or éparpille drastiquement les couleurs adjacentes
  const hue = Math.round(Math.abs(hash) * 137.508) % 360
  return `hsl(${hue}, 70%, 45%)`
}

function getPieData(clients, dateRange) {
  const deals = getDealsInRange(clients, dateRange)
  const byClient = {}
  deals.forEach((d) => {
    const key = d.client_id
    if (!byClient[key]) byClient[key] = { name: d.clientName, value: 0 }
    byClient[key].value += Number(d.total_deal_value) || 0
  })
  return Object.values(byClient).filter((x) => x.value > 0)
}

function getBarData(clients, dateRange) {
  const deals = getDealsInRange(clients, dateRange)
  const monthsMap = {}
  const monthNames = []
  const clientIds = [...new Set(deals.map((d) => d.client_id))]
  const clientNames = {}
  clients.forEach((c) => {
    clientNames[c.id] = c.company_name || c.id
  })

  deals.forEach((d) => {
    const date = d.contract_date ? new Date(d.contract_date + 'Z') : null
    if (!date) return
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    const label = date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' })
    if (!monthsMap[key]) {
      monthsMap[key] = { key, name: label }
      clientIds.forEach((id) => {
        monthsMap[key][id] = 0
      })
      monthNames.push(key)
    }
    const val = Number(d.total_deal_value) || 0
    monthsMap[key][d.client_id] = (monthsMap[key][d.client_id] || 0) + val
  })

  monthNames.sort()
  const barData = monthNames.map((k) => monthsMap[k])
  return { barData, clientIds, clientNames }
}

function formatEur(centimes) {
  if (centimes == null || Number.isNaN(centimes)) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(centimes / 100)
}

export default function ClientAnalyticsView({ clients = [], loading = false, onRefresh, dateRange = '365', userProfile = null, isPro = false }) {
  const { t } = useTranslation()
  const [viewMode, setViewMode] = useState('cards')
  const [showProChartsModal, setShowProChartsModal] = useState(false)

  const periodLabel = useMemo(() => getPeriodLabel(dateRange, t), [dateRange, t])
  const clientsWithFilteredDeals = useMemo(
    () => getClientsWithFilteredDeals(clients, dateRange),
    [clients, dateRange]
  )
  const periodTotalByClientId = useMemo(() => {
    const map = {}
    clientsWithFilteredDeals.forEach((c) => {
      const total = (c.deals || []).reduce(
        (sum, d) => sum + (Number(d.total_deal_value) || 0),
        0
      )
      map[c.id] = { totalCentimes: total, formatted: formatEur(total) }
    })
    return map
  }, [clientsWithFilteredDeals])

  const pieData = useMemo(() => getPieData(clients, dateRange), [clients, dateRange])
  const { barData, clientIds, clientNames } = useMemo(() => getBarData(clients, dateRange), [clients, dateRange])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
      </div>
    )
  }

  if (!clients?.length) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <Building2 className="h-8 w-8 text-gray-400" />
        </div>
        <p className="mt-4 text-base font-medium text-gray-900">{t('compliance.analytics.your_partners')}</p>
        <p className="mt-1 text-sm text-gray-500">
          {t('compliance.analytics.empty_desc')}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Barre d'outils : switch de vue (graphiques réservés PRO, mais icônes cliquables pour conversion) */}
      <div className="flex justify-end gap-1">
        <button
          type="button"
          onClick={() => setViewMode('cards')}
          className={`rounded-lg p-2.5 transition-colors ${
            viewMode === 'cards'
              ? isPro ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          }`}
          title={t('compliance.analytics.view_cards')}
        >
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (!isPro) {
              setShowProChartsModal(true)
              return
            }
            setViewMode('pie')
          }}
          className={`rounded-lg p-2.5 transition-colors ${
            viewMode === 'pie'
              ? isPro ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          }`}
          title={t('client_analytics.chart_revenue_by_brand')}
        >
          <PieChartIcon className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            if (!isPro) {
              setShowProChartsModal(true)
              return
            }
            setViewMode('bar')
          }}
          className={`rounded-lg p-2.5 transition-colors ${
            viewMode === 'bar'
              ? isPro ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
              : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
          }`}
          title={t('client_analytics.chart_monthly_by_brand')}
        >
          <BarChart3 className="h-5 w-5" />
        </button>
      </div>

      {/* Modale PRO : analyses visuelles réservées aux membres PRO */}
      {showProChartsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowProChartsModal(false)} role="dialog" aria-modal="true" aria-labelledby="pro-charts-modal-title">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-amber-100 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Crown className="h-6 w-6 text-amber-600" />
                </div>
                <h2 id="pro-charts-modal-title" className="text-lg font-bold text-gray-900">{t('client_analytics.pro_charts_title')}</h2>
              </div>
              <button type="button" onClick={() => setShowProChartsModal(false)} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600" aria-label={t('client_analytics.close')}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {t('compliance.analytics.pro_charts_message')}
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors"
            >
              <Crown className="h-4 w-4" />
              Découvrir l’offre PRO
            </Link>
          </div>
        </div>
      )}

      {viewMode === 'cards' && (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {clientsWithFilteredDeals.map((client) => (
            <li key={client.id}>
              <ClientCard
                client={client}
                onDealAdded={onRefresh}
                onClientUpdated={onRefresh}
                periodLabel={periodLabel}
                periodTotal={periodTotalByClientId[client.id]?.formatted}
                userProfile={userProfile}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Graphiques rendus uniquement pour les membres PRO */}
      {isPro && viewMode === 'pie' && (
        <div className="rounded-2xl border border-amber-500 bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">{t('client_analytics.filtered_data_label')} {periodLabel}</p>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            {t('client_analytics.chart_revenue_heading')}
          </h4>
          {pieData.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">{t('client_analytics.no_data')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start min-w-0">
              <div className="col-span-1 flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 min-w-0">
                {pieData.map((entry, index) => (
                  <div key={`legend-pie-${index}`} className="flex items-center gap-2 text-sm font-medium text-gray-700 shrink-0">
                    <span
                      className="w-3 h-3 rounded-sm shrink-0 shadow-sm"
                      style={{ backgroundColor: getStringColor(entry.name) }}
                    />
                    <span className="truncate" title={entry.name}>
                      {entry.name}
                    </span>
                  </div>
                ))}
              </div>
              <div className="col-span-1 md:col-span-2 h-[300px] min-w-0 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={getStringColor(entry.name)} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => {
                        const formattedAmount = new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        })
                          .format(value / 100)
                          .replace(/\u202F/g, ' ')
                          .replace(/\s/g, ' ')
                        return [formattedAmount, name ?? 'Montant']
                      }}
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}

      {isPro && viewMode === 'bar' && (
        <div className="rounded-2xl border border-amber-500 bg-white p-5 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">{t('client_analytics.filtered_data_label')} {periodLabel}</p>
          <h4 className="text-sm font-semibold text-gray-700 mb-4">
            {t('client_analytics.chart_monthly_stacked_heading')}
          </h4>
          {barData.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">{t('client_analytics.no_data')}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start min-w-0">
              <div className="col-span-1 flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 min-w-0">
                {clientIds.map((id) => {
                  const name = clientNames[id] || id
                  return (
                  <div key={`legend-bar-${id}`} className="flex items-center gap-2 text-sm font-medium text-gray-700 shrink-0">
                    <span
                      className="w-3 h-3 rounded-sm shrink-0 shadow-sm"
                      style={{ backgroundColor: getStringColor(name) }}
                    />
                    <span className="truncate" title={name}>
                      {name}
                    </span>
                  </div>
                  )
                })}
              </div>
              <div className="col-span-1 md:col-span-2 h-[300px] min-w-0 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 100).toFixed(0)} €`} />
                    <Tooltip
                      formatter={(value, name) => {
                        const formattedAmount = new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR',
                        })
                          .format(value / 100)
                          .replace(/\u202F/g, ' ')
                          .replace(/\s/g, ' ')
                        return [formattedAmount, name ?? '']
                      }}
                      cursor={{ fill: '#f3f4f6' }}
                      contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    {clientIds.map((id) => (
                      <Bar
                        key={id}
                        dataKey={id}
                        name={clientNames[id] || id}
                        stackId="a"
                        fill={getStringColor(clientNames[id] || id)}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
