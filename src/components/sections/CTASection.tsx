import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-espresso">
      <Container>
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-cream mb-4">
            Ready to Get Your Cash Offer?
          </h2>
          <p className="text-cream/70 max-w-xl mx-auto mb-8">
            No obligation, no pressure. Just a fair, transparent offer from a local family you can trust.
          </p>
          <div className="flex justify-center">
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
        </div>
      </Container>
    </section>
  );
}
