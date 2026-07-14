import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/layout';
import { CTASection } from '../components/sections';
import { useSEO } from '../hooks/useSEO';
import {
  usePageSchema,
  situationBreadcrumbSchema,
  situationServiceSchema,
  faqPageSchema,
} from '../lib/schema';
import { getSituationBySlug } from '../lib/situations';
import { getCityBySlug } from '../lib/cities';
import { getHubBySlug } from '../lib/counties';
import { getPostBySlug } from '../lib/blog-posts';

export function SituationPage() {
  const { slug } = useParams<{ slug: string }>();
  const situation = slug ? getSituationBySlug(slug) : undefined;

  const relatedCities = situation
    ? situation.relatedCitySlugs
        .map((s) => getCityBySlug(s))
        .filter((c): c is NonNullable<typeof c> => Boolean(c))
    : [];
  const relatedCounties = situation
    ? situation.relatedCountySlugs
        .map((s) => getHubBySlug(s))
        .filter((h): h is NonNullable<typeof h> => Boolean(h))
    : [];
  const relatedPost = situation?.relatedBlogSlug
    ? getPostBySlug(situation.relatedBlogSlug)
    : undefined;

  useSEO({
    title: situation ? situation.metaTitle : 'Not Found | Father & Son',
    description: situation ? situation.metaDescription : 'Page not found.',
    canonical: situation
      ? `https://fathersonhomes.com/situations/${situation.slug}`
      : undefined,
  });

  // Situation pages emit a BreadcrumbList, a Service node (provided by the
  // sitewide Organization), and an FAQPage — each with distinct typing so
  // nothing duplicates the Organization/WebSite schema from index.html.
  usePageSchema(
    situation
      ? [
          situationBreadcrumbSchema(situation),
          situationServiceSchema(situation),
          faqPageSchema(situation.faqs),
        ]
      : []
  );

  if (!situation) {
    return (
      <section className="py-24">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-medium text-espresso mb-4">Page Not Found</h1>
            <p className="text-driftwood mb-8">
              We couldn't find that page. Tell us about your situation and we'll help.
            </p>
            <Link to="/contact" className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center gap-2">
              Get My Cash Offer
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
                {situation.eyebrow}
              </span>
              <div className="h-px w-8 bg-espresso/20" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-espresso mb-6">
              {situation.h1}
            </h1>
            <p className="text-lg text-driftwood max-w-2xl mx-auto mb-10">
              {situation.intro}
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
          </div>
        </Container>
      </section>

      {/* Pain points — what the seller is dealing with */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              What You're Dealing With
            </h2>
            <p className="text-driftwood leading-relaxed">
              You're not the first person to face this, and you won't be the last. Here's what
              usually makes it hard — and why a cash sale changes the equation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {situation.painPoints.map((p) => (
              <div key={p.title} className="card-warm p-8">
                <h3 className="font-serif text-xl font-medium text-espresso mb-3">{p.title}</h3>
                <p className="text-driftwood text-sm leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How we help — conversion body copy */}
      <section className="py-16 md:py-20 bg-oatmeal/30">
        <Container size="narrow">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-espresso/20" />
              <span className="text-sm font-medium tracking-warm text-driftwood">How We Help</span>
              <div className="h-px w-8 bg-espresso/20" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              How Father &amp; Son Helps With {situation.howWeHelpLead}
            </h2>
          </div>
          <div className="prose-warm space-y-6">
            {situation.howWeHelp.map((para, i) => (
              <p key={i} className="text-driftwood leading-relaxed">
                {para}
              </p>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/contact"
              className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
            >
              Get My Cash Offer
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* Cash Advance callout — the same differentiator surfaced sitewide */}
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
                Need cash before your home closes?
              </h2>
              <p className="text-lg text-cream/80 mb-8 leading-relaxed">
                It's something most cash buyers won't do: once we're under contract on your
                property, eligible sellers can receive a cash advance to cover moving costs,
                deposits, storage, or urgent bills — before the sale is even final. We put every
                term in writing first, so there are no surprises.
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
                  Life doesn't pause for closing day. A cash advance helps you handle what's
                  urgent while we work toward the finish line.
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

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <Container size="narrow">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              {situation.name}: Common Questions
            </h2>
            <p className="text-driftwood">Straight answers for homeowners weighing a cash sale.</p>
          </div>
          <div className="space-y-6">
            {situation.faqs.map((faq) => (
              <div key={faq.question} className="card-warm p-6">
                <h3 className="font-serif text-lg font-medium text-espresso mb-2">
                  {faq.question}
                </h3>
                <p className="text-driftwood leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Related resources — blog deep-dive + city and county cross-links */}
      <section className="py-16 md:py-20 bg-oatmeal/30">
        <Container>
          {relatedPost && (
            <div className="max-w-3xl mx-auto mb-14">
              <div className="card-warm p-8">
                <span className="text-xs font-medium tracking-warm text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
                  Go Deeper
                </span>
                <h3 className="font-serif text-2xl font-medium text-espresso mt-4 mb-2">
                  {relatedPost.title}
                </h3>
                <p className="text-driftwood text-sm mb-4">{relatedPost.description}</p>
                <Link
                  to={`/blog/${relatedPost.slug}`}
                  className="text-sm font-medium text-terracotta hover:underline inline-flex items-center gap-1"
                >
                  Read the full guide
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Counties */}
            <div>
              <h3 className="font-serif text-xl font-medium text-espresso mb-5">
                Where We Buy
              </h3>
              <div className="space-y-3">
                {relatedCounties.map((hub) => (
                  <Link
                    key={hub.slug}
                    to={`/service-areas/${hub.slug}`}
                    className="card-warm p-5 flex items-center justify-between hover:shadow-md transition-warm"
                  >
                    <span className="font-serif text-lg font-medium text-espresso">
                      We Buy Houses in {hub.name}
                    </span>
                    <svg className="w-4 h-4 text-terracotta flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Cities */}
            <div>
              <h3 className="font-serif text-xl font-medium text-espresso mb-5">
                Popular Cities
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {relatedCities.map((city) => (
                  <Link
                    key={city.slug}
                    to={`/locations/${city.slug}`}
                    className="card-warm p-4 text-center hover:shadow-md transition-warm"
                  >
                    <span className="font-serif text-base font-medium text-espresso block">
                      {city.name}
                    </span>
                    <span className="text-xs text-driftwood">{city.county}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Breadcrumb */}
      <section className="py-8 bg-oatmeal/20">
        <Container>
          <div className="flex flex-wrap items-center gap-2 text-sm text-driftwood">
            <Link to="/" className="hover:text-terracotta transition-warm">
              Home
            </Link>
            <span>/</span>
            <span className="text-espresso">{situation.name}</span>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
