import { Helmet } from 'react-helmet-async'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BarChart3, DollarSign, CheckCircle, ArrowRight } from 'lucide-react'
import { Calculator } from '../components/Calculator'
import { useAuth } from '../hooks/useAuth.jsx'

function Home() {
  const { t } = useTranslation()
  const { isPremium, loading } = useAuth()

  if (!loading && isPremium()) {
    return <Navigate to="/dashboard" replace />
  }

  const scrollToCalculator = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Helmet>
        <title>{t('home.meta.title')}</title>
        <meta name="description" content={t('home.meta.description')} />
      </Helmet>
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('home.hero.title_start')}
                <span className="text-blue-600 font-bold" style={{ fontFamily: 'inherit' }}>
                  {t('home.hero.title_highlight')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 mt-4">
                {t('home.hero.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="shadow-lg rounded-xl">
            <Calculator isPremium={false} allowGuestSubmit />
          </div>
        </div>

        {/* How It Works */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('home.howItWorks.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('home.howItWorks.step1_title')}
                </h3>
                <p className="text-gray-600">
                  {t('home.howItWorks.step1_desc')}
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <DollarSign size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('home.howItWorks.step2_title')}
                </h3>
                <p className="text-gray-600">
                  {t('home.howItWorks.step2_desc')}
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {t('home.howItWorks.step3_title')}
                </h3>
                <p className="text-gray-600">
                  {t('home.howItWorks.step3_desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof / Stats */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold font-display text-primary-600 mb-2">{t('home.stats.stat1_value')}</div>
                <p className="text-gray-600">
                  {t('home.stats.stat1_text')}
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold font-display text-primary-600 mb-2">{t('home.stats.stat2_value')}</div>
                <p className="text-gray-600">
                  {t('home.stats.stat2_text')}
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold font-display text-primary-600 mb-2">{t('home.stats.stat3_value')}</div>
                <p className="text-gray-600">
                  {t('home.stats.stat3_text')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Creators Undercharge */}
        <div className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
              {t('home.undercharge.title')}
            </h2>
            <p className="text-lg text-gray-600 text-center mb-8">
              {t('home.undercharge.paragraph')}
            </p>
            <div className="text-center">
              <button
                onClick={scrollToCalculator}
                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg"
              >
                {t('home.undercharge.cta')}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div id="faq" className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('home.faq.title')}
            </h2>
            <div className="space-y-8">
              {/* FAQ 1 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.faq.q1')}
                </h3>
                <p className="text-gray-600">
                  {t('home.faq.a1')}
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.faq.q2')}
                </h3>
                <p className="text-gray-600">
                  {t('home.faq.a2')}
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.faq.q3')}
                </h3>
                <p className="text-gray-600">
                  {t('home.faq.a3')}
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.faq.q4')}
                </h3>
                <p className="text-gray-600">
                  {t('home.faq.a4')}
                </p>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t('home.faq.q5')}
                </h3>
                <p className="text-gray-600">
                  {t('home.faq.a5')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="py-20 bg-primary-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              {t('home.finalCta.title')}
            </h2>
            <button
              onClick={scrollToCalculator}
              className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              {t('home.finalCta.button')}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
