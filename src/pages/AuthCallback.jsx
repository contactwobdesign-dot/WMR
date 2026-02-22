import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

/**
 * Page de retour après clic sur le lien de confirmation d'email (Supabase Auth).
 * Supabase redirige ici avec les tokens dans le hash ; le client récupère la session au chargement.
 * On redirige ensuite vers le dashboard.
 */
function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const finish = () => {
      navigate('/dashboard', { replace: true })
    }

    if (!supabase) {
      finish()
      return
    }

    // Laisser le client Supabase traiter le hash (session déjà récupérée par l'auth state listener).
    // Redirection après un court délai pour s'assurer que la session est bien appliquée.
    const t = setTimeout(finish, 500)
    return () => clearTimeout(t)
  }, [navigate])

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
