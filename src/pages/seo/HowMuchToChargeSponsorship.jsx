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
      <h2>Why Most Creators Undercharge</h2>
      <p>
        According to industry research, <strong>87% of creators undercharge for their first sponsorship</strong>. 
        This isn't because they're bad at business—it's because they lack the market data to price confidently.
      </p>
      <p>
        Without knowing what other creators with similar metrics charge, most creators either:
      </p>
      <ul>
        <li><strong>Accept the first offer</strong> - Brands lowball intentionally, expecting negotiation</li>
        <li><strong>Make up a number</strong> - Usually too low because of fear of scaring away the brand</li>
        <li><strong>Ask what the brand's budget is</strong> - This hands all negotiating power to the brand</li>
      </ul>
      <p>
        The three main psychological barriers that cause undercharging are:
      </p>

      <h3>1. Lack of Market Data</h3>
      <p>
        You can't price what you can't measure. Unlike traditional jobs with Glassdoor and salary surveys, 
        creator sponsorship rates are rarely discussed publicly. This information asymmetry heavily favors 
        brands who work with hundreds of creators and know exactly what market rates are.
      </p>

      <h3>2. Fear of Losing the Deal</h3>
      <p>
        When a brand reaches out, especially for your first sponsorship, the fear of losing the opportunity 
        is overwhelming. You think "What if I ask for too much and they walk away?" But here's the truth: 
        <strong>if a brand wants you, they have budget flexibility</strong>. The first offer is rarely their 
        maximum.
      </p>

      <h3>3. Imposter Syndrome</h3>
      <p>
        Many creators think "Who am I to charge $1,000? I'm not a big influencer." But brands aren't 
        paying for your self-worth—they're paying for access to your audience. If you have 10,000 engaged 
        followers in a valuable niche, you deserve to be paid market rate, period.
      </p>

      <h2>Sponsorship Rates by Platform (2025 Overview)</h2>
      <p>
        Here's a quick overview of standard sponsorship rates across major platforms. Click each platform 
        for detailed breakdowns and calculators:
      </p>

      <div className="overflow-x-auto my-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Typical Range
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a href="/youtube-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
                  YouTube
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                CPM (per 1,000 views)
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                $20-$50 depending on niche
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a href="/instagram-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
                  Instagram
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                Per post/Reel/Story
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                $100-$1,000+ per 10k followers
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a href="/tiktok-sponsorship-calculator" className="text-primary-600 hover:text-primary-700 underline">
                  TikTok
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                Per video (based on avg views)
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                $200-$1,000 per 10k followers
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <a href="/podcast-sponsorship-rates" className="text-primary-600 hover:text-primary-700 underline">
                  Podcast
                </a>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                CPM (per 1,000 downloads)
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                $18-$50 based on downloads
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600 italic">
        These are baseline rates for general content. Premium niches (finance, tech, business, health) can 
        command 2-3x these rates. Use our platform-specific calculators for exact pricing.
      </p>

      <h2>5 Biggest Pricing Mistakes Creators Make</h2>
      <p>
        Avoid these common pitfalls that cost creators thousands of dollars per deal:
      </p>

      <h3>Mistake #1: Accepting the First Offer Without Negotiating</h3>
      <p>
        <strong>The problem:</strong> Brands expect negotiation. The first offer is almost always 20-50% 
        below their maximum budget.
      </p>
      <p>
        <strong>The fix:</strong> Always counter. Even if the offer seems fair, respond with: "Thank you 
        for the offer. Based on my engagement rate and audience demographics, my rate for this deliverable 
        is $X. Is there flexibility in the budget?"
      </p>
      <p>
        Worst case: They say no and you accept the original offer. Best case: They meet you in the middle 
        or accept your counter. You lose nothing by asking.
      </p>

      <h3>Mistake #2: Not Factoring in Audience Location</h3>
      <p>
        <strong>The problem:</strong> A US-based audience is worth 5-10x more to advertisers than an 
        audience in developing countries. Ignoring this leads to overcharging (and losing deals) or 
        undercharging (if you have a premium audience).
      </p>
      <p>
        <strong>The fix:</strong> Check your analytics. If 80% of your audience is in the US/UK/Canada/Australia, 
        charge premium rates. If 80% is in India/Southeast Asia, adjust your expectations downward but 
        emphasize volume and engagement instead.
      </p>

      <h3>Mistake #3: Ignoring Engagement Rate</h3>
      <p>
        <strong>The problem:</strong> Two creators with 100K followers can have vastly different values. 
        One with 10% engagement is worth 5x more than one with 2% engagement.
      </p>
      <p>
        <strong>The fix:</strong> Calculate your engagement rate: <code>(likes + comments) / followers × 100</code>. 
        If you have high engagement (8%+), explicitly mention this in negotiations: "While I have 50K 
        followers, my 12% engagement rate means brands get 6x industry average interaction."
      </p>

      <h3>Mistake #4: Treating All Brands the Same</h3>
      <p>
        <strong>The problem:</strong> A local bakery offering $200 vs Nike offering $200 are completely 
        different scenarios. The bakery might be at their maximum budget; Nike is testing you.
      </p>
      <p>
        <strong>The fix:</strong> Research the brand before responding. Look up their size, recent funding, 
        and previous influencer campaigns. Adjust your pricing and negotiation strategy accordingly:
      </p>
      <ul>
        <li><strong>Startups/Small Business:</strong> Lower rates acceptable, but ask for long-term partnerships 
        or equity if they're pre-revenue</li>
        <li><strong>Medium Companies:</strong> Standard market rates, straightforward negotiation</li>
        <li><strong>Enterprise/Fortune 500:</strong> Charge premium rates, they have massive budgets and 
        expect to pay more</li>
      </ul>

      <h3>Mistake #5: Forgetting Usage Rights and Exclusivity</h3>
      <p>
        <strong>The problem:</strong> You agree to $500 for a video, then the brand uses your content in 
        paid ads across Facebook for 6 months, generating millions of impressions. You got severely underpaid.
      </p>
      <p>
        <strong>The fix:</strong> Always clarify:
      </p>
      <ul>
        <li><strong>Usage rights:</strong> "Content lives on my channel only" vs "You can repurpose for ads"</li>
        <li><strong>Duration:</strong> "30-day usage" vs "perpetual license"</li>
        <li><strong>Exclusivity:</strong> "I can work with competitors" vs "Category exclusivity for 90 days"</li>
      </ul>
      <p>
        <strong>Standard practice:</strong> Your base rate includes 30 days of organic usage on your channels. 
        Add 50-100% for paid media usage rights. Add another 25-50% for category exclusivity.
      </p>

      <h2>How Company Size Affects Your Rate</h2>
      <p>
        Not all brand dollars are created equal. Here's how to adjust your approach based on company size:
      </p>

      <h3>Startups (1-50 employees, pre-Series B)</h3>
      <p>
        <strong>Budget reality:</strong> Limited marketing budgets, often $2,000-$10,000 per month total.
      </p>
      <p>
        <strong>Your strategy:</strong>
      </p>
      <ul>
        <li>Accept 20-30% below market rate if you genuinely love the product</li>
        <li>Negotiate for equity (0.01-0.1% if pre-revenue startup)</li>
        <li>Lock in long-term rates before they scale</li>
        <li>Ask for affiliate commission on top of flat fee</li>
      </ul>
      <p>
        <strong>Red flag:</strong> If they claim "no budget" but raised millions in funding, they're lying. 
        Walk away.
      </p>

      <h3>Medium Companies (50-500 employees, profitable)</h3>
      <p>
        <strong>Budget reality:</strong> Real marketing budgets, typically $50,000-$500,000 per quarter.
      </p>
      <p>
        <strong>Your strategy:</strong>
      </p>
      <ul>
        <li>Charge market rate, no discounts needed</li>
        <li>Straightforward negotiation, they understand influencer marketing</li>
        <li>Package deals work well (3 posts + discount vs single post)</li>
        <li>Professional contracts and timely payment expected</li>
      </ul>

      <h3>Large/Enterprise Companies (500+ employees, public or unicorn)</h3>
      <p>
        <strong>Budget reality:</strong> Massive budgets, often $1M+ per quarter for influencer marketing alone.
      </p>
      <p>
        <strong>Your strategy:</strong>
      </p>
      <ul>
        <li>Charge 1.5-2x your normal rate—they expect to pay premium</li>
        <li>Never accept first offer, they always have more budget</li>
        <li>Ask for usage rights fees, performance bonuses, and exclusivity premiums</li>
        <li>Longer negotiation cycles (30-60 days), but larger payouts</li>
      </ul>
      <p>
        <strong>Pro tip:</strong> If Nike, Amazon, or Google reach out, they're not price-sensitive. Focus 
        on value delivered, not justifying your rate.
      </p>

      <h2>Checklist Before Responding to a Brand</h2>
      <p>
        Before you reply to that brand email, go through this checklist:
      </p>

      <div className="bg-gray-50 border-l-4 border-primary-600 p-6 my-8">
        <h3 className="text-lg font-semibold mb-4">Pre-Response Checklist</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span><strong>Calculate your market rate</strong> - Use our calculator above with your exact metrics</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span><strong>Research the brand</strong> - Google them: company size, recent funding, previous creator campaigns</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span><strong>Define deliverables clearly</strong> - 1 video? 3 posts? What length? What format?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span><strong>Clarify usage rights</strong> - Organic only? Can they use in paid ads? For how long?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span><strong>Set timeline expectations</strong> - When do they need it? When do you get paid?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span><strong>Check exclusivity requirements</strong> - Can you work with competitors? For how long?</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 font-bold">☐</span>
            <span><strong>Never accept immediately</strong> - Take 24 hours minimum to review and prepare your counter</span>
          </li>
        </ul>
      </div>

      <h2>Frequently Asked Questions</h2>

      <h3>How do I know if I'm being lowballed?</h3>
      <p>
        Use the calculator at the top of this page. Enter your metrics (followers, views, engagement, niche) 
        and the offered amount. It will tell you if you're getting:
      </p>
      <ul>
        <li><strong>Good deal (95%+ of market value):</strong> Accept or try to negotiate up slightly</li>
        <li><strong>Acceptable (75-95%):</strong> Solid starting point, definitely negotiate</li>
        <li><strong>Too low (50-75%):</strong> Significant lowball, counter with your market rate</li>
        <li><strong>Way too low (&lt;50%):</strong> Insulting offer, they're taking advantage—walk away</li>
      </ul>
      <p>
        If you're consistently getting "way too low" offers, you might be attracting the wrong brands or 
        your content positioning needs work.
      </p>

      <h3>What if they say "We don't have a budget for this"?</h3>
      <p>
        <strong>Translation:</strong> "We're hoping you'll work for free or exposure."
      </p>
      <p>
        <strong>Reality check:</strong> Every company has a marketing budget. If they reached out to you, 
        they've allocated money for influencer marketing. "No budget" is a negotiation tactic.
      </p>
      <p>
        <strong>Your response:</strong>
      </p>
      <p>
        "I appreciate you thinking of me! I'd love to work together, but I do have set rates for branded 
        content to ensure I can continue creating quality free content for my audience. My rate for this 
        type of collaboration is $X. If that doesn't work with your current budget, I'm happy to revisit 
        when you have bandwidth. Thanks for understanding!"
      </p>
      <p>
        This is professional, firm, and leaves the door open without working for free.
      </p>

      <h3>Should I share my rate card publicly?</h3>
      <p>
        <strong>Yes, with caveats:</strong>
      </p>
      <p>
        Having a professional rate card shows you're serious and experienced. It should include:
      </p>
      <ul>
        <li>Your platform-specific rates (YouTube video, Instagram post, etc.)</li>
        <li>Package deals (3-post campaign with discount)</li>
        <li>Add-ons (usage rights +50%, exclusivity +25%, rush delivery +30%)</li>
        <li>"Starting from" language to maintain flexibility</li>
      </ul>
      <p>
        <strong>Don't include:</strong>
      </p>
      <ul>
        <li>Rock-bottom prices you'd never actually accept</li>
        <li>Rates so high they scare away legitimate brands</li>
        <li>Exact numbers if you prefer to negotiate case-by-case</li>
      </ul>
      <p>
        <strong>Pro tip:</strong> Have a public rate card for inquiry form submissions, but always customize 
        quotes in actual negotiations based on brand size, campaign scope, and relationship potential.
      </p>

      <h2>Platform-Specific Guides</h2>
      <p>
        For detailed pricing guides and calculators for your specific platform, check out these resources:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <a 
          href="/youtube-sponsorship-calculator" 
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">YouTube Sponsorships</h3>
          <p className="text-gray-600 text-sm mb-3">
            CPM-based rates, integration vs dedicated video pricing, audience size multipliers
          </p>
          <span className="text-primary-600 font-medium flex items-center gap-1">
            Learn more →
          </span>
        </a>

        <a 
          href="/instagram-sponsorship-calculator" 
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Instagram Sponsorships</h3>
          <p className="text-gray-600 text-sm mb-3">
            Posts vs Reels vs Stories pricing, follower-based rates, engagement multipliers
          </p>
          <span className="text-primary-600 font-medium flex items-center gap-1">
            Learn more →
          </span>
        </a>

        <a 
          href="/tiktok-sponsorship-calculator" 
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">TikTok Sponsorships</h3>
          <p className="text-gray-600 text-sm mb-3">
            View-based pricing, viral potential, Creator Fund comparison, average views methodology
          </p>
          <span className="text-primary-600 font-medium flex items-center gap-1">
            Learn more →
          </span>
        </a>

        <a 
          href="/podcast-sponsorship-rates" 
          className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Podcast Sponsorships</h3>
          <p className="text-gray-600 text-sm mb-3">
            CPM rates, pre-roll vs mid-roll vs post-roll, host-read premium, download-based pricing
          </p>
          <span className="text-primary-600 font-medium flex items-center gap-1">
            Learn more →
          </span>
        </a>
      </div>

      <h2>Ready to Calculate Your Rate?</h2>
      <p>
        Use the free calculator at the top of this page to evaluate any sponsorship offer you receive. 
        Simply enter your platform, metrics, and the offered price to get an instant verdict.
      </p>
      <p>
        Want to know your exact recommended rate range and get negotiation templates? 
        <a href="/pricing" className="text-primary-600 hover:text-primary-700 underline font-semibold"> Upgrade to Pro</a> for 
        unlimited calculations, detailed breakdowns, and professional negotiation scripts.
      </p>
    </SEOPageLayout>
  )
}

export default HowMuchToChargeSponsorship
