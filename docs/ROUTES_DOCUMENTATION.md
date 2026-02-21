# 🗺️ WMR Routes Documentation

**Last Updated**: 2026-02-07
**Total Routes**: 13

---

## 🏗️ App Structure

### Router Configuration
```jsx
<HelmetProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* All routes nested here */}
      </Route>
    </Routes>
  </BrowserRouter>
</HelmetProvider>
```

**Pattern**: Nested routes using `<Layout>` wrapper

**Benefits**:
- Consistent header/footer across all pages
- Single `<Outlet />` in Layout component
- Cleaner route organization
- Easier to add protected routes later

---

## 📄 All Routes

### Main Pages (7)

| Route | Component | Purpose | Status |
|-------|-----------|---------|--------|
| `/` | Home | Landing page with integrated calculator | ✅ Complete |
| `/pricing` | Pricing | Upgrade page with visual comparison | ✅ Complete |
| `/calculator` | FreeCalculator | Standalone free calculator page | ✅ Complete |
| `/premium-calculator` | PremiumCalculator | Standalone premium calculator page | ✅ Complete |
| `/login` | Login | User authentication | 🔶 Placeholder |
| `/signup` | Signup | User registration | 🔶 Placeholder |
| `/dashboard` | Dashboard | User dashboard | 🔶 Placeholder |

### SEO Pages (5)

| Route | Component | Platform | Word Count | Status |
|-------|-----------|----------|------------|--------|
| `/youtube-sponsorship-calculator` | YouTubeSponsorshipCalculator | YouTube | 1500 | ✅ Complete |
| `/instagram-sponsorship-calculator` | InstagramSponsorshipCalculator | Instagram | 1400 | ✅ Complete |
| `/tiktok-sponsorship-calculator` | TikTokSponsorshipCalculator | TikTok | 1500 | ✅ Complete |
| `/podcast-sponsorship-rates` | PodcastSponsorshipRates | Podcast | 1600 | ✅ Complete |
| `/how-much-to-charge-sponsorship` | HowMuchToChargeSponsorship | General | 1500 | ✅ Complete |

### Error Pages (1)

| Route | Component | Purpose | Status |
|-------|-----------|---------|--------|
| `*` (catch-all) | NotFound | 404 error page | ✅ Complete |

**Total**: 13 routes (12 specific + 1 catch-all)

---

## 🎯 Route Purpose Breakdown

### Conversion Routes
1. **Home** (`/`) - First impression, integrated calculator
2. **Pricing** (`/pricing`) - Convert free to paid
3. **Calculator** (`/calculator`) - Free tier engagement
4. **Premium Calculator** (`/premium-calculator`) - Pro tier value demo

### SEO Routes (Organic Traffic)
1. **YouTube** - Target "YouTube sponsorship calculator"
2. **Instagram** - Target "Instagram influencer rates"
3. **TikTok** - Target "TikTok sponsorship calculator"
4. **Podcast** - Target "Podcast sponsorship rates"
5. **General** - Target "How much to charge sponsorship" (hub)

### Auth Routes (Not Yet Functional)
1. **Login** - User authentication
2. **Signup** - User registration
3. **Dashboard** - User account management

### Error Handling
1. **404** - Catch-all for invalid URLs

---

## 🔗 Internal Linking Map

### From Home
- → `/calculator` (CTA button - removed, calculator is on page)
- → `/pricing` (multiple CTAs)

### From Calculator Pages
- → `/pricing` (upgrade CTAs)
- → `/` (navigation)

### From Pricing
- → `/` (Get Started Free)
- → `/login` (Upgrade button - future)

### From SEO Pages
- → `/pricing` (Final CTA)
- → Other SEO pages (Related Tools)
- → `/` (Navigation)

### Hub & Spoke (SEO)
```
HowMuchToChargeSponsorship (hub)
    ↓
┌───┴────┬─────────┬─────────┐
↓        ↓         ↓         ↓
YouTube  Instagram TikTok   Podcast
↓        ↓         ↓         ↓
└────────┴─────────┴─────────┘
    (all cross-link)
```

---

## 🔒 Protected Routes (Future)

When auth is implemented, these routes will require login:

```jsx
// Future structure
<Route path="/" element={<Layout />}>
  {/* Public routes */}
  <Route index element={<Home />} />
  <Route path="pricing" element={<Pricing />} />
  
  {/* Protected routes */}
  <Route element={<RequireAuth />}>
    <Route path="premium-calculator" element={<PremiumCalculator />} />
    <Route path="dashboard" element={<Dashboard />} />
  </Route>
</Route>
```

**Protected Routes**:
- `/premium-calculator` - Pro users only
- `/dashboard` - Logged-in users only

**Public Routes**:
- Everything else

---

## 🎨 Route-Specific Features

### Home (`/`)
- **Unique**: Calculator integrated on page (not separate)
- **CTA**: Multiple scroll-to-calculator CTAs
- **Conversion**: Primary landing page

### Pricing (`/pricing`)
- **Unique**: Visual before/after comparison
- **CTA**: "Upgrade to Pro" with billing toggle
- **Conversion**: Main conversion page

### Calculator (`/calculator`)
- **Unique**: Standalone free calculator
- **Limit**: 2 calculations per month
- **Upgrade CTA**: When limit reached

### Premium Calculator (`/premium-calculator`)
- **Unique**: No limits, exact price shown
- **Auth**: Will require login (future)
- **Save**: Calculation history (future)

### SEO Pages (5 pages)
- **Unique**: Calculator pre-selected by platform
- **Auto-scroll**: `?calc=true` URL parameter
- **Content**: 800-1,600 words each
- **CTA**: Upgrade to Pro at bottom

### NotFound (`*`)
- **Unique**: Friendly 404 with suggestions
- **Links**: Home, Calculator, Pricing
- **Design**: Clean, helpful

---

## 🧭 Navigation Flow

### User Journey: New Visitor
```
Google Search (SEO page)
    ↓
SEO Page (read content)
    ↓
Use Calculator (evaluate offer)
    ↓
See Result (verdict shown)
    ↓
Upgrade CTA (click)
    ↓
Pricing Page (see plans)
    ↓
Upgrade to Pro (future: Stripe)
```

### User Journey: Direct Traffic
```
Home Page (land on site)
    ↓
Scroll to Calculator (on page)
    ↓
Fill Form (evaluate offer)
    ↓
See Result (verdict + upgrade teasing)
    ↓
Click "Upgrade to Pro" CTA
    ↓
Pricing Page
    ↓
Convert
```

### User Journey: Return Visitor (Pro)
```
Home → Login → Dashboard (future)
    ↓
Premium Calculator
    ↓
Calculate Rate
    ↓
Save to History
    ↓
Logout
```

---

## 📱 Mobile Navigation

### Header (Mobile)
- Hamburger menu (☰)
- Links: Home, Pricing, Login
- Collapses on selection

### Footer
- Minimal: "© 2025 WMR"
- Future: Links to SEO pages

---

## 🔍 SEO URLs Best Practices

### Current URLs (Good)
- ✅ `/youtube-sponsorship-calculator` (descriptive)
- ✅ `/instagram-sponsorship-calculator` (consistent)
- ✅ `/tiktok-sponsorship-calculator` (hyphenated)
- ✅ `/podcast-sponsorship-rates` (keyword-rich)
- ✅ `/how-much-to-charge-sponsorship` (natural)

### Why These Work
- Lowercase only
- Hyphens (not underscores)
- Descriptive (not `/calc1`, `/page2`)
- Include keywords
- Consistent pattern

---

## 🧪 Route Testing Checklist

### Before Launch
- [ ] All routes load without errors
- [ ] 404 page shows for invalid URLs
- [ ] Header links work (all pages)
- [ ] Footer links work (when added)
- [ ] Mobile menu works
- [ ] Browser back/forward works
- [ ] Deep links work (direct URL access)
- [ ] Auto-scroll works (?calc=true)

### Manual Test Commands
```bash
# Test all main routes
http://localhost:5173/
http://localhost:5173/pricing
http://localhost:5173/calculator
http://localhost:5173/premium-calculator
http://localhost:5173/login
http://localhost:5173/signup
http://localhost:5173/dashboard

# Test all SEO routes
http://localhost:5173/youtube-sponsorship-calculator
http://localhost:5173/instagram-sponsorship-calculator
http://localhost:5173/tiktok-sponsorship-calculator
http://localhost:5173/podcast-sponsorship-rates
http://localhost:5173/how-much-to-charge-sponsorship

# Test auto-scroll
http://localhost:5173/youtube-sponsorship-calculator?calc=true

# Test 404
http://localhost:5173/this-page-does-not-exist
```

---

## 📊 Route Analytics Events

### Page Views
```javascript
// Main pages
trackPageView('home')
trackPageView('pricing')
trackPageView('calculator')

// SEO pages
trackPageView('seo_youtube')
trackPageView('seo_instagram')
trackPageView('seo_tiktok')
trackPageView('seo_podcast')
trackPageView('seo_general')

// Error pages
trackPageView('404', { attempted_url: window.location.pathname })
```

### Navigation Events
```javascript
// Internal navigation
trackEvent('internal_link_clicked', {
  from: 'home',
  to: 'pricing'
})

// Auto-scroll triggered
trackEvent('auto_scroll_triggered', {
  page: 'youtube-sponsorship-calculator',
  source: 'url_parameter'
})

// 404 recovery
trackEvent('404_recovery_link_clicked', {
  destination: 'home'
})
```

---

## 🚀 Future Routes

### Short-term
- [ ] `/pricing/success` - Stripe success page
- [ ] `/pricing/cancel` - Stripe cancel page
- [ ] `/reset-password` - Password reset
- [ ] `/verify-email` - Email verification

### Medium-term
- [ ] `/blog` - Blog listing
- [ ] `/blog/:slug` - Individual blog posts
- [ ] `/case-studies` - Success stories
- [ ] `/affiliate` - Affiliate program

### Long-term
- [ ] `/api-docs` - API documentation (if offering API)
- [ ] `/partners` - Partner program
- [ ] `/compare` - Rate comparison tool
- [ ] `/tools` - Additional tools

---

## 🎨 Route Design Patterns

### Pattern 1: Calculator on Page
**Used by**: Home page

**Benefit**: Zero friction, immediate access

### Pattern 2: Standalone Calculator
**Used by**: Calculator, Premium Calculator pages

**Benefit**: Focused experience, shareable links

### Pattern 3: SEO + Calculator
**Used by**: All 5 SEO pages

**Benefit**: Education + conversion in one page

### Pattern 4: Coming Soon
**Used by**: Login, Signup, Dashboard

**Benefit**: Maintains structure, clear expectations

---

## 📝 Route Naming Conventions

### Follow These Rules
- ✅ Lowercase only
- ✅ Hyphens for spaces
- ✅ Descriptive, not generic
- ✅ Include keywords (SEO)
- ✅ Consistent patterns

### Avoid
- ❌ Camel case (`/myPage`)
- ❌ Underscores (`/my_page`)
- ❌ Generic names (`/page1`, `/tool`)
- ❌ Abbreviations (`/calc`, `/yt`)
- ❌ Numbers for versioning (`/calculator-v2`)

---

## 🔧 Maintenance

### When Adding New Routes
1. Create page component
2. Import in `App.jsx`
3. Add `<Route>` in appropriate section
4. Update this documentation
5. Add to sitemap (when created)
6. Test route manually
7. Check mobile menu if main page

### When Removing Routes
1. Remove from `App.jsx`
2. Delete page component
3. Update documentation
4. Add 301 redirect (if SEO page)
5. Update sitemap
6. Check for broken internal links

---

## 🎯 Current Status

### Functional Routes: 13/13 ✅
- 7 main pages (4 complete, 3 placeholders)
- 5 SEO pages (all complete)
- 1 error page (complete)

### With Content: 10/13 ✅
- 4 main pages complete
- 5 SEO pages complete
- 1 error page complete

### Placeholders: 3/13
- Login (coming soon)
- Signup (coming soon)
- Dashboard (coming soon)

**Completion**: 77% (10/13) complete routes

---

## 🌐 Production URLs (Future)

When deployed, routes will be:
```
https://sponsorprice.co/
https://sponsorprice.co/pricing
https://sponsorprice.co/calculator
https://sponsorprice.co/premium-calculator
https://sponsorprice.co/youtube-sponsorship-calculator
https://sponsorprice.co/instagram-sponsorship-calculator
https://sponsorprice.co/tiktok-sponsorship-calculator
https://sponsorprice.co/podcast-sponsorship-rates
https://sponsorprice.co/how-much-to-charge-sponsorship
https://sponsorprice.co/login
https://sponsorprice.co/signup
https://sponsorprice.co/dashboard
```

---

**Status**: ✅ **ROUTES SYSTEM COMPLETE**

All routes are configured and functional. Placeholder pages are professional and ready for implementation.

**Next Step**: Implement auth pages (Login, Signup) and Dashboard!
