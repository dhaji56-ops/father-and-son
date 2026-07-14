import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';
import { situations } from '../../lib/situations';

interface SituationsGridProps {
  /** Section heading. Defaults to a sitewide phrasing. */
  heading?: string;
  /** Sub-heading copy under the section title. */
  subheading?: string;
  /** Tailwind background utility for the section wrapper. */
  className?: string;
}

/**
 * "Situations we help with" — a linked grid of the situation landing pages.
 * Reused on the homepage and every county hub so those high-intent pages get
 * internal links from the site's most-visited routes.
 */
export function SituationsGrid({
  heading = 'Situations We Help With',
  subheading = "Whatever's behind your sale, we've likely handled it before — as-is, for cash, without judgment. Find the situation that fits and see exactly how we help.",
  className = 'py-16 md:py-24 bg-oatmeal/30',
}: SituationsGridProps) {
  return (
    <section className={className}>
      <Container>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-espresso/20" />
            <span className="text-sm font-medium tracking-warm text-driftwood">We Can Help</span>
            <div className="h-px w-8 bg-espresso/20" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
            {heading}
          </h2>
          <p className="text-driftwood leading-relaxed">{subheading}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {situations.map((s) => (
            <Link
              key={s.slug}
              to={`/situations/${s.slug}`}
              className="card-warm p-6 hover:shadow-md transition-warm flex flex-col"
            >
              <h3 className="font-serif text-lg font-medium text-espresso mb-2 flex items-center gap-2">
                {s.name}
                <svg className="w-4 h-4 text-terracotta flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </h3>
              <p className="text-sm text-driftwood leading-relaxed">{s.cardBlurb}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
