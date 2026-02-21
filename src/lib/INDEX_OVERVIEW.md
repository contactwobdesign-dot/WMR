# `/src/lib/` Directory Overview

Complete reference for the library directory.

## 📁 File Structure

```
/src/lib/
├── calculatePrice.js        ⭐ Price calculation functions
├── calculatePrice.test.js   🧪 Test examples
├── constants.js             📊 All data (platforms, niches, multipliers)
├── supabase.js             🔐 Supabase client
├── index.js                📦 Central export point
├── README.md               📖 General documentation
├── EXAMPLES.md             💡 Usage examples for constants
├── CALCULATE_GUIDE.md      📘 Calculation functions guide
└── INDEX_OVERVIEW.md       📋 This file
```

---

## 📦 What to Import

### From Root Index (Recommended)

```javascript
import { 
  // Constants
  PLATFORMS,
  NICHES,
  SIZE_BRACKETS,
  CONTENT_TYPES,
  ENGAGEMENT_BRACKETS,
  COMPANY_SIZES,
  AUDIENCE_LOCATIONS,
  VERDICT_THRESHOLDS,
  VERDICT_CONFIG,
  
  // Functions
  calculateFullPrice,
  evaluateOffer,
  
  // Supabase
  supabase
} from '@/lib'
```

### From Specific Files

```javascript
// Constants only
import { NICHES, PLATFORMS } from '@/lib/constants'

// Functions only
import { calculateFullPrice, evaluateOffer } from '@/lib/calculatePrice'

// Supabase only
import { supabase } from '@/lib/supabase'
```

---

## 🎯 Quick Reference

### Core Functions

| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `calculateFullPrice()` | Calculate fair market rate | Form data | Price + breakdown |
| `evaluateOffer()` | Evaluate brand offer | Form data + offer | Verdict + advice |

### Data Constants

| Constant | Type | Count | Purpose |
|----------|------|-------|---------|
| `PLATFORMS` | Array | 5 | Platform options |
| `NICHES` | Array | 10 | Niches with CPM rates |
| `SIZE_BRACKETS` | Array | 5 | Audience size tiers |
| `CONTENT_TYPES` | Array | 4 | Content type multipliers |
| `ENGAGEMENT_BRACKETS` | Array | 4 | Engagement multipliers |
| `COMPANY_SIZES` | Array | 4 | Company size multipliers |
| `AUDIENCE_LOCATIONS` | Array | 7 | Location multipliers |
| `VERDICT_THRESHOLDS` | Object | 3 | Verdict thresholds |
| `VERDICT_CONFIG` | Object | 4 | Verdict UI configs |

---

## 📖 Documentation Files

### 1. README.md
- Overview of all constants
- Data tables
- Calculation formula
- Basic usage

### 2. EXAMPLES.md
- 7 practical code examples
- React component patterns
- Form integration examples
- Best practices

### 3. CALCULATE_GUIDE.md
- Complete API reference
- Function signatures
- Return value schemas
- React component examples
- Common patterns

### 4. INDEX_OVERVIEW.md (this file)
- Directory structure
- Import patterns
- Quick reference tables
- File purposes

---

## 🚀 Getting Started

### Step 1: Import What You Need

```javascript
// For building forms
import { PLATFORMS, NICHES, CONTENT_TYPES } from '@/lib'

// For calculations
import { calculateFullPrice } from '@/lib'

// For offer evaluation
import { evaluateOffer } from '@/lib'
```

### Step 2: Use in Components

```jsx
function MyCalculator() {
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
  
  return <div>Fair Rate: ${result.average}</div>
}
```

### Step 3: Handle Results

```jsx
// Access breakdown
console.log(result.breakdown.baseCPM)
console.log(result.breakdown.sizeLabel)

// Show range
<div>Range: ${result.min} - ${result.max}</div>

// Display advice
<div>{result.breakdown.companyAdvice}</div>
```

---

## 🎨 UI Integration Patterns

### Pattern 1: Dropdown from Constants

```jsx
<select>
  {PLATFORMS.map(p => (
    <option key={p.value} value={p.value}>
      {p.label}
    </option>
  ))}
</select>
```

### Pattern 2: Real-time Calculation

```jsx
const result = useMemo(() => 
  calculateFullPrice(formData), 
  [formData]
)
```

### Pattern 3: Verdict Display

```jsx
const evaluation = evaluateOffer({...formData, offeredPrice})
const Icon = ICONS[evaluation.verdictConfig.icon]

<div className={evaluation.verdictConfig.bgColor}>
  <Icon className={evaluation.verdictConfig.textColor} />
  <h2>{evaluation.verdictConfig.title}</h2>
</div>
```

---

## 📊 Data Flow

```
User Input (Form)
    ↓
Constants (NICHES, SIZE_BRACKETS, etc.)
    ↓
calculateFullPrice()
    ↓
{
  min: number,
  max: number,
  average: number,
  breakdown: { ... }
}
    ↓
Display to User
```

With Offer Evaluation:

```
User Input + Offered Price
    ↓
evaluateOffer()
    ↓
Calls calculateFullPrice() internally
    ↓
{
  verdict: string,
  verdictConfig: object,
  percentageOfValue: number,
  message: string,
  ...
}
    ↓
Show Verdict + Advice
```

---

## 🔍 Common Use Cases

### Use Case 1: "Calculate My Rate"
1. User fills form
2. Call `calculateFullPrice(formData)`
3. Display `result.average` prominently
4. Show `result.min - result.max` range
5. Optionally show `result.breakdown` for transparency

### Use Case 2: "Is This Offer Fair?"
1. User fills form + enters offered amount
2. Call `evaluateOffer({...formData, offeredPrice})`
3. Display verdict badge with color
4. Show `evaluation.message`
5. Show `evaluation.companyContext` for advice

### Use Case 3: "Compare Scenarios"
1. User fills base data
2. Calculate for multiple content types:
   - Quick mention
   - Integration
   - Dedicated video
3. Show side-by-side comparison
4. Highlight recommended option

---

## ⚠️ Important Notes

### Price Calculation
- Minimum floor: **$50**
- All prices rounded to nearest dollar
- Range is ±20% of average

### Data Validation
- Functions handle missing data gracefully
- Sensible defaults applied when needed
- No crashes on invalid input

### Verdict Thresholds
```javascript
< 50%   → WAY_TOO_LOW  (Red)
50-75%  → TOO_LOW      (Orange)
75-95%  → ACCEPTABLE   (Yellow)
≥ 95%   → GOOD         (Green)
```

### Multipliers Stack
All multipliers are **multiplicative**, not additive:
```
Final = Base × Size × Content × Engagement × Company × Location
```

---

## 🧪 Testing

### Run Test Examples
```bash
node src/lib/calculatePrice.test.js
```

### Manual Testing Checklist
- [ ] Test each niche (Finance = highest, Entertainment = lowest)
- [ ] Test size brackets (Nano = highest multiplier, Mega = lowest)
- [ ] Test content types (Dedicated = 2.5x, Shorts = 0.5x)
- [ ] Test engagement levels (< 2% = 0.7x, 8%+ = 1.5x)
- [ ] Test company sizes (Startup = 0.7x, Enterprise = 1.5x)
- [ ] Test locations (USA = 1.0x, India/SEA = 0.2x)
- [ ] Test all 4 verdict levels
- [ ] Test minimum floor ($50)

---

## 📚 Further Reading

- **General concepts**: `README.md`
- **Constant usage**: `EXAMPLES.md`
- **Function API**: `CALCULATE_GUIDE.md`
- **Constants summary**: `/CONSTANTS_SUMMARY.md` (root)
- **Design system**: `/src/styles/README.md`

---

## 💡 Tips

1. **Always use `useMemo`** for calculations in React
2. **Show breakdown** to build trust with users
3. **Use verdict colors** consistently across UI
4. **Include advice text** from company sizes and locations
5. **Test edge cases** (very small/large numbers)
6. **Round to clean numbers** ($647 → $650)
7. **Explain multipliers** with tooltips or info icons
8. **Mobile-first** design for forms
9. **Progressive disclosure** for advanced options
10. **Save calculations** to database for premium users

---

## 🎓 Learning Path

1. **Start**: Read `README.md`
2. **Explore**: Try examples in `EXAMPLES.md`
3. **Deep dive**: Study `CALCULATE_GUIDE.md`
4. **Build**: Create your first calculator component
5. **Refine**: Add verdict evaluation
6. **Polish**: Integrate design system
7. **Ship**: Deploy to production

---

Last updated: 2025-02-05
