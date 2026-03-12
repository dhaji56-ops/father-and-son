import { Container } from '../components/layout';
import { useSEO } from '../hooks/useSEO';

export function TermsOfServicePage() {
  useSEO({
    title: 'Terms of Service | Father & Son Home Buyers',
    description: 'Terms of service for Father & Son Home Buyers website. Read about the conditions for using our website and services.',
    canonical: 'https://fathersonhomes.com/terms-of-service',
  });

  return (
    <section className="py-16 md:py-24">
      <Container size="narrow">
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-espresso mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-driftwood/60 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-driftwood leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Agreement to Terms</h2>
            <p>
              By accessing and using the Father & Son Home Buyers website (fathersonhomes.com), you agree to be bound by these Terms of Service. If you do not agree, please discontinue use of the site.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Services</h2>
            <p>
              Father & Son Home Buyers provides cash offers for residential properties in Southern California, including Orange County, Los Angeles County, and the Inland Empire. Information on this website is for general informational purposes and does not constitute a binding offer until a formal purchase agreement is signed by both parties.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">No Guaranteed Outcomes</h2>
            <p>
              While we strive to provide fair offers and close on your timeline, each transaction is unique. Timelines, offer amounts, and closing details may vary based on the condition, title status, and circumstances of each property.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">User Responsibilities</h2>
            <p>
              You agree to provide accurate information when submitting forms on our website. You represent that you have the legal authority to inquire about selling the property you submit, or that you are acting on behalf of the property owner with their consent.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and images, is the property of Father & Son Home Buyers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Limitation of Liability</h2>
            <p>
              Father & Son Home Buyers shall not be held liable for any damages arising from the use of this website, including but not limited to direct, indirect, incidental, or consequential damages. We make no warranties regarding the accuracy or completeness of information presented on this site.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the State of California. Any disputes shall be resolved in the courts of Orange County, California.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Contact Us</h2>
            <p>
              For questions about these terms, contact us at{' '}
              <a href="mailto:contact@fathersonhomes.com" className="text-terracotta hover:underline">
                contact@fathersonhomes.com
              </a>{' '}
              or call <a href="tel:+19495412003" className="text-terracotta hover:underline">(949) 541-2003</a>.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
