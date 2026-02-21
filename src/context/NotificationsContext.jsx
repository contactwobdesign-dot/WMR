import { createContext, useContext, useState, useCallback } from 'react'

const NotificationsContext = createContext({
  notifications: [],
  setNotifications: () => {},
  renewals: [],
  setRenewals: () => {},
})

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [renewals, setRenewals] = useState([])
  const value = {
    notifications,
    setNotifications,
    renewals,
    setRenewals,
  }
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext)
  if (!ctx) {
    return {
      notifications: [],
      setNotifications: () => {},
      renewals: [],
      setRenewals: () => {},
    }
  }
  return ctx
}
