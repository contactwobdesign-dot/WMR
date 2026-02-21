# 🎨 UI Components - Usage Examples

**Quick Reference Guide for Using the UI Component Library**

---

## 🚀 Quick Import

```jsx
import { Button, Input, Select, Card, Badge, Spinner } from '@/components/UI'
```

---

## 📋 Example 1: Login Form

```jsx
import { Button, Input, Card } from '@/components/UI'
import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Submit logic...
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card padding="lg" className="max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            placeholder="you@example.com"
            required
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <a href="#" className="text-sm text-primary-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="submit" 
              variant="primary" 
              loading={loading}
              className="flex-1"
            >
              Sign In
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <a href="/signup" className="text-primary-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </Card>
    </div>
  )
}
```

---

## 📊 Example 2: Dashboard Stats

```jsx
import { Card, Badge, Button, Spinner } from '@/components/UI'
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react'

function DashboardStats({ loading, data, isPro }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {isPro && <Badge variant="pro">PRO</Badge>}
        </div>
        <Button variant="primary">
          <TrendingUp size={20} />
          New Report
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Revenue Card */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-2">
            <DollarSign size={24} className="text-green-600" />
            <Badge variant="success">+12.5%</Badge>
          </div>
          <h3 className="text-sm text-gray-600 font-medium">Total Revenue</h3>
          <p className="text-3xl font-bold mt-1">${data.revenue.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">vs last month</p>
        </Card>

        {/* Users Card */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-2">
            <Users size={24} className="text-blue-600" />
            <Badge variant="info">Stable</Badge>
          </div>
          <h3 className="text-sm text-gray-600 font-medium">Active Users</h3>
          <p className="text-3xl font-bold mt-1">{data.users.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Currently online</p>
        </Card>

        {/* Tasks Card */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-2">
            <Activity size={24} className="text-yellow-600" />
            <Badge variant="warning">{data.pendingTasks} pending</Badge>
          </div>
          <h3 className="text-sm text-gray-600 font-medium">Tasks</h3>
          <p className="text-3xl font-bold mt-1">{data.completedTasks}</p>
          <p className="text-xs text-gray-500 mt-2">Completed this week</p>
        </Card>

        {/* Performance Card */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp size={24} className="text-purple-600" />
            <Badge variant="success">Excellent</Badge>
          </div>
          <h3 className="text-sm text-gray-600 font-medium">Performance</h3>
          <p className="text-3xl font-bold mt-1">{data.performance}%</p>
          <p className="text-xs text-gray-500 mt-2">Above target</p>
        </Card>
      </div>
    </div>
  )
}
```

---

## 📝 Example 3: Multi-step Form

```jsx
import { Button, Input, Select, Card } from '@/components/UI'
import { useState } from 'react'

function SignupForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1
    name: '',
    email: '',
    password: '',
    // Step 2
    platform: '',
    niche: '',
    subscribers: '',
    // Step 3
    country: '',
    language: '',
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: '' })
  }

  const nextStep = () => {
    // Validate current step
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const prevStep = () => setStep(step - 1)

  const handleSubmit = async () => {
    setLoading(true)
    // Submit logic...
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <Card padding="lg" className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Step {step} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-600 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Account Info */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>

            <Input
              label="Full Name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              error={errors.name}
              placeholder="John Doe"
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
              helper="We'll never share your email"
              required
            />

            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => updateField('password', e.target.value)}
              error={errors.password}
              placeholder="At least 6 characters"
              helper="Must include letters and numbers"
              required
            />
          </div>
        )}

        {/* Step 2: Creator Info */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Tell Us About Your Content</h2>

            <Select
              label="Platform"
              value={formData.platform}
              onChange={(e) => updateField('platform', e.target.value)}
              error={errors.platform}
              options={[
                { value: '', label: 'Select your platform' },
                { value: 'youtube', label: 'YouTube' },
                { value: 'instagram', label: 'Instagram' },
                { value: 'tiktok', label: 'TikTok' },
                { value: 'podcast', label: 'Podcast' },
              ]}
              required
            />

            <Select
              label="Niche"
              value={formData.niche}
              onChange={(e) => updateField('niche', e.target.value)}
              error={errors.niche}
              options={[
                { value: '', label: 'Select your niche' },
                { value: 'tech', label: 'Technology' },
                { value: 'gaming', label: 'Gaming' },
                { value: 'lifestyle', label: 'Lifestyle' },
                { value: 'fitness', label: 'Fitness' },
              ]}
              required
            />

            <Input
              label="Subscribers/Followers"
              type="number"
              value={formData.subscribers}
              onChange={(e) => updateField('subscribers', e.target.value)}
              error={errors.subscribers}
              placeholder="10000"
              helper="Approximate number"
              required
            />
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Final Details</h2>

            <Select
              label="Country"
              value={formData.country}
              onChange={(e) => updateField('country', e.target.value)}
              error={errors.country}
              options={[
                { value: '', label: 'Select your country' },
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'au', label: 'Australia' },
              ]}
              required
            />

            <Select
              label="Content Language"
              value={formData.language}
              onChange={(e) => updateField('language', e.target.value)}
              error={errors.language}
              options={[
                { value: '', label: 'Select language' },
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' },
              ]}
              required
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-8">
          {step > 1 && (
            <Button 
              variant="outline"
              onClick={prevStep}
            >
              Back
            </Button>
          )}

          {step < 3 ? (
            <Button 
              variant="primary"
              onClick={nextStep}
              className="flex-1"
            >
              Continue
            </Button>
          ) : (
            <Button 
              variant="primary"
              onClick={handleSubmit}
              loading={loading}
              className="flex-1"
            >
              Create Account
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
```

---

## 🎯 Example 4: Settings Page

```jsx
import { Card, Button, Input, Select, Badge } from '@/components/UI'
import { Save, User, Bell, Shield, CreditCard } from 'lucide-react'

function SettingsPage({ user, onSave }) {
  const [settings, setSettings] = useState({
    name: user.name,
    email: user.email,
    notifications: 'all',
    theme: 'light',
  })
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    await onSave(settings)
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>

      {/* Profile Section */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <User size={24} className="text-primary-600" />
          <div>
            <h2 className="text-xl font-bold">Profile</h2>
            <p className="text-sm text-gray-600">Update your personal information</p>
          </div>
          <Badge variant="pro" className="ml-auto">PRO</Badge>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={settings.name}
            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
          />

          <Input
            label="Email Address"
            type="email"
            value={settings.email}
            onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            helper="We'll send verification if you change this"
          />
        </div>
      </Card>

      {/* Notifications Section */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Bell size={24} className="text-primary-600" />
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            <p className="text-sm text-gray-600">Choose what updates you receive</p>
          </div>
        </div>

        <Select
          label="Email Notifications"
          value={settings.notifications}
          onChange={(e) => setSettings({ ...settings, notifications: e.target.value })}
          options={[
            { value: 'all', label: 'All notifications' },
            { value: 'important', label: 'Important only' },
            { value: 'none', label: 'None' },
          ]}
        />
      </Card>

      {/* Appearance Section */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <Shield size={24} className="text-primary-600" />
          <div>
            <h2 className="text-xl font-bold">Appearance</h2>
            <p className="text-sm text-gray-600">Customize how WMR looks</p>
          </div>
        </div>

        <Select
          label="Theme"
          value={settings.theme}
          onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'System' },
          ]}
        />
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">
          Cancel
        </Button>
        <Button 
          variant="primary" 
          loading={loading}
          onClick={handleSave}
        >
          <Save size={20} />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
```

---

## 🔔 Example 5: Notification List

```jsx
import { Card, Badge, Button } from '@/components/UI'
import { Check, X, Clock, AlertCircle } from 'lucide-react'

function NotificationList({ notifications, onMarkRead, onDelete }) {
  const getBadgeVariant = (type) => {
    switch (type) {
      case 'success': return 'success'
      case 'warning': return 'warning'
      case 'error': return 'error'
      default: return 'info'
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <Check size={20} />
      case 'warning': return <AlertCircle size={20} />
      case 'error': return <X size={20} />
      default: return <Clock size={20} />
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card key={notif.id} padding="md" className="hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className={`p-2 rounded-lg ${
                notif.type === 'success' ? 'bg-green-100 text-green-600' :
                notif.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                notif.type === 'error' ? 'bg-red-100 text-red-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {getIcon(notif.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold">{notif.title}</h3>
                  <Badge variant={getBadgeVariant(notif.type)}>
                    {notif.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                <p className="text-xs text-gray-400">{notif.time}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!notif.read && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onMarkRead(notif.id)}
                  >
                    Mark Read
                  </Button>
                )}
                <Button 
                  size="sm" 
                  variant="danger"
                  onClick={() => onDelete(notif.id)}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

## 🎨 Example 6: Pricing Cards

```jsx
import { Card, Badge, Button } from '@/components/UI'
import { Check, X } from 'lucide-react'

function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      badge: null,
      features: [
        { text: '2 calculations per month', included: true },
        { text: 'Basic rate calculator', included: true },
        { text: 'Offer verdict', included: false },
        { text: 'Email templates', included: false },
        { text: 'Media kit generator', included: false },
      ],
      cta: 'Get Started',
      variant: 'outline',
    },
    {
      name: 'Pro',
      price: '$9',
      period: 'per month',
      badge: 'pro',
      features: [
        { text: 'Unlimited calculations', included: true },
        { text: 'Full rate breakdown', included: true },
        { text: 'Offer verdict', included: true },
        { text: '3 email templates', included: true },
        { text: 'PDF media kit generator', included: true },
      ],
      cta: 'Upgrade to Pro',
      variant: 'primary',
      featured: true,
    },
  ]

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl text-gray-600">
          Start free, upgrade when you're ready
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            padding="lg"
            className={`relative ${
              plan.featured ? 'border-2 border-primary-500 shadow-lg' : ''
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge variant="pro">MOST POPULAR</Badge>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">/ {plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  {feature.included ? (
                    <Check size={20} className="text-green-600 flex-shrink-0" />
                  ) : (
                    <X size={20} className="text-gray-300 flex-shrink-0" />
                  )}
                  <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <Button 
              variant={plan.variant}
              className="w-full"
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

---

## 🔍 Quick Tips

### Spacing
```jsx
// Use Tailwind's space utilities
<div className="space-y-4">
  <Input />
  <Input />
  <Button />
</div>
```

### Responsive Grids
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <Card>...</Card>
  <Card>...</Card>
</div>
```

### Loading States
```jsx
{loading ? (
  <Spinner size="lg" />
) : (
  <div>Content...</div>
)}
```

### Error Handling
```jsx
<Input 
  error={errors.email || serverError}
  onFocus={() => setErrors({ ...errors, email: '' })}
/>
```

---

**More examples in `UI_COMPONENTS.md`**
