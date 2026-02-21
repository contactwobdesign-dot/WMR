# 🔒 Calculator Auth Guard

**Date**: 2026-02-08  
**Component**: `src/components/Calculator/Calculator.jsx`  
**Status**: ✅ Complete

---

## 🎯 Purpose

Protect the Calculator component by requiring users to sign in before they can evaluate sponsorship offers. This encourages user registration and allows tracking of free calculation limits.

---

## 🔧 Implementation

### Imports Added

```javascript
import { useNavigate } from 'react-router-dom'
```

**Added to existing imports**:
- `useNavigate` from `react-router-dom` for programmatic navigation

### Hook Usage

```javascript
const navigate = useNavigate()
const { user: authUser } = useAuth()
const user = userProp || authUser // Use prop or auth user
```

**Purpose**:
- `navigate`: Redirect to login/signup pages
- `useAuth`: Get current user authentication state
- Fallback logic: Use prop user or authenticated user

---

## 🚪 Auth Guard Logic

### Sign-In Required Screen

Displayed when `!user` (no authenticated user):

```jsx
if (!user) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto">
      <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="w-8 h-8 text-primary-600" />
      </div>
      <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
        Sign in to use the calculator
      </h3>
      <p className="text-gray-600 mb-6">
        Create a free account to evaluate up to 2 offers per month.
      </p>
      <div className="space-y-3">
        <button 
          onClick={() => navigate('/signup')}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
        >
          Create Free Account
        </button>
        <button 
          onClick={() => navigate('/login')}
          className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}
```

### Components

1. **Lock Icon**: Visual indicator (primary color)
2. **Heading**: "Sign in to use the calculator"
3. **Description**: Mentions free tier benefit (2 offers/month)
4. **Primary CTA**: "Create Free Account" (prominent)
5. **Secondary CTA**: "Sign In" (outline style)

---

## 🎨 Design Details

### Layout

```
┌─────────────────────────────────────┐
│         [Lock Icon]                 │
│                                     │
│   Sign in to use the calculator    │
│                                     │
│   Create a free account to...      │
│                                     │
│  [Create Free Account] (primary)    │
│  [Sign In] (secondary)              │
└─────────────────────────────────────┘
```

**Structure**:
- Centered card with shadow
- Max-width: `md` (448px)
- White background
- Vertical spacing between elements

### Styling

#### Container
```jsx
className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md mx-auto"
```
- Background: White
- Border radius: Extra large (`xl`)
- Shadow: Large (`lg`)
- Padding: `32px`
- Text: Centered
- Max width: `md` (448px)
- Margin: Auto-centered

#### Icon Container
```jsx
className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4"
```
- Size: `64px × 64px`
- Background: Light primary (`primary-100`)
- Shape: Circular (`rounded-full`)
- Icon: `32px` primary color

#### Primary Button (Signup)
```jsx
className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
```
- Width: Full
- Background: Primary (`#4f46e5`)
- Hover: Darker primary
- Text: White, semibold
- Padding: `12px vertical`, `24px horizontal`
- Transition: Smooth color change

#### Secondary Button (Login)
```jsx
className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 px-6 rounded-lg transition-colors"
```
- Width: Full
- Border: Gray (`1px`)
- Hover: Light gray background
- Text: Dark gray
- Same padding as primary

---

## 🔄 User Flow

### Non-Authenticated User Journey

1. **User visits calculator page**
   - Sees lock screen
   - Reads benefits ("2 offers/month")

2. **User clicks "Create Free Account"**
   - Navigates to `/signup`
   - Completes registration
   - Email confirmation

3. **User returns to calculator**
   - Now authenticated
   - Sees calculator form
   - Can evaluate offers (2/month free)

### Alternative Flow (Existing User)

1. **User visits calculator page**
   - Sees lock screen

2. **User clicks "Sign In"**
   - Navigates to `/login`
   - Logs in

3. **User returns to calculator**
   - Now authenticated
   - Sees calculator form

---

## 📊 Guard Hierarchy

The Calculator component now has **3 protection layers**:

### Layer 1: Authentication Guard (NEW)
```javascript
if (!user) {
  return <SignInRequiredScreen />
}
```
**Blocks**: All non-authenticated users

### Layer 2: Free Limit Guard (Existing)
```javascript
if (limitReached && !isPremium) {
  return <LimitReachedScreen />
}
```
**Blocks**: Free users who used 2 calculations this month

### Layer 3: Calculator Form (Existing)
```javascript
return <CalculatorForm />
```
**Shows**: Authenticated users with available calculations

---

## 🎯 Business Logic

### Free Tier Strategy

**Benefits**:
- ✅ Encourages user registration
- ✅ Captures email addresses
- ✅ Tracks usage per user
- ✅ Clear upgrade path (2 → unlimited)

**User Value**:
- 2 free evaluations per month
- No credit card required
- Immediate access after signup

### Conversion Funnel

```
Landing Page
     ↓
Calculator (Auth Guard) ← "2 free offers/month"
     ↓
Signup/Login
     ↓
Calculator (2 uses)
     ↓
Limit Reached
     ↓
Upgrade to Pro (unlimited)
```

---

## 🧪 Testing

### Test Case 1: Non-Authenticated User

**Steps**:
1. Log out
2. Navigate to home page with calculator
3. Observe calculator section

**Expected**:
- Lock screen displayed
- "Sign in to use the calculator" message
- Two buttons: "Create Free Account" and "Sign In"

**Actual**: ✅ Pass

### Test Case 2: Click "Create Free Account"

**Steps**:
1. On lock screen
2. Click "Create Free Account" button

**Expected**:
- Redirects to `/signup`

**Actual**: ✅ Pass

### Test Case 3: Click "Sign In"

**Steps**:
1. On lock screen
2. Click "Sign In" button

**Expected**:
- Redirects to `/login`

**Actual**: ✅ Pass

### Test Case 4: Authenticated User

**Steps**:
1. Log in
2. Navigate to calculator

**Expected**:
- Calculator form displayed (not lock screen)
- Can submit calculations

**Actual**: ✅ Pass

### Test Case 5: Props Override

**Steps**:
1. Pass `user` prop to Calculator component
2. Check if prop user is used

**Expected**:
- Prop user takes precedence over auth user
- Calculator shows for prop user

**Actual**: ✅ Pass (existing logic)

---

## 🎨 Visual Comparison

### Before (No Auth Required)
```
┌─────────────────────────────┐
│   Calculator Form           │
│   [Platform] [Niche] ...    │
│   [Calculate Button]        │
└─────────────────────────────┘
```
**Problem**: Anyone can use, no user tracking

### After (Auth Required)
```
Non-authenticated:
┌─────────────────────────────┐
│   [Lock Icon]               │
│   Sign in to use...         │
│   [Create Account]          │
│   [Sign In]                 │
└─────────────────────────────┘

Authenticated:
┌─────────────────────────────┐
│   Calculator Form           │
│   [Platform] [Niche] ...    │
│   [Calculate Button]        │
└─────────────────────────────┘
```
**Benefit**: Tracks users, encourages registration

---

## 💡 UX Considerations

### Positive Aspects

✅ **Clear Call-to-Action**: Two prominent buttons  
✅ **Value Proposition**: "2 offers per month" communicated upfront  
✅ **Low Friction**: Free account, no credit card  
✅ **Visual Clarity**: Lock icon indicates protected content  
✅ **Consistent Branding**: Uses primary colors

### Potential Improvements

**Short-term**:
- [ ] Add "Why sign up?" tooltip or expandable section
- [ ] Show sample calculation result as preview
- [ ] Add social proof ("Join 10,000+ creators")

**Medium-term**:
- [ ] A/B test button copy ("Create Free Account" vs "Get Started")
- [ ] Add animation for lock icon
- [ ] Offer "Continue with Google" option

**Long-term**:
- [ ] Allow 1 calculation without signup (then gate)
- [ ] Show personalized message based on referrer
- [ ] Implement "Save calculation" feature requiring signup

---

## 🔒 Security Considerations

### Current Implementation

✅ **Client-Side Guard**: Prevents UI access  
✅ **Uses Auth Context**: Single source of truth  
✅ **Prop Override**: Supports SSR/testing scenarios

### Backend Protection

**Important**: The auth guard is UI-only. Backend API routes that save calculations should also verify authentication:

```javascript
// Example: API route protection
if (!req.user) {
  return res.status(401).json({ error: 'Unauthorized' })
}
```

**Current Status**: Supabase RLS policies enforce backend protection ✅

---

## 📚 Related Components

### Dependencies

- `useAuth` hook → `src/hooks/useAuth.jsx`
- `useNavigate` → `react-router-dom`
- `Lock` icon → `lucide-react`

### Affected Pages

- `/` (Home page with embedded calculator)
- SEO pages with embedded calculator:
  - `/youtube-sponsorship-calculator`
  - `/instagram-sponsorship-calculator`
  - `/tiktok-sponsorship-calculator`
  - `/podcast-sponsorship-rates`

### Related Guards

- `Login.jsx` → Auto-redirects if already authenticated
- `Signup.jsx` → Auto-redirects if already authenticated
- `Dashboard.jsx` → Requires authentication

---

## 🚀 Future Enhancements

### Short-term
- [ ] Add "Remember me" checkbox on login
- [ ] Track where user came from (analytics)
- [ ] A/B test button text and colors

### Medium-term
- [ ] Add "Demo mode" button (view-only calculation)
- [ ] Show testimonials on lock screen
- [ ] Add countdown timer for monthly reset

### Long-term
- [ ] Implement referral program ("Invite friends, get extra calculations")
- [ ] Add email capture before showing lock screen
- [ ] Personalized messages based on user journey

---

## 📝 Code Metrics

**Lines Added**: ~28  
**Components Modified**: 1  
**New Dependencies**: 0 (useNavigate already available)  
**Breaking Changes**: None (existing functionality preserved)

**Performance Impact**: Negligible (simple conditional render)

---

## ✅ Checklist

### Implementation
- [x] Import `useNavigate`
- [x] Add `navigate` constant
- [x] Create auth guard condition
- [x] Design lock screen UI
- [x] Add CTA buttons with navigation
- [x] Test navigation flow

### Testing
- [x] Non-authenticated user sees lock screen
- [x] "Create Free Account" redirects to `/signup`
- [x] "Sign In" redirects to `/login`
- [x] Authenticated user sees calculator
- [x] No linter errors

### Documentation
- [x] Document implementation
- [x] Create user flow diagrams
- [x] Add testing scenarios
- [x] Document future enhancements

---

## 🎯 Success Metrics

### Quantitative

- **Signup Conversion Rate**: % of users who see lock screen and complete signup
- **Activation Rate**: % of signups who complete first calculation
- **Return Rate**: % of users who return after first calculation

### Qualitative

- **User Feedback**: Collect feedback on signup friction
- **Time to Value**: How long from lock screen to first calculation?
- **Drop-off Points**: Where do users abandon the flow?

---

## 📊 Expected Impact

### Before Implementation
- Users: Anonymous
- Tracking: None
- Conversions: 0%

### After Implementation
- Users: Authenticated (email capture)
- Tracking: Per-user calculations
- Expected signup rate: 15-30%
- Expected return rate: 40-60%

---

**Status**: ✅ **AUTH GUARD IMPLEMENTED**

The Calculator now requires authentication, encouraging user registration while offering clear value! 🔒

---

**End of Documentation** ✅
