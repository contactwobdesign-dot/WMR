import { SEOPageLayout } from '../../components/SEO'
import { useTranslation } from 'react-i18next'

function PodcastSponsorshipRates() {
  const { t } = useTranslation()

  return (
    <SEOPageLayout
      title={t('seo_calculators.podcast.title')}
      subtitle={t('seo_calculators.podcast.subtitle')}
      metaTitle="Podcast Sponsorship Rates Calculator 2025 - CPM Guide"
      metaDescription="Free podcast sponsorship calculator. Find your rate for pre-roll, mid-roll, and host-read ads based on your downloads per episode."
      canonicalPath="/podcast-sponsorship-rates"
      platform="podcast"
    >
      {/* SEO Content */}
      <h2>{t('seo_calculators.podcast.content.pricing_title')}</h2>
      <p>
        {t('seo_calculators.podcast.content.pricing_intro_1_before_strong')}
        <strong>{t('seo_calculators.podcast.content.pricing_intro_1_strong')}</strong>
        {t('seo_calculators.podcast.content.pricing_intro_1_after_strong')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.pricing_intro_2')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.pricing_intro_3_before_strong')}
        <strong>{t('seo_calculators.podcast.content.pricing_intro_3_strong')}</strong>
        {t('seo_calculators.podcast.content.pricing_intro_3_after_strong')}
      </p>

      <h2>{t('seo_calculators.podcast.content.rates_title')}</h2>
      <p>
        {t('seo_calculators.podcast.content.rates_intro')}
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.podcast.content.rates_table_downloads')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.podcast.content.rates_table_cpm')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_calculators.podcast.content.rates_table_episode')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.podcast.content.rates_row_small')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$18-$25 CPM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$9-$25</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.podcast.content.rates_row_growing')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$20-$30 CPM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$20-$150</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.podcast.content.rates_row_established')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$25-$35 CPM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$125-$350</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.podcast.content.rates_row_popular')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$25-$40 CPM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$250-$2,000</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {t('seo_calculators.podcast.content.rates_row_top')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$30-$50 CPM</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">$1,500+</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 italic">
        <strong>{t('seo_calculators.podcast.content.rates_note_before_strong')}</strong>
        {t('seo_calculators.podcast.content.rates_note_strong')}
        {t('seo_calculators.podcast.content.rates_note_after_strong')}
      </p>

      <h2>{t('seo_calculators.podcast.content.placement_title')}</h2>
      <p>
        {t('seo_calculators.podcast.content.placement_intro')}
      </p>

      <h3>{t('seo_calculators.podcast.content.preroll_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.preroll_desc')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.podcast.content.preroll_cpm_label')}</strong> {t('seo_calculators.podcast.content.preroll_cpm')}</li>
        <li><strong>{t('seo_calculators.podcast.content.preroll_pros_label')}</strong> {t('seo_calculators.podcast.content.preroll_pros')}</li>
        <li><strong>{t('seo_calculators.podcast.content.preroll_cons_label')}</strong> {t('seo_calculators.podcast.content.preroll_cons')}</li>
        <li><strong>{t('seo_calculators.podcast.content.preroll_best_label')}</strong> {t('seo_calculators.podcast.content.preroll_best')}</li>
      </ul>
      <p>
        {t('seo_calculators.podcast.content.preroll_closing')}
      </p>

      <h3>{t('seo_calculators.podcast.content.midroll_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.midroll_desc')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.podcast.content.midroll_cpm_label')}</strong> {t('seo_calculators.podcast.content.midroll_cpm')}</li>
        <li><strong>{t('seo_calculators.podcast.content.midroll_pros_label')}</strong> {t('seo_calculators.podcast.content.midroll_pros')}</li>
        <li><strong>{t('seo_calculators.podcast.content.midroll_cons_label')}</strong> {t('seo_calculators.podcast.content.midroll_cons')}</li>
        <li><strong>{t('seo_calculators.podcast.content.midroll_best_label')}</strong> {t('seo_calculators.podcast.content.midroll_best')}</li>
      </ul>
      <p>
        {t('seo_calculators.podcast.content.midroll_closing_before_strong')}
        <strong>{t('seo_calculators.podcast.content.midroll_closing_strong')}</strong>
        {t('seo_calculators.podcast.content.midroll_closing_after_strong')}
      </p>

      <h3>{t('seo_calculators.podcast.content.postroll_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.postroll_desc')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.podcast.content.postroll_cpm_label')}</strong> {t('seo_calculators.podcast.content.postroll_cpm')}</li>
        <li><strong>{t('seo_calculators.podcast.content.postroll_pros_label')}</strong> {t('seo_calculators.podcast.content.postroll_pros')}</li>
        <li><strong>{t('seo_calculators.podcast.content.postroll_cons_label')}</strong> {t('seo_calculators.podcast.content.postroll_cons')}</li>
        <li><strong>{t('seo_calculators.podcast.content.postroll_best_label')}</strong> {t('seo_calculators.podcast.content.postroll_best')}</li>
      </ul>
      <p>
        {t('seo_calculators.podcast.content.postroll_closing')}
      </p>

      <h3>{t('seo_calculators.podcast.content.cpm_breakdown_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.cpm_breakdown_intro')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.podcast.content.cpm_breakdown_preroll_label')}</strong> {t('seo_calculators.podcast.content.cpm_breakdown_preroll')}</li>
        <li><strong>{t('seo_calculators.podcast.content.cpm_breakdown_midroll_label')}</strong> {t('seo_calculators.podcast.content.cpm_breakdown_midroll')}</li>
        <li><strong>{t('seo_calculators.podcast.content.cpm_breakdown_postroll_label')}</strong> {t('seo_calculators.podcast.content.cpm_breakdown_postroll')}</li>
      </ul>
      <p>
        {t('seo_calculators.podcast.content.cpm_breakdown_closing_before_strong')}
        <strong>{t('seo_calculators.podcast.content.cpm_breakdown_closing_strong')}</strong>
        {t('seo_calculators.podcast.content.cpm_breakdown_closing_after_strong')}
      </p>

      <h2>{t('seo_calculators.podcast.content.hostread_title')}</h2>
      <p>
        {t('seo_calculators.podcast.content.hostread_intro')}
      </p>

      <h3>{t('seo_calculators.podcast.content.hostread_trust_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.hostread_trust_para_1')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.hostread_trust_para_2')}
      </p>

      <h3>{t('seo_calculators.podcast.content.hostread_conversion_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.hostread_conversion_para_1')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.hostread_conversion_para_2')}
      </p>

      <h3>{t('seo_calculators.podcast.content.hostread_personal_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.hostread_personal_para_1')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.hostread_personal_para_2')}
      </p>

      <h3>{t('seo_calculators.podcast.content.hostread_premium_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.hostread_premium_intro')}
      </p>
      <ul>
        <li><strong>{t('seo_calculators.podcast.content.hostread_premium_li_1_label')}</strong> {t('seo_calculators.podcast.content.hostread_premium_li_1')}</li>
        <li><strong>{t('seo_calculators.podcast.content.hostread_premium_li_2_label')}</strong> {t('seo_calculators.podcast.content.hostread_premium_li_2')}</li>
        <li><strong>{t('seo_calculators.podcast.content.hostread_premium_li_3_label')}</strong> {t('seo_calculators.podcast.content.hostread_premium_li_3')}</li>
      </ul>
      <p>
        {t('seo_calculators.podcast.content.hostread_premium_closing_before_strong')}
        <strong>{t('seo_calculators.podcast.content.hostread_premium_closing_strong')}</strong>
        {t('seo_calculators.podcast.content.hostread_premium_closing_after_strong')}
      </p>

      <h2>{t('seo_calculators.podcast.content.how_calc_title')}</h2>
      <p>
        {t('seo_calculators.podcast.content.how_calc_intro')}
      </p>
      <p>
        <strong>{t('seo_calculators.podcast.content.how_calc_formula')}</strong>
      </p>
      <p>
        <strong>{t('seo_calculators.podcast.content.how_calc_ex1_label')}</strong>{' '}
        {t('seo_calculators.podcast.content.how_calc_ex1')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.how_calc_ex1_result_before_strong')}
        <strong>{t('seo_calculators.podcast.content.how_calc_ex1_result_strong')}</strong>
      </p>
      <p>
        <strong>{t('seo_calculators.podcast.content.how_calc_ex2_label')}</strong>{' '}
        {t('seo_calculators.podcast.content.how_calc_ex2')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.how_calc_ex2_result_before_strong')}
        <strong>{t('seo_calculators.podcast.content.how_calc_ex2_result_strong')}</strong>
      </p>
      <p>
        {t('seo_calculators.podcast.content.how_calc_note_before_strong')}
        <strong>{t('seo_calculators.podcast.content.how_calc_note_strong')}</strong>
        {t('seo_calculators.podcast.content.how_calc_note_after_strong')}
      </p>

      <h2>{t('seo_calculators.podcast.content.faq_title')}</h2>

      <h3>{t('seo_calculators.podcast.content.faq_cpm_title')}</h3>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_cpm_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.podcast.content.faq_cpm_li_1')}</li>
        <li>{t('seo_calculators.podcast.content.faq_cpm_li_2')}</li>
        <li>{t('seo_calculators.podcast.content.faq_cpm_li_3')}</li>
        <li>{t('seo_calculators.podcast.content.faq_cpm_li_4')}</li>
      </ul>
      <p>
        {t('seo_calculators.podcast.content.faq_cpm_closing')}
      </p>

      <h3>{t('seo_calculators.podcast.content.faq_network_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.faq_network_intro')}
      </p>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_network_join_strong')}</strong>
      </p>
      <ul>
        <li><strong>{t('seo_calculators.podcast.content.faq_network_join_pros_label')}</strong> {t('seo_calculators.podcast.content.faq_network_join_pros')}</li>
        <li><strong>{t('seo_calculators.podcast.content.faq_network_join_cons_label')}</strong> {t('seo_calculators.podcast.content.faq_network_join_cons')}</li>
        <li><strong>{t('seo_calculators.podcast.content.faq_network_join_best_label')}</strong> {t('seo_calculators.podcast.content.faq_network_join_best')}</li>
      </ul>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_network_diy_strong')}</strong>
      </p>
      <ul>
        <li><strong>{t('seo_calculators.podcast.content.faq_network_diy_pros_label')}</strong> {t('seo_calculators.podcast.content.faq_network_diy_pros')}</li>
        <li><strong>{t('seo_calculators.podcast.content.faq_network_diy_cons_label')}</strong> {t('seo_calculators.podcast.content.faq_network_diy_cons')}</li>
        <li><strong>{t('seo_calculators.podcast.content.faq_network_diy_best_label')}</strong> {t('seo_calculators.podcast.content.faq_network_diy_best')}</li>
      </ul>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_network_rec_strong')}</strong>{' '}
        {t('seo_calculators.podcast.content.faq_network_rec_text')}
      </p>

      <h3>{t('seo_calculators.podcast.content.faq_prove_title')}</h3>
      <p>
        {t('seo_calculators.podcast.content.faq_prove_intro')}
      </p>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_prove_platform_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.podcast.content.faq_prove_platform_li_1')}</li>
        <li>{t('seo_calculators.podcast.content.faq_prove_platform_li_2')}</li>
        <li>{t('seo_calculators.podcast.content.faq_prove_platform_li_3')}</li>
        <li>{t('seo_calculators.podcast.content.faq_prove_platform_li_4')}</li>
      </ul>
      <p>
        {t('seo_calculators.podcast.content.faq_prove_avoid')}
      </p>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_prove_share_strong')}</strong>
      </p>
      <ul>
        <li>{t('seo_calculators.podcast.content.faq_prove_share_li_1')}</li>
        <li>{t('seo_calculators.podcast.content.faq_prove_share_li_2')}</li>
        <li>{t('seo_calculators.podcast.content.faq_prove_share_li_3')}</li>
        <li>{t('seo_calculators.podcast.content.faq_prove_share_li_4')}</li>
      </ul>
      <p>
        {t('seo_calculators.podcast.content.faq_prove_closing')}
      </p>

      <h3>{t('seo_calculators.podcast.content.faq_per_episode_title')}</h3>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_per_episode_para_1_strong')}</strong>{' '}
        {t('seo_calculators.podcast.content.faq_per_episode_para_1_text')}
      </p>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_per_episode_para_2_strong')}</strong>{' '}
        {t('seo_calculators.podcast.content.faq_per_episode_para_2_text')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.faq_per_episode_para_3')}
      </p>
      <p>
        <strong>{t('seo_calculators.podcast.content.faq_per_episode_para_4_strong')}</strong>{' '}
        {t('seo_calculators.podcast.content.faq_per_episode_para_4_text')}
      </p>

      <h2>{t('seo_calculators.podcast.content.cta_title')}</h2>
      <p>
        {t('seo_calculators.podcast.content.cta_para_1')}
      </p>
      <p>
        {t('seo_calculators.podcast.content.cta_para_2_before_link')}
        <a href="/pricing" className="text-primary-600 hover:text-primary-700 underline">
          {t('seo_calculators.podcast.content.cta_para_2_link_text')}
        </a>
        {t('seo_calculators.podcast.content.cta_para_2_after_link')}
      </p>

      <h3>{t('seo_calculators.podcast.content.related_title')}</h3>
      <ul>
        <li>
          <a href="/youtube-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
            {t('seo_calculators.podcast.content.related_youtube')}
          </a>
        </li>
        <li>
          <a href="/instagram-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
            {t('seo_calculators.podcast.content.related_instagram')}
          </a>
        </li>
        <li>
          <a href="/tiktok-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
            {t('seo_calculators.podcast.content.related_tiktok')}
          </a>
        </li>
        <li>
          <a href="/pricing" className="text-primary-600 hover:text-primary-700 underline">
            {t('seo_calculators.podcast.content.related_pricing')}
          </a>
        </li>
      </ul>
    </SEOPageLayout>
  )
}

export default PodcastSponsorshipRates
