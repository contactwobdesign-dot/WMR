# 🔧 Stripe Backend Implementation Guide

**Purpose**: Handle Stripe webhooks and sync subscriptions  
**Time**: ~3-4 hours  
**Difficulty**: Intermediate

---

## 🎯 Overview

This guide covers creating a backend endpoint to handle Stripe webhooks and keep your database in sync with subscriptions.

---

## 🏗️ Architecture

```
Stripe Event
    ↓
Webhook Endpoint (POST /api/webhooks/stripe)
    ↓
Verify Signature
    ↓
Handle Event Type
    ↓
Update Supabase Database
    ↓
Return 200 OK
```

---

## 📂 Setup Options

### Option 1: Supabase Edge Functions (Recommended)
**Pros**: Serverless, same platform as database, free tier  
**Cons**: Deno (not Node.js)

### Option 2: Vercel Serverless Functions
**Pros**: Easy deploy, Node.js, free tier  
**Cons**: Separate from Supabase

### Option 3: Express.js Server
**Pros**: Full control, any hosting  
**Cons**: Need to manage server

**This guide covers Option 1 (Supabase) and Option 2 (Vercel)**

---

## 🚀 Option 1: Supabase Edge Function

### Step 1: Install Supabase CLI
```bash
npm install -g supabase
```

### Step 2: Initialize Functions
```bash
supabase functions new stripe-webhook
```

### Step 3: Create Function
**File**: `supabase/functions/stripe-webhook/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import Stripe from 'https://esm.sh/stripe@13.8.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const cryptoProvider = Stripe.createSubtleCryptoProvider()

serve(async (req) => {
  const signature = req.headers.get('Stripe-Signature')
  const body = await req.text()
  
  if (!signature) {
    return new Response('No signature', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!,
      undefined,
      cryptoProvider
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response('Signature verification failed', { status: 400 })
  }

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
      break
    
    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
      break
    
    case 'customer.subscription.deleted':
      await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
      break
    
    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
})

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.user_id
  if (!userId) {
    console.error('No user_id in session metadata')
    return
  }

  // Get subscription details
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )

  // Update in Supabase
  const { error } = await supabase
    .from('subscriptions')
    .update({
      plan: session.metadata?.plan || 'pro',
      status: 'active',
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer as string,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating subscription:', error)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000),
      current_period_end: new Date(subscription.current_period_end * 1000),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error updating subscription:', error)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error canceling subscription:', error)
  }
}
```

### Step 4: Deploy Function
```bash
supabase functions deploy stripe-webhook
```

### Step 5: Set Environment Variables
```bash
supabase secrets set STRIPE_SECRET_KEY=sk_test_...
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
supabase secrets set SUPABASE_SERVICE_KEY=eyJhbGc...
```

---

## 🚀 Option 2: Vercel Serverless Function

### Step 1: Create API Route
**File**: `api/webhooks/stripe.js`

```javascript
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

export const config = {
  api: {
    bodyParser: false, // Important for webhook signature verification
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature']
  const body = await getRawBody(req)

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle events
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object)
        break
      
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }
  } catch (err) {
    console.error('Error handling webhook:', err)
    return res.status(500).json({ error: 'Webhook handler failed' })
  }

  res.json({ received: true })
}

async function handleCheckoutCompleted(session) {
  const userId = session.metadata?.user_id
  if (!userId) {
    console.error('No user_id in session metadata')
    return
  }

  const subscription = await stripe.subscriptions.retrieve(session.subscription)

  const { error } = await supabase
    .from('subscriptions')
    .update({
      plan: session.metadata?.plan || 'pro',
      status: 'active',
      stripe_subscription_id: subscription.id,
      stripe_customer_id: subscription.customer,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('user_id', userId)

  if (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}

async function handleSubscriptionUpdated(subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error updating subscription:', error)
    throw error
  }
}

async function handleSubscriptionDeleted(subscription) {
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'canceled',
    })
    .eq('stripe_subscription_id', subscription.id)

  if (error) {
    console.error('Error canceling subscription:', error)
    throw error
  }
}

// Helper to get raw body (needed for Stripe signature verification)
async function getRawBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}
```

### Step 2: Configure Environment Variables
Add to Vercel:
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_KEY=eyJhbGc...
```

### Step 3: Deploy
```bash
vercel deploy
```

---

## 🔧 Stripe Dashboard Setup

### Step 1: Configure Webhook
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL:
   - Supabase: `https://xxx.supabase.co/functions/v1/stripe-webhook`
   - Vercel: `https://your-app.vercel.app/api/webhooks/stripe`

### Step 2: Select Events
Select these events:
- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

### Step 3: Get Webhook Secret
1. Click on your webhook
2. Copy the "Signing secret" (starts with `whsec_`)
3. Add to environment variables

---

## 🧪 Testing Webhooks

### Using Stripe CLI (Recommended)
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger customer.subscription.deleted
```

### Using Stripe Dashboard
1. Go to Webhooks
2. Click your webhook
3. Click "Send test webhook"
4. Select event type
5. Send

---

## 📊 Event Handling Logic

### checkout.session.completed
**Triggers**: When user completes payment

**Action**:
1. Extract `user_id` from metadata
2. Get subscription details from Stripe
3. Update database:
   - Set plan to 'pro' or 'pro_annual'
   - Set status to 'active'
   - Save Stripe IDs
   - Save billing period dates

### customer.subscription.updated
**Triggers**: On renewal or plan change

**Action**:
1. Find subscription by `stripe_subscription_id`
2. Update database:
   - Update status (active, past_due, etc.)
   - Update billing period dates

### customer.subscription.deleted
**Triggers**: When subscription is canceled

**Action**:
1. Find subscription by `stripe_subscription_id`
2. Update database:
   - Set status to 'canceled'
   - Keep access until period end

---

## 🔐 Security

### Webhook Signature Verification
**Always verify** webhook signatures:

```javascript
try {
  event = stripe.webhooks.constructEvent(
    body,
    signature,
    webhookSecret
  )
} catch (err) {
  // Reject invalid signatures
  return res.status(400).send('Invalid signature')
}
```

**Why**: Prevents malicious requests from fake sources

### Use Service Key
For Supabase, use **service_role** key (not anon key):

```javascript
const supabase = createClient(
  supabaseUrl,
  supabaseServiceKey  // Has admin access
)
```

**Why**: Webhooks need to bypass RLS policies

---

## 🐛 Debugging

### Check Webhook Logs
Stripe Dashboard > Webhooks > [Your webhook] > View logs

### Check Function Logs
- **Supabase**: `supabase functions logs stripe-webhook`
- **Vercel**: Vercel Dashboard > Logs

### Common Issues

#### "Webhook signature verification failed"
**Cause**: Wrong webhook secret or body parsing

**Solution**:
1. Check webhook secret is correct
2. Disable body parsing (see config)
3. Use raw body for verification

#### "No user_id in metadata"
**Cause**: Metadata not passed to Stripe Checkout

**Solution**: Update checkout call to include metadata:
```javascript
await stripe.redirectToCheckout({
  lineItems: [...],
  mode: 'subscription',
  metadata: {
    user_id: user.id,
    plan: 'pro'
  }
})
```

#### "Subscription not found"
**Cause**: Subscription not yet created or wrong ID

**Solution**:
1. Check `stripe_subscription_id` is saved correctly
2. Verify subscription exists in Stripe Dashboard
3. Check database column name

---

## ✅ Testing Checklist

### End-to-End Test
- [ ] User clicks "Upgrade to Pro"
- [ ] Stripe Checkout loads
- [ ] User enters test card
- [ ] Payment succeeds
- [ ] Webhook receives checkout.session.completed
- [ ] Database updates subscription to 'active'
- [ ] User redirected to dashboard
- [ ] Dashboard shows PRO badge
- [ ] Quick actions visible

### Edge Cases
- [ ] Webhook retries on failure
- [ ] Duplicate webhooks (idempotency)
- [ ] Failed payments
- [ ] Subscription cancellation
- [ ] Plan changes (upgrade/downgrade)

---

## 📈 Monitoring

### Track These Metrics
- Webhook success rate
- Average processing time
- Failed webhook attempts
- Subscription activations
- Cancellations

### Alerting
Set up alerts for:
- Webhook failures > 5%
- Processing time > 5 seconds
- Subscription sync failures

---

## 🔮 Future Enhancements

### Short-term
- [ ] Email on successful payment
- [ ] Email on failed payment
- [ ] Retry logic for failed updates

### Medium-term
- [ ] Invoice.payment_succeeded handling
- [ ] Trial period support
- [ ] Promo codes support

### Long-term
- [ ] Usage-based billing
- [ ] Metered billing
- [ ] Multi-seat subscriptions

---

## 📚 Resources

### Stripe Webhooks
- [Webhooks Guide](https://stripe.com/docs/webhooks)
- [Event Types](https://stripe.com/docs/api/events/types)
- [Best Practices](https://stripe.com/docs/webhooks/best-practices)

### Testing
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Test Mode](https://stripe.com/docs/testing)

---

## 🎯 Implementation Checklist

### Setup
- [ ] Choose hosting option (Supabase/Vercel/Other)
- [ ] Create webhook endpoint
- [ ] Configure environment variables
- [ ] Deploy endpoint

### Stripe Dashboard
- [ ] Configure webhook URL
- [ ] Select events
- [ ] Get webhook secret
- [ ] Test with Stripe CLI

### Testing
- [ ] Test checkout.session.completed
- [ ] Test subscription.updated
- [ ] Test subscription.deleted
- [ ] Test with real payment (small amount)

### Production
- [ ] Switch to live mode
- [ ] Update webhook URL to production
- [ ] Update environment variables
- [ ] Monitor for 24 hours

---

**Estimated Time**: 3-4 hours

**Status**: Ready to implement!

See `STRIPE_INTEGRATION.md` for frontend details.
