import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth.jsx'
import { supabase } from '../lib/supabase'

export default function QuickAddClientForm({ onAdded, isPro = false }) {
  const { t } = useTranslation()
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [form, setForm] = useState({
    company_name: '',
    description: '',
    amount_euros: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    const name = form.company_name?.trim()
    if (!name) {
      setError(t('compliance.new_deal_form.error_brand_required'))
      return
    }
    if (!user?.id) return

    setSaving(true)
    try {
      const { data: clientData, error: clientErr } = await supabase
        .from('clients')
        .insert({
          user_id: user.id,
          company_name: name,
        })
        .select('id')
        .single()

      if (clientErr) throw clientErr
      const clientId = clientData?.id
      if (!clientId) throw new Error('Client non créé')

      const amountCentimes = Math.round(parseFloat(form.amount_euros || '0') * 100)
      const { error: dealErr } = await supabase.from('deals').insert({
        user_id: user.id,
        client_id: clientId,
        description: form.description?.trim() || null,
        cash_amount: amountCentimes,
        gift_value: 0,
        status: 'draft',
      })

      if (dealErr) throw dealErr

      setForm({ company_name: '', description: '', amount_euros: '' })
      setSuccess(true)
      onAdded?.()
    } catch (err) {
      setError(err?.message || t('compliance.new_deal_form.error_generic'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      className={`rounded-2xl border-2 shadow-lg p-5 ${
        isPro
          ? 'border-amber-400 shadow-amber-100 bg-gradient-to-br from-white to-amber-50/50'
          : 'border-blue-500 shadow-blue-100 bg-white'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('compliance.new_deal_form.title')}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.new_deal_form.brand_name')}</label>
          <input
            type="text"
            value={form.company_name}
            onChange={(e) => setForm((f) => ({ ...f, company_name: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder={t('compliance.new_deal_form.brand_placeholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.new_deal_form.proposal')}</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            rows={2}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder={t('compliance.new_deal_form.proposal_placeholder')}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('compliance.new_deal_form.amount')}</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.amount_euros}
            onChange={(e) => setForm((f) => ({ ...f, amount_euros: e.target.value }))}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder={t('compliance.new_deal_form.amount_placeholder')}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-emerald-600">{t('compliance.new_deal_form.success')}</p>}
        <button
          type="submit"
          disabled={saving}
          className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:opacity-50 transition-colors ${
            isPro ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {saving ? t('compliance.new_deal_form.adding') : t('compliance.new_deal_form.add_btn')}
        </button>
      </form>
    </div>
  )
}
