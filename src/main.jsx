import './i18n.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthProvider } from './hooks/useAuth.jsx'
import { CurrencyProvider } from './context/CurrencyContext.jsx'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CurrencyProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </CurrencyProvider>
  </React.StrictMode>,
)
