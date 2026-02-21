# 🎨 Fonts Setup - Clash Display & Satoshi

**Date**: 2026-02-08  
**Status**: ✅ Configured  
**Fonts**: Clash Display (headings) + Satoshi (body)

---

## 📚 Fonts Overview

### Primary Font: Satoshi
- **Used for**: Body text, paragraphs, UI elements
- **Weights**: 400 (regular), 500 (medium), 700 (bold)
- **Type**: Sans-serif
- **Source**: [Fontshare](https://www.fontshare.com/fonts/satoshi)

### Display Font: Clash Display
- **Used for**: Headings (h1-h6), titles, hero text
- **Weights**: 400, 500, 600, 700
- **Type**: Sans-serif
- **Source**: [Fontshare](https://www.fontshare.com/fonts/clash-display)

---

## ⚙️ Configuration

### 1. Font Import

**File**: `src/index.css`

```css
/* Import Clash Display and Satoshi fonts */
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=satoshi@400,500,700&display=swap');
```

**Why Fontshare?**
- ✅ Free, high-quality fonts
- ✅ Professional appearance
- ✅ Google Fonts alternative
- ✅ Good performance
- ✅ Variable font support

### 2. Tailwind Configuration

**File**: `tailwind.config.js`

```javascript
theme: {
  extend: {
    fontFamily: {
      display: ['Clash Display', 'sans-serif'],
      sans: ['Satoshi', 'sans-serif'],
    },
  },
}
```

**Usage in components**:
```jsx
<h1 className="font-display">Heading</h1>  // Uses Clash Display
<p className="font-sans">Body text</p>      // Uses Satoshi (default)
```

### 3. Global Styles

**File**: `src/index.css`

```css
/* Apply fonts globally */
body {
  font-family: 'Satoshi', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Clash Display', sans-serif;
}
```

**Result**:
- All body text uses Satoshi by default
- All headings use Clash Display automatically
- No need to add `font-display` to every heading

---

## 🎯 Usage Examples

### Headings (Automatic)

```jsx
// These automatically use Clash Display
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
```

**Output**: All headings use Clash Display

### Body Text (Default)

```jsx
// Uses Satoshi by default
<p>This is body text</p>
<span>UI element</span>
<button>Click me</button>
```

**Output**: All text uses Satoshi

### Explicit Font Classes

```jsx
// Force Clash Display on non-heading
<div className="font-display text-4xl font-bold">
  Big Hero Text
</div>

// Force Satoshi on heading (override)
<h2 className="font-sans">
  Special Heading
</h2>
```

---

## 📊 Font Weights Available

### Satoshi (Body)
```css
font-weight: 400;  /* Regular - Default */
font-weight: 500;  /* Medium */
font-weight: 700;  /* Bold */
```

**Tailwind classes**:
- `font-normal` → 400
- `font-medium` → 500
- `font-bold` → 700

### Clash Display (Headings)
```css
font-weight: 400;  /* Regular */
font-weight: 500;  /* Medium */
font-weight: 600;  /* Semibold */
font-weight: 700;  /* Bold */
```

**Tailwind classes**:
- `font-normal` → 400
- `font-medium` → 500
- `font-semibold` → 600
- `font-bold` → 700

---

## 🎨 Typography Examples

### Hero Section

```jsx
<div className="text-center">
  <h1 className="text-5xl font-bold mb-4">
    Know Your Worth
  </h1>
  <p className="text-xl text-gray-600">
    Calculate fair sponsorship rates instantly
  </p>
</div>
```

**Fonts used**:
- h1: Clash Display Bold (automatic)
- p: Satoshi Regular (default)

### Card Title

```jsx
<div className="bg-white p-6 rounded-lg">
  <h3 className="text-2xl font-semibold mb-2">
    Premium Features
  </h3>
  <p className="text-gray-600">
    Unlock advanced tools for creators
  </p>
</div>
```

**Fonts used**:
- h3: Clash Display Semibold (automatic)
- p: Satoshi Regular (default)

### Button Text

```jsx
<button className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold">
  Get Started
</button>
```

**Font used**: Satoshi Semibold (default + semibold)

---

## 🚀 Performance

### Loading Strategy

**Method**: CDN import with `display=swap`

```css
@import url('...&display=swap');
```

**Benefits**:
- ✅ Font swapping enabled (shows fallback first)
- ✅ No FOIT (Flash of Invisible Text)
- ✅ Progressive enhancement
- ✅ Good user experience on slow connections

### File Size

**Satoshi** (3 weights): ~45 KB  
**Clash Display** (4 weights): ~60 KB  
**Total**: ~105 KB (compressed)

### Caching

Fonts are cached by the browser after first load:
- First visit: ~105 KB download
- Subsequent visits: 0 KB (from cache)

---

## 🔍 Browser Support

### Modern Browsers
✅ Chrome 88+  
✅ Firefox 85+  
✅ Safari 14+  
✅ Edge 88+

### Fallback
If fonts fail to load, fallback to system sans-serif:
- macOS: SF Pro / Helvetica Neue
- Windows: Segoe UI
- Android: Roboto
- Linux: System sans-serif

---

## 🎨 Design System Integration

### Font Hierarchy

```
Display XL:   text-6xl font-bold     (Clash Display)
Display L:    text-5xl font-bold     (Clash Display)
Display M:    text-4xl font-bold     (Clash Display)
Heading 1:    text-3xl font-semibold (Clash Display)
Heading 2:    text-2xl font-semibold (Clash Display)
Heading 3:    text-xl font-semibold  (Clash Display)
Body Large:   text-lg font-normal    (Satoshi)
Body:         text-base font-normal  (Satoshi)
Body Small:   text-sm font-normal    (Satoshi)
Caption:      text-xs font-normal    (Satoshi)
```

### Font Pairing

**Why Clash Display + Satoshi?**
- ✅ Both geometric sans-serifs
- ✅ Similar x-height
- ✅ Complementary but distinct
- ✅ Professional appearance
- ✅ Modern, clean aesthetic

---

## 🧪 Testing

### Visual Test

1. Start dev server: `npm run dev`
2. Open any page
3. Check headings use Clash Display
4. Check body text uses Satoshi

### Browser DevTools

1. Inspect any heading (h1-h6)
2. Check Computed > font-family
3. Should show: `"Clash Display", sans-serif`

4. Inspect body text
5. Check Computed > font-family
6. Should show: `"Satoshi", sans-serif`

---

## 🔧 Customization

### Change Default Body Font

```css
/* src/index.css */
body {
  font-family: 'Your Font', sans-serif;
}
```

### Change Heading Font

```css
/* src/index.css */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Your Font', sans-serif;
}
```

### Add More Weights

```css
/* src/index.css */
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700,800&f[]=satoshi@300,400,500,700&display=swap');
```

---

## 📚 Resources

### Official Documentation
- [Clash Display on Fontshare](https://www.fontshare.com/fonts/clash-display)
- [Satoshi on Fontshare](https://www.fontshare.com/fonts/satoshi)
- [Fontshare Usage Guide](https://www.fontshare.com/about)

### Typography Best Practices
- [Web Typography Guide](https://web.dev/learn/design/typography/)
- [Tailwind Typography Plugin](https://tailwindcss.com/docs/typography-plugin)

---

## 🎯 Files Modified

1. **src/index.css**
   - Added font import
   - Added global font styles

2. **tailwind.config.js**
   - Added fontFamily configuration

---

## ✅ Checklist

- [x] Fonts imported from Fontshare
- [x] Tailwind config updated
- [x] Global styles applied
- [x] Body uses Satoshi
- [x] Headings use Clash Display
- [x] Font weights available
- [x] Display swap enabled
- [x] Fallback fonts configured
- [x] Documentation complete

---

## 🎉 Result

**Professional typography system ready to use!** 🎨

All headings now use Clash Display, and all body text uses Satoshi - no additional classes needed on most elements!

---

**End of Documentation** ✅
