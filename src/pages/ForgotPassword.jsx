import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Mail, ArrowLeft } from 'lucide-react'
import { PageGradient } from '../components/Layout/PageGradient'
import { supabase } from '../lib/supabase'
import { SITE_URL } from '../lib/appConfig'

function ForgotPassword() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (!supabase) {
        setError(t('auth.common.error_generic'))
        setLoading(false)
        return
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${SITE_URL}/reset-password`,
      })
      if (error) throw error
      setSuccess(true)
    } catch (err) {
      console.error('Reset password request error:', err)
      setError(err?.message || t('auth.common.error_generic'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageGradient>
      <Helmet>
        <title>{t('auth.forgot_password.meta_title')}</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('auth.forgot_password.title')}
              </h1>
              <p className="text-gray-600">
                {t('auth.forgot_password.subtitle')}
              </p>
            </div>

            {success ? (
              <>
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-green-700">
                    {t('auth.forgot_password.success_msg')}
                  </p>
                </div>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
                >
                  <ArrowLeft size={20} />
                  {t('auth.forgot_password.back_to_login')}
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
                    <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('auth.common.email')}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail size={20} className="text-gray-400" />
                      </div>
                      <input
                        id="forgot-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder={t('auth.common.placeholder_email')}
                      />
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
                        {t('auth.forgot_password.submitting')}
                      </>
                    ) : (
                      t('auth.forgot_password.submit_btn')
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                  >
                    <ArrowLeft size={18} />
                    {t('auth.forgot_password.back_to_login')}
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

export default ForgotPassword
