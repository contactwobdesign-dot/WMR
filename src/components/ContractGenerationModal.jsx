import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { FileSignature } from 'lucide-react'

function formatEur(centimes) {
  if (centimes == null || Number.isNaN(centimes)) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(centimes / 100)
}

function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr + 'Z').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getDealValue(d) {
  const total = Number(d?.total_deal_value)
  if (!Number.isNaN(total) && total >= 0) return total
  return (Number(d?.cash_amount) || 0) + (Number(d?.gift_value) || 0)
}

const DEFAULT_DURATION = '1 an'
const DEFAULT_TERRITORY = 'Monde'
const DEFAULT_SUPPORTS = 'Réseaux sociaux + Site web'

export default function ContractGenerationModal({ isOpen, onClose, client, deals = [], onGenerate }) {
  const { t } = useTranslation()
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [rightsType, setRightsType] = useState('standard')
  const [duration, setDuration] = useState(DEFAULT_DURATION)
  const [territory, setTerritory] = useState(DEFAULT_TERRITORY)
  const [supports, setSupports] = useState(DEFAULT_SUPPORTS)

  const sortedDeals = [...deals].sort((a, b) => {
    const da = a.contract_date ? new Date(a.contract_date + 'Z').getTime() : 0
    const db = b.contract_date ? new Date(b.contract_date + 'Z').getTime() : 0
    return db - da
  })

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && deals.length > 0) {
      setSelectedIds(new Set(deals.map((d) => d.id)))
    }
    if (!isOpen) setSelectedIds(new Set())
  }, [isOpen, deals.length])

  const toggle = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const selectedDeals = sortedDeals.filter((d) => selectedIds.has(d.id))
  const totalCentimes = selectedDeals.reduce((sum, d) => sum + getDealValue(d), 0)
  const canGenerate = selectedDeals.length >= 1

  const handleGenerate = () => {
    if (!canGenerate) return
    const rightsOptions =
      rightsType === 'standard'
        ? {
            duration: '1 an',
            territory: 'Monde',
            supports: 'Réseaux sociaux du Client et du Prestataire + Site web du Client',
          }
        : {
            duration: (duration != null && String(duration).trim()) ? String(duration).trim() : DEFAULT_DURATION,
            territory: (territory != null && String(territory).trim()) ? String(territory).trim() : DEFAULT_TERRITORY,
            supports: (supports != null && String(supports).trim()) ? String(supports).trim() : DEFAULT_SUPPORTS,
          }
    onGenerate(selectedDeals, rightsOptions)
    onClose?.()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-xl"
      >
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {t('contract_modal.title', { client: client?.company_name ?? t('contract_modal.title_fallback') })}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{t('contract_modal.hint_select')}</p>
        </div>

        <div className="px-5 py-4 max-h-72 overflow-y-auto">
          {sortedDeals.length === 0 ? (
            <p className="text-sm text-gray-500 py-4">{t('contract_modal.no_deals')}</p>
          ) : (
            <ul className="space-y-1">
              {sortedDeals.map((deal) => {
                const isSigned = deal.status === 'signed'
                const checked = selectedIds.has(deal.id)
                const value = getDealValue(deal)
                return (
                  <li
                    key={deal.id}
                    className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
                      isSigned ? 'border-gray-100 bg-gray-50/50' : 'border-gray-100 bg-white'
                    }`}
                  >
                    <label className="flex cursor-pointer items-center gap-3 flex-1 min-w-0">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggle(deal.id)}
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <span className="flex-1 min-w-0 flex items-center gap-3 text-sm">
                        <span
                          className={`shrink-0 w-20 ${isSigned ? 'text-gray-400 line-through' : 'text-gray-600'}`}
                        >
                          {formatDate(deal.contract_date)}
                        </span>
                        <span
                          className={`flex-1 min-w-0 truncate ${isSigned ? 'text-gray-400 line-through' : 'font-medium text-gray-900'}`}
                        >
                          {deal.description || t('contract_modal.no_description')}
                        </span>
                        <span
                          className={`shrink-0 font-medium ${isSigned ? 'text-gray-400 line-through' : 'text-gray-900'}`}
                        >
                          {formatEur(value)}
                        </span>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Options de Cession de Droits */}
        <div className="border-t border-gray-100 px-5 py-4 space-y-3">
          <p className="text-sm font-medium text-gray-700">{t('contract_modal.rights_options')}</p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rightsType"
                checked={rightsType === 'standard'}
                onChange={() => setRightsType('standard')}
                className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{t('contract_modal.rights_standard')}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="rightsType"
                checked={rightsType === 'custom'}
                onChange={() => setRightsType('custom')}
                className="h-4 w-4 border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{t('contract_modal.rights_custom')}</span>
            </label>
          </div>
          {rightsType === 'custom' && (
            <div className="grid grid-cols-1 gap-2 pl-6">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-0.5">{t('contract_modal.duration')}</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder={t('contract_modal.placeholder_duration')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-0.5">{t('contract_modal.territory')}</label>
                <input
                  type="text"
                  value={territory}
                  onChange={(e) => setTerritory(e.target.value)}
                  placeholder={t('contract_modal.placeholder_territory')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-0.5">{t('contract_modal.supports')}</label>
                <input
                  type="text"
                  value={supports}
                  onChange={(e) => setSupports(e.target.value)}
                  placeholder={t('contract_modal.placeholder_supports')}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-100 px-5 py-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{t('contract_modal.total_services')}</span>
            <span className="font-semibold text-gray-900">{formatEur(totalCentimes)}</span>
          </div>
          <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
            {t('contract_modal.warning_no_save')}
          </p>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              {t('contract_modal.cancel')}
            </button>
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canGenerate}
              className="inline-flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              <FileSignature className="h-4 w-4" />
              {t('contract_modal.generate_btn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
