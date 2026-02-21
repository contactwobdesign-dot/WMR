import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: BRAND */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">WMR</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              {t('footer.tagline')}
            </p>
            <p className="text-sm text-gray-500">
              © 2025 WMR
            </p>
          </div>

          {/* Column 2: CALCULATORS */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.calculators')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/youtube-sponsorship-calculator" className="text-sm hover:text-white transition-colors">
                  {t('footer.youtube_calc')}
                </Link>
              </li>
              <li>
                <Link to="/instagram-sponsorship-calculator" className="text-sm hover:text-white transition-colors">
                  {t('footer.instagram_calc')}
                </Link>
              </li>
              <li>
                <Link to="/tiktok-sponsorship-calculator" className="text-sm hover:text-white transition-colors">
                  {t('footer.tiktok_calc')}
                </Link>
              </li>
              <li>
                <Link to="/twitch-sponsorship-calculator" className="text-sm hover:text-white transition-colors">
                  {t('footer.twitch_calc')}
                </Link>
              </li>
              <li>
                <Link to="/podcast-sponsorship-rates" className="text-sm hover:text-white transition-colors">
                  {t('footer.podcast_calc')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: RESOURCES */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/how-much-to-charge-sponsorship" className="text-sm hover:text-white transition-colors">
                  {t('footer.pricing_guide')}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm hover:text-white transition-colors">
                  {t('footer.pricing')}
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="text-sm hover:text-white transition-colors">
                  {t('footer.faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: LEGAL & SUPPORT */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-white transition-colors">
                  {t('footer.privacy_policy')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-white transition-colors">
                  {t('footer.terms_of_service')}
                </Link>
              </li>
              <li>
                <Link to="/legal" className="text-sm hover:text-white transition-colors">
                  {t('footer.legal_notice')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
