import { Container } from '../layout/Container';

const serviceAreas = {
  'Orange County': ['Anaheim', 'Irvine', 'Santa Ana', 'Huntington Beach', 'Fullerton', 'Costa Mesa', 'Newport Beach', 'Orange'],
  'Los Angeles': ['Long Beach', 'Torrance', 'Pasadena', 'Pomona', 'Downey', 'Compton', 'Norwalk', 'El Monte'],
  'Inland Empire': ['Riverside', 'Corona', 'Fontana', 'Moreno Valley', 'Ontario', 'Rancho Cucamonga', 'San Bernardino', 'Temecula'],
};

export function ServiceAreas() {
  return (
    <section id="areas" className="py-16 md:py-20 bg-oatmeal">
      <Container size="wide">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-espresso/20" />
            <span className="text-sm font-medium tracking-warm text-driftwood">
              Service Areas
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-espresso max-w-3xl">
            We Buy Houses Throughout <em className="text-terracotta">Southern</em> California
          </h2>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.entries(serviceAreas).map(([region, cities]) => (
            <div
              key={region}
              className="card-warm p-6 md:p-8"
            >
              <h3 className="font-serif text-xl md:text-2xl font-medium text-espresso mb-6">
                {region}
              </h3>
              <ul className="space-y-2">
                {cities.map((city) => (
                  <li key={city} className="flex items-center gap-3 text-sm text-driftwood group">
                    <span className="w-1.5 h-1.5 bg-terracotta/50 rounded-full transition-warm group-hover:bg-terracotta group-hover:scale-125" />
                    <span className="transition-warm group-hover:text-espresso">{city}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-driftwood">
            Don't see your city listed?{' '}
            <a href="#contact" className="text-espresso font-medium hover:text-terracotta transition-warm underline underline-offset-4">
              Contact us
            </a>{' '}
            — we likely still serve your area.
          </p>
        </div>
      </Container>
    </section>
  );
}
