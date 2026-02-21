import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { PageGradient } from '../components/Layout/PageGradient'
import { supabase } from '../lib/supabase'

function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard')
    }
  }, [user, authLoading, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Succès : redirection forcée, le AuthContext prendra le relais sur la page suivante
      window.location.href = '/dashboard'
    } catch (err) {
      console.error('Error logging in:', err)
      setError(err?.message || t('auth.common.error_generic'))
      setLoading(false)
    }
  }

  const handleResendConfirmation = async () => {
    setResendMessage('')

    if (!email) {
      setResendMessage(t('auth.login.resend_enter_email'))
      return
    }

    setResending(true)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      })

      if (error) {
        console.error('Resend confirmation error:', error)
        setResendMessage(error.message || t('auth.login.resend_error'))
      } else {
        setResendMessage(t('auth.login.resend_success'))
      }
    } catch (err) {
      console.error('Unexpected resend confirmation error:', err)
      setResendMessage(t('auth.login.resend_error_unexpected'))
    } finally {
      setResending(false)
    }
  }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-600">{t('auth.common.loading')}</p>
        </div>
      </div>
    )
  }

  // Don't show login form if user is logged in (will redirect)
  if (user) {
    return null
  }

  const isEmailNotConfirmed =
    typeof error === 'string' &&
    error.toLowerCase().includes('email not confirmed')

  return (
    <PageGradient>
      <Helmet>
        <title>{t('auth.login.meta_title')}</title>
        <meta name="description" content={t('auth.login.meta_description')} />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('auth.login.title')}
              </h1>
              <p className="text-gray-600">
                {t('auth.login.subtitle')}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              {isEmailNotConfirmed && (
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleResendConfirmation}
                    disabled={resending}
                    className="text-xs font-medium text-red-700 hover:text-red-900 underline disabled:opacity-60 disabled:no-underline"
                  >
                    {resending
                      ? t('auth.login.resend_btn_loading')
                      : t('auth.login.resend_btn')}
                  </button>
                  {resendMessage && (
                    <p className="mt-1 text-xs text-red-700">
                      {resendMessage}
                    </p>
                  )}
                </div>
              )}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.common.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder={t('auth.common.placeholder_email')}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.common.password')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    placeholder={t('auth.common.placeholder_password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                >
                  {t('auth.login.forgot_password')}
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('auth.login.submitting')}
                  </>
                ) : (
                  <>
                    {t('auth.login.submit')}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">{t('auth.common.or')}</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-gray-600">
                {t('auth.login.no_account')}{' '}
                <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
                  {t('auth.login.link_signup')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageGradient>
  )
}

export default Login
