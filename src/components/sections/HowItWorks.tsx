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
    <section id="how-it-works" className="py-20 md:py-32 bg-luxury-fg text-white">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left: Header */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 md:w-12 bg-white/30" />
                <span className="text-[10px] uppercase tracking-luxury-wide text-white/60">
                  The Process
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.9] mb-8">
                Three
                <span className="block"><em className="text-luxury-accent">Simple</em></span>
                <span className="block">Steps</span>
              </h2>
              <p className="text-white/60 leading-relaxed max-w-sm">
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
                    py-10 md:py-14
                    border-t border-white/10
                    ${index === steps.length - 1 ? 'border-b border-white/10' : ''}
                    group
                  `}
                >
                  <div className="flex items-start gap-8 md:gap-12">
                    <span className="font-serif text-5xl md:text-6xl text-luxury-accent/50 transition-luxury group-hover:text-luxury-accent">
                      {step.number}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl md:text-3xl mb-4 transition-luxury group-hover:text-luxury-accent">
                        {step.title}
                      </h3>
                      <p className="text-white/60 leading-relaxed max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="mt-12 pt-12 border-t border-white/10">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <span className="font-serif text-3xl md:text-4xl block mb-2">7</span>
                  <span className="text-[10px] uppercase tracking-luxury text-white/60">
                    Day Closing
                  </span>
                </div>
                <div>
                  <span className="font-serif text-3xl md:text-4xl block mb-2">$0</span>
                  <span className="text-[10px] uppercase tracking-luxury text-white/60">
                    Closing Costs
                  </span>
                </div>
                <div>
                  <span className="font-serif text-3xl md:text-4xl block mb-2">100%</span>
                  <span className="text-[10px] uppercase tracking-luxury text-white/60">
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
