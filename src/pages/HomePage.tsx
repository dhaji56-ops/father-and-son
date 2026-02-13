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
