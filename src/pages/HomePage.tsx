import { useSEO } from '../hooks/useSEO';
import { usePageSchema, homeLocalBusinessSchema } from '../lib/schema';
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
    title: 'Father & Son Home Buyers | Sell Your House Fast for Cash',
    description: 'Father & Son Home Buyers — get a fair cash offer within 24 hours. No repairs, no fees, no agents. Family-owned cash home buyers serving Orange County, LA & Inland Empire.',
    canonical: 'https://fathersonhomes.com/',
  });

  usePageSchema(homeLocalBusinessSchema());

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
