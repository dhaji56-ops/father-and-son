import { Container } from '../components/layout';
import { CTASection } from '../components/sections';

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
              Serving Southern California
            </h1>
            <p className="text-lg text-driftwood max-w-2xl mx-auto">
              We buy houses throughout Orange County, Los Angeles County, and the Inland Empire. If you're in SoCal, we'd love to help.
            </p>
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
                  {area.cities.map((city) => (
                    <span
                      key={city}
                      className="text-sm text-driftwood bg-oatmeal/50 px-3 py-1.5 rounded-full"
                    >
                      {city}
                    </span>
                  ))}
                </div>
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
