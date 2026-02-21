import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'

function LegalNotice() {
  const { t } = useTranslation()

  return (
    <>
      <Helmet>
        <title>{t('legal.notice.title')} | WMR</title>
        <meta name="description" content={t('legal.notice.meta_description')} />
      </Helmet>

      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <article className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('legal.notice.title')}
            </h1>
            <p className="mt-2 text-gray-500 text-sm">
              {t('legal.notice.subtitle')}
            </p>
          </header>

          <div className="space-y-8 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.notice.section1_title')}</h2>
              <p className="text-sm leading-relaxed">
                <strong>{t('legal.notice.section1_company_strong')}</strong>
                <br />
                {t('legal.notice.section1_address')}
                <br />
                {t('legal.notice.section1_contact_before')}
                <a href="mailto:contact.wobdesign@gmail.com" className="text-primary-600 hover:text-primary-700 hover:underline">
                  {t('legal.notice.section1_link')}
                </a>
                {t('legal.notice.section1_contact_after')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.notice.section2_title')}</h2>
              <p className="text-sm leading-relaxed mb-3">
                <strong>{t('legal.notice.section2_front_strong')}</strong>
                <br />
                {t('legal.notice.section2_front_address')}
              </p>
              <p className="text-sm leading-relaxed">
                <strong>{t('legal.notice.section2_back_strong')}</strong>
                <br />
                {t('legal.notice.section2_back_address')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{t('legal.notice.section3_title')}</h2>
              <p className="text-sm leading-relaxed">
                {t('legal.notice.section3_before')}
                <a href="mailto:contact.wobdesign@gmail.com" className="text-primary-600 hover:text-primary-700 hover:underline">
                  {t('legal.notice.section3_link')}
                </a>
                {t('legal.notice.section3_after')}
              </p>
            </section>
          </div>
        </article>
      </div>
    </>
  )
}

export default LegalNotice
