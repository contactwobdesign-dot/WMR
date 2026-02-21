import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

function TermsOfService() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('legal.terms.title')} | WMR</title>
        <meta name="description" content={t('legal.terms.meta_description')} />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <article className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('legal.terms.title')}
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              {t('legal.terms.updated_at')}
            </p>
          </header>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.terms.section1_title')}</h2>
              <p className="text-sm leading-relaxed">
                <strong>{t('legal.terms.section1_service_strong')}</strong>
                {t('legal.terms.section1_service_after')}
                <strong>{t('legal.terms.section1_user_strong')}</strong>
                {t('legal.terms.section1_user_after')}
                <strong>{t('legal.terms.section1_sub_strong')}</strong>
                {t('legal.terms.section1_sub_after')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.terms.section2_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.terms.section2_text')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.terms.section3_title')}</h2>
              <p className="text-sm leading-relaxed mb-2">
                {t('legal.terms.section3_p1_before')}
                <strong>{t('legal.terms.section3_p1_strong')}</strong>
                {t('legal.terms.section3_p1_after')}
                <strong>{t('legal.terms.section3_p1_no_refund_strong')}</strong>
                {t('legal.terms.section3_p1_no_refund_after')}
              </p>
              <p className="text-sm leading-relaxed">
                {t('legal.terms.section3_p2_before')}
                <strong>{t('legal.terms.section3_p2_strong')}</strong>
                {t('legal.terms.section3_p2_after')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.terms.section4_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.terms.section4_before')}
                <strong>{t('legal.terms.section4_estimates_strong')}</strong>
                {t('legal.terms.section4_estimates_after')}
                <strong>{t('legal.terms.section4_guarantee_strong')}</strong>
                {t('legal.terms.section4_guarantee_after')}
                <strong>{t('legal.terms.section4_advice_strong')}</strong>
                {t('legal.terms.section4_advice_after')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.terms.section5_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.terms.section5_before')}
                <strong>{t('legal.terms.section5_as_is_strong')}</strong>
                {t('legal.terms.section5_as_is_after')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.terms.section6_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.terms.section6_text')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.terms.section7_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.terms.section7_before')}
                <a href="mailto:contact.wobdesign@gmail.com" className="text-primary-600 hover:text-primary-700 hover:underline">
                  {t('legal.terms.section7_link')}
                </a>
                {t('legal.terms.section7_after')}
              </p>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}

export default TermsOfService
