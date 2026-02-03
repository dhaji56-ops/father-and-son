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
              className="btn-secondary text-cream border-cream/30 hover:bg-cream/10 hover:border-cream/50 px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call (949) 541-2003
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
