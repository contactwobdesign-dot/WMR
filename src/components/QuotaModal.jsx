import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Crown, X } from 'lucide-react'

export default function QuotaModal({ isOpen, onClose }) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quota-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-[201] w-full max-w-md rounded-2xl bg-white shadow-2xl border border-amber-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <Crown className="h-7 w-7 text-amber-600" />
              </div>
              <h2 id="quota-modal-title" className="text-xl font-bold text-gray-900">
                {t('quota_modal.title')}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
              aria-label={t('quota_modal.close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
            {t('quota_modal.description')}
          </p>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {t('quota_modal.close')}
            </button>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-sm"
            >
              <Crown className="h-4 w-4" />
              {t('quota_modal.upgrade_cta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
