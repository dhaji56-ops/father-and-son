import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';

const serviceAreas = [
  {
    name: 'Orange County',
    cities: ['Santa Ana', 'Anaheim', 'Garden Grove', 'Fullerton', 'Orange', 'Huntington Beach'],
  },
  {
    name: 'Los Angeles County',
    cities: ['Long Beach', 'Downey', 'Norwalk', 'Whittier', 'Bellflower'],
  },
  {
    name: 'Inland Empire',
    cities: ['Riverside', 'San Bernardino', 'Moreno Valley', 'Ontario', 'Corona'],
  },
];

export function ServiceAreas() {
  return (
    <section id="areas" className="py-16 md:py-24 bg-oatmeal/30">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-espresso/20" />
            <span className="text-sm font-medium tracking-warm text-driftwood flex items-center gap-2">
              <svg className="w-4 h-4 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Local Experts
            </span>
            <div className="h-px w-8 bg-espresso/20" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-espresso mb-4">
            Serving Southern California
          </h2>
          <p className="text-driftwood max-w-2xl mx-auto">
            We buy houses throughout Orange County, Los Angeles County, and the Inland Empire. If you're in SoCal, we'd love to help.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {serviceAreas.map((area) => (
            <div
              key={area.name}
              className="card-warm p-6 md:p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-serif text-xl font-medium text-espresso">
                  {area.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {area.cities.map((city) => (
                  <span
                    key={city}
                    className="text-sm text-driftwood bg-oatmeal/50 px-3 py-1.5 rounded-full"
                  >
                    {city}
                  </span>
                ))}
              </div>
              <Link
                to="/service-areas"
                className="text-sm text-terracotta hover:text-espresso transition-warm inline-flex items-center gap-1"
              >
                View all cities
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/service-areas"
            className="btn-secondary inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium"
          >
            See All Service Areas
          </Link>
        </div>
      </Container>
    </section>
  );
}
