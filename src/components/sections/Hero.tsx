import { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import { useAddressAutocomplete } from '../../hooks/useAddressAutocomplete';

// Southern California home background
const HERO_IMAGE = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80';

export function Hero() {
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    phone: '',
    email: '',
    situation: '',
    timeline: '',
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Beautiful Southern California home"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/60 to-espresso/40" />
      </div>

      <Container size="wide" className="relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="bg-espresso/60 backdrop-blur-sm rounded-2xl p-6 md:p-8 text-white">
            {/* Logo Badge */}
            <div className="mb-6 flex justify-center">
              <img
                src="/logo.png"
                alt="Father & Son Home Buyers"
                className="h-40 w-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs bg-white/20 px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Local Family-Owned
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs bg-white/20 px-3 py-1.5 rounded-full">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                No Hidden Fees
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-snug mb-4">
              Sell Your House As-Is for Cash in Southern California
            </h1>

            {/* Subheadline */}
            <p className="text-base md:text-lg text-white/90 mb-4 leading-relaxed">
              Get a fair, transparent cash offer within 48 hours. Close in as little as 14 days — or on your schedule. No fees. No pressure. No games.
            </p>

            {/* Tagline */}
            <p className="text-base italic text-white/80 mb-5 border-l-2 border-terracotta pl-3">
              "From our family to yours — a better way to sell"
            </p>

            {/* Bullet Points */}
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-terracotta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Cash offer within 48 hours — sell as-is</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-terracotta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>We handle cleanout — leave what you don't want</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <svg className="w-4 h-4 text-terracotta flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Zero fees, zero commissions</span>
              </li>
            </ul>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-espresso mb-2">
                Get Your Cash Offer
              </h2>
              <p className="text-driftwood">
                Tell us about your property. No obligation — just a fair offer.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="hero-address" className="block text-sm font-medium text-driftwood mb-2">
                  Property Address *
                </label>
                <input
                  ref={addressInputRef}
                  id="hero-address"
                  name="address"
                  placeholder="123 Main St, Santa Ana, CA"
                  defaultValue={formData.address}
                  onChange={handleChange}
                  autoComplete="street-address"
                  required
                  className="input-warm w-full h-12 text-base"
                />
              </div>

              <div>
                <label htmlFor="hero-name" className="block text-sm font-medium text-driftwood mb-2">
                  Your Name *
                </label>
                <input
                  id="hero-name"
                  name="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-warm w-full h-12 text-base"
                />
              </div>

              <div>
                <label htmlFor="hero-phone" className="block text-sm font-medium text-driftwood mb-2">
                  Phone Number *
                </label>
                <input
                  id="hero-phone"
                  name="phone"
                  type="tel"
                  placeholder="(949) 555-1234"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-warm w-full h-12 text-base"
                />
              </div>

              <div>
                <label htmlFor="hero-email" className="block text-sm font-medium text-driftwood mb-2">
                  Email Address <span className="text-driftwood/60">(Optional)</span>
                </label>
                <input
                  id="hero-email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-warm w-full h-12 text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="hero-situation" className="block text-sm font-medium text-driftwood mb-2">
                    Property Situation
                  </label>
                  <select
                    id="hero-situation"
                    name="situation"
                    value={formData.situation}
                    onChange={handleChange}
                    className="input-warm w-full h-12 text-base"
                  >
                    <option value="">Select situation</option>
                    <option value="selling">Ready to Sell</option>
                    <option value="inherited">Inherited Property</option>
                    <option value="foreclosure">Facing Foreclosure</option>
                    <option value="divorce">Divorce</option>
                    <option value="relocating">Relocating</option>
                    <option value="repairs">Needs Repairs</option>
                    <option value="tenant">Problem Tenants</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="hero-timeline" className="block text-sm font-medium text-driftwood mb-2">
                    Timeline to Sell
                  </label>
                  <select
                    id="hero-timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="input-warm w-full h-12 text-base"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="30-60">30–60 days</option>
                    <option value="60+">60+ days</option>
                    <option value="unsure">Not sure yet</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="btn-terracotta w-full h-12 text-sm font-medium flex items-center justify-center gap-2"
              >
                Get My Cash Offer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>

            <p className="mt-4 text-xs text-driftwood text-center">
              By submitting this form, you consent to receive calls, texts, and emails from Father & Son Home Buyers regarding your property. Message & data rates may apply. You can opt out at any time.
            </p>

            {/* Trust Signals */}
            <div className="mt-6 pt-6 border-t border-espresso/10">
              <div className="flex justify-center gap-8">
                <div className="flex items-center gap-2 text-sm text-driftwood">
                  <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  48-Hour Offer
                </div>
                <div className="flex items-center gap-2 text-sm text-driftwood">
                  <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No Obligation
                </div>
                <div className="flex items-center gap-2 text-sm text-driftwood">
                  <svg className="w-5 h-5 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  No Hidden Fees
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
