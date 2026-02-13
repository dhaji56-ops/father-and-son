import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';

const benefits = [
  {
    title: 'No showings, no repairs',
    description: 'Sell as-is without the hassle',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'You choose the close date',
    description: 'Move on your timeline',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Advance based on your home',
    description: 'Amount depends on property + timeline',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function CashAdvance() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-espresso to-espresso/95">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-cream/20" />
              <span className="text-sm font-medium tracking-warm text-terracotta">
                Cash Advance Available
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-cream mb-6">
              Need cash before closing?
            </h2>
            <p className="text-lg text-cream/80 mb-8 leading-relaxed">
              Eligible sellers can receive a cash advance after we sign the agreement—use it for moving costs, deposits, urgent repairs, or catching up on bills.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-terracotta/20 rounded-lg flex items-center justify-center text-terracotta flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-cream">{benefit.title}</h3>
                    <p className="text-sm text-cream/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/cash-advance"
                className="btn-terracotta px-6 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                See if I Qualify
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/how-it-works"
                className="btn-secondary text-cream border-cream/30 hover:bg-cream/10 hover:border-cream/50 px-6 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                Learn How It Works
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="card-warm bg-cream p-8 md:p-10 rounded-2xl shadow-warm-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl font-medium text-espresso mb-3">
                  Get Cash When You Need It
                </h3>
                <p className="text-driftwood mb-6">
                  Life doesn't wait for closing day. Our cash advance helps you handle immediate expenses while we work toward closing.
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
        </div>
      </Container>
    </section>
  );
}
