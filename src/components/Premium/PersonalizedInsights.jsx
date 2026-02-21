import { useTranslation } from 'react-i18next'
import { Lightbulb, DollarSign, AlertTriangle, TrendingUp, AlertCircle, Globe2, Info } from 'lucide-react'
import { useCurrency } from '../../context/CurrencyContext.jsx'

const INSIGHTS_LIBRARY = [
  { id: 'anchor', type: 'money' },
  { id: 'usage', type: 'money' },
  { id: 'exclusivity', type: 'warning' },
  { id: 'package', type: 'growth' },
  { id: 'lowball', type: 'alert', condition: (c) => c.offered_price > 0 && c.offered_price < c.price_min },
  { id: 'q4', type: 'trending', condition: () => new Date().getMonth() >= 9 },
  { id: 'jan', type: 'info', condition: () => new Date().getMonth() === 0 },
  { id: 'yt_shorts', type: 'platform', condition: (c) => c.platform === 'youtube' || c.platform === 'YouTube' },
  { id: 'twitch_sub', type: 'platform', condition: (c) => c.platform === 'twitch' },
  { id: 'linkedin_b2b', type: 'platform', condition: (c) => c.niche === 'Tech' || c.niche === 'Business' },
  { id: 'high_eng', type: 'growth', condition: (c) => (c.engagement_rate || c.engagementRate || 0) > 5 },
  { id: 'growth', type: 'trending', condition: (c, all) => all.length > 5 },
  { id: 'gap_close', type: 'money', condition: (c) => c.final_negotiated_price && c.final_negotiated_price > c.price_average },
  { id: 'email', type: 'info' },
  { id: 'contract', type: 'warning' },
  { id: 'tax', type: 'info' },
  { id: 'portfolio', type: 'growth' },
  { id: 'followup', type: 'growth' },
]

function pickIcon(type) {
  switch (type) {
    case 'money':
      return DollarSign
    case 'warning':
      return AlertTriangle
    case 'growth':
      return TrendingUp
    case 'alert':
      return AlertCircle
    case 'trending':
      return TrendingUp
    case 'platform':
      return Globe2
    case 'info':
    default:
      return Info
  }
}

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function PersonalizedInsights({ calculations, stats }) {
  const { t } = useTranslation()
  const { formatPrice } = useCurrency()
  const hasCalcs = calculations && calculations.length > 0

  const activeCalcs = (calculations || []).filter(c => c.deal_status !== 'declined')
  const latest = activeCalcs[0] || calculations[0]

  // Sélectionner les insights pertinents
  let validInsights = INSIGHTS_LIBRARY.filter((insight) => {
    if (!insight.condition) return true
    if (!latest) return false
    try {
      return insight.condition(latest, activeCalcs)
    } catch {
      return false
    }
  })

  if (validInsights.length === 0) {
    validInsights = INSIGHTS_LIBRARY.filter(i => !i.condition)
  }

  const selected = shuffleArray(validInsights).slice(0, 3)

  // Texte dynamique en haut (rate/level/extra déjà formatés côté appelant si besoin)
  const avgRate = stats?.avgRate || 0
  let tier = 'Micro'
  if (avgRate >= 5000) {
    tier = 'Macro'
  } else if (avgRate >= 1000) {
    tier = 'Mid'
  }

  const rateFormatted = formatPrice(avgRate)
  const extraFormatted = stats?.negGain > 0 ? formatPrice(stats.negGain) : ''

  let header = hasCalcs
    ? t('results_view.insights_summary', { rate: rateFormatted, level: tier })
    : t('results_view.insights_empty')

  if (hasCalcs && stats?.negGain > 0) {
    header += t('results_view.insights_summary_extra', { extra: extraFormatted })
  }

  return (
    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="text-amber-600" size={20} />
        <h3 className="text-sm font-bold text-gray-900">
          {t('results_view.insights_title')}
        </h3>
      </div>

      <p className="text-sm text-gray-800 mb-4">
        {header}
      </p>

      <div className="space-y-3">
        {selected.map((tip) => {
          const Icon = pickIcon(tip.type)
          return (
            <div
              key={tip.id}
              className="flex items-start gap-2 bg-amber-100/70 rounded-md p-3"
            >
              <Icon className="text-amber-700 flex-shrink-0 mt-0.5" size={16} />
              <p className="text-sm text-gray-900">{t('results_view.tips.' + tip.id)}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

