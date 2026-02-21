import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

function PrivacyPolicy() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('legal.privacy.title')} | WMR</title>
        <meta name="description" content={t('legal.privacy.meta_description')} />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <article className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('legal.privacy.title')}
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              {t('legal.privacy.updated_at')}
            </p>
          </header>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.privacy.section1_title')}</h2>
              <p className="text-sm leading-relaxed mb-2">
                {t('legal.privacy.section1_intro')}
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-2">
                <li><strong>{t('legal.privacy.section1_li1_strong')}</strong>{t('legal.privacy.section1_li1_after')}</li>
                <li><strong>{t('legal.privacy.section1_li2_strong')}</strong>{t('legal.privacy.section1_li2_after')}</li>
                <li><strong>{t('legal.privacy.section1_li3_strong')}</strong>{t('legal.privacy.section1_li3_after')}</li>
                <li><strong>{t('legal.privacy.section1_li4_strong')}</strong>{t('legal.privacy.section1_li4_after')}</li>
              </ul>
              <p className="text-sm leading-relaxed mt-3">
                <strong>{t('legal.privacy.section1_payment_strong')}</strong>
                {t('legal.privacy.section1_payment_mid')}
                <strong>{t('legal.privacy.section1_stripe_strong')}</strong>
                {t('legal.privacy.section1_payment_after')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.privacy.section2_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.privacy.section2_text')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.privacy.section3_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.privacy.section3_before')}
                <strong>{t('legal.privacy.section3_strong')}</strong>
                {t('legal.privacy.section3_after')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.privacy.section4_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.privacy.section4_before')}
                <strong>{t('legal.privacy.section4_strong')}</strong>
                {t('legal.privacy.section4_after')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.privacy.section5_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.privacy.section5_text')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.privacy.section6_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.privacy.section6_before')}
                <a href="mailto:contact.wobdesign@gmail.com" className="text-primary-600 hover:text-primary-700 hover:underline">
                  {t('legal.privacy.section6_link')}
                </a>
                {t('legal.privacy.section6_after')}
              </p>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}

export default PrivacyPolicy
