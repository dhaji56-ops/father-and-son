import { Container } from '../components/layout';
import { useSEO } from '../hooks/useSEO';

export function PrivacyPolicyPage() {
  useSEO({
    title: 'Privacy Policy | Father & Son Home Buyers',
    description: 'Privacy policy for Father & Son Home Buyers. Learn how we collect, use, and protect your personal information.',
    canonical: 'https://fathersonhomes.com/privacy-policy',
  });

  return (
    <section className="py-16 md:py-24">
      <Container size="narrow">
        <h1 className="font-serif text-4xl md:text-5xl font-medium text-espresso mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-driftwood/60 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-driftwood leading-relaxed">
          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Information We Collect</h2>
            <p>
              When you fill out a form on our website, we collect your name, phone number, email address, and property address. We use Google Places Autocomplete to help you enter your address, which may transmit address data to Google.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">How We Use Your Information</h2>
            <p>
              We use the information you provide solely to evaluate your property, prepare a cash offer, and communicate with you about our services. We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Cookies &amp; Analytics</h2>
            <p>
              Our website may use cookies and third-party analytics tools (such as Google Analytics) to understand how visitors interact with our site. This helps us improve the user experience. You can disable cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Data Security</h2>
            <p>
              We take reasonable measures to protect the personal information you provide. Form submissions are transmitted securely and stored with limited access.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Third-Party Services</h2>
            <p>
              We use Web3Forms to process form submissions and Google Maps APIs for address autocomplete. These third-party services have their own privacy policies governing how they handle data.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information at any time by contacting us at{' '}
              <a href="mailto:contact@fathersonhomes.com" className="text-terracotta hover:underline">
                contact@fathersonhomes.com
              </a>{' '}
              or by calling <a href="tel:+19495412003" className="text-terracotta hover:underline">(949) 541-2003</a>.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-3">Contact Us</h2>
            <p>
              If you have questions about this privacy policy, contact us at{' '}
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
