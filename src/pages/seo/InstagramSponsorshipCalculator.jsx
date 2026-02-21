import { SEOPageLayout } from '../../components/SEO'
import { useTranslation } from 'react-i18next'

function InstagramSponsorshipCalculator() {
  const { t } = useTranslation()

  return (
    <SEOPageLayout
      title={t('seo_calculators.instagram.title')}
      subtitle={t('seo_calculators.instagram.subtitle')}
      metaTitle="Instagram Sponsorship Calculator 2025 - Influencer Rate Guide"
      metaDescription="Free Instagram sponsorship calculator. Find out how much to charge for sponsored posts, Reels, and Stories based on your followers and engagement."
      canonicalPath="/instagram-sponsorship-calculator"
      platform="instagram"
    >
      {/* SEO Content */}
      <h2>{t('seo_calculators.instagram.content.pricing_title')}</h2>
      <p>
        {t('seo_calculators.instagram.content.pricing_desc_1')}
      </p>
      <p>
        {t('seo_calculators.instagram.content.pricing_desc_2')}
      </p>

      <h3>{t('seo_calculators.instagram.content.types_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.types_intro')}
      </p>
      <ul>
        <li>
          <strong>{t('seo_calculators.instagram.content.types_posts_title')}</strong>
          {' - '}
          {t('seo_calculators.instagram.content.types_posts_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.instagram.content.types_reels_title')}</strong>
          {' - '}
          {t('seo_calculators.instagram.content.types_reels_desc')}
        </li>
        <li>
          <strong>{t('seo_calculators.instagram.content.types_stories_title')}</strong>
          {' - '}
          {t('seo_calculators.instagram.content.types_stories_desc')}
        </li>
      </ul>

      <h2>{t('seo_calculators.instagram.content.rates_title')}</h2>
      <p>
        {t('seo_calculators.instagram.content.rates_intro')}
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.instagram.content.rates_table_followers')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.instagram.content.rates_table_post_rate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.instagram.content.rates_table_reel_rate')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.instagram.content.rates_table_story_rate')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.instagram.content.rates_row_nano')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $50-$250
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $75-$300
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $25-$100
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.instagram.content.rates_row_micro')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $250-$1,000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $300-$1,500
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $100-$400
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.instagram.content.rates_row_mid')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $1,000-$5,000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $1,500-$7,500
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $400-$1,500
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.instagram.content.rates_row_macro')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $5,000-$15,000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $7,500-$20,000
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $1,500-$5,000
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.instagram.content.rates_row_mega')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $15,000+
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $20,000+
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                $5,000+
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 italic">
        <strong>{t('seo_calculators.instagram.content.rates_note_label')}</strong>{' '}
        {t('seo_calculators.instagram.content.rates_note_text')}
      </p>

      <h2>{t('seo_calculators.instagram.content.value_title')}</h2>
      <p>
        {t('seo_calculators.instagram.content.value_intro')}
      </p>

      <h3>{t('seo_calculators.instagram.content.value_posts_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.value_posts_desc_1')}
      </p>
      <ul>
        <li><strong>Stay forever</strong> - Continue generating impressions, saves, and shares months after posting</li>
        <li><strong>Build your aesthetic</strong> - Become part of your visual brand and portfolio</li>
        <li><strong>Rank in search</strong> - Get discovered through hashtags, Explore page, and Google Images</li>
        <li><strong>Higher production value</strong> - Usually require more time, editing, and setup than Stories</li>
      </ul>
      <p>
        {t('seo_calculators.instagram.content.value_posts_desc_2')}
      </p>

      <h3>{t('seo_calculators.instagram.content.value_reels_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.value_reels_desc_1')}
      </p>
      <ul>
        <li><strong>5-10x reach</strong> - Reels often reach 5-10 times more people than your follower count</li>
        <li><strong>Viral potential</strong> - Can explode beyond your audience to millions of viewers</li>
        <li><strong>Platform priority</strong> - Instagram is competing with TikTok and heavily promotes Reels</li>
        <li><strong>Engagement boost</strong> - Reels typically get higher engagement rates than static posts</li>
      </ul>
      <p>
        {t('seo_calculators.instagram.content.value_reels_desc_2')}
      </p>

      <h3>{t('seo_calculators.instagram.content.value_stories_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.value_stories_desc_1')}
      </p>
      <ul>
        <li><strong>Temporary content</strong> - Gone in 24 hours unless you add to Highlights</li>
        <li><strong>Lower production</strong> - Usually quick, behind-the-scenes, more casual content</li>
        <li><strong>Limited reach</strong> - Only shown to a portion of your followers unless they actively check</li>
        <li><strong>Time-sensitive</strong> - Great for flash sales, limited offers, or event promotion</li>
      </ul>
      <p>
        {t('seo_calculators.instagram.content.value_stories_desc_2')}
      </p>

      <h2>{t('seo_calculators.instagram.content.factors_title')}</h2>
      <p>
        {t('seo_calculators.instagram.content.factors_intro')}
      </p>

      <h3>{t('seo_calculators.instagram.content.factors_engagement_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.factors_engagement_desc_1')}
      </p>
      <p>
        <strong>{t('seo_calculators.instagram.content.factors_engagement_benchmarks_label')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.factors_engagement_benchmarks_low')}</li>
        <li>{t('seo_calculators.instagram.content.factors_engagement_benchmarks_avg')}</li>
        <li>{t('seo_calculators.instagram.content.factors_engagement_benchmarks_good')}</li>
        <li>{t('seo_calculators.instagram.content.factors_engagement_benchmarks_excellent')}</li>
      </ul>

      <h3>{t('seo_calculators.instagram.content.factors_niche_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.factors_niche_desc')}
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.factors_niche_premium')}</li>
        <li>{t('seo_calculators.instagram.content.factors_niche_mid')}</li>
        <li>{t('seo_calculators.instagram.content.factors_niche_standard')}</li>
      </ul>

      <h3>{t('seo_calculators.instagram.content.factors_demo_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.factors_demo_desc_1')}
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.factors_demo_highest')}</li>
        <li>{t('seo_calculators.instagram.content.factors_demo_high')}</li>
        <li>{t('seo_calculators.instagram.content.factors_demo_medium')}</li>
        <li>{t('seo_calculators.instagram.content.factors_demo_lower')}</li>
      </ul>
      <p>
        {t('seo_calculators.instagram.content.factors_demo_warning')}
      </p>

      <h3>{t('seo_calculators.instagram.content.factors_quality_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.factors_quality_desc')}
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.factors_quality_list1')}</li>
        <li>{t('seo_calculators.instagram.content.factors_quality_list2')}</li>
        <li>{t('seo_calculators.instagram.content.factors_quality_list3')}</li>
        <li>{t('seo_calculators.instagram.content.factors_quality_list4')}</li>
      </ul>
      <p>
        {t('seo_calculators.instagram.content.factors_quality_desc')}
      </p>

      <h3>{t('seo_calculators.instagram.content.factors_fit_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.factors_fit_desc')}
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.factors_fit_perfect')}</li>
        <li>{t('seo_calculators.instagram.content.factors_fit_ok')}</li>
        <li>{t('seo_calculators.instagram.content.factors_fit_stretch')}</li>
        <li>{t('seo_calculators.instagram.content.factors_fit_offbrand')}</li>
      </ul>
      <h2>{t('seo_calculators.instagram.content.factors_title')}</h2>

      <h3>{t('seo_calculators.instagram.content.faq_engagement_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.faq_engagement_intro')}{' '}
        <strong>{t('seo_calculators.instagram.content.faq_engagement_formula_strong')}</strong>
      </p>
      <p>
        {t('seo_calculators.instagram.content.faq_engagement_example')}
      </p>
      <p>
        {t('seo_calculators.instagram.content.faq_engagement_note')}
      </p>

      <h3>{t('seo_calculators.instagram.content.faq_campaign_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.faq_campaign_intro')}
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.faq_campaign_per_post')}</li>
        <li>{t('seo_calculators.instagram.content.faq_campaign_per_campaign')}</li>
      </ul>
      <p>
        {t('seo_calculators.instagram.content.faq_campaign_example')}
      </p>

      <h3>{t('seo_calculators.instagram.content.faq_affiliate_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.faq_affiliate_intro')}
      </p>
      <p>
        <strong>{t('seo_calculators.instagram.content.faq_affiliate_flat_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.faq_affiliate_flat_1')}</li>
        <li>{t('seo_calculators.instagram.content.faq_affiliate_flat_2')}</li>
        <li>{t('seo_calculators.instagram.content.faq_affiliate_flat_3')}</li>
        <li>{t('seo_calculators.instagram.content.faq_affiliate_flat_4')}</li>
      </ul>
      <p>
        <strong>{t('seo_calculators.instagram.content.faq_affiliate_perf_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.faq_affiliate_perf_1')}</li>
        <li>{t('seo_calculators.instagram.content.faq_affiliate_perf_2')}</li>
        <li>{t('seo_calculators.instagram.content.faq_affiliate_perf_3')}</li>
        <li>{t('seo_calculators.instagram.content.faq_affiliate_perf_4')}</li>
      </ul>
      <p>
        {t('seo_calculators.instagram.content.faq_affiliate_hybrid')}
      </p>

      <h3>{t('seo_calculators.instagram.content.faq_negotiate_title')}</h3>
      <p>
        {t('seo_calculators.instagram.content.faq_negotiate_intro')}
      </p>
      <ul>
        <li>{t('seo_calculators.instagram.content.faq_negotiate_step1')}</li>
        <li>{t('seo_calculators.instagram.content.faq_negotiate_step2')}</li>
        <li>{t('seo_calculators.instagram.content.faq_negotiate_step3')}</li>
        <li>{t('seo_calculators.instagram.content.faq_negotiate_step4')}</li>
        <li>{t('seo_calculators.instagram.content.faq_negotiate_step5')}</li>
      </ul>
      <p>
        {t('seo_calculators.instagram.content.faq_negotiate_closing')}
      </p>

      <h2>{t('seo_calculators.instagram.content.cta_title')}</h2>
      <p>
        {t('seo_calculators.instagram.content.cta_desc_1')}
      </p>
      <p>
        {t('seo_calculators.instagram.content.cta_desc_2_before_link')}
        <a
          href="/pricing"
          className="text-primary-600 hover:text-primary-700 underline"
        >
          {t('seo_calculators.instagram.content.cta_desc_2_link_text')}
        </a>
        .
      </p>

      <h3>{t('seo_calculators.instagram.content.related_title')}</h3>
      <ul>
        <li>
          <a
            href="/youtube-sponsorship-calculator"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.instagram.content.related_youtube')}
          </a>
        </li>
        <li>
          <a
            href="/tiktok-sponsorship-calculator"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.instagram.content.related_tiktok')}
          </a>
        </li>
        <li>
          <a
            href="/pricing"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            {t('seo_calculators.instagram.content.related_pricing')}
          </a>
        </li>
      </ul>
    </SEOPageLayout>
  )
}

export default InstagramSponsorshipCalculator
