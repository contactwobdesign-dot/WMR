import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { TrendingUp } from 'lucide-react'
import { Calculator } from '../components/Calculator'
import { useAuth } from '../hooks/useAuth.jsx'

function PremiumCalculator() {
  const { t } = useTranslation()
  const { user } = useAuth()

  return (
    <>
      <Helmet>
        <title>{t('premium_calculator.meta_title')}</title>
        <meta name="description" content={t('premium_calculator.subtitle')} />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
              <TrendingUp size={16} />
              {t('premium_calculator.title')}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('premium_calculator.hero_start')}<span className="text-amber-500">{t('premium_calculator.hero_highlight')}</span>
            </h1>
            <p className="text-xl text-gray-600">
              {t('premium_calculator.subtitle')}
            </p>
          </div>

          {/* Calculator */}
          <Calculator isPremium={true} user={user} />
        </div>
      </div>
    </>
  )
}

export default PremiumCalculator
