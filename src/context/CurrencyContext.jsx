import { useState, useEffect, createContext, useContext, useMemo } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

const STORAGE_KEY = 'wmr_currency'

// Taux de change MVP (base USD = 1)
const RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.35,
  AUD: 1.52,
}

const SYMBOLS = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  AUD: 'A$',
}

const CurrencyContext = createContext({
  currency: 'USD',
  setCurrency: () => {},
  formatPrice: () => '',
  currencySymbol: '$',
  rates: RATES,
})

export function CurrencyProvider({ children }) {
  const { user } = useAuth()
  const [currency, setCurrencyState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'USD'
    } catch {
      return 'USD'
    }
  })

  const setCurrency = (code) => {
    const next = code in RATES ? code : 'USD'
    setCurrencyState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch (e) {
      console.warn('Could not persist currency to localStorage', e)
    }
  }

  const formatPrice = (valueUsd) => {
    if (valueUsd == null || Number.isNaN(Number(valueUsd))) return '—'
    const rate = RATES[currency] ?? 1
    const local = Number(valueUsd) * rate
    const symbol = SYMBOLS[currency] ?? '$'
    return `${symbol}${Math.round(local).toLocaleString()}`
  }

  const currencySymbol = SYMBOLS[currency] ?? '$'

  // Synchroniser la devise avec le profil utilisateur au login
  useEffect(() => {
    // Priorité au champ direct user.currency si présent
    if (user?.currency && user.currency !== currency) {
      setCurrency(user.currency)
    }
    // Fallback sur les métadonnées Supabase
    else if (user?.user_metadata?.currency && user.user_metadata.currency !== currency) {
      setCurrency(user.user_metadata.currency)
    }
  }, [user, currency])

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      formatPrice,
      currencySymbol,
      rates: RATES,
    }),
    [currency]
  )

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
