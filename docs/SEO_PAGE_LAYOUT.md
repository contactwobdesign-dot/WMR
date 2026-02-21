# 📄 SEO Page Layout Component Documentation

**File**: `/src/components/SEO/SEOPageLayout.jsx`

## Overview

`SEOPageLayout` is a reusable template component for creating SEO-optimized landing pages with an integrated calculator. It provides a consistent structure across all SEO pages while allowing custom content.

## Purpose

- **SEO**: Optimized meta tags, canonical URLs, and structured content
- **Conversion**: Integrated calculator on every page
- **Consistency**: Uniform layout across all SEO pages
- **Scalability**: Easy to create new SEO pages

---

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | string | ✅ | - | Page H1 heading |
| `subtitle` | string | ✅ | - | Subheading below title |
| `metaTitle` | string | ✅ | - | SEO meta title (shown in browser tab) |
| `metaDescription` | string | ✅ | - | SEO meta description (shown in search results) |
| `canonicalPath` | string | ✅ | - | Canonical URL path (e.g., `/youtube-sponsorship-calculator`) |
| `platform` | string \| null | ❌ | `null` | Pre-select calculator platform (`'youtube'`, `'instagram'`, etc.) |
| `children` | ReactNode | ✅ | - | SEO content (HTML/JSX) |

---

## Structure

The component creates a 5-section page:

### 1. SEO Head (Helmet)
```jsx
<Helmet>
  <title>{metaTitle} | SponsorPrice</title>
  <meta name="description" content={metaDescription} />
  <meta property="og:title" content={metaTitle} />
  <meta property="og:description" content={metaDescription} />
  <meta property="og:type" content="website" />
  <link rel="canonical" href={`https://sponsorprice.co${canonicalPath}`} />
</Helmet>
```

**Purpose**: 
- SEO optimization
- Social sharing (Open Graph)
- Canonical URL for duplicate content prevention

---

### 2. Hero Section
```jsx
<div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-32">
  <h1>{title}</h1>
  <p>{subtitle}</p>
</div>
```

**Styling**:
- Gradient background (primary-50 → white)
- Large padding to create space for calculator overlay
- Centered text

**Purpose**:
- Clear page topic
- Visual hierarchy
- Draws attention to calculator below

---

### 3. Calculator Section
```jsx
<div id="calculator">
  <Calculator defaultPlatform={platform} isPremium={false} />
</div>
```

**Features**:
- `id="calculator"` - Enables anchor links and auto-scroll
- Negative margin (`-mt-8`) - Overlaps hero for visual effect
- Shadow elevation (`shadow-lg`) - Stands out
- `defaultPlatform` prop - Pre-selects platform if provided

**Purpose**:
- Immediate conversion opportunity
- No separate calculator page needed
- Reduces friction

---

### 4. SEO Content Section
```jsx
<div className="prose prose-lg max-w-none">
  {children}
</div>
```

**Styling**:
- `prose prose-lg` - Tailwind Typography plugin styles
- `max-w-3xl` - Optimal reading width
- Auto-styled: `h2`, `h3`, `p`, `ul`, `ol`, `a`, `table`

**Content Types**:
- Educational articles
- How-to guides
- FAQs
- Benchmarks
- Tips & best practices

**Purpose**:
- SEO content for ranking
- Educates users
- Builds trust and authority

---

### 5. Final CTA
```jsx
<div className="bg-primary-600">
  <h2>Ready to get your exact rate?</h2>
  <Link to="/pricing">Upgrade to Pro →</Link>
</div>
```

**Design**:
- Full-width primary background
- White text
- Large button with arrow

**Purpose**:
- Convert free users to Pro
- Clear next action
- Consistent across all SEO pages

---

## Auto-Scroll Feature

**URL Parameter**: `?calc=true`

**Behavior**:
```javascript
useEffect(() => {
  const searchParams = new URLSearchParams(location.search)
  if (searchParams.get('calc') === 'true') {
    const calculatorElement = document.getElementById('calculator')
    if (calculatorElement) {
      setTimeout(() => {
        calculatorElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }, 100)
    }
  }
}, [location])
```

**Use Case**:
- External links: `https://sponsorprice.co/youtube-sponsorship-calculator?calc=true`
- Ads, email campaigns, social posts
- Directly to calculator, skipping content

---

## Usage Example

### Basic Usage
```jsx
import { SEOPageLayout } from '../../components/SEO'

function YouTubeSponsorshipCalculator() {
  return (
    <SEOPageLayout
      title="YouTube Sponsorship Calculator"
      subtitle="Calculate your fair YouTube sponsorship rate in 30 seconds"
      metaTitle="YouTube Sponsorship Calculator - Fair Rate Calculator"
      metaDescription="Free YouTube sponsorship calculator. Based on real CPM data."
      canonicalPath="/youtube-sponsorship-calculator"
      platform="youtube"
    >
      <h2>How to Price YouTube Sponsorships</h2>
      <p>Your educational content here...</p>
      
      <h3>Factors That Affect Rates</h3>
      <ul>
        <li>Subscriber count</li>
        <li>Average views</li>
        <li>Engagement rate</li>
      </ul>
    </SEOPageLayout>
  )
}
```

### Without Platform Pre-selection
```jsx
<SEOPageLayout
  title="General Sponsorship Guide"
  subtitle="Learn about sponsorship rates across all platforms"
  metaTitle="Sponsorship Rate Guide"
  metaDescription="Complete guide to pricing sponsorships."
  canonicalPath="/sponsorship-guide"
  platform={null} // No pre-selection
>
  {/* Content */}
</SEOPageLayout>
```

---

## Content Guidelines

### Writing SEO Content (children prop)

**Best Practices**:

1. **Use Semantic HTML**
   ```jsx
   <h2>Main Topic</h2>
   <h3>Sub-topic</h3>
   <p>Content...</p>
   <ul>
     <li>Bullet point</li>
   </ul>
   ```

2. **Include Keywords Naturally**
   - Don't stuff keywords
   - Use synonyms and related terms
   - Focus on user intent

3. **Structure for Scannability**
   - Short paragraphs (2-4 sentences)
   - Bullet lists for features/tips
   - Numbered lists for steps
   - Subheadings every 200-300 words

4. **Add Internal Links**
   ```jsx
   <a href="/pricing" className="text-primary-600 hover:text-primary-700 underline">
     See pricing
   </a>
   ```

5. **Include CTAs**
   - "Upgrade to Pro for..."
   - "Try the calculator above"
   - Links to related pages

---

## Styling with Tailwind Typography

The `prose` class automatically styles:

| Element | Styling |
|---------|---------|
| `h2` | Large, bold, margin top/bottom |
| `h3` | Medium, bold, margin top/bottom |
| `h4` | Small, bold |
| `p` | Readable line-height, margin bottom |
| `ul` / `ol` | Bullet/numbered lists, indentation |
| `li` | Spacing between items |
| `a` | Underlined, colored links |
| `strong` | Bold text |
| `em` | Italic text |
| `blockquote` | Indented, border-left |
| `code` | Monospace, gray background |
| `table` | Bordered, striped rows |

**Custom Styles**:
```jsx
<a className="text-primary-600 hover:text-primary-700 underline">
  Custom link
</a>
```

---

## SEO Best Practices

### Meta Title
- **Length**: 50-60 characters
- **Format**: `Keyword - Brand | SponsorPrice`
- **Include**: Primary keyword

**Example**:
```
"YouTube Sponsorship Calculator - Fair Rate Calculator"
```

### Meta Description
- **Length**: 150-160 characters
- **Include**: Primary keyword, value prop, call to action
- **Avoid**: Generic descriptions

**Example**:
```
"Free YouTube sponsorship calculator. Find out if brands are 
lowballing you. Based on real CPM data, audience size, and niche."
```

### Canonical URL
- **Format**: `/platform-action-keyword`
- **Lowercase**: Always
- **Hyphens**: Use `-` for spaces

**Examples**:
- `/youtube-sponsorship-calculator`
- `/instagram-influencer-rates`
- `/podcast-ad-pricing-guide`

---

## Page Structure for SEO

Recommended content structure:

```
1. Introduction (150-200 words)
   - What is this page about?
   - Who is it for?
   - What will they learn?

2. Main Content (800-1500 words)
   - How-to sections
   - Factors/considerations
   - Tips & best practices
   - Common mistakes

3. Data/Benchmarks (optional)
   - Tables or lists
   - Industry rates
   - Statistics

4. FAQ Section (3-5 questions)
   - Common questions
   - Quick answers
   - Rich snippet opportunity

5. Related Links
   - Internal links to other SEO pages
   - Link to pricing
   - Link to calculator
```

---

## Platform-Specific Pages

### YouTube
```jsx
<SEOPageLayout
  title="YouTube Sponsorship Calculator"
  platform="youtube"
  canonicalPath="/youtube-sponsorship-calculator"
  ...
>
  {/* Content about YouTube CPMs, audience retention, etc. */}
</SEOPageLayout>
```

### Instagram
```jsx
<SEOPageLayout
  title="Instagram Sponsorship Calculator"
  platform="instagram"
  canonicalPath="/instagram-sponsorship-calculator"
  ...
>
  {/* Content about Instagram posts, stories, reels */}
</SEOPageLayout>
```

### TikTok
```jsx
<SEOPageLayout
  title="TikTok Sponsorship Calculator"
  platform="tiktok"
  canonicalPath="/tiktok-sponsorship-calculator"
  ...
>
  {/* Content about TikTok trends, short-form content */}
</SEOPageLayout>
```

### Podcast
```jsx
<SEOPageLayout
  title="Podcast Sponsorship Calculator"
  platform="podcast"
  canonicalPath="/podcast-sponsorship-calculator"
  ...
>
  {/* Content about CPM, ad placement, listener count */}
</SEOPageLayout>
```

---

## Creating New SEO Pages

**Step 1**: Create file
```bash
/src/pages/seo/YourPageName.jsx
```

**Step 2**: Use template
```jsx
import { SEOPageLayout } from '../../components/SEO'

function YourPageName() {
  return (
    <SEOPageLayout
      title="Your Page Title"
      subtitle="Your subtitle"
      metaTitle="SEO Title"
      metaDescription="SEO description"
      canonicalPath="/your-page-url"
      platform="youtube" // or null
    >
      {/* Your SEO content */}
    </SEOPageLayout>
  )
}

export default YourPageName
```

**Step 3**: Add route
```jsx
// src/App.jsx
import YourPageName from './pages/seo/YourPageName'

<Route path="/your-page-url" element={<YourPageName />} />
```

**Step 4**: Export (optional)
```jsx
// src/pages/seo/index.js
export { default as YourPageName } from './YourPageName'
```

---

## Performance

### Optimizations
- ✅ No heavy images
- ✅ Lazy-loaded calculator
- ✅ Minimal JavaScript
- ✅ Static content (good for SSR/SSG)
- ✅ Typography styles are CSS only

### Load Time
- Target: < 2 seconds
- First Contentful Paint: < 1 second
- Time to Interactive: < 3 seconds

---

## Analytics Events to Track

```javascript
// Page view
trackEvent('seo_page_viewed', {
  page: 'youtube-sponsorship-calculator',
  platform: 'youtube'
})

// Calculator interaction
trackEvent('calculator_used_from_seo', {
  source: 'youtube-sponsorship-calculator'
})

// Scroll depth
trackEvent('seo_content_read', {
  page: 'youtube-sponsorship-calculator',
  depth: '75%'
})

// CTA click
trackEvent('seo_cta_clicked', {
  page: 'youtube-sponsorship-calculator',
  cta: 'upgrade_to_pro'
})

// Auto-scroll triggered
trackEvent('calculator_auto_scrolled', {
  page: 'youtube-sponsorship-calculator',
  source: 'url_parameter'
})
```

---

## Testing Checklist

Before publishing a new SEO page:

### Content
- [ ] Title is descriptive and includes keyword
- [ ] Subtitle is clear and compelling
- [ ] Content is 800+ words
- [ ] Headings are properly nested (H2 → H3 → H4)
- [ ] Internal links work
- [ ] No broken links
- [ ] FAQ section included
- [ ] Related pages linked

### SEO
- [ ] Meta title < 60 characters
- [ ] Meta description < 160 characters
- [ ] Canonical URL is correct
- [ ] No duplicate content
- [ ] Keywords used naturally
- [ ] Alt text on images (if any)

### Technical
- [ ] Calculator pre-selects correct platform
- [ ] Auto-scroll works (?calc=true)
- [ ] Mobile responsive
- [ ] Fast load time (< 2s)
- [ ] No console errors
- [ ] No linter warnings

### Design
- [ ] Typography is readable
- [ ] Links are clearly styled
- [ ] CTA button stands out
- [ ] Consistent spacing
- [ ] Proper color contrast

---

## Maintenance

### Weekly
- [ ] Check page rankings
- [ ] Monitor bounce rate
- [ ] Review calculator usage

### Monthly
- [ ] Update benchmarks/data
- [ ] Add new FAQ questions
- [ ] Refresh testimonials (if any)
- [ ] Check for broken links

### Quarterly
- [ ] Rewrite underperforming sections
- [ ] Add new related pages
- [ ] Update internal links
- [ ] Refresh meta descriptions

---

## Related Files

- `/src/components/Calculator/Calculator.jsx` - Calculator component
- `/src/components/SEO/SEOHead.jsx` - Generic SEO head component
- `/src/pages/seo/YouTubeSponsorshipCalculator.jsx` - Example implementation
- `/tailwind.config.js` - Typography plugin configuration

---

## Dependencies

```json
{
  "react-helmet-async": "^2.0.5",
  "react-router-dom": "^7.13.0",
  "lucide-react": "^0.563.0",
  "@tailwindcss/typography": "^0.5.x"
}
```

---

**Status**: ✅ **COMPLETE**

The SEO Page Layout component is production-ready with:
- Reusable template structure
- SEO optimization built-in
- Integrated calculator
- Auto-scroll feature
- Tailwind Typography styling
- Example implementation
- Complete documentation

**Next Step**: Create more platform-specific SEO pages
