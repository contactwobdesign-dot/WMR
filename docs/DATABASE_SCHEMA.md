# 🗄️ Database Schema

**Database**: PostgreSQL (Supabase)  
**Last Updated**: 2026-02-07

---

## 📊 Tables

### 1. `subscriptions`
Stores user subscription information.

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for fast lookups
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own subscription
CREATE POLICY "Users can view own subscription"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Service role can manage subscriptions
CREATE POLICY "Service role can manage subscriptions"
ON subscriptions FOR ALL
USING (auth.role() = 'service_role');
```

**Columns**:
- `id`: UUID primary key
- `user_id`: Foreign key to auth.users
- `plan`: 'free', 'pro', 'pro_annual'
- `status`: 'active', 'canceled', 'past_due'
- `stripe_subscription_id`: Stripe subscription ID
- `stripe_customer_id`: Stripe customer ID
- `current_period_start`: Billing period start
- `current_period_end`: Billing period end
- `created_at`: Timestamp
- `updated_at`: Timestamp

---

### 2. `calculations`
Stores calculation history for users.

```sql
CREATE TABLE calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  niche TEXT NOT NULL,
  subscribers INTEGER NOT NULL,
  average_views INTEGER NOT NULL,
  engagement_rate DECIMAL(5,2) NOT NULL,
  content_type TEXT NOT NULL,
  company_size TEXT NOT NULL,
  audience_location TEXT NOT NULL,
  offered_price INTEGER,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  price_average INTEGER NOT NULL,
  verdict TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_calculations_user_id ON calculations(user_id);
CREATE INDEX idx_calculations_created_at ON calculations(created_at DESC);
CREATE INDEX idx_calculations_user_created ON calculations(user_id, created_at DESC);

-- Enable RLS
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own calculations
CREATE POLICY "Users can view own calculations"
ON calculations FOR SELECT
USING (auth.uid() = user_id);

-- Policy: Users can insert their own calculations
CREATE POLICY "Users can insert own calculations"
ON calculations FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own calculations
CREATE POLICY "Users can update own calculations"
ON calculations FOR UPDATE
USING (auth.uid() = user_id);

-- Policy: Users can delete their own calculations
CREATE POLICY "Users can delete own calculations"
ON calculations FOR DELETE
USING (auth.uid() = user_id);
```

**Columns**:
- `id`: UUID primary key
- `user_id`: Foreign key to auth.users
- `platform`: 'youtube', 'instagram', 'tiktok', 'podcast', 'newsletter'
- `niche`: Finance, Tech, Beauty, etc.
- `subscribers`: Number of subscribers/followers
- `average_views`: Average views per content
- `engagement_rate`: Engagement rate percentage (0-100)
- `content_type`: Type of content created
- `company_size`: Size of sponsor company
- `audience_location`: Geographic location of audience
- `offered_price`: Price offered by sponsor (nullable for premium)
- `price_min`: Calculated minimum price
- `price_max`: Calculated maximum price
- `price_average`: Calculated average price
- `verdict`: 'WAY_TOO_LOW', 'TOO_LOW', 'ACCEPTABLE', 'GOOD' (nullable for premium)
- `created_at`: Timestamp

---

## 🔐 Row Level Security (RLS)

### Subscriptions
- **SELECT**: Users can view their own subscription
- **ALL**: Service role can manage all subscriptions (for Stripe webhooks)

### Calculations
- **SELECT**: Users can view their own calculations
- **INSERT**: Users can insert their own calculations
- **UPDATE**: Users can update their own calculations
- **DELETE**: Users can delete their own calculations

---

## 🔄 Triggers

### Auto-create free subscription on signup

```sql
-- Function to auto-create free subscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

**Purpose**: Automatically creates a free subscription when a user signs up.

---

## 📈 Indexes

### subscriptions
- `idx_subscriptions_user_id` on `user_id` - Fast user subscription lookup

### calculations
- `idx_calculations_user_id` on `user_id` - Fast user calculations lookup
- `idx_calculations_created_at` on `created_at DESC` - Recent calculations first
- `idx_calculations_user_created` on `(user_id, created_at DESC)` - Composite index for user's recent calculations

---

## 🔍 Queries

### Get user subscription
```sql
SELECT * FROM subscriptions
WHERE user_id = 'user-uuid-here'
LIMIT 1;
```

### Get user's recent calculations
```sql
SELECT * FROM calculations
WHERE user_id = 'user-uuid-here'
ORDER BY created_at DESC
LIMIT 10;
```

### Get calculation stats for user
```sql
SELECT 
  COUNT(*) as total,
  AVG(price_average) as avg_rate,
  COUNT(CASE WHEN created_at >= date_trunc('month', CURRENT_DATE) THEN 1 END) as this_month
FROM calculations
WHERE user_id = 'user-uuid-here';
```

### Insert new calculation
```sql
INSERT INTO calculations (
  user_id,
  platform,
  niche,
  subscribers,
  average_views,
  engagement_rate,
  content_type,
  company_size,
  audience_location,
  offered_price,
  price_min,
  price_max,
  price_average,
  verdict
) VALUES (
  'user-uuid',
  'youtube',
  'tech',
  50000,
  10000,
  4.5,
  'integration',
  'medium',
  'us',
  500,
  800,
  1200,
  1000,
  'TOO_LOW'
);
```

---

## 🚀 Setup Instructions

### Complete Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- 1. Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription"
ON subscriptions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage subscriptions"
ON subscriptions FOR ALL
USING (auth.role() = 'service_role');

-- 2. Create calculations table
CREATE TABLE calculations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform TEXT NOT NULL,
  niche TEXT NOT NULL,
  subscribers INTEGER NOT NULL,
  average_views INTEGER NOT NULL,
  engagement_rate DECIMAL(5,2) NOT NULL,
  content_type TEXT NOT NULL,
  company_size TEXT NOT NULL,
  audience_location TEXT NOT NULL,
  offered_price INTEGER,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  price_average INTEGER NOT NULL,
  verdict TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_calculations_user_id ON calculations(user_id);
CREATE INDEX idx_calculations_created_at ON calculations(created_at DESC);
CREATE INDEX idx_calculations_user_created ON calculations(user_id, created_at DESC);

ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own calculations"
ON calculations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calculations"
ON calculations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calculations"
ON calculations FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calculations"
ON calculations FOR DELETE
USING (auth.uid() = user_id);

-- 3. Create trigger for auto-creating free subscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## 🧪 Test Data

### Create test calculation
```sql
-- Insert a test calculation for your user
INSERT INTO calculations (
  user_id,
  platform,
  niche,
  subscribers,
  average_views,
  engagement_rate,
  content_type,
  company_size,
  audience_location,
  offered_price,
  price_min,
  price_max,
  price_average,
  verdict
) VALUES (
  'your-user-id-here', -- Replace with your actual user ID
  'youtube',
  'tech',
  50000,
  10000,
  4.5,
  'integration',
  'medium',
  'us',
  500,
  800,
  1200,
  1000,
  'TOO_LOW'
);
```

---

## 📊 Data Types

### Platform Values
- `'youtube'`
- `'instagram'`
- `'tiktok'`
- `'podcast'`
- `'newsletter'`

### Plan Values
- `'free'` - Free plan (2 calculations/month)
- `'pro'` - Pro plan (monthly billing)
- `'pro_annual'` - Pro plan (annual billing)

### Status Values
- `'active'` - Subscription is active
- `'canceled'` - Subscription canceled
- `'past_due'` - Payment failed

### Verdict Values (Free users only)
- `'WAY_TOO_LOW'` - < 50% of market value
- `'TOO_LOW'` - 50-75% of market value
- `'ACCEPTABLE'` - 75-95% of market value
- `'GOOD'` - ≥ 95% of market value

---

## 🔒 Security Considerations

### Authentication
- All queries use `auth.uid()` to ensure users only access their own data
- RLS policies enforced at database level
- No way to bypass policies from client

### Data Validation
- Foreign keys ensure referential integrity
- NOT NULL constraints on required fields
- UNIQUE constraint on `user_id` in subscriptions

### Performance
- Indexes on frequently queried columns
- Composite indexes for common query patterns
- DESC ordering for recent-first queries

---

## 🚧 Migrations (Future)

### Add fields to calculations
```sql
ALTER TABLE calculations
ADD COLUMN notes TEXT;
```

### Add new subscription field
```sql
ALTER TABLE subscriptions
ADD COLUMN trial_end TIMESTAMP WITH TIME ZONE;
```

---

## 📈 Analytics Queries (Future)

### Total calculations per platform
```sql
SELECT 
  platform,
  COUNT(*) as total
FROM calculations
GROUP BY platform
ORDER BY total DESC;
```

### Average rates by niche
```sql
SELECT 
  niche,
  AVG(price_average) as avg_rate,
  COUNT(*) as count
FROM calculations
GROUP BY niche
ORDER BY avg_rate DESC;
```

### Monthly growth
```sql
SELECT 
  date_trunc('month', created_at) as month,
  COUNT(*) as calculations
FROM calculations
GROUP BY month
ORDER BY month DESC;
```

---

**Status**: ✅ **DATABASE SCHEMA COMPLETE**

Both tables are ready for production use!

**Next**: Run the SQL in Supabase SQL Editor to create the tables.
