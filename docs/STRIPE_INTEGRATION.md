# 💳 Stripe Integration Guide

**Status**: ✅ Frontend Complete  
**Last Updated**: 2026-02-07  
**Next**: Setup Stripe account + Backend webhooks

---

## 🎯 What Was Implemented

### Frontend (Complete ✅)
- [x] Stripe.js client (`src/lib/stripe.js`)
- [x] Checkout redirect function
- [x] Updated Pricing page with checkout
- [x] Loading states & error handling
- [x] User authentication check
- [x] Email pre-fill for checkout

### Backend (To Do 🔲)
- [ ] Stripe account setup
- [ ] Product & price creation
- [ ] Webhook endpoint
- [ ] Subscription sync with database
- [ ] Success/Cancel pages

---

## 📂 Files Created/Modified

### Created (1 file)
- `src/lib/stripe.js` - Stripe client & checkout function

### Modified (2 files)
- `src/pages/Pricing.jsx` - Added checkout integration
- `.env.example` - Added Stripe environment variables

---

## 💻 Code Overview

### 1. Stripe Client (`src/lib/stripe.js`)

```javascript
import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
let stripePromise = null

export const getStripe = () => {
  if (!stripePromise && stripePublishableKey) {
    stripePromise = loadStripe(stripePublishableKey)
  }
  return stripePromise
}

export async function redirectToCheckout(priceId, userEmail) {
  const stripe = await getStripe()
  
  if (!stripe) {
    console.error('Stripe not loaded')
    return { error: { message: 'Payment system not available' } }
  }

  const { error } = await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    successUrl: `${window.location.origin}/dashboard?success=true`,
    cancelUrl: `${window.location.origin}/pricing?canceled=true`,
    customerEmail: userEmail,
  })

  return { error }
}
```

**Features**:
- Lazy loading of Stripe.js (performance optimization)
- Singleton pattern for Stripe instance
- Configurable redirect URLs
- Pre-fills customer email
- Subscription mode (recurring payments)

---

### 2. Pricing Page Updates

#### Added Imports
```javascript
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { redirectToCheckout } from '../lib/stripe'
```

#### Added State
```javascript
const { user } = useAuth()
const [checkoutLoading, setCheckoutLoading] = useState(false)
```

#### handleUpgrade Function
```javascript
const handleUpgrade = async () => {
  // Check if user is logged in
  if (!user) {
    navigate('/signup?redirect=pricing')
    return
  }

  setCheckoutLoading(true)
  
  // Get price ID based on billing cycle
  const priceId = billingCycle === 'monthly'
    ? import.meta.env.VITE_STRIPE_PRICE_MONTHLY
    : import.meta.env.VITE_STRIPE_PRICE_ANNUAL

  // Redirect to Stripe Checkout
  const { error } = await redirectToCheckout(priceId, user.email)
  
  if (error) {
    console.error('Checkout error:', error)
    alert(error.message)
  }
  
  setCheckoutLoading(false)
}
```

**Logic**:
1. Check if user is authenticated
2. If not → Redirect to signup with return URL
3. If yes → Show loading state
4. Get correct price ID (monthly vs annual)
5. Redirect to Stripe Checkout
6. Handle errors if any

#### Updated Button
```jsx
<button
  onClick={handleUpgrade}
  disabled={checkoutLoading}
  className="... disabled:opacity-50 disabled:cursor-not-allowed"
>
  {checkoutLoading ? (
    <>
      <Spinner />
      Processing...
    </>
  ) : (
    <>
      Upgrade to Pro
      <ArrowRight />
    </>
  )}
</button>
```

**States**:
- Default: "Upgrade to Pro" with arrow
- Loading: Spinner + "Processing..."
- Disabled: Opacity 50%, not clickable

---

## 🔑 Environment Variables

### Required Variables
Add these to your `.env` file:

```bash
# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... # or pk_live_...
VITE_STRIPE_PRICE_MONTHLY=price_xxx     # Monthly subscription price ID
VITE_STRIPE_PRICE_ANNUAL=price_yyy      # Annual subscription price ID
```

### Where to Find Them

#### Publishable Key
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** > **API keys**
3. Copy the **Publishable key** (starts with `pk_test_` or `pk_live_`)

#### Price IDs
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Products**
3. Create or select your product
4. Copy the **Price ID** for each plan (starts with `price_`)

---

## 🚀 Stripe Setup Guide

### Step 1: Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Sign up for an account
3. Complete verification

### Step 2: Create Products

#### Product 1: Pro Monthly ($9/month)
```
Name: Pro Monthly
Description: Unlimited calculations, exact pricing, negotiation tools
Price: $9.00 USD
Billing period: Monthly
```

**Result**: Copy the Price ID (`price_xxx`)

#### Product 2: Pro Annual ($79/year)
```
Name: Pro Annual
Description: Unlimited calculations, exact pricing, negotiation tools
Price: $79.00 USD ($6.58/month)
Billing period: Yearly
```

**Result**: Copy the Price ID (`price_yyy`)

### Step 3: Configure Environment
```bash
# Add to .env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_STRIPE_PRICE_MONTHLY=price_monthly_id_here
VITE_STRIPE_PRICE_ANNUAL=price_annual_id_here
```

### Step 4: Restart Dev Server
```bash
npm run dev
```

---

## 🔄 User Flow

### Complete Purchase Flow

```
1. User clicks "Upgrade to Pro"
    ↓
2. Check if authenticated
    ↓
3. If not → Redirect to /signup?redirect=pricing
    ↓
4. If yes → Show loading state
    ↓
5. Get price ID (monthly or annual)
    ↓
6. Call redirectToCheckout()
    ↓
7. Stripe loads checkout page (hosted by Stripe)
    ↓
8. User enters payment details
    ↓
9. Payment processed by Stripe
    ↓
10. Success → Redirect to /dashboard?success=true
    ↓
11. Cancel → Redirect to /pricing?canceled=true
```

### After Redirect to Dashboard
```
Dashboard page should:
1. Check URL for ?success=true
2. Show success message
3. Fetch updated subscription (via webhook)
4. Update UI to show PRO features
```

---

## 🎨 UI States

### Default State
```
Button: "Upgrade to Pro →"
Color: Primary blue
Cursor: Pointer
Disabled: No
```

### Loading State
```
Button: "⟳ Processing..."
Color: Primary blue (50% opacity)
Cursor: Not-allowed
Disabled: Yes
Spinner: Rotating animation
```

### Error State
```
Alert: Error message
Button: Returns to default state
User: Can retry
```

---

## 🔐 Security

### Client-Side
- ✅ Publishable key only (safe for client)
- ✅ No sensitive data in code
- ✅ User authentication required
- ✅ Email validation (from auth)

### Stripe-Side
- ✅ Hosted checkout (PCI compliant)
- ✅ HTTPS only
- ✅ 3D Secure support
- ✅ Fraud detection

### Server-Side (To Implement)
- [ ] Webhook signature verification
- [ ] Database updates on payment success
- [ ] Subscription status sync
- [ ] Idempotency for duplicate events

---

## 🧪 Testing

### Test Mode
Use Stripe test mode for development:

**Test Cards**:
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
3D Secure: 4000 0025 0000 3155
```

**Expiry**: Any future date  
**CVC**: Any 3 digits  
**ZIP**: Any 5 digits

### Test Flow
1. Click "Upgrade to Pro"
2. Use test card: `4242 4242 4242 4242`
3. Complete checkout
4. Should redirect to dashboard
5. Check Stripe Dashboard for payment

### Production Mode
Switch to live mode when ready:
1. Get live publishable key (`pk_live_...`)
2. Get live price IDs
3. Update `.env`
4. Restart server
5. Test with real card (small amount)

---

## 🔧 Backend Implementation (Next Steps)

### 1. Create Webhook Endpoint

```javascript
// Example: /api/webhooks/stripe
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(req) {
  const sig = req.headers.get('stripe-signature')
  const body = await req.text()
  
  let event
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return new Response('Webhook signature verification failed', {
      status: 400
    })
  }
  
  // Handle events
  switch (event.type) {
    case 'checkout.session.completed':
      // Update subscription in database
      break
    case 'customer.subscription.updated':
      // Update subscription status
      break
    case 'customer.subscription.deleted':
      // Handle cancellation
      break
  }
  
  return new Response('OK', { status: 200 })
}
```

### 2. Update Subscription in Database

```javascript
// When checkout.session.completed
const session = event.data.object

await supabase
  .from('subscriptions')
  .update({
    plan: session.metadata.plan, // 'pro' or 'pro_annual'
    status: 'active',
    stripe_subscription_id: session.subscription,
    stripe_customer_id: session.customer,
    current_period_start: new Date(session.created * 1000),
    current_period_end: new Date(session.expires_at * 1000)
  })
  .eq('user_id', session.metadata.user_id)
```

### 3. Add Success/Cancel Pages

**Dashboard Success** (`/dashboard?success=true`):
```jsx
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('success') === 'true') {
    toast.success('Welcome to Pro! 🎉')
    // Remove query param
    window.history.replaceState({}, '', '/dashboard')
  }
}, [])
```

**Pricing Cancel** (`/pricing?canceled=true`):
```jsx
useEffect(() => {
  const params = new URLSearchParams(window.location.search)
  if (params.get('canceled') === 'true') {
    toast.info('Checkout canceled. You can try again anytime.')
    window.history.replaceState({}, '', '/pricing')
  }
}, [])
```

---

## 📊 Webhook Events to Handle

### Critical Events
1. **checkout.session.completed**
   - Triggers when payment succeeds
   - Create/update subscription in database
   - Send welcome email

2. **customer.subscription.updated**
   - Triggers on plan change or renewal
   - Update subscription status
   - Update billing dates

3. **customer.subscription.deleted**
   - Triggers on cancellation
   - Set status to 'canceled'
   - Maintain access until period end

### Optional Events
4. **invoice.payment_succeeded** - Successful renewal
5. **invoice.payment_failed** - Failed payment (retry)
6. **customer.subscription.trial_will_end** - Trial ending soon

---

## 🚧 Implementation Checklist

### Frontend ✅
- [x] Install @stripe/stripe-js
- [x] Create stripe.js client
- [x] Add redirectToCheckout function
- [x] Update Pricing page
- [x] Add loading states
- [x] Add error handling
- [x] Update .env.example

### Stripe Dashboard (To Do)
- [ ] Create Stripe account
- [ ] Create products (Monthly, Annual)
- [ ] Get publishable key
- [ ] Get price IDs
- [ ] Configure webhook endpoint
- [ ] Get webhook secret

### Backend (To Do)
- [ ] Create webhook endpoint
- [ ] Verify webhook signatures
- [ ] Handle checkout.session.completed
- [ ] Handle subscription.updated
- [ ] Handle subscription.deleted
- [ ] Update database on events

### Testing (To Do)
- [ ] Test checkout flow (test mode)
- [ ] Test success redirect
- [ ] Test cancel redirect
- [ ] Test webhook events
- [ ] Test subscription sync
- [ ] Test with real card (production)

---

## 💡 Best Practices

### Error Handling
```javascript
const { error } = await redirectToCheckout(priceId, user.email)

if (error) {
  // User-friendly message
  if (error.message.includes('network')) {
    alert('Connection issue. Please check your internet.')
  } else {
    alert(error.message)
  }
  
  // Log for debugging
  console.error('Stripe error:', error)
}
```

### Loading States
```javascript
// Always show loading feedback
setCheckoutLoading(true)

try {
  await redirectToCheckout(...)
} finally {
  // Reset even if error
  setCheckoutLoading(false)
}
```

### User Authentication
```javascript
// Always check before payment
if (!user) {
  // Redirect with return URL
  navigate('/signup?redirect=pricing')
  return
}
```

---

## 📈 Analytics Events (Recommended)

### Track These Events
```javascript
// Upgrade button clicked
trackEvent('upgrade_clicked', {
  plan: billingCycle,
  price_id: priceId
})

// Checkout started
trackEvent('checkout_started', {
  plan: billingCycle,
  user_email: user.email
})

// Checkout completed (in webhook)
trackEvent('checkout_completed', {
  plan: subscription.plan,
  amount: subscription.amount
})

// Checkout canceled
trackEvent('checkout_canceled', {
  plan: billingCycle
})
```

---

## 🎯 Success Metrics

### Conversion Funnel
```
100 visitors to /pricing
    ↓
30 click "Upgrade to Pro" (30% CTR)
    ↓
25 complete checkout (83% completion)
    ↓
25 active subscriptions
```

### Key Metrics
- **Pricing page views**: Track with analytics
- **Upgrade button clicks**: Track button clicks
- **Checkout starts**: Track Stripe redirects
- **Checkout completions**: Track webhook events
- **Conversion rate**: Completions / Button clicks

---

## 🔮 Future Enhancements

### Short-term
- [ ] Add promo codes support
- [ ] Show loading during Stripe redirect
- [ ] Add "Processing..." overlay
- [ ] Email receipts

### Medium-term
- [ ] Trial period (7 days free)
- [ ] Upgrade/downgrade flows
- [ ] Pause subscription
- [ ] Cancel with feedback

### Long-term
- [ ] Multiple payment methods
- [ ] Invoicing for teams
- [ ] Usage-based billing
- [ ] Lifetime deals

---

## 📚 Resources

### Stripe Docs
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Webhooks Guide](https://stripe.com/docs/webhooks)
- [Testing](https://stripe.com/docs/testing)
- [Security](https://stripe.com/docs/security)

### stripe-js Docs
- [@stripe/stripe-js](https://github.com/stripe/stripe-js)
- [redirectToCheckout](https://stripe.com/docs/js/checkout/redirect_to_checkout)

---

## 🐛 Troubleshooting

### "Stripe not loaded"
**Cause**: Missing publishable key

**Solution**:
1. Check `.env` has `VITE_STRIPE_PUBLISHABLE_KEY`
2. Restart dev server
3. Check browser console for errors

### "Invalid price ID"
**Cause**: Wrong price ID or not created in Stripe

**Solution**:
1. Go to Stripe Dashboard > Products
2. Copy correct price ID
3. Update `.env`
4. Restart server

### "User not authenticated"
**Cause**: User clicked upgrade without logging in

**Solution**:
- Already handled! Redirects to signup with return URL

### Checkout page not loading
**Cause**: Network issue or Stripe.js blocked

**Solution**:
1. Check internet connection
2. Check if ad blocker is blocking Stripe
3. Try incognito mode
4. Check browser console

---

## ✅ What's Working Now

### Frontend ✅
- Stripe client configured
- Checkout redirect function
- Pricing page integration
- Loading states
- Error handling
- User auth check

### What's Missing 🔲
- Stripe account setup (10 min)
- Backend webhook endpoint (2-3 hours)
- Success/Cancel page handling (30 min)
- Database subscription sync (1 hour)

**Estimated Time to Complete**: 4-5 hours

---

**Status**: ✅ **FRONTEND COMPLETE**

Stripe integration is ready on the frontend! Next step: Setup Stripe account and create webhook endpoint.

**Next**: See `STRIPE_SETUP_BACKEND.md` (to be created) for backend implementation.
