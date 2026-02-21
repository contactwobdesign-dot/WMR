import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { X, DollarSign } from 'lucide-react'

// Nouvelle modale simple : délègue la persistance au parent via onSave
// Props : isOpen, onClose, calculation, onSave(id, price, status)

function UpdateFinalPriceModal({ isOpen, onClose, calculation, onSave }) {
  const { t } = useTranslation()
  const [finalPrice, setFinalPrice] = useState('')
  const [status, setStatus] = useState('active')
  const [error, setError] = useState('')

  useEffect(() => {
    if (calculation) {
      setFinalPrice(
        calculation.final_negotiated_price
          ? calculation.final_negotiated_price.toString()
          : ''
      )
      setStatus(calculation.deal_status || 'active')
      setError('')
    }
  }, [calculation])

  if (!isOpen || !calculation) return null

  const handleSave = () => {
    const priceValue = parseInt(finalPrice, 10)
    if (!finalPrice || Number.isNaN(priceValue) || priceValue <= 0) {
      setError(t('update_final_price_modal.error_invalid_price'))
      return
    }

    setError('')
    onSave(calculation.id, priceValue, status)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">
            {t('update_final_price_modal.title')}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Deal Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="text-sm text-gray-600 mb-1">
            <span className="font-semibold capitalize">{calculation.platform}</span>
            {' • '}
            <span className="capitalize">{calculation.niche}</span>
          </div>
          <div className="text-xs text-gray-500">
            Recommended: ${calculation.price_min?.toLocaleString()} - ${calculation.price_max?.toLocaleString()}
          </div>
        </div>

        {/* Final Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('update_final_price_modal.final_price_label')}
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              value={finalPrice}
              onChange={(e) => {
                setFinalPrice(e.target.value)
                if (error) setError('')
              }}
              placeholder={t('update_final_price_modal.placeholder_price')}
              className={`w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {error && (
            <p className="mt-1 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* Deal Status */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('update_final_price_modal.deal_status_label')}
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="active">{t('update_final_price_modal.status_active')}</option>
            <option value="won">{t('update_final_price_modal.status_won')}</option>
            <option value="declined">{t('update_final_price_modal.status_declined')}</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {t('update_final_price_modal.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
          >
            {t('update_final_price_modal.save_btn')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UpdateFinalPriceModal
