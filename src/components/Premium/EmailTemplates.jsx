import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { X, Copy, Check, Mail } from 'lucide-react'

function formatCurrency(value) {
  if (value == null || Number.isNaN(Number(value))) return '—'
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(Number(value))
}

/** Phrase dynamique pour le template de négociation quand une offre initiale existe. */
function getNegotiationSentence(calculationData) {
  if (!calculationData) return null
  const offer = calculationData.offered_price != null ? Number(calculationData.offered_price) : null
  const rate = calculationData.price_average != null ? Number(calculationData.price_average) : null
  if (offer == null || rate == null || offer <= 0) return null
  const delta = rate - offer
  if (delta > 0) {
    return `La marque a proposé ${formatCurrency(offer)}, mais selon mes métriques, la contre-offre juste se situe à ${formatCurrency(rate)}. Il reste donc une marge de négociation de ${formatCurrency(delta)} à faire valoir (qualité de l'audience, engagement).`
  }
  return `L'offre de la marque (${formatCurrency(offer)}) est excellente et supérieure à mon estimation du marché (${formatCurrency(rate)}).`
}

function EmailTemplates({ isOpen, onClose, calculationData = null, initialTemplateIndex = null }) {
  const { t } = useTranslation()
  const [copiedIndex, setCopiedIndex] = useState(null)
  const templateRefs = useRef([])

  // Bloquer / débloquer le scroll de la page en fonction de l'état de la modale
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Pré-sélection : scroll vers le template demandé (0 = Initial, 1 = Négociation, 2 = Acceptation)
  useEffect(() => {
    if (!isOpen || initialTemplateIndex == null) return
    const idx = Math.max(0, Math.min(Number(initialTemplateIndex), 2))
    const el = templateRefs.current[idx]
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [isOpen, initialTemplateIndex])

  if (!isOpen) return null

  const templates = [
    {
      title: "Initial Response",
      subject: "Re: Partnership Opportunity",
      body: `Hi [BRAND_NAME],

Thank you for reaching out about a potential partnership!

Based on my audience metrics and current rates, my standard fee for a [CONTENT_TYPE] is $[YOUR_RATE].

This includes:
- [DELIVERABLE 1]
- [DELIVERABLE 2]  
- One round of revisions

I'd love to learn more about your campaign goals. Would you be available for a quick call this week?

Best,
[YOUR_NAME]`
    },
    {
      title: "Negotiation Counter",
      subject: "Re: Partnership Rates Discussion",
      body: `Hi [BRAND_NAME],

Thank you for your offer of $[THEIR_OFFER].

Based on my current rates and the scope of work involved, I typically charge $[YOUR_RATE] for this type of content.

This reflects:
- My engagement rate of [X]%, which is above average for my niche
- My audience demographics (primarily [LOCATION])
- The production quality I bring to sponsored content

I'd be happy to discuss a package deal or adjusted deliverables if budget is a constraint.

Looking forward to your thoughts.

Best,
[YOUR_NAME]`
    },
    {
      title: "Accepting a Deal",
      subject: "Partnership Confirmed - [BRAND] x [YOUR_NAME]",
      body: `Hi [BRAND_NAME],

I'm excited to confirm our partnership!

Summary:
- Content: [CONTENT_TYPE] on [PLATFORM]
- Publish date: [DATE]
- Compensation: $[AGREED_RATE]
- Payment terms: [NET 30 / etc.]

Please send over the creative brief and any assets by [DATE] so I can begin production.

Looking forward to creating something great together!

Best,
[YOUR_NAME]`
    }
  ]

  const handleCopy = (template, index) => {
    let subject = template.subject
    let body = template.body

    if (calculationData && index === 1) {
      const offer = calculationData.offered_price != null ? Number(calculationData.offered_price) : null
      const rate = calculationData.price_average != null ? Number(calculationData.price_average) : null
      if (offer != null && !Number.isNaN(offer)) {
        body = body.replace(/\$\[THEIR_OFFER\]/g, formatCurrency(offer))
      }
      if (rate != null && !Number.isNaN(rate)) {
        body = body.replace(/\$\[YOUR_RATE\]/g, formatCurrency(rate))
      }
      const negotiationSentence = getNegotiationSentence(calculationData)
      if (negotiationSentence) {
        body = body.replace(
          /(Based on my current rates[^\n]+\.)/m,
          (match) => `${match}\n\n${negotiationSentence}`
        )
      }
    }

    const fullText = `Subject: ${subject}\n\n${body}`

    navigator.clipboard.writeText(fullText).then(() => {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }).catch(err => {
      console.error('Failed to copy:', err)
      alert(t('alerts.copy_failed'))
    })
  }

  // Highlight placeholders in text
  const highlightPlaceholders = (text) => {
    const parts = text.split(/(\[.*?\])/)
    return parts.map((part, index) => {
      if (part.match(/^\[.*?\]$/)) {
        return (
          <span key={index} className="text-primary-600 font-semibold">
            {part}
          </span>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white rounded-xl border-2 border-primary-500 shadow-2xl shadow-primary-500/20 max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Mail size={24} className="text-primary-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Email Templates
                </h2>
                <p className="text-sm text-gray-600">
                  Professional templates to negotiate better rates
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            <div className="space-y-8">
              {templates.map((template, index) => (
                <div
                  key={index}
                  ref={(el) => { templateRefs.current[index] = el }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  {/* Template Header */}
                  <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      {template.title}
                    </h3>
                    <button
                      onClick={() => handleCopy(template, index)}
                      className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy to Clipboard
                        </>
                      )}
                    </button>
                  </div>

                  {/* Template Content */}
                  <div className="p-4 bg-gray-50">
                    {/* Subject */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        Subject
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {highlightPlaceholders(template.subject)}
                      </p>
                    </div>

                    {/* Body */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                        Body
                      </p>
                      <div className="bg-white border border-gray-300 rounded-lg p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {highlightPlaceholders(template.body)}
                      </div>
                    </div>
                  </div>

                  {/* Helper Text */}
                  <div className="bg-primary-50 border-t border-primary-100 px-4 py-3">
                    <p className="text-xs text-gray-600">
                      💡 <span className="font-semibold">{t('email_templates.tip_prefix')}</span> {t('email_templates.tip_replace')}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Info */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">
                {t('email_templates.how_to_use')}
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>1. {t('email_templates.step1')}</li>
                <li>2. {t('email_templates.step2')}</li>
                <li>3. {t('email_templates.step3')}</li>
                <li>4. {t('email_templates.step4')}</li>
                <li>5. {t('email_templates.step5')}</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              {t('email_templates.close')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EmailTemplates
