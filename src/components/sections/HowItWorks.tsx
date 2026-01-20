import { Container } from '../layout/Container';

const steps = [
  {
    number: '01',
    title: 'Contact Us',
    description: 'Reach out by phone or submit your property details through our simple form. No obligation, completely confidential.',
  },
  {
    number: '02',
    title: 'Receive Your Offer',
    description: 'We evaluate your property and present you with a fair, transparent cash offer within 48 hours.',
  },
  {
    number: '03',
    title: 'Close on Your Terms',
    description: 'Choose your closing date. We handle all paperwork and pay all closing costs. Receive cash in hand.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 lg:py-24 bg-espresso text-linen">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-linen/30" />
                <span className="text-sm font-medium tracking-warm text-linen/60">
                  The Process
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                Three <em className="text-terracotta">Simple</em> Steps
              </h2>
              <p className="text-linen/70 leading-relaxed max-w-sm">
                We've streamlined the home selling process to make it as effortless as possible.
                No showings, no open houses, no waiting.
              </p>
            </div>
          </div>

          {/* Right: Steps */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="space-y-0">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`
                    py-8 md:py-10
                    border-t border-linen/10
                    ${index === steps.length - 1 ? 'border-b border-linen/10' : ''}
                    group
                  `}
                >
                  <div className="flex items-start gap-6 md:gap-10">
                    <span className="font-serif text-4xl md:text-5xl text-terracotta/50 transition-warm group-hover:text-terracotta">
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl md:text-2xl font-medium mb-3 transition-warm group-hover:text-terracotta">
                        {step.title}
                      </h3>
                      <p className="text-linen/70 leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="mt-10 pt-10 border-t border-linen/10">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <span className="font-serif text-2xl md:text-3xl font-medium block mb-1">7</span>
                  <span className="text-sm text-linen/60">
                    Day Closing
                  </span>
                </div>
                <div className="text-center">
                  <span className="font-serif text-2xl md:text-3xl font-medium block mb-1">$0</span>
                  <span className="text-sm text-linen/60">
                    Closing Costs
                  </span>
                </div>
                <div className="text-center">
                  <span className="font-serif text-2xl md:text-3xl font-medium block mb-1">100%</span>
                  <span className="text-sm text-linen/60">
                    Confidential
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
