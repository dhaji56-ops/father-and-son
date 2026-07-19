import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/layout';
import { CTASection, SituationsGrid } from '../components/sections';
import { useSEO } from '../hooks/useSEO';
import {
  usePageSchema,
  countyBreadcrumbSchema,
  countyLocalBusinessSchema,
} from '../lib/schema';
import { getHubBySlug, getHubCities } from '../lib/counties';

export function CountyHubPage() {
  const { slug } = useParams<{ slug: string }>();
  const hub = slug ? getHubBySlug(slug) : undefined;
  const hubCities = hub ? getHubCities(hub) : [];

  // Distinct human county names covered by this hub, derived from the cities so
  // it stays in sync with cities.ts (the Inland Empire hub covers two).
  const countyNames = hub
    ? [...new Set(hubCities.map((c) => c.county))]
    : [];

  useSEO({
    title: hub ? hub.metaTitle : 'Area Not Found | Father & Son',
    description: hub ? hub.metaDescription : 'Page not found.',
    canonical: hub
      ? `https://fathersonhomes.com/service-areas/${hub.slug}`
      : undefined,
  });

  // Hub pages emit a BreadcrumbList plus a LocalBusiness scoped to the region,
  // each with its own @id so nothing duplicates the sitewide Organization.
  usePageSchema(
    hub
      ? [
          countyBreadcrumbSchema({ ...hub, countyNames }),
          countyLocalBusinessSchema({ ...hub, countyNames }),
        ]
      : []
  );

  if (!hub) {
    return (
      <section className="py-24">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-medium text-espresso mb-4">Area Not Found</h1>
            <p className="text-driftwood mb-8">We couldn't find that service area. View all our service areas below.</p>
            <Link to="/service-areas" className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center gap-2">
              View Service Areas
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-oatmeal/50 to-linen">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-espresso/20" />
              <span className="text-sm font-medium tracking-warm text-driftwood">
                {hub.regionLabel}
              </span>
              <div className="h-px w-8 bg-espresso/20" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-espresso mb-6">
              We Buy Houses in {hub.name}
            </h1>
            <p className="text-lg text-driftwood max-w-2xl mx-auto mb-10">
              {hub.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                Get My Cash Offer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+19495412003"
                className="btn-secondary px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call or Text (949) 541-2003
              </a>
            </div>
            <p className="text-sm text-driftwood mt-6">
              In a hurry?{' '}
              <Link to="/instant-offer" className="text-terracotta font-medium hover:underline">
                Request your cash offer online
              </Link>{' '}
              — 60 seconds for your {hub.proseName} home, real number within 24 hours.
            </p>
          </div>
        </Container>
      </section>

      {/* County-specific copy */}
      <section className="py-16 md:py-20">
        <Container size="narrow">
          <div className="prose-warm space-y-6">
            {hub.body.map((para, i) => (
              <p key={i} className="text-driftwood leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Situations We Help With */}
      <section className="py-16 md:py-20 bg-oatmeal/30">
        <Container>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-espresso/20" />
              <span className="text-sm font-medium tracking-warm text-driftwood">We Can Help</span>
              <div className="h-px w-8 bg-espresso/20" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              Situations We Buy In {hub.name}
            </h2>
            <p className="text-driftwood leading-relaxed">
              Whatever's behind your sale, we've likely handled it before across {hub.proseName} —
              without judgment, and without asking you to make a single repair.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {hub.situations.map((s) => (
              <div key={s} className="flex items-start gap-3 card-warm p-5">
                <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-driftwood">{s}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Cities grid — links down to every city page in this hub */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              Cities We Buy Houses In Across {hub.name}
            </h2>
            <p className="text-driftwood max-w-xl mx-auto">
              Explore our dedicated local page for each community. Don't see yours?
              We likely still buy there — just reach out.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hubCities.map((city) => (
              <Link
                key={city.slug}
                to={`/locations/${city.slug}`}
                className="card-warm p-5 text-center hover:shadow-md transition-warm"
              >
                <h3 className="font-serif text-lg font-medium text-espresso mb-1">
                  {city.name}
                </h3>
                <p className="text-xs text-driftwood">{city.county}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Situations we help with — links to the dedicated situation pages */}
      <SituationsGrid
        heading="Situations We Help With"
        subheading={`Whatever's behind your ${hub.proseName} sale, there's a good chance we've handled it before. Each of these has a dedicated page explaining exactly how we help.`}
        className="py-16 md:py-20"
      />

      {/* Cash Advance callout — the same differentiator surfaced on city pages */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-espresso to-espresso/95">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-cream/20" />
                <span className="text-sm font-medium tracking-warm text-terracotta">
                  Cash Advance Available
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium leading-tight text-cream mb-6">
                Need cash before your {hub.name} home closes?
              </h2>
              <p className="text-lg text-cream/80 mb-8 leading-relaxed">
                It's something most cash buyers won't do: once we're under contract
                on your {hub.proseName} property, eligible sellers can receive a cash
                advance to cover moving costs, deposits, storage, or urgent bills —
                before the sale is even final. We put every term in writing first, so
                there are no surprises.
              </p>
              <Link
                to="/cash-advance"
                className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                See if I Qualify
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="card-warm bg-cream p-8 md:p-10 rounded-2xl shadow-warm-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-medium text-espresso mb-3">
                  Money in hand when you need it
                </h3>
                <p className="text-driftwood mb-6">
                  Life across {hub.proseName} doesn't pause for closing day. A cash
                  advance helps you handle what's urgent while we work toward the
                  finish line.
                </p>
                <div className="border-t border-espresso/10 pt-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-serif text-2xl font-medium text-terracotta">Fast</div>
                      <div className="text-xs text-driftwood">Funding</div>
                    </div>
                    <div>
                      <div className="font-serif text-2xl font-medium text-terracotta">Clear</div>
                      <div className="text-xs text-driftwood">Terms</div>
                    </div>
                    <div>
                      <div className="font-serif text-2xl font-medium text-terracotta">Simple</div>
                      <div className="text-xs text-driftwood">Process</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Breadcrumb nav back to service areas */}
      <section className="py-8 bg-oatmeal/20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 text-sm text-driftwood">
            <Link to="/service-areas" className="hover:text-terracotta transition-warm">
              Service Areas
            </Link>
            <span>/</span>
            <span className="text-espresso">{hub.name}</span>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
