import { useState } from 'react';
import { Container } from '../components/layout';
import { CTASection } from '../components/sections';

const faqs = [
  {
    question: 'How fast can I get an offer?',
    answer: 'We provide a fair cash offer within 48 hours of learning about your property. In many cases, we can give you a preliminary offer the same day you contact us.',
  },
  {
    question: 'Do I need to make any repairs?',
    answer: 'No. We buy homes as-is — roof leaks, outdated kitchens, foundation issues, and all. You don\'t need to lift a finger or spend a dime on repairs.',
  },
  {
    question: 'Are there any fees or commissions?',
    answer: 'None. The offer you accept is exactly what you receive. No hidden fees, no realtor commissions, no closing costs. We cover everything.',
  },
  {
    question: 'How quickly can we close?',
    answer: 'As fast as 14 days, or on your schedule. You pick the closing date that works for you. Need to move quickly? We can accommodate. Need more time? No problem.',
  },
  {
    question: 'What if I have stuff I don\'t want to take?',
    answer: 'Leave it! Take what matters to you and leave the rest. We\'ll handle any items, furniture, or junk left behind at no cost to you.',
  },
  {
    question: 'Do I have to show my house to strangers?',
    answer: 'No showings or open houses required. We\'ll schedule one visit at a time that works for you, and that\'s it. Sell privately without disrupting your life.',
  },
  {
    question: 'What situations do you help with?',
    answer: 'We help with inherited properties, foreclosure, divorce, problem tenants, tax liens, code violations, and any other situation. We approach every seller with integrity and respect.',
  },
  {
    question: 'Is there any obligation to accept the offer?',
    answer: 'Zero obligation. Get your offer with no strings attached. If our offer doesn\'t work for you, just say no — no hard feelings, no pressure.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We buy houses throughout Orange County, Los Angeles County, and the Inland Empire (Riverside and San Bernardino counties). If you\'re in Southern California, we\'d love to help.',
  },
  {
    question: 'Who are you?',
    answer: 'We\'re Father & Son Home Buyers — a local father and son team with decades of combined real estate and construction experience. We\'re not a big corporation; we\'re a family business helping Southern California homeowners sell their properties quickly and fairly.',
  },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-oatmeal/50 to-linen">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-espresso/20" />
              <span className="text-sm font-medium tracking-warm text-driftwood">
                Common Questions
              </span>
              <div className="h-px w-8 bg-espresso/20" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-espresso mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-driftwood max-w-2xl mx-auto">
              Got questions? We've got answers. Here are the most common questions we hear from homeowners.
            </p>
          </div>
        </Container>
      </section>

      {/* FAQ Accordion */}
      <section className="pb-16 md:pb-24">
        <Container size="narrow">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card-warm overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-serif text-lg font-medium text-espresso pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-driftwood transition-transform duration-300 flex-shrink-0 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 text-driftwood leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 md:py-24 bg-oatmeal/30">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              Still Have Questions?
            </h2>
            <p className="text-driftwood mb-8 max-w-xl mx-auto">
              We're happy to answer any questions you have. Give us a call or send us a message — no pressure, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="tel:+19495412003"
                className="btn-secondary px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call or Text (949) 541-2003
              </a>
            </div>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
