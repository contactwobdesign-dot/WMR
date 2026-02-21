import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Calculator } from '../Calculator'
import { PageGradient } from '../Layout/PageGradient'

function SEOPageLayout({
  title,
  subtitle,
  metaTitle,
  metaDescription,
  canonicalPath,
  platform = null,
  children,
}) {
  const location = useLocation()

  // Auto-scroll to calculator if ?calc=true in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.get('calc') === 'true') {
      const calculatorElement = document.getElementById('calculator')
      if (calculatorElement) {
        setTimeout(() => {
          calculatorElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      }
    }
  }, [location])

  return (
    <PageGradient>
      {/* SEO Head */}
      <Helmet>
        <title>{metaTitle} | SponsorPrice</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://sponsorprice.co${canonicalPath}`} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-primary-50 to-white pt-20 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {title}
              </h1>
              <p className="text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Calculator Section */}
        <div
          id="calculator"
          className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-20"
        >
          <div className="shadow-lg rounded-xl">
            <Calculator defaultPlatform={platform} isPremium={false} />
          </div>
        </div>

        {/* SEO Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </div>

        {/* Final CTA */}
        <div className="bg-primary-600 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to get your exact rate?
            </h2>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              Upgrade to Pro
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </PageGradient>
  )
}

export default SEOPageLayout
