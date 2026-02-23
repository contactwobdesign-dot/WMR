import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { usePostHog } from 'posthog-js/react'
import {
  PLATFORMS,
  NICHES,
  CONTENT_TYPES,
  TWITCH_CONTENT_TYPES,
  COMPANY_SIZES,
  AUDIENCE_LOCATIONS,
  CAMPAIGN_TYPES,
  PARTNERSHIP_DURATION,
  EXCLUSIVITY_OPTIONS,
  USAGE_RIGHTS,
} from '../../lib/constants'
import { useCurrency } from '../../context/CurrencyContext.jsx'
import { Tooltip } from '../UI/Tooltip'

function FreeCalculatorForm({ onSubmit, disabled = false }) {
  const { t } = useTranslation()
  const { formatPrice, currencySymbol } = useCurrency()
   const posthog = usePostHog()
  const [formData, setFormData] = useState({
    platform: '',
    niche: '',
    subscribers: '',
    averageViews: '',
    engagementRate: '',
    contentType: '',
    companySize: '',
    audienceLocation: '',
    offeredPrice: '',
    // Twitch-specific fields
    averageConcurrentViewers: '',
    followers: '',
    // New detailed sponsor fields (required in FREE)
    campaignType: '',
    partnershipDuration: '',
    exclusivity: '',
    usageRights: '',
  })

  const [errors, setErrors] = useState({})
  const [cpm, setCpm] = useState('')

  // Charger les valeurs "stables" depuis le localStorage au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wmr_user_defaults')
      if (saved) {
        const parsed = JSON.parse(saved)
        setFormData(prev => ({
          ...prev,
          niche: parsed.niche || prev.niche,
          subscribers: parsed.subscribers || prev.subscribers,
          averageViews: parsed.averageViews || prev.averageViews,
          engagementRate: parsed.engagementRate || prev.engagementRate,
          audienceLocation: parsed.audienceLocation || prev.audienceLocation,
          companySize: parsed.companySize || prev.companySize,
        }))
      }
    } catch (e) {
      console.error('Failed to load user defaults from localStorage', e)
    }
  }, [])

  // Quand la niche change, on pré-remplit le CPM avec la moyenne du marché
  useEffect(() => {
    if (!formData.niche) {
      return
    }
    const nicheDef = NICHES.find(n => n.value === formData.niche)
    if (nicheDef?.cpm != null) {
      setCpm(String(nicheDef.cpm))
    }
  }, [formData.niche])

  // Format number with thousand separators for display
  const formatNumber = (value) => {
    if (!value) return ''
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  // Remove formatting for storage
  const parseNumber = (value) => {
    return value.replace(/,/g, '')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Handle number inputs with formatting
    if (['subscribers', 'averageViews', 'offeredPrice', 'averageConcurrentViewers', 'followers'].includes(name)) {
      const numericValue = parseNumber(value)
      if (numericValue === '' || /^\d+$/.test(numericValue)) {
        setFormData(prev => ({ ...prev, [name]: numericValue }))
      }
    } else if (name === 'engagementRate') {
      // Allow decimals for engagement rate
      if (value === '' || /^\d*\.?\d*$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    const isTwitch = formData.platform === 'twitch'

    if (!formData.platform) newErrors.platform = t('calculator_form.errors.platform_required')
    if (!formData.niche) newErrors.niche = t('calculator_form.errors.niche_required')
    
    if (isTwitch) {
      // Twitch-specific validation
      if (!formData.averageConcurrentViewers) {
        newErrors.averageConcurrentViewers = t('calculator_form.errors.ccv_required')
      } else if (parseInt(formData.averageConcurrentViewers) <= 0) {
        newErrors.averageConcurrentViewers = t('calculator_form.errors.ccv_positive')
      }
      if (!formData.followers) {
        newErrors.followers = t('calculator_form.errors.followers_required')
      } else if (parseInt(formData.followers) <= 0) {
        newErrors.followers = t('calculator_form.errors.followers_positive')
      }
    } else {
      // Standard validation
      if (!formData.subscribers) {
        newErrors.subscribers = t('calculator_form.errors.subscribers_required')
      } else if (parseInt(formData.subscribers) <= 0) {
        newErrors.subscribers = t('calculator_form.errors.subscribers_positive')
      }
      if (!formData.averageViews) {
        newErrors.averageViews = t('calculator_form.errors.average_views_required')
      } else if (parseInt(formData.averageViews) <= 0) {
        newErrors.averageViews = t('calculator_form.errors.average_views_positive')
      }
      if (!formData.engagementRate) {
        newErrors.engagementRate = t('calculator_form.errors.engagement_required')
      } else if (parseFloat(formData.engagementRate) < 0 || parseFloat(formData.engagementRate) > 100) {
        newErrors.engagementRate = t('calculator_form.errors.engagement_range')
      }
    }
    
    if (!formData.contentType) newErrors.contentType = t('calculator_form.errors.content_type_required')
    if (!formData.companySize) newErrors.companySize = t('calculator_form.errors.company_size_required')
    if (!formData.audienceLocation) newErrors.audienceLocation = t('calculator_form.errors.audience_location_required')
    
    // New detailed sponsor fields (REQUIRED in FREE)
    if (!formData.campaignType) newErrors.campaignType = t('calculator_form.errors.campaign_type_required')
    if (!formData.partnershipDuration) newErrors.partnershipDuration = t('calculator_form.errors.partnership_duration_required')
    if (!formData.exclusivity) newErrors.exclusivity = t('calculator_form.errors.exclusivity_required')
    if (!formData.usageRights) newErrors.usageRights = t('calculator_form.errors.usage_rights_required')
    
    if (!formData.offeredPrice) {
      newErrors.offeredPrice = t('calculator_form.errors.offered_price_required')
    } else if (parseInt(formData.offeredPrice) <= 0) {
      newErrors.offeredPrice = t('calculator_form.errors.offered_price_positive')
    }

    setErrors(newErrors)
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newErrors = validate()
    const isValid = Object.keys(newErrors).length === 0

    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    if (!isValid) {
      if (posthog && !isLocalhost) {
        try {
          posthog.capture('calculator_attempt_failed', {
            missing_fields: Object.keys(newErrors),
            platform: formData.platform || null,
          })
        } catch (err) {
          console.error('PostHog calculator_attempt_failed error:', err)
        }
      }
      return
    }
    
    const isTwitch = formData.platform === 'twitch'
    
    // Convert string numbers to actual numbers
    const submitData = {
      ...formData,
      offeredPrice: parseInt(formData.offeredPrice),
      customCpm: Number(cpm),
    }
    
    if (isTwitch) {
      submitData.averageConcurrentViewers = parseInt(formData.averageConcurrentViewers)
      submitData.followers = parseInt(formData.followers)
    } else {
      submitData.subscribers = parseInt(formData.subscribers)
      submitData.averageViews = parseInt(formData.averageViews)
      submitData.engagementRate = parseFloat(formData.engagementRate)
    }
    
    // Tracking succès calculateur
    const views = isTwitch
      ? submitData.averageConcurrentViewers
      : submitData.averageViews
    if (posthog && !isLocalhost) {
      try {
        posthog.capture('calculator_success', {
          platform: submitData.platform,
          niche: submitData.niche,
          views,
        })
      } catch (err) {
        console.error('PostHog calculator_success error:', err)
      }
    }
    
    // Sauvegarder les champs "stables" dans le localStorage
    try {
      const stableDefaults = {
        niche: formData.niche,
        subscribers: formData.subscribers,
        averageViews: formData.averageViews,
        engagementRate: formData.engagementRate,
        audienceLocation: formData.audienceLocation,
        companySize: formData.companySize,
      }
      localStorage.setItem('wmr_user_defaults', JSON.stringify(stableDefaults))
    } catch (e) {
      console.error('Failed to save user defaults to localStorage', e)
    }

    onSubmit(submitData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-xl p-6">
      <div className="space-y-4">
        {/* Platform */}
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
            {t('calculator_form.labels.platform')}
          </label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
              errors.platform ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">{t('calculator_form.placeholders.select_platform')}</option>
            {PLATFORMS.map(platform => (
              <option key={platform.value} value={platform.value}>
                {t(`calculator_form.options.platform.${platform.value}`)}
              </option>
            ))}
          </select>
          {errors.platform && (
            <p className="mt-1 text-sm text-red-600">{errors.platform}</p>
          )}
        </div>

        {/* Niche + CPM */}
        {/* Wrapper Global */}
        <div className="flex flex-col gap-1">

          {/* LIGNE 1 : LABELS (Desktop Only) */}
          {/* Utilise items-baseline pour aligner le texte "Your Niche" et "CPM (€)" sur la ligne de lecture */}
          <div className="hidden md:flex gap-4 items-baseline">
            <label htmlFor="niche" className="flex-1 block text-sm font-medium text-gray-700">
              {t('calculator_form.labels.niche')}
            </label>
            <label htmlFor="cpm" className="w-[140px] block text-sm font-medium text-gray-700">
              {t('calculator_form.labels.cpm')} ({currencySymbol})
            </label>
          </div>

          {/* LIGNE 2 : INPUTS + LABELS MOBILES */}
          {/* Utilise items-start pour aligner le HAUT des boîtes (Select et Input) */}
          <div className="flex flex-col md:flex-row gap-4 items-start">
            
            {/* COLONNE NICHE */}
            <div className="w-full md:flex-1">
              <label htmlFor="niche" className="md:hidden block text-sm font-medium text-gray-700 mb-1">
                {t('calculator_form.labels.niche')}
              </label>
              <select
                id="niche"
                name="niche"
                value={formData.niche}
                onChange={handleChange}
                disabled={disabled}
                className={`h-[42px] w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 leading-tight block disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.niche ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{t('calculator_form.placeholders.select_niche')}</option>
                {NICHES.map(niche => (
                  <option key={niche.value} value={niche.value}>
                    {t(`calculator_form.options.niche.${niche.value}`)}
                  </option>
                ))}
              </select>
              {errors.niche && <p className="mt-1 text-sm text-red-600">{errors.niche}</p>}
            </div>

            {/* COLONNE CPM */}
            <div className="w-full md:w-[140px]">
              <label htmlFor="cpm" className="md:hidden block text-sm font-medium text-gray-700 mb-1">
                {t('calculator_form.labels.cpm')} ({currencySymbol})
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">{currencySymbol}</span>
                </div>
                <input
                  type="number"
                  id="cpm"
                  name="cpm"
                  min="0"
                  step="0.01"
                  value={cpm}
                  onChange={(e) => setCpm(e.target.value)}
                  disabled={disabled}
                  placeholder={t('calculator_form.placeholders.cpm_placeholder')}
                  className="h-[42px] w-full pl-7 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 leading-tight block disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Twitch-specific fields */}
        {formData.platform === 'twitch' ? (
          <>
            {/* Average Concurrent Viewers and Followers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Average Concurrent Viewers */}
              <div>
                <label htmlFor="averageConcurrentViewers" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('calculator_form.labels.average_concurrent_viewers')}
                </label>
                <input
                  type="text"
                  id="averageConcurrentViewers"
                  name="averageConcurrentViewers"
                  value={formatNumber(formData.averageConcurrentViewers)}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder={t('calculator_form.placeholders.ccv_placeholder')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.averageConcurrentViewers ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.averageConcurrentViewers && (
                  <p className="mt-1 text-sm text-red-600">{errors.averageConcurrentViewers}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">{t('calculator_form.hints.ccv_during_stream')}</p>
              </div>

              {/* Followers */}
              <div>
                <label htmlFor="followers" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('calculator_form.labels.followers')}
                </label>
                <input
                  type="text"
                  id="followers"
                  name="followers"
                  value={formatNumber(formData.followers)}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder={t('calculator_form.placeholders.followers_placeholder')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.followers ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.followers && (
                  <p className="mt-1 text-sm text-red-600">{errors.followers}</p>
                )}
              </div>
            </div>

            {/* Sponsorship Type */}
            <div>
              <label htmlFor="contentType" className="block text-sm font-medium text-gray-700 mb-1">
                {t('calculator_form.labels.sponsorship_type')}
              </label>
              <select
                id="contentType"
                name="contentType"
                value={formData.contentType}
                onChange={handleChange}
                disabled={disabled}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.contentType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">{t('calculator_form.placeholders.select_sponsorship_type')}</option>
                {TWITCH_CONTENT_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {t(`calculator_form.options.twitch_content_type.${type.value}`)}
                  </option>
                ))}
              </select>
              {errors.contentType && (
                <p className="mt-1 text-sm text-red-600">{errors.contentType}</p>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Standard platform fields */}
            {/* Subscribers and Average Views - 2 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Subscribers */}
              <div>
<label htmlFor="subscribers" className="block text-sm font-medium text-gray-700 mb-1">
                {t('calculator_form.labels.subscribers')}
                </label>
                <input
                  type="text"
                  id="subscribers"
                  name="subscribers"
                  value={formatNumber(formData.subscribers)}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder={t('calculator_form.placeholders.subscribers')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.subscribers ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.subscribers && (
                  <p className="mt-1 text-sm text-red-600">{errors.subscribers}</p>
                )}
              </div>

              {/* Average Views */}
              <div>
<label htmlFor="averageViews" className="block text-sm font-medium text-gray-700 mb-1">
                {t('calculator_form.labels.average_views')}
                </label>
                <input
                  type="text"
                  id="averageViews"
                  name="averageViews"
                  value={formatNumber(formData.averageViews)}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder={t('calculator_form.placeholders.average_views_placeholder')}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.averageViews ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.averageViews && (
                  <p className="mt-1 text-sm text-red-600">{errors.averageViews}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">{t('calculator_form.hints.views_last_10')}</p>
              </div>
            </div>

            {/* Engagement Rate and Content Type - 2 columns on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Engagement Rate */}
              <div>
                <label htmlFor="engagementRate" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('calculator_form.labels.engagement')}
                </label>
                <input
                  type="text"
                  id="engagementRate"
                  name="engagementRate"
                  value={formData.engagementRate}
                  onChange={handleChange}
                  disabled={disabled}
                  placeholder={t('calculator_form.placeholders.engagement_placeholder')}
                  step="0.1"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.engagementRate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.engagementRate && (
                  <p className="mt-1 text-sm text-red-600">{errors.engagementRate}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">(likes + comments) / views × 100</p>
              </div>

              {/* Content Type */}
              <div>
<label htmlFor="contentType" className="block text-sm font-medium text-gray-700 mb-1">
                {t('calculator_form.labels.content_type')}
                </label>
                <select
                  id="contentType"
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  disabled={disabled}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.contentType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{t('calculator_form.placeholders.select_content_type')}</option>
                  {CONTENT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {t(`calculator_form.options.content_type.${type.value}`)}
                    </option>
                  ))}
                </select>
                {errors.contentType && (
                  <p className="mt-1 text-sm text-red-600">{errors.contentType}</p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Company Size */}
        <div>
          <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
            {t('calculator_form.labels.company_size')}
          </label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
              errors.companySize ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">{t('calculator_form.placeholders.select_company_size')}</option>
            {COMPANY_SIZES.map(company => (
              <option key={company.value} value={company.value}>
                {t(`calculator_form.options.company_size.${company.value}`)}
              </option>
            ))}
          </select>
          {errors.companySize && (
            <p className="mt-1 text-sm text-red-600">{errors.companySize}</p>
          )}
        </div>

        {/* Audience Location */}
        <div>
          <label htmlFor="audienceLocation" className="block text-sm font-medium text-gray-700 mb-1">
            {t('calculator_form.labels.audience_location')}
          </label>
          <select
            id="audienceLocation"
            name="audienceLocation"
            value={formData.audienceLocation}
            onChange={handleChange}
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
              errors.audienceLocation ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">{t('calculator_form.placeholders.select_audience_location')}</option>
            {AUDIENCE_LOCATIONS.map(location => (
              <option key={location.value} value={location.value}>
                {t(`calculator_form.options.audience_location.${location.value}`)}
              </option>
            ))}
          </select>
          {errors.audienceLocation && (
            <p className="mt-1 text-sm text-red-600">{errors.audienceLocation}</p>
          )}
        </div>

        {/* Section: About the Sponsor */}
        <div className="border-t border-gray-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {t('calculator_form.labels.about_sponsor')}
          </h3>

          {/* Campaign Type */}
          <div className="mb-4">
            <label htmlFor="campaignType" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              {t('calculator_form.labels.campaign_type')}
              <Tooltip text={t('calculator_form.tooltips.campaign_type')} />
            </label>
            <select
              id="campaignType"
              name="campaignType"
              value={formData.campaignType}
              onChange={handleChange}
              disabled={disabled}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.campaignType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{t('calculator_form.placeholders.select_campaign_type')}</option>
              {CAMPAIGN_TYPES.map(type => (
                <option key={type.value} value={type.value}>
                  {t(`calculator_form.options.campaign_type.${type.value}`)}
                </option>
              ))}
            </select>
            {errors.campaignType && (
              <p className="mt-1 text-sm text-red-600">{errors.campaignType}</p>
            )}
          </div>

          {/* Partnership Duration */}
          <div className="mb-4">
            <label htmlFor="partnershipDuration" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              {t('calculator_form.labels.partnership_duration')}
              <Tooltip text={t('calculator_form.tooltips.partnership_duration')} />
            </label>
            <select
              id="partnershipDuration"
              name="partnershipDuration"
              value={formData.partnershipDuration}
              onChange={handleChange}
              disabled={disabled}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.partnershipDuration ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{t('calculator_form.placeholders.select_partnership_duration')}</option>
              {PARTNERSHIP_DURATION.map(duration => (
                <option key={duration.value} value={duration.value}>
                  {t(`calculator_form.options.partnership_duration.${duration.value}`)}
                </option>
              ))}
            </select>
            {errors.partnershipDuration && (
              <p className="mt-1 text-sm text-red-600">{errors.partnershipDuration}</p>
            )}
          </div>

          {/* Exclusivity */}
          <div className="mb-4">
            <label htmlFor="exclusivity" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              {t('calculator_form.labels.exclusivity')}
              <Tooltip text={t('calculator_form.tooltips.exclusivity')} />
            </label>
            <select
              id="exclusivity"
              name="exclusivity"
              value={formData.exclusivity}
              onChange={handleChange}
              disabled={disabled}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.exclusivity ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{t('calculator_form.placeholders.select_exclusivity')}</option>
              {EXCLUSIVITY_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>
                  {t(`calculator_form.options.exclusivity.${option.value}`)}
                </option>
              ))}
            </select>
            {errors.exclusivity && (
              <p className="mt-1 text-sm text-red-600">{errors.exclusivity}</p>
            )}
          </div>

          {/* Usage Rights */}
          <div className="mb-4">
            <label htmlFor="usageRights" className="flex items-center text-sm font-medium text-gray-700 mb-1">
              {t('calculator_form.labels.usage_rights')}
              <Tooltip text={t('calculator_form.tooltips.usage_rights')} />
            </label>
            <select
              id="usageRights"
              name="usageRights"
              value={formData.usageRights}
              onChange={handleChange}
              disabled={disabled}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.usageRights ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">{t('calculator_form.placeholders.select_usage_rights')}</option>
              {USAGE_RIGHTS.map(right => (
                <option key={right.value} value={right.value}>
                  {t(`calculator_form.options.usage_rights.${right.value}`)}
                </option>
              ))}
            </select>
            {errors.usageRights && (
              <p className="mt-1 text-sm text-red-600">{errors.usageRights}</p>
            )}
          </div>
        </div>

        {/* Offered Price */}
        <div>
          <label htmlFor="offeredPrice" className="block text-sm font-medium text-gray-700 mb-1">
            {t('calculator_form.labels.offered_price')}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="text"
              id="offeredPrice"
              name="offeredPrice"
              value={formatNumber(formData.offeredPrice)}
              onChange={handleChange}
              disabled={disabled}
              placeholder={t('calculator_form.placeholders.offered_price_placeholder')}
              className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.offeredPrice ? 'border-red-500' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.offeredPrice && (
            <p className="mt-1 text-sm text-red-600">{errors.offeredPrice}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={disabled}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? t('calculator_form.buttons.evaluating') : t('calculator_form.buttons.evaluate')}
        </button>
      </div>
    </form>
  )
}

export default FreeCalculatorForm
