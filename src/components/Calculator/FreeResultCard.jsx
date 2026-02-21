import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCurrency } from '../../context/CurrencyContext.jsx'
import { 
  XCircle, 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle, 
  Lock, 
  ArrowRight,
  Building,
  DollarSign,
  Check,
  Lightbulb
} from 'lucide-react'

// Map icon names to components
const ICONS = {
  XCircle,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
}

// Get percentage range key for i18n
const getPercentageRangeKey = (percentage) => {
  if (percentage < 50) return 'percentage_less_50'
  if (percentage < 75) return 'percentage_50_75'
  if (percentage < 95) return 'percentage_75_95'
  return 'percentage_95_plus'
}

function FreeResultCard({ result, onReset }) {
  const { t } = useTranslation()
  const { formatPrice } = useCurrency()
  const Icon = ICONS[result.verdictConfig.icon]
  
  // Get random advice for this verdict (from i18n)
  const adviceList = t('results_view.advice.' + result.verdict, { returnObjects: true })
  const adviceArray = Array.isArray(adviceList) ? adviceList : []
  const randomAdvice = adviceArray.length > 0
    ? adviceArray[Math.floor(Math.random() * adviceArray.length)]
    : ''
  
  // Get percentage range (translated)
  const percentageRange = t('results_view.' + getPercentageRangeKey(result.percentageOfValue))

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Main Result Card */}
      <div className={`${result.verdictConfig.bgColor} ${result.verdictConfig.borderColor} border-2 rounded-xl p-8`}>
        {/* 1. VERDICT HEADER */}
        <div className="flex items-start gap-4 mb-6">
          <Icon className={result.verdictConfig.textColor} size={48} />
          <div className="flex-1">
            <h2 className={`text-2xl font-bold ${result.verdictConfig.textColor} mb-2`}>
              {result.verdictConfig.title}
            </h2>
            <p className="text-gray-600">
              {result.verdictConfig.subtitle}
            </p>
          </div>
        </div>

        {/* 2. BADGE POURCENTAGE (FOURCHETTE) */}
        <div className="flex justify-center mb-6">
          <div className={`inline-flex items-center px-6 py-3 ${result.verdictConfig.bgColor} ${result.verdictConfig.borderColor} border-2 rounded-full`}>
            <span className={`text-2xl font-bold ${result.verdictConfig.textColor}`}>
              {percentageRange}
            </span>
            <span className="ml-2 text-gray-700">{t('results_view.of_market_value')}</span>
          </div>
        </div>

        {/* 3. BARRE VISUELLE DE PROGRESSION */}
        <div className="mb-6">
          <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
            {/* Background gradient zones */}
            <div className="absolute inset-0 flex">
              <div className="w-[50%] bg-red-400"></div>
              <div className="w-[25%] bg-orange-400"></div>
              <div className="w-[20%] bg-yellow-400"></div>
              <div className="flex-1 bg-green-400"></div>
            </div>
            
            {/* Marker */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
              style={{ left: `${Math.min(result.percentageOfValue, 120)}%` }}
            >
              <div className="w-4 h-4 bg-white border-4 border-gray-900 rounded-full shadow-lg"></div>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                {result.percentageOfValue}%
              </div>
            </div>
          </div>
          
          {/* Labels */}
          <div className="flex justify-between text-xs text-gray-600 mt-2 px-1">
            <span>0%</span>
            <span className="absolute" style={{ left: '50%', transform: 'translateX(-50%)' }}>50%</span>
            <span className="absolute" style={{ left: '75%', transform: 'translateX(-50%)' }}>75%</span>
            <span className="absolute" style={{ left: '95%', transform: 'translateX(-50%)' }}>95%</span>
            <span>100%</span>
          </div>
        </div>

        {/* 4. MESSAGE PRINCIPAL */}
        <div className={`${result.verdictConfig.bgColor} rounded-lg p-4 mb-6 border ${result.verdictConfig.borderColor}`}>
          <p className="text-lg text-gray-900">
            {result.message}
          </p>
        </div>

        {/* 4.5 CONSEIL ALÉATOIRE */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <div className="font-semibold text-blue-900 mb-1">
                {t('results_view.pro_tip')}
              </div>
              <p className="text-blue-800">
                {randomAdvice}
              </p>
            </div>
          </div>
        </div>

        {/* 5. CONTEXTE ENTREPRISE */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Building className="text-gray-600 flex-shrink-0" size={20} />
            <div>
              <div className="font-semibold text-gray-900 mb-1">
                {t('results_view.about_sponsor')}
              </div>
              <p className="text-gray-700">
                {result.companyContext}
              </p>
            </div>
          </div>
        </div>

        {/* 6. CE QUE TU PERDS */}
        {result.difference > 0 && result.verdict !== 'GOOD' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-600">
              <DollarSign size={20} />
              <p className="font-medium">
                {t('results_view.leaving_on_table', { amount: formatPrice(result.difference) })}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 7. CTA TEASING */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Lock size={32} />
            <h3 className="text-2xl font-bold">
              {t('results_view.cta_title')}
            </h3>
          </div>

          <p className="text-xl text-white/90 mb-6">
            {t('results_view.cta_unlock', { range: '$??? - $???' })}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={14} />
              </div>
              <span>{t('results_view.cta_precise_range')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={14} />
              </div>
              <span>{t('results_view.cta_detailed_breakdown')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={14} />
              </div>
              <span>{t('results_view.cta_negotiation_insights')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={14} />
              </div>
              <span>{t('results_view.cta_media_kit_gen')}</span>
            </div>
          </div>

          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors shadow-lg"
          >
            {t('results_view.unlock_my_price')}
            <ArrowRight size={20} />
            <span className="ml-2 text-sm">{t('results_view.per_month')}</span>
          </Link>
        </div>
      </div>

      {/* 8. BOUTON RESET */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="text-gray-600 hover:text-gray-900 underline transition-colors"
        >
          {t('results_view.actions.evaluate_another')}
        </button>
      </div>
    </div>
  )
}

export default FreeResultCard
