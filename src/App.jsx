import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Layout
import Layout from './components/Layout/Layout'
import ScrollToTop from './components/Utils/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'

// Pages principales
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Manifesto from './pages/Manifesto'
import FreeCalculator from './pages/FreeCalculator'
import PremiumCalculator from './pages/PremiumCalculator'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Contact from './pages/Contact'
import TermsOfService from './pages/Legal/TermsOfService'
import PrivacyPolicy from './pages/Legal/PrivacyPolicy'
import LegalNotice from './pages/Legal/LegalNotice'
import NotFound from './pages/NotFound'

// Pages SEO
import YouTubeSponsorshipCalculator from './pages/seo/YouTubeSponsorshipCalculator'
import InstagramSponsorshipCalculator from './pages/seo/InstagramSponsorshipCalculator'
import TikTokSponsorshipCalculator from './pages/seo/TikTokSponsorshipCalculator'
import TwitchSponsorshipCalculator from './pages/seo/TwitchSponsorshipCalculator'
import PodcastSponsorshipRates from './pages/seo/PodcastSponsorshipRates'
import HowMuchToChargeSponsorship from './pages/seo/HowMuchToChargeSponsorship'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Pages principales */}
            <Route index element={<Home />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="manifesto" element={<Manifesto />} />
            <Route path="calculator" element={<FreeCalculator />} />
            <Route path="premium-calculator" element={<PremiumCalculator />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="contact" element={<Contact />} />
            
            {/* Pages SEO */}
            <Route path="youtube-sponsorship-calculator" element={<YouTubeSponsorshipCalculator />} />
            <Route path="instagram-sponsorship-calculator" element={<InstagramSponsorshipCalculator />} />
            <Route path="tiktok-sponsorship-calculator" element={<TikTokSponsorshipCalculator />} />
            <Route path="twitch-sponsorship-calculator" element={<TwitchSponsorshipCalculator />} />
            <Route path="podcast-sponsorship-rates" element={<PodcastSponsorshipRates />} />
            <Route path="how-much-to-charge-sponsorship" element={<HowMuchToChargeSponsorship />} />
            
            {/* Pages légales */}
            <Route path="terms" element={<TermsOfService />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="legal" element={<LegalNotice />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
