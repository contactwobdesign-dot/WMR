# 🔐 Authentication System

**Date**: 2026-02-07  
**Status**: ✅ Complete (ready for implementation)  
**Tech**: Supabase Auth + React Context

---

## 📚 Overview

Authentication system using Supabase with React Context for state management.

### Features
- ✅ User signup/signin/signout
- ✅ Session persistence
- ✅ Subscription management
- ✅ Premium status checking
- ✅ Auth state synchronization
- ✅ Free plan fallback

---

## 🏗️ Architecture

```
┌─────────────────┐
│   main.jsx      │
│  <AuthProvider> │ ← Wraps entire app
└────────┬────────┘
         │
    ┌────▼────┐
    │ App.jsx │
    └────┬────┘
         │
    ┌────▼──────────────────┐
    │ Any Component         │
    │ const { user,         │
    │   isPremium,          │
    │   signIn, ... }       │
    │   = useAuth()         │ ← Use hook anywhere
    └───────────────────────┘
```

---

## 📂 Files Created

### 1. `/src/lib/supabase.js`
**Purpose**: Supabase client configuration

```javascript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
```

**Features**:
- Environment variable validation
- Warning if credentials missing
- Null-safe export (won't crash if not configured)

---

### 2. `/src/hooks/useAuth.js`
**Purpose**: Auth context provider and hook

**Exports**:
- `AuthProvider` - Context provider component
- `useAuth` - Hook to consume auth context

**State**:
- `user` - Current user object (or null)
- `subscription` - User's subscription data
- `loading` - Loading state for auth operations

**Functions**:
- `signUp(email, password)` - Create new account
- `signIn(email, password)` - Sign in existing user
- `signOut()` - Sign out current user
- `isPremium()` - Check if user has active premium subscription

---

### 3. Updated `/src/main.jsx`
**Change**: Wrapped app with `<AuthProvider>`

```jsx
<AuthProvider>
  <App />
</AuthProvider>
```

---

### 4. `.env.example`
**Purpose**: Document required environment variables

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## 🔑 Environment Setup

### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get your project URL and anon key

### Step 2: Configure `.env`
Create `.env` file (already exists, update it):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: Never commit `.env` to git (already in `.gitignore`)

### Step 3: Restart Dev Server
```bash
npm run dev
```

---

## 📊 Database Schema

### Required Tables

#### `subscriptions` table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  plan TEXT NOT NULL, -- 'free', 'pro', 'pro_annual'
  status TEXT NOT NULL, -- 'active', 'canceled', 'past_due'
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
```

#### Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own subscription
CREATE POLICY "Users can view own subscription"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id);

-- Policy: System can insert/update subscriptions
CREATE POLICY "Service role can manage subscriptions"
ON subscriptions FOR ALL
USING (auth.role() = 'service_role');
```

---

## 💻 Usage Examples

### Example 1: Using in Component
```jsx
import { useAuth } from '../hooks/useAuth'

function MyComponent() {
  const { user, loading, isPremium, signOut } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>Please sign in</div>
  }

  return (
    <div>
      <p>Welcome, {user.email}</p>
      {isPremium() && <p>⭐ Premium User</p>}
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Example 2: Protected Route
```jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Usage in App.jsx
<Route 
  path="/premium-calculator" 
  element={
    <ProtectedRoute>
      <PremiumCalculator />
    </ProtectedRoute>
  } 
/>
```

### Example 3: Premium-Only Feature
```jsx
import { useAuth } from '../hooks/useAuth'

function CalculatorResult() {
  const { isPremium } = useAuth()

  return (
    <div>
      {isPremium() ? (
        <div>
          <p>Exact Price: $1,200 - $1,800</p>
          <DetailedBreakdown />
        </div>
      ) : (
        <div>
          <p>Verdict: TOO LOW</p>
          <p>Upgrade to see exact price →</p>
        </div>
      )}
    </div>
  )
}
```

### Example 4: Sign In Form
```jsx
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      await signIn(email, password)
      // Redirect handled by auth state change
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-600">{error}</p>}
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      
      <button type="submit">Sign In</button>
    </form>
  )
}
```

---

## 🔐 Auth Flow

### Sign Up Flow
```
User → signUp(email, password)
  ↓
Supabase creates user
  ↓
Confirmation email sent (if enabled)
  ↓
User confirms email
  ↓
Session created
  ↓
AuthProvider updates user state
  ↓
Subscription defaults to 'free'
```

### Sign In Flow
```
User → signIn(email, password)
  ↓
Supabase validates credentials
  ↓
Session created
  ↓
AuthProvider updates user state
  ↓
Fetch subscription from DB
  ↓
App re-renders with user data
```

### Sign Out Flow
```
User → signOut()
  ↓
Supabase clears session
  ↓
AuthProvider clears user state
  ↓
Redirect to home
```

---

## 📡 Auth State Management

### Initial Load
1. `AuthProvider` mounts
2. Calls `supabase.auth.getSession()`
3. If session exists:
   - Set `user` state
   - Fetch `subscription` from DB
4. Set `loading = false`

### Auth State Changes
1. User signs in/out/up
2. `onAuthStateChange` listener fires
3. `AuthProvider` updates state
4. All components re-render with new auth state

### Subscription Sync
- Fetched on initial load
- Fetched on auth state change
- Can be refreshed manually (future)

---

## 🛡️ Security Features

### Environment Variables
- ✅ Stored in `.env` (not committed)
- ✅ Validated before use
- ✅ Warning if missing

### Client-Side Safety
- ✅ Null checks on supabase client
- ✅ Error boundaries (future)
- ✅ Graceful degradation

### Supabase Security
- ✅ RLS policies (Row Level Security)
- ✅ JWT-based auth
- ✅ Anon key (safe for client)
- ❌ Service key (server-only, never exposed)

---

## 🧪 Testing Auth

### Manual Test Checklist
- [ ] App loads without errors (even without credentials)
- [ ] Sign up creates new user
- [ ] Confirmation email sent (if enabled)
- [ ] Sign in works with valid credentials
- [ ] Sign in fails with invalid credentials
- [ ] User state persists on refresh
- [ ] Sign out clears user state
- [ ] `isPremium()` returns correct value
- [ ] Protected routes work
- [ ] Subscription data loads

### Test Users
Create test users in Supabase dashboard:
- Free user: `free@test.com`
- Pro user: `pro@test.com`

Manually insert subscription for pro user:
```sql
INSERT INTO subscriptions (user_id, plan, status)
VALUES ('user_uuid_here', 'pro', 'active');
```

---

## 🔄 Subscription Plans

### Plan Types
```javascript
// Free
{ plan: 'free', status: 'active' }

// Pro Monthly
{ plan: 'pro', status: 'active' }

// Pro Annual
{ plan: 'pro_annual', status: 'active' }

// Canceled
{ plan: 'pro', status: 'canceled' }
```

### `isPremium()` Logic
```javascript
isPremium() {
  return (
    subscription?.plan !== 'free' &&
    subscription?.status === 'active'
  )
}
```

Returns `true` if:
- Plan is `pro` or `pro_annual`
- Status is `active`

Returns `false` if:
- Plan is `free`
- Status is `canceled` or `past_due`
- No subscription found

---

## 🔗 Integration Points

### Header Component
```jsx
// Show login/logout based on auth state
const { user, signOut } = useAuth()

{user ? (
  <button onClick={signOut}>Sign Out</button>
) : (
  <Link to="/login">Sign In</Link>
)}
```

### Calculator Component
```jsx
// Check premium status
const { isPremium } = useAuth()

if (isPremium()) {
  // Show exact price
} else {
  // Show verdict only + upgrade CTA
}
```

### Pricing Page
```jsx
// Pre-populate email if logged in
const { user } = useAuth()

<input 
  type="email" 
  defaultValue={user?.email} 
  placeholder="Enter your email"
/>
```

---

## 🐛 Error Handling

### Supabase Not Configured
```javascript
// supabase.js exports null
// All auth functions throw error
// App still loads (graceful degradation)
```

### Auth Errors
```javascript
try {
  await signIn(email, password)
} catch (error) {
  // error.message = "Invalid login credentials"
  // Display to user
}
```

### Network Errors
```javascript
// Supabase handles retries
// Show loading state while pending
// Show error message if fails
```

---

## 🚀 Next Steps

### Phase 1: Implement Login Page ✅ (Next)
- [x] Create supabase client
- [x] Create useAuth hook
- [x] Wrap app with AuthProvider
- [ ] Build Login form UI
- [ ] Build Signup form UI
- [ ] Add password reset flow

### Phase 2: Protected Routes
- [ ] Create `RequireAuth` wrapper component
- [ ] Protect `/premium-calculator`
- [ ] Protect `/dashboard`
- [ ] Redirect to login if not authenticated

### Phase 3: Dashboard
- [ ] Show user email
- [ ] Show subscription status
- [ ] Show calculation history
- [ ] Manage subscription

### Phase 4: Stripe Integration
- [ ] Connect Stripe
- [ ] Create checkout session
- [ ] Handle webhook for subscription
- [ ] Update subscription in DB

---

## 📈 Monitoring (Future)

### Events to Track
```javascript
// Sign up
trackEvent('user_signed_up', { method: 'email' })

// Sign in
trackEvent('user_signed_in', { method: 'email' })

// Sign out
trackEvent('user_signed_out')

// Premium check
trackEvent('premium_status_checked', { 
  isPremium: isPremium() 
})
```

---

## 🔧 Troubleshooting

### Issue: "Supabase credentials not found"
**Solution**: 
1. Check `.env` file exists
2. Check variables are named correctly
3. Restart dev server

### Issue: "Invalid login credentials"
**Causes**:
- Wrong email/password
- Email not confirmed
- User doesn't exist

**Solution**:
- Check credentials
- Confirm email
- Sign up first

### Issue: Session not persisting
**Causes**:
- LocalStorage cleared
- Incognito mode
- Different domain

**Solution**:
- Check browser storage settings
- Use regular browsing mode
- Ensure same domain

### Issue: Subscription not loading
**Causes**:
- Table doesn't exist
- RLS policy blocking access
- No subscription for user

**Solution**:
- Create subscriptions table
- Configure RLS policies
- Insert default subscription

---

## 💡 Best Practices

### Do's ✅
- Always check `loading` state before rendering
- Handle errors with try/catch
- Show loading indicators
- Validate forms client-side
- Use `isPremium()` for access control
- Keep sensitive keys in `.env`

### Don'ts ❌
- Don't use service key on client
- Don't store passwords in state
- Don't skip error handling
- Don't hardcode credentials
- Don't trust client-side checks alone (need server validation)
- Don't commit `.env` file

---

## 📚 Additional Resources

### Supabase Docs
- [Auth Guide](https://supabase.com/docs/guides/auth)
- [JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

### React Context
- [React Context Docs](https://react.dev/reference/react/useContext)
- [Context Best Practices](https://kentcdodds.com/blog/how-to-use-react-context-effectively)

---

## 🎯 Current Status

### ✅ Complete
- Supabase client configuration
- Auth context and provider
- useAuth hook
- Environment setup
- Error handling
- Subscription management
- Premium status checking

### 🔶 Next (Implement Login/Signup UI)
- Build Login page form
- Build Signup page form
- Add error messages
- Add loading states
- Add password reset

### ⏳ Future
- Dashboard UI
- Stripe integration
- Email templates
- Password reset flow
- Profile settings

---

**Status**: ✅ **AUTH SYSTEM READY**

All auth infrastructure is complete. Ready to implement Login/Signup UI!

**Files Created**: 4
- `src/lib/supabase.js`
- `src/hooks/useAuth.js`
- `.env.example`
- `AUTH_SYSTEM.md` (this file)

**Files Modified**: 1
- `src/main.jsx`

**Next**: Build Login and Signup form UI! 🎨
