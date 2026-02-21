import React from 'react'
import { pdf } from '@react-pdf/renderer'
import ContractDocument from './ContractDocument.jsx'

/**
 * Calcule le montant total du deal (centimes).
 */
function getTotalAmount(deal) {
  const total = Number(deal?.total_deal_value)
  if (!Number.isNaN(total) && total >= 0) return total
  const cash = Number(deal?.cash_amount) || 0
  const gift = Number(deal?.gift_value) || 0
  return cash + gift
}

/**
* Génère le PDF du contrat et déclenche le téléchargement.
* @param {Object|Object[]} dealsOrOne - Un deal ou un tableau de deals
* @param {Object} client - Le client / marque
* @param {Object} userProfile - Profil légal du créateur
* @param {Object} [rights] - Options cession de droits : { duration, territory, supports }
* @param {boolean} [isPro=false] - Statut Pro pour gérer filigrane / limites.
* @param {Function} [t] - Fonction de traduction i18n (useTranslation().t) pour le contenu du PDF.
*/
export async function generateContract(dealsOrOne, client, userProfile, rights, isPro = false, t) {
  const deals = Array.isArray(dealsOrOne) ? dealsOrOne : [dealsOrOne]
  const totalAmount = deals.reduce((sum, d) => sum + getTotalAmount(d), 0)
  const doc = React.createElement(ContractDocument, {
    deals,
    client,
    userProfile,
    totalAmount,
    rights,
    isPro,
    t,
  })
  const blob = await pdf(doc).toBlob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  const brand = (client?.company_name || 'client').replace(/[^a-z0-9-_]/gi, '_')
  const date = new Date().toISOString().slice(0, 10)
  const prefix = t ? t('pdf_contract.filename_prefix') : 'Contrat'
  a.download = `${prefix}_${brand}_${date}.pdf`
  a.click()
  URL.revokeObjectURL(url)
}
