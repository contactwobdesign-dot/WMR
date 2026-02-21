import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase'
import { Pencil, Check } from 'lucide-react'

const SIRET_REGEX = /^\d{14}$/

export default function LegalProfileCard({ onSaved } = {}) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [legalName, setLegalName] = useState('')
  const [siret, setSiret] = useState('')
  const [addressFiscal, setAddressFiscal] = useState('')
  const [isVatPayer, setIsVatPayer] = useState(false)
  const [vatNumber, setVatNumber] = useState('')
  const [siretError, setSiretError] = useState('')

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
        if (error) return
        if (data) {
          setLegalName(data.legal_name ?? '')
          setSiret(data.siret ?? '')
          setAddressFiscal(data.address_fiscal ?? '')
          setIsVatPayer(Boolean(data.is_vat_payer))
          setVatNumber(data.vat_number ?? '')
        }
      })
    return () => { mounted = false }
  }, [user?.id])

  const handleSiretChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 14)
    setSiret(value)
    if (value && !SIRET_REGEX.test(value)) setSiretError(t('compliance.tax_identity.siret_error_14'))
    else setSiretError('')
  }

  const handleStartEdit = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmEdit = () => {
    setShowConfirmModal(false)
    setEditing(true)
  }

  const handleSave = async (e) => {
    e?.preventDefault()
    setMessage({ type: '', text: '' })
    const siretCleaned = siret.replace(/\s/g, '')
    if (!SIRET_REGEX.test(siretCleaned) && siretCleaned.length > 0) {
      setSiretError(t('compliance.tax_identity.siret_error_exact'))
      return
    }
    if (!user?.id) return

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
      setMessage({ type: 'success', text: t('compliance.tax_identity.message_saved') })
      setEditing(false)
      onSaved?.()
    } catch (err) {
      setMessage({ type: 'error', text: err?.message || t('compliance.tax_identity.message_error') })
    } finally {
      setSaving(false)
    }
  }

  const handleCancelEdit = () => {
    setEditing(false)
    setSiretError('')
    setMessage({ type: '', text: '' })
    // Re-fetch to reset local state
    if (user?.id) {
      supabase.from('profiles').select('legal_name, siret, address_fiscal, is_vat_payer, vat_number').eq('id', user.id).maybeSingle().then(({ data }) => {
        if (data) {
          setLegalName(data.legal_name ?? '')
          setSiret(data.siret ?? '')
          setAddressFiscal(data.address_fiscal ?? '')
          setIsVatPayer(Boolean(data.is_vat_payer))
          setVatNumber(data.vat_number ?? '')
        }
      })
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-gray-100" />
      </div>
    )
  }

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{t('compliance.tax_identity.title')}</h3>
          {!editing ? (
            <button
              type="button"
              onClick={handleStartEdit}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Pencil className="h-4 w-4" />
              {t('compliance.tax_identity.edit')}
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                {t('compliance.tax_identity.cancel')}
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
              >
                <Check className="h-4 w-4" />
                {t('compliance.tax_identity.save')}
              </button>
            </div>
          )}
        </div>

        {!editing ? (
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{t('compliance.tax_identity.legal_name_label')}</p>
              <p className="text-gray-900 mt-0.5">{legalName || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{t('compliance.tax_identity.siret_label')}</p>
              <p className="text-gray-900 mt-0.5">{siret || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{t('compliance.tax_identity.address_fiscal_label')}</p>
              <p className="text-gray-900 mt-0.5 whitespace-pre-wrap">{addressFiscal || '—'}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{t('compliance.tax_identity.vat_label')}</p>
              <p className="text-gray-900 mt-0.5">
                {isVatPayer ? t('compliance.tax_identity.vat_yes') : t('compliance.tax_identity.vat_no')}
                {isVatPayer && vatNumber?.trim() ? ` — ${vatNumber.trim()}` : ''}
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t('compliance.tax_identity.legal_name_label')}</label>
              <input
                type="text"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder={t('compliance.tax_identity.legal_name_placeholder')}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t('compliance.tax_identity.siret_label')}</label>
              <input
                type="text"
                inputMode="numeric"
                value={siret}
                onChange={handleSiretChange}
                maxLength={14}
                className={`w-full rounded-lg border px-3 py-2 text-sm ${siretError ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={t('compliance.tax_identity.siret_placeholder')}
              />
              {siretError && <p className="mt-1 text-xs text-red-600">{siretError}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">{t('compliance.tax_identity.address_fiscal_label')}</label>
              <textarea
                value={addressFiscal}
                onChange={(e) => setAddressFiscal(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                placeholder={t('compliance.tax_identity.address_placeholder')}
              />
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                id="card_is_vat_payer"
                checked={isVatPayer || false}
                onChange={(e) => setIsVatPayer(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="card_is_vat_payer" className="text-sm font-medium text-gray-700 cursor-pointer">
                {t('compliance.tax_identity.vat_checkbox')}
              </label>
            </div>
            {isVatPayer && (
              <div className="mt-3">
                <label htmlFor="card_vat_number" className="block text-xs font-medium text-gray-500 mb-1 uppercase">
                  {t('compliance.tax_identity.vat_number_optional')}
                </label>
                <input
                  id="card_vat_number"
                  type="text"
                  value={vatNumber || ''}
                  onChange={(e) => setVatNumber(e.target.value)}
                  placeholder={t('compliance.tax_identity.vat_number_placeholder')}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
            {message.text && (
              <p className={`text-sm ${message.type === 'success' ? 'text-emerald-600' : 'text-red-600'}`}>
                {message.text}
              </p>
            )}
          </form>
        )}
      </div>

      {/* Modal confirmation avant modification */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowConfirmModal(false)}>
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm text-gray-700">
              {t('compliance.tax_identity.confirm_modal_text')}
            </p>
            <div className="mt-4 flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                {t('compliance.tax_identity.cancel')}
              </button>
              <button
                type="button"
                onClick={handleConfirmEdit}
                className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                {t('compliance.tax_identity.confirm_edit')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
