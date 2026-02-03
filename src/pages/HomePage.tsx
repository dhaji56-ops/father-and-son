import {
  Hero,
  ValueProps,
  HowItWorks,
  WhySellToUs,
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
      <MeetTheFamily />
      <ServiceAreas />
      <CTASection />
    </>
  );
}
