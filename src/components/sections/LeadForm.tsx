import { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import { useAddressAutocomplete } from '../../hooks/useAddressAutocomplete';
import { submitLead } from '../../lib/submitLead';
import { validateLeadForm, hasErrors, type ValidationErrors } from '../../lib/validateLead';

export function LeadForm() {
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = name === 'phone' ? formatPhone(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const addressInputRef = useAddressAutocomplete({
    onPlaceSelected: (selectedAddress) => {
      setFormData((prev) => ({ ...prev, address: selectedAddress }));
      setErrors((prev) => ({ ...prev, address: undefined }));
    },
  });

  // Sync input value when address state changes
  useEffect(() => {
    if (addressInputRef.current && addressInputRef.current.value !== formData.address) {
      addressInputRef.current.value = formData.address;
    }
  }, [formData.address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validateLeadForm(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) return;

    setIsSubmitting(true);
    const result = await submitLead({ ...formData, source: 'contact' });
    setIsSubmitting(false);

    setSubmitStatus({ type: result.success ? 'success' : 'error', message: result.message });

    if (result.success) {
      setFormData({ address: '', name: '', phone: '', email: '' });
      if (addressInputRef.current) addressInputRef.current.value = '';
    }
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
            Fill out the form below and we'll contact you within 24 hours with a fair, no-obligation offer.
          </p>
        </div>

        {/* Form */}
        <div className="card-warm p-8 md:p-10">
          {submitStatus?.type === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-medium text-espresso mb-3">
                Thank You!
              </h3>
              <p className="text-driftwood mb-6">
                {submitStatus.message}
              </p>
              <a
                href="tel:+19495412003"
                className="btn-terracotta px-6 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call or Text (949) 541-2003
              </a>
            </div>
          ) : (
            <>
              {submitStatus?.type === 'error' && (
                <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700">{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot for spam */}
                <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-driftwood mb-2">
                    Property Address *
                  </label>
                  <input
                    ref={addressInputRef}
                    id="address"
                    name="address"
                    placeholder="123 Main Street, City, CA 92000"
                    defaultValue={formData.address}
                    onChange={handleChange}
                    autoComplete="off"
                    className={`input-warm w-full h-12 text-base ${errors.address ? 'border-red-400' : ''}`}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-driftwood mb-2">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={handleChange}
                      className={`input-warm w-full h-12 text-base ${errors.name ? 'border-red-400' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-driftwood mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-warm w-full h-12 text-base ${errors.phone ? 'border-red-400' : ''}`}
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-driftwood mb-2">
                    Email <span className="text-driftwood/60">(Optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-warm w-full h-12 text-base ${errors.email ? 'border-red-400' : ''}`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-terracotta w-full h-12 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Get My Cash Offer'
                    )}
                  </button>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-driftwood">
                No obligation. Your information is secure and never shared.
              </p>
            </>
          )}
        </div>

      </Container>
    </section>
  );
}
