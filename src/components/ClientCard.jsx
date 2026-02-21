import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth.jsx'
import { useComplianceCheck } from '../hooks/useCompliance.js'
import { supabase } from '../lib/supabase'
import { generateContract } from '../utils/pdfGenerator'
import ContractGenerationModal from './ContractGenerationModal'
import ContractSuccessModal from './ContractSuccessModal'
import QuotaModal from './QuotaModal'
import { ChevronDown, ChevronRight, Plus, Building2, FileText, FileSignature, Pencil } from 'lucide-react'

const SIRET_REGEX = /^\d{14}$/

function isProfileCompleteForContract(profile) {
  if (!profile) return false
  const siret = typeof profile.siret === 'string' && profile.siret.replace(/\s/g, '')
  return SIRET_REGEX.test(siret)
}

const STATUS_KEYS = { draft: 'status_draft', signed: 'status_signed', paid: 'status_paid', dispute: 'status_dispute' }

function formatEur(centimes) {
  if (centimes == null || Number.isNaN(centimes)) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(centimes / 100)
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr + 'Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const initialClientForm = (c) => ({
  company_name: c?.company_name ?? '',
  contact_name: c?.contact_name ?? '',
  contact_email: c?.contact_email ?? '',
  address: c?.address ?? '',
})

export default function ClientCard({ client, onDealAdded, onClientUpdated, periodLabel, periodTotal, userProfile }) {
  const { t } = useTranslation()
  const { user, isPremium } = useAuth()
  const { compliance, loading: complianceLoading } = useComplianceCheck(client?.id ?? null)
  const [dealsOpen, setDealsOpen] = useState(false)
  const [showDealModal, setShowDealModal] = useState(false)
  const [showEditClientModal, setShowEditClientModal] = useState(false)
  const [showContractModal, setShowContractModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedDealsForSuccess, setSelectedDealsForSuccess] = useState([])
  const [clientForm, setClientForm] = useState(() => initialClientForm(client))
  const [saving, setSaving] = useState(false)
  const [savingClient, setSavingClient] = useState(false)
  const [generatingPdf, setGeneratingPdf] = useState(false)
  const [dealForm, setDealForm] = useState({
    description: '',
    cash_amount_euros: '',
    gift_value_euros: '',
    contract_date: new Date().toISOString().slice(0, 10),
    status: 'draft',
  })
  const [error, setError] = useState('')
  const [showQuotaModal, setShowQuotaModal] = useState(false)

  const [freeContractsUsed, setFreeContractsUsed] = useState(null)

  const isPro = Boolean(isPremium?.())
  const deals = client?.deals ?? []

  useEffect(() => {
    let cancelled = false
    const fetchFreeContractsUsage = async () => {
      if (!user?.id || !supabase) return
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('free_contracts_used')
          .eq('id', user.id)
          .maybeSingle()

        if (!cancelled && !error) {
          setFreeContractsUsed(data?.free_contracts_used ?? 0)
        }
      } catch (e) {
        console.error('Erreur récupération quota contrats gratuits:', e)
      }
    }

    fetchFreeContractsUsage()

    return () => {
      cancelled = true
    }
  }, [user?.id])

  const handleAddDeal = async (e) => {
    e.preventDefault()
    setError('')
    const cash = Math.round(parseFloat(dealForm.cash_amount_euros || '0') * 100)
    const gift = Math.round(parseFloat(dealForm.gift_value_euros || '0') * 100)
    if (!user?.id || !client?.id) return
    setSaving(true)
    try {
      const { error: err } = await supabase.from('deals').insert({
        user_id: user.id,
        client_id: client.id,
        description: dealForm.description.trim() || null,
        cash_amount: cash,
        gift_value: gift,
        contract_date: dealForm.contract_date,
        status: dealForm.status,
      })
      if (err) throw err
      setShowDealModal(false)
      setDealForm({ description: '', cash_amount_euros: '', gift_value_euros: '', contract_date: new Date().toISOString().slice(0, 10), status: 'draft' })
      onDealAdded?.()
    } catch (err) {
      setError(err?.message || t('compliance.deal_cards.error_update'))
    } finally {
      setSaving(false)
    }
  }

  const isThresholdReached = compliance?.isThresholdReached ?? false

  const openEditClientModal = () => {
    setClientForm(initialClientForm(client))
    setError('')
    setShowEditClientModal(true)
  }

  const handleUpdateClient = async (e) => {
    e.preventDefault()
    const name = clientForm.company_name?.trim()
    if (!name) {
      setError(t('compliance.deal_cards.error_brand_required'))
      return
    }
    if (!client?.id) return
    setSavingClient(true)
    setError('')
    try {
      const { error: err } = await supabase
        .from('clients')
        .update({
          company_name: name,
          contact_name: clientForm.contact_name?.trim() || null,
          contact_email: clientForm.contact_email?.trim() || null,
          address: clientForm.address?.trim() || null,
        })
        .eq('id', client.id)
      if (err) throw err
      setShowEditClientModal(false)
      ;(onClientUpdated || onDealAdded)?.()
    } catch (err) {
      setError(err?.message || t('compliance.deal_cards.error_update'))
    } finally {
      setSavingClient(false)
    }
  }

  const openContractModal = () => {
    if (!isProfileCompleteForContract(userProfile)) {
      alert(t('compliance.deal_cards.alert_profile_incomplete'))
      return
    }
    if (!deals.length) {
      alert(t('compliance.deal_cards.alert_no_deals'))
      return
    }

    if (!isPro) {
      if (freeContractsUsed != null && freeContractsUsed >= 1) {
        setShowQuotaModal(true)
        return
      }
    }

    setShowContractModal(true)
  }

  const handleContractGenerate = async (selectedDeals, rightsOptions) => {
    if (!selectedDeals?.length) return
    console.log('Droits reçus:', rightsOptions)
    setGeneratingPdf(true)
    try {
      await generateContract(selectedDeals, client, userProfile, rightsOptions, isPro, t)

      if (!isPro && user?.id) {
        const current = freeContractsUsed ?? 0
        try {
          const { error } = await supabase
            .from('profiles')
            .update({ free_contracts_used: current + 1 })
            .eq('id', user.id)
          if (!error) {
            setFreeContractsUsed(current + 1)
          }
        } catch (e) {
          console.error('Erreur mise à jour du quota contrats gratuits:', e)
        }
      }

      setSelectedDealsForSuccess(selectedDeals)
      setShowSuccessModal(true)
    } catch (err) {
      alert(err?.message || t('alerts.pdf_generation_error'))
    } finally {
      setGeneratingPdf(false)
    }
  }

  const handleMarkAsSigned = async () => {
    for (const deal of selectedDealsForSuccess) {
      if (deal?.id) {
        await supabase.from('deals').update({ status: 'signed' }).eq('id', deal.id)
      }
    }
    setSelectedDealsForSuccess([])
    onDealAdded?.()
  }

  const handleKeepDraft = () => {
    setSelectedDealsForSuccess([])
  }

  return (
    <>
      <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
        <div className="p-5">
          {/* En-tête : marque + badge conformité */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                <Building2 className="h-5 w-5 text-gray-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{client?.company_name ?? '—'}</h3>
                  <button
                    type="button"
                    onClick={openEditClientModal}
                    className="shrink-0 rounded p-1 text-gray-400 hover:text-amber-600 transition-colors"
                    title={t('compliance.deal_cards.edit_client_title')}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
                {client?.contact_name && (
                  <p className="text-sm text-gray-500">{client.contact_name}</p>
                )}
                {client?.contact_email && (
                  <p className="text-sm text-gray-500 truncate">{client.contact_email}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {complianceLoading ? (
                <span className="inline-flex h-6 w-20 animate-pulse rounded-full bg-gray-200" />
              ) : isThresholdReached ? (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                  ⚠️ {t('compliance.deal_cards.status_exceeded')}
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                  {t('compliance.deal_cards.status_compliant')}
                </span>
              )}
            </div>
          </div>

          {/* Corps : montant cumulé (période sélectionnée ou cumul 12 mois) */}
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              {periodLabel != null ? periodLabel : t('compliance.deal_cards.period_cumul_12')}
            </p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight mt-0.5">
              {periodLabel != null ? (periodTotal ?? '—') : (complianceLoading ? '…' : compliance?.totalCumulated ?? '—')}
            </p>
          </div>

          {/* Pied : séparation + actions (ghost / texte) + Générer Contrat */}
          <div className="mt-5 pt-4 border-t border-gray-50">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setDealsOpen((o) => !o)}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                {dealsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                {t('compliance.deal_cards.view_deals', { count: deals.length })}
              </button>
              <button
                type="button"
                onClick={() => setShowDealModal(true)}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <Plus className="h-4 w-4" />
                {t('compliance.deal_cards.add_deal')}
              </button>
              <button
                type="button"
                onClick={openContractModal}
                disabled={generatingPdf}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${
                  isPro ? 'border-amber-200 text-amber-700 hover:bg-amber-50' : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                }`}
              >
                <FileSignature className="h-4 w-4" />
                {generatingPdf ? t('compliance.deal_cards.generating') : t('compliance.deal_cards.generate_contract')}
              </button>
            </div>
          </div>
        </div>

        {dealsOpen && (
          <div className="border-t border-gray-50 bg-gray-50/30 px-5 py-3">
            {deals.length === 0 ? (
              <p className="text-sm text-gray-500">{t('compliance.deal_cards.no_deals_for_client')}</p>
            ) : (
              <ul className="space-y-2">
                {deals.map((d) => (
                  <li
                    key={d.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-sm border border-gray-100"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="h-4 w-4 text-gray-400 shrink-0" />
                      <span className="text-gray-700 truncate">{d.description || t('compliance.deal_cards.no_description')}</span>
                      <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600">
                        {STATUS_KEYS[d.status] ? t('compliance.deal_cards.' + STATUS_KEYS[d.status]) : d.status}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900 shrink-0">{formatEur(d.total_deal_value)}</span>
                    <span className="text-gray-500 shrink-0">{formatDate(d.contract_date)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Modale Ajout Deal */}
      {showDealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !saving && setShowDealModal(false)}>
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-gray-200 px-5 py-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('compliance.deal_cards.new_deal_modal_title', { company: client?.company_name ?? '' })}</h3>
            </div>
            <form onSubmit={handleAddDeal} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.description')}</label>
                <textarea
                  value={dealForm.description}
                  onChange={(e) => setDealForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  placeholder={t('compliance.deal_cards.description_placeholder')}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.cash_amount')}</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={dealForm.cash_amount_euros}
                    onChange={(e) => setDealForm((f) => ({ ...f, cash_amount_euros: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.gift_value')}</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={dealForm.gift_value_euros}
                    onChange={(e) => setDealForm((f) => ({ ...f, gift_value_euros: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.contract_date')}</label>
                  <input
                    type="date"
                    value={dealForm.contract_date}
                    onChange={(e) => setDealForm((f) => ({ ...f, contract_date: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.status')}</label>
                  <select
                    value={dealForm.status}
                    onChange={(e) => setDealForm((f) => ({ ...f, status: e.target.value }))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    {Object.entries(STATUS_KEYS).map(([k, key]) => (
                      <option key={k} value={k}>{t('compliance.deal_cards.' + key)}</option>
                    ))}
                  </select>
                </div>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowDealModal(false)}
                  disabled={saving}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {t('compliance.deal_cards.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
                >
                  {saving ? t('compliance.deal_cards.saving') : t('compliance.deal_cards.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modale Édition client */}
      {showEditClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => !savingClient && setShowEditClientModal(false)}>
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-gray-200 px-5 py-4">
              <h3 className="text-lg font-semibold text-gray-900">{t('compliance.deal_cards.edit_client_modal_title')}</h3>
            </div>
            <form onSubmit={handleUpdateClient} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.brand_name_label')}</label>
                <input
                  type="text"
                  value={clientForm.company_name}
                  onChange={(e) => setClientForm((f) => ({ ...f, company_name: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder={t('compliance.deal_cards.brand_placeholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.contact_name')}</label>
                <input
                  type="text"
                  value={clientForm.contact_name}
                  onChange={(e) => setClientForm((f) => ({ ...f, contact_name: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder={t('compliance.deal_cards.contact_name_placeholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.contact_email')}</label>
                <input
                  type="email"
                  value={clientForm.contact_email}
                  onChange={(e) => setClientForm((f) => ({ ...f, contact_email: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder={t('compliance.deal_cards.contact_email_placeholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.deal_cards.address')}</label>
                <textarea
                  value={clientForm.address}
                  onChange={(e) => setClientForm((f) => ({ ...f, address: e.target.value }))}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder={t('compliance.deal_cards.address_placeholder')}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowEditClientModal(false)}
                  disabled={savingClient}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                >
                  {t('compliance.deal_cards.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={savingClient}
                  className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
                >
                  {savingClient ? t('compliance.deal_cards.saving') : t('compliance.deal_cards.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ContractGenerationModal
        isOpen={showContractModal}
        onClose={() => setShowContractModal(false)}
        client={client}
        deals={deals}
        onGenerate={handleContractGenerate}
      />

      <ContractSuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          setSelectedDealsForSuccess([])
        }}
        onMarkAsSigned={handleMarkAsSigned}
        onKeepDraft={handleKeepDraft}
      />

      <QuotaModal isOpen={showQuotaModal} onClose={() => setShowQuotaModal(false)} />
    </>
  )
}
