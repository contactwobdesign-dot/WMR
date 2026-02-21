import { supabase } from './supabase'

/**
 * Crée une session Stripe Checkout côté serveur (Edge Function)
 * et renvoie l'URL de redirection. Plus d'utilisation de redirectToCheckout (obsolète).
 * @param {string} priceId - ID du prix Stripe (mensuel ou annuel)
 * @param {string} userEmail - Email du client
 * @returns {{ url?: string, error?: { message: string } }}
 */
export async function createCheckoutSession(priceId, userEmail) {
  if (!priceId || !userEmail) {
    return { error: { message: 'Price ID and email are required' } }
  }

  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      priceId,
      email: userEmail,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
    },
  })

  if (error) {
    return { error: { message: error.message || 'Failed to create checkout session' } }
  }

  if (!data?.url) {
    return { error: { message: "Le serveur n'a pas renvoyé d'URL de paiement." } }
  }

  return { url: data.url }
}
