# 🎨 UI Components Library

**File**: `src/components/UI/index.js`  
**Type**: Reusable UI Components  
**Last Updated**: 2026-02-08

---

## 🎯 Purpose

Centralized library of reusable UI components for consistent design throughout the application. All components follow the design system defined in `src/styles/theme.js`.

---

## 📦 Components

### 1. Button
### 2. Input
### 3. Select
### 4. Card
### 5. Badge
### 6. Spinner

---

## 📚 API Reference

### Button

Professional button component with multiple variants, sizes, and states.

#### Props

```javascript
{
  variant: 'primary' | 'secondary' | 'outline' | 'danger',  // Default: 'primary'
  size: 'sm' | 'md' | 'lg',                                 // Default: 'md'
  loading: boolean,                                          // Default: false
  disabled: boolean,                                         // Default: false
  children: ReactNode,                                       // Required
  className: string,                                         // Optional
  ...props                                                   // All other button props
}
```

#### Usage

```jsx
import { Button } from '@/components/UI'

// Primary button
<Button onClick={handleSubmit}>
  Submit
</Button>

// Loading state
<Button loading variant="primary">
  Processing...
</Button>

// Outline variant
<Button variant="outline" size="sm">
  Cancel
</Button>

// Danger button
<Button variant="danger" onClick={handleDelete}>
  Delete Account
</Button>

// With icon
<Button variant="secondary">
  <Plus size={20} />
  Add Item
</Button>
```

#### Variants

**Primary** (default)
- Background: primary-600
- Hover: primary-700
- Text: white
- Use: Main actions, CTAs

**Secondary**
- Background: gray-600
- Hover: gray-700
- Text: white
- Use: Secondary actions

**Outline**
- Border: gray-300
- Hover: gray-50
- Text: gray-700
- Use: Cancel, back actions

**Danger**
- Background: red-600
- Hover: red-700
- Text: white
- Use: Delete, destructive actions

#### Sizes

- **sm**: `px-3 py-1.5 text-sm` - Compact buttons
- **md**: `px-4 py-2 text-base` - Default size
- **lg**: `px-6 py-3 text-lg` - Prominent actions

#### States

**Loading**
- Shows spinner
- Disables button
- Maintains layout

**Disabled**
- Opacity: 50%
- Cursor: not-allowed
- Prevents interaction

---

### Input

Text input with label, error, and helper text support.

#### Props

```javascript
{
  label: string,          // Optional field label
  error: string,          // Optional error message
  helper: string,         // Optional helper text
  className: string,      // Optional wrapper class
  ...inputProps          // All native input props
}
```

#### Usage

```jsx
import { Input } from '@/components/UI'

// Basic input
<Input 
  name="email"
  type="email"
  placeholder="Enter your email"
/>

// With label
<Input 
  label="Email Address"
  name="email"
  type="email"
  required
/>

// With error
<Input 
  label="Password"
  type="password"
  error="Password must be at least 6 characters"
/>

// With helper text
<Input 
  label="Username"
  name="username"
  helper="This will be visible to other users"
/>

// Controlled input
<Input 
  label="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

#### Features

✅ Auto-generated ID if not provided  
✅ Error state (red border, red text)  
✅ Focus ring (primary-500)  
✅ Helper text (gray, below input)  
✅ Full width by default  
✅ Accessible labels

---

### Select

Dropdown select with label and error support.

#### Props

```javascript
{
  label: string,                    // Optional field label
  options: Array<{value, label}>,   // Required options array
  error: string,                    // Optional error message
  className: string,                // Optional wrapper class
  ...selectProps                   // All native select props
}
```

#### Usage

```jsx
import { Select } from '@/components/UI'

// Basic select
<Select 
  options={[
    { value: '', label: 'Select...' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
/>

// With label
<Select 
  label="Platform"
  name="platform"
  options={[
    { value: 'youtube', label: 'YouTube' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
  ]}
/>

// With error
<Select 
  label="Country"
  options={countries}
  error="Please select a country"
/>

// Controlled select
<Select 
  label="Status"
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  options={statusOptions}
/>
```

---

### Card

Container component with consistent styling and padding options.

#### Props

```javascript
{
  children: ReactNode,                  // Required content
  className: string,                    // Optional additional classes
  padding: 'sm' | 'md' | 'lg'          // Default: 'md'
}
```

#### Usage

```jsx
import { Card } from '@/components/UI'

// Basic card
<Card>
  <h3>Title</h3>
  <p>Content goes here</p>
</Card>

// Small padding
<Card padding="sm">
  Compact content
</Card>

// Large padding
<Card padding="lg">
  <h2>Large Card</h2>
  <p>More breathing room</p>
</Card>

// Custom classes
<Card className="hover:shadow-lg transition-shadow">
  Interactive card
</Card>
```

#### Padding Sizes

- **sm**: `p-4` (16px) - Compact cards
- **md**: `p-6` (24px) - Default
- **lg**: `p-8` (32px) - Spacious cards

#### Default Styles

- Background: white
- Border radius: xl (0.75rem)
- Shadow: sm
- Border: gray-100

---

### Badge

Small label component for status, tags, or highlights.

#### Props

```javascript
{
  variant: 'success' | 'warning' | 'error' | 'info' | 'pro',  // Default: 'info'
  children: ReactNode,                                         // Required
  className: string                                            // Optional
}
```

#### Usage

```jsx
import { Badge } from '@/components/UI'

// Success badge
<Badge variant="success">Active</Badge>

// Warning badge
<Badge variant="warning">Pending</Badge>

// Error badge
<Badge variant="error">Failed</Badge>

// Info badge
<Badge variant="info">Beta</Badge>

// Pro badge (gradient)
<Badge variant="pro">PRO</Badge>

// In context
<div className="flex items-center gap-2">
  <h3>John Doe</h3>
  <Badge variant="pro">PRO</Badge>
</div>
```

#### Variants

**Success**
- Background: green-100
- Text: green-800
- Use: Success states, active status

**Warning**
- Background: yellow-100
- Text: yellow-800
- Use: Warnings, pending states

**Error**
- Background: red-100
- Text: red-800
- Use: Errors, failed states

**Info**
- Background: blue-100
- Text: blue-800
- Use: Information, neutral tags

**Pro**
- Background: gradient amber-400 to orange-500
- Text: white
- Use: Premium features, Pro badges

---

### Spinner

Loading spinner with multiple sizes.

#### Props

```javascript
{
  size: 'sm' | 'md' | 'lg',  // Default: 'md'
  className: string           // Optional
}
```

#### Usage

```jsx
import { Spinner } from '@/components/UI'

// Medium spinner (default)
<Spinner />

// Small spinner
<Spinner size="sm" />

// Large spinner
<Spinner size="lg" />

// Custom color
<Spinner className="!border-red-600" />

// In button
<button disabled>
  <Spinner size="sm" className="!text-white" />
  Loading...
</button>

// Centered
<div className="flex items-center justify-center h-64">
  <Spinner size="lg" />
</div>
```

#### Sizes

- **sm**: `w-4 h-4` (16px) - Inline, buttons
- **md**: `w-6 h-6` (24px) - Default
- **lg**: `w-8 h-8` (32px) - Page loading

#### Features

✅ Smooth rotation animation  
✅ Accessible (role="status", aria-label)  
✅ Screen reader text ("Loading...")  
✅ Primary color by default

---

## 🎨 Design Tokens

All components use the design system from `src/styles/theme.js`:

### Colors

**Primary**: #6366f1 (Indigo)
- Used in: Buttons, focus rings, links

**Success**: #10b981 (Green)
- Used in: Success badges, confirmations

**Warning**: #f59e0b (Amber)
- Used in: Warning badges, alerts

**Error**: #ef4444 (Red)
- Used in: Error messages, danger buttons

**Gray Scale**:
- 50, 100, 300, 600, 700, 900

### Typography

**Font Family**: Inter (from Google Fonts)
**Font Sizes**: sm, base, lg

### Spacing

**Padding**: 1.5, 2, 3, 4, 6, 8
**Margin**: 1, 4
**Gap**: 2

### Border Radius

- Default: `rounded-lg` (0.5rem)
- Cards: `rounded-xl` (0.75rem)
- Badges: `rounded-full`

---

## 💻 Code Examples

### Form with UI Components

```jsx
import { Button, Input, Select, Card } from '@/components/UI'
import { useState } from 'react'

function MyForm() {
  const [formData, setFormData] = useState({ name: '', email: '', role: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Submit logic...
    setLoading(false)
  }

  return (
    <Card padding="lg">
      <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
          required
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={errors.email}
          helper="We'll never share your email"
          required
        />

        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          options={[
            { value: '', label: 'Select a role' },
            { value: 'creator', label: 'Content Creator' },
            { value: 'brand', label: 'Brand Manager' },
          ]}
          error={errors.role}
          required
        />

        <div className="flex gap-3 pt-4">
          <Button type="submit" loading={loading}>
            Create Account
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
```

### Dashboard with Components

```jsx
import { Card, Badge, Button, Spinner } from '@/components/UI'
import { TrendingUp } from 'lucide-react'

function Dashboard({ loading, isPro, stats }) {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-sm text-gray-600">Total Revenue</h3>
          <p className="text-3xl font-bold mt-2">${stats.revenue}</p>
          <Badge variant="success" className="mt-3">+12%</Badge>
        </Card>

        <Card>
          <h3 className="text-sm text-gray-600">Active Users</h3>
          <p className="text-3xl font-bold mt-2">{stats.users}</p>
          <Badge variant="info" className="mt-3">Stable</Badge>
        </Card>

        <Card>
          <h3 className="text-sm text-gray-600">Pending Tasks</h3>
          <p className="text-3xl font-bold mt-2">{stats.tasks}</p>
          <Badge variant="warning" className="mt-3">Action needed</Badge>
        </Card>
      </div>
    </div>
  )
}
```

---

## 🧪 Testing

### Visual Testing Checklist

**Button**
- [ ] All variants render correctly
- [ ] All sizes render correctly
- [ ] Loading state shows spinner
- [ ] Disabled state is visible
- [ ] Hover effects work
- [ ] Focus ring appears

**Input**
- [ ] Label appears when provided
- [ ] Error state (red border, red text)
- [ ] Helper text shows when no error
- [ ] Focus ring works
- [ ] Full width behavior
- [ ] Placeholder text visible

**Select**
- [ ] Options render correctly
- [ ] Label appears when provided
- [ ] Error state works
- [ ] Focus ring works
- [ ] Selected value shows

**Card**
- [ ] Default padding correct
- [ ] All padding sizes work
- [ ] Shadow visible
- [ ] Border radius correct
- [ ] Background white

**Badge**
- [ ] All variants render correctly
- [ ] Text is readable
- [ ] Rounded shape correct
- [ ] Pro gradient works

**Spinner**
- [ ] All sizes render correctly
- [ ] Animation smooth
- [ ] Color correct
- [ ] Accessible attributes present

---

## 🔧 Customization

### Extending Components

All components accept `className` for easy customization:

```jsx
// Add custom styles
<Button className="w-full" variant="primary">
  Full Width Button
</Button>

<Card className="hover:shadow-xl transition-shadow cursor-pointer">
  Interactive Card
</Card>

<Badge className="text-lg px-4 py-1" variant="success">
  Large Badge
</Badge>
```

### Overriding Styles

Use Tailwind's important modifier for one-off changes:

```jsx
<Spinner className="!border-red-600" />
<Button className="!bg-purple-600 !hover:bg-purple-700">
  Custom Color
</Button>
```

---

## 📦 Importing

### Named Imports (Recommended)

```javascript
import { Button, Input, Select } from '@/components/UI'
```

### Default Import

```javascript
import UI from '@/components/UI'

<UI.Button>Click Me</UI.Button>
<UI.Input label="Name" />
```

### Individual Imports

```javascript
import { Button } from '@/components/UI/index.js'
```

---

## 🎯 Best Practices

### Do's ✅

✅ Use semantic variants (`primary` for main actions, `danger` for destructive)  
✅ Provide labels for inputs and selects (accessibility)  
✅ Show loading states for async actions  
✅ Use helper text for clarification  
✅ Keep badges short (1-3 words)  
✅ Use Cards for grouping related content

### Don'ts ❌

❌ Don't mix multiple primary buttons in one section  
❌ Don't use danger variant for non-destructive actions  
❌ Don't skip labels on forms  
❌ Don't override core styles unless necessary  
❌ Don't use large spinners inline  
❌ Don't nest Cards without good reason

---

## 🚀 Future Enhancements

### Short-term
- [ ] Textarea component
- [ ] Checkbox component
- [ ] Radio component
- [ ] Toggle/Switch component

### Medium-term
- [ ] Modal component
- [ ] Tooltip component
- [ ] Dropdown menu component
- [ ] Tabs component

### Long-term
- [ ] Date picker
- [ ] File upload
- [ ] Rich text editor
- [ ] Data table

---

## 🔗 Related Files

**Component File**:
- `src/components/UI/index.js`

**Design System**:
- `src/styles/theme.js`
- `tailwind.config.js`

**Usage Examples**:
- `src/pages/Login.jsx`
- `src/pages/Signup.jsx`
- `src/pages/Dashboard.jsx`

---

## 📊 Component Stats

**Total Components**: 6  
**Lines of Code**: 300+  
**Variants**: 11 total  
**Sizes**: 9 total  
**States**: 4 (default, loading, disabled, error)

---

## ✨ Highlights

✅ **Consistent Design** - All components follow design system  
✅ **Accessible** - Proper labels, ARIA attributes  
✅ **Flexible** - Easy to customize with className  
✅ **Type-safe** - Clear prop definitions  
✅ **Performant** - Lightweight, no heavy dependencies  
✅ **Developer-friendly** - Simple API, clear docs

---

## 🎨 Design Philosophy

### Principles

1. **Consistency** - Same look and feel across the app
2. **Simplicity** - Easy to use, minimal configuration
3. **Flexibility** - Customizable without fighting the system
4. **Accessibility** - Works for everyone
5. **Performance** - Fast and lightweight

### Inspiration

Components inspired by:
- **Tailwind UI** - Utility-first approach
- **Shadcn UI** - Component patterns
- **Material UI** - Comprehensive design system
- **Radix UI** - Accessibility primitives

---

## 💡 Usage Tips

### Buttons

- Use `primary` for the main action on a page
- Use `outline` for secondary or cancel actions
- Use `danger` only for destructive actions (delete, remove)
- Show loading state during async operations
- Disable buttons during form submission

### Forms

- Always provide labels for inputs
- Show errors below fields
- Use helper text for clarification
- Group related fields in Cards
- Provide clear submit buttons

### Feedback

- Use Badges for status indicators
- Use Spinners for loading states
- Use error text for validation messages
- Keep feedback close to relevant UI

---

**Status**: ✅ **UI COMPONENTS LIBRARY COMPLETE**

Reusable components ready for use throughout the app! 🎨✨

---

**End of Documentation** ✅
