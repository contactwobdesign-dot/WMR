# Sponsor Details Fields - Implementation Documentation

## Overview
Implementation of detailed sponsor information fields that significantly improve calculation accuracy. These fields capture campaign specifics that can dramatically affect fair rates (up to 2.5x for full usage rights).

## New Constants Added

### In `/src/lib/constants.js`

#### 1. CAMPAIGN_TYPES
Different campaign types warrant different pricing:
```javascript
export const CAMPAIGN_TYPES = [
  { value: 'product_launch', label: 'Product Launch', multiplier: 1.2 },
  { value: 'awareness', label: 'Brand Awareness', multiplier: 1.0 },
  { value: 'seasonal', label: 'Seasonal/Promo', multiplier: 0.9 },
  { value: 'ongoing', label: 'Ongoing Partnership', multiplier: 1.3 },
];
```

**Rationale:**
- **Product Launch (1.2x)**: High-stakes campaigns with more deliverables
- **Brand Awareness (1.0x)**: Standard baseline campaign
- **Seasonal/Promo (0.9x)**: Time-sensitive, often lower budget
- **Ongoing Partnership (1.3x)**: Long-term commitment, reliability premium

#### 2. PARTNERSHIP_DURATION
Longer commitments should pay more:
```javascript
export const PARTNERSHIP_DURATION = [
  { value: 'one_time', label: 'One-time', multiplier: 1.0 },
  { value: '3_months', label: '3 months', multiplier: 1.15 },
  { value: '6_months', label: '6 months', multiplier: 1.25 },
  { value: '1_year', label: '1 year', multiplier: 1.4 },
];
```

**Rationale:**
- One-time: No commitment, standard rate
- 3 months: 15% premium for exclusivity period
- 6 months: 25% premium for substantial commitment
- 1 year: 40% premium for full-year lock-in

#### 3. EXCLUSIVITY_OPTIONS
Restricting competitor work must be compensated:
```javascript
export const EXCLUSIVITY_OPTIONS = [
  { value: 'none', label: 'No exclusivity', multiplier: 1.0 },
  { value: 'category', label: 'Category exclusivity (30 days)', multiplier: 1.3 },
  { value: 'full', label: 'Full exclusivity (30 days)', multiplier: 1.5 },
];
```

**Rationale:**
- No exclusivity: Standard rate
- Category exclusivity: 30% premium (can't work with competing brands)
- Full exclusivity: 50% premium (no sponsors in any category for 30 days)

#### 4. USAGE_RIGHTS
Content repurposing rights are extremely valuable:
```javascript
export const USAGE_RIGHTS = [
  { value: 'organic_only', label: 'Organic only (your channels)', multiplier: 1.0 },
  { value: 'brand_socials', label: '+ Brand social media', multiplier: 1.3 },
  { value: 'paid_ads', label: '+ Paid advertising', multiplier: 1.8 },
  { value: 'full', label: 'Full rights (TV, print, etc.)', multiplier: 2.5 },
];
```

**Rationale:**
- Organic only: Content lives on creator's channel only
- Brand socials: +30% for cross-posting to brand channels
- Paid ads: +80% for using content in paid campaigns (huge reach)
- Full rights: +150% for unlimited usage (TV, print, billboards, etc.)

## New Tooltip Component

Created `/src/components/UI/Tooltip.jsx`:

```jsx
import { Info } from 'lucide-react'

export function Tooltip({ text }) {
  return (
    <div className="relative inline-block ml-1 group">
      <Info className="w-4 h-4 text-gray-400 cursor-help" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  )
}
```

**Features:**
- Hover-triggered info icon
- Educational tooltips explaining why each field matters
- Pure CSS animation (no JS required)
- High z-index to appear above form elements

## Form Modifications

### FreeCalculatorForm (REQUIRED Fields)

**Changes:**
1. Added new imports:
   - `CAMPAIGN_TYPES`, `PARTNERSHIP_DURATION`, `EXCLUSIVITY_OPTIONS`, `USAGE_RIGHTS`
   - `Tooltip` component

2. Extended `formData` state:
   ```javascript
   campaignType: '',
   partnershipDuration: '',
   exclusivity: '',
   usageRights: '',
   ```

3. Added validation (REQUIRED):
   ```javascript
   if (!formData.campaignType) newErrors.campaignType = 'Campaign type is required'
   if (!formData.partnershipDuration) newErrors.partnershipDuration = 'Partnership duration is required'
   if (!formData.exclusivity) newErrors.exclusivity = 'Exclusivity is required'
   if (!formData.usageRights) newErrors.usageRights = 'Usage rights is required'
   ```

4. New UI section "About the Sponsor":
   - Appears after "Audience Location"
   - 4 required select fields with tooltips
   - Border separator for visual distinction

**Tooltip messages for FREE:**
- **Campaign Type**: "Product launches typically pay 20% more than awareness campaigns"
- **Partnership Duration**: "Longer partnerships = higher rates. A 1-year deal should pay 40% more"
- **Exclusivity**: "If the brand asks you not to work with competitors, charge 30-50% more"
- **Usage Rights**: "If they want to use your content in ads, charge 80-150% more"

### PremiumCalculatorForm (OPTIONAL Fields)

**Changes:**
1. Same imports as FreeCalculatorForm
2. Same state extension
3. **No validation** (fields are optional)
4. New UI section "About the Sponsor (Recommended)":
   - Badge showing "(Recommended)" in premium color
   - Explanatory text: "Fill these for a more accurate calculation"
   - Select options include "(optional)" text
   - Same tooltips for education

**Visual differences:**
```jsx
<div className="flex items-center justify-between mb-2">
  <h3 className="text-lg font-semibold text-gray-900">
    About the Sponsor
  </h3>
  <span className="text-sm text-premium-600 font-medium">(Recommended)</span>
</div>
<p className="text-sm text-gray-600 mb-4">
  Fill these for a more accurate calculation
</p>
```

## Calculation Logic Updates

### In `/src/lib/calculatePrice.js`

#### 1. Added new imports:
```javascript
CAMPAIGN_TYPES,
PARTNERSHIP_DURATION,
EXCLUSIVITY_OPTIONS,
USAGE_RIGHTS,
```

#### 2. Updated `calculateFullPrice` function signature:
```javascript
export function calculateFullPrice({
  platform,
  niche,
  subscribers,
  averageViews,
  engagementRate,
  contentType,
  companySize,
  audienceLocation,
  // New optional detailed sponsor fields
  campaignType = '',
  partnershipDuration = '',
  exclusivity = '',
  usageRights = '',
})
```

#### 3. Added multiplier logic:
```javascript
// New detailed sponsor data (use multiplier 1.0 if not provided)
const campaignData = campaignType ? findByValue(campaignType, CAMPAIGN_TYPES) : null;
const durationData = partnershipDuration ? findByValue(partnershipDuration, PARTNERSHIP_DURATION) : null;
const exclusivityData = exclusivity ? findByValue(exclusivity, EXCLUSIVITY_OPTIONS) : null;
const usageData = usageRights ? findByValue(usageRights, USAGE_RIGHTS) : null;

const campaignMultiplier = campaignData?.multiplier || 1.0;
const durationMultiplier = durationData?.multiplier || 1.0;
const exclusivityMultiplier = exclusivityData?.multiplier || 1.0;
const usageMultiplier = usageData?.multiplier || 1.0;

// Apply to final price
let finalPrice = basePrice 
  * sizeMultiplier 
  * contentMultiplier 
  * engagementMultiplier 
  * companyMultiplier
  * locationMultiplier
  * campaignMultiplier      // NEW
  * durationMultiplier      // NEW
  * exclusivityMultiplier   // NEW
  * usageMultiplier;        // NEW
```

#### 4. Extended breakdown object:
```javascript
breakdown: {
  // ... existing fields ...
  campaignMultiplier,
  campaignLabel: campaignData?.label,
  durationMultiplier,
  durationLabel: durationData?.label,
  exclusivityMultiplier,
  exclusivityLabel: exclusivityData?.label,
  usageMultiplier,
  usageLabel: usageData?.label,
}
```

#### 5. Updated `evaluateOffer` function:
Same parameters and pass-through to `calculateFullPrice`.

## Calculation Impact Examples

### Example 1: Basic vs Full Deal
**Base calculation:**
- 100K subscribers, 10K avg views, 5% engagement
- YouTube tech content
- Estimated: $800

**With new fields (all maximum):**
- Campaign: Product Launch (1.2x)
- Duration: 1 year (1.4x)
- Exclusivity: Full (1.5x)
- Usage Rights: Full (2.5x)
- **Multiplier:** 1.2 × 1.4 × 1.5 × 2.5 = **6.3x**
- **New estimate:** $5,040

### Example 2: Typical Partnership
- Campaign: Brand Awareness (1.0x)
- Duration: 3 months (1.15x)
- Exclusivity: Category (1.3x)
- Usage Rights: Brand socials (1.3x)
- **Multiplier:** 1.0 × 1.15 × 1.3 × 1.3 = **1.95x**
- **New estimate:** $1,560 (from $800)

## User Experience Flow

### FREE User:
1. Sees "About the Sponsor" section after basic fields
2. All 4 fields marked as **required** (validation enforced)
3. Cannot submit without filling all fields
4. Hovers over info icons to learn why these matter
5. Gets more accurate evaluation based on complete info

### PRO User:
1. Sees "About the Sponsor (Recommended)" with premium badge
2. Fields are **optional** but encouraged
3. Helper text: "Fill these for a more accurate calculation"
4. Can submit with or without these fields
5. If filled: gets significantly more accurate result
6. If skipped: defaults to 1.0x multipliers (no change)

## Business Logic Rationale

### Why REQUIRED in FREE?
1. **Educational**: Forces users to think about these critical factors
2. **Value demonstration**: Shows the complexity Pro users get automatically
3. **Accuracy**: Ensures free calculations aren't dangerously low/high
4. **Conversion**: Users see how many factors affect pricing → upgrade

### Why OPTIONAL in PRO?
1. **Speed**: Pro users may want quick estimates
2. **Flexibility**: Not all deals have exclusivity/usage rights upfront
3. **Smart defaults**: Defaults to 1.0x if not specified (fair baseline)
4. **Trust**: Pro users understand when to use advanced features

## Technical Implementation Details

### State Management
- Form state includes new fields with empty string defaults
- `handleChange` works automatically (controlled components)
- `handleSubmit` passes all fields to `calculateFullPrice`
- Default parameters in calculation functions handle missing values

### Validation Strategy
- FREE: Explicit validation checks + error messages
- PRO: No validation, silent defaults to 1.0x
- Both forms show same tooltips for consistency

### Multiplier Cascade
All multipliers are **multiplicative**, not additive:
```
finalPrice = base × size × content × engagement × company 
             × location × campaign × duration × exclusivity × usage
```

This reflects real-world compounding value of multiple premium factors.

## Testing Checklist

### Functional Tests
- [ ] FREE form: Cannot submit without all 4 new fields
- [ ] FREE form: Tooltips appear on hover
- [ ] PRO form: Can submit with empty new fields
- [ ] PRO form: Shows "(Recommended)" badge
- [ ] Calculation: Multipliers apply correctly when filled
- [ ] Calculation: Defaults to 1.0x when fields are empty
- [ ] Calculation: Multiple multipliers compound correctly

### Visual Tests
- [ ] Tooltip positioning correct (above icon, centered)
- [ ] Section border separator visible
- [ ] Premium badge color correct (`text-premium-600`)
- [ ] Form layout responsive on mobile
- [ ] Info icons aligned with labels

### Edge Cases
- [ ] Empty strings default to 1.0x multiplier
- [ ] Extreme multipliers (2.5x usage × 1.5x exclusivity) calculate correctly
- [ ] Form reset clears new fields
- [ ] Error messages display for FREE validation

## Future Enhancements

1. **Conditional tooltips**: Different messages for FREE vs PRO users
2. **Smart suggestions**: "Based on your niche, 80% of creators accept category exclusivity"
3. **Breakdown visualization**: Show how each multiplier affects the final price
4. **Preset combinations**: "Quick select: Standard Deal / Premium Deal / Full Rights"
5. **Historical data**: "Typical exclusivity for tech YouTube: 30 days category"

## Related Files
- `/src/lib/constants.js` - All multiplier definitions
- `/src/components/UI/Tooltip.jsx` - Reusable tooltip component
- `/src/components/Calculator/FreeCalculatorForm.jsx` - Required implementation
- `/src/components/Calculator/PremiumCalculatorForm.jsx` - Optional implementation
- `/src/lib/calculatePrice.js` - Core calculation logic

## Impact on User Education

These fields serve a dual purpose:
1. **Calculation accuracy**: Dramatically improves price estimates
2. **Creator education**: Teaches what factors brands consider

By requiring these in FREE tier, we ensure users understand:
- Usage rights are extremely valuable (2.5x!)
- Exclusivity should be compensated (1.3-1.5x)
- Long-term deals warrant premiums (up to 1.4x)
- Campaign type affects budget allocation

This positions WMR as an educational tool, not just a calculator.
