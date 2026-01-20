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
    <section className="py-20 md:py-32 border-t border-luxury-fg/10">
      <Container size="wide">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-8 md:w-12 bg-luxury-fg" />
            <span className="text-[10px] uppercase tracking-luxury-wide text-luxury-muted-fg">
              Why Choose Us
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.9] max-w-2xl">
            The <em className="text-luxury-accent">Smarter</em> Way
            <span className="block">to Sell Your Home</span>
          </h2>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {valueProps.map((prop) => (
            <div
              key={prop.number}
              className="card-luxury p-8 md:p-10 group"
            >
              <span className="font-serif text-5xl md:text-6xl text-luxury-accent/30 block mb-6 transition-luxury group-hover:text-luxury-accent">
                {prop.number}
              </span>
              <h3 className="font-serif text-xl md:text-2xl mb-4">
                {prop.title}
              </h3>
              <p className="text-sm text-luxury-muted-fg leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
