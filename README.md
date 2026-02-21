# 🎯 WMR - What's My Rate

**Status**: 85% Complete - Production Ready  
**Tech Stack**: React 19 + Vite + Tailwind CSS + Supabase  
**Last Updated**: 2026-02-07

---

## 📖 About

WMR (What's My Rate) helps content creators evaluate sponsorship offers and calculate fair rates based on industry data.

### Key Features
- ✅ Free calculator (2 calculations/month)
- ✅ Premium calculator (unlimited, exact pricing)
- ✅ User authentication (Supabase)
- ✅ User dashboard with history
- ✅ 5 SEO landing pages
- ✅ Professional pricing page
- ⏳ Stripe payments (coming soon)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy .env.example to .env
cp .env.example .env

# Add your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 3. Setup Database
See `DATABASE_SCHEMA.md` for complete SQL schema.

Run this in Supabase SQL Editor:
```sql
-- Creates subscriptions and calculations tables
-- Sets up RLS policies
-- Creates auto-subscription trigger
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: `http://localhost:5173`

---

## 📂 Project Structure

```
src/
├── components/
│   ├── Calculator/         # Calculator components
│   ├── Layout/             # Header & Footer
│   └── SEO/                # SEO page template
├── hooks/
│   └── useAuth.jsx         # Auth context & hook
├── lib/
│   ├── calculatePrice.js   # Pricing logic
│   ├── constants.js        # Data (platforms, niches, etc.)
│   └── supabase.js         # Supabase client
├── pages/
│   ├── Home.jsx            # Landing page
│   ├── Pricing.jsx         # Pricing page
│   ├── Login.jsx           # Login page
│   ├── Signup.jsx          # Signup page
│   ├── Dashboard.jsx       # User dashboard
│   └── seo/                # 5 SEO pages
└── styles/
    └── theme.js            # Design system
```

---

## 🗺️ Routes

### Main Pages
- `/` - Home (landing with calculator)
- `/pricing` - Pricing plans
- `/calculator` - Free calculator
- `/premium-calculator` - Premium calculator
- `/login` - User login
- `/signup` - User registration
- `/dashboard` - User dashboard (protected)

### SEO Pages
- `/youtube-sponsorship-calculator`
- `/instagram-sponsorship-calculator`
- `/tiktok-sponsorship-calculator`
- `/podcast-sponsorship-rates`
- `/how-much-to-charge-sponsorship`

### Legal
- `/privacy` - Privacy policy
- `/terms` - Terms of service

---

## 🔐 Authentication

### Using the Auth Hook
```javascript
import { useAuth } from './hooks/useAuth.jsx'

function MyComponent() {
  const { user, isPremium, signIn, signOut } = useAuth()

  if (!user) {
    return <Link to="/login">Sign In</Link>
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

## 🗄️ Database

### Tables

#### subscriptions
Stores user subscription information.
- `user_id` - Foreign key to auth.users
- `plan` - 'free', 'pro', 'pro_annual'
- `status` - 'active', 'canceled', 'past_due'

#### calculations
Stores calculation history.
- `user_id` - Foreign key to auth.users
- All calculator form fields
- `price_min`, `price_max`, `price_average`
- `verdict` - For free users

See `DATABASE_SCHEMA.md` for complete schema.

---

## 📊 Dashboard

User dashboard shows:
- **Stats Cards**: Total calculations, average rate, this month
- **Quick Actions**: New calculation, email templates, media kit (pro only)
- **Upgrade CTA**: Visible to free users
- **Calculation History**: Last 10 calculations

---

## 🎨 Design System

### Colors
- Primary: Indigo (#6366f1)
- Secondary: Teal (#14b8a6)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Error: Red (#ef4444)

### Components
- Tailwind CSS v3
- Lucide React icons
- Custom theme in `src/styles/theme.js`

---

## 🧪 Testing

### Manual Testing Checklist
- [ ] Signup creates user
- [ ] Email confirmation works
- [ ] Login redirects to dashboard
- [ ] Session persists on refresh
- [ ] Logout works
- [ ] Dashboard shows stats
- [ ] Free users see upgrade CTA
- [ ] Pro users see quick actions

---

## 📚 Documentation

### Setup Guides
- `SUPABASE_SETUP.md` - Supabase configuration
- `README_AUTH.md` - Auth quick start
- `DATABASE_SCHEMA.md` - Database schema

### Technical Docs
- `AUTH_SYSTEM.md` - Auth architecture
- `DASHBOARD_PAGE.md` - Dashboard documentation
- `LOGIN_SIGNUP_PAGES.md` - Auth pages docs

### Other
- `ROUTES_DOCUMENTATION.md` - All routes
- `FOOTER_UPDATE.md` - Footer design
- `PROJECT_STATUS.md` - Current status

---

## 🚀 Deployment

### Environment Variables
```bash
# Production .env
VITE_SUPABASE_URL=your-production-url
VITE_SUPABASE_ANON_KEY=your-production-key
```

### Build
```bash
npm run build
```

Output: `dist/` folder

### Deploy
Recommended platforms:
- Vercel
- Netlify
- Cloudflare Pages

All support Vite out of the box.

---

## 🔧 Configuration

### Supabase Setup
1. Create project at [supabase.com](https://supabase.com)
2. Get URL and anon key from Settings > API
3. Add to `.env`
4. Run SQL from `DATABASE_SCHEMA.md`
5. Configure email templates (optional)

### Stripe Setup (Coming Soon)
1. Create Stripe account
2. Add products (Pro monthly/annual)
3. Configure webhooks
4. Update environment variables

---

## 📈 Roadmap

### Current: 85% Complete ✅
- [x] Core calculator
- [x] 5 SEO pages
- [x] Auth system
- [x] Dashboard
- [x] Database schema

### Next: 15% Remaining
- [ ] Stripe integration (5%)
- [ ] Protected routes (3%)
- [ ] Save calculations to DB (4%)
- [ ] Password reset (2%)
- [ ] Final polish (1%)

---

## 🐛 Troubleshooting

### "Supabase credentials not found"
- Check `.env` file exists in root
- Verify variable names (`VITE_` prefix)
- Restart dev server

### "Invalid login credentials"
- Verify email/password
- Check email confirmation
- Ensure user exists in Supabase

### Dashboard shows no data
- Check RLS policies in Supabase
- Verify calculations table exists
- Insert test data

---

## 🤝 Contributing

This is a private project, but feedback is welcome!

---

## 📄 License

Private - All rights reserved

---

## 📞 Support

### Documentation
- Start with `README.md` (this file)
- Check `SUPABASE_SETUP.md` for setup
- Read `AUTH_SYSTEM.md` for auth details

### Issues
- Auth issues → Check `AUTH_SYSTEM.md`
- Database issues → Check `DATABASE_SCHEMA.md`
- Dashboard issues → Check `DASHBOARD_PAGE.md`

---

## 🎉 Credits

Built with:
- React 19
- Vite 7
- Tailwind CSS 3
- Supabase
- Lucide React
- React Router 7
- React Helmet Async

---

**Status**: Ready for Stripe integration! 🚀

For detailed session notes, see `FINAL_SESSION_SUMMARY.md`.
