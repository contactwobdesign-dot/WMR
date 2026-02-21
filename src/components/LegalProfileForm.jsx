import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase'
import { FileCheck, AlertCircle } from 'lucide-react'

const SIRET_REGEX = /^\d{14}$/

export default function LegalProfileForm({ onSaved } = {}) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [legalName, setLegalName] = useState('')
  const [siret, setSiret] = useState('')
  const [addressFiscal, setAddressFiscal] = useState('')
  const [isVatPayer, setIsVatPayer] = useState(false)
  const [vatNumber, setVatNumber] = useState('')
  const [siretError, setSiretError] = useState('')

  const requiredFilled =
    legalName.trim() !== '' &&
    SIRET_REGEX.test(siret.replace(/\s/g, '')) &&
    addressFiscal.trim() !== ''
  const statusConforme = requiredFilled

  useEffect(() => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    let mounted = true
    setLoading(true)

    supabase
      .from('profiles')
      .select('legal_name, siret, address_fiscal, is_vat_payer, vat_number')
      .eq('id', user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!mounted) return
        setLoading(false)
        if (error) {
          setMessage({ type: 'error', text: 'Impossible de charger le profil légal.' })
          return
        }
        if (data) {
          setLegalName(data.legal_name ?? '')
          setSiret(data.siret ?? '')
          setAddressFiscal(data.address_fiscal ?? '')
          setIsVatPayer(Boolean(data.is_vat_payer))
          setVatNumber(data.vat_number ?? '')
        }
      })

    return () => {
      mounted = false
    }
  }, [user?.id])

  const validateSiret = (value) => {
    const cleaned = value.replace(/\s/g, '')
    if (cleaned === '') {
      setSiretError('')
      return true
    }
    if (!SIRET_REGEX.test(cleaned)) {
      setSiretError('Le SIRET doit contenir exactement 14 chiffres.')
      return false
    }
    setSiretError('')
    return true
  }

  const handleSiretChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 14)
    setSiret(value)
    validateSiret(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    const siretCleaned = siret.replace(/\s/g, '')
    if (!SIRET_REGEX.test(siretCleaned)) {
      setSiretError('Le SIRET doit contenir exactement 14 chiffres.')
      return
    }

    if (!user?.id) {
      setMessage({ type: 'error', text: 'Vous devez être connecté.' })
      return
    }

    setSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          legal_name: legalName.trim() || null,
          siret: siretCleaned || null,
          address_fiscal: addressFiscal.trim() || null,
          is_vat_payer: isVatPayer,
          vat_number: isVatPayer ? (vatNumber.trim() || null) : null,
        })
        .eq('id', user.id)

      if (error) throw error
      setMessage({ type: 'success', text: 'Profil légal enregistré.' })
      onSaved?.()
    } catch (err) {
      console.error('Legal profile update error:', err)
      setMessage({ type: 'error', text: err?.message || 'Erreur lors de l\'enregistrement.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Badge statut */}
      <div className="flex items-center gap-2">
        {statusConforme ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
            <FileCheck className="h-4 w-4" />
            Conforme
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-800">
            <AlertCircle className="h-4 w-4" />
            Incomplet
          </span>
        )}
      </div>

      {/* Section Identité légale */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          Identité légale (KYC)
        </h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="legal_name" className="mb-1 block text-sm font-medium text-gray-700">
              Nom légal / Raison sociale <span className="text-red-500">*</span>
            </label>
            <input
              id="legal_name"
              type="text"
              value={legalName}
              onChange={(e) => setLegalName(e.target.value)}
              required
              className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder={t('legal_profile.placeholder_name')}
            />
          </div>
          <div>
            <label htmlFor="siret" className="mb-1 block text-sm font-medium text-gray-700">
              Numéro SIRET <span className="text-red-500">*</span>
            </label>
            <input
              id="siret"
              type="text"
              inputMode="numeric"
              value={siret}
              onChange={handleSiretChange}
              required
              maxLength={14}
              className={`block w-full rounded-lg border px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary-500/20 ${
                siretError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-primary-500'
              }`}
              placeholder={t('legal_profile.placeholder_siret')}
            />
            {siretError && <p className="mt-1 text-sm text-red-600">{siretError}</p>}
          </div>
          <div>
            <label htmlFor="address_fiscal" className="mb-1 block text-sm font-medium text-gray-700">
              Adresse fiscale complète <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address_fiscal"
              value={addressFiscal}
              onChange={(e) => setAddressFiscal(e.target.value)}
              required
              rows={3}
              className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              placeholder={t('legal_profile.placeholder_address')}
            />
          </div>
        </div>
      </div>

      {/* Section TVA */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
          TVA
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_vat_payer"
              checked={isVatPayer || false}
              onChange={(e) => setIsVatPayer(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="is_vat_payer" className="text-sm font-medium text-gray-700 cursor-pointer">
              Je suis assujetti à la TVA
            </label>
          </div>
          {isVatPayer && (
            <div className="mt-3">
              <label htmlFor="vat_number" className="mb-1 block text-xs font-medium text-gray-500 uppercase tracking-wide">
                Numéro de TVA intracommunautaire (optionnel)
              </label>
              <input
                id="vat_number"
                type="text"
                value={vatNumber || ''}
                onChange={(e) => setVatNumber(e.target.value)}
                placeholder={t('legal_profile.placeholder_vat')}
                className="block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Message succès / erreur */}
      {message.text && (
        <div
          className={`rounded-lg px-4 py-3 text-sm ${
            message.type === 'success'
              ? 'bg-emerald-50 text-emerald-800'
              : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Bouton */}
      <button
        type="submit"
        disabled={saving || !requiredFilled || !!siretError}
        className="w-full rounded-lg bg-primary-600 px-4 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
      >
        {saving ? 'Enregistrement...' : 'Enregistrer le profil légal'}
      </button>
    </form>
  )
}
