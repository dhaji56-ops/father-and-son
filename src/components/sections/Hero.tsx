import { useState, useEffect } from 'react';
import { Container } from '../layout/Container';
import { useAddressAutocomplete } from '../../hooks/useAddressAutocomplete';

// Modest Southern California home - relatable to target audience
const HERO_IMAGE = 'https://images.unsplash.com/photo-1759355787174-044355f63c55?w=1200&q=80';

export function Hero() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const addressInputRef = useAddressAutocomplete({
    onPlaceSelected: (selectedAddress) => setAddress(selectedAddress),
  });

  // Sync input value when address state changes
  useEffect(() => {
    if (addressInputRef.current && addressInputRef.current.value !== address) {
      addressInputRef.current.value = address;
    }
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { address, phone });
  };

  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Typography & Form */}
          <div className="lg:col-span-5 lg:col-start-1">
            {/* Section Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-espresso/20" />
              <span className="text-sm font-medium tracking-warm text-driftwood">
                Cash Home Buyers
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-medium leading-tight mb-6">
              <span className="block text-4xl md:text-5xl lg:text-6xl text-espresso">
                Sell Your Home
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl text-espresso">
                for <em className="text-terracotta">Cash</em>
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg text-driftwood mb-10 max-w-md leading-relaxed">
              <span className="text-espresso font-medium">48-hour offers.</span>{' '}
              No repairs. No fees. No hassle. Serving Southern California families since 2015.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <input
                  ref={addressInputRef}
                  name="address"
                  placeholder="Property address..."
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="street-address"
                  required
                  className="input-warm w-full h-12 text-base"
                />
              </div>
              <div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Your phone number..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="input-warm w-full h-12 text-base"
                />
              </div>
              <button type="submit" className="btn-primary w-full h-12 mt-2 text-sm font-medium">
                Get My Cash Offer
              </button>
            </form>

            <p className="text-sm text-driftwood">
              No obligation. Your information is secure.
            </p>
          </div>

          {/* Right: Hero Image */}
          <div className="lg:col-span-6 lg:col-start-7 relative group">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl shadow-warm-lg">
              <img
                src={HERO_IMAGE}
                alt="Single-family home in Southern California"
                className="img-warm w-full h-full object-cover -rotate-[3deg] scale-110"
              />
            </div>

            {/* Stats below image */}
            <div className="flex justify-center gap-16 mt-8 pt-6 border-t border-espresso/10">
              <div className="text-center">
                <span className="font-serif text-3xl md:text-4xl font-medium text-espresso block">48hr</span>
                <span className="text-sm text-driftwood">
                  Fast Offers
                </span>
              </div>
              <div className="text-center">
                <span className="font-serif text-3xl md:text-4xl font-medium text-espresso block">$0</span>
                <span className="text-sm text-driftwood">
                  Hidden Fees
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
