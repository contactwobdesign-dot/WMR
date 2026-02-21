import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../lib/supabase'

const THRESHOLD_CENTIMES = 100000 // 1 000 €
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000

const formatEur = (centimes) => {
  if (centimes == null || Number.isNaN(centimes)) return '—'
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(centimes / 100)
}

/**
 * Hook Loi Influenceurs 2023 : vérifie si le cumul (Cash + Cadeaux) avec une marque
 * dépasse 1 000 € sur 12 mois et si un contrat écrit est obligatoire.
 * @param {string | null} clientId - ID du client (marque). Si null, pas de requête.
 * @returns {{ loading: boolean, error: Error | null, compliance: object | null }}
 */
export function useComplianceCheck(clientId) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [deals, setDeals] = useState([])

  useEffect(() => {
    if (clientId == null || clientId === '') {
      setDeals([])
      setError(null)
      setLoading(false)
      return
    }

    let mounted = true
    setLoading(true)
    setError(null)

    const oneYearAgo = new Date(Date.now() - ONE_YEAR_MS)
    const dateStr = oneYearAgo.toISOString().slice(0, 10)

    supabase
      .from('deals')
      .select('total_deal_value, status')
      .eq('client_id', clientId)
      .gte('contract_date', dateStr)
      .then(({ data, error: err }) => {
        if (!mounted) return
        setLoading(false)
        if (err) {
          setError(err)
          setDeals([])
          return
        }
        setDeals(data ?? [])
      })

    return () => {
      mounted = false
    }
  }, [clientId])

  const compliance = useMemo(() => {
    const totalCentimes = deals.reduce((sum, d) => sum + (Number(d?.total_deal_value) || 0), 0)
    const missingContracts = deals.filter(
      (d) => d?.status !== 'signed' && d?.status !== 'paid'
    ).length
    const isThresholdReached = totalCentimes > THRESHOLD_CENTIMES

    let riskLevel = 'SAFE'
    if (isThresholdReached) {
      riskLevel = missingContracts > 0 ? 'CRITICAL' : 'WARNING'
    }

    return {
      totalCumulated: formatEur(totalCentimes),
      totalCentimes,
      isThresholdReached,
      riskLevel,
      missingContractsCount: missingContracts,
    }
  }, [deals])

  return {
    loading,
    error,
    compliance: clientId != null && clientId !== '' ? compliance : null,
  }
}
