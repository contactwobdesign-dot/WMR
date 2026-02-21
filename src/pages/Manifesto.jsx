import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Shield, AlertTriangle, CheckCircle2, X, Check, Calculator, ArrowRight } from 'lucide-react'
import { PageGradient } from '../components/Layout/PageGradient'

export default function Manifesto() {
  const { t } = useTranslation()

  return (
    <PageGradient>
      <Helmet>
        <title>{t('manifesto.meta.title')}</title>
        <meta name="description" content={t('manifesto.meta.description')} />
      </Helmet>

      <div className="min-h-screen bg-slate-50/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero Section SEO */}
          <section className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              {t('manifesto.hero.title_start')}
              <span className="text-blue-600 font-extrabold" style={{ fontFamily: 'inherit' }}>
                {t('manifesto.hero.title_highlight')}
              </span>
              {t('manifesto.hero.title_end')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('manifesto.hero.subtitle')}
            </p>
          </section>

          {/* Mission narrative */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
              {t('manifesto.mission.paragraph')}
            </p>
          </section>

          {/* Deux colonnes : ancienne méthode vs méthode avec l'app */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
                <h2 className="text-xl font-bold text-gray-900">{t('manifesto.comparison.old_title')}</h2>
              </div>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span><strong>{t('manifesto.comparison.old_1_label')}</strong>{t('manifesto.comparison.old_1_text')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span><strong>{t('manifesto.comparison.old_2_label')}</strong>{t('manifesto.comparison.old_2_text')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                  <span><strong>{t('manifesto.comparison.old_3_label')}</strong>{t('manifesto.comparison.old_3_text')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                <h2 className="text-xl font-bold text-gray-900">{t('manifesto.comparison.wmr_title')}</h2>
              </div>
              <ul className="space-y-4 text-gray-800">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>{t('manifesto.comparison.wmr_1_label')}</strong>{t('manifesto.comparison.wmr_1_text')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>{t('manifesto.comparison.wmr_2_label')}</strong>{t('manifesto.comparison.wmr_2_text')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong>{t('manifesto.comparison.wmr_3_label')}</strong>{t('manifesto.comparison.wmr_3_text')}</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section Méthodologie : transparence sur le calcul */}
          <section className="mt-20 text-center max-w-3xl mx-auto">
            <Calculator className="w-12 h-12 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{t('manifesto.methodology.title')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('manifesto.methodology.paragraph')}
            </p>
          </section>

          {/* Section Sécurité & Confidentialité */}
          <section className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden mt-24">
            <Shield className="w-16 h-16 text-indigo-400 mx-auto mb-6 relative z-10" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
              {t('manifesto.security.title')}
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed relative z-10">
              {t('manifesto.security.paragraph')}
            </p>
          </section>

          {/* Section Call To Action Final */}
          <section className="mt-24 mb-12 bg-gray-50 rounded-3xl p-8 md:p-12 text-center border border-gray-100 shadow-sm">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">
              {t('manifesto.cta.title')}
            </h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              {t('manifesto.cta.paragraph')}
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all shadow-md hover:shadow-lg"
            >
              {t('manifesto.cta.button')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </div>
      </div>
    </PageGradient>
  )
}
