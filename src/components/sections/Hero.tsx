import { useState } from 'react';
import { Container } from '../layout/Container';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export function Hero() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { address, phone });
  };

  return (
    <section className="bg-swiss-muted pattern-grid-large relative">
      <Container>
        <div className="py-12 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left: Typography */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <span className="text-swiss-accent font-bold text-xs tracking-widest uppercase">
                  01. Cash Home Buyers
                </span>
              </div>

              <h1 className="font-black uppercase tracking-tighter leading-none mb-6">
                <span className="block text-display-sm md:text-display-lg lg:text-display-xl">
                  Sell Your
                </span>
                <span className="block text-display-md md:text-display-xl lg:text-display-2xl">
                  House
                </span>
                <span className="block text-display-sm md:text-display-lg lg:text-display-xl text-swiss-accent">
                  For Cash
                </span>
              </h1>

              <p className="text-lg md:text-xl font-medium mb-8 max-w-md">
                <span className="font-bold">48-Hour Offers.</span>{' '}
                <span className="text-gray-600">No Repairs. No Fees. No Hassle.</span>
              </p>

              {/* Service Areas */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="text-gray-500 uppercase tracking-wide text-xs">Serving:</span>
                <div className="flex flex-wrap gap-3">
                  {['Orange County', 'Los Angeles', 'Inland Empire'].map((area) => (
                    <span
                      key={area}
                      className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide"
                    >
                      <span className="w-2 h-2 bg-black" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Geometric Accents */}
              <div className="hidden lg:flex items-center gap-4 mt-12">
                <div className="w-12 h-12 bg-swiss-accent" />
                <div className="w-12 h-12 rounded-full border-4 border-black" />
                <div className="w-24 h-1 bg-black" />
              </div>
            </div>

            {/* Right: Lead Form */}
            <div className="lg:col-span-5">
              <div className="bg-white border-4 border-black p-6 md:p-8">
                <h2 className="font-black text-lg uppercase tracking-tight mb-2">
                  Get Your Cash Offer
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  No obligation. Response within 48 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="address"
                    placeholder="Property Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <Button type="submit" variant="secondary" fullWidth size="lg">
                    Get My Cash Offer
                  </Button>
                </form>

                <p className="mt-4 text-xs text-gray-500 text-center">
                  Your information is secure and never shared.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
