import { Container } from '../layout/Container';
import { SectionLabel } from '../ui/SectionLabel';

const steps = [
  {
    number: '01',
    title: 'Contact Us',
    description: 'Call us or fill out our simple form with your property details. No obligation, completely free.',
  },
  {
    number: '02',
    title: 'Get Your Offer',
    description: 'We\'ll evaluate your property and present you with a fair, no-obligation cash offer within 48 hours.',
  },
  {
    number: '03',
    title: 'Close & Get Paid',
    description: 'Choose your closing date. We handle all paperwork and pay all closing costs. Get cash in hand.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-swiss-muted pattern-diagonal">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Steps */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <SectionLabel number="03" text="Our Process" />
            </div>

            <div className="space-y-0">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="
                    border-t-4 border-black py-8
                    first:border-t-4
                    last:border-b-4
                  "
                >
                  <div className="flex items-start gap-6">
                    <span className="text-swiss-accent font-black text-2xl md:text-3xl tracking-tighter">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="font-black text-xl md:text-2xl uppercase tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 max-w-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white border-4 border-black p-8 sticky top-8">
              <h2 className="font-black text-3xl md:text-4xl uppercase tracking-tighter leading-none mb-6">
                Three
                <span className="block">Simple</span>
                <span className="block text-swiss-accent">Steps</span>
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-swiss-accent" />
                  <span>No showings or open houses</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-swiss-accent" />
                  <span>Close in as little as 7 days</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <span className="w-2 h-2 bg-swiss-accent" />
                  <span>We pay all closing costs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
