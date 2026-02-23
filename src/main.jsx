import './i18n.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { AuthProvider } from './hooks/useAuth.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import App from './App.jsx'
import './index.css'

// Initialisation PostHog (désactivée en local)
if (
  typeof window !== 'undefined' &&
  window.location.hostname !== 'localhost' &&
  import.meta.env.VITE_POSTHOG_KEY
){
  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.posthog.com',
    capture_pageview: false,
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <CurrencyProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </CurrencyProvider>
    </PostHogProvider>
  </React.StrictMode>,
)
