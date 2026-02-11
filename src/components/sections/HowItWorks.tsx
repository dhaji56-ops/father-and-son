import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';

const steps = [
  {
    number: '01',
    title: 'Contact Us',
    description: "Fill out our simple form or give us a call. Tell us about your property — any condition, any situation. There's no obligation.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'We Visit Your Property',
    description: "We'll schedule a quick, no-pressure visit to see your property in person. This helps us give you the most accurate and fair offer.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Get Your Offer',
    description: "After seeing your property, we'll present you with a fair, honest cash offer. No repairs needed — we buy as-is.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Choose Your Close Date',
    description: "Accept the offer and pick the closing date that works for you — as fast as 14 days or whenever you're ready. You're in control.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Get Paid',
    description: "Close with a reputable title company. Walk away with cash in hand — no fees, no commissions, no hassle.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-oatmeal/30">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-espresso/20" />
            <span className="text-sm font-medium tracking-warm text-driftwood">
              Simple & Transparent
            </span>
            <div className="h-px w-8 bg-espresso/20" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-espresso mb-4">
            How It Works
          </h2>
          <p className="text-driftwood max-w-2xl mx-auto">
            Selling your house should be simple. Here's our straightforward 5-step process — no surprises, no hidden steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="card-warm p-6 md:p-8 relative group hover:shadow-warm-lg transition-warm"
            >
              <span className="absolute top-4 right-4 text-xs font-medium text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full">
                Step {step.number}
              </span>
              <div className="w-14 h-14 bg-oatmeal rounded-lg flex items-center justify-center mb-6 text-driftwood group-hover:text-terracotta transition-warm">
                {step.icon}
              </div>
              <h3 className="font-serif text-xl font-medium text-espresso mb-3">
                {step.title}
              </h3>
              <p className="text-sm text-driftwood leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/how-it-works"
            className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium"
          >
            Learn More About Our Process
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </Container>
    </section>
  );
}
