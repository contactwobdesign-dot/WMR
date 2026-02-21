import { Crown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

function PremiumBadge({ className = '' }) {
  const { t } = useTranslation()
  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-sm font-semibold ${className}`}>
      <Crown size={16} />
      <span>{t('premium_badge.label')}</span>
    </div>
  )
}

export default PremiumBadge
