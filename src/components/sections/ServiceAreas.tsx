import { Container } from '../layout/Container';
import { SectionLabel } from '../ui/SectionLabel';

const serviceAreas = {
  'Orange County': ['Anaheim', 'Irvine', 'Santa Ana', 'Huntington Beach', 'Fullerton', 'Costa Mesa', 'Garden Grove', 'Orange'],
  'Los Angeles': ['Long Beach', 'Torrance', 'Pasadena', 'Pomona', 'Downey', 'Compton', 'Norwalk', 'El Monte'],
  'Inland Empire': ['Riverside', 'Corona', 'Fontana', 'Moreno Valley', 'Ontario', 'Rancho Cucamonga', 'San Bernardino', 'Temecula'],
};

export function ServiceAreas() {
  return (
    <section id="areas" className="py-16 md:py-24 border-b-4 border-black">
      <Container>
        <div className="mb-12">
          <SectionLabel number="04" text="Service Areas" />
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter mt-4">
            We Buy Houses Throughout
            <span className="text-swiss-accent"> Southern California</span>
          </h2>
        </div>

        {/* Table */}
        <div className="border-4 border-black overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 bg-black text-white">
            {Object.keys(serviceAreas).map((region) => (
              <div
                key={region}
                className="p-4 md:p-6 font-bold text-xs md:text-sm uppercase tracking-wide border-r-2 border-gray-800 last:border-r-0"
              >
                {region}
              </div>
            ))}
          </div>

          {/* Body */}
          <div className="grid grid-cols-3">
            {Object.entries(serviceAreas).map(([region, cities], regionIndex) => (
              <div
                key={region}
                className={`
                  p-4 md:p-6
                  ${regionIndex < 2 ? 'border-r-2 border-black' : ''}
                `}
              >
                <ul className="space-y-2">
                  {cities.map((city) => (
                    <li key={city} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-swiss-accent flex-shrink-0" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-600">
          Don't see your city? We likely still serve your area.{' '}
          <a href="#contact" className="font-bold text-black underline hover:text-swiss-accent transition-colors">
            Contact us
          </a>{' '}
          to find out.
        </p>
      </Container>
    </section>
  );
}
