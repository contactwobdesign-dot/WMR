import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  Sparkles, 
  Building, 
  TrendingUp, 
  Download, 
  Mail, 
  Save, 
  ChevronDown,
  Globe,
  Crown
} from 'lucide-react'
import { useCurrency } from '../../context/CurrencyContext.jsx'
import { NICHES } from '../../lib/constants'

const CURRENCY_LABELS = { USD: 'USD', EUR: 'EUR', GBP: 'GBP', CAD: 'CAD', AUD: 'AUD' }

function PremiumResultCard({ result, formData, onReset, onSave }) {
  const { t } = useTranslation()
  const { formatPrice, currency } = useCurrency()

  // Sécurité : si aucun résultat, ne rien rendre pour éviter les crashes
  if (!result) {
    console.log('PremiumResultCard received null result')
    return null
  }

  const [showBreakdown, setShowBreakdown] = useState(true)

  // Get niche label for display
  const nicheData = NICHES.find(n => n.value === formData.niche)
  const nicheLabel = nicheData?.label || formData.niche

  // Offre initiale marque (Brand Offer Price) pour comparaison avec le tarif recommandé
  const brandOffer = formData?.offeredPrice != null && formData.offeredPrice !== ''
    ? Number(formData.offeredPrice)
    : 0
  const calculatedRate = result?.average ?? 0
  const delta = calculatedRate - brandOffer

  // Determine company card style based on size
  const getCompanyStyle = () => {
    switch (formData.companySize) {
      case 'startup':
        return 'bg-blue-50 border-blue-200'
      case 'medium':
        return 'bg-gray-50 border-gray-200'
      case 'large':
        return 'bg-green-50 border-green-200'
      case 'enterprise':
        return 'bg-amber-50 border-amber-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="animate-fadeIn space-y-6">
      {/* Main Result Card */}
      <div className="bg-white rounded-xl shadow-md border border-amber-200 p-8">
        {/* 1. HEADER PREMIUM */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Crown size={16} />
            {t('results_view.pro_result_badge')}
          </div>
          
          <div className="mb-4">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {formatPrice(result.min)} - {formatPrice(result.max)}
            </div>
            <p className="text-gray-600 text-lg">
              {t('results_view.recommended_rate')}
              <span className="block text-sm font-medium text-gray-500 mt-1">
                {t('results_view.estimated_rate', { currency: CURRENCY_LABELS[currency] || currency })}
              </span>
            </p>
          </div>

          {/* 2. PRIX MOYEN */}
          <div className="inline-flex flex-col items-center bg-green-50 border-2 border-green-200 rounded-lg px-8 py-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="text-green-600" size={20} />
              <span className="text-2xl font-bold text-green-700">
                {formatPrice(result.average)}
              </span>
            </div>
            <span className="text-sm text-green-600 font-medium">
              {t('results_view.sweet_spot')}
            </span>
          </div>

          {/* 2b. Comparaison avec l'offre initiale si renseignée */}
          {brandOffer > 0 && (
            <div className={`mt-4 p-4 rounded-lg border flex flex-wrap justify-between items-center gap-3 ${delta > 0 ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-200'}`}>
              <div className="flex flex-col min-w-0">
                <span className={`text-xs font-medium uppercase ${delta > 0 ? 'text-amber-800' : 'text-green-800'}`}>{t('results_view.offer_initial')}</span>
                <span className={delta > 0 ? 'text-sm text-gray-500 line-through truncate' : 'text-sm text-green-700 font-bold bg-green-100 px-2 py-0.5 rounded truncate inline-block w-fit'}>
                  {formatPrice(brandOffer)}
                </span>
              </div>
              <div className="flex flex-col items-end min-w-0">
                {delta > 0 ? (
                  <>
                    <span className="text-xs text-green-700 font-medium uppercase">{t('results_view.amount_to_negotiate')}</span>
                    <span className="text-lg font-bold text-green-600 truncate">
                      +{formatPrice(delta)}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-green-700 font-medium uppercase">{t('results_view.verdict_label')}</span>
                    <span className="text-sm font-semibold text-green-600 truncate">
                      {t('results_view.offer_very_favorable')}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 3. CONSEILS CONTEXTUELS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Card Entreprise */}
          <div className={`${getCompanyStyle()} border-2 rounded-lg p-4`}>
            <div className="flex items-start gap-3">
              <Building className="text-gray-700 flex-shrink-0 mt-1" size={20} />
              <div>
<div className="font-semibold text-gray-900 mb-2">
                {result.breakdown.companyLabel}{t('results_view.company_suffix')}
                </div>
                <p className="text-sm text-gray-700">
                  {result.breakdown.companyAdvice}
                </p>
              </div>
            </div>
          </div>

          {/* Card Location */}
          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Globe className="text-purple-700 flex-shrink-0 mt-1" size={20} />
              <div>
<div className="font-semibold text-gray-900 mb-2">
                {result.breakdown.locationLabel}{t('results_view.audience_suffix')}
                </div>
                <p className="text-sm text-gray-700">
                  {result.breakdown.locationAdvice}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BREAKDOWN DÉTAILLÉ */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-8">
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="w-full bg-gray-50 px-6 py-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={20} className="text-primary-600" />
              <span className="font-semibold text-gray-900">
                {t('results_view.how_calculated')}
              </span>
            </div>
            <ChevronDown 
              size={20} 
              className={`text-gray-600 transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
            />
          </button>

          {showBreakdown && (
            <div className="px-6 py-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {t('results_view.base_cpm', { niche: nicheLabel })}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(result.breakdown.baseCPM)}{t('results_view.per_1000_views')}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {t('results_view.your_base_value', { views: formData.averageViews.toLocaleString() })}
                </span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(result.breakdown.basePrice)}
                </span>
              </div>

              <div className="border-t border-gray-200 my-3"></div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {t('results_view.audience_size', { label: result.breakdown.sizeLabel })}
                </span>
                <span className="font-semibold text-primary-600">
                  ×{result.breakdown.sizeMultiplier}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {t('results_view.content_type_mult', { label: result.breakdown.contentLabel })}
                </span>
                <span className="font-semibold text-primary-600">
                  ×{result.breakdown.contentMultiplier}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {t('results_view.engagement_mult', { label: result.breakdown.engagementLabel })}
                </span>
                <span className="font-semibold text-primary-600">
                  ×{result.breakdown.engagementMultiplier}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {t('results_view.company_budget', { label: result.breakdown.companyLabel })}
                </span>
                <span className="font-semibold text-primary-600">
                  ×{result.breakdown.companyMultiplier}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  {t('results_view.audience_location_mult', { label: result.breakdown.locationLabel })}
                </span>
                <span className="font-semibold text-primary-600">
                  ×{result.breakdown.locationMultiplier}
                </span>
              </div>

              <div className="border-t-2 border-gray-300 my-4"></div>

              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">
                  {t('results_view.final_rate')}
                </span>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {formatPrice(result.average)}
                  </div>
                  <div className="text-xs text-gray-600">
                    ({formatPrice(result.min)} - {formatPrice(result.max)})
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. PRO TIPS */}
        <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-primary-600" size={20} />
            <h3 className="font-bold text-gray-900">{t('results_view.pro_tips_title')}</h3>
          </div>
          
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-primary-600 font-bold mt-0.5">1.</span>
              <span>
                {t('results_view.tip_1', { max: formatPrice(result.max), avg: formatPrice(result.average) })}
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-primary-600 font-bold mt-0.5">2.</span>
              <span>
                {t('results_view.tip_2', { min: formatPrice(result.min) })}
              </span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-primary-600 font-bold mt-0.5">3.</span>
              {formData.companySize === 'enterprise' ? (
                <span>
                  {t('results_view.tip_3_enterprise')}
                </span>
              ) : (
                <span>
                  {t('results_view.tip_3_default')}
                </span>
              )}
            </li>
          </ul>
        </div>

        {/* 6. ACTIONS */}
        <div className="flex flex-wrap gap-3 mb-6">
          {onSave && (
            <button
              onClick={onSave}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
            >
              <Save size={20} />
              {t('results_view.actions.save_history')}
            </button>
          )}

          <button
            disabled
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-400 font-semibold px-6 py-3 rounded-lg cursor-not-allowed"
            title={t('results_view.actions.coming_soon')}
          >
            <Download size={20} />
            {t('results_view.actions.media_kit')}
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{t('results_view.actions.soon')}</span>
          </button>

          <button
            disabled
            className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-400 font-semibold px-6 py-3 rounded-lg cursor-not-allowed"
            title={t('results_view.actions.coming_soon')}
          >
            <Mail size={20} />
            {t('results_view.actions.email_templates')}
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">{t('results_view.actions.soon')}</span>
          </button>
        </div>

        {/* 7. BOUTON RESET */}
        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={onReset}
            className="text-gray-600 hover:text-gray-900 underline transition-colors font-medium"
          >
            {t('results_view.actions.calculate_another')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PremiumResultCard
