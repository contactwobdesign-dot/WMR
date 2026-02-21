# Calculate Price Functions Guide

Complete guide to using the price calculation functions in `/src/lib/calculatePrice.js`

## Overview

Two main functions:
1. **`calculateFullPrice()`** - Calculate fair market rate with full breakdown
2. **`evaluateOffer()`** - Evaluate an offer against market value (with verdict)

---

## Function 1: `calculateFullPrice()`

### Purpose
Calculates the fair market rate for a sponsorship deal with detailed breakdown.

### Input Parameters

```javascript
{
  platform: string,          // 'youtube', 'instagram', 'tiktok', 'podcast', 'newsletter'
  niche: string,             // 'finance', 'tech', 'gaming', etc.
  subscribers: number,        // Total subscriber/follower count
  averageViews: number,       // Average views per video/post
  engagementRate: number,     // Percentage (e.g., 5.5 for 5.5%)
  contentType: string,        // 'mention', 'integration', 'dedicated', 'shorts'
  companySize: string,        // 'startup', 'medium', 'large', 'enterprise'
  audienceLocation: string,   // 'us', 'uk_ca_au', 'western_eu', etc.
}
```

### Return Value

```javascript
{
  min: number,              // Minimum recommended rate (80% of average)
  max: number,              // Maximum recommended rate (120% of average)
  average: number,          // Fair market value
  breakdown: {
    baseCPM: number,                  // CPM from niche
    basePrice: number,                // Views × CPM / 1000
    sizeMultiplier: number,           // Size bracket multiplier
    sizeLabel: string,                // e.g., "Micro (10k - 100k)"
    contentMultiplier: number,        // Content type multiplier
    contentLabel: string,             // e.g., "Integration (1-2 min)"
    engagementMultiplier: number,     // Engagement multiplier
    engagementLabel: string,          // e.g., "Good (5-8%)"
    companyMultiplier: number,        // Company size multiplier
    companyLabel: string,             // e.g., "Large Company"
    companyAdvice: string,            // Advice for this company size
    locationMultiplier: number,       // Location multiplier
    locationLabel: string,            // e.g., "Mostly USA"
    locationAdvice: string,           // Advice for this location
  }
}
```

### Usage Example

```javascript
import { calculateFullPrice } from '@/lib/calculatePrice'

const result = calculateFullPrice({
  platform: 'youtube',
  niche: 'tech',
  subscribers: 50000,
  averageViews: 10000,
  engagementRate: 6,
  contentType: 'integration',
  companySize: 'large',
  audienceLocation: 'us',
})

console.log(result)
// {
//   min: 505,
//   max: 758,
//   average: 632,
//   breakdown: {
//     baseCPM: 27,
//     basePrice: 270,
//     sizeMultiplier: 1.0,
//     sizeLabel: "Micro (10k - 100k)",
//     contentMultiplier: 1.5,
//     contentLabel: "Integration (1-2 min)",
//     engagementMultiplier: 1.3,
//     engagementLabel: "Good (5-8%)",
//     companyMultiplier: 1.2,
//     companyLabel: "Large Company",
//     companyAdvice: "Large companies expect premium rates...",
//     locationMultiplier: 1.0,
//     locationLabel: "Mostly USA",
//     locationAdvice: "US audiences command premium rates..."
//   }
// }
```

### React Component Example

```jsx
import { calculateFullPrice } from '@/lib/calculatePrice'
import { useState } from 'react'

function RateCalculator() {
  const [formData, setFormData] = useState({
    platform: 'youtube',
    niche: 'tech',
    subscribers: 50000,
    averageViews: 10000,
    engagementRate: 6,
    contentType: 'integration',
    companySize: 'large',
    audienceLocation: 'us',
  })

  const result = calculateFullPrice(formData)

  return (
    <div>
      {/* Form inputs */}
      
      <div className="results">
        <h2>Your Fair Rate</h2>
        <div className="text-4xl font-bold">${result.average}</div>
        <div className="text-gray-600">
          Range: ${result.min} - ${result.max}
        </div>

        <div className="breakdown mt-6">
          <h3>Calculation Breakdown</h3>
          <div>Base CPM: ${result.breakdown.baseCPM}</div>
          <div>Base Price: ${result.breakdown.basePrice}</div>
          <div>Size: {result.breakdown.sizeLabel} ({result.breakdown.sizeMultiplier}x)</div>
          <div>Content: {result.breakdown.contentLabel} ({result.breakdown.contentMultiplier}x)</div>
          <div>Engagement: {result.breakdown.engagementLabel} ({result.breakdown.engagementMultiplier}x)</div>
          <div>Company: {result.breakdown.companyLabel} ({result.breakdown.companyMultiplier}x)</div>
          <div>Location: {result.breakdown.locationLabel} ({result.breakdown.locationMultiplier}x)</div>
        </div>
      </div>
    </div>
  )
}
```

---

## Function 2: `evaluateOffer()`

### Purpose
Evaluates an offer received from a brand and provides a verdict with negotiation advice.

### Input Parameters

Same as `calculateFullPrice()`, plus:

```javascript
{
  // ... all parameters from calculateFullPrice
  offeredPrice: number,  // The amount the brand is offering
}
```

### Return Value

```javascript
{
  verdict: string,                // 'WAY_TOO_LOW', 'TOO_LOW', 'ACCEPTABLE', 'GOOD'
  verdictConfig: object,          // Full verdict configuration object
  percentageOfValue: number,      // Offer as % of fair value (e.g., 78)
  difference: number,             // Dollar amount below fair value
  message: string,                // Personalized message about the offer
  companyContext: string,         // Context-aware negotiation advice
  calculatedPrice: object,        // Full result from calculateFullPrice()
}
```

### Verdict Levels

| Verdict | Threshold | Meaning |
|---------|-----------|---------|
| **WAY_TOO_LOW** | < 50% | Insulting offer, don't counter |
| **TOO_LOW** | 50-75% | Significantly below market |
| **ACCEPTABLE** | 75-95% | Slightly below, room to negotiate |
| **GOOD** | ≥ 95% | Fair market value |

### Usage Example

```javascript
import { evaluateOffer } from '@/lib/calculatePrice'

const evaluation = evaluateOffer({
  platform: 'youtube',
  niche: 'tech',
  subscribers: 50000,
  averageViews: 10000,
  engagementRate: 6,
  contentType: 'integration',
  companySize: 'large',
  audienceLocation: 'us',
  offeredPrice: 300,  // Brand offers $300
})

console.log(evaluation)
// {
//   verdict: 'TOO_LOW',
//   verdictConfig: {
//     key: 'TOO_LOW',
//     color: 'verdict-too-low',
//     bgColor: 'bg-orange-50',
//     textColor: 'text-orange-700',
//     borderColor: 'border-orange-200',
//     icon: 'AlertTriangle',
//     title: 'Too Low',
//     subtitle: 'Significantly below market. Negotiate hard.'
//   },
//   percentageOfValue: 47,
//   difference: 332,
//   message: "At 47% of your value, this needs serious negotiation. Push for at least 50% more.",
//   companyContext: "Large companies usually have room to negotiate. Don't accept this first offer.",
//   calculatedPrice: { /* full breakdown */ }
// }
```

### React Component Example

```jsx
import { evaluateOffer } from '@/lib/calculatePrice'
import { AlertTriangle, CheckCircle, AlertCircle, XCircle } from 'lucide-react'

const ICONS = {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  XCircle,
}

function OfferEvaluator({ formData, offeredPrice }) {
  const evaluation = evaluateOffer({
    ...formData,
    offeredPrice: parseFloat(offeredPrice),
  })

  const Icon = ICONS[evaluation.verdictConfig.icon]

  return (
    <div className={`${evaluation.verdictConfig.bgColor} ${evaluation.verdictConfig.borderColor} border-2 rounded-xl p-6`}>
      {/* Verdict Badge */}
      <div className="flex items-center gap-3 mb-4">
        <Icon className={evaluation.verdictConfig.textColor} size={40} />
        <div>
          <h2 className={`text-2xl font-bold ${evaluation.verdictConfig.textColor}`}>
            {evaluation.verdictConfig.title}
          </h2>
          <p className={evaluation.verdictConfig.textColor}>
            {evaluation.verdictConfig.subtitle}
          </p>
        </div>
      </div>

      {/* Percentage */}
      <div className="text-lg font-semibold mb-3">
        This offer is {evaluation.percentageOfValue}% of your market value
      </div>

      {/* Message */}
      <p className="mb-4">{evaluation.message}</p>

      {/* Company Context */}
      <div className="bg-white/50 rounded-lg p-4">
        <strong>💡 Context:</strong> {evaluation.companyContext}
      </div>

      {/* Show difference if lowball */}
      {evaluation.verdict !== 'GOOD' && (
        <div className="mt-4 text-sm">
          You'd be leaving <strong>${evaluation.difference}</strong> on the table.
        </div>
      )}
    </div>
  )
}
```

---

## Helper Functions

### `findBracket(value, brackets)`
Finds the appropriate bracket for a given value.

```javascript
// Internal use only
const bracket = findBracket(50000, SIZE_BRACKETS)
// Returns: { max: 100000, multiplier: 1.0, label: "Micro (10k - 100k)" }
```

### `findByValue(value, array)`
Finds an item in an array by its value property.

```javascript
// Internal use only
const niche = findByValue('tech', NICHES)
// Returns: { value: 'tech', label: 'Tech', cpm: 27 }
```

---

## Common Patterns

### Pattern 1: Real-time Calculation

```jsx
import { calculateFullPrice } from '@/lib/calculatePrice'
import { useMemo } from 'react'

function Calculator({ formData }) {
  const result = useMemo(() => 
    calculateFullPrice(formData), 
    [formData]
  )
  
  return <div>Fair Rate: ${result.average}</div>
}
```

### Pattern 2: Progressive Disclosure

```jsx
function Results({ result }) {
  const [showBreakdown, setShowBreakdown] = useState(false)
  
  return (
    <div>
      <div className="text-4xl">${result.average}</div>
      <button onClick={() => setShowBreakdown(!showBreakdown)}>
        {showBreakdown ? 'Hide' : 'Show'} Breakdown
      </button>
      
      {showBreakdown && (
        <div className="breakdown">
          {/* Show all breakdown details */}
        </div>
      )}
    </div>
  )
}
```

### Pattern 3: Multi-scenario Comparison

```jsx
function CompareScenarios({ baseData }) {
  const scenarios = [
    { ...baseData, contentType: 'mention', label: 'Quick Mention' },
    { ...baseData, contentType: 'integration', label: 'Integration' },
    { ...baseData, contentType: 'dedicated', label: 'Dedicated Video' },
  ]
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {scenarios.map(scenario => {
        const result = calculateFullPrice(scenario)
        return (
          <div key={scenario.label} className="card">
            <h3>{scenario.label}</h3>
            <div className="text-2xl font-bold">${result.average}</div>
          </div>
        )
      })}
    </div>
  )
}
```

---

## Important Notes

1. **Minimum Floor**: All calculations have a $50 minimum floor
2. **Rounding**: All prices are rounded to nearest dollar
3. **Range**: Min/Max are ±20% of average
4. **Fallbacks**: Functions handle missing data gracefully with sensible defaults

## Testing

Run the test examples:

```bash
# If you want to see console output
node src/lib/calculatePrice.test.js
```

Or import in your app:

```javascript
import './lib/calculatePrice.test.js'
```
