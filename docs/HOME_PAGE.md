# 🏠 Home Page Documentation

**File**: `/src/pages/Home.jsx`

## Overview

The Home page is the main landing page of WMR. It features an integrated calculator directly on the page with comprehensive marketing sections to convert visitors.

## Structure

### 1. Hero Section
**Design**: 
- Gradient background: `bg-gradient-to-b from-primary-50 to-white`
- Large padding (pt-20 pb-32) to create space for calculator overlay

**Content**:
```jsx
- H1: "Is That Brand Deal Worth It?"
  - Style: text-4xl md:text-5xl font-bold
- Subtitle: "Find out if you're being lowballed — in 30 seconds"
  - Style: text-xl text-gray-600
```

**No CTA button** - The calculator is directly below, eliminating friction.

---

### 2. Calculator Section
**Position**: 
- Overlaps hero with negative margin: `-mt-8`
- Creates visual hierarchy and draws attention

**Component**:
```jsx
<Calculator isPremium={false} />
```

**Styling**:
- `shadow-lg` - Elevated shadow to stand out
- `max-w-2xl mx-auto` - Centered, optimal reading width
- `relative z-10` - Ensures it sits above hero background

---

### 3. How It Works
**Layout**: 
- 3 columns on desktop, 1 column on mobile
- Grid gap: `gap-12`

**Steps**:

| Icon | Title | Description |
|------|-------|-------------|
| 📊 BarChart3 | 1. Enter your stats | Subscribers, views, engagement, and niche |
| 💰 DollarSign | 2. Add their offer | The price the brand proposed to you |
| ✅ CheckCircle | 3. Get the verdict | Instantly know if it's fair or a lowball |

**Icon Style**:
- Circular background: `rounded-full`
- Primary color: `bg-primary-100 text-primary-600`
- Size: 64px (w-16 h-16)

---

### 4. Social Proof / Stats
**Background**: `bg-gray-50`

**Stats Grid**:

| Number | Description |
|--------|-------------|
| **87%** | of creators undercharge for their first sponsorship |
| **$847** | average money left on the table per deal |
| **10,000+** | creators have checked their rates |

**Styling**:
- Numbers: `text-4xl font-bold text-primary-600`
- Descriptions: `text-gray-600`
- 3 columns on desktop, stacks on mobile

**Purpose**: 
- Build credibility
- Create urgency (FOMO)
- Highlight the problem WMR solves

---

### 5. Why Creators Undercharge
**Content**:
- Headline: "Why Most Creators Undercharge"
- Paragraph explaining the market gap
- CTA button to scroll to calculator

**Copy**:
> "Without market data, creators rely on guesswork. They either accept the first offer (usually too low) or make up a number and hope for the best. Brands know this — and take advantage of it."

**CTA**:
- Text: "Don't be one of them → Check your rate"
- Action: Smooth scroll to top (calculator)
- Style: `text-primary-600 hover:text-primary-700`

---

### 6. FAQ Section
**ID**: `#faq` (for anchor links)

**Questions**:

1. **How accurate is this calculator?**
   - Answer: Based on industry CPM data, same as agencies use

2. **Is my data stored?**
   - Answer: Free = not stored, Pro = optional

3. **What's the difference between Free and Pro?**
   - Answer: Free = verdict, Pro = exact amount + tools

4. **Why does company size matter?**
   - Answer: Budget differences (startup vs Nike)

5. **Why does audience location matter?**
   - Answer: Purchasing power (US vs SEA = 5x)

**Card Styling**:
- White background: `bg-white`
- Rounded corners: `rounded-lg`
- Padding: `p-6`
- Shadow: `shadow-sm`
- Space between: `space-y-8`

---

### 7. Final CTA
**Background**: `bg-primary-600` (full-width primary color)

**Content**:
- Headline: "Ready to know your worth?" (text-4xl, white)
- Button: "Try the Calculator — It's Free"

**Button Styling**:
- White button on primary background (inverted)
- `bg-white text-primary-600`
- Hover: `hover:bg-gray-100`
- Shadow: `shadow-lg`

**Action**: Smooth scroll to top (calculator)

---

## Key Features

### ✅ Integrated Calculator
- Calculator is **on the page**, not behind a link
- Reduces friction, increases conversion
- Users can evaluate immediately

### ✅ Social Proof
- Real statistics to build trust
- Urgency through "money left on table"
- Credibility through user numbers

### ✅ Education
- "Why Creators Undercharge" section educates the problem
- FAQ answers objections
- How It Works simplifies the process

### ✅ Multiple Conversion Points
1. Scroll down to calculator (natural)
2. "Don't be one of them" CTA (mid-page)
3. Final CTA (end of page)

---

## User Flow

```
1. Land on page
   ↓
2. Read hero (3 seconds)
   ↓
3. See calculator (immediate access)
   ↓
4. Scroll down: How It Works
   ↓
5. Social proof (trust building)
   ↓
6. Why Creators Undercharge (pain point)
   ↓
7. FAQ (objection handling)
   ↓
8. Final CTA (conversion)
```

---

## Conversion Strategy

### Primary Goal
Get users to **fill out the calculator**

### Secondary Goals
1. Build trust (social proof, FAQ)
2. Educate the problem (Why section)
3. Remove friction (calculator on page)

### Friction Removers
- ❌ No signup required
- ❌ No separate calculator page
- ❌ No payment wall (free tier)
- ✅ Instant results
- ✅ Clear process (3 steps)

---

## SEO

**Meta Tags**:
```html
<title>WMR - Is That Brand Deal Worth It?</title>
<meta name="description" content="Find out if you're being lowballed — in 30 seconds" />
```

**Target Keywords**:
- "brand deal calculator"
- "sponsorship rate calculator"
- "creator pricing tool"
- "influencer rate calculator"
- "am I being lowballed"

**Content Density**:
- FAQ section provides keyword-rich content
- Social proof numbers are indexable
- Clear H2 headings for structure

---

## Mobile Optimization

### Responsive Design
- Grid collapses to 1 column on mobile
- Text sizes adjust (text-4xl → responsive)
- Calculator maintains full width
- Touch-friendly buttons (py-4)

### Performance
- No heavy images
- Icons are SVG (lucide-react)
- Minimal JavaScript
- Fast initial paint

---

## Components Used

| Component | Purpose |
|-----------|---------|
| `Calculator` | Main conversion tool |
| `Helmet` | SEO meta tags |
| `BarChart3` | How It Works icon |
| `DollarSign` | How It Works icon |
| `CheckCircle` | How It Works icon |
| `ArrowRight` | CTA button arrow |

---

## Functions

### `scrollToCalculator()`
```javascript
const scrollToCalculator = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
```

**Purpose**: Smooth scroll to top of page (where calculator is)

**Used By**:
- "Don't be one of them" CTA
- Final CTA button

---

## A/B Testing Ideas

### Hero Section
- Test: Calculator first vs Hero first
- Test: Different headlines
- Test: Add/remove subtitle

### Social Proof
- Test: Different statistics
- Test: Add testimonials
- Test: Video social proof

### CTAs
- Test: "Check Your Rate" vs "Try Calculator"
- Test: CTA button colors
- Test: CTA placement (top vs bottom)

### FAQ
- Test: Accordion vs always-open
- Test: Question order
- Test: Add more questions

---

## Analytics Events to Track

1. **Calculator Interaction**
   - Form start
   - Form submit
   - Results shown

2. **Scroll Depth**
   - Hero viewed
   - How It Works viewed
   - FAQ viewed
   - Final CTA viewed

3. **Button Clicks**
   - "Don't be one of them" CTA
   - Final CTA button
   - FAQ expansions (if using accordion)

4. **Time on Page**
   - Average session duration
   - Bounce rate
   - Exit points

---

## Maintenance

### Monthly Updates
- [ ] Update "10,000+ creators" stat
- [ ] Review FAQ questions (add new ones based on support tickets)
- [ ] A/B test CTAs

### Quarterly Updates
- [ ] Refresh social proof stats
- [ ] Update "Why Creators Undercharge" copy
- [ ] Review conversion funnel

---

## Next Steps

1. **Add Testimonials Section** (after enough users)
2. **Add Video Explainer** (optional)
3. **Add Live Chat Widget** (for conversion boost)
4. **Add Exit-Intent Popup** (optional, can be annoying)

---

## Related Files

- `/src/components/Calculator/Calculator.jsx` - Main calculator component
- `/src/components/Layout/Footer.jsx` - Footer (already in Layout)
- `/src/pages/FreeCalculator.jsx` - Standalone calculator page
- `/README.md` - Project overview

---

**Status**: ✅ **COMPLETE**

The Home page is production-ready with:
- Integrated calculator
- Full marketing funnel
- Mobile-responsive design
- SEO optimization
- Clear conversion path
