# 📊 Constants Summary

Complete overview of all calculation data in `/src/lib/constants.js`

## 🎯 Quick Stats

- **5 Platforms** supported
- **10 Niches** with CPM rates ($8 - $40)
- **5 Size brackets** (Nano to Mega)
- **4 Content types** (0.5x - 2.5x multipliers)
- **4 Engagement levels** (0.7x - 1.5x multipliers)
- **4 Company sizes** (0.7x - 1.5x multipliers)
- **7 Audience locations** (0.2x - 1.0x multipliers)
- **4 Verdict levels** (Way Too Low → Good Deal)

---

## 1️⃣ PLATFORMS

```javascript
YouTube, Instagram, TikTok, Podcast, Newsletter
```

---

## 2️⃣ NICHES (with CPM in USD)

| Rank | Niche | CPM | Use Case |
|------|-------|-----|----------|
| 1 | 💰 Finance | **$40** | Highest value niche |
| 2 | 💻 Tech | **$27** | SaaS, gadgets |
| 3 | 📊 Business | **$27** | B2B services |
| 4 | 🏃 Health & Fitness | **$22** | Wellness products |
| 5 | 📚 Education | **$20** | Courses, tools |
| 6 | 💄 Beauty | **$17** | Cosmetics |
| 7 | ✨ Lifestyle | **$15** | General lifestyle |
| 8 | 🍕 Food & Cooking | **$13** | Recipes, kitchenware |
| 9 | 🎮 Gaming | **$10** | Gaming gear |
| 10 | 🎬 Entertainment | **$8** | Lowest CPM |

---

## 3️⃣ SIZE BRACKETS

| Size | Range | Multiplier | Why? |
|------|-------|------------|------|
| 🟢 **Nano** | < 10k | **1.2x** | Hyper-engaged niche |
| 🔵 **Micro** | 10k - 100k | **1.0x** | Sweet spot (baseline) |
| 🟡 **Mid** | 100k - 500k | **0.9x** | Scaling efficiency |
| 🟠 **Macro** | 500k - 1M | **0.8x** | Volume discount |
| 🔴 **Mega** | 1M+ | **0.7x** | Maximum volume |

💡 **Why inverse?** Larger channels have lower per-view engagement and bulk pricing.

---

## 4️⃣ CONTENT TYPES

| Type | Multiplier | Duration | Example |
|------|------------|----------|---------|
| Shorts / Reels | **0.5x** | < 30 sec | Quick logo flash |
| Quick Mention | **1.0x** | 30-60 sec | "Thanks to X for sponsoring" |
| Integration | **1.5x** | 1-2 min | Product demo in video |
| Dedicated Video | **2.5x** | Full video | Entire video about product |

---

## 5️⃣ ENGAGEMENT BRACKETS

| Range | Multiplier | Quality |
|-------|------------|---------|
| < 2% | **0.7x** | 🔴 Low (dead audience) |
| 2-5% | **1.0x** | 🟡 Average (industry standard) |
| 5-8% | **1.3x** | 🟢 Good (engaged) |
| 8%+ | **1.5x** | ⭐ Excellent (highly engaged) |

💡 **Formula:** `Engagement % = (Likes + Comments) / Views × 100`

---

## 6️⃣ COMPANY SIZES

| Size | Multiplier | Advice |
|------|------------|--------|
| 🟢 Startup / Small | **0.7x** | Limited budget. Offer payment terms or package deals. |
| 🔵 Medium Company | **1.0x** | Decent budget. Fair negotiation ground. |
| 🟡 Large Company | **1.2x** | Premium budget. Don't undersell. |
| 🟠 Enterprise / Major Brand | **1.5x** | Huge budget. Push for max rate + perks (usage rights, exclusivity). |

---

## 7️⃣ AUDIENCE LOCATIONS

| Region | Multiplier | Purchasing Power | Strategy |
|--------|------------|------------------|----------|
| 🇺🇸 USA | **1.0x** | Premium | Don't undersell |
| 🇬🇧🇨🇦🇦🇺 UK/CA/AU | **0.85x** | Strong | Slightly below US |
| 🇪🇺 Western EU | **0.7x** | Good | 30% lower than US |
| 🇵🇱 Eastern EU | **0.5x** | Moderate | Consider volume deals |
| 🇧🇷 Latin America | **0.4x** | Growing | Focus on local brands |
| 🇮🇳 India/SEA | **0.2x** | Lower | Volume play, local brands |
| 🌍 Mixed/Global | **0.6x** | Average | Segment by region |

---

## 8️⃣ VERDICT SYSTEM (4 Levels)

### Thresholds

```javascript
Offered Amount / Fair Rate = Ratio

< 0.50  → Way Too Low
0.50-0.75 → Too Low
0.75-0.95 → Acceptable
≥ 0.95  → Good Deal
```

### Visual Guide

| Verdict | Ratio | Color | Icon | Message |
|---------|-------|-------|------|---------|
| 🔴 **Way Too Low** | < 50% | Red | ❌ XCircle | Insulting. Don't counter. |
| 🟠 **Too Low** | 50-75% | Orange | ⚠️ AlertTriangle | Below market. Negotiate hard. |
| 🟡 **Acceptable** | 75-95% | Yellow | ⚠️ AlertCircle | Slightly low. Room to negotiate. |
| 🟢 **Good Deal** | ≥ 95% | Green | ✅ CheckCircle | Fair value. You can accept. |

---

## 🧮 Calculation Formula

```javascript
Fair Rate = (
  Niche CPM ×
  Average Views ×
  Size Multiplier ×
  Content Type Multiplier ×
  Engagement Multiplier ×
  Company Size Multiplier ×
  Audience Location Multiplier
) / 1000
```

### Example Calculation

**Scenario:**
- Tech YouTuber (CPM: $27)
- 50,000 subscribers (Micro: 1.0x)
- 10,000 avg views
- Integration (1.5x)
- 6% engagement (Good: 1.3x)
- Large company (1.2x)
- USA audience (1.0x)

**Calculation:**
```
Fair Rate = (27 × 10,000 × 1.0 × 1.5 × 1.3 × 1.2 × 1.0) / 1000
         = (27 × 10,000 × 2.34) / 1000
         = 631,800 / 1000
         = $631.80
```

**Verdict:**
- If offered $300 → Ratio = 0.47 → 🔴 **Way Too Low**
- If offered $500 → Ratio = 0.79 → 🟡 **Acceptable**
- If offered $650 → Ratio = 1.03 → 🟢 **Good Deal**

---

## 📚 Files

All constants are defined in:
- **Main file:** `/src/lib/constants.js`
- **Documentation:** `/src/lib/README.md`
- **Examples:** `/src/lib/EXAMPLES.md`
- **This summary:** `/CONSTANTS_SUMMARY.md`

## 🚀 Usage

```javascript
import { 
  PLATFORMS,
  NICHES,
  SIZE_BRACKETS,
  CONTENT_TYPES,
  ENGAGEMENT_BRACKETS,
  COMPANY_SIZES,
  AUDIENCE_LOCATIONS,
  VERDICT_THRESHOLDS,
  VERDICT_CONFIG
} from '@/lib/constants'
```

Or import everything:
```javascript
import * as Constants from '@/lib/constants'
```

---

## 💡 Pro Tips

1. **Always round final rates** to nearest $10 or $50 for cleaner numbers
2. **Show the breakdown** to justify your rate to brands
3. **Use verdict colors** consistently across the UI
4. **Include advice text** from company sizes and locations
5. **Add tooltips** explaining each multiplier to educate creators
