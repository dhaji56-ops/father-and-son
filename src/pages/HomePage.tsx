import { useSEO } from '../hooks/useSEO';
import {
  Hero,
  ValueProps,
  HowItWorks,
  WhySellToUs,
  CashAdvance,
  MeetTheFamily,
  ServiceAreas,
  CTASection,
} from '../components/sections';

export function HomePage() {
  useSEO({
    title: 'Sell My House Fast for Cash in SoCal | Father & Son',
    description: 'Get a fair cash offer within 24 hours. No repairs, no fees, no agents. Family-owned cash home buyers serving Orange County, LA County & Inland Empire.',
    canonical: 'https://fathersonhomes.com/',
  });

  return (
    <>
      <Hero />
      <ValueProps />
      <HowItWorks />
      <WhySellToUs />
      <CashAdvance />
      <MeetTheFamily />
      <ServiceAreas />
      <CTASection />
    </>
  );
}
