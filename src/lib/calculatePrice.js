import { 
  NICHES, 
  SIZE_BRACKETS, 
  CONTENT_TYPES, 
  ENGAGEMENT_BRACKETS, 
  COMPANY_SIZES, 
  AUDIENCE_LOCATIONS,
  VERDICT_THRESHOLDS,
  VERDICT_CONFIG,
  CAMPAIGN_TYPES,
  PARTNERSHIP_DURATION,
  EXCLUSIVITY_OPTIONS,
  USAGE_RIGHTS,
  PLATFORM_MULTIPLIERS,
} from './constants';

// Helper: trouve le bracket correspondant
const findBracket = (value, brackets) => {
  return brackets.find(b => value < b.max) || brackets[brackets.length - 1];
};

// Helper: trouve l'item par valeur
const findByValue = (value, array) => {
  return array.find(item => item.value === value);
};

/**
 * Calcule le prix complet avec breakdown
 */
export function calculateFullPrice({
  platform,
  niche,
  subscribers,
  averageViews,
  engagementRate,
  contentType,
  companySize,
  audienceLocation,
  // New optional detailed sponsor fields
  campaignType = '',
  partnershipDuration = '',
  exclusivity = '',
  usageRights = '',
  // Optional explicit CPM override
  customCpm = undefined,
}) {
  // Récupère les données
  const nicheData = findByValue(niche, NICHES);
  const sizeBracket = findBracket(subscribers, SIZE_BRACKETS);
  const contentData = findByValue(contentType, CONTENT_TYPES);
  const engagementBracket = findBracket(engagementRate, ENGAGEMENT_BRACKETS);
  const companyData = findByValue(companySize, COMPANY_SIZES);
  const locationData = findByValue(audienceLocation, AUDIENCE_LOCATIONS);

  // New detailed sponsor data (use multiplier 1.0 if not provided)
  const campaignData = campaignType ? findByValue(campaignType, CAMPAIGN_TYPES) : null;
  const durationData = partnershipDuration ? findByValue(partnershipDuration, PARTNERSHIP_DURATION) : null;
  const exclusivityData = exclusivity ? findByValue(exclusivity, EXCLUSIVITY_OPTIONS) : null;
  const usageData = usageRights ? findByValue(usageRights, USAGE_RIGHTS) : null;

  // Calculs
  const explicitCpm = customCpm != null && !Number.isNaN(Number(customCpm))
    ? Number(customCpm)
    : undefined;
  const baseCPM = explicitCpm ?? (nicheData?.cpm || 15);
  const basePrice = (averageViews / 1000) * baseCPM;
  
  const sizeMultiplier = sizeBracket?.multiplier || 1.0;
  const contentMultiplier = contentData?.multiplier || 1.0;
  const engagementMultiplier = engagementBracket?.multiplier || 1.0;
  const companyMultiplier = companyData?.multiplier || 1.0;
  const locationMultiplier = locationData?.multiplier || 1.0;

  // FIX: Normalisation pour matcher les clés (YouTube -> youtube)
  const normalizedPlatform = platform?.toLowerCase().trim();

  // Platform-level monetization multiplier
  const platformMultiplier = PLATFORM_MULTIPLIERS[normalizedPlatform] ?? 1.0;

  // New detailed sponsor multipliers (default to 1.0 if not provided)
  const campaignMultiplier = campaignData?.multiplier || 1.0;
  const durationMultiplier = durationData?.multiplier || 1.0;
  const exclusivityMultiplier = exclusivityData?.multiplier || 1.0;
  const usageMultiplier = usageData?.multiplier || 1.0;

  // Prix final (with new multipliers)
  let finalPrice = basePrice 
    * sizeMultiplier 
    * contentMultiplier 
    * engagementMultiplier 
    * companyMultiplier
    * locationMultiplier
    * platformMultiplier
    * campaignMultiplier
    * durationMultiplier
    * exclusivityMultiplier
    * usageMultiplier;

  // Plancher minimum : $50
  finalPrice = Math.max(finalPrice, 50);

  const average = Math.round(finalPrice);
  const min = Math.round(finalPrice * 0.8);
  const max = Math.round(finalPrice * 1.2);

  return {
    min,
    max,
    average,
    breakdown: {
      baseCPM,
      basePrice: Math.round(basePrice),
      sizeMultiplier,
      sizeLabel: sizeBracket?.label,
      contentMultiplier,
      contentLabel: contentData?.label,
      engagementMultiplier,
      engagementLabel: engagementBracket?.label,
      companyMultiplier,
      companyLabel: companyData?.label,
      companyAdvice: companyData?.advice,
      locationMultiplier,
      locationLabel: locationData?.label,
      locationAdvice: locationData?.advice,
      // New detailed sponsor breakdown
      campaignMultiplier,
      campaignLabel: campaignData?.label,
      durationMultiplier,
      durationLabel: durationData?.label,
      exclusivityMultiplier,
      exclusivityLabel: exclusivityData?.label,
      usageMultiplier,
      usageLabel: usageData?.label,
    },
  };
}

/**
 * Évalue une offre reçue (mode gratuit)
 */
export function evaluateOffer({
  platform,
  niche,
  subscribers,
  averageViews,
  engagementRate,
  contentType,
  companySize,
  audienceLocation,
  offeredPrice,
  // New optional detailed sponsor fields
  campaignType = '',
  partnershipDuration = '',
  exclusivity = '',
  usageRights = '',
  // Optional explicit CPM override
  customCpm = undefined,
}) {
  // Calcule d'abord le vrai prix (avec les nouveaux champs si fournis)
  const calculated = calculateFullPrice({
    platform,
    niche,
    subscribers,
    averageViews,
    engagementRate,
    contentType,
    companySize,
    audienceLocation,
    campaignType,
    partnershipDuration,
    exclusivity,
    usageRights,
    customCpm,
  });

  const { average } = calculated;
  const percentage = offeredPrice / average;
  const percentageOfValue = Math.round(percentage * 100);
  const difference = average - offeredPrice;

  // Détermine le verdict (4 niveaux)
  let verdictKey;
  if (percentage < VERDICT_THRESHOLDS.WAY_TOO_LOW) {
    verdictKey = 'WAY_TOO_LOW';
  } else if (percentage < VERDICT_THRESHOLDS.TOO_LOW) {
    verdictKey = 'TOO_LOW';
  } else if (percentage < VERDICT_THRESHOLDS.ACCEPTABLE) {
    verdictKey = 'ACCEPTABLE';
  } else {
    verdictKey = 'GOOD';
  }

  const verdictConfig = VERDICT_CONFIG[verdictKey];

  // Message personnalisé
  let message;
  if (verdictKey === 'WAY_TOO_LOW') {
    message = `This offer is only ${percentageOfValue}% of your market value. You'd be leaving $${difference} on the table.`;
  } else if (verdictKey === 'TOO_LOW') {
    message = `At ${percentageOfValue}% of your value, this needs serious negotiation. Push for at least 50% more.`;
  } else if (verdictKey === 'ACCEPTABLE') {
    message = `At ${percentageOfValue}% of your value, this is close but you could still negotiate $${difference} more.`;
  } else {
    message = `Great news! This offer represents ${percentageOfValue}% of your market value.`;
  }

  // Contexte entreprise
  const companyData = findByValue(companySize, COMPANY_SIZES);
  let companyContext;
  
  if (verdictKey === 'WAY_TOO_LOW' || verdictKey === 'TOO_LOW') {
    if (companySize === 'enterprise') {
      companyContext = 'This is surprisingly low for a major brand. They definitely have budget to pay more. Push back hard.';
    } else if (companySize === 'large') {
      companyContext = 'Large companies usually have room to negotiate. Don\'t accept this first offer.';
    } else if (companySize === 'startup') {
      companyContext = 'Small companies often start low. There may be room to negotiate, but manage expectations.';
    } else {
      companyContext = 'This company should be able to pay closer to market rate. Try negotiating.';
    }
  } else if (verdictKey === 'GOOD') {
    if (companySize === 'startup') {
      companyContext = 'Great offer from a small company! This shows they really value your content.';
    } else if (companySize === 'enterprise') {
      companyContext = 'Fair offer. You could still ask for perks: usage rights, longer term deal, or performance bonuses.';
    } else {
      companyContext = 'This is a fair market rate. You can accept with confidence.';
    }
  } else {
    companyContext = companyData?.advice || '';
  }

  return {
    verdict: verdictKey,
    verdictConfig,
    percentageOfValue,
    difference: Math.max(0, difference),
    message,
    companyContext,
    calculatedPrice: calculated, // Pour référence (pas affiché en mode gratuit)
  };
}
