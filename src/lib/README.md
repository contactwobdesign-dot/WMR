# Library Files

This directory contains core business logic, constants, and utility functions.

## Files

- `constants.js` - All calculation data and configuration
- `supabase.js` - Supabase client configuration

## Constants Overview

### 1. Platforms
Five major content platforms supported:
- YouTube
- Instagram
- TikTok
- Podcast
- Newsletter

### 2. Niches (with CPM rates)
10 content niches with their base CPM (Cost Per Mille) rates in USD:

| Niche | CPM (USD) |
|-------|-----------|
| Finance | $40 |
| Tech | $27 |
| Business | $27 |
| Health & Fitness | $22 |
| Education | $20 |
| Beauty | $17 |
| Lifestyle | $15 |
| Food & Cooking | $13 |
| Gaming | $10 |
| Entertainment | $8 |

### 3. Size Brackets (Audience Multiplier)
Channel size affects rates inversely:

| Bracket | Multiplier | Reason |
|---------|------------|--------|
| Nano (< 10k) | 1.2x | Higher engagement, niche audience |
| Micro (10k - 100k) | 1.0x | Sweet spot for brands |
| Mid (100k - 500k) | 0.9x | Scaling efficiency |
| Macro (500k - 1M) | 0.8x | Bulk discount |
| Mega (1M+) | 0.7x | Volume pricing |

### 4. Content Types
Different integration levels command different rates:

| Type | Multiplier | Duration |
|------|------------|----------|
| Shorts / Reels | 0.5x | < 30 sec |
| Quick Mention | 1.0x | 30-60 sec |
| Integration | 1.5x | 1-2 min |
| Dedicated Video | 2.5x | Full video |

### 5. Engagement Brackets
Engagement rate significantly impacts value:

| Range | Multiplier | Quality |
|-------|------------|---------|
| < 2% | 0.7x | Low engagement |
| 2-5% | 1.0x | Average |
| 5-8% | 1.3x | Good |
| 8%+ | 1.5x | Excellent |

### 6. Company Size
Brand size affects budget availability:

| Size | Multiplier | Budget Level |
|------|------------|--------------|
| Startup | 0.7x | Limited |
| Medium | 1.0x | Decent |
| Large | 1.2x | Premium |
| Enterprise | 1.5x | Significant |

### 7. Audience Location
Geographic purchasing power matters:

| Region | Multiplier | Notes |
|--------|------------|-------|
| USA | 1.0x | Premium market |
| UK/CA/AU | 0.85x | Strong anglophone |
| Western EU | 0.7x | 30% below US |
| Eastern EU | 0.5x | Lower purchasing power |
| LATAM | 0.4x | Growing market |
| India/SEA | 0.2x | Volume play |
| Mixed/Global | 0.6x | Average |

### 8. Verdict System (4 Levels)

The verdict compares the offered rate to the calculated fair rate:

| Verdict | Threshold | Color | Meaning |
|---------|-----------|-------|---------|
| **Way Too Low** | < 50% | Red | Insulting offer |
| **Too Low** | 50-75% | Orange | Below market |
| **Acceptable** | 75-95% | Yellow | Slightly low |
| **Good Deal** | ≥ 95% | Green | Fair value |

## Calculation Formula

```javascript
Fair Rate = (
  Niche CPM × 
  Average Views × 
  Size Multiplier × 
  Content Type Multiplier × 
  Engagement Multiplier × 
  Company Size Multiplier × 
  Audience Location Multiplier
) / 1000

Verdict = Offered Amount / Fair Rate
```

## Usage Example

```javascript
import { 
  NICHES, 
  SIZE_BRACKETS, 
  CONTENT_TYPES,
  VERDICT_THRESHOLDS,
  VERDICT_CONFIG 
} from './constants'

// Get niche CPM
const niche = NICHES.find(n => n.value === 'tech')
console.log(niche.cpm) // 27

// Get size multiplier
const sizeMultiplier = SIZE_BRACKETS.find(b => 50000 <= b.max).multiplier
console.log(sizeMultiplier) // 1.0 (Micro tier)

// Get content type multiplier
const contentType = CONTENT_TYPES.find(c => c.value === 'integration')
console.log(contentType.multiplier) // 1.5

// Determine verdict
const ratio = offeredAmount / fairRate
let verdict
if (ratio < VERDICT_THRESHOLDS.WAY_TOO_LOW) {
  verdict = VERDICT_CONFIG.WAY_TOO_LOW
} else if (ratio < VERDICT_THRESHOLDS.TOO_LOW) {
  verdict = VERDICT_CONFIG.TOO_LOW
} else if (ratio < VERDICT_THRESHOLDS.ACCEPTABLE) {
  verdict = VERDICT_CONFIG.ACCEPTABLE
} else {
  verdict = VERDICT_CONFIG.GOOD
}
```

## Icons

The verdict system uses Lucide React icons:
- `XCircle` - Way Too Low
- `AlertTriangle` - Too Low
- `AlertCircle` - Acceptable
- `CheckCircle` - Good Deal

Make sure to import these from `lucide-react` when building the UI.
