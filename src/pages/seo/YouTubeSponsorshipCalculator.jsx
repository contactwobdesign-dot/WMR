import { SEOPageLayout } from '../../components/SEO'
import { useTranslation } from 'react-i18next'

function YouTubeSponsorshipCalculator() {
  const { t } = useTranslation()

  return (
    <SEOPageLayout
      title={t('seo_calculators.youtube.title')}
      subtitle={t('seo_calculators.youtube.subtitle')}
      metaTitle="YouTube Sponsorship Calculator - Fair Rate Calculator"
      metaDescription="Free YouTube sponsorship calculator. Find out if brands are lowballing you. Based on real CPM data, audience size, engagement, and niche."
      canonicalPath="/youtube-sponsorship-calculator"
      platform="youtube"
    >
      {/* SEO Content */}
      <h2>{t('seo_calculators.youtube.content.pricing_title')}</h2>
      <p>
        {t('seo_calculators.youtube.content.pricing_desc')}
      </p>

      <h3>{t('seo_calculators.youtube.content.factors_title')}</h3>
      <p>
        {t('seo_calculators.youtube.content.factors_intro')}
      </p>
      <ul>
        <li>
          <strong>{t('seo_calculators.youtube.content.factors_subs_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.factors_subs_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.factors_views_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.factors_views_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.factors_engagement_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.factors_engagement_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.factors_niche_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.factors_niche_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.factors_location_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.factors_location_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.factors_type_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.factors_type_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.factors_company_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.factors_company_desc')}
        </li>
      </ul>

      <h3>{t('seo_calculators.youtube.content.benchmarks_title')}</h3>
      <p>
        {t('seo_calculators.youtube.content.benchmarks_intro')}
      </p>
      <ul>
        <li>
          <strong>{t('seo_calculators.youtube.content.benchmarks_finance_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.benchmarks_finance_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.benchmarks_tech_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.benchmarks_tech_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.benchmarks_health_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.benchmarks_health_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.benchmarks_lifestyle_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.benchmarks_lifestyle_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.benchmarks_gaming_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.benchmarks_gaming_desc')}
        </li>
      </ul>
      <p>
        <em>{t('seo_calculators.youtube.content.benchmarks_note')}</em>
      </p>

      <h3>{t('seo_calculators.youtube.content.how_title')}</h3>
      <ol>
        <li>{t('seo_calculators.youtube.content.how_step1')}</li>
        <li>{t('seo_calculators.youtube.content.how_step2')}</li>
        <li>{t('seo_calculators.youtube.content.how_step3')}</li>
        <li>{t('seo_calculators.youtube.content.how_step4')}</li>
        <li>{t('seo_calculators.youtube.content.how_step5')}</li>
        <li>{t('seo_calculators.youtube.content.how_step6')}</li>
        <li>{t('seo_calculators.youtube.content.how_step7')}</li>
        <li>{t('seo_calculators.youtube.content.how_step8')}</li>
        <li>{t('seo_calculators.youtube.content.how_step9')}</li>
      </ol>

      <h3>{t('seo_calculators.youtube.content.mistakes_title')}</h3>
      <h4>{t('seo_calculators.youtube.content.mistakes_1_title')}</h4>
      <p>
        {t('seo_calculators.youtube.content.mistakes_1_desc')}
      </p>

      <h4>{t('seo_calculators.youtube.content.mistakes_2_title')}</h4>
      <p>
        {t('seo_calculators.youtube.content.mistakes_2_desc')}
      </p>

      <h4>{t('seo_calculators.youtube.content.mistakes_3_title')}</h4>
      <p>
        {t('seo_calculators.youtube.content.mistakes_3_desc')}
      </p>

      <h4>{t('seo_calculators.youtube.content.mistakes_4_title')}</h4>
      <p>
        {t('seo_calculators.youtube.content.mistakes_4_desc')}
      </p>

      <h3>{t('seo_calculators.youtube.content.lowballed_title')}</h3>
      <p>
        {t('seo_calculators.youtube.content.lowballed_intro')}
      </p>
      <ul>
        <li>
          <strong>{t('seo_calculators.youtube.content.lowballed_step1_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.lowballed_step1_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.lowballed_step2_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.lowballed_step2_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.lowballed_step3_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.lowballed_step3_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.lowballed_step4_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.lowballed_step4_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.lowballed_step5_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.lowballed_step5_desc')}
        </li>
      </ul>

      <h3>{t('seo_calculators.youtube.content.accept_lower_title')}</h3>
      <p>
        {t('seo_calculators.youtube.content.accept_lower_intro')}
      </p>
      <ul>
        <li>
          <strong>{t('seo_calculators.youtube.content.accept_lower_reason1_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.accept_lower_reason1_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.accept_lower_reason2_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.accept_lower_reason2_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.accept_lower_reason3_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.accept_lower_reason3_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.youtube.content.accept_lower_reason4_label')}</strong>
          {' - '}
          {t('seo_calculators.youtube.content.accept_lower_reason4_desc')}
        </li>
      </ul>
      <p>
        {t('seo_calculators.youtube.content.accept_lower_warning')}
      </p>

      <h3>{t('seo_calculators.youtube.content.pro_title')}</h3>
      <p>
        {t('seo_calculators.youtube.content.pro_intro_before_strong')}{' '}
        <strong>{t('seo_calculators.youtube.content.pro_intro_strong')}</strong>
        {t('seo_calculators.youtube.content.pro_intro_after_strong')}
      </p>
      <ul>
        <li>{t('seo_calculators.youtube.content.pro_benefit1')}</li>
        <li>{t('seo_calculators.youtube.content.pro_benefit2')}</li>
        <li>{t('seo_calculators.youtube.content.pro_benefit3')}</li>
        <li>{t('seo_calculators.youtube.content.pro_benefit4')}</li>
      </ul>
      <p>
        <strong>{t('seo_calculators.youtube.content.pro_closing_strong')}</strong>{' '}
        {t('seo_calculators.youtube.content.pro_closing_text_before_link')}{' '}
        <a
          href="/pricing"
          className="text-primary-600 hover:text-primary-700 underline"
        >
          {t('seo_calculators.youtube.content.pro_closing_link_text')}
        </a>
        .
      </p>

      <h3>{t('seo_calculators.youtube.content.faq_title')}</h3>
      <h4>{t('seo_calculators.youtube.content.faq_q1_title')}</h4>
      <p>
        {t('seo_calculators.youtube.content.faq_q1_desc')}
      </p>

      <h4>{t('seo_calculators.youtube.content.faq_q2_title')}</h4>
      <p>
        {t('seo_calculators.youtube.content.faq_q2_desc')}
      </p>

      <h4>{t('seo_calculators.youtube.content.faq_q3_title')}</h4>
      <p>
        {t('seo_calculators.youtube.content.faq_q3_desc')}
      </p>

      <h4>{t('seo_calculators.youtube.content.faq_q4_title')}</h4>
      <p>
        {t('seo_calculators.youtube.content.faq_q4_desc')}
      </p>

      <h3>{t('seo_calculators.youtube.content.related_title')}</h3>
      <ul>
        <li>
          <a
            href="/instagram-sponsorship-calculator"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.youtube.content.related_instagram')}
          </a>
        </li>
        <li>
          <a
            href="/tiktok-sponsorship-calculator"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.youtube.content.related_tiktok')}
          </a>
        </li>
        <li>
          <a
            href="/podcast-sponsorship-calculator"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.youtube.content.related_podcast')}
          </a>
        </li>
      </ul>
    </SEOPageLayout>
  )
}

export default YouTubeSponsorshipCalculator
