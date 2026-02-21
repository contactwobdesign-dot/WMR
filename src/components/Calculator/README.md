# Calculator Components

Calculator components for evaluating and calculating sponsorship rates.

## Components

### 1. FreeCalculatorForm

Form component for free users to evaluate a brand offer.

**Purpose**: Evaluate if an existing offer is fair.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | function | Yes | Callback function called with form data when submitted |
| `disabled` | boolean | No | Disables the entire form (useful during calculation) |

#### Form Fields

1. **Platform** (select)
   - Options from `PLATFORMS` constant
   - Required

2. **Your Niche** (select)
   - Options from `NICHES` constant
   - Shows CPM rate for each niche
   - Required

3. **Your Subscribers/Followers** (input)
   - Number input with thousand separators
   - Placeholder: "e.g. 50,000"
   - Validation: Must be > 0
   - Required

4. **Average Views per Content** (input)
   - Number input with thousand separators
   - Placeholder: "e.g. 10,000"
   - Helper text: "Average over your last 10 posts"
   - Validation: Must be > 0
   - Required

5. **Engagement Rate %** (input)
   - Decimal input (allows 0.1 step)
   - Placeholder: "e.g. 4.5"
   - Helper text: "(likes + comments) / views × 100"
   - Validation: Must be between 0 and 100
   - Required

6. **Content Type** (select)
   - Options from `CONTENT_TYPES` constant
   - Required

7. **Sponsor Company Size** (select)
   - Options from `COMPANY_SIZES` constant
   - Required

8. **Your Audience Location** (select)
   - Options from `AUDIENCE_LOCATIONS` constant
   - Required

9. **Their Offered Price** (input)
   - Number input with $ prefix and thousand separators
   - Placeholder: "e.g. 500"
   - Label: "What price did they offer you?"
   - Validation: Must be > 0
   - Required

#### Usage Example

```jsx
import { FreeCalculatorForm } from '@/components/Calculator'
import { evaluateOffer } from '@/lib/calculatePrice'

function MyPage() {
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleSubmit = async (formData) => {
    setIsCalculating(true)
    
    // Calculate result
    const evaluation = evaluateOffer(formData)
    setResult(evaluation)
    
    setIsCalculating(false)
  }

  return (
    <div>
      <FreeCalculatorForm 
        onSubmit={handleSubmit} 
        disabled={isCalculating} 
      />
      
      {result && (
        <div>
          <h2>{result.verdictConfig.title}</h2>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  )
}
```

#### Form Data Structure

The `onSubmit` callback receives an object with the following structure:

```javascript
{
  platform: string,          // e.g., 'youtube'
  niche: string,             // e.g., 'tech'
  subscribers: number,        // e.g., 50000
  averageViews: number,       // e.g., 10000
  engagementRate: number,     // e.g., 4.5
  contentType: string,        // e.g., 'integration'
  companySize: string,        // e.g., 'large'
  audienceLocation: string,   // e.g., 'us'
  offeredPrice: number,       // e.g., 500
}
```

#### Validation Rules

- All fields are required
- `subscribers` must be > 0
- `averageViews` must be > 0
- `engagementRate` must be between 0 and 100
- `offeredPrice` must be > 0
- Number inputs automatically strip non-numeric characters
- Engagement rate allows decimal values

#### Styling

The form uses Tailwind CSS classes and follows the design system:

- **Card**: White background with shadow-sm and rounded-xl
- **Inputs**: Border-gray-300 with focus:ring-primary-500
- **Labels**: Text-sm, font-medium, text-gray-700
- **Errors**: Text-red-600, displayed below invalid fields
- **Button**: Primary-600 background, hover:primary-700
- **Layout**: Responsive grid (2 columns on desktop for some fields)

#### Features

- ✅ **Number Formatting**: Automatically formats large numbers with thousand separators
- ✅ **Real-time Validation**: Shows errors as user types
- ✅ **Disabled State**: Can be disabled during calculation
- ✅ **Responsive**: 2-column grid on desktop, single column on mobile
- ✅ **Helper Text**: Provides guidance for complex fields
- ✅ **CPM Display**: Shows CPM rate for each niche option
- ✅ **Accessibility**: Proper labels and ARIA attributes

#### Grid Layout

On desktop (md breakpoint and above), these fields are displayed in 2 columns:

1. **Row 1**: Subscribers | Average Views
2. **Row 2**: Engagement Rate | Content Type

All other fields are full-width.

#### Number Formatting

The component includes built-in number formatting:

```javascript
// Display: "50,000"
// Storage: 50000

// Display: "$1,500"
// Storage: 1500
```

This makes the form more user-friendly while maintaining clean data for calculations.

---

### 2. PremiumCalculatorForm

Form component for premium users to calculate their exact rate.

**Purpose**: Calculate fair market rate with full breakdown.

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onSubmit` | function | Yes | Callback function called with form data when submitted |
| `defaultPlatform` | string | No | Pre-select a platform (useful for SEO pages) |
| `disabled` | boolean | No | Disables the entire form (useful during calculation) |

#### Form Fields

**8 Fields** (same as Free Form except no "Offered Price"):

1. Platform (select) - Required
2. Your Niche (select) - Required
3. Your Subscribers/Followers (input) - Required
4. Average Views per Content (input) - Required
5. Engagement Rate % (input) - Required
6. Content Type (select) - Required
7. Target Company Size (select) - Required
8. Your Audience Location (select) - Required

#### Visual Differences

- **PRO Badge**: Gold gradient badge in top-right corner
- **Border**: Gold border (border-amber-200)
- **Button**: Gold gradient with Sparkles icon
- **Button Text**: "Calculate My Rate"

#### Usage Example

```jsx
import { PremiumCalculatorForm } from '@/components/Calculator'
import { calculateFullPrice } from '@/lib/calculatePrice'

function MyPremiumPage() {
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleSubmit = async (formData) => {
    setIsCalculating(true)
    
    // Calculate result
    const calculation = calculateFullPrice(formData)
    setResult(calculation)
    
    setIsCalculating(false)
  }

  return (
    <div>
      <PremiumCalculatorForm 
        onSubmit={handleSubmit} 
        disabled={isCalculating}
        defaultPlatform="youtube" // Optional
      />
      
      {result && (
        <div>
          <h2>Your Fair Rate: ${result.average}</h2>
          <p>Range: ${result.min} - ${result.max}</p>
          
          {/* Show full breakdown */}
          <div>
            <h3>Breakdown</h3>
            <p>Base CPM: ${result.breakdown.baseCPM}</p>
            <p>Size: {result.breakdown.sizeLabel} ({result.breakdown.sizeMultiplier}x)</p>
            <p>Content: {result.breakdown.contentLabel} ({result.breakdown.contentMultiplier}x)</p>
            <p>Engagement: {result.breakdown.engagementLabel} ({result.breakdown.engagementMultiplier}x)</p>
            <p>Company: {result.breakdown.companyLabel} ({result.breakdown.companyMultiplier}x)</p>
            <p>Location: {result.breakdown.locationLabel} ({result.breakdown.locationMultiplier}x)</p>
          </div>
        </div>
      )}
    </div>
  )
}
```

#### Result Data Structure

The `onSubmit` callback receives:

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

Pass this to `calculateFullPrice()` to get:

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

## Component Comparison

| Feature | FreeCalculatorForm | PremiumCalculatorForm |
|---------|-------------------|----------------------|
| **Fields** | 9 | 8 |
| **Offered Price** | ✅ Yes | ❌ No |
| **Output** | Verdict + advice | Rate + breakdown |
| **Visual Style** | Standard | Gold theme |
| **Badge** | None | PRO badge |
| **Button** | Primary blue | Gold gradient |
| **Icon** | None | Sparkles ✨ |
| **Use Case** | Evaluate offer | Calculate rate |

---

## PriceCalculator

Legacy component. To be deprecated.

---

## Next Steps

Future calculator components to build:

1. **PremiumCalculatorForm** - Full calculation with breakdown
2. **QuickCalculator** - Simplified version
3. **ComparisonCalculator** - Compare multiple scenarios
4. **HistoricalTracker** - Track offers over time

---

## Testing

### Manual Testing Checklist

- [ ] All fields are required (try submitting empty)
- [ ] Number inputs reject non-numeric characters
- [ ] Thousand separators appear correctly
- [ ] Engagement rate allows decimals (e.g., 4.5)
- [ ] Engagement rate rejects values > 100 or < 0
- [ ] Subscribers/views reject values ≤ 0
- [ ] Offered price rejects values ≤ 0
- [ ] Form submits correctly with valid data
- [ ] Disabled state works (button + all inputs)
- [ ] Error messages appear for invalid fields
- [ ] Error messages clear when field is corrected
- [ ] Responsive layout works (test on mobile)
- [ ] Select dropdowns show correct options
- [ ] Niche selector shows CPM values

### Test Data

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
  offeredPrice: 300,
}
```

Expected result: **TOO_LOW** verdict (47% of market value)

---

## Dependencies

- React (hooks: useState)
- Constants from `@/lib/constants`
- Tailwind CSS for styling

---

## Maintenance Notes

- Constants are imported from `/src/lib/constants.js`
- If constants change, the form updates automatically
- Number formatting can be adjusted in `formatNumber()` function
- Validation rules in `validate()` function
- Submit data transformation in `handleSubmit()`
