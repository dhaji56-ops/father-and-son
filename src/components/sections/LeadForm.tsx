import { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import { useAddressAutocomplete } from '../../hooks/useAddressAutocomplete';

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

  const addressInputRef = useAddressAutocomplete({
    onPlaceSelected: (selectedAddress) =>
      setFormData((prev) => ({ ...prev, address: selectedAddress })),
  });

  // Sync input value when address state changes
  useEffect(() => {
    if (addressInputRef.current && addressInputRef.current.value !== formData.address) {
      addressInputRef.current.value = formData.address;
    }
  }, [formData.address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-16 md:py-20 lg:py-24">
      <Container size="narrow">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-espresso/20" />
            <span className="text-sm font-medium tracking-warm text-driftwood">
              Get Started
            </span>
            <div className="h-px w-8 bg-espresso/20" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-espresso mb-4">
            Request Your <em className="text-terracotta">Free</em> Cash Offer
          </h2>
          <p className="text-driftwood max-w-md mx-auto">
            Fill out the form below and we'll contact you within 48 hours with a fair, no-obligation offer.
          </p>
        </div>

        {/* Form */}
        <div className="card-warm p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-driftwood mb-2">
                Property Address
              </label>
              <input
                ref={addressInputRef}
                id="address"
                name="address"
                placeholder="123 Main Street, City, CA 92000"
                defaultValue={formData.address}
                onChange={handleChange}
                autoComplete="street-address"
                required
                className="input-warm w-full h-12 text-base"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-driftwood mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-warm w-full h-12 text-base"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-driftwood mb-2">
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
                  className="input-warm w-full h-12 text-base"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-driftwood mb-2">
                Email (Optional)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john@email.com"
                value={formData.email}
                onChange={handleChange}
                className="input-warm w-full h-12 text-base"
              />
            </div>

            <div className="pt-2">
              <button type="submit" className="btn-terracotta w-full h-12 text-sm font-medium">
                Get My Cash Offer Now
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-driftwood">
            No obligation. Your information is secure and never shared.
          </p>
        </div>

        {/* Trust Signals */}
        <div className="mt-12 pt-10 border-t border-espresso/10">
          <div className="flex flex-wrap justify-center gap-10 md:gap-16">
            <div className="text-center">
              <span className="font-serif text-3xl md:text-4xl font-medium text-espresso block mb-1">500+</span>
              <span className="text-sm text-driftwood">
                Houses Bought
              </span>
            </div>
            <div className="text-center">
              <span className="font-serif text-3xl md:text-4xl font-medium text-espresso block mb-1">4.9</span>
              <span className="text-sm text-driftwood">
                Google Rating
              </span>
            </div>
            <div className="text-center">
              <span className="font-serif text-3xl md:text-4xl font-medium text-espresso block mb-1">A+</span>
              <span className="text-sm text-driftwood">
                BBB Rating
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
