import { Link } from 'react-router-dom';
import { Container } from '../components/layout';
import { Testimonials, CTASection } from '../components/sections';
import { useSEO } from '../hooks/useSEO';
import { usePageSchema, pageBreadcrumbSchema } from '../lib/schema';
import { GOOGLE_REVIEWS, TESTIMONIALS, CREDENTIALS } from '../lib/reviews';

/**
 * /reviews — every real review in one place, with the Google listing it can
 * be verified against and a clear ask for the next one.
 *
 * Backed entirely by src/lib/reviews.ts: as real reviews are added there,
 * this page grows with no other change. Rating schema stays gated behind the
 * review-count threshold in that file; this page adds only a breadcrumb.
 */
export function ReviewsPage() {
  useSEO({
    title: 'Reviews | Father & Son Home Buyers',
    description:
      'Read real reviews from Southern California homeowners who sold their house to Father & Son Home Buyers — verified on Google, in their own words.',
    canonical: 'https://fathersonhomes.com/reviews',
  });

  usePageSchema([pageBreadcrumbSchema('Reviews', '/reviews')]);

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-oatmeal/50 to-linen">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-espresso/20" />
              <span className="text-sm font-medium tracking-warm text-driftwood">
                Verified on Google
              </span>
              <div className="h-px w-8 bg-espresso/20" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-espresso mb-6">
              Father &amp; Son Home Buyers Reviews
            </h1>
            <p className="text-lg text-driftwood max-w-2xl mx-auto mb-8">
              Every review here is from a real homeowner we bought a house from, in
              their own words, and can be checked against our Google Business
              Profile. We would rather show you {TESTIMONIALS.length === 1 ? 'one' : TESTIMONIALS.length} honest{' '}
              {TESTIMONIALS.length === 1 ? 'review' : 'reviews'} than a hundred we made up.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={GOOGLE_REVIEWS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                See all {GOOGLE_REVIEWS.reviewCount} reviews on Google
              </a>
              <a
                href={GOOGLE_REVIEWS.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                Leave a review
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* The reviews themselves — same real data as the homepage */}
      <Testimonials />

      {/* Why the number is small, and what stands behind it */}
      <section className="py-16 md:py-20">
        <Container size="narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-serif text-3xl font-medium text-espresso mb-4">
                Why we only show real reviews
              </h2>
              <p className="text-driftwood leading-relaxed mb-4">
                Selling a house for cash is a decision people make once or twice in a
                lifetime, usually under pressure. The only thing that should earn
                your trust is what other sellers actually experienced — so we don't
                pad this page, buy reviews, or quote anyone who didn't sell to us.
              </p>
              <p className="text-driftwood leading-relaxed">
                If we've bought your home and you have a minute, a Google review is
                the most useful thing you can do for the next family deciding whether
                to call us.
              </p>
            </div>
            <div className="card-warm p-8">
              <h3 className="font-serif text-xl font-medium text-espresso mb-4">
                What stands behind every offer
              </h3>
              <ul className="space-y-3">
                {CREDENTIALS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-driftwood text-sm leading-relaxed">
                    <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/about-us"
                className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-terracotta hover:underline"
              >
                Meet Ahmad &amp; Dustin &rarr;
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
