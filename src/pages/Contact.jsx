import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { PageGradient } from '../components/Layout/PageGradient'

function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [email, setEmail] = useState('')
  const [type, setType] = useState('other')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          email,
          subject: type,
          message,
        }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setStatus('error')
        return
      }
      setEmail('')
      setType('other')
      setMessage('')
      setStatus('success')
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>{t('contact.title')} | WMR</title>
      </Helmet>

      <PageGradient>
        <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-10 sm:py-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {t('contact.title')}
            </h1>
            <p className="text-gray-600 mb-6">
              {t('contact.subtitle')}
            </p>

            {status === 'success' && (
              <p className="text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm font-medium">
                {t('contact.form.success_msg')}
              </p>
            )}
            {status === 'error' && (
              <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm font-medium">
                {t('contact.form.error_msg')}
              </p>
            )}
            {(status === 'idle' || status === 'loading') && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.email_label')}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder={t('contact.form.email_label')}
                  />
                </div>

                <div>
                  <label htmlFor="contact-type" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.type_label')}
                  </label>
                  <select
                    id="contact-type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                  >
                    <option value="bug">{t('contact.form.type_bug')}</option>
                    <option value="feature">{t('contact.form.type_feature')}</option>
                    <option value="other">{t('contact.form.type_other')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.form.message_label')}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-y min-h-[120px]"
                    placeholder={t('contact.form.message_label')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-3 rounded-lg font-semibold text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? t('contact.form.sending') : t('contact.form.submit_btn')}
                </button>
              </form>
            )}
          </div>
        </div>
      </PageGradient>
    </>
  )
}

export default Contact
