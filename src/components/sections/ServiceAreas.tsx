import { Container } from '../layout/Container';

const serviceAreas = {
  'Orange County': ['Anaheim', 'Irvine', 'Santa Ana', 'Huntington Beach', 'Fullerton', 'Costa Mesa', 'Newport Beach', 'Orange'],
  'Los Angeles': ['Long Beach', 'Torrance', 'Pasadena', 'Pomona', 'Downey', 'Compton', 'Norwalk', 'El Monte'],
  'Inland Empire': ['Riverside', 'Corona', 'Fontana', 'Moreno Valley', 'Ontario', 'Rancho Cucamonga', 'San Bernardino', 'Temecula'],
};

export function ServiceAreas() {
  return (
    <section id="areas" className="py-20 md:py-32 bg-luxury-muted-bg">
      <Container size="wide">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 md:w-12 bg-luxury-fg" />
            <span className="text-[10px] uppercase tracking-luxury-wide text-luxury-muted-fg">
              Service Areas
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.9] max-w-3xl">
            We Buy Houses Throughout
            <span className="block"><em className="text-luxury-accent">Southern</em> California</span>
          </h2>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {Object.entries(serviceAreas).map(([region, cities], index) => (
            <div
              key={region}
              className={`
                p-8 md:p-12
                border-t border-luxury-fg/10
                ${index < 2 ? 'md:border-r md:border-luxury-fg/10' : ''}
              `}
            >
              <h3 className="font-serif text-2xl md:text-3xl mb-8">
                {region}
              </h3>
              <ul className="space-y-3">
                {cities.map((city) => (
                  <li key={city} className="flex items-center gap-3 text-sm text-luxury-muted-fg group">
                    <span className="w-1 h-1 bg-luxury-accent transition-luxury group-hover:w-4" />
                    <span className="transition-luxury group-hover:text-luxury-fg">{city}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 pt-12 border-t border-luxury-fg/10 text-center">
          <p className="text-sm text-luxury-muted-fg">
            Don't see your city listed?{' '}
            <a href="#contact" className="text-luxury-fg border-b border-luxury-fg hover:border-luxury-accent hover:text-luxury-accent transition-luxury">
              Contact us
            </a>{' '}
            — we likely still serve your area.
          </p>
        </div>
      </Container>
    </section>
  );
}
