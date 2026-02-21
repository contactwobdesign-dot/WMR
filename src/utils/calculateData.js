import { calculateFullPrice } from '../lib/calculatePrice'

/**
 * Calcule le résultat de taux à partir des données formulaire (Home ou Dashboard).
 * Utilisé par le calculateur public et par le Dashboard pour le flux "pending calculation".
 * @param {Object} inputs - Données du formulaire (camelCase): platform, niche, subscribers, averageViews, engagementRate, contentType, companySize, audienceLocation, etc.
 * @returns {Object} - { min, max, average, breakdown }
 */
export function calculateRateResult(inputs) {
  if (!inputs) return null
  return calculateFullPrice({
    platform: inputs.platform,
    niche: inputs.niche,
    subscribers: inputs.subscribers,
    averageViews: inputs.averageViews,
    engagementRate: inputs.engagementRate,
    contentType: inputs.contentType,
    companySize: inputs.companySize,
    audienceLocation: inputs.audienceLocation,
    campaignType: inputs.campaignType ?? '',
    partnershipDuration: inputs.partnershipDuration ?? '',
    exclusivity: inputs.exclusivity ?? '',
    usageRights: inputs.usageRights ?? '',
    customCpm: inputs.customCpm,
  })
}
