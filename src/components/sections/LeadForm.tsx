import { useState } from 'react';
import { Container } from '../layout/Container';

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
    <section id="contact" className="py-20 md:py-32 border-t border-luxury-fg/10">
      <Container size="narrow">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 md:w-12 bg-luxury-fg" />
            <span className="text-[10px] uppercase tracking-luxury-wide text-luxury-muted-fg">
              Get Started
            </span>
            <div className="h-px w-8 md:w-12 bg-luxury-fg" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.9] mb-6">
            Request Your
            <span className="block"><em className="text-luxury-accent">Free</em> Cash Offer</span>
          </h2>
          <p className="text-luxury-muted-fg max-w-md mx-auto">
            Fill out the form below and we'll contact you within 48 hours with a fair, no-obligation offer.
          </p>
        </div>

        {/* Form */}
        <div className="border-t border-luxury-fg/10 pt-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label htmlFor="address" className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg block mb-2">
                Property Address
              </label>
              <input
                id="address"
                name="address"
                placeholder="123 Main Street, City, CA 92000"
                value={formData.address}
                onChange={handleChange}
                required
                className="input-luxury w-full text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label htmlFor="name" className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg block mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-luxury w-full text-base"
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg block mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-luxury w-full text-base"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg block mb-2">
                Email (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@email.com"
                value={formData.email}
                onChange={handleChange}
                className="input-luxury w-full text-base"
              />
            </div>

            <div className="pt-4">
              <button type="submit" className="btn-luxury-primary w-full h-14">
                <span className="text-xs uppercase tracking-luxury font-medium">
                  Get My Cash Offer Now
                </span>
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-[10px] uppercase tracking-luxury text-luxury-muted-fg">
            No obligation. Your information is secure and never shared.
          </p>
        </div>

        {/* Trust Signals */}
        <div className="mt-16 pt-16 border-t border-luxury-fg/10">
          <div className="flex flex-wrap justify-center gap-12 md:gap-16">
            <div className="text-center">
              <span className="font-serif text-4xl md:text-5xl block mb-2">500+</span>
              <span className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg">
                Houses Bought
              </span>
            </div>
            <div className="text-center">
              <span className="font-serif text-4xl md:text-5xl block mb-2">4.9</span>
              <span className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg">
                Google Rating
              </span>
            </div>
            <div className="text-center">
              <span className="font-serif text-4xl md:text-5xl block mb-2">A+</span>
              <span className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg">
                BBB Rating
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
