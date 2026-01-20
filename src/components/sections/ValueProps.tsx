import { Container } from '../layout/Container';

const valueProps = [
  {
    number: '01',
    title: 'Fast Offers',
    description: 'Receive a fair cash offer within 48 hours. No waiting, no uncertainty.',
  },
  {
    number: '02',
    title: 'Zero Fees',
    description: 'No commissions, no hidden costs, no closing fees. Keep more of your money.',
  },
  {
    number: '03',
    title: 'As-Is Sales',
    description: 'Sell your house in any condition. No repairs, no cleaning, no staging needed.',
  },
  {
    number: '04',
    title: 'Transparent',
    description: 'Honest, straightforward process. We explain every step clearly.',
  },
];

export function ValueProps() {
  return (
    <section className="py-16 md:py-20 bg-oatmeal">
      <Container size="wide">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-espresso/20" />
            <span className="text-sm font-medium tracking-warm text-driftwood">
              Why Choose Us
            </span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-espresso max-w-2xl">
            The <em className="text-terracotta">Smarter</em> Way to Sell Your Home
          </h2>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop) => (
            <div
              key={prop.number}
              className="card-warm p-6 md:p-8 group"
            >
              <span className="font-serif text-4xl md:text-5xl text-terracotta/30 block mb-4 transition-warm group-hover:text-terracotta">
                {prop.number}
              </span>
              <h3 className="font-serif text-xl font-medium text-espresso mb-3">
                {prop.title}
              </h3>
              <p className="text-sm text-driftwood leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
