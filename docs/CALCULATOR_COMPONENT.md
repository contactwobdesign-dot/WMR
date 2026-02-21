# 🎯 Calculator Component - Orchestrator

Complete documentation for the main `Calculator` orchestrator component.

## Overview

`Calculator` is the main orchestrator component that handles:
- Free/Premium mode switching
- Monthly calculation limits (free tier)
- LocalStorage tracking
- Form/Result display logic
- Save functionality (premium)

**Location**: `/src/components/Calculator/Calculator.jsx`

---

## Props

```typescript
{
  defaultPlatform?: string,    // Optional: Pre-select platform (for SEO pages)
  isPremium?: boolean,         // Optional: Premium mode (default: false)
  user?: User | null          // Optional: User object for save functionality
}
```

### Prop Details

#### `defaultPlatform` (optional)
Pre-selects a platform in the form. Useful for SEO landing pages.

**Example**:
```jsx
<Calculator defaultPlatform="youtube" />
```

#### `isPremium` (optional, default: false)
Switches between free and premium mode.

**Free Mode** (isPremium: false):
- Uses FreeCalculatorForm (9 fields)
- Shows FreeResultCard with verdict
- Enforces 2 calculations/month limit
- Shows counter
- Tracks in localStorage

**Premium Mode** (isPremium: true):
- Uses PremiumCalculatorForm (8 fields)
- Shows PremiumResultCard with breakdown
- No limits
- No counter
- Can save to database

#### `user` (optional)
User object from authentication. Required for save functionality.

**Example**:
```jsx
const { user } = useAuth()
<Calculator isPremium={true} user={user} />
```

---

## State Management

```javascript
const [result, setResult] = useState(null)              // Calculation result
const [formData, setFormData] = useState(null)          // Form data (for labels)
const [isCalculating, setIsCalculating] = useState(false) // Loading state
const [showResult, setShowResult] = useState(false)     // Show/hide result
const [calculationsUsed, setCalculationsUsed] = useState(0) // Free tier counter
const [limitReached, setLimitReached] = useState(false) // Free tier limit
```

---

## LocalStorage Logic

### Storage Format

```javascript
{
  count: number,      // Number of calculations this month
  month: number,      // Month (0-11)
  year: number        // Year (e.g., 2025)
}
```

**Key**: `"sponsorprice_calculations"`

### Initialization (useEffect)

1. Check if premium (skip if true)
2. Read localStorage
3. Parse stored data
4. Check if same month/year:
   - **Yes**: Use stored count
   - **No**: Reset to 0 and update month/year
5. Check if limit reached (count >= 2)

### On Submit

1. Check if limit reached
2. If limit reached, show upgrade message
3. If not, process calculation
4. Increment count in localStorage
5. Update state
6. Check if new limit reached

### Monthly Reset

Automatic! When component mounts in a new month:
```javascript
if (data.month !== currentMonth || data.year !== currentYear) {
  // Reset count to 0
  // Update month/year
}
```

---

## Functions

### `handleFreeSubmit(data)`

**Flow**:
1. Check if `calculationsUsed >= 2`
   - If yes: `setLimitReached(true)`, return
2. `setIsCalculating(true)`
3. Store form data
4. Simulate delay (500ms)
5. Call `evaluateOffer(data)`
6. Set result
7. Increment localStorage count
8. Update `calculationsUsed` state
9. Check if limit reached
10. Show result
11. Scroll to results
12. `setIsCalculating(false)`

### `handlePremiumSubmit(data)`

**Flow**:
1. `setIsCalculating(true)`
2. Store form data
3. Simulate delay (500ms)
4. Call `calculateFullPrice(data)`
5. Set result
6. Show result
7. Scroll to results
8. `setIsCalculating(false)`

No limit checking for premium users!

### `handleSave()`

**Flow**:
1. Check if user logged in
   - If no: Alert "Please login"
2. Try to save to Supabase:
   ```javascript
   await supabase.from('calculations').insert({
     user_id: user.id,
     result: result,
     form_data: formData,
     is_premium: isPremium,
     created_at: new Date().toISOString(),
   })
   ```
3. Show success alert
4. Handle errors gracefully

### `handleReset()`

**Flow**:
1. Clear result
2. Clear formData
3. Hide result view
4. Scroll to top

### `getNextMonthResetDate()`

**Returns**: String like "January 1" for first day of next month

---

## Render Logic

### Condition 1: Limit Reached (Free users only)

```javascript
if (limitReached && !isPremium) {
  return <LimitReachedMessage />
}
```

**Shows**:
- Lock icon
- "You've used your 2 free evaluations"
- Upgrade CTA button
- Reset date message

### Condition 2: Form View

```javascript
if (!showResult) {
  return (
    <>
      {!isPremium && <Counter />}
      {isPremium ? <PremiumForm /> : <FreeForm />}
    </>
  )
}
```

**Free Mode Shows**:
- Counter: "1/2 free evaluations used"
- Upgrade link (after first calculation)
- FreeCalculatorForm

**Premium Mode Shows**:
- No counter
- PremiumCalculatorForm

### Condition 3: Result View

```javascript
if (showResult && result) {
  return (
    <>
      {isPremium ? <PremiumResultCard /> : <FreeResultCard />}
    </>
  )
}
```

---

## Usage Examples

### Basic Free Calculator

```jsx
import { Calculator } from '@/components/Calculator'

function FreePage() {
  return (
    <div>
      <h1>Evaluate Your Offer</h1>
      <Calculator isPremium={false} />
    </div>
  )
}
```

### Premium Calculator with Auth

```jsx
import { Calculator } from '@/components/Calculator'
import { useAuth } from '@/hooks/useAuth'

function PremiumPage() {
  const { user } = useAuth()
  
  return (
    <div>
      <h1>Calculate Your Rate</h1>
      <Calculator isPremium={true} user={user} />
    </div>
  )
}
```

### SEO Page with Default Platform

```jsx
import { Calculator } from '@/components/Calculator'

function YouTubeLandingPage() {
  return (
    <div>
      <h1>YouTube Sponsorship Calculator</h1>
      <Calculator 
        defaultPlatform="youtube"
        isPremium={false}
      />
    </div>
  )
}
```

---

## Free Tier Limit System

### Rules
- **Limit**: 2 evaluations per month
- **Storage**: localStorage (client-side)
- **Reset**: Automatic on month change
- **Bypass**: Premium users have no limit

### User Experience

**First calculation** (0/2 → 1/2):
```
Counter: "1/2 free evaluations used this month"
Message: "Want unlimited? Upgrade to Pro"
```

**Second calculation** (1/2 → 2/2):
```
Counter: "2/2 free evaluations used this month"
No additional message (they can still see result)
```

**Third attempt** (2/2 → blocked):
```
Shows: Limit reached screen
Message: "You've used your 2 free evaluations"
CTA: "Upgrade to Pro"
Reset: "Resets on [date]"
```

### Security Note

**Client-side only**: LocalStorage can be cleared by user.

**Why it's okay**:
- Not protecting critical data
- Just a nudge to upgrade
- Most users won't try to circumvent
- Premium value is in features, not just limits

**For stricter enforcement** (future):
- Track by IP address (server-side)
- Require email for free tier
- Use cookies + server validation

---

## Premium Mode Benefits

### No Limits
- Unlimited calculations
- No counter shown
- No localStorage tracking

### Additional Features
- Full rate breakdown
- Save to database (if user logged in)
- Export features (coming soon)

### Visual Identity
- Gold theme throughout
- PRO badges
- Premium action buttons

---

## Database Integration (Premium)

### Schema (Future)

```sql
CREATE TABLE calculations (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  result JSONB NOT NULL,
  form_data JSONB NOT NULL,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Save Operation

```javascript
const { error } = await supabase
  .from('calculations')
  .insert({
    user_id: user.id,
    result: result,
    form_data: formData,
    is_premium: isPremium,
    created_at: new Date().toISOString(),
  })
```

---

## Error Handling

### LocalStorage Errors
```javascript
try {
  // Read/write localStorage
} catch (error) {
  console.error('Error with localStorage:', error)
  // Continue with default values (don't crash)
}
```

### Supabase Errors
```javascript
try {
  await supabase.from('calculations').insert(...)
} catch (error) {
  console.error('Error saving:', error)
  alert('Failed to save. Please try again.')
}
```

---

## Responsive Design

- **Mobile**: Full width, stacked elements
- **Desktop**: Same layout (forms are self-responsive)
- **Counter**: Centered text, readable on all devices

---

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels on limit message
- ✅ Keyboard navigation works
- ✅ Focus states visible
- ✅ Screen reader friendly

---

## Performance

- **Lazy loading**: Results only render when needed
- **LocalStorage**: Fast, no network calls
- **Memoization**: Could add for expensive calcs
- **Debouncing**: Not needed (only on submit)

---

## Testing

### Test Case 1: First Free Calculation
```javascript
// LocalStorage: { count: 0, month: 1, year: 2025 }
// Submit form
// Expected: Result shown, counter: "1/2"
```

### Test Case 2: Second Free Calculation
```javascript
// LocalStorage: { count: 1, month: 1, year: 2025 }
// Submit form
// Expected: Result shown, counter: "2/2"
```

### Test Case 3: Third Free Calculation (Limit)
```javascript
// LocalStorage: { count: 2, month: 1, year: 2025 }
// Try to submit
// Expected: Limit message shown, no calculation
```

### Test Case 4: New Month Reset
```javascript
// LocalStorage: { count: 2, month: 1, year: 2025 }
// Current date: March 1, 2025
// Component mounts
// Expected: Count resets to 0, can calculate again
```

### Test Case 5: Premium Mode
```javascript
// LocalStorage: { count: 2, month: 1, year: 2025 }
// isPremium: true
// Expected: No limits, no counter, unlimited calculations
```

---

## LocalStorage Management

### Read
```javascript
const stored = localStorage.getItem(STORAGE_KEY)
const data = JSON.parse(stored)
```

### Write
```javascript
const data = { count: 1, month: 2, year: 2025 }
localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
```

### Clear (for testing)
```javascript
localStorage.removeItem('sponsorprice_calculations')
```

---

## Props Flow

```
Calculator Component
    ├─ isPremium → Determines form/result type
    ├─ defaultPlatform → Passed to PremiumForm
    └─ user → Passed to handleSave()
        ↓
    Forms
    ├─ FreeCalculatorForm (if !isPremium)
    └─ PremiumCalculatorForm (if isPremium)
        ↓
    Results
    ├─ FreeResultCard (if !isPremium)
    └─ PremiumResultCard (if isPremium)
```

---

## Component Hierarchy

```
<Calculator>
  ├─ {limitReached && <LimitMessage />}
  ├─ {!showResult && !isPremium && <Counter />}
  ├─ {!showResult && <Form />}
  │   ├─ <FreeCalculatorForm /> (if !isPremium)
  │   └─ <PremiumCalculatorForm /> (if isPremium)
  └─ {showResult && <ResultCard />}
      ├─ <FreeResultCard /> (if !isPremium)
      └─ <PremiumResultCard /> (if isPremium)
</Calculator>
```

---

## Business Logic

### Free Tier Strategy
1. Allow 2 free calculations/month
2. Show counter to create awareness
3. Show upgrade link after first use
4. Block at limit with clear upgrade CTA
5. Auto-reset monthly (no manual action)

### Premium Tier Strategy
1. Unlimited calculations
2. No counter (premium perk)
3. Save functionality (if logged in)
4. Future features (download, email)

---

## Counter Display

### Before First Calculation
```
0/2 free evaluations used this month
```

### After First Calculation
```
1/2 free evaluations used this month
Want unlimited? Upgrade to Pro
```

### After Second Calculation
```
2/2 free evaluations used this month
Want unlimited? Upgrade to Pro
```

### On Third Attempt
```
Shows limit reached screen instead of form
```

---

## Limit Reached Screen

```jsx
<div className="limit-message">
  <Lock icon />
  
  <h2>You've used your 2 free evaluations this month</h2>
  
  <p>Upgrade to Pro for unlimited calculations...</p>
  
  <button>
    <Crown /> Upgrade to Pro <ArrowRight />
  </button>
  
  <p>Resets on {nextMonthDate}</p>
</div>
```

**Design**:
- Centered layout
- Large lock icon
- Clear messaging
- Prominent CTA
- Reset date info

---

## Integration Examples

### Simple Implementation

```jsx
import { Calculator } from '@/components/Calculator'

function MyPage() {
  return <Calculator />
}
```

That's it! The component handles everything internally.

### With Auth

```jsx
import { Calculator } from '@/components/Calculator'
import { useAuth } from '@/hooks/useAuth'

function MyPage() {
  const { user } = useAuth()
  
  return (
    <Calculator 
      isPremium={user?.isPremium || false}
      user={user}
    />
  )
}
```

### SEO Landing Page

```jsx
import { Calculator } from '@/components/Calculator'

function YouTubeRatePage() {
  return (
    <div>
      <h1>YouTube Sponsorship Rates 2025</h1>
      <p>Calculate your fair rate for YouTube sponsorships</p>
      
      <Calculator defaultPlatform="youtube" />
    </div>
  )
}
```

---

## Simplified Pages

### Before (Complex)
```jsx
function FreeCalculator() {
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  
  const handleSubmit = async (formData) => {
    // ... 20 lines of logic
  }
  
  const handleReset = () => {
    // ... logic
  }
  
  return (
    <>
      {/* Form logic */}
      {/* Result logic */}
    </>
  )
}
```

### After (Simple)
```jsx
function FreeCalculator() {
  return (
    <>
      <Helmet>...</Helmet>
      
      <div>
        <h1>Header</h1>
        <Calculator isPremium={false} />
      </div>
    </>
  )
}
```

**Benefits**:
- ✅ Much simpler
- ✅ Logic centralized
- ✅ Reusable
- ✅ Consistent behavior

---

## Data Flow

### Free Mode
```
User → FreeCalculatorForm → handleFreeSubmit()
    ↓
Check limit (localStorage)
    ↓
evaluateOffer(data)
    ↓
Increment count
    ↓
FreeResultCard → Display verdict
    ↓
Reset → handleReset()
```

### Premium Mode
```
User → PremiumCalculatorForm → handlePremiumSubmit()
    ↓
No limit check
    ↓
calculateFullPrice(data)
    ↓
PremiumResultCard → Display breakdown
    ↓
Save → handleSave() → Supabase
    ↓
Reset → handleReset()
```

---

## Free Tier Limits

### Why 2 per month?

**Psychology**:
- Enough to try the tool
- Not enough to abuse
- Creates scarcity
- Drives upgrades

**Business**:
- Low enough to encourage premium
- High enough to show value
- Easy to remember (2)
- Monthly reset feels fair

**Technical**:
- LocalStorage = simple
- No server costs
- Easy to bypass (but most won't)
- Can upgrade to server-side later

---

## Conversion Points

### Point 1: After First Calculation
```
Counter shows: "1/2 free evaluations used"
Message: "Want unlimited? Upgrade to Pro"
```

**Psychology**: User just got value, more likely to upgrade

### Point 2: At Limit
```
Shows: Full-screen upgrade message
CTA: Large gold button
```

**Psychology**: Blocked from value, creates urgency

### Point 3: In Result Card
```
Shows: Premium CTA with $???-$??? teasing
Features: 4 premium features listed
```

**Psychology**: Create curiosity about exact numbers

---

## Edge Cases

### Case 1: User Clears LocalStorage
**Result**: Counter resets to 0, can calculate again
**Impact**: Minor (expected behavior)

### Case 2: User Changes System Date
**Result**: Might bypass limit
**Impact**: Acceptable (rare, not worth preventing)

### Case 3: User Uses Incognito
**Result**: Fresh localStorage, new 2 calculations
**Impact**: Acceptable (they can't save anyway)

### Case 4: Premium User Downgrades
**Result**: localStorage checked again, limit enforced
**Impact**: Correct behavior

---

## Future Enhancements

### Short-term
- [ ] Toast notifications instead of alerts
- [ ] Loading skeleton for results
- [ ] Smooth transitions between states
- [ ] Local calculation history (even for free)

### Medium-term
- [ ] Server-side limit enforcement
- [ ] Email for free tier (track better)
- [ ] A/B test limit (2 vs 3 vs 5)
- [ ] Analytics on conversion points

### Long-term
- [ ] AI suggestions during form fill
- [ ] Real-time rate updates
- [ ] Benchmark comparisons
- [ ] Social sharing of results

---

## Testing Commands

### Test LocalStorage
```javascript
// Get current value
JSON.parse(localStorage.getItem('sponsorprice_calculations'))

// Manually set count
localStorage.setItem('sponsorprice_calculations', 
  JSON.stringify({ count: 2, month: 1, year: 2025 })
)

// Clear (reset)
localStorage.removeItem('sponsorprice_calculations')

// Test month reset
localStorage.setItem('sponsorprice_calculations', 
  JSON.stringify({ count: 2, month: 0, year: 2024 })
)
// Reload page → should reset to 0
```

---

## Dependencies

- React (hooks: useState, useEffect)
- react-router-dom (Link)
- lucide-react (icons)
- Local components (forms, result cards)
- lib/calculatePrice (functions)
- lib/supabase (database)

---

## Files

- **Component**: `/src/components/Calculator/Calculator.jsx`
- **Export**: `/src/components/Calculator/index.js`
- **Docs**: `/CALCULATOR_COMPONENT.md` (this file)

---

## Related Components

- **FreeCalculatorForm** - Free input form
- **FreeResultCard** - Free result display
- **PremiumCalculatorForm** - Premium input form
- **PremiumResultCard** - Premium result display

---

## Props Validation

### Required Props
None! All props are optional with sensible defaults.

### Default Values
```javascript
{
  defaultPlatform: '',        // No default platform
  isPremium: false,           // Free mode by default
  user: null                  // No user by default
}
```

---

## State Diagram

```
[Mount]
    ↓
Load localStorage
    ↓
Check month/year
    ↓
Calculate limit status
    ↓
[Idle - Show Form]
    ↓
User submits
    ↓
[Calculating]
    ↓
Process result
    ↓
[Show Result]
    ↓
User resets
    ↓
[Back to Idle]
```

---

## Component Benefits

### For Developers
- ✅ Single import
- ✅ All logic centralized
- ✅ Easy to maintain
- ✅ Consistent behavior
- ✅ Reusable across pages

### For Users
- ✅ Consistent experience
- ✅ Clear limits (free)
- ✅ No limits (premium)
- ✅ Smooth transitions
- ✅ Fast performance

### For Business
- ✅ Enforces free limits
- ✅ Drives conversions
- ✅ Tracks usage
- ✅ Enables premium features

---

## Maintenance

### Changing Free Limit
```javascript
const FREE_MONTHLY_LIMIT = 3  // Change from 2 to 3
```

### Changing Storage Key
```javascript
const STORAGE_KEY = 'wmr_calculations'  // Rename
```

### Disabling Limits (Testing)
```javascript
if (isPremium || process.env.NODE_ENV === 'development') {
  // Skip limit checking
}
```

---

## 🎉 Summary

**Calculator** is the main orchestrator that:
- ✅ Manages free/premium modes
- ✅ Enforces monthly limits (free)
- ✅ Tracks usage (localStorage)
- ✅ Handles form submissions
- ✅ Displays results
- ✅ Saves calculations (premium)
- ✅ Provides seamless UX

**One component to rule them all!**

Import once, use everywhere:
```javascript
import { Calculator } from '@/components/Calculator'
```

---

**Status**: ✅ Complete and production-ready!

This component is the core of the WMR application.
