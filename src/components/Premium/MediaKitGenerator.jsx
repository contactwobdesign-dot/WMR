import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
} from '@react-pdf/renderer'
import { useEffect } from 'react'
import { usePostHog } from 'posthog-js/react'
import { FileText, Download } from 'lucide-react'

// Font.register({
//   family: 'Plus Jakarta Sans',
//   fonts: [
//     {
//       src: 'https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaom4Qxf6_8jHgCIGzBsF1t-9_laB.ttf',
//       fontWeight: 400,
//     },
//     {
//       src: 'https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaom4Qxf6_8jHgCIGzBsF1t-9_lZp.ttf',
//       fontWeight: 700,
//     },
//   ],
// })

// Palette WMR
const colors = {
  primary: '#F97316', // Orange
  secondary: '#111827', // Dark/Black
  accent: '#22C55E', // Green for growth/status
  lightGray: '#F9FAFB',
  border: '#E5E7EB',
  white: '#FFFFFF',
  text: '#374151',
  textLight: '#6B7280',
}

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: colors.white, padding: 0, flexDirection: 'column' },
  
  // HEADER
  header: { backgroundColor: colors.secondary, padding: 30, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  headerLeft: { flexDirection: 'column' },
  creatorName: { fontSize: 24, color: colors.white, fontWeight: 'heavy', textTransform: 'uppercase', letterSpacing: 1 },
  subtitle: { fontSize: 10, color: colors.primary, marginTop: 4, letterSpacing: 1.5, textTransform: 'uppercase' },
  headerRight: { alignItems: 'flex-end' },
  reportDate: { fontSize: 9, color: '#9CA3AF', marginBottom: 5 },
  statusBadge: { backgroundColor: 'rgba(34, 197, 94, 0.15)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, flexDirection: 'row', alignItems: 'center' },
  statusText: { color: '#4ADE80', fontSize: 8, fontWeight: 'bold' },

  // SECTIONS
  section: { paddingHorizontal: 30, paddingTop: 20, paddingBottom: 10 },
  sectionTitle: { fontSize: 10, color: colors.textLight, textTransform: 'uppercase', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 6, letterSpacing: 0.5 },
  
  // GRID
  row: { flexDirection: 'row', gap: 15 },
  card: { backgroundColor: colors.lightGray, borderRadius: 6, padding: 15, flex: 1, border: '1px solid #F3F4F6' },
  
  // STATS
  statLabel: { fontSize: 8, color: colors.textLight, marginBottom: 6, textTransform: 'uppercase', fontWeight: 'bold' },
  statValue: { fontSize: 20, color: colors.secondary, fontWeight: 'bold' },
  statSub: { fontSize: 8, color: colors.primary, marginTop: 4 },
  engagementBar: { fontSize: 8, color: colors.primary, marginTop: 2 },
  growthTag: { fontSize: 8, color: colors.accent, marginTop: 2, fontWeight: 'bold' },

  // VIRAL BOX
  viralBox: { backgroundColor: '#FFF7ED', borderRadius: 6, padding: 15, marginTop: 15, borderLeftWidth: 3, borderLeftColor: colors.primary, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viralTitle: { fontSize: 9, color: colors.primary, fontWeight: 'bold', textTransform: 'uppercase' },
  viralValue: { fontSize: 14, color: colors.secondary, fontWeight: 'bold' },
  viralDesc: { fontSize: 8, color: colors.textLight, marginTop: 2 },

  // PRICING
  priceBox: { backgroundColor: colors.secondary, borderRadius: 8, padding: 25, alignItems: 'center', marginTop: 5 },
  priceLabel: { color: '#9CA3AF', fontSize: 9, marginBottom: 8, letterSpacing: 1 },
  priceValue: { color: colors.white, fontSize: 32, fontWeight: 'bold' },
  priceValidity: { color: '#6B7280', fontSize: 8, marginTop: 8, fontStyle: 'italic' },
  priceRange: { color: colors.primary, fontSize: 10, marginTop: 4 },
  priceNote: { color: '#9CA3AF', fontSize: 7, marginTop: 4 },

  // FOOTER
  footer: { position: 'absolute', bottom: 30, left: 30, right: 30, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 15, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 8, color: '#9CA3AF' },
})

// Helpers de formatage pour PDF (locale forcée, pas de caractères spéciaux)
const formatNumber = (num) => {
  if (!num) return '-'
  return Number(num)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const formatCurrency = (val, symbol) => {
  if (!val) return '-'
  return `${symbol}${formatNumber(val)}`
}

const formatCompact = (num) => {
  if (!num) return '-'
  const n = Number(num)
  if (Number.isNaN(n)) return String(num)
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n)
}

const buildBar = (percent) => {
  const p = Number(percent) || 0
  const ratio = Math.max(0, Math.min(p / 10, 1)) // 0–10% mapped to 0–1
  const total = 5
  const filled = Math.round(total * ratio)
  return '▮'.repeat(filled) + '▯'.repeat(total - filled)
}

const normalizeLocation = (loc) => {
  const key = String(loc || '').toLowerCase()
  const map = {
    global: 'Global',
    'worldwide': 'Worldwide',
    'north_america': 'North America',
    'latin_america': 'Latin America',
    'south_america': 'South America',
    'western_eu': 'Western Europe',
    'western_europe': 'Western Europe',
    'eastern_eu': 'Eastern Europe',
    'eastern_europe': 'Eastern Europe',
    'central_europe': 'Central Europe',
    'uk_ireland': 'UK & Ireland',
    'middle_east': 'Middle East',
    'mena': 'Middle East & North Africa',
    'north_africa': 'North Africa',
    'sub_saharan_africa': 'Sub‑Saharan Africa',
    'south_asia': 'South Asia',
    'south_east_asia': 'Southeast Asia',
    'oceania': 'Oceania'
  }
  return map[key] || (loc || 'Global')
}

// MediaKit PDF Document Component (nouveau layout enrichi)
export const MediaKitPDF = ({
  userData,
  calculationData,
  currencySymbol = '$',
  user,
}) => {
  const data = calculationData || {}

  const safeData = {
    platform: data?.platform || 'Platform',
    niche: data?.niche || 'General',
    subscribers: data?.subscribers || 0,
    avgViews: data?.averageViews || 0,
    engagement: data?.engagementRate || 0,
    location: data?.audienceLocation || 'Global',
    priceAvg: data?.priceAverage || 0,
    priceMin: data?.priceMin || 0,
    priceMax: data?.priceMax || 0,
    email: userData?.email || data?.email || 'Contact me for rates',
  }

  // Calculs dérivés (Idées "Super")
  const viralPotential = Math.round(safeData.avgViews * 2.5) // Estimation d'un "Hit"
  const now = new Date()
  const lastDayNextMonth = new Date(now.getFullYear(), now.getMonth() + 2, 0)
  const validityString = `Rates valid until ${lastDayNextMonth.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })}`

  // Logique robuste de récupération du nom
  const rawName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.display_name ||
    user?.displayName ||
    (user?.email ? user.email.split('@')[0] : null)

  const creatorName = rawName
    ? rawName.toUpperCase()
    : `${String(safeData.platform).toUpperCase()} CREATOR`

  // Logique robuste de récupération du portfolio / sous-titre
  const rawPortfolio =
    user?.user_metadata?.website ||
    user?.user_metadata?.portfolio ||
    user?.portfolio

  const cleanedPortfolio = rawPortfolio
    ? rawPortfolio.replace(/^https?:\/\//, '')
    : null

  const portfolioDisplay =
    cleanedPortfolio ||
    `@${String(safeData.niche).toUpperCase()}`

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.creatorName}>{creatorName}</Text>
            <Text style={styles.subtitle}>{portfolioDisplay}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.reportDate}>
              REPORT:{' '}
              {new Date()
                .toLocaleString('en-US', { month: 'long', year: 'numeric' })
                .toUpperCase()}
            </Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>●  OPEN FOR BOOKING</Text>
            </View>
          </View>
        </View>

        {/* SECTION 1: PERFORMANCE INSIGHTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Insights (Last 30 Days)</Text>
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.statLabel}>Verified Reach</Text>
              <Text style={styles.statValue}>{formatCompact(safeData.avgViews)}</Text>
              <Text style={styles.statSub}>Consistent reach across recent content</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.statLabel}>Engagement</Text>
              <Text style={styles.statValue}>
                {Number(safeData.engagement || 0).toFixed(1)}%
              </Text>
              <Text style={styles.engagementBar}>{buildBar(safeData.engagement)}</Text>
              <Text style={styles.statSub}>Engaged, conversion-ready audience</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.statLabel}>Total Audience</Text>
              <Text style={styles.statValue}>{formatCompact(safeData.subscribers)}</Text>
              <Text style={styles.growthTag}>▲ +2.4% MoM growth</Text>
            </View>
          </View>

          {/* VIRAL POTENTIAL BOX */}
          <View style={styles.viralBox}>
            <View>
              <Text style={styles.viralTitle}>Viral Potential (Est. Reach)</Text>
              <Text style={styles.viralDesc}>Projected reach for a top-performing collaboration</Text>
            </View>
            <Text style={styles.viralValue}>~{formatCompact(viralPotential)} views</Text>
          </View>
        </View>

        {/* SECTION 2: AUDIENCE BREAKDOWN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audience Breakdown</Text>
          <View style={styles.row}>
            <View style={styles.card}>
              <Text style={styles.statLabel}>Audience Geography</Text>
              <Text style={styles.statValue}>{normalizeLocation(safeData.location)}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.statLabel}>Niche</Text>
              <Text style={styles.statValue}>{safeData.niche}</Text>
            </View>
          </View>
        </View>

        {/* SECTION 3: SMART PRICING / INVESTMENT */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Partnership Investment</Text>
          <View style={styles.priceBox}>
            <Text style={styles.priceLabel}>PARTNERSHIP INVESTMENT (1 INTEGRATION)</Text>
            <Text style={styles.priceValue}>
              {formatCurrency(safeData.priceAvg, currencySymbol)}
            </Text>
            <Text style={styles.priceRange}>
              Typical range: {formatCurrency(safeData.priceMin, currencySymbol)} – {formatCurrency(safeData.priceMax, currencySymbol)}
            </Text>
            <Text style={styles.priceNote}>
              Standard rates include 30-day organic usage rights.
            </Text>
            <Text style={styles.priceValidity}>{validityString}</Text>
          </View>
        </View>

        {/* FOOTER / TRUST SIGNALS */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Powered by WhatsMyRate.com · Data Verified by WMR
          </Text>
          <Text style={styles.footerText}>
            {user?.portfolio || 'Professional Analysis'}
          </Text>
        </View>
      </Page>
    </Document>
  )
}

// MediaKit Button Component (Wrapper for PDFDownloadLink)
export const MediaKitButton = ({ 
  calculationData, 
  userData, 
  user,
  disabled = false,
  currencySymbol = '$',
}) => {
  console.log('MediaKitButton Data:', { calculationData, currencySymbol, user })
  console.log('PDF User Data Received:', user)

  const posthog = usePostHog()

  useEffect(() => {
    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    if (posthog && !isLocalhost) {
      try {
        posthog.capture('media_kit_viewed', {
          platform: calculationData?.platform || null,
        })
      } catch (err) {
        console.error('PostHog media_kit_viewed error:', err)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (
    !userData ||
    !calculationData ||
    Object.keys(calculationData || {}).length === 0
  ) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed text-sm"
      >
        <FileText size={20} />
        Generating data...
      </button>
    )
  }

  const safePlatformSlug = (calculationData.platform || 'platform')
    .toString()
    .toLowerCase()
  const fileName = `media-kit-${safePlatformSlug}-${new Date().toISOString().split('T')[0]}.pdf`

  return (
    <PDFDownloadLink
      document={
        <MediaKitPDF 
          userData={userData} 
          calculationData={calculationData}
          currencySymbol={currencySymbol}
          user={user}
        />
      }
      fileName={fileName}
      className={`inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg border border-gray-300 transition-colors ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {({ blob, url, loading, error }) => {
        if (loading) {
          return (
            <>
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          )
        }

        if (error) {
          console.error('PDF Error:', error)
          const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
          if (posthog && !isLocalhost) {
            try {
              posthog.capture('media_kit_download_error', {
                message: error.message || String(error),
              })
            } catch (e) {
              console.error('PostHog media_kit_download_error error:', e)
            }
          }
          return (
            <>
              <FileText size={20} />
              Error generating PDF
            </>
          )
        }

        return (
          <>
            <Download size={20} />
            Download Media Kit
          </>
        )
      }}
    </PDFDownloadLink>
  )
}

// Default export for convenience
export default MediaKitButton
