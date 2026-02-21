import { HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function HelpBubble() {
  const { t } = useTranslation()
  return (
    <Link
      to="/contact"
      className="hidden md:flex fixed bottom-6 right-6 z-[100] items-center justify-center w-12 h-12 rounded-full bg-white text-gray-800 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all border border-gray-100"
      aria-label={t('help_bubble.aria_label')}
    >
      <HelpCircle size={24} strokeWidth={2} />
    </Link>
  )
}
