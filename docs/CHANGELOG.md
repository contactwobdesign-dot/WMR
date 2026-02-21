# Changelog

## [2026-02-07g] - General Sponsorship Guide (SEO Hub)

### Added
- 📄 **How Much to Charge for Sponsorships** (`/src/pages/seo/HowMuchToChargeSponsorship.jsx`)
  - Complete general pricing guide (SEO hub page)
  - 1500+ words of comprehensive content
  - Platform comparison table (YouTube, Instagram, TikTok, Podcast)
  - 5 biggest pricing mistakes creators make
  - How company size affects rates (Startup vs Enterprise)
  - Pre-response checklist for brand inquiries
  - FAQ section (3 detailed questions)
  - Grid of internal links to all platform-specific pages
  - No platform pre-selection (general guide)
  - Route: `/how-much-to-charge-sponsorship`

### Content Highlights
- Why 87% of creators undercharge (lack of data, fear, imposter syndrome)
- Platform comparison table with clickable links
- 5 common mistakes: accepting first offer, ignoring location, ignoring engagement, treating all brands same, forgetting usage rights
- Company size strategy (Startups 20-30% below market, Enterprise 1.5-2x market)
- Professional checklist (research, deliverables, usage rights, timeline)
- "No budget" response template
- Rate card best practices
- Visual grid linking to all 4 platform pages

### SEO Strategy
- **Hub page** that links to all specific platform pages
- Targets general keyword: "how much to charge for sponsorships"
- Internal linking to boost all SEO pages
- Comprehensive guide positioning WMR as authority

---

## [2026-02-07f] - Podcast SEO Page

### Added
- 📄 **Podcast Sponsorship Rates Calculator** (`/src/pages/seo/PodcastSponsorshipRates.jsx`)
  - Complete SEO page for podcast sponsorship pricing
  - 1600+ words of optimized content
  - CPM-based rate table by downloads (Small to Top tier)
  - Pre-roll vs Mid-roll vs Post-roll comparison
  - Why host-read ads pay 2-3x more (trust, conversion, personalization)
  - How to calculate podcast sponsorship rate (formula + examples)
  - FAQ section (4 detailed questions)
  - Platform pre-selection for Podcast
  - Route: `/podcast-sponsorship-rates`

### Content Highlights
- Download-based rate benchmarks (500 downloads: $9-25, 50k+: $1,500+)
- Ad placement pricing (Pre-roll $15-20, Mid-roll $25-35, Post-roll $10-15 CPM)
- Host-read premium (2-3x produced ads)
- Podcast network analysis (30-50% cut, pros/cons)
- Proof of downloads (IAB-certified platforms)
- Per episode vs per campaign pricing strategies
- Niche multipliers (Business/Finance $35-50 CPM vs Comedy $18-25 CPM)

---

## [2026-02-07e] - TikTok SEO Page

### Added
- 📄 **TikTok Sponsorship Calculator** (`/src/pages/seo/TikTokSponsorshipCalculator.jsx`)
  - Complete SEO page for TikTok creator rates
  - 1500+ words of optimized content
  - Rate table by follower count (Nano to Mega)
  - Expected views by tier
  - Creator Fund vs Sponsorships comparison ($0.02-0.04 vs $10-50 per 1K views)
  - Why TikTok rates differ (viral potential, younger audience, shorter content, algorithm)
  - How to calculate average views (last 10 videos)
  - FAQ section (3 detailed questions)
  - Platform pre-selection for TikTok
  - Route: `/tiktok-sponsorship-calculator`

### Content Highlights
- Follower-based rate benchmarks (Nano: $50-200, Mega: $20,000+)
- Creator Fund reality check (250-1,250x less than sponsorships)
- Average views calculation methodology
- Per video vs per view pricing (always per video)
- TikTok Shop commission analysis
- Viral video handling (usage rights + performance bonuses)
- Hybrid pricing models ($2K base + $10 per 1K views over 100K)

---

## [2026-02-07d] - Instagram SEO Page

### Added
- 📄 **Instagram Sponsorship Calculator** (`/src/pages/seo/InstagramSponsorshipCalculator.jsx`)
  - Complete SEO page for Instagram influencer rates
  - 1400+ words of optimized content
  - Rate table by follower count (Nano to Mega)
  - Posts vs Reels vs Stories comparison
  - 5 factors affecting Instagram rates
  - FAQ section (3 detailed questions)
  - Platform pre-selection for Instagram
  - Route: `/instagram-sponsorship-calculator`

### Content Highlights
- Follower-based rate benchmarks (Nano: $50-250, Mega: $15,000+)
- Content type pricing (Posts, Reels 20-30% more, Stories 30-50% less)
- Engagement rate importance (8%+ = charge 50-100% more)
- Niche multipliers (Finance/Tech 2-3x, Fashion 1.5x)
- Audience demographics impact (US/UK premium, India/SEA lower)
- Affiliate vs flat fee comparison
- Negotiation strategies

---

## [2026-02-07c] - SEO Page Template

### Added
- 📄 **SEO Page Layout Component** (`/src/components/SEO/SEOPageLayout.jsx`)
  - Reusable template for all SEO landing pages
  - Integrated calculator with platform pre-selection
  - Auto-scroll feature (`?calc=true` URL parameter)
  - Tailwind Typography styling for content
  - SEO-optimized meta tags (title, description, canonical, Open Graph)
  - Consistent structure (Hero, Calculator, Content, CTA)
- 📄 **Example SEO Page** - YouTube Sponsorship Calculator
  - Complete implementation showing how to use the template
  - 1500+ words of SEO content
  - How-to guide, benchmarks, FAQs, tips
  - Platform pre-selection for YouTube
  - Route: `/youtube-sponsorship-calculator`
- 📚 **Documentation** - `SEO_PAGE_LAYOUT.md` (1800+ lines)
- 🎨 **Tailwind Typography Plugin** - Installed `@tailwindcss/typography`
  - Auto-styles `h2`, `h3`, `p`, `ul`, `a`, `table`, etc.
  - `prose` classes for beautiful content formatting

### Technical Details
- **Props**: title, subtitle, metaTitle, metaDescription, canonicalPath, platform, children
- **Features**: Auto-scroll, calculator integration, SEO optimization
- **Styling**: Tailwind prose classes for automatic content styling

---

## [2026-02-07b] - Pricing Page Creation

### Added
- 💰 **Complete Pricing Page** (`/src/pages/Pricing.jsx`)
  - Transformation-focused design (before/after visual comparison)
  - FREE card showing blurred results and limitations
  - PRO card showing full results with mini breakdown
  - ROI calculator section (justify $9/month with one $200 better deal)
  - Billing toggle (Monthly $9 / Annual $6.58 with 27% savings badge)
  - Comprehensive feature comparison (Free vs Pro)
  - 7-day money-back guarantee section
  - Social proof testimonial placeholder
  - Pricing FAQ (4 questions)
- 📚 **Documentation** - `PRICING_PAGE.md` (2000+ lines comprehensive guide)
- 🛣️ **Route** - Added `/pricing` route to `App.jsx`

### Technical Details
- **State**: `billingCycle` ('monthly' | 'annual')
- **Icons**: Check, X, Shield, ArrowRight, Calculator (lucide-react)
- **Styling**: Tailwind with blur effects, gradients, and animations
- **Button**: `handleUpgrade()` placeholder for Stripe integration

### Conversion Strategy
- Visual transformation (shows immediate value)
- ROI focus (not cost focus)
- Risk reversal (guarantee)
- Social proof (testimonial)
- Objection handling (FAQ)

---

## [2026-02-07a] - Home Page Creation

### Added
- ✨ **Complete Home Page** with integrated calculator
  - Hero section with gradient background (`bg-gradient-to-b from-primary-50 to-white`)
  - Calculator embedded directly on page with negative margin overlay (-mt-8)
  - How It Works section (3-step process with icons)
  - Social proof stats (87%, $847, 10k+ creators)
  - "Why Creators Undercharge" educational section
  - FAQ section (5 detailed questions & answers)
  - Final CTA section with primary background
  - Smooth scroll functionality (`scrollToCalculator`)
- 📚 **Documentation** - `HOME_PAGE.md` (1800+ lines comprehensive guide)
- 📝 **Session Summary** - `SESSION_HOME_PAGE.md`

### Changed
- ⬇️ **Downgraded from Tailwind v4 to v3** for stability
- 🔧 Updated `postcss.config.js` to use v3 syntax (`tailwindcss: {}, autoprefixer: {}`)
- 📄 Complete rewrite of `src/pages/Home.jsx` (200+ lines)
- 📊 Updated `PROJECT_STATUS.md` with Home page details

### Fixed
- ✅ Tailwind CSS configuration error (PostCSS plugin compatibility)
- ✅ Development server startup issues (spawn EPERM)
- ✅ Import resolution for `src/index.css`

### Technical Details
- **Components**: Calculator, Helmet, BarChart3, DollarSign, CheckCircle, ArrowRight
- **Sections**: 7 major sections (Hero, Calculator, How It Works, Stats, Why, FAQ, CTA)
- **SEO**: Optimized meta tags and semantic HTML structure
- **Mobile**: Fully responsive with grid collapse and text scaling
- **Performance**: No heavy images, SVG icons only, fast initial paint

---

## [2025-02-05] - English Translation

### Changed
- 🌍 Switched entire application from French to English
- Changed main heading from "Bienvenue sur WMR" to "Is That Brand Deal Worth It?"
- Changed tagline from "What's My Rate - Calculez vos tarifs de sponsoring" to "Find out if you're being lowballed — in 30 seconds"
- Updated all component comments to English
- Updated README.md to English
- Changed HTML lang attribute from "fr" to "en"
- Updated all SEO metadata to English
- Renamed SEO page component from `GuideTarifsSponsor` to `SponsorRatesGuide`

### Files Updated
- `index.html` - Language and meta tags
- `src/pages/Home.jsx` - Main heading and tagline
- `src/components/Calculator/PriceCalculator.jsx` - Component text
- `src/components/SEO/SEOHead.jsx` - SEO defaults
- `src/pages/seo/GuideTarifsSponsor.jsx` - Page content
- `src/pages/seo/index.js` - Export names
- `src/components/*/index.js` - Component comments
- `src/lib/supabase.js` - Code comments
- `src/hooks/useAuth.js` - Code comments
- `README.md` - Documentation
- `CHANGELOG.md` - Created this file

### Summary
The application is now 100% in English, from UI text to code comments and documentation.
