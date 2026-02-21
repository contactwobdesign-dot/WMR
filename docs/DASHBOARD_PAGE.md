# 📊 Dashboard Page Documentation

**File**: `src/pages/Dashboard.jsx`  
**Route**: `/dashboard`  
**Access**: Protected (requires authentication)  
**Last Updated**: 2026-02-07

---

## 🎯 Purpose

User dashboard for viewing calculation history, statistics, and quick actions. Different experience for free vs. pro users.

---

## 🔐 Protection

### Route Protection
```javascript
useEffect(() => {
  if (!authLoading && !user) {
    navigate('/login')
  }
}, [user, authLoading, navigate])
```

**Behavior**:
- If not authenticated → Redirect to `/login`
- While checking auth → Show loading spinner
- If authenticated → Show dashboard

---

## 📊 Data Structure

### State
```javascript
const [calculations, setCalculations] = useState([])
const [stats, setStats] = useState({ 
  total: 0, 
  thisMonth: 0, 
  avgRate: 0 
})
const [loading, setLoading] = useState(true)
```

### Calculation Object
```javascript
{
  id: UUID,
  user_id: UUID,
  platform: 'youtube' | 'instagram' | 'tiktok' | 'podcast' | 'newsletter',
  niche: string,
  subscribers: number,
  average_views: number,
  engagement_rate: number,
  content_type: string,
  company_size: string,
  audience_location: string,
  offered_price: number | null,
  price_min: number,
  price_max: number,
  price_average: number,
  verdict: string | null,
  created_at: timestamp
}
```

---

## 🔄 Data Fetching

### Fetch Calculations
```javascript
const { data, error } = await supabase
  .from('calculations')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
```

**Filters**:
- Only user's own calculations (`user_id` match)
- Ordered by most recent first

### Calculate Stats
```javascript
const calculateStats = (calcs) => {
  const total = calcs.length

  // This month count
  const now = new Date()
  const thisMonthCount = calcs.filter(calc => {
    const calcDate = new Date(calc.created_at)
    return calcDate.getMonth() === now.getMonth() && 
           calcDate.getFullYear() === now.getFullYear()
  }).length

  // Average rate
  const totalRate = calcs.reduce((sum, calc) => {
    return sum + (calc.price_average || 0)
  }, 0)
  const avgRate = total > 0 ? Math.round(totalRate / total) : 0

  setStats({ total, thisMonth: thisMonthCount, avgRate })
}
```

**Stats Calculated**:
- `total`: Total number of calculations
- `thisMonth`: Count of calculations this month
- `avgRate`: Average of all `price_average` values

---

## 🎨 UI Sections

### 1. Header
```jsx
<div className="bg-white rounded-xl shadow-sm p-6">
  <h1>Welcome back</h1>
  <p>{user.email}</p>
  {isPremium() && <Badge>PRO</Badge>}
  <Button onClick={signOut}>Sign Out</Button>
</div>
```

**Features**:
- User email displayed
- PRO badge (gradient gold) if premium
- Sign out button

---

### 2. Stats Cards (3 columns)

#### Total Calculations
- **Icon**: Calculator (blue)
- **Value**: `{stats.total}`
- **Label**: "Total Calculations"

#### Average Rate
- **Icon**: TrendingUp (green)
- **Value**: `${stats.avgRate || 0}`
- **Label**: "Average Rate"

#### This Month
- **Icon**: History (blue)
- **Value**: `{stats.thisMonth}`
- **Label**: "This Month"

**Layout**: Grid 3 columns on desktop, 1 column on mobile

---

### 3. Quick Actions (Premium Only)

Shown only if `isPremium()` returns `true`.

```jsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
  <Link to="/premium-calculator">
    <Plus /> New Calculation
  </Link>
  <Button onClick={handleEmailTemplates}>
    <Mail /> Email Templates
  </Button>
  <Button onClick={handleDownloadMediaKit}>
    <Download /> Download Media Kit
  </Button>
</div>
```

**Actions**:
1. **New Calculation**: Link to premium calculator
2. **Email Templates**: Coming soon (alert)
3. **Download Media Kit**: Coming soon (alert)

---

### 4. Upgrade CTA (Free Users Only)

Shown only if `!isPremium()`.

```jsx
<div className="bg-gradient-to-r from-primary-600 to-primary-700">
  <Crown /> Upgrade to Pro
  <p>Unlock unlimited calculations, exact pricing, and more</p>
  <Link to="/pricing">View Plans</Link>
</div>
```

**Features**:
- Gradient background (primary colors)
- Crown icon
- Clear value proposition
- Link to pricing page

---

### 5. Calculation History

#### Empty State
```jsx
{calculations.length === 0 && (
  <div className="text-center">
    <Calculator /> (large gray icon)
    <p>No calculations yet. Start by evaluating an offer!</p>
    <Link to="/calculator">Start Calculating</Link>
  </div>
)}
```

#### With Data
```jsx
{calculations.slice(0, 10).map(calc => (
  <div className="border rounded-lg p-4">
    <div>
      {calc.platform} • {calc.niche}
      <p>{formatDate(calc.created_at)}</p>
    </div>
    <div>
      ${calc.price_min} - ${calc.price_max}
      <p>Avg: ${calc.price_average}</p>
    </div>
  </div>
))}
```

**Features**:
- Shows last 10 calculations
- Platform and niche displayed
- Date formatted ("Jan 15, 2026")
- Price range and average shown
- Hover effect (border color change)

---

### 6. Footer Section
```jsx
<p>
  Need help? 
  <Link to="/#faq">Check our FAQ</Link>
</p>
```

Simple help link to FAQ section on home page.

---

## 🎨 Design System

### Colors
```css
Background: bg-gray-50
Cards: bg-white shadow-sm
Primary buttons: bg-primary-600 hover:bg-primary-700
PRO badge: bg-gradient-to-r from-amber-400 to-orange-500
Upgrade CTA: bg-gradient-to-r from-primary-600 to-primary-700
```

### Icons
- **Calculator** (blue-600): Stats, empty state
- **TrendingUp** (green-600): Average rate stat
- **History** (blue-600): This month stat
- **Crown** (white): PRO badge, upgrade CTA
- **Plus**: New calculation
- **Mail**: Email templates
- **Download**: Media kit
- **LogOut**: Sign out button

### Layout
```css
Container: max-w-6xl mx-auto
Padding: py-8 px-4
Spacing: space-y-8 (between sections)
Grid: 3 columns on md+, 1 on mobile
```

---

## 🔄 User Flows

### Free User Flow
```
Login → Dashboard
    ↓
See stats (limited history)
    ↓
See upgrade CTA
    ↓
Click "View Plans" → Pricing page
```

### Pro User Flow
```
Login → Dashboard
    ↓
See PRO badge
    ↓
See stats (full history)
    ↓
See quick actions
    ↓
Click "New Calculation" → Premium Calculator
```

---

## 💻 Code Examples

### Fetch User's Calculations
```javascript
const { data, error } = await supabase
  .from('calculations')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false })
```

### Calculate This Month Count
```javascript
const now = new Date()
const thisMonthCount = calculations.filter(calc => {
  const calcDate = new Date(calc.created_at)
  return calcDate.getMonth() === now.getMonth() && 
         calcDate.getFullYear() === now.getFullYear()
}).length
```

### Format Date
```javascript
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}
// Output: "Jan 15, 2026"
```

---

## 🔐 Security

### RLS Policies
```sql
-- Users can only see their own calculations
CREATE POLICY "Users can view own calculations"
ON calculations FOR SELECT
USING (auth.uid() = user_id);
```

### Client-Side Protection
- Route redirects if not authenticated
- Supabase RLS ensures data isolation
- User ID from auth token (can't be spoofed)

---

## 🧪 Testing

### Manual Test Checklist
- [ ] Redirects to login if not authenticated
- [ ] Shows loading spinner while fetching
- [ ] Displays correct user email
- [ ] Shows PRO badge for premium users
- [ ] Hides PRO badge for free users
- [ ] Stats calculate correctly
- [ ] Quick actions only show for premium
- [ ] Upgrade CTA only shows for free
- [ ] Empty state shows if no calculations
- [ ] Calculations list shows if data exists
- [ ] Date formatting works
- [ ] Sign out redirects to home
- [ ] Links work correctly
- [ ] Mobile responsive

---

## 📱 Responsive Behavior

### Mobile (< 640px)
```css
Header: Stacks vertically
Stats: 1 column
Quick actions: 1 column
Calculation cards: Stacks info
```

### Tablet (640px - 1024px)
```css
Header: Horizontal with wrap
Stats: 3 columns
Quick actions: 3 columns
Calculation cards: Side-by-side
```

### Desktop (1024px+)
```css
Everything: Full layout
Max width: 6xl (1152px)
Grid: 3 columns
```

---

## 🚀 Future Enhancements

### Short-term
- [ ] Delete calculation
- [ ] Edit calculation
- [ ] Export calculations (CSV)
- [ ] Filter by platform
- [ ] Filter by date range

### Medium-term
- [ ] Charts and graphs
- [ ] Year-over-year comparison
- [ ] Most profitable platforms
- [ ] Rate trends over time
- [ ] Share calculation (link)

### Long-term
- [ ] Email templates (real implementation)
- [ ] Media kit generator (PDF)
- [ ] Bulk import calculations
- [ ] API access
- [ ] Team accounts

---

## 🎯 Success Metrics

### User Engagement
- Time on dashboard
- Number of calculations viewed
- Click-through rate on "New Calculation"
- Upgrade CTA click rate (free users)

### Performance
- Load time < 2 seconds
- Smooth scrolling
- No layout shift

### Conversion
- Free to Pro conversion (from dashboard CTA)
- Quick actions usage (pro users)

---

## 🐛 Error Handling

### No Supabase Connection
```javascript
if (!supabase) {
  setLoading(false)
  return
}
```
**Result**: Shows empty state gracefully

### Fetch Error
```javascript
if (error) {
  console.error('Error fetching calculations:', error)
  setCalculations([])
}
```
**Result**: Shows empty state with error logged

### No Calculations
```javascript
{calculations.length === 0 && (
  <EmptyState />
)}
```
**Result**: Friendly message with CTA

---

## 📊 Stats Calculation Logic

### Total
```javascript
const total = calculations.length
```
Simple count of all calculations.

### This Month
```javascript
const thisMonthCount = calculations.filter(calc => {
  const calcDate = new Date(calc.created_at)
  return calcDate.getMonth() === now.getMonth() && 
         calcDate.getFullYear() === now.getFullYear()
}).length
```
Count where month AND year match current.

### Average Rate
```javascript
const totalRate = calculations.reduce((sum, calc) => {
  return sum + (calc.price_average || 0)
}, 0)
const avgRate = total > 0 ? Math.round(totalRate / total) : 0
```
Average of all `price_average` values, rounded.

---

## 🎨 Visual Design

### Header
```
┌─────────────────────────────────────┐
│  Welcome back             [PRO]  □  │
│  user@example.com               │
└─────────────────────────────────────┘
```

### Stats Cards
```
┌────────┐ ┌────────┐ ┌────────┐
│ 🧮  15 │ │ 📈 $890│ │ 🕐   5 │
│ Total  │ │ Average│ │ Month  │
└────────┘ └────────┘ └────────┘
```

### Quick Actions (Pro)
```
┌──────────────────────────────────┐
│ [+ New]  [✉ Email]  [⬇ Kit]    │
└──────────────────────────────────┘
```

### Upgrade CTA (Free)
```
┌──────────────────────────────────┐
│  👑 Upgrade to Pro               │
│  Unlock unlimited...  [View Plans]│
└──────────────────────────────────┘
```

### Calculation List
```
┌─────────────────────────────────┐
│ YouTube • Tech    $800 - $1,200 │
│ Jan 15, 2026      Avg: $1,000   │
├─────────────────────────────────┤
│ Instagram • Beauty $400 - $600  │
│ Jan 10, 2026       Avg: $500    │
└─────────────────────────────────┘
```

---

## 🔗 Navigation

### Internal Links
- `/premium-calculator` - New calculation (pro)
- `/calculator` - New calculation (free)
- `/pricing` - View plans
- `/#faq` - FAQ section
- `/` - Home (after sign out)

### External Actions
- Sign out → Navigate to home
- Email templates → Alert (coming soon)
- Download kit → Alert (coming soon)

---

## 💡 Design Decisions

### Why Show Different Experience?
- **Free users**: Need upgrade incentive
- **Pro users**: Need quick access to features
- **Both**: See their data and stats

### Why Limit to 10 Calculations?
- **Performance**: Faster rendering
- **UX**: Don't overwhelm user
- **Future**: Add pagination if needed

### Why Calculate Stats Client-Side?
- **Simplicity**: No additional API calls
- **Speed**: Instant calculation
- **Flexibility**: Easy to add new stats

---

## 📚 Related Files

- `src/hooks/useAuth.jsx` - Auth state
- `src/lib/supabase.js` - Database client
- `DATABASE_SCHEMA.md` - Table structure
- `AUTH_SYSTEM.md` - Auth documentation

---

**Status**: ✅ **DASHBOARD PAGE COMPLETE**

Fully functional dashboard with stats, history, and different UX for free vs. pro users!

**Next**: Save calculations to database when users submit the calculator form.
