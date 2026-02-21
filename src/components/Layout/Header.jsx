import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth.jsx'
import { useNotifications } from '../../context/NotificationsContext'
import { User, ChevronDown, LayoutDashboard, Settings, LogOut, Menu, X, Globe } from 'lucide-react'
import NotificationDropdown from '../NotificationDropdown'

function Header() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { user, isPremium, signOut } = useAuth()
  const { notifications } = useNotifications()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const langMenuRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  // Close lang menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false)
      }
    }

    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLangMenuOpen])

  const handleSignOut = async () => {
    await signOut()
    setIsDropdownOpen(false)
    navigate('/')
  }

  // Home link destination based on user status
  const homeLink = user && isPremium() ? '/dashboard' : '/'

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || user?.email || ''

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* LEFT - Notifications (mobile only) + Navigation (desktop only) */}
          <div className="flex items-center gap-2 md:gap-6">
            <div className="block md:hidden">
              {user && <NotificationDropdown notifications={notifications} />}
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link 
                to={homeLink}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/pricing" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {t('nav.pricing')}
              </Link>
              <Link 
                to="/manifesto" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {t('nav.manifesto')}
              </Link>
            </nav>
            <div className="md:hidden w-10"></div>
          </div>

          {/* CENTER - Logo : Dashboard si Premium, Home sinon */}
          <Link to={homeLink} className="absolute left-1/2 -translate-x-1/2">
            <img 
              src={user && isPremium() ? "/WMRpro.png" : "/WMR.png"} 
              alt={t('header.logo_alt')} 
              className="h-12 w-auto"
            />
          </Link>

          {/* RIGHT - User Section */}
          <div className="flex items-center gap-1">
            {/* Notifications (à gauche du profil, uniquement si connecté) */}
            {user && (
              <div className="hidden md:block">
                <NotificationDropdown notifications={notifications} />
              </div>
            )}
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <User size={20} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      {displayName}
                    </span>
                    <ChevronDown 
                      size={16} 
                      className={`text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard size={18} className="text-gray-600" />
                        <span className="text-sm text-gray-700">{t('nav.dashboard')}</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings size={18} className="text-gray-600" />
                        <span className="text-sm text-gray-700">{t('nav.settings')}</span>
                      </Link>
                      <div className="border-t border-gray-200 my-2"></div>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={18} className="text-red-600" />
                        <span className="text-sm text-red-600">{t('nav.signOut')}</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-semibold text-base transition-colors"
                >
                  {t('nav.login')}
                </Link>
              )}
            </div>

            <div className="relative ml-4" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-2 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                aria-label={i18n.language === 'fr' ? 'Switch to English' : 'Passer en français'}
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase">{(i18n.language || 'fr').slice(0, 2)}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50">
                  <button
                    onClick={() => { i18n.changeLanguage('fr'); setIsLangMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${i18n.language === 'fr' || (i18n.language && i18n.language.startsWith('fr')) ? 'font-bold text-blue-600' : 'text-gray-700'}`}
                  >
                    Français (FR)
                  </button>
                  <button
                    onClick={() => { i18n.changeLanguage('en'); setIsLangMenuOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${i18n.language === 'en' || (i18n.language && i18n.language.startsWith('en')) ? 'font-bold text-blue-600' : 'text-gray-700'}`}
                  >
                    English (EN)
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={t('header.toggle_menu')}
            >
              {isMobileMenuOpen ? (
                <X size={24} className="text-gray-600" />
              ) : (
                <Menu size={24} className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link
                to={homeLink}
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/pricing"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.pricing')}
              </Link>
              <Link
                to="/manifesto"
                className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.manifesto')}
              </Link>
              
              {user ? (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="text-sm text-gray-500 px-2">
                    {t('nav.signedInAs')} <span className="font-medium text-gray-700">{displayName}</span>
                  </div>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <Link
                    to="/settings"
                    className="text-gray-700 hover:text-primary-600 transition-colors font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.settings')}
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut()
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-left text-red-600 hover:text-red-700 transition-colors font-medium py-2"
                  >
                    {t('nav.signOut')}
                  </button>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  <Link
                    to="/login"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-lg font-semibold text-center transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
