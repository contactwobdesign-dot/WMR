import { supabase } from './supabase'

/**
 * Crée une session Stripe Checkout côté serveur (Edge Function).
 * Les URLs success/cancel sont gérées côté serveur (SITE_URL), on n'envoie pas origin.
 * @param {string} priceId - ID du prix Stripe (mensuel ou annuel)
 * @param {string} userEmail - Email du client
 * @returns {{ url?: string, error?: { message: string } }}
 */
export async function createCheckoutSession(priceId, userEmail) {
  if (!priceId || !userEmail) {
    console.error('[createCheckoutSession] missing priceId or userEmail')
    return { error: { message: 'Price ID and email are required' } }
  }

  console.log('[createCheckoutSession] invoking create-checkout', { priceId, email: userEmail?.replace?.(/.*@/, '***@') })
  const { data, error } = await supabase.functions.invoke('create-checkout', {
    body: {
      priceId,
      email: userEmail,
    },
  })

  if (error) {
    console.error('[createCheckoutSession] invoke error:', error)
    return { error: { message: error.message || 'Failed to create checkout session' } }
  }

  if (!data?.url) {
    console.error('[createCheckoutSession] no url in response', data)
    return { error: { message: "Le serveur n'a pas renvoyé d'URL de paiement." } }
  }

  console.log('[createCheckoutSession] success, redirecting to Stripe')
  return { url: data.url }
}
