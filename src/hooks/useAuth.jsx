import { useState, useEffect, createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { usePostHog } from 'posthog-js/react'
import { supabase } from '../lib/supabase'
import { SITE_URL } from '../lib/appConfig'

// Create Auth Context
const AuthContext = createContext({
  user: null,
  subscription: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  isPremium: () => false,
  updatePassword: async () => {},
  updateProfile: async () => {},
  manageSubscription: () => {},
})

// Auth Provider Component
export function AuthProvider({ children }) {
  const { t } = useTranslation()
  const posthog = usePostHog()
  const [user, setUser] = useState(null)
  const [subscription, setSubscription] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSubscriptionLoaded, setIsSubscriptionLoaded] = useState(false)

  // Récupère le profil (is_pro) depuis public.profiles — source de vérité après paiement Stripe
  const fetchProfileAndApply = async (userSession) => {
    if (!userSession) {
      setIsSubscriptionLoaded(true)
      return
    }

    try {
      if (!supabase) {
        setUser({ ...userSession, isPro: false })
        setSubscription({ plan: 'free', status: 'active' })
        setIsSubscriptionLoaded(true)
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('is_pro')
        .eq('id', userSession.id)
        .maybeSingle()

      if (error) {
        console.warn('Problème récupération profil (non bloquant):', error)
      }

      const isPro = data?.is_pro ?? false
      setUser({ ...userSession, isPro })
      setSubscription({
        plan: isPro ? 'pro' : 'free',
        status: 'active',
      })
    } catch (err) {
      console.error('Erreur critique Auth:', err)
      setUser({ ...userSession, isPro: false })
      setSubscription({ plan: 'free', status: 'active' })
    } finally {
      setIsSubscriptionLoaded(true)
    }
  }

  // Sign up function (emailRedirectTo = retour après clic sur le lien de confirmation Resend/Supabase)
  const signUp = async (email, password) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not initialized') }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${SITE_URL}/auth/callback`,
      },
    })
    
    return { data, error }
  }

  // Sign in function
  const signIn = async (email, password) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not initialized') }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    return { data, error }
  }

  // Sign out function
  const signOut = async () => {
    if (!supabase) {
      return { error: new Error('Supabase not initialized') }
    }

    const { error } = await supabase.auth.signOut()
    
    if (error) {
      return { error }
    }

    setUser(null)
    setSubscription(null)
    return { error: null }
  }

  // Statut Pro : dérivé de user.isPro (profil Supabase public.profiles)
  const isPremium = () => Boolean(user?.isPro === true)

  // Initialize auth state and listen for changes (avec timeout de sécurité)
  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      setIsSubscriptionLoaded(true)
      return
    }

    let mounted = true

    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) throw error

        if (mounted) {
          if (session?.user) {
            await fetchProfileAndApply(session.user)
          } else {
            setUser(null)
            setSubscription(null)
            setIsSubscriptionLoaded(true)
          }
        }
      } catch (err) {
        console.error('Erreur init session:', err)
        if (mounted) {
          setUser(null)
          setSubscription(null)
          setIsSubscriptionLoaded(true)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    initSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        console.log('Auth event:', event)

        const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
        const canTrack = posthog && !isLocalhost

        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session?.user) {
          if (canTrack) {
            try {
              posthog.identify(session.user.id, {
                email: session.user.email,
                plan: 'free',
              })
            } catch (e) {
              console.error('PostHog identify error:', e)
            }
          }

          fetchProfileAndApply(session.user)
          if (mounted) setLoading(false)
        } else if (event === 'SIGNED_OUT') {
          if (canTrack) {
            try {
              posthog.reset()
            } catch (e) {
              console.error('PostHog reset error:', e)
            }
          }

          setUser(null)
          setSubscription(null)
          setIsSubscriptionLoaded(true)
          setLoading(false)
        }
      }
    )

    const safetyTimeout = setTimeout(() => {
      if (mounted) {
        setLoading((prev) => {
          if (prev) console.warn('⚠️ Force shutdown of loading spinner due to timeout')
          return false
        })
      }
    }, 4000)

    return () => {
      mounted = false
      subscription?.unsubscribe()
      clearTimeout(safetyTimeout)
    }
  }, [])

  // Revalidation au retour sur l'onglet (rafraîchit is_pro après paiement ou veille)
  useEffect(() => {
    const handleFocus = () => {
      if (user) {
        fetchProfileAndApply(user)
      }
    }
    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [user])

  // Update user password
  const updatePassword = async (newPassword) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not initialized') }
    }

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    return { data, error }
  }

  // Update user profile (metadata: full_name, website, currency)
  const updateProfile = async (data) => {
    if (!supabase) {
      return { data: null, error: new Error('Supabase not initialized') }
    }

    const { data: updatedUser, error } = await supabase.auth.updateUser({
      data: {
        full_name: data.fullName ?? undefined,
        website: data.website ?? undefined,
        currency: data.currency ?? undefined,
      },
    })

    if (!error && updatedUser?.user) {
      setUser({ ...updatedUser.user, isPro: user?.isPro ?? false })
    }

    return { data: updatedUser?.user ?? null, error }
  }

  // Manage subscription / billing
  const manageSubscription = () => {
    const plan = subscription?.plan || 'free'

    if (plan === 'free') {
      // Redirige les utilisateurs gratuits vers la page Pricing
      window.location.assign('/pricing')
      return
    }

    if (plan === 'pro') {
      // Portail Stripe non encore intégré côté backend
      alert(t('alerts.subscription_manage_stripe_pending'))
      return
    }

    // Fallback pour d’autres plans / états
    alert(t('alerts.subscription_manage_unavailable'))
  }

  // Logique de verrouillage : loading true tant que l'auth charge OU qu'on a un user mais l'abo n'est pas encore chargé
  const globalLoading = loading || (!!user && !isSubscriptionLoaded)

  const value = {
    user,
    subscription,
    loading: globalLoading,
    signUp,
    signIn,
    signOut,
    isPremium,
    updatePassword,
    updateProfile,
    manageSubscription,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}
