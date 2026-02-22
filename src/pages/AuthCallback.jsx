import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const RETRY_DELAY_MS = 2000
const MAX_ATTEMPTS = 3

/**
 * Page de retour après clic sur le lien de confirmation d'email (Supabase Auth).
 * Vérification active de la session via getSession(), retry après 2s si vide, puis redirection /dashboard.
 */
function AuthCallback() {
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!supabase) {
      console.error('[AuthCallback] supabase client is null')
      setError('Auth non disponible')
      return
    }

    let cancelled = false
    let attempt = 0

    let timeoutId = null
    const trySessionAndRedirect = async () => {
      attempt += 1
      console.log('[AuthCallback] attempt', attempt, 'getSession()')
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()

      if (cancelled) return

      if (sessionError) {
        console.error('[AuthCallback] getSession error:', sessionError)
        setError(sessionError.message || 'Erreur session')
        return
      }

      if (session) {
        console.log('[AuthCallback] session détectée, redirection /dashboard')
        navigate('/dashboard', { replace: true })
        return
      }

      if (attempt >= MAX_ATTEMPTS) {
        console.error('[AuthCallback] pas de session après', MAX_ATTEMPTS, 'tentatives')
        setError('Connexion expirée ou lien invalide. Réessayez de vous connecter.')
        return
      }

      console.log('[AuthCallback] session vide, retry dans', RETRY_DELAY_MS, 'ms')
      timeoutId = setTimeout(trySessionAndRedirect, RETRY_DELAY_MS)
    }

    trySessionAndRedirect()
    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [navigate])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <p className="text-red-600 font-medium mb-4">{error}</p>
          <button
            type="button"
            onClick={() => navigate('/login', { replace: true })}
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent mb-4" />
        <p className="text-gray-600">Connexion en cours…</p>
      </div>
    </div>
  )
}

export default AuthCallback
