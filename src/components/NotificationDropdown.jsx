import { useState, useEffect, useRef, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Bell, X } from 'lucide-react'

const NOTIFICATION_TYPES = {
  legal: 'legal',
  renewal: 'renewal',
}

export default function NotificationDropdown({ notifications } = {}) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [dismissedIds, setDismissedIds] = useState([])
  const containerRef = useRef(null)

  const mockNotifications = useMemo(() => [
    { id: 'mock-1', type: NOTIFICATION_TYPES.legal, title: t('notifications.mock_legal_title'), description: t('notifications.mock_legal_desc') },
    { id: 'mock-2', type: NOTIFICATION_TYPES.renewal, title: t('notifications.mock_renewal_title'), description: t('notifications.mock_renewal_desc') },
  ], [t])

  useEffect(() => {
    if (!isOpen) return
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const rawList = notifications != null && Array.isArray(notifications) ? notifications : mockNotifications
  const visibleNotifications = rawList.filter((n) => !dismissedIds.includes(n.id))
  const hasAlerts = visibleNotifications.length > 0

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900"
        aria-label={t('notifications.title')}
        aria-expanded={isOpen}
      >
        <Bell size={22} strokeWidth={2} />
        {hasAlerts && (
          <span
            className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500"
            aria-hidden="true"
          />
        )}
      </button>

      {isOpen && (
        <div
          className="absolute left-0 md:left-auto md:right-0 mt-2 w-80 max-h-[min(24rem,70vh)] overflow-y-auto bg-white rounded-xl shadow-lg border border-gray-200 z-[100]"
          role="menu"
        >
          <div className="p-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 px-2 py-1">{t('notifications.title')}</h3>
          </div>
          <div className="p-2">
            {visibleNotifications.length === 0 ? (
              <p className="text-sm text-gray-500 py-6 text-center">{t('notifications.empty')}</p>
            ) : (
              <ul className="space-y-2">
                {visibleNotifications.map((notification) => (
                  <li key={notification.id}>
                    <div
                      className={`relative rounded-lg border border-gray-100 bg-gray-50/50 p-3 pr-8 text-left transition-colors hover:bg-gray-50 ${
                        notification.type === NOTIFICATION_TYPES.legal
                          ? 'border-l-4 border-l-red-500'
                          : 'border-l-4 border-l-amber-500'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setDismissedIds((prev) => [...prev, notification.id])
                        }}
                        className="absolute top-2 right-2 p-0.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                        aria-label={t('notifications.close')}
                      >
                        <X size={14} />
                      </button>
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-600 mt-0.5">{notification.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
