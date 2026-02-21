# Constants Usage Examples

## Import Patterns

### Individual Imports
```javascript
import { NICHES, SIZE_BRACKETS, VERDICT_CONFIG } from '@/lib/constants'
```

### All at Once
```javascript
import * as Constants from '@/lib/constants'
// Access as: Constants.NICHES, Constants.PLATFORMS, etc.
```

### From Index (Recommended)
```javascript
import { NICHES, PLATFORMS, VERDICT_CONFIG } from '@/lib'
```

## Example 1: Dropdown Options

```jsx
import { PLATFORMS, NICHES } from '@/lib/constants'

function PlatformSelector() {
  return (
    <select>
      {PLATFORMS.map(platform => (
        <option key={platform.value} value={platform.value}>
          {platform.label}
        </option>
      ))}
    </select>
  )
}

function NicheSelector() {
  return (
    <select>
      {NICHES.map(niche => (
        <option key={niche.value} value={niche.value}>
          {niche.label} (${niche.cpm} CPM)
        </option>
      ))}
    </select>
  )
}
```

## Example 2: Get Multipliers

```javascript
import { 
  SIZE_BRACKETS, 
  ENGAGEMENT_BRACKETS, 
  CONTENT_TYPES 
} from '@/lib/constants'

// Get size multiplier based on subscriber count
function getSizeMultiplier(subscribers) {
  const bracket = SIZE_BRACKETS.find(b => subscribers < b.max)
  return bracket ? bracket.multiplier : SIZE_BRACKETS[SIZE_BRACKETS.length - 1].multiplier
}

// Usage
const multiplier = getSizeMultiplier(50000) // Returns 1.0 (Micro tier)

// Get engagement multiplier based on percentage
function getEngagementMultiplier(engagementPercent) {
  const bracket = ENGAGEMENT_BRACKETS.find(b => engagementPercent < b.max)
  return bracket ? bracket.multiplier : ENGAGEMENT_BRACKETS[ENGAGEMENT_BRACKETS.length - 1].multiplier
}

// Get content type multiplier
function getContentTypeMultiplier(contentType) {
  const type = CONTENT_TYPES.find(t => t.value === contentType)
  return type ? type.multiplier : 1.0
}
```

## Example 3: Calculate Fair Rate

```javascript
import { NICHES, SIZE_BRACKETS, CONTENT_TYPES } from '@/lib/constants'

function calculateFairRate({
  niche,
  subscribers,
  avgViews,
  contentType,
  engagementRate,
  companySize,
  audienceLocation
}) {
  // Get base CPM
  const nicheData = NICHES.find(n => n.value === niche)
  const baseCPM = nicheData ? nicheData.cpm : 15
  
  // Get size multiplier
  const sizeBracket = SIZE_BRACKETS.find(b => subscribers < b.max)
  const sizeMultiplier = sizeBracket ? sizeBracket.multiplier : 0.7
  
  // Get content type multiplier
  const contentData = CONTENT_TYPES.find(c => c.value === contentType)
  const contentMultiplier = contentData ? contentData.multiplier : 1.0
  
  // Calculate
  const fairRate = (baseCPM * avgViews * sizeMultiplier * contentMultiplier) / 1000
  
  return Math.round(fairRate)
}

// Usage
const rate = calculateFairRate({
  niche: 'tech',
  subscribers: 50000,
  avgViews: 10000,
  contentType: 'integration',
  // ... other params
})

console.log(`Fair rate: $${rate}`)
```

## Example 4: Verdict Display

```jsx
import { VERDICT_THRESHOLDS, VERDICT_CONFIG } from '@/lib/constants'
import { CheckCircle, AlertCircle, AlertTriangle, XCircle } from 'lucide-react'

// Icon mapping
const ICONS = {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  XCircle,
}

function getVerdict(offeredAmount, fairRate) {
  const ratio = offeredAmount / fairRate
  
  if (ratio < VERDICT_THRESHOLDS.WAY_TOO_LOW) {
    return VERDICT_CONFIG.WAY_TOO_LOW
  } else if (ratio < VERDICT_THRESHOLDS.TOO_LOW) {
    return VERDICT_CONFIG.TOO_LOW
  } else if (ratio < VERDICT_THRESHOLDS.ACCEPTABLE) {
    return VERDICT_CONFIG.ACCEPTABLE
  } else {
    return VERDICT_CONFIG.GOOD
  }
}

function VerdictBadge({ offeredAmount, fairRate }) {
  const verdict = getVerdict(offeredAmount, fairRate)
  const Icon = ICONS[verdict.icon]
  
  return (
    <div className={`${verdict.bgColor} ${verdict.borderColor} border-2 rounded-lg p-6`}>
      <div className="flex items-center gap-3">
        <Icon className={verdict.textColor} size={32} />
        <div>
          <h3 className={`text-xl font-bold ${verdict.textColor}`}>
            {verdict.title}
          </h3>
          <p className={verdict.textColor}>
            {verdict.subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}
```

## Example 5: Company Size Advice

```jsx
import { COMPANY_SIZES } from '@/lib/constants'

function CompanySizeSelector({ value, onChange }) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-gray-700">
        Company Size
      </label>
      
      <div className="space-y-2">
        {COMPANY_SIZES.map(company => (
          <label key={company.value} className="flex items-start gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="companySize"
              value={company.value}
              checked={value === company.value}
              onChange={(e) => onChange(e.target.value)}
              className="mt-1"
            />
            <div>
              <div className="font-semibold text-gray-900">
                {company.label}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {company.advice}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
```

## Example 6: Audience Location with Advice

```jsx
import { AUDIENCE_LOCATIONS } from '@/lib/constants'

function AudienceLocationInfo({ location }) {
  const locationData = AUDIENCE_LOCATIONS.find(l => l.value === location)
  
  if (!locationData) return null
  
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-2">
      <div className="flex items-start gap-2">
        <span className="text-blue-600 font-semibold">
          💡 Tip:
        </span>
        <p className="text-blue-700 text-sm">
          {locationData.advice}
        </p>
      </div>
      <div className="mt-2 text-sm text-blue-600">
        Rate Multiplier: {locationData.multiplier}x
      </div>
    </div>
  )
}
```

## Example 7: Complete Form

```jsx
import { 
  PLATFORMS, 
  NICHES, 
  CONTENT_TYPES,
  COMPANY_SIZES,
  AUDIENCE_LOCATIONS 
} from '@/lib/constants'

function SponsorshipForm() {
  const [formData, setFormData] = useState({
    platform: '',
    niche: '',
    contentType: '',
    companySize: '',
    audienceLocation: '',
  })
  
  return (
    <form className="space-y-6">
      {/* Platform */}
      <select 
        value={formData.platform}
        onChange={(e) => setFormData({...formData, platform: e.target.value})}
      >
        <option value="">Select Platform</option>
        {PLATFORMS.map(p => (
          <option key={p.value} value={p.value}>{p.label}</option>
        ))}
      </select>
      
      {/* Niche */}
      <select 
        value={formData.niche}
        onChange={(e) => setFormData({...formData, niche: e.target.value})}
      >
        <option value="">Select Niche</option>
        {NICHES.map(n => (
          <option key={n.value} value={n.value}>
            {n.label} (${n.cpm} CPM)
          </option>
        ))}
      </select>
      
      {/* Content Type */}
      <select 
        value={formData.contentType}
        onChange={(e) => setFormData({...formData, contentType: e.target.value})}
      >
        <option value="">Select Content Type</option>
        {CONTENT_TYPES.map(c => (
          <option key={c.value} value={c.value}>{c.label}</option>
        ))}
      </select>
      
      {/* More fields... */}
    </form>
  )
}
```

## Tips

1. **Always provide fallbacks** when accessing array data:
   ```javascript
   const niche = NICHES.find(n => n.value === value) || NICHES[0]
   ```

2. **Use TypeScript** for better autocomplete (optional):
   ```typescript
   import type { Niche, Platform } from '@/lib/constants'
   ```

3. **Memoize calculations** in React:
   ```javascript
   const fairRate = useMemo(() => 
     calculateFairRate(formData), 
     [formData]
   )
   ```

4. **Validate user input** against constants:
   ```javascript
   const isValidPlatform = PLATFORMS.some(p => p.value === userInput)
   ```
