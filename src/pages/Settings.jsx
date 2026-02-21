import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Lock, Mail, Shield, CreditCard, Sparkles, BadgeCheck, Crown, Globe, User, AlertTriangle, FileText, MessageCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { useCurrency } from '../context/CurrencyContext.jsx'
import { PageGradient } from '../components/Layout/PageGradient'
import LegalProfileForm from '../components/LegalProfileForm'
import { supabase } from '../lib/supabase'

const CURRENCY_OPTIONS = [
  { code: 'USD', label: 'USD ($)' },
  { code: 'EUR', label: 'EUR (€)' },
  { code: 'GBP', label: 'GBP (£)' },
  { code: 'CAD', label: 'CAD (C$)' },
  { code: 'AUD', label: 'AUD (A$)' },
]

function Settings() {
  const { t } = useTranslation()
  const { user, subscription, updatePassword, updateProfile, manageSubscription, signOut } = useAuth()
  const { currency, setCurrency } = useCurrency()

  const [fullName, setFullName] = useState('')
  const [website, setWebsite] = useState('')
  const [profileLoading, setProfileLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false)

  const isPro = subscription?.plan === 'pro'

  const handleDeleteAccount = async () => {
    if (!window.confirm(t('settings.modals.delete_confirm_prompt'))) {
      return
    }
    setDeleteAccountLoading(true)
    try {
      const { error } = await supabase.rpc('delete_own_account')
      if (error) throw error
      await signOut()
      window.location.href = '/'
    } catch (err) {
      console.error('Erreur suppression:', err)
      alert(t('settings.modals.delete_error', { message: err?.message || err }))
    } finally {
      setDeleteAccountLoading(false)
    }
  }

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          priceId: import.meta.env.VITE_STRIPE_PRICE_MONTHLY,
          email: user?.email,
          origin: window.location.origin,
        },
      })

      if (error) throw error
      if (!data?.url) throw new Error('No checkout URL returned')

      window.location.href = data.url
    } catch (err) {
      console.error('Payment error:', err)
      alert(t('alerts.checkout_failed_prefix') + ': ' + (err?.message || err))
      setCheckoutLoading(false)
    }
  }

  useEffect(() => {
    if (user?.user_metadata) {
      setFullName(user.user_metadata.full_name || '')
      setWebsite(user.user_metadata.website || '')
    }
  }, [user])

  const handleCurrencyChange = async (e) => {
    const newCurrency = e.target.value
    // Mise à jour immédiate de l'UI
    setCurrency(newCurrency)

    // Sauvegarde dans le profil utilisateur (supabase)
    try {
      const { error } = await updateProfile({ currency: newCurrency })
      if (error) {
        console.error('Failed to save currency preference', error)
      } else {
        console.log('Currency saved:', newCurrency)
      }
    } catch (error) {
      console.error('Failed to save currency preference', error)
    }
  }

  const handlePasswordUpdate = async (e) => {
    e.preventDefault()
    setSuccessMessage('')
    setErrorMessage('')

    if (!newPassword || !confirmPassword) {
      setErrorMessage(t('settings.security.error_fill_both'))
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(t('settings.security.error_no_match'))
      return
    }

    if (newPassword.length < 6) {
      setErrorMessage(t('settings.security.error_min_length'))
      return
    }

    setLoading(true)
    try {
      const { error } = await updatePassword(newPassword)
      if (error) {
        console.error('Error updating password:', error)
        setErrorMessage(error.message || t('settings.security.error_update'))
      } else {
        setSuccessMessage(t('settings.security.success_msg'))
        setNewPassword('')
        setConfirmPassword('')
      }
    } catch (err) {
      console.error('Unexpected error while updating password:', err)
      setErrorMessage(t('settings.security.error_unexpected'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('settings.page_title')} | WMR</title>
      </Helmet>

      <PageGradient>
        <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('settings.page_title')}
            </h1>
            <p className="mt-2 text-gray-600">
              {t('settings.page_subtitle')}
            </p>
          </div>

          {/* Personal Details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-violet-50 flex items-center justify-center">
                <User className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('settings.profile.title')}
                </h2>
                <p className="text-xs text-gray-500">
                  {t('settings.profile.subtitle')}
                </p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 max-w-2xl">
              <div>
                <label htmlFor="display-name" className="block text-xs font-medium text-gray-500 mb-2">
                  {t('settings.profile.display_name_label')}
                </label>
                <input
                  id="display-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('settings.profile.display_name_placeholder')}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm outline-none"
                />
              </div>
              <div>
                <label htmlFor="website" className="block text-xs font-medium text-gray-500 mb-2">
                  {t('settings.profile.website_label')}
                </label>
                <input
                  id="website"
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder={t('settings.profile.website_placeholder')}
                  className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm outline-none"
                />
              </div>
            </div>
            {profileError && (
              <p className="mt-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                {profileError}
              </p>
            )}
            {profileSuccess && (
              <p className="mt-3 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
                {profileSuccess}
              </p>
            )}
            <button
              type="button"
              onClick={async () => {
                setProfileSuccess('')
                setProfileError('')
                setProfileLoading(true)
                try {
                  const { error } = await updateProfile({ fullName: fullName.trim() || undefined, website: website.trim() || undefined })
                  if (error) {
                    setProfileError(error.message || 'Failed to update profile.')
                  } else {
                    setProfileSuccess('Profile updated successfully.')
                  }
                } catch (err) {
                  setProfileError('An unexpected error occurred.')
                } finally {
                  setProfileLoading(false)
                }
              }}
              disabled={profileLoading}
              className="mt-4 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm transition-colors"
            >
              {profileLoading ? t('settings.profile.saving') : t('settings.profile.save_btn')}
            </button>
          </div>

          {/* Regional Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
                <Globe className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('settings.regional.title')}
                </h2>
                <p className="text-xs text-gray-500">
                  {t('settings.regional.subtitle')}
                </p>
              </div>
            </div>
            <div>
              <label htmlFor="display-currency" className="block text-xs font-medium text-gray-500 mb-2">
                {t('settings.regional.currency_label')}
              </label>
              <select
                id="display-currency"
                value={currency}
                onChange={handleCurrencyChange}
                className="w-full max-w-xs px-3 py-2.5 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm outline-none"
              >
                {CURRENCY_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Informations Légales & Facturation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {t('settings.legal.title')}
                </h2>
                <p className="text-xs text-gray-500">
                  {t('settings.legal.subtitle')}
                </p>
              </div>
            </div>
            <div className="mb-6 rounded-xl bg-orange-50/90 border border-orange-200/70 px-4 py-3 text-sm text-gray-800 leading-relaxed">
              <strong className="text-gray-900">{t('settings.legal.disclaimer_title')}</strong>{' '}
              {t('settings.legal.disclaimer_text')}
            </div>
            <LegalProfileForm />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Profile & Security */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-indigo-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('settings.security.title')}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {t('settings.security.subtitle')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Email (read-only) */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">
                    {t('settings.security.email_label')}
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 text-sm cursor-not-allowed"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-gray-300">
                      <Lock className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Update password */}
                <form onSubmit={handlePasswordUpdate} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      {t('settings.security.password_section')}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {t('settings.security.new_password_label')}
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm outline-none"
                      placeholder={t('settings.security.new_password_placeholder')}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">
                      {t('settings.security.confirm_password_label')}
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm outline-none"
                      placeholder={t('settings.security.confirm_password_placeholder')}
                    />
                  </div>

                  {errorMessage && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-3 py-2">
                      {errorMessage}
                    </p>
                  )}
                  {successMessage && (
                    <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-md px-3 py-2">
                      {successMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm transition-colors w-full"
                  >
                    {loading ? t('settings.security.updating') : t('settings.security.update_btn')}
                  </button>
                </form>
              </div>
            </div>

            {/* Subscription & Billing */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('settings.subscription.title')}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {t('settings.subscription.subtitle')}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {t('settings.subscription.current_plan')}
                  </p>
                  <p className="text-sm text-gray-700">
                    {t('settings.subscription.plan_description', { plan: isPro ? t('settings.subscription.plan_pro') : t('settings.subscription.plan_free') })}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    isPro
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-gray-100 text-gray-700 border border-gray-200'
                  }`}
                >
                  {isPro ? (
                    <>
                      <Crown className="w-3 h-3" />
                      {t('settings.subscription.plan_pro')}
                    </>
                  ) : (
                    <>
                      <BadgeCheck className="w-3 h-3" />
                      {t('settings.subscription.plan_free')}
                    </>
                  )}
                </span>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 border border-dashed border-gray-200 rounded-lg px-3 py-2">
                {isPro ? t('settings.subscription.pro_managed') : t('settings.subscription.free_upgrade')}
              </div>

              {!isPro ? (
                <button
                  type="button"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="mt-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold w-full shadow-sm transition-colors bg-amber-500 text-white hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {checkoutLoading ? (
                    t('settings.subscription.loading')
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      {t('settings.subscription.upgrade_btn')}
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={manageSubscription}
                  className="mt-1 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold w-full shadow-sm transition-colors bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t('settings.subscription.manage_btn')}
                </button>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-sky-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {t('contact.title')}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {t('contact.subtitle')}
                  </p>
                </div>
              </div>
              <Link
                to="/contact"
                className="shrink-0 inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                {t('contact.form.submit_btn')}
              </Link>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50/80 p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-red-800">
                {t('settings.danger_zone.title')}
              </h2>
            </div>
            <p className="text-sm text-red-700/90 mb-4">
              {t('settings.danger_zone.warning')}
            </p>
            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={deleteAccountLoading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-red-700 border border-red-300 bg-white hover:bg-red-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {deleteAccountLoading ? t('settings.danger_zone.deleting') : t('settings.danger_zone.delete_account_btn')}
            </button>
          </div>
        </div>
      </PageGradient>
    </>
  )
}

export default Settings

