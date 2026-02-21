# Design System

This directory contains the design system configuration for the WMR application.

## Files

- `theme.js` - Core design tokens (colors, shadows, radius)
- `index.css` - Tailwind CSS imports

## Usage

### Using Design Tokens in JavaScript

```jsx
import { COLORS, SHADOWS, RADIUS } from './styles/theme'

// Use in inline styles
<div style={{ 
  backgroundColor: COLORS.verdict.good,
  boxShadow: SHADOWS.md,
  borderRadius: RADIUS.lg 
}} />
```

### Using Tailwind Classes

The design system is integrated with Tailwind CSS. Use these utility classes:

#### Colors

**Primary Colors:**
- `bg-primary-50` to `bg-primary-700`
- `text-primary-50` to `text-primary-700`
- `border-primary-50` to `border-primary-700`

**Secondary Colors:**
- `bg-secondary-500`, `bg-secondary-600`
- `text-secondary-500`, `text-secondary-600`

**Verdict Colors:**
- `bg-verdict-good` - Green (#10b981)
- `bg-verdict-acceptable` - Orange (#f59e0b)
- `bg-verdict-too-low` - Dark Orange (#f97316)
- `bg-verdict-way-too-low` - Red (#ef4444)

#### Typography

The default font family is **Inter**, with system fallbacks.

```jsx
<h1 className="font-sans font-bold">Heading</h1>
<p className="font-sans">Body text</p>
```

#### Shadows

```jsx
<div className="shadow-sm">Small shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
```

#### Border Radius

```jsx
<div className="rounded-md">Medium radius (0.5rem)</div>
<div className="rounded-lg">Large radius (0.75rem)</div>
<div className="rounded-xl">Extra large radius (1rem)</div>
<div className="rounded-full">Full radius (circle/pill)</div>
```

## Color Palette

### Primary (Indigo)
- 50: `#eef2ff` - Lightest
- 100: `#e0e7ff`
- 200: `#c7d2fe`
- 500: `#6366f1` - Base
- 600: `#4f46e5` - Hover
- 700: `#4338ca` - Active

### Secondary (Teal)
- 500: `#14b8a6` - Base
- 600: `#0d9488` - Hover

### Verdict Colors
- **Good**: `#10b981` (Green) - Rate is good
- **Acceptable**: `#f59e0b` (Yellow/Orange) - Rate is acceptable
- **Too Low**: `#f97316` (Dark Orange) - Rate is too low
- **Way Too Low**: `#ef4444` (Red) - Rate is way too low

### Neutral Colors
- **Background**: `#f8fafc` (Slate 50)
- **Surface**: `#ffffff` (White)
- **Text Primary**: `#1e293b` (Slate 800)
- **Text Secondary**: `#64748b` (Slate 500)
- **Text Muted**: `#94a3b8` (Slate 400)
- **Border**: `#e2e8f0` (Slate 200)

## Examples

### Button with Primary Color
```jsx
<button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-colors">
  Click Me
</button>
```

### Card with Verdict Badge
```jsx
<div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
  <span className="inline-block px-3 py-1 bg-verdict-good text-white rounded-full text-sm font-semibold">
    Good Deal
  </span>
</div>
```

### Input Field
```jsx
<input 
  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
  type="text"
  placeholder="Enter value"
/>
```
