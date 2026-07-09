import { Container } from '../layout/Container';
import { TESTIMONIALS, GOOGLE_REVIEWS } from '../../lib/reviews';

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-terracotta' : 'text-espresso/20'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.367 2.446a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.539 1.118l-3.366-2.445a1 1 0 00-1.176 0l-3.366 2.445c-.784.57-1.838-.196-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.343 9.385c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.958z" />
        </svg>
      ))}
    </div>
  );
}

/**
 * Reviews / testimonials section. Backed entirely by real data in
 * src/lib/reviews.ts. Reused on the homepage and the About page.
 */
export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-oatmeal/30">
      <Container>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-espresso/20" />
            <span className="text-sm font-medium tracking-warm text-driftwood">
              What Sellers Say
            </span>
            <div className="h-px w-8 bg-espresso/20" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
            Real Homeowners, Real Results
          </h2>

          {/* Aggregate Google rating — real, verifiable numbers only */}
          <a
            href={GOOGLE_REVIEWS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 mt-2 bg-white/70 rounded-full px-5 py-2 shadow-warm hover:bg-white transition-colors"
          >
            <Stars rating={Math.round(GOOGLE_REVIEWS.ratingValue)} />
            <span className="text-sm font-medium text-espresso">
              {GOOGLE_REVIEWS.ratingValue.toFixed(1)} on Google
              <span className="text-driftwood font-normal">
                {' '}
                · {GOOGLE_REVIEWS.reviewCount} reviews
              </span>
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {TESTIMONIALS.map((t) => (
            <figure
              key={`${t.name}-${t.city}`}
              className="bg-white rounded-2xl p-8 shadow-warm flex flex-col"
            >
              <Stars rating={t.rating} />
              <blockquote className="text-espresso/80 leading-relaxed mt-4 mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="border-t border-espresso/10 pt-4">
                <div className="font-serif text-lg font-medium text-espresso">
                  {t.name}
                </div>
                <div className="text-sm text-driftwood">
                  {t.city} · {t.situation}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
