import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Home, ArrowRight } from 'lucide-react'

function NotFound() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('not_found.meta_title')}</title>
        <meta name="description" content={t('not_found.meta_description')} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <div className="text-8xl font-bold text-primary-600 mb-4">404</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {t('not_found.title')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('not_found.message')}
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Home size={20} />
              {t('not_found.go_home')}
            </Link>

            <div className="text-sm text-gray-600">
              <p className="mb-2">{t('not_found.or_try')}</p>
              <div className="space-x-4">
                <Link to="/calculator" className="text-primary-600 hover:text-primary-700 underline">
                  {t('not_found.calculator')}
                </Link>
                <Link to="/pricing" className="text-primary-600 hover:text-primary-700 underline">
                  {t('not_found.pricing')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
