import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Sitemap from 'vite-plugin-sitemap'

// Routes réelles du routeur uniquement (aucune variante /fr/ ou /en/ — URLs identiques quelle que soit la langue)
const staticRoutes = [
  '/',
  '/pricing',
  '/manifesto',
  '/calculator',
  '/premium-calculator',
  '/contact',
  '/terms',
  '/privacy',
  '/legal',
  '/youtube-sponsorship-calculator',
  '/instagram-sponsorship-calculator',
  '/tiktok-sponsorship-calculator',
  '/twitch-sponsorship-calculator',
  '/podcast-sponsorship-rates',
  '/how-much-to-charge-sponsorship',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({
      hostname: 'https://worthmyrate.com',
      dynamicRoutes: staticRoutes,
      changefreq: 'daily',
      priority: 0.8,
      outDir: 'dist',
      exclude: [
        '/dashboard',
        '/dashboard/**',
        '/login',
        '/signup',
        '/forgot-password',
        '/reset-password',
        '/settings',
      ],
      generateRobotsTxt: true,
    }),
  ],
})
