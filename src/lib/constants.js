// 1. PLATFORMS
export const PLATFORMS = [
  { value: 'youtube', label: 'YouTube' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'tiktok', label: 'TikTok' },
  { value: 'podcast', label: 'Podcast' },
  { value: 'twitch', label: 'Twitch' },
  { value: 'newsletter', label: 'Newsletter' },
];

// 1b. PLATFORM MULTIPLIERS (relative value per view)
export const PLATFORM_MULTIPLIERS = {
  youtube: 1.0,      // reference
  instagram: 0.8,
  tiktok: 0.6,
  twitch: 0.9,
  twitter: 0.5,
  linkedin: 1.2,
  newsletter: 1.5,
  ugc: 0.7,
};

// 2. NICHES avec CPM en USD
export const NICHES = [
  { value: 'finance', label: 'Finance', cpm: 40 },
  { value: 'tech', label: 'Tech', cpm: 27 },
  { value: 'business', label: 'Business', cpm: 27 },
  { value: 'health', label: 'Health & Fitness', cpm: 22 },
  { value: 'education', label: 'Education', cpm: 20 },
  { value: 'beauty', label: 'Beauty', cpm: 17 },
  { value: 'lifestyle', label: 'Lifestyle', cpm: 15 },
  { value: 'food', label: 'Food & Cooking', cpm: 13 },
  { value: 'gaming', label: 'Gaming', cpm: 10 },
  { value: 'entertainment', label: 'Entertainment', cpm: 8 },
];

// 3. SIZE MULTIPLIER - selon le nombre d'abonnés
export const SIZE_BRACKETS = [
  { max: 10000, multiplier: 1.2, label: 'Nano (< 10k)' },
  { max: 100000, multiplier: 1.0, label: 'Micro (10k - 100k)' },
  { max: 500000, multiplier: 0.9, label: 'Mid (100k - 500k)' },
  { max: 1000000, multiplier: 0.8, label: 'Macro (500k - 1M)' },
  { max: Infinity, multiplier: 0.85, label: 'Mega (1M+)' },
];

// 4. CONTENT TYPE MULTIPLIER
export const CONTENT_TYPES = [
  { value: 'mention', label: 'Quick Mention (30-60 sec)', multiplier: 1.0 },
  { value: 'integration', label: 'Integration (1-2 min)', multiplier: 1.5 },
  { value: 'dedicated', label: 'Dedicated Video', multiplier: 2.5 },
  { value: 'shorts', label: 'Shorts / Reels', multiplier: 0.5 },
  { value: 'story', label: 'Story (24h)', multiplier: 0.3 },
  { value: 'written_post', label: 'Written Post', multiplier: 0.5 },
];

// 5. ENGAGEMENT MULTIPLIER
export const ENGAGEMENT_BRACKETS = [
  { max: 2, multiplier: 0.7, label: 'Low (< 2%)' },
  { max: 5, multiplier: 1.0, label: 'Average (2-5%)' },
  { max: 8, multiplier: 1.3, label: 'Good (5-8%)' },
  { max: Infinity, multiplier: 1.5, label: 'Excellent (8%+)' },
];

// 6. COMPANY SIZE MULTIPLIER
export const COMPANY_SIZES = [
  { 
    value: 'startup', 
    label: 'Startup / Small Business', 
    multiplier: 0.7,
    advice: 'Small companies have limited budgets. Consider offering a package deal or payment terms.',
  },
  { 
    value: 'medium', 
    label: 'Medium Company', 
    multiplier: 1.0,
    advice: 'Mid-size companies often have decent marketing budgets. This is fair negotiation ground.',
  },
  { 
    value: 'large', 
    label: 'Large Company', 
    multiplier: 1.2,
    advice: 'Large companies expect premium rates. Don\'t undersell yourself.',
  },
  { 
    value: 'enterprise', 
    label: 'Enterprise / Major Brand', 
    multiplier: 1.5,
    advice: 'Enterprise brands have significant budgets. Push for your maximum rate and ask for additional perks (usage rights, exclusivity bonus).',
  },
];

// 7. AUDIENCE LOCATION MULTIPLIER
export const AUDIENCE_LOCATIONS = [
  { 
    value: 'us', 
    label: 'Mostly USA', 
    multiplier: 1.0,
    advice: 'US audiences command premium rates. Don\'t undersell.',
  },
  { 
    value: 'uk_ca_au', 
    label: 'Mostly UK / Canada / Australia', 
    multiplier: 0.85,
    advice: 'English-speaking markets with strong purchasing power. Rates are slightly below US.',
  },
  { 
    value: 'western_eu', 
    label: 'Mostly Western Europe', 
    multiplier: 0.85,
    advice: 'European rates are slightly lower than US. Factor this into negotiations.',
  },
  { 
    value: 'eastern_eu', 
    label: 'Mostly Eastern Europe', 
    multiplier: 0.5,
    advice: 'Lower rates due to purchasing power differences. Consider volume deals.',
  },
  { 
    value: 'latam', 
    label: 'Mostly Latin America', 
    multiplier: 0.4,
    advice: 'LATAM rates are lower, but the market is growing fast. Local brands may pay more.',
  },
  { 
    value: 'sea_india', 
    label: 'Mostly India / Southeast Asia', 
    multiplier: 0.2,
    advice: 'Rates for this region are lower, but massive volume can compensate. Focus on local brands.',
  },
  { 
    value: 'mixed', 
    label: 'Mixed / Global Audience', 
    multiplier: 0.6,
    advice: 'Mixed audiences typically get mid-range rates. Consider segmenting your pitch by region.',
  },
];

// 8. VERDICT CONFIG (4 niveaux)
export const VERDICT_THRESHOLDS = {
  WAY_TOO_LOW: 0.50,
  TOO_LOW: 0.75,
  ACCEPTABLE: 0.95,
  // >= 0.95 = GOOD
};

export const VERDICT_CONFIG = {
  WAY_TOO_LOW: {
    key: 'WAY_TOO_LOW',
    color: 'verdict-way-too-low',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200',
    icon: 'XCircle',
    title: 'Way Too Low',
    subtitle: 'This offer is insulting. Don\'t even counter.',
  },
  TOO_LOW: {
    key: 'TOO_LOW',
    color: 'verdict-too-low',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200',
    icon: 'AlertTriangle',
    title: 'Too Low',
    subtitle: 'Significantly below market. Negotiate hard.',
  },
  ACCEPTABLE: {
    key: 'ACCEPTABLE',
    color: 'verdict-acceptable',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200',
    icon: 'AlertCircle',
    title: 'Acceptable',
    subtitle: 'Slightly below market. Room to negotiate.',
  },
  GOOD: {
    key: 'GOOD',
    color: 'verdict-good',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200',
    icon: 'CheckCircle',
    title: 'Good Deal',
    subtitle: 'Fair market value. You can accept.',
  },
};

// 9. TWITCH METRICS
export const TWITCH_METRICS = {
  averageViewers: { 
    label: 'Average Concurrent Viewers', 
    helper: 'Average viewers during stream' 
  },
  hoursStreamed: { 
    label: 'Hours Streamed/Month' 
  },
  followers: { 
    label: 'Followers' 
  },
};

// 10. TWITCH CONTENT TYPES
export const TWITCH_CONTENT_TYPES = [
  { value: 'mention', label: 'Quick Mention', multiplier: 0.5 },
  { value: 'segment', label: 'Dedicated Segment (15-30 min)', multiplier: 1.0 },
  { value: 'full_stream', label: 'Full Sponsored Stream', multiplier: 2.5 },
  { value: 'series', label: 'Multi-Stream Series', multiplier: 4.0 },
];

// 11. CAMPAIGN TYPES
export const CAMPAIGN_TYPES = [
  { value: 'product_launch', label: 'Product Launch', multiplier: 1.2 },
  { value: 'awareness', label: 'Brand Awareness', multiplier: 1.0 },
  { value: 'seasonal', label: 'Seasonal/Promo', multiplier: 0.9 },
  { value: 'ongoing', label: 'Ongoing Partnership', multiplier: 1.3 },
];

// 12. PARTNERSHIP DURATION
export const PARTNERSHIP_DURATION = [
  { value: 'one_time', label: 'One-time', multiplier: 1.0 },
  { value: '3_months', label: '3 months', multiplier: 1.15 },
  { value: '6_months', label: '6 months', multiplier: 1.25 },
  { value: '1_year', label: '1 year', multiplier: 1.4 },
];

// 13. EXCLUSIVITY OPTIONS
export const EXCLUSIVITY_OPTIONS = [
  { value: 'none', label: 'No exclusivity', multiplier: 1.0 },
  { value: 'category', label: 'Category exclusivity (30 days)', multiplier: 1.3 },
  { value: 'full', label: 'Full exclusivity (30 days)', multiplier: 1.5 },
];

// 14. USAGE RIGHTS
export const USAGE_RIGHTS = [
  { value: 'organic_only', label: 'Organic only (your channels)', multiplier: 1.0 },
  { value: 'brand_socials', label: '+ Brand social media', multiplier: 1.3 },
  { value: 'paid_ads', label: '+ Paid advertising', multiplier: 1.8 },
  { value: 'full', label: 'Full rights (TV, print, etc.)', multiplier: 2.5 },
];
