import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase'
import QuickAddClientForm from './QuickAddClientForm'
import LegalProfileCard from './LegalProfileCard'
import ClientAnalyticsView from './ClientAnalyticsView'
import { AlertTriangle } from 'lucide-react'

const SIRET_REGEX = /^\d{14}$/

function isLegalProfileComplete(profile) {
  if (!profile) return false
  const { legal_name, siret, address_fiscal } = profile
  const nameOk = typeof legal_name === 'string' && legal_name.trim() !== ''
  const siretOk = typeof siret === 'string' && SIRET_REGEX.test(siret.replace(/\s/g, ''))
  const addressOk = typeof address_fiscal === 'string' && address_fiscal.trim() !== ''
  return nameOk && siretOk && addressOk
}

export default function BusinessDashboard({ dateRange = '365' }) {
  const { t } = useTranslation()
  const { user, isPremium } = useAuth()
  const isPro = Boolean(isPremium?.())
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [clients, setClients] = useState([])
  const [clientsLoading, setClientsLoading] = useState(false)

  const profileIncomplete = !profileLoading && !isLegalProfileComplete(profile)

  const fetchProfile = useCallback(async () => {
    if (!user?.id) return
    setProfileLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('legal_name, siret, address_fiscal, is_vat_payer, vat_number')
      .eq('id', user.id)
      .maybeSingle()
    setProfile(data ?? null)
    setProfileLoading(false)
  }, [user?.id])

  const fetchClients = useCallback(async () => {
    if (!user?.id) return
    setClientsLoading(true)
    const { data, error } = await supabase
      .from('clients')
      .select('*, deals(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (!error) setClients(data ?? [])
    setClientsLoading(false)
  }, [user?.id])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (user?.id) fetchClients()
  }, [user?.id, fetchClients])

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {profileIncomplete && (
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-amber-900">{t('compliance.banner.profile_incomplete_title')}</h3>
            <p className="text-sm text-amber-800 mt-1">
              {t('compliance.banner.profile_incomplete_desc')}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLONNE GAUCHE — Formulaires & Profil légal */}
        <div className="lg:col-span-1 space-y-6">
          <QuickAddClientForm onAdded={fetchClients} isPro={isPro} />
          <LegalProfileCard onSaved={fetchProfile} />
        </div>

        {/* COLONNE DROITE — Liste des clients / futur camembert */}
        <div className="lg:col-span-2">
          <ClientAnalyticsView
            clients={clients}
            loading={clientsLoading}
            onRefresh={fetchClients}
            dateRange={dateRange}
            userProfile={profile}
            isPro={isPro}
          />
        </div>
      </div>
    </div>
  )
}
