import { SEOPageLayout } from '../../components/SEO'
import { useTranslation } from 'react-i18next'

function TwitchSponsorshipCalculator() {
  const { t } = useTranslation()

  return (
    <SEOPageLayout
      title={t('seo_calculators.twitch.title')}
      subtitle={t('seo_calculators.twitch.subtitle')}
      metaTitle="Twitch Sponsorship Calculator 2025 - Streamer Rate Guide"
      metaDescription="Free Twitch sponsorship calculator. Find your rate for sponsored streams, segments, and mentions based on your average concurrent viewers."
      canonicalPath="/twitch-sponsorship-calculator"
      platform="twitch"
    >
      {/* SEO Content */}
      <h2>{t('seo_calculators.twitch.content.pricing_title')}</h2>
      <p>
        {t('seo_calculators.twitch.content.pricing_intro_1')}
      </p>
      <p>
        {t('seo_calculators.twitch.content.pricing_intro_2_before_strong')}
        <strong>{t('seo_calculators.twitch.content.pricing_intro_2_strong')}</strong>
        {t('seo_calculators.twitch.content.pricing_intro_2_after_strong')}
      </p>

      <h3>{t('seo_calculators.twitch.content.rates_benchmarks_title')}</h3>
      <p>
        {t('seo_calculators.twitch.content.rates_benchmarks_intro')}
      </p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
            <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>{t('seo_calculators.twitch.content.rates_table_tier')}</th>
            <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>{t('seo_calculators.twitch.content.rates_table_ccv')}</th>
            <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600' }}>{t('seo_calculators.twitch.content.rates_table_rate')}</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '12px' }}><strong>{t('seo_calculators.twitch.content.rates_row_small')}</strong></td>
            <td style={{ padding: '12px' }}>10-50</td>
            <td style={{ padding: '12px' }}>$50 - $200</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '12px' }}><strong>{t('seo_calculators.twitch.content.rates_row_growing')}</strong></td>
            <td style={{ padding: '12px' }}>50-200</td>
            <td style={{ padding: '12px' }}>$200 - $1,000</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '12px' }}><strong>{t('seo_calculators.twitch.content.rates_row_established')}</strong></td>
            <td style={{ padding: '12px' }}>200-1,000</td>
            <td style={{ padding: '12px' }}>$1,000 - $5,000</td>
          </tr>
          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
            <td style={{ padding: '12px' }}><strong>{t('seo_calculators.twitch.content.rates_row_partner')}</strong></td>
            <td style={{ padding: '12px' }}>1,000-5,000</td>
            <td style={{ padding: '12px' }}>$5,000 - $15,000</td>
          </tr>
          <tr>
            <td style={{ padding: '12px' }}><strong>{t('seo_calculators.twitch.content.rates_row_toptier')}</strong></td>
            <td style={{ padding: '12px' }}>5,000+</td>
            <td style={{ padding: '12px' }}>$15,000 - $50,000+</td>
          </tr>
        </tbody>
      </table>

      <p>
        <em>{t('seo_calculators.twitch.content.rates_note_before_em')}{t('seo_calculators.twitch.content.rates_note_em')}{t('seo_calculators.twitch.content.rates_note_after_em')}</em>
      </p>

      <h3>{t('seo_calculators.twitch.content.types_title')}</h3>
      <p>
        {t('seo_calculators.twitch.content.types_intro')}
      </p>

      <h4>{t('seo_calculators.twitch.content.type_mention_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.type_mention_desc')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.twitch.content.type_mention_pricing_label')}</strong> {t('seo_calculators.twitch.content.type_mention_pricing')}</li>
        <li><strong>{t('seo_calculators.twitch.content.type_mention_example_label')}</strong> {t('seo_calculators.twitch.content.type_mention_example')}</li>
        <li><strong>{t('seo_calculators.twitch.content.type_mention_best_label')}</strong> {t('seo_calculators.twitch.content.type_mention_best')}</li>
      </ul>

      <h4>{t('seo_calculators.twitch.content.type_segment_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.type_segment_desc')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.twitch.content.type_segment_pricing_label')}</strong> {t('seo_calculators.twitch.content.type_segment_pricing')}</li>
        <li><strong>{t('seo_calculators.twitch.content.type_segment_example_label')}</strong> {t('seo_calculators.twitch.content.type_segment_example')}</li>
        <li><strong>{t('seo_calculators.twitch.content.type_segment_best_label')}</strong> {t('seo_calculators.twitch.content.type_segment_best')}</li>
      </ul>

      <h4>{t('seo_calculators.twitch.content.type_full_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.type_full_desc')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.twitch.content.type_full_pricing_label')}</strong> {t('seo_calculators.twitch.content.type_full_pricing')}</li>
        <li><strong>{t('seo_calculators.twitch.content.type_full_example_label')}</strong> {t('seo_calculators.twitch.content.type_full_example')}</li>
        <li><strong>{t('seo_calculators.twitch.content.type_full_best_label')}</strong> {t('seo_calculators.twitch.content.type_full_best')}</li>
      </ul>

      <h4>{t('seo_calculators.twitch.content.type_multi_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.type_multi_desc')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.twitch.content.type_multi_pricing_label')}</strong> {t('seo_calculators.twitch.content.type_multi_pricing')}</li>
        <li><strong>{t('seo_calculators.twitch.content.type_multi_example_label')}</strong> {t('seo_calculators.twitch.content.type_multi_example')}</li>
        <li><strong>{t('seo_calculators.twitch.content.type_multi_best_label')}</strong> {t('seo_calculators.twitch.content.type_multi_best')}</li>
      </ul>

      <h3>{t('seo_calculators.twitch.content.why_title')}</h3>
      <p>
        {t('seo_calculators.twitch.content.why_intro')}
      </p>

      <h4>{t('seo_calculators.twitch.content.why_live_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.why_live_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.why_replay_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.why_replay_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.why_followers_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.why_followers_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.why_subs_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.why_subs_para')}
      </p>

      <h3>{t('seo_calculators.twitch.content.factors_title')}</h3>

      <h4>{t('seo_calculators.twitch.content.factors_niche_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.factors_niche_intro')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.twitch.content.factors_niche_li_1_label')}</strong> {t('seo_calculators.twitch.content.factors_niche_li_1_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.factors_niche_li_2_label')}</strong> {t('seo_calculators.twitch.content.factors_niche_li_2_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.factors_niche_li_3_label')}</strong> {t('seo_calculators.twitch.content.factors_niche_li_3_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.factors_niche_li_4_label')}</strong> {t('seo_calculators.twitch.content.factors_niche_li_4_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.factors_niche_li_5_label')}</strong> {t('seo_calculators.twitch.content.factors_niche_li_5_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.factors_niche_li_6_label')}</strong> {t('seo_calculators.twitch.content.factors_niche_li_6_desc')}</li>
      </ul>

      <h4>{t('seo_calculators.twitch.content.factors_chat_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.factors_chat_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.factors_subs_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.factors_subs_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.factors_demo_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.factors_demo_intro')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.twitch.content.factors_demo_li_1_label')}</strong> {t('seo_calculators.twitch.content.factors_demo_li_1_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.factors_demo_li_2_label')}</strong> {t('seo_calculators.twitch.content.factors_demo_li_2_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.factors_demo_li_3_label')}</strong> {t('seo_calculators.twitch.content.factors_demo_li_3_desc')}</li>
      </ul>

      <h4>{t('seo_calculators.twitch.content.factors_exclusivity_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.factors_exclusivity_para')}
      </p>

      <h3>{t('seo_calculators.twitch.content.faq_title')}</h3>

      <h4>{t('seo_calculators.twitch.content.faq_calc_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.faq_calc_para_1_before_strong')}
        <strong>{t('seo_calculators.twitch.content.faq_calc_para_1_strong')}</strong>
        {t('seo_calculators.twitch.content.faq_calc_para_1_after_strong')}
      </p>
      <p>
        {t('seo_calculators.twitch.content.faq_calc_para_2')}
      </p>

      <h4>{t('seo_calculators.twitch.content.faq_per_hour_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.faq_per_hour_para_1_before_strong')}
        <strong>{t('seo_calculators.twitch.content.faq_per_hour_para_1_strong')}</strong>
        {t('seo_calculators.twitch.content.faq_per_hour_para_1_after_strong')}
      </p>
      <p>
        {t('seo_calculators.twitch.content.faq_per_hour_para_2')}
      </p>

      <h4>{t('seo_calculators.twitch.content.faq_subs_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.faq_subs_para_1_before_strong')}
        <strong>{t('seo_calculators.twitch.content.faq_subs_para_1_strong')}</strong>
        {t('seo_calculators.twitch.content.faq_subs_para_1_after_strong')}
      </p>
      <p>
        {t('seo_calculators.twitch.content.faq_subs_para_2')}
      </p>

      <h4>{t('seo_calculators.twitch.content.faq_small_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.faq_small_para_1')}
      </p>
      <p>
        {t('seo_calculators.twitch.content.faq_small_para_2')}
      </p>

      <h4>{t('seo_calculators.twitch.content.faq_sponsor_vs_title')}</h4>
      <p>
        <strong>{t('seo_calculators.twitch.content.faq_sponsor_label')}</strong>{' '}
        {t('seo_calculators.twitch.content.faq_sponsor_para')}
      </p>
      <p>
        <strong>{t('seo_calculators.twitch.content.faq_affiliate_label')}</strong>{' '}
        {t('seo_calculators.twitch.content.faq_affiliate_para')}
      </p>
      <p>
        {t('seo_calculators.twitch.content.faq_hybrid_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.faq_find_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.faq_find_intro')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.twitch.content.faq_find_li_1_label')}</strong> {t('seo_calculators.twitch.content.faq_find_li_1_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.faq_find_li_2_label')}</strong> {t('seo_calculators.twitch.content.faq_find_li_2_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.faq_find_li_3_label')}</strong> {t('seo_calculators.twitch.content.faq_find_li_3_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.faq_find_li_4_label')}</strong> {t('seo_calculators.twitch.content.faq_find_li_4_desc')}</li>
        <li><strong>{t('seo_calculators.twitch.content.faq_find_li_5_label')}</strong> {t('seo_calculators.twitch.content.faq_find_li_5_desc')}</li>
      </ul>
      <p>
        {t('seo_calculators.twitch.content.faq_find_closing')}
      </p>

      <h3>{t('seo_calculators.twitch.content.mistakes_title')}</h3>

      <h4>{t('seo_calculators.twitch.content.mistake_ccv_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.mistake_ccv_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.mistake_free_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.mistake_free_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.mistake_boundaries_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.mistake_boundaries_para')}
      </p>

      <h4>{t('seo_calculators.twitch.content.mistake_untested_title')}</h4>
      <p>
        {t('seo_calculators.twitch.content.mistake_untested_para')}
      </p>

      <h3>{t('seo_calculators.twitch.content.cta_title')}</h3>
      <p>
        {t('seo_calculators.twitch.content.cta_para_1')}
      </p>
      <p>
        {t('seo_calculators.twitch.content.cta_para_2_before_strong')}
        <strong>{t('seo_calculators.twitch.content.cta_para_2_strong')}</strong>
        {t('seo_calculators.twitch.content.cta_para_2_after_strong')}
      </p>

      <h3>{t('seo_calculators.twitch.content.next_steps_title')}</h3>
      <p>
        {t('seo_calculators.twitch.content.next_steps_intro')}
      </p>
      <ol>
        <li>{t('seo_calculators.twitch.content.next_steps_li_1')}</li>
        <li>{t('seo_calculators.twitch.content.next_steps_li_2')}</li>
        <li>{t('seo_calculators.twitch.content.next_steps_li_3')}</li>
        <li>{t('seo_calculators.twitch.content.next_steps_li_4')}</li>
        <li>{t('seo_calculators.twitch.content.next_steps_li_5')}</li>
      </ol>
      <p>
        {t('seo_calculators.twitch.content.next_steps_closing')}
      </p>
    </SEOPageLayout>
  )
}

export default TwitchSponsorshipCalculator
