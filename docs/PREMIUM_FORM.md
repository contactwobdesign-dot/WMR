# 👑 Premium Calculator Form

Documentation for the Premium Calculator Form component.

## Overview

`PremiumCalculatorForm` is a premium version of the calculator form that calculates exact sponsorship rates with full breakdown, instead of evaluating an existing offer.

**Location**: `/src/components/Calculator/PremiumCalculatorForm.jsx`

---

## Key Differences vs Free Form

| Feature | Free Form | Premium Form |
|---------|-----------|--------------|
| **Purpose** | Evaluate offer | Calculate rate |
| **Offered Price Field** | ✅ Yes | ❌ No |
| **Visual Style** | Standard | Gold border + PRO badge |
| **Button Text** | "Evaluate This Offer" | "Calculate My Rate" |
| **Button Icon** | None | Sparkles ✨ |
| **Border** | Gray | Gold (amber-200) |
| **Badge** | None | PRO badge (gradient) |
| **Output** | Verdict + advice | Full breakdown + range |

---

## Props

```typescript
{
  onSubmit: (data: FormData) => void,    // Required: Callback with form data
  defaultPlatform?: string,               // Optional: Pre-select platform
  disabled?: boolean                      // Optional: Disable form during calc
}
```

### Prop Details

#### `onSubmit` (required)
Callback function called when form is submitted with valid data.

**Receives**:
```javascript
{
  platform: string,
  niche: string,
  subscribers: number,
  averageViews: number,
  engagementRate: number,
  contentType: string,
  companySize: string,
  audienceLocation: string,
  // Note: NO offeredPrice field
}
```

#### `defaultPlatform` (optional)
Pre-selects a platform. Useful for SEO pages.

**Example**:
```jsx
<PremiumCalculatorForm defaultPlatform="youtube" />
```

#### `disabled` (optional)
Disables the entire form. Useful during calculation.

**Example**:
```jsx
<PremiumCalculatorForm disabled={isCalculating} />
```

---

## Form Fields

### 8 Fields Total (vs 9 in Free Form)

| # | Field | Type | Required | Format |
|---|-------|------|----------|--------|
| 1 | Platform | Select | ✅ | - |
| 2 | Niche | Select | ✅ | Shows CPM |
| 3 | Subscribers | Input | ✅ | With commas |
| 4 | Average Views | Input | ✅ | With commas |
| 5 | Engagement Rate | Input | ✅ | Decimal |
| 6 | Content Type | Select | ✅ | - |
| 7 | Company Size | Select | ✅ | "Target" label |
| 8 | Audience Location | Select | ✅ | - |

**Missing**: Offered Price field (not needed for rate calculation)

---

## Visual Design

### PRO Badge
```jsx
<div className="bg-gradient-to-r from-amber-400 to-orange-500">
  <Crown icon />
  PRO
</div>
```

**Position**: Absolute, top-right corner of card

### Card Border
```jsx
className="border border-amber-200"
```

### Submit Button
```jsx
className="bg-gradient-to-r from-amber-400 to-orange-500 
           hover:from-amber-500 hover:to-orange-600"
```

**Content**:
- Sparkles icon (lucide-react)
- Text: "Calculate My Rate"
- Gradient background (amber to orange)

---

## Usage Examples

### Basic Usage

```jsx
import { PremiumCalculatorForm } from '@/components/Calculator'
import { calculateFullPrice } from '@/lib'

function PremiumPage() {
  const [result, setResult] = useState(null)

  const handleSubmit = (formData) => {
    const calculation = calculateFullPrice(formData)
    setResult(calculation)
  }

  return (
    <div>
      <PremiumCalculatorForm onSubmit={handleSubmit} />
      
      {result && (
        <div>
          <h2>Your Fair Rate: ${result.average}</h2>
          <p>Range: ${result.min} - ${result.max}</p>
        </div>
      )}
    </div>
  )
}
```

### With Loading State

```jsx
function PremiumPage() {
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState(null)

  const handleSubmit = async (formData) => {
    setIsCalculating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const calculation = calculateFullPrice(formData)
    setResult(calculation)
    setIsCalculating(false)
  }

  return (
    <PremiumCalculatorForm 
      onSubmit={handleSubmit} 
      disabled={isCalculating} 
    />
  )
}
```

### With Default Platform (for SEO pages)

```jsx
// On a YouTube-specific landing page
function YouTubePremiumPage() {
  return (
    <div>
      <h1>YouTube Rate Calculator</h1>
      <PremiumCalculatorForm defaultPlatform="youtube" />
    </div>
  )
}
```

---

## Result Structure

The `calculateFullPrice()` function returns:

```javascript
{
  min: number,              // 80% of average
  max: number,              // 120% of average
  average: number,          // Fair market value
  breakdown: {
    baseCPM: number,
    basePrice: number,
    sizeMultiplier: number,
    sizeLabel: string,
    contentMultiplier: number,
    contentLabel: string,
    engagementMultiplier: number,
    engagementLabel: string,
    companyMultiplier: number,
    companyLabel: string,
    companyAdvice: string,
    locationMultiplier: number,
    locationLabel: string,
    locationAdvice: string,
  }
}
```

---

## Display Example

### Results Page Layout

```jsx
function ResultsDisplay({ result }) {
  return (
    <div className="bg-white rounded-xl border border-amber-200 p-8">
      {/* Main Rate */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold">
          ${result.average.toLocaleString()}
        </div>
        <div className="text-gray-600">
          Range: ${result.min.toLocaleString()} - ${result.max.toLocaleString()}
        </div>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-sm text-gray-600">Audience Size</div>
          <div className="text-lg font-semibold">
            {result.breakdown.sizeLabel}
          </div>
          <div className="text-sm text-blue-600">
            {result.breakdown.sizeMultiplier}x
          </div>
        </div>
        
        {/* More breakdown cards... */}
      </div>

      {/* Advice */}
      <div className="mt-8">
        <h3 className="font-bold mb-4">💡 Negotiation Tips</h3>
        <div className="bg-amber-50 rounded-lg p-4">
          {result.breakdown.companyAdvice}
        </div>
      </div>
    </div>
  )
}
```

---

## Validation

Same validation as Free Form:

- All 8 fields required
- `subscribers` > 0
- `averageViews` > 0
- `engagementRate` between 0 and 100
- Real-time error display
- Error clears when field becomes valid

---

## Responsive Layout

### Mobile (< 768px)
All fields stack vertically (1 column)

### Desktop (≥ 768px)
2-column grid for:
1. Subscribers + Average Views
2. Engagement Rate + Content Type

---

## Styling Classes

### Card
```jsx
className="bg-white shadow-sm rounded-xl p-6 border border-amber-200 relative"
```

### PRO Badge
```jsx
className="absolute top-4 right-4"
className="bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full"
```

### Button
```jsx
className="bg-gradient-to-r from-amber-400 to-orange-500 
           hover:from-amber-500 hover:to-orange-600 
           text-white font-semibold py-3 rounded-lg 
           shadow-md hover:shadow-lg"
```

---

## Icons Used

From `lucide-react`:
- **Crown** - PRO badge
- **Sparkles** - Submit button

---

## Comparison Table

| Feature | Free | Premium |
|---------|------|---------|
| **Fields** | 9 | 8 |
| **Offered Price** | ✅ | ❌ |
| **Output Type** | Verdict | Breakdown |
| **Output Details** | Percentage, advice | Min/max, multipliers |
| **Visual Style** | Standard | Gold theme |
| **Badge** | None | PRO |
| **Button Color** | Primary blue | Gold gradient |
| **Button Icon** | None | Sparkles |
| **Border** | Gray | Gold |
| **Use Case** | Evaluate offer | Calculate rate |
| **Target User** | Free tier | Premium tier |

---

## Test Data

```javascript
const testData = {
  platform: 'youtube',
  niche: 'tech',
  subscribers: 50000,
  averageViews: 10000,
  engagementRate: 6,
  contentType: 'integration',
  companySize: 'large',
  audienceLocation: 'us',
}
```

**Expected Result**:
- Average: ~$632
- Min: ~$505
- Max: ~$758

---

## Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/calculator` | FreeCalculator | Free offer evaluation |
| `/premium-calculator` | PremiumCalculator | Premium rate calculation |

---

## Integration Points

### With Calculation Engine
```javascript
import { calculateFullPrice } from '@/lib/calculatePrice'

const result = calculateFullPrice(formData)
```

### With Constants
```javascript
import { 
  PLATFORMS, 
  NICHES, 
  CONTENT_TYPES,
  COMPANY_SIZES,
  AUDIENCE_LOCATIONS 
} from '@/lib/constants'
```

---

## Future Enhancements

- [ ] Save calculations to user account
- [ ] Export breakdown as PDF
- [ ] Compare multiple scenarios
- [ ] Historical rate tracking
- [ ] Industry benchmark comparison
- [ ] Contract template generation

---

## Files

### Component
- `/src/components/Calculator/PremiumCalculatorForm.jsx`

### Page
- `/src/pages/PremiumCalculator.jsx`

### Export
- `/src/components/Calculator/index.js`

### Routes
- `/src/App.jsx`

---

## Documentation

- **This file**: `/PREMIUM_FORM.md`
- **Free form**: `/FORM_SYSTEM.md`
- **Calculation logic**: `/CALCULATION_SYSTEM.md`
- **Component docs**: `/src/components/Calculator/README.md`

---

**Status**: ✅ Premium form complete and ready to use!

Navigate to `/premium-calculator` to try it.
