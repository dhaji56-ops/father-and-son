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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ValueProps />
        <HowItWorks />
        <ServiceAreas />
        <WhyUs />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
