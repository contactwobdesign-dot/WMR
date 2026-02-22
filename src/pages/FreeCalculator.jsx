import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Calculator } from '../components/Calculator'

function FreeCalculator() {
  const { t } = useTranslation()
  return (
    <>
      <Helmet>
        <title>YouTube Sponsorship Calculator - Is Your Brand Deal Worth It? | WMR</title>
        <meta name="description" content="Calculate the real value of your YouTube, TikTok, or Instagram sponsorships in 30 seconds. Don't get lowballed by brands anymore." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('free_calculator.hero_start')}<span className="text-primary-600 font-bold" style={{ fontFamily: 'inherit' }}>{t('free_calculator.hero_highlight')}</span>
            </h1>
            <p className="text-xl text-gray-600">
              {t('free_calculator.subtitle')}
            </p>
          </div>

          {/* Calculator */}
          <Calculator isPremium={false} />
        </div>
      </div>
    </>
  )
}

export default FreeCalculator
