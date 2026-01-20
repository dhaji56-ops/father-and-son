import { Header, Footer } from './components/layout';
import {
  Hero,
  ValueProps,
  HowItWorks,
  ServiceAreas,
  WhyUs,
  LeadForm,
} from './components/sections';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-luxury-bg pattern-noise">
      {/* Vertical Grid Lines - Editorial Magazine Feel */}
      <div className="grid-lines hidden lg:flex" aria-hidden="true">
        <div className="line" />
        <div className="line" />
      </div>

      <Header />
      <main className="flex-1">
        <Hero />
        <ValueProps />
        <HowItWorks />
        <WhyUs />
        <ServiceAreas />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
