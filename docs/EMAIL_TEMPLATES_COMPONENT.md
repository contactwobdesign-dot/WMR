# 📧 Email Templates Component

**File**: `src/components/Premium/EmailTemplates.jsx`  
**Type**: Modal Component  
**Access**: Premium Feature  
**Last Updated**: 2026-02-07

---

## 🎯 Purpose

Provides professional email templates for creators to negotiate sponsorship rates. Accessed from the Dashboard quick actions (Pro users only).

---

## 📋 Props

```javascript
{
  isOpen: boolean,              // Controls modal visibility
  onClose: function,            // Callback to close modal
  calculationData: object | null  // Optional: Pre-fill with calculation data
}
```

### Usage Example
```jsx
const [isOpen, setIsOpen] = useState(false)

<EmailTemplates 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  calculationData={null}
/>
```

---

## 📧 Templates Included

### Template 1: Initial Response
**Use Case**: First reply to a brand inquiry

**Key Elements**:
- Thank you for reaching out
- State your rate clearly
- List deliverables
- Suggest next steps (call)

**Tone**: Professional, friendly, confident

---

### Template 2: Negotiation Counter
**Use Case**: When brand's offer is too low

**Key Elements**:
- Acknowledge their offer
- State your rate with justification
- Highlight your value (engagement, audience, quality)
- Offer flexibility (package deals)

**Tone**: Professional, firm but flexible

---

### Template 3: Accepting a Deal
**Use Case**: Confirming agreed partnership

**Key Elements**:
- Excitement for partnership
- Clear summary of terms
- Action items and deadlines
- Professional close

**Tone**: Enthusiastic, organized, professional

---

## 🎨 UI Design

### Modal Structure
```
┌─────────────────────────────────────┐
│  [Overlay - Dark 50%]               │
│  ┌───────────────────────────────┐  │
│  │  Header: Email Templates   X  │  │
│  ├───────────────────────────────┤  │
│  │  [Template 1]                 │  │
│  │  - Title                      │  │
│  │  - Subject (highlighted)      │  │
│  │  - Body (monospace)           │  │
│  │  - [Copy Button]              │  │
│  │  - Tip                        │  │
│  │                               │  │
│  │  [Template 2]                 │  │
│  │  ...                          │  │
│  │                               │  │
│  │  [Template 3]                 │  │
│  │  ...                          │  │
│  │                               │  │
│  │  [How to Use]                 │  │
│  ├───────────────────────────────┤  │
│  │  [Close Button]               │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Colors
- **Overlay**: bg-black bg-opacity-50
- **Modal**: bg-white
- **Template card**: border-gray-200
- **Body**: bg-gray-50, font-mono
- **Placeholders**: text-primary-600 (highlighted)
- **Tips**: bg-primary-50

### Layout
- **Max width**: 4xl (896px)
- **Max height**: 90vh (scrollable)
- **Centered**: Flex center
- **Padding**: p-6
- **Gap**: space-y-8

---

## 💻 Key Features

### 1. Placeholder Highlighting
```javascript
const highlightPlaceholders = (text) => {
  const parts = text.split(/(\[.*?\])/)
  return parts.map((part, index) => {
    if (part.match(/^\[.*?\]$/)) {
      return <span className="text-primary-600 font-semibold">{part}</span>
    }
    return <span>{part}</span>
  })
}
```

**Result**: `[BRAND_NAME]` appears in blue, rest in gray

---

### 2. Copy to Clipboard
```javascript
const handleCopy = (template, index) => {
  const fullText = `Subject: ${template.subject}\n\n${template.body}`
  
  navigator.clipboard.writeText(fullText).then(() => {
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }).catch(err => {
    console.error('Failed to copy:', err)
    alert('Failed to copy to clipboard')
  })
}
```

**Features**:
- Copies full email (subject + body)
- Shows "Copied!" for 2 seconds
- Handles errors gracefully
- Changes button text & icon

---

### 3. Copy Button States

#### Default
```jsx
<button>
  <Copy /> Copy to Clipboard
</button>
```

#### Copied
```jsx
<button>
  <Check /> Copied!
</button>
```

**Duration**: 2 seconds, then back to default

---

## 🎨 Template Card Design

### Structure
```
┌─────────────────────────────────┐
│ [Title]          [Copy Button]  │ ← Gray header
├─────────────────────────────────┤
│ Subject: [highlighted text]     │
│                                 │
│ Body:                           │
│ ┌─────────────────────────────┐ │
│ │ Monospace text with         │ │
│ │ [PLACEHOLDERS] highlighted  │ │
│ └─────────────────────────────┘ │
│                                 │
│ 💡 Tip: Replace [PLACEHOLDERS] │ ← Blue tip box
└─────────────────────────────────┘
```

---

## 📋 Template Placeholders

### Common Placeholders
- `[BRAND_NAME]` - Name of sponsoring brand
- `[YOUR_NAME]` - Creator's name
- `[YOUR_RATE]` - Your calculated rate
- `[THEIR_OFFER]` - Brand's offered price
- `[CONTENT_TYPE]` - Type of content (integration, mention, etc.)
- `[PLATFORM]` - Platform (YouTube, Instagram, etc.)
- `[LOCATION]` - Audience location (US, UK, etc.)
- `[DATE]` - Specific date
- `[X]` - Engagement rate percentage
- `[DELIVERABLE 1]`, `[DELIVERABLE 2]` - List of deliverables

**All highlighted** in primary-600 color

---

## 🔄 User Flow

```
User on Dashboard
    ↓
Click "Email Templates"
    ↓
Modal opens
    ↓
Read template
    ↓
Click "Copy to Clipboard"
    ↓
Button shows "Copied!" ✓
    ↓
Paste in email client
    ↓
Replace [PLACEHOLDERS]
    ↓
Send to brand
```

---

## 💡 Design Decisions

### Why Modal vs. Separate Page?
- **Quick access**: No navigation needed
- **Context**: Stays on dashboard
- **Focus**: Dedicated space for reading
- **UX**: Can close and return easily

### Why 3 Templates?
- **Common scenarios**: Covers most use cases
- **Not overwhelming**: 3 is digestible
- **Expandable**: Can add more later

### Why Highlight Placeholders?
- **Visibility**: Easy to spot what to replace
- **Professional**: Shows attention to detail
- **UX**: Reduces user error

### Why Copy Entire Email?
- **Convenience**: One click to copy all
- **Speed**: Faster than manual selection
- **Accuracy**: No copy-paste errors

---

## 🧪 Testing

### Manual Test Checklist
- [ ] Modal opens when button clicked
- [ ] Modal closes when X clicked
- [ ] Modal closes when overlay clicked
- [ ] All 3 templates display
- [ ] Placeholders highlighted in blue
- [ ] Copy button works
- [ ] "Copied!" shows for 2 seconds
- [ ] Button returns to "Copy to Clipboard"
- [ ] Text copied includes subject + body
- [ ] Modal scrolls if content tall
- [ ] Mobile responsive
- [ ] Keyboard accessible (ESC to close)

---

## 📱 Responsive Design

### Mobile (< 640px)
- Modal takes full width (with margin)
- Font sizes slightly smaller
- Scrollable content
- Touch-friendly buttons

### Desktop (≥ 640px)
- Modal centered, max-w-4xl
- Full font sizes
- Comfortable reading
- Mouse-friendly

---

## 🔐 Access Control

### Premium Only
- Accessed from Dashboard (protected page)
- Quick actions section (isPremium() check)
- No direct URL

### Future Enhancement
- Could add free trial (1 template visible)
- Could add paywall modal for free users

---

## 🔮 Future Enhancements

### Short-term
- [ ] Pre-fill with calculation data
- [ ] Add more templates (5-10 total)
- [ ] Template categories (negotiation, acceptance, rejection)

### Medium-term
- [ ] Customize templates (user edits)
- [ ] Save favorite templates
- [ ] Track which templates work best
- [ ] Generate custom template based on calculation

### Long-term
- [ ] AI-powered template generation
- [ ] Personalization based on user history
- [ ] A/B test templates
- [ ] Template effectiveness analytics

---

## 💻 Code Structure

```jsx
EmailTemplates
├── Props (isOpen, onClose, calculationData)
├── State (copiedIndex)
├── templates array (3 templates)
├── handleCopy function
├── highlightPlaceholders function
│
└── Render (if isOpen):
    ├── Overlay (click to close)
    └── Modal
        ├── Header (title, close button)
        ├── Content (scrollable)
        │   ├── Template 1
        │   ├── Template 2
        │   ├── Template 3
        │   └── How to Use guide
        └── Footer (close button)
```

---

## 🎯 Success Metrics

### User Engagement
- Templates opened per user
- Templates copied per user
- Most popular template
- Time spent reading

### Conversion Impact
- Negotiation success rate (survey)
- Average rate increase (self-reported)
- User testimonials

### Feature Adoption
- % of Pro users who use templates
- Frequency of use
- Return rate

---

## 🔗 Integration Points

### Dashboard
```jsx
// Quick Actions section
<button onClick={() => setIsEmailTemplatesOpen(true)}>
  Email Templates
</button>

// Modal component
<EmailTemplates 
  isOpen={isEmailTemplatesOpen}
  onClose={() => setIsEmailTemplatesOpen(false)}
/>
```

### Future: Pre-fill with Data
```jsx
<EmailTemplates 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  calculationData={{
    rate: calculation.average,
    platform: formData.platform,
    contentType: formData.contentType
  }}
/>
```

---

## 📚 Template Content Guidelines

### Good Template Characteristics
- ✅ Professional tone
- ✅ Clear structure
- ✅ Specific ask
- ✅ Provides value
- ✅ Easy to customize

### Avoid
- ❌ Too aggressive
- ❌ Too apologetic
- ❌ Too vague
- ❌ Too long

---

## 🎨 Accessibility

### Keyboard
- Tab through buttons
- Enter to copy
- ESC to close (future)

### Screen Readers
- Modal announced when opened
- Templates read in order
- Copy success announced

### Focus Management
- Focus trapped in modal
- Returns to trigger on close

---

## 🐛 Error Handling

### Clipboard API Not Available
```javascript
.catch(err => {
  console.error('Failed to copy:', err)
  alert('Failed to copy to clipboard')
})
```

**Fallback**: Show alert with instructions to manually copy

### Browser Doesn't Support Clipboard API
**Rare**: Most modern browsers support it  
**Fallback**: Show error message

---

## 💡 Best Practices Implemented

### UX
✅ One-click copy  
✅ Visual feedback (Copied!)  
✅ Clear instructions  
✅ Professional templates

### Code
✅ Clean component structure  
✅ Reusable function (highlightPlaceholders)  
✅ Error handling  
✅ Timeout cleanup

### Design
✅ Consistent with app design  
✅ Responsive  
✅ Accessible  
✅ Professional

---

## 📊 Stats

**File**: `src/components/Premium/EmailTemplates.jsx`  
**Lines**: 200+  
**Templates**: 3  
**Features**: Copy to clipboard, highlighting, modal

---

## 🚀 Usage in App

### Current
- Dashboard > Quick Actions > "Email Templates"
- Opens modal with 3 templates
- Copy and use

### Future
- Calculator results > "Email This Rate"
- Pre-filled with calculation data
- One-click to open with context

---

## 🎉 Impact

### For Users
✅ Professional templates ready to use  
✅ Save time writing emails  
✅ Better negotiation language  
✅ More confident in outreach

### For Product
✅ Premium feature differentiation  
✅ Adds value to Pro plan  
✅ User engagement  
✅ Feature stickiness

---

**Status**: ✅ **EMAIL TEMPLATES COMPLETE**

Professional email templates with copy-to-clipboard functionality!

**Next**: Add more templates or customize based on calculation data.
