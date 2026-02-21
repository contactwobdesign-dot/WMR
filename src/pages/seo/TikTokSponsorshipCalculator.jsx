import { SEOPageLayout } from '../../components/SEO'
import { useTranslation } from 'react-i18next'

function TikTokSponsorshipCalculator() {
  const { t } = useTranslation()

  return (
    <SEOPageLayout
      title={t('seo_calculators.tiktok.title')}
      subtitle={t('seo_calculators.tiktok.subtitle')}
      metaTitle="TikTok Sponsorship Calculator 2025 - Creator Rate Guide"
      metaDescription="Free TikTok sponsorship calculator. Discover your market rate based on followers, views, and engagement rate."
      canonicalPath="/tiktok-sponsorship-calculator"
      platform="tiktok"
    >
      {/* SEO Content */}
      <h2>{t('seo_calculators.tiktok.content.pricing_title')}</h2>
      <p>
        {t('seo_calculators.tiktok.content.pricing_desc_1')}
      </p>
      <p>
        {t('seo_calculators.tiktok.content.pricing_desc_2_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.pricing_desc_2_strong')}</strong>
        {t('seo_calculators.tiktok.content.pricing_desc_2_after_strong')}
      </p>
      <p>
        {t('seo_calculators.tiktok.content.pricing_desc_3')}
      </p>

      <h2>{t('seo_calculators.tiktok.content.rates_title')}</h2>
      <p>
        {t('seo_calculators.tiktok.content.rates_intro')}
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.tiktok.content.rates_table_followers')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.tiktok.content.rates_table_video_rate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.tiktok.content.rates_table_expected_views')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.tiktok.content.rates_row_nano')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$50-$200</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">1k-5k views</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.tiktok.content.rates_row_micro')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$200-$1,000</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">5k-25k views</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.tiktok.content.rates_row_mid')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$1,000-$5,000</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">25k-100k views</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.tiktok.content.rates_row_macro')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$5,000-$20,000</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">100k-500k views</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.tiktok.content.rates_row_mega')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$20,000+</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">500k+ views</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 italic">
        <strong>{t('seo_calculators.tiktok.content.rates_note_label')}</strong>{' '}
        {t('seo_calculators.tiktok.content.rates_note_before_em')}
        <em>{t('seo_calculators.tiktok.content.rates_note_em')}</em>
        {t('seo_calculators.tiktok.content.rates_note_after_em')}
      </p>

      <h2>{t('seo_calculators.tiktok.content.fund_title')}</h2>
      <p>
        {t('seo_calculators.tiktok.content.fund_intro')}
      </p>

      <h3>{t('seo_calculators.tiktok.content.fund_earnings_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.fund_earnings_intro_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.fund_earnings_intro_strong')}</strong>
        {t('seo_calculators.tiktok.content.fund_earnings_intro_after_strong')}
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.fund_earnings_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.fund_earnings_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.fund_earnings_li_3')}</li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.fund_earnings_closing')}
      </p>

      <h3>{t('seo_calculators.tiktok.content.sponsor_earnings_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.sponsor_earnings_intro_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.sponsor_earnings_intro_strong')}</strong>
        {t('seo_calculators.tiktok.content.sponsor_earnings_intro_after_strong')}
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.sponsor_earnings_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.sponsor_earnings_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.sponsor_earnings_li_3')}</li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.sponsor_earnings_closing_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.sponsor_earnings_closing_strong')}</strong>
        {t('seo_calculators.tiktok.content.sponsor_earnings_closing_after_strong')}
      </p>

      <h3>{t('seo_calculators.tiktok.content.bottom_line_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.bottom_line_para')}
      </p>

      <h2>{t('seo_calculators.tiktok.content.why_different_title')}</h2>
      <p>
        {t('seo_calculators.tiktok.content.why_different_intro')}
      </p>

      <h3>{t('seo_calculators.tiktok.content.viral_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.viral_intro')}
      </p>
      <ul>
        <li>
          <strong>{t('seo_calculators.tiktok.content.viral_upside_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.viral_upside_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.tiktok.content.viral_downside_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.viral_downside_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.tiktok.content.viral_solution_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.viral_solution_desc')}
        </li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.viral_closing')}
      </p>

      <h3>{t('seo_calculators.tiktok.content.demographics_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.demographics_intro')}
      </p>
      <ul>
        <li>
          <strong>{t('seo_calculators.tiktok.content.demo_lower_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.demo_lower_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.tiktok.content.demo_niche_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.demo_niche_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.tiktok.content.demo_brand_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.demo_brand_desc')}
        </li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.demographics_closing')}
      </p>

      <h3>{t('seo_calculators.tiktok.content.production_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.production_intro')}
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.production_li_yt')}</li>
        <li>{t('seo_calculators.tiktok.content.production_li_ig')}</li>
        <li>{t('seo_calculators.tiktok.content.production_li_tt')}</li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.production_closing_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.production_closing_strong')}</strong>
        {t('seo_calculators.tiktok.content.production_closing_after_strong')}
      </p>

      <h3>{t('seo_calculators.tiktok.content.algorithm_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.algorithm_intro')}
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.algorithm_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.algorithm_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.algorithm_li_3')}</li>
        <li>{t('seo_calculators.tiktok.content.algorithm_li_4')}</li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.algorithm_closing_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.algorithm_closing_strong')}</strong>
        {t('seo_calculators.tiktok.content.algorithm_closing_after_strong')}
      </p>

      <h2>{t('seo_calculators.tiktok.content.how_calc_title')}</h2>
      <p>
        {t('seo_calculators.tiktok.content.how_calc_intro')}
      </p>
      <ol>
        <li>{t('seo_calculators.tiktok.content.how_calc_step_1')}</li>
        <li>{t('seo_calculators.tiktok.content.how_calc_step_2')}</li>
        <li>{t('seo_calculators.tiktok.content.how_calc_step_3')}</li>
        <li>{t('seo_calculators.tiktok.content.how_calc_step_4')}</li>
      </ol>
      <p>
        {t('seo_calculators.tiktok.content.how_calc_example_intro')}
      </p>
      <p>
        {t('seo_calculators.tiktok.content.how_calc_example_result_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.how_calc_example_result_strong')}</strong>
        {t('seo_calculators.tiktok.content.how_calc_example_result_after_strong')}
      </p>
      <p>
        {t('seo_calculators.tiktok.content.how_calc_honest')}
      </p>

      <h2>{t('seo_calculators.tiktok.content.faq_title')}</h2>

      <h3>{t('seo_calculators.tiktok.content.faq_per_video_title')}</h3>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_per_video_intro_strong')}</strong>
        {t('seo_calculators.tiktok.content.faq_per_video_intro_after_strong')}
      </p>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_per_video_recommended_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.faq_per_video_recommended_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_per_video_recommended_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_per_video_recommended_li_3')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_per_video_recommended_li_4')}</li>
      </ul>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_per_video_risky_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.faq_per_video_risky_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_per_video_risky_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_per_video_risky_li_3')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_per_video_risky_li_4')}</li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.faq_per_video_hybrid_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.faq_per_video_hybrid_strong')}</strong>
      </p>

      <h3>{t('seo_calculators.tiktok.content.faq_shop_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.faq_shop_intro')}
      </p>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_shop_pros_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.faq_shop_pros_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_shop_pros_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_shop_pros_li_3')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_shop_pros_li_4')}</li>
      </ul>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_shop_cons_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.faq_shop_cons_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_shop_cons_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_shop_cons_li_3')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_shop_cons_li_4')}</li>
      </ul>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_shop_best_strong')}</strong>{' '}
        {t('seo_calculators.tiktok.content.faq_shop_best_text')}
      </p>

      <h3>{t('seo_calculators.tiktok.content.faq_viral_title')}</h3>
      <p>
        {t('seo_calculators.tiktok.content.faq_viral_intro')}
      </p>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_viral_usage_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.faq_viral_usage_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_viral_usage_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_viral_usage_li_3')}</li>
      </ul>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_viral_bonus_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.tiktok.content.faq_viral_bonus_li_1')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_viral_bonus_li_2')}</li>
        <li>{t('seo_calculators.tiktok.content.faq_viral_bonus_li_3')}</li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.faq_viral_closing')}
      </p>
      <p>
        <strong>{t('seo_calculators.tiktok.content.faq_viral_dont_strong')}</strong>
        {t('seo_calculators.tiktok.content.faq_viral_dont_after_strong')}
      </p>

      <h2>{t('seo_calculators.tiktok.content.compare_title')}</h2>
      <p>
        {t('seo_calculators.tiktok.content.compare_intro')}
      </p>
      <ul>
        <li>
          <strong>{t('seo_calculators.tiktok.content.compare_yt_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.compare_yt_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.tiktok.content.compare_ig_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.compare_ig_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.tiktok.content.compare_tt_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.compare_tt_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.tiktok.content.compare_podcast_label')}</strong>{' '}
          {t('seo_calculators.tiktok.content.compare_podcast_desc')}
        </li>
      </ul>
      <p>
        {t('seo_calculators.tiktok.content.compare_advantage_before_strong')}
        <strong>{t('seo_calculators.tiktok.content.compare_advantage_strong')}</strong>
        {t('seo_calculators.tiktok.content.compare_advantage_after_strong')}
      </p>

      <h2>{t('seo_calculators.tiktok.content.cta_title')}</h2>
      <p>
        {t('seo_calculators.tiktok.content.cta_desc_1')}
      </p>
      <p>
        {t('seo_calculators.tiktok.content.cta_desc_2_before_link')}
        <a
          href="/pricing"
          className="text-primary-600 hover:text-primary-700 underline"
        >
          {t('seo_calculators.tiktok.content.cta_desc_2_link_text')}
        </a>
        .
      </p>

      <h3>{t('seo_calculators.tiktok.content.related_title')}</h3>
      <ul>
        <li>
          <a
            href="/youtube-sponsorship-calculator"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.tiktok.content.related_youtube')}
          </a>
        </li>
        <li>
          <a
            href="/instagram-sponsorship-calculator"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.tiktok.content.related_instagram')}
          </a>
        </li>
        <li>
          <a
            href="/pricing"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.tiktok.content.related_pricing')}
          </a>
        </li>
      </ul>
    </SEOPageLayout>
  )
}

export default TikTokSponsorshipCalculator
