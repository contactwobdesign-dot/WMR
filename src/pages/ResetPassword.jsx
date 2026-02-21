import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'
import { PageGradient } from '../components/Layout/PageGradient'

function ResetPassword() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, loading: authLoading, updatePassword } = useAuth()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  // If user is logged in (recovery session from email link), we allow form. Otherwise show "no token" after auth loaded.
  const hasValidSession = Boolean(user)

  useEffect(() => {
    if (!authLoading && !user && !success) {
      setError(t('auth.reset_password.no_token'))
    }
  }, [authLoading, user, success, t])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      setError(t('auth.signup.error_passwords_match'))
      return
    }
    if (password.length < 6) {
      setError(t('auth.signup.error_password_length'))
      return
    }
    setLoading(true)
    try {
      const { error } = await updatePassword(password)
      if (error) throw error
      setSuccess(true)
      setPassword('')
      setConfirmPassword('')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      console.error('Reset password error:', err)
      setError(err?.message || t('auth.common.error_generic'))
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4" />
          <p className="text-gray-600">{t('auth.common.loading')}</p>
        </div>
      </div>
    )
  }

  return (
    <PageGradient>
      <Helmet>
        <title>{t('auth.reset_password.meta_title')}</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('auth.reset_password.title')}
              </h1>
              <p className="text-gray-600">
                {t('auth.reset_password.subtitle')}
              </p>
            </div>

            {!hasValidSession && !success ? (
              <>
                <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    {error || t('auth.reset_password.no_token')}
                  </p>
                </div>
                <Link
                  to="/forgot-password"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  {t('auth.forgot_password.title')}
                  <ArrowRight size={20} />
                </Link>
              </>
            ) : success ? (
              <>
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">
                    {t('auth.reset_password.success_msg')}
                  </p>
                </div>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  {t('auth.reset_password.back_to_login')}
                  <ArrowRight size={20} />
                </Link>
              </>
            ) : (
              <>
                {error && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="reset-password" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.common.password')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        id="reset-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
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
                    <p className="mt-1 text-xs text-gray-500">
                      {t('auth.signup.hint_password')}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="reset-confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.signup.confirm_password')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock size={20} className="text-gray-400" />
                      </div>
                      <input
                        id="reset-confirm-password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder={t('auth.common.placeholder_confirm_password')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={20} className="text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {t('auth.reset_password.submitting')}
                      </>
                    ) : (
                      t('auth.reset_password.submit_btn')
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    {t('auth.reset_password.back_to_login')}
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </PageGradient>
  )
}

export default ResetPassword
