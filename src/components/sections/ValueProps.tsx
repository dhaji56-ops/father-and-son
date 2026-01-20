import { Container } from '../layout/Container';
import { SectionLabel } from '../ui/SectionLabel';

const valueProps = [
  {
    stat: '48',
    unit: 'HR',
    title: 'Fast Offers',
    description: 'Get a fair cash offer within 48 hours of contacting us.',
  },
  {
    stat: '$0',
    unit: '',
    title: 'No Fees',
    description: 'Zero commissions, no hidden costs, no closing fees.',
  },
  {
    stat: 'AS-IS',
    unit: '',
    title: 'No Repairs',
    description: 'Sell your house in any condition. No repairs needed.',
  },
  {
    stat: '100',
    unit: '%',
    title: 'Transparent',
    description: 'Honest, straightforward process with no surprises.',
  },
];

export function ValueProps() {
  return (
    <section className="py-16 md:py-24 border-b-4 border-black">
      <Container>
        <div className="mb-12">
          <SectionLabel number="02" text="Why Sell To Us" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="
                bg-white border-4 border-black p-6 md:p-8
                transition-colors duration-200
                hover:bg-black hover:text-white
                group
              "
            >
              <div className="mb-4">
                <span className="font-black text-display-sm md:text-display-md tracking-tighter">
                  {prop.stat}
                </span>
                {prop.unit && (
                  <span className="text-lg md:text-xl font-bold ml-1 group-hover:text-swiss-accent">
                    {prop.unit}
                  </span>
                )}
              </div>
              <h3 className="font-bold text-sm uppercase tracking-wide mb-2">
                {prop.title}
              </h3>
              <p className="text-sm text-gray-600 group-hover:text-gray-300">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
