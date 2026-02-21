import { X, CalendarDays, BadgeCheck, AlertTriangle, Users, Globe2, Mail, Lock, CheckCircle, MinusCircle, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCurrency } from '../../context/CurrencyContext.jsx'
import { useAuth } from '../../hooks/useAuth.jsx'

const formatNumber = (val) => {
  if (val === null || val === undefined) return '—'
  const n = Number(val)
  if (Number.isNaN(n)) return '—'
  return n.toLocaleString()
}

const formatDate = (dateString) => {
  if (!dateString) return '—'
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function getStatusBadge(status) {
  switch (status) {
    case 'won':
      return { label: 'Won', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
    case 'declined':
      return { label: 'Lost', className: 'bg-rose-50 text-rose-700 border-rose-200' }
    case 'active':
    default:
      return { label: 'Active', className: 'bg-amber-50 text-amber-700 border-amber-200' }
  }
}

function getPercentageRange(percentage) {
  if (percentage == null || Number.isNaN(percentage)) return '—'
  const p = Number(percentage)
  if (p < 50) return 'Less than 50%'
  if (p < 75) return '50–75%'
  if (p < 95) return '75–95%'
  return '95%+'
}

/** Texte vague pour les utilisateurs gratuits (pas le pourcentage exact). */
function getVaguePercentageText(percent) {
  if (percent == null || Number.isNaN(percent)) return '—'
  const p = Number(percent)
  if (p >= 150) return 'Largement au-dessus du marché'
  if (p >= 100) return 'Légèrement supérieur au marché'
  if (p >= 80) return 'Dans la moyenne basse'
  return 'En dessous du prix marché'
}

/** Badge visuel pour le verdict (GOOD / FAIR / BAD). */
function renderVerdictBadge(verdictStr) {
  const status = (verdictStr || '').toUpperCase().replace(/\s/g, '_')
  let Icon = MinusCircle
  let colorClasses = 'bg-amber-50 text-amber-700 border-amber-200'
  let label = 'Fair'

  if (status === 'GOOD') {
    Icon = CheckCircle
    colorClasses = 'bg-green-50 text-green-700 border-green-200'
    label = 'Good'
  } else if (status === 'ACCEPTABLE') {
    Icon = MinusCircle
    colorClasses = 'bg-amber-50 text-amber-700 border-amber-200'
    label = 'Fair'
  } else if (status === 'WAY_TOO_LOW' || status === 'TOO_LOW') {
    Icon = AlertCircle
    colorClasses = 'bg-red-50 text-red-700 border-red-200'
    label = 'Below market'
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold text-sm tracking-wide ${colorClasses}`}>
      <Icon className="w-4 h-4 shrink-0" />
      <span className="uppercase">{label}</span>
    </div>
  )
}

export default function CalculationDetailsModal({
  isOpen,
  onClose,
  calculation,
  onOpenMediaKit,
  onOpenEmail,
}) {
  const { t } = useTranslation()
  const { formatPrice } = useCurrency()
  const { isPremium, user } = useAuth()
  const premium = isPremium?.() ?? false

  if (!isOpen || !calculation) return null

  const statusInfo = getStatusBadge(calculation.deal_status || 'active')
  const avg = calculation.price_average != null && calculation.price_average > 0 ? Number(calculation.price_average) : null
  const offered = calculation.offered_price != null ? Number(calculation.offered_price) : null
  const fairRate = avg ?? 0
  const percentageOfValue = fairRate > 0 && offered != null ? Math.round((offered / fairRate) * 100) : null
  const difference = avg && offered != null && offered < avg ? avg - offered : 0
  const offerIsExcellent = offered != null && avg != null && offered >= avg

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl border border-amber-200 max-h-[90vh] overflow-y-auto">
        {/* Header — toute la largeur */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-amber-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-gray-900 capitalize">
                {calculation.platform || 'Deal'}
              </h2>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.className}`}
              >
                <BadgeCheck className="w-3 h-3" />
                {statusInfo.label}
              </span>
            </div>
            <p className="text-sm text-gray-600 capitalize">
              {calculation.niche || '—'} •{' '}
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="w-3 h-3 text-gray-400" />
                {formatDate(calculation.created_at)}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu principal : grille 2 colonnes sur Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 py-4">
          {/* COLONNE GAUCHE : Verdict, Jauge, Fourchette, Money Left on Table */}
          <div className="space-y-4">
            {calculation.verdict && renderVerdictBadge(calculation.verdict)}
            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
                Market Value Range
              </p>
              {premium ? (
                <>
                  <p className="text-base font-semibold text-amber-800">
                    {formatPrice(calculation.price_min)} – {formatPrice(calculation.price_max)}
                  </p>
                  {calculation.offered_price != null && (
                    <p className="text-sm text-gray-600 mt-1">
                      Brand offer: {formatPrice(calculation.offered_price)}
                    </p>
                  )}
                  {avg != null && (
                    <p className="text-xs text-gray-500 mt-1">
                      Fair rate: {formatPrice(avg)}
                    </p>
                  )}
                </>
              ) : (
                <div className="relative rounded-md mt-1">
                  <span className="text-base font-semibold text-amber-800 blur-sm select-none opacity-50">
                    €500 – €1 500
                  </span>
                  <div className="absolute inset-0 flex items-center justify-start pl-0 pt-0.5">
                    <span className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded shadow-sm border border-indigo-200 uppercase tracking-wide">
                      <Lock className="w-3 h-3" /> Pro
                    </span>
                  </div>
                </div>
              )}
            </div>

            {percentageOfValue != null && (
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs font-bold text-gray-500 uppercase">{t('calculation_details_modal.offer_vs_market')}</span>
                  <span className={`text-sm font-bold ${percentageOfValue >= 100 ? 'text-green-600' : 'text-amber-600'}`}>
                    {premium ? `${percentageOfValue}% du prix marché` : getVaguePercentageText(percentageOfValue)}
                  </span>
                </div>
                <div className="relative h-4 rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-green-400 w-full overflow-visible">
                  <div
                    className="absolute top-1/2 z-10 w-4 h-4 bg-white border-4 border-gray-900 rounded-full shadow-md -translate-y-1/2"
                    style={{ left: `calc(${Math.min(percentageOfValue, 100)}% - 8px)` }}
                  />
                </div>
                {!premium && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Passez en Pro pour découvrir l&apos;écart exact et obtenir vos arguments de négociation.
                  </p>
                )}
              </div>
            )}

            {difference > 0 && calculation.verdict !== 'GOOD' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="font-medium text-red-800">
                  {premium
                    ? `You're potentially leaving ${formatPrice(difference)} on the table`
                    : 'You are potentially leaving a significant amount on the table.'}
                </p>
              </div>
            )}
          </div>

          {/* COLONNE DROITE : Actionable Advice, Projected Earnings, Detailed Stats */}
          <div className="space-y-4">
            {percentageOfValue != null && percentageOfValue < 100 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                  Actionable Advice
                </p>
                {premium ? (
                  <p className="text-blue-900">
                    At {percentageOfValue}% of your value, this offer is below market. Consider negotiating.
                  </p>
                ) : (
                  <p className="text-blue-900">
                    Your offer appears to be significantly below market rates. Strong negotiation is recommended.
                  </p>
                )}
              </div>
            )}

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
                Projected Earnings
              </p>
              {premium ? (
                <p className="text-sm text-amber-800">
                  {formatPrice(calculation.price_min)} – {formatPrice(calculation.price_max)} (WMR range)
                </p>
              ) : (
                <div className="relative rounded-md mt-1">
                  <span className="text-sm text-amber-800 blur-sm select-none opacity-50">
                    €500 – €1 500 (WMR range)
                  </span>
                  <div className="absolute inset-0 flex items-center justify-start pl-0 pt-0.5">
                    <span className="flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded shadow-sm border border-indigo-200 uppercase tracking-wide">
                      <Lock className="w-3 h-3" /> Pro
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Stats — floutés + overlay pour Free */}
            <div className="relative">
              {!premium && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm z-10">
                  <div className="text-center px-4">
                    <Lock className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-semibold text-gray-700 mb-2">{t('calculation_details_modal.upgrade_to_unlock')}</p>
                    <Link
                      to="/pricing"
                      className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    >
                      Upgrade to Pro
                    </Link>
                  </div>
                </div>
              )}
              <div className={!premium ? 'select-none pointer-events-none blur-sm' : ''}>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">
                  Detailed Stats
                </p>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('calculation_details_modal.audience')}</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{formatNumber(calculation.subscribers)} subs</span>
                    </div>
                    <p className="text-xs text-gray-500">Avg Views: {formatNumber(calculation.average_views)}</p>
                    <p className="text-xs text-gray-500">
                      Engagement: {(calculation.engagement_rate || 0).toFixed ? calculation.engagement_rate.toFixed(1) : calculation.engagement_rate || 0}%
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{t('calculation_details_modal.sponsor_context')}</p>
                    <p className="text-sm text-gray-900 capitalize">Company Size: {calculation.company_size || '—'}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-900 capitalize">
                      <Globe2 className="w-4 h-4 text-gray-400" />
                      <span>Audience: {calculation.audience_location || '—'}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 mt-3">
                  <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide mb-2">{t('calculation_details_modal.financials')}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t('calculation_details_modal.brand_offer')}</p>
                      <p className={`text-base font-semibold ${calculation.offered_price == null ? 'text-gray-900' : offerIsExcellent ? 'text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded inline-block w-fit' : 'text-gray-500 line-through'}`}>
                        {calculation.offered_price != null ? formatPrice(calculation.offered_price) : '—'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t('calculation_details_modal.wmr_recommended')}</p>
                      <p className="text-base font-semibold text-amber-800">
                        {formatPrice(calculation.price_min)} - {formatPrice(calculation.price_max)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t('calculation_details_modal.final_price')}</p>
                      <p className="text-base font-semibold text-emerald-700">
                        {calculation.final_negotiated_price != null ? formatPrice(calculation.final_negotiated_price) : '—'}
                      </p>
                    </div>
                  </div>
                  {calculation.offered_price != null && calculation.final_negotiated_price != null && (
                    <div className="mt-3 flex items-center gap-2 text-xs text-emerald-800">
                      <AlertTriangle className="w-3 h-3 text-emerald-500" />
                      <span>
                        Negotiation gain: <strong>{formatPrice(calculation.final_negotiated_price - calculation.offered_price)}</strong>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions — Draft Email (template selon offre), Close */}
        <div className="px-6 pb-5 pt-3 border-t border-amber-100 flex flex-wrap gap-3 justify-between items-center">
          <div className={`flex flex-wrap gap-2 ${!premium ? 'relative flex-1' : ''}`}>
            {!premium && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm z-10 pointer-events-none" aria-hidden />
            )}
            <div className={!premium ? 'blur-sm select-none pointer-events-none' : ''}>
              <button
                onClick={() => onOpenEmail?.(calculation, offerIsExcellent ? 2 : 1)}
                className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg border border-primary-200 text-primary-700 bg-primary-50 hover:bg-primary-100 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Draft Email
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors relative z-20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

