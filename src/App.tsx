import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import {
  HomePage,
  HowItWorksPage,
  AboutUsPage,
  ServiceAreasPage,
  FAQPage,
  ContactPage,
  CashAdvancePage,
} from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="about-us" element={<AboutUsPage />} />
          <Route path="service-areas" element={<ServiceAreasPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="cash-advance" element={<CashAdvancePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
