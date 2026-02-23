import { SEOPageLayout } from '../../components/SEO'
import { useTranslation } from 'react-i18next'

function HowMuchToChargeSponsorship() {
  const { t } = useTranslation()

  return (
    <SEOPageLayout
      title={t('seo_pricing.title')}
      subtitle={t('seo_pricing.subtitle')}
      metaTitle={t('seo_pricing.meta_title')}
      metaDescription={t('seo_pricing.meta_description')}
      canonicalPath="/how-much-to-charge-sponsorship"
      platform={null}
    >
      {/* SEO Content */}
      <h2>{t('seo_pricing.body_why_undercharge_title')}</h2>
      <p>{t('seo_pricing.body_why_undercharge_p1')}</p>
      <p>{t('seo_pricing.body_why_undercharge_p2')}</p>
      <ul>
        <li>
          <strong>{t('seo_pricing.body_why_undercharge_li1_strong')}</strong>
          {' '}
          {t('seo_pricing.body_why_undercharge_li1_after')}
        </li>
        <li>
          <strong>{t('seo_pricing.body_why_undercharge_li2_strong')}</strong>
          {' '}
          {t('seo_pricing.body_why_undercharge_li2_after')}
        </li>
        <li>
          <strong>{t('seo_pricing.body_why_undercharge_li3_strong')}</strong>
          {' '}
          {t('seo_pricing.body_why_undercharge_li3_after')}
        </li>
      </ul>
      <p>{t('seo_pricing.body_barriers_intro')}</p>

      <h3>{t('seo_pricing.body_lack_data_title')}</h3>
      <p>{t('seo_pricing.body_lack_data_p1')}</p>

      <h3>{t('seo_pricing.body_fear_loss_title')}</h3>
      <p>{t('seo_pricing.body_fear_loss_p1')}</p>

      <h3>{t('seo_pricing.body_imposter_title')}</h3>
      <p>{t('seo_pricing.body_imposter_p1')}</p>

      <h2>{t('seo_pricing.body_rates_overview_title')}</h2>
      <p>{t('seo_pricing.body_rates_overview_p1')}</p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_pricing.body_rates_table_head_platform')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_pricing.body_rates_table_head_model')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('seo_pricing.body_rates_table_head_range')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a href="/youtube-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
                  {t('seo_pricing.body_rates_youtube_label')}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {t('seo_pricing.body_rates_youtube_model')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {t('seo_pricing.body_rates_youtube_range')}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a href="/instagram-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
                  {t('seo_pricing.body_rates_instagram_label')}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {t('seo_pricing.body_rates_instagram_model')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {t('seo_pricing.body_rates_instagram_range')}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a href="/tiktok-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
                  {t('seo_pricing.body_rates_tiktok_label')}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {t('seo_pricing.body_rates_tiktok_model')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {t('seo_pricing.body_rates_tiktok_range')}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a href="/podcast-sponsorship-rates" className="text-primary-600 hover:text-primary-700 underline">
                  {t('seo_pricing.body_rates_podcast_label')}
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {t('seo_pricing.body_rates_podcast_model')}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {t('seo_pricing.body_rates_podcast_range')}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 italic">
        {t('seo_pricing.body_rates_note')}
      </p>

      <h2>{t('seo_pricing.body_mistakes_title')}</h2>
      <p>{t('seo_pricing.body_mistakes_intro')}</p>

      <h3>{t('seo_pricing.body_mistake1_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_problem_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake1_problem')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_fix_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake1_fix')}
      </p>
      <p>{t('seo_pricing.body_mistake1_outcome')}</p>

      <h3>{t('seo_pricing.body_mistake2_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_problem_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake2_problem')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_fix_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake2_fix')}
      </p>

      <h3>{t('seo_pricing.body_mistake3_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_problem_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake3_problem')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_fix_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake3_fix')}
      </p>

      <h3>{t('seo_pricing.body_mistake4_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_problem_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake4_problem')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_fix_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake4_fix_intro')}
      </p>
      <ul>
        <li>{t('seo_pricing.body_mistake4_li_startups')}</li>
        <li>{t('seo_pricing.body_mistake4_li_medium')}</li>
        <li>{t('seo_pricing.body_mistake4_li_enterprise')}</li>
      </ul>

      <h3>{t('seo_pricing.body_mistake5_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_problem_label')}</strong>
        {' '}
        {t('seo_pricing.body_mistake5_problem')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_fix_label')}</strong>
      </p>
      <ul>
        <li>{t('seo_pricing.body_mistake5_li_usage')}</li>
        <li>{t('seo_pricing.body_mistake5_li_duration')}</li>
        <li>{t('seo_pricing.body_mistake5_li_exclusivity')}</li>
      </ul>
      <p>{t('seo_pricing.body_mistake5_standard')}</p>

      <h2>{t('seo_pricing.body_company_title')}</h2>
      <p>{t('seo_pricing.body_company_intro')}</p>

      <h3>{t('seo_pricing.body_company_startups_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_budget_label')}</strong>
        {' '}
        {t('seo_pricing.body_company_startups_budget')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_strategy_label')}</strong>
      </p>
      <ul>
        <li>{t('seo_pricing.body_company_startups_li1')}</li>
        <li>{t('seo_pricing.body_company_startups_li2')}</li>
        <li>{t('seo_pricing.body_company_startups_li3')}</li>
        <li>{t('seo_pricing.body_company_startups_li4')}</li>
      </ul>
      <p>
        <strong>{t('seo_pricing.body_red_flag_label')}</strong>
        {' '}
        {t('seo_pricing.body_company_startups_red_flag')}
      </p>

      <h3>{t('seo_pricing.body_company_medium_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_budget_label')}</strong>
        {' '}
        {t('seo_pricing.body_company_medium_budget')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_strategy_label')}</strong>
      </p>
      <ul>
        <li>{t('seo_pricing.body_company_medium_li1')}</li>
        <li>{t('seo_pricing.body_company_medium_li2')}</li>
        <li>{t('seo_pricing.body_company_medium_li3')}</li>
        <li>{t('seo_pricing.body_company_medium_li4')}</li>
      </ul>

      <h3>{t('seo_pricing.body_company_large_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_budget_label')}</strong>
        {' '}
        {t('seo_pricing.body_company_large_budget')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_strategy_label')}</strong>
      </p>
      <ul>
        <li>{t('seo_pricing.body_company_large_li1')}</li>
        <li>{t('seo_pricing.body_company_large_li2')}</li>
        <li>{t('seo_pricing.body_company_large_li3')}</li>
        <li>{t('seo_pricing.body_company_large_li4')}</li>
      </ul>
      <p>
        <strong>{t('seo_pricing.body_pro_tip_label')}</strong>
        {' '}
        {t('seo_pricing.body_company_pro_tip')}
      </p>

      <h2>{t('seo_pricing.body_checklist_title')}</h2>
      <p>{t('seo_pricing.body_checklist_intro')}</p>

      <div className="bg-gray-50 border-l-4 border-primary-600 p-6 my-8">
        <h3 className="text-lg font-semibold mb-4">{t('seo_pricing.body_checklist_block_title')}</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span>{t('seo_pricing.body_checklist_item1')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span>{t('seo_pricing.body_checklist_item2')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span>{t('seo_pricing.body_checklist_item3')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span>{t('seo_pricing.body_checklist_item4')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span>{t('seo_pricing.body_checklist_item5')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span>{t('seo_pricing.body_checklist_item6')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span>{t('seo_pricing.body_checklist_item7')}</span>
          </li>
        </ul>
      </div>

      <h2>{t('seo_pricing.body_faq_title')}</h2>

      <h3>{t('seo_pricing.body_faq_q1_title')}</h3>
      <p>{t('seo_pricing.body_faq_q1_intro')}</p>
      <ul>
        <li>{t('seo_pricing.body_faq_q1_li_good')}</li>
        <li>{t('seo_pricing.body_faq_q1_li_acceptable')}</li>
        <li>{t('seo_pricing.body_faq_q1_li_too_low')}</li>
        <li>{t('seo_pricing.body_faq_q1_li_way_too_low')}</li>
      </ul>
      <p>{t('seo_pricing.body_faq_q1_outro')}</p>

      <h3>{t('seo_pricing.body_faq_q2_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_translation_label')}</strong>
        {' '}
        {t('seo_pricing.body_faq_q2_translation')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_reality_check_label')}</strong>
        {' '}
        {t('seo_pricing.body_faq_q2_reality')}
      </p>
      <p>
        <strong>{t('seo_pricing.body_your_response_label')}</strong>
      </p>
      <p>{t('seo_pricing.body_faq_q2_response')}</p>
      <p>{t('seo_pricing.body_faq_q2_outro')}</p>

      <h3>{t('seo_pricing.body_faq_q3_title')}</h3>
      <p>
        <strong>{t('seo_pricing.body_yes_with_caveats_label')}</strong>
      </p>
      <p>{t('seo_pricing.body_faq_q3_intro')}</p>
      <ul>
        <li>{t('seo_pricing.body_faq_q3_li_include1')}</li>
        <li>{t('seo_pricing.body_faq_q3_li_include2')}</li>
        <li>{t('seo_pricing.body_faq_q3_li_include3')}</li>
        <li>{t('seo_pricing.body_faq_q3_li_include4')}</li>
      </ul>
      <p>
        <strong>{t('seo_pricing.body_dont_include_label')}</strong>
      </p>
      <ul>
        <li>{t('seo_pricing.body_faq_q3_li_exclude1')}</li>
        <li>{t('seo_pricing.body_faq_q3_li_exclude2')}</li>
        <li>{t('seo_pricing.body_faq_q3_li_exclude3')}</li>
      </ul>
      <p>
        <strong>{t('seo_pricing.body_pro_tip_label')}</strong>
        {' '}
        {t('seo_pricing.body_faq_q3_pro_tip')}
      </p>

      <h2>{t('seo_pricing.body_guides_title')}</h2>
      <p>{t('seo_pricing.body_guides_intro')}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <a
          href="/youtube-sponsorship-calculator"
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('seo_pricing.body_guides_youtube_title')}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {t('seo_pricing.body_guides_youtube_text')}
          </p>
          <span className="text-primary-600 font-medium flex items-center gap-1">
            {t('seo_pricing.body_guides_cta')}
          </span>
        </a>

        <a
          href="/instagram-sponsorship-calculator"
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('seo_pricing.body_guides_instagram_title')}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {t('seo_pricing.body_guides_instagram_text')}
          </p>
          <span className="text-primary-600 font-medium flex items-center gap-1">
            {t('seo_pricing.body_guides_cta')}
          </span>
        </a>

        <a
          href="/tiktok-sponsorship-calculator"
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('seo_pricing.body_guides_tiktok_title')}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {t('seo_pricing.body_guides_tiktok_text')}
          </p>
          <span className="text-primary-600 font-medium flex items-center gap-1">
            {t('seo_pricing.body_guides_cta')}
          </span>
        </a>

        <a
          href="/podcast-sponsorship-rates"
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {t('seo_pricing.body_guides_podcast_title')}
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            {t('seo_pricing.body_guides_podcast_text')}
          </p>
          <span className="text-primary-600 font-medium flex items-center gap-1">
            {t('seo_pricing.body_guides_cta')}
          </span>
        </a>
      </div>

      <h2>{t('seo_pricing.body_ready_title')}</h2>
      <p>{t('seo_pricing.body_ready_p1')}</p>
      <p>
        {t('seo_pricing.body_ready_p2_prefix')}
        {' '}
        <a href="/pricing" className="text-primary-600 hover:text-primary-700 underline font-semibold">
          {t('seo_pricing.body_ready_p2_link')}
        </a>
        {' '}
        {t('seo_pricing.body_ready_p2_suffix')}
      </p>
    </SEOPageLayout>
  )
}

export default HowMuchToChargeSponsorship
