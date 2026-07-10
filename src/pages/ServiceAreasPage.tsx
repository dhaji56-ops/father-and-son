import { Link } from 'react-router-dom';
import { Container } from '../components/layout';
import { CTASection } from '../components/sections';
import { useSEO } from '../hooks/useSEO';
import { usePageSchema, faqPageSchema } from '../lib/schema';
import { cities } from '../lib/cities';

// Slugs that have dedicated landing pages
const cityPageSlugs = new Set(cities.map((c) => c.slug));

function cityToSlug(city: string): string {
  return city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// County-level detail used to give the page real substance and to cross-link
// down to the dedicated city landing pages.
const counties = [
  {
    name: 'Orange County',
    blurb:
      'From the coast at Huntington Beach and Newport to the older neighborhoods of Santa Ana, Anaheim, and Garden Grove, Orange County is our home base. We know its 1950s tract homes, its historic districts, and its hillside builds — and we buy all of them as-is.',
  },
  {
    name: 'Los Angeles County',
    blurb:
      'Across the South Bay, Gateway Cities, and beyond — Long Beach, Downey, Whittier, Torrance, Carson, and their neighbors — we buy craftsman bungalows, mid-century homes, and inherited family properties without asking you to fix a thing.',
  },
  {
    name: 'Inland Empire',
    blurb:
      'Riverside and San Bernardino counties are among the fastest-changing markets in the state. Whether you own an aging home in San Bernardino or a newer build in Eastvale, Corona, or Temecula, we make fair cash offers with closings that fit your timeline.',
  },
];

// Situations we handle statewide — the reasons homeowners across all three
// regions reach out.
const situations = [
  'Inherited or probate properties',
  'Foreclosure or missed payments',
  'Divorce or separation',
  'Tired landlords and problem tenants',
  'Major repairs, code violations, or fire damage',
  'Job relocation or downsizing',
  'Tax liens or back taxes',
  'Vacant, distressed, or hard-to-sell homes',
];

const steps = [
  {
    step: '01',
    title: 'Tell us about your home',
    body: 'Call, text, or fill out our form. It takes about five minutes and there is no obligation.',
  },
  {
    step: '02',
    title: 'Get a fair cash offer',
    body: 'We review your property and present a no-obligation cash offer within 24 hours — no appraisals, no showings.',
  },
  {
    step: '03',
    title: 'Close on your timeline',
    body: 'Pick your closing date, as fast as 14 days. We cover the closing costs and buy the home as-is.',
  },
];

const areaFaqs = [
  {
    question: 'What areas of Southern California do you buy houses in?',
    answer:
      'We buy houses throughout Orange County, Los Angeles County, and the Inland Empire (Riverside and San Bernardino counties). That includes cities like Santa Ana, Anaheim, Irvine, Long Beach, Torrance, Riverside, Corona, and Temecula, along with the many communities in between.',
  },
  {
    question: "What if my city isn't listed?",
    answer:
      "Our city pages cover the areas we work in most, but the list isn't exhaustive. If you're anywhere in Southern California, reach out — there's a good chance we can still make you a cash offer or point you in the right direction.",
  },
  {
    question: 'Do you charge fees or commissions anywhere you buy?',
    answer:
      'No. In every city we serve, there are no agent commissions, no closing costs, and no hidden fees. The cash offer you accept is the amount you walk away with.',
  },
  {
    question: 'How fast can you close in my area?',
    answer:
      'Because we buy with our own cash, we can close in as little as 14 days anywhere we operate — or on a later date if you need more time. You choose the timeline that works for you.',
  },
];

const areas = [
  {
    name: 'Orange County',
    cities: [
      'Santa Ana', 'Anaheim', 'Garden Grove', 'Fullerton', 'Orange',
      'Huntington Beach', 'Irvine', 'Costa Mesa', 'Newport Beach', 'Mission Viejo',
      'Westminster', 'Buena Park', 'Tustin', 'Yorba Linda', 'Lake Forest',
      'Laguna Niguel', 'San Clemente', 'La Habra', 'Fountain Valley', 'Placentia',
    ],
  },
  {
    name: 'Los Angeles County',
    cities: [
      'Long Beach', 'Downey', 'Norwalk', 'Whittier', 'Bellflower',
      'Lakewood', 'Cerritos', 'Paramount', 'Pico Rivera', 'Montebello',
      'South Gate', 'Lynwood', 'Compton', 'Carson', 'Torrance',
      'Inglewood', 'Hawthorne', 'Gardena', 'Redondo Beach', 'El Monte',
    ],
  },
  {
    name: 'Inland Empire',
    cities: [
      'Riverside', 'San Bernardino', 'Moreno Valley', 'Ontario', 'Corona',
      'Fontana', 'Rancho Cucamonga', 'Pomona', 'Chino', 'Chino Hills',
      'Upland', 'Rialto', 'Redlands', 'Colton', 'Highland',
      'Murrieta', 'Temecula', 'Hemet', 'Perris', 'Menifee',
    ],
  },
];

export function ServiceAreasPage() {
  useSEO({
    title: 'Service Areas | Cash Home Buyers in SoCal | Father & Son',
    description: 'We buy houses throughout Orange County, Los Angeles County, and the Inland Empire. Get a cash offer for your Southern California home today.',
    canonical: 'https://fathersonhomes.com/service-areas',
  });

  usePageSchema(faqPageSchema(areaFaqs));

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-oatmeal/50 to-linen">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-8 bg-espresso/20" />
              <span className="text-sm font-medium tracking-warm text-driftwood">
                Local Experts
              </span>
              <div className="h-px w-8 bg-espresso/20" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-espresso mb-6">
              We Buy Houses Throughout Southern California
            </h1>
            <p className="text-lg text-driftwood max-w-2xl mx-auto">
              We're a family-owned team of cash home buyers serving Orange County, Los Angeles County, and the Inland Empire. Sell your home for cash — any condition, any situation, any timeline.
            </p>
          </div>
        </Container>
      </section>

      {/* Intro / Counties We Serve */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              Local Cash Home Buyers Across Southern California
            </h2>
            <p className="text-driftwood leading-relaxed">
              Father &amp; Son Home Buyers has spent years buying houses across three of
              the most diverse real-estate markets in the country. We're not a
              national franchise routing your information to the highest bidder — we're
              a local father-and-son team that knows these neighborhoods, buys homes
              directly with our own funds, and closes on your schedule. Below are the
              regions and counties we serve, plus the situations we help homeowners
              through every week.
            </p>
          </div>
          <div className="space-y-6">
            {counties.map((county) => (
              <div key={county.name} className="card-warm p-6 md:p-8">
                <h3 className="font-serif text-2xl font-medium text-espresso mb-3">
                  {county.name}
                </h3>
                <p className="text-driftwood leading-relaxed">{county.blurb}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Situations We Handle */}
      <section className="py-16 md:py-24 bg-oatmeal/30">
        <Container>
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              Situations We Handle
            </h2>
            <p className="text-driftwood leading-relaxed">
              No matter where you are in Southern California, life throws the same
              curveballs. Whatever's behind your sale, we've likely handled it before —
              without judgment, and without asking you to make a single repair.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {situations.map((s) => (
              <div key={s} className="flex items-start gap-3 card-warm p-5">
                <svg className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-driftwood">{s}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Areas Grid */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {areas.map((area) => (
              <div key={area.name} className="card-warm p-8">
                <div className="flex items-center gap-3 mb-6">
                  <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h2 className="font-serif text-2xl font-medium text-espresso">
                    {area.name}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.cities.map((city) => {
                    const slug = cityToSlug(city);
                    return cityPageSlugs.has(slug) ? (
                      <Link
                        key={city}
                        to={`/locations/${slug}`}
                        className="text-sm text-driftwood bg-oatmeal/50 px-3 py-1.5 rounded-full hover:bg-terracotta/10 hover:text-terracotta transition-warm"
                      >
                        {city}
                      </Link>
                    ) : (
                      <span
                        key={city}
                        className="text-sm text-driftwood bg-oatmeal/50 px-3 py-1.5 rounded-full"
                      >
                        {city}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works Summary */}
      <section className="py-16 md:py-24 bg-oatmeal/30">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              How Selling to Us Works
            </h2>
            <p className="text-driftwood max-w-xl mx-auto">
              The same simple, three-step process in every city we serve.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div key={item.step} className="card-warm p-8 text-center">
                <div className="font-serif text-5xl font-medium text-terracotta/30 mb-4">{item.step}</div>
                <h3 className="font-serif text-xl font-medium text-espresso mb-3">{item.title}</h3>
                <p className="text-driftwood text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/how-it-works"
              className="text-sm text-terracotta hover:text-espresso transition-warm inline-flex items-center gap-1 font-medium"
            >
              See the full process
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </Container>
      </section>

      {/* Service Areas FAQ */}
      <section className="py-16 md:py-24">
        <Container size="narrow">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              Service Area Questions
            </h2>
          </div>
          <div className="space-y-6">
            {areaFaqs.map((faq) => (
              <div key={faq.question} className="card-warm p-6">
                <h3 className="font-serif text-lg font-medium text-espresso mb-2">
                  {faq.question}
                </h3>
                <p className="text-driftwood leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Don't See Your City Section */}
      <section className="py-16 md:py-24 bg-oatmeal/30">
        <Container size="narrow">
          <div className="text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-espresso mb-4">
              Don't See Your City?
            </h2>
            <p className="text-driftwood mb-8 max-w-xl mx-auto">
              We may still be able to help! Give us a call or fill out our form, and we'll let you know if we can make you an offer on your property.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                Get My Cash Offer
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
