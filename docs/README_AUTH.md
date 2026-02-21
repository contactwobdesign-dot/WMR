# 🔐 WMR - Authentication System

**Status**: ✅ Ready for implementation  
**Framework**: Supabase + React Context  
**Last Updated**: 2026-02-07

---

## 🚀 Quick Start

### 1. Configure Supabase

1. Create project at [supabase.com](https://supabase.com)
2. Get your credentials (Settings > API)
3. Add to `.env`:

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

4. Run database migration (see `SUPABASE_SETUP.md`)

### 2. Use in Your Components

```jsx
import { useAuth } from './hooks/useAuth.jsx'

function MyComponent() {
  const { user, isPremium, signIn, signOut } = useAuth()

  if (!user) {
    return <button onClick={() => signIn(email, password)}>Sign In</button>
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

---

## 📚 Documentation

- **`AUTH_SYSTEM.md`** - Complete technical documentation
- **`SUPABASE_SETUP.md`** - Step-by-step setup guide
- **`SESSION_AUTH_SETUP.md`** - Implementation session recap

---

## 🎯 What's Included

### Core Files
- ✅ `src/lib/supabase.js` - Supabase client
- ✅ `src/hooks/useAuth.jsx` - Auth context & hook
- ✅ `.env.example` - Environment template

### Features
- ✅ Sign up / Sign in / Sign out
- ✅ Session persistence
- ✅ Subscription management
- ✅ Premium status checking
- ✅ Real-time auth sync
- ✅ Graceful error handling

---

## 🔑 API Reference

### `useAuth()` Hook

```typescript
const {
  user: User | null,
  subscription: Subscription | null,
  loading: boolean,
  signUp: (email: string, password: string) => Promise<AuthResponse>,
  signIn: (email: string, password: string) => Promise<AuthResponse>,
  signOut: () => Promise<void>,
  isPremium: () => boolean
} = useAuth()
```

### Subscription Object

```typescript
{
  plan: 'free' | 'pro' | 'pro_annual',
  status: 'active' | 'canceled' | 'past_due',
  user_id: string,
  stripe_subscription_id?: string,
  stripe_customer_id?: string,
  current_period_start?: Date,
  current_period_end?: Date
}
```

---

## 🛡️ Security

- ✅ Environment variables (not committed)
- ✅ Anon key only on client (safe)
- ✅ RLS policies on database
- ✅ JWT-based sessions
- ✅ HTTPS only

---

## 🧪 Testing

### Without Credentials
```bash
# App should load with warning
npm run dev
# Console: "Supabase credentials not found..."
```

### With Credentials
```bash
# 1. Configure .env
# 2. Create subscriptions table
# 3. Test sign up/in/out
npm run dev
```

---

## 🚧 Next Steps

### Immediate
1. Create Supabase project
2. Configure `.env`
3. Run database migrations
4. Test auth flow

### Short-term
1. Build Login page UI
2. Build Signup page UI
3. Add form validation
4. Implement password reset

### Medium-term
1. Create protected routes
2. Build dashboard
3. Integrate Stripe
4. Add email templates

---

## ❓ Troubleshooting

### "Supabase credentials not found"
- Check `.env` file exists
- Check variable names (`VITE_` prefix)
- Restart dev server

### "Invalid login credentials"
- Verify email/password
- Check email confirmation
- Ensure user exists

### Session not persisting
- Check browser localStorage
- Ensure same domain
- Check Supabase dashboard

---

## 📞 Support

- 📖 Read `AUTH_SYSTEM.md` for details
- 🚀 Read `SUPABASE_SETUP.md` for setup
- 📝 Check inline code comments

---

**Ready to build Login/Signup UI!** 🎨
