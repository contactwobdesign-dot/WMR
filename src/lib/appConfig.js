/**
 * URL de base du site (production). Utilisée pour les redirections auth (Supabase, Resend).
 * En dev, définir VITE_SITE_URL dans .env si besoin (ex: http://localhost:5173).
 */
export const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://worthmyrate.com'
