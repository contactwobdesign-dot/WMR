import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Check, X, Shield, ArrowRight, Calculator, Lock, Crown, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'
import { createCheckoutSession } from '../lib/stripe'
import { PageGradient } from '../components/Layout/PageGradient'
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, CartesianGrid, XAxis } from 'recharts'
import { useCurrency } from '../context/CurrencyContext.jsx'

// Mini chart data for PRO card illustration
const miniChartData = [
  { month: 'Jan', value: 0 },
  { month: 'Feb', value: 450 },
  { month: 'Mar', value: 1200 },
  { month: 'Apr', value: 1100 },
  { month: 'May', value: 2800 },
  { month: 'Jun', value: 3500 },
]

function Pricing() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { user } = useAuth()
  const { formatPrice } = useCurrency()

  // Prix Pro en euros fixes (affichage uniquement, pas de conversion)
  const proPriceMonthlyDisplay = `${t('pricing.tiers.pro.price_monthly')} €`
  const proPriceAnnualDisplay = `${t('pricing.tiers.pro.price_annual')} €`
  const proPriceAnnualPerMonthDisplay = `${t('pricing.tiers.pro.price_annual_per_month')} €`

  const [billingCycle, setBillingCycle] = useState('monthly')
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const freeFeatures = useMemo(() => [
    { name: t('pricing.features.free_1'), included: true },
    { name: t('pricing.features.free_2'), included: true },
    { name: t('pricing.features.free_4'), included: true },
    { name: t('pricing.features.free_5'), included: true },
    { name: t('pricing.features.free_7'), included: false },
    { name: t('pricing.features.free_8'), included: false },
    { name: t('pricing.features.free_9'), included: false },
    { name: t('pricing.features.free_10'), included: false },
    { name: t('pricing.features.free_11'), included: false },
  ], [t])

  const proFeatures = useMemo(() => [
    { name: t('pricing.features.pro_1'), description: t('pricing.features.pro_1_desc'), included: true },
    { name: t('pricing.features.pro_2'), description: t('pricing.features.pro_2_desc'), included: true },
    { name: t('pricing.features.pro_3'), description: t('pricing.features.pro_3_desc'), included: true },
    { name: t('pricing.features.pro_4'), description: t('pricing.features.pro_4_desc'), included: true },
    { name: t('pricing.features.pro_5'), description: t('pricing.features.pro_5_desc'), included: true },
    { name: t('pricing.features.pro_6'), description: t('pricing.features.pro_6_desc'), included: true },
    { name: t('pricing.features.pro_7'), description: t('pricing.features.pro_7_desc'), included: true },
    { name: t('pricing.features.pro_8'), description: t('pricing.features.pro_8_desc'), included: true },
  ], [t])

  const handleUpgrade = async () => {
    if (!user) {
      navigate('/signup?redirect=pricing')
      return
    }

    setCheckoutLoading(true)
    try {
      const priceId = billingCycle === 'monthly'
        ? import.meta.env.VITE_STRIPE_PRICE_MONTHLY
        : import.meta.env.VITE_STRIPE_PRICE_ANNUAL

      const { url, error } = await createCheckoutSession(priceId, user.email)

      if (error) {
        throw new Error(error.message)
      }
      if (!url) {
        throw new Error(t('pricing.checkout.error_no_url'))
      }

      window.location.href = url
    } catch (err) {
      console.error("Stripe init failed:", err)
      alert(err?.message || t('pricing.checkout.error_generic'))
    } finally {
      setCheckoutLoading(false)
    }
  }

  return (
    <PageGradient>
      <Helmet>
        <title>{t('pricing.meta.title')}</title>
        <meta name="description" content={t('pricing.meta.description')} />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('pricing.header.title_start')}
              <span className="text-blue-600 font-bold" style={{ fontFamily: 'inherit' }}>
                {t('pricing.header.title_highlight')}
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              {t('pricing.header.subtitle')}
            </p>
          </div>

          {/* 2. BILLING TOGGLE + PRICING CARDS */}
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="inline-flex p-1 rounded-xl bg-gray-100 border border-gray-200 shadow-inner">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 sm:px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('pricing.billing.monthly')}
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`inline-flex items-center px-5 sm:px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {t('pricing.billing.annual')}
                <span className="ml-2 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded-full whitespace-nowrap">
                  {t('pricing.billing.save')}
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto items-stretch">
            
            {/* FREE Card */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 flex flex-col h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('pricing.tiers.free.name')}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{formatPrice(0)}</span>
                <span className="text-gray-600 ml-2">{t('pricing.tiers.free.forever')}</span>
              </div>
              <hr className="mb-6" />
              
              <div className="space-y-4 mb-8 flex-1">
                {freeFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${!feature.included ? 'opacity-50' : ''} ${index === 4 ? 'pt-4 border-t border-gray-200' : ''}`}
                  >
                    {feature.included ? (
                      <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <X size={20} className="text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={feature.included ? 'text-gray-700' : 'text-gray-500'}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/"
                className="block w-full text-center border-2 border-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('pricing.tiers.free.cta')}
              </Link>
            </div>

            {/* PRO Card */}
            <div className="bg-premium-50/30 rounded-xl shadow-xl p-8 border-2 border-premium-400 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{t('pricing.tiers.pro.name')}</h3>
                <Crown className="text-premium-600" size={24} />
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">
                  {billingCycle === 'annual' ? proPriceAnnualPerMonthDisplay : proPriceMonthlyDisplay}
                </span>
                <span className="text-gray-600 ml-2">
                  {t('pricing.tiers.pro.per_month')}
                  {billingCycle === 'annual' && (
                    <span className="block text-sm">{t('pricing.tiers.pro.billed_annually', { price: proPriceAnnualDisplay })}</span>
                  )}
                </span>
              </div>
              <hr className="mb-6" />
              
              <div className="space-y-4 mb-8 flex-1">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-gray-900 font-semibold text-sm">{feature.name}</span>
                      {feature.description && (
                        <span className="text-xs text-gray-500 block mt-0.5">
                          {feature.description}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpgrade}
                disabled={checkoutLoading}
                className="w-full bg-premium-600 hover:bg-premium-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkoutLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('pricing.tiers.pro.processing')}
                  </>
                ) : (
                  <>
                    {t('pricing.tiers.pro.cta')}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 3. ROI CALCULATOR */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 mb-20">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                <Calculator size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t('pricing.roi.title')}
              </h3>
              <p className="text-lg text-gray-700 mb-3">
                {t('pricing.roi.line1')}
              </p>
              <p className="text-sm text-gray-600">
                {t('pricing.roi.line2', { price: proPriceAnnualDisplay })}
              </p>
            </div>
          </div>

          {/* 4. COMPARAISON VISUELLE */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('pricing.comparison.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              
              {/* FREE Card */}
              <div className="bg-blue-50/50 rounded-xl p-6 border-2 border-blue-300">
                <div className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-lg inline-block mb-6">
                  {t('pricing.comparison.free_badge')}
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg">
                    {t('pricing.comparison.question')}
                  </p>
                  
                  {/* Verdict */}
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-2">⚠️</div>
                    <div className="text-2xl font-bold font-display text-orange-600 mb-2">{t('pricing.comparison.verdict_too_low')}</div>
                    <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                      {t('pricing.comparison.range_50_75')}
                    </div>
                    <div className="text-gray-600 text-sm mt-2">{t('pricing.comparison.of_market_value')}</div>
                  </div>
                  
                  {/* Blurred Price */}
                  <div className="relative">
                    <div className="bg-white rounded-lg p-6 text-center blur-sm">
                      <div className="text-3xl font-bold text-gray-400 mb-2">
                        $??? - $???
                      </div>
                      <div className="text-sm text-gray-400">{t('pricing.comparison.your_real_rate')}</div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-gray-300 text-gray-600 px-6 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
                        <Lock size={16} />
                        {t('pricing.comparison.upgrade_to_unlock')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRO Card */}
              <div className="bg-white rounded-xl p-6 border-2 border-premium-400 shadow-lg">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-premium-400 to-premium-600 text-white text-sm font-semibold px-4 py-2 rounded-lg mb-6">
                  <Sparkles size={16} />
                  {t('pricing.comparison.pro_badge')}
                </div>
                <div className="space-y-4">
                  <p className="text-gray-700 text-lg">
                    {t('pricing.comparison.question')}
                  </p>
                  
                  {/* Verdict */}
                  <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">⚠️</div>
                      <div className="text-2xl font-bold font-display text-orange-600 mb-2">{t('pricing.comparison.verdict_too_low')}</div>
                      <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {t('pricing.comparison.pct_market')}
                      </div>
                    </div>
                    
                    {/* Revealed Price */}
                    <div className="bg-white rounded-lg p-4 border border-premium-300 mt-4">
                      <div className="text-center">
                        <div className="text-xs text-gray-500 mb-1">{t('pricing.comparison.your_fair_rate')}</div>
                        <div className="text-3xl font-bold text-premium-700 mb-2">
                          $1,200 - $1,800
                        </div>
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                          <div className="text-red-700 font-semibold text-sm">
                            {t('pricing.comparison.leaving_on_table')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EARNINGS PROJECTION CHART */}
                  <div className="my-6 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-end mb-4">
                      <p className="text-xs font-bold text-gray-500 font-sans uppercase tracking-wide">
                        {t('pricing.comparison.projected_earnings')}
                      </p>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {t('pricing.comparison.with_pro')}
                      </span>
                    </div>
                    <div className="h-32 font-sans text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={miniChartData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                          <XAxis 
                            dataKey="month" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#9ca3af', fontSize: 10 }} 
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#9ca3af', fontSize: 10 }} 
                            tickFormatter={(value) => `$${value}`}
                          />
                          <Tooltip 
                            cursor={{ stroke: '#f59e0b', strokeWidth: 1, strokeDasharray: '4 4' }}
                            contentStyle={{ 
                              backgroundColor: '#ffffff', 
                              borderRadius: '8px', 
                              border: '1px solid #e5e7eb', 
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                              padding: '8px 12px',
                              fontFamily: 'Satoshi, sans-serif'
                            }}
                            itemStyle={{ color: '#1f2937', fontSize: '12px', fontWeight: '600' }}
                            labelStyle={{ color: '#6b7280', fontSize: '10px', marginBottom: '4px' }}
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Earnings']}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#f59e0b" 
                            strokeWidth={3} 
                            dot={{ r: 4, fill: "#fff", stroke: "#f59e0b", strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: "#f59e0b" }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  {/* Mini Breakdown */}
                  <div className="bg-premium-50 rounded-lg p-4 border border-premium-200">
                    <div className="flex items-center gap-2 mb-3">
                      <Check size={16} className="text-premium-600" />
                      <span className="text-sm font-semibold text-gray-700">{t('pricing.comparison.breakdown')}</span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1 pl-6">
                      <div>{t('pricing.comparison.breakdown_base')}</div>
                      <div>{t('pricing.comparison.breakdown_audience')}</div>
                      <div>{t('pricing.comparison.breakdown_engagement')}</div>
                      <div>{t('pricing.comparison.breakdown_company')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. GARANTIE + TESTIMONIAL + FAQ */}
          
          {/* Guarantee */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
              <Shield size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {t('pricing.guarantee.title')}
            </h3>
            <p className="text-gray-600">
              {t('pricing.guarantee.text')}
            </p>
          </div>

          {/* FAQ Pricing */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {t('pricing.faq.title')}
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('pricing.faq.q1')}
                </h3>
                <p className="text-gray-600">
                  {t('pricing.faq.a1')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('pricing.faq.q2')}
                </h3>
                <p className="text-gray-600">
                  {t('pricing.faq.a2')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('pricing.faq.q3')}
                </h3>
                <p className="text-gray-600">
                  {t('pricing.faq.a3')}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t('pricing.faq.q4')}
                </h3>
                <p className="text-gray-600">
                  {t('pricing.faq.a4')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </PageGradient>
  )
}

export default Pricing
