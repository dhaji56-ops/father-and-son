import { useState } from 'react';
import { Container } from '../layout/Container';
import { SectionLabel } from '../ui/SectionLabel';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function LeadForm() {
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-swiss-muted pattern-dots">
      <Container size="narrow">
        <div className="text-center mb-12">
          <SectionLabel number="06" text="Get Started" className="justify-center mb-4" />
          <h2 className="font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter">
            Get Your
            <span className="text-swiss-accent"> Free </span>
            Cash Offer
          </h2>
          <p className="mt-4 text-gray-600 max-w-md mx-auto">
            Fill out the form below and we'll contact you within 48 hours with a fair, no-obligation offer.
          </p>
        </div>

        <div className="bg-white border-4 border-black p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Property Address"
              name="address"
              placeholder="123 Main St, City, CA 92000"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Your Name"
                name="name"
                placeholder="John Smith"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <Input
              label="Email (Optional)"
              name="email"
              type="email"
              placeholder="john@email.com"
              value={formData.email}
              onChange={handleChange}
            />

            <div className="pt-4">
              <Button type="submit" variant="secondary" fullWidth size="lg">
                Get My Cash Offer Now
              </Button>
            </div>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            No obligation. Your information is secure and never shared.
            <br />
            We'll respond within 48 hours.
          </p>
        </div>

        {/* Trust Signals */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-center">
          <div>
            <span className="block font-black text-2xl">500+</span>
            <span className="text-xs uppercase tracking-wide text-gray-600">Houses Bought</span>
          </div>
          <div>
            <span className="block font-black text-2xl">4.9★</span>
            <span className="text-xs uppercase tracking-wide text-gray-600">Google Rating</span>
          </div>
          <div>
            <span className="block font-black text-2xl">A+</span>
            <span className="text-xs uppercase tracking-wide text-gray-600">BBB Rating</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
