import { useState } from 'react';
import { Container } from '../layout/Container';

// Luxury Southern California home - Mediterranean style, Orange County vibe - Unsplash
const HERO_IMAGE = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80';

export function Hero() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { address, phone });
  };

  return (
    <section className="py-20 md:py-32 lg:py-40 relative overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          {/* Left: Typography & Form */}
          <div className="lg:col-span-5 lg:col-start-1">
            {/* Decorative Line + Label */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px w-8 md:w-12 bg-luxury-fg" />
              <span className="text-[10px] uppercase tracking-luxury-wide text-luxury-muted-fg">
                Cash Home Buyers
              </span>
            </div>

            {/* Main Headline - Mixed Italic */}
            <h1 className="font-serif leading-[0.9] mb-8">
              <span className="block text-5xl md:text-6xl lg:text-7xl">
                Sell Your
              </span>
              <span className="block text-6xl md:text-7xl lg:text-8xl">
                Home
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl">
                for <em className="text-luxury-accent">Cash</em>
              </span>
            </h1>

            {/* Subhead */}
            <p className="text-lg md:text-xl text-luxury-muted-fg mb-12 max-w-md leading-relaxed">
              <span className="text-luxury-fg font-medium">48-hour offers.</span>{' '}
              No repairs. No fees. No hassle. Serving Southern California families since 2015.
            </p>

            {/* Inline Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
              <div>
                <input
                  name="address"
                  placeholder="Property address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="input-luxury w-full text-base"
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
                  className="input-luxury w-full text-base"
                />
              </div>
              <button type="submit" className="btn-luxury-primary w-full h-14 mt-4">
                <span className="text-xs uppercase tracking-luxury font-medium">
                  Get My Cash Offer
                </span>
              </button>
            </form>

            <p className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg">
              No obligation. Your information is secure.
            </p>
          </div>

          {/* Right: Hero Image with Editorial Treatment */}
          <div className="lg:col-span-6 lg:col-start-7 relative group">
            {/* Vertical Label */}
            <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 z-10">
              <span className="vertical-text text-[10px] uppercase tracking-luxury-wide text-luxury-muted-fg">
                Orange County, CA
              </span>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden shadow-luxury-lg">
              <img
                src={HERO_IMAGE}
                alt="Luxury home in Orange County, California"
                className="img-editorial w-full h-full object-cover group-hover:scale-105"
              />
              {/* Inner border overlay */}
              <div className="absolute inset-0 shadow-luxury-inset pointer-events-none" />
            </div>

            {/* Stats below image */}
            <div className="flex justify-between mt-8 pt-8 border-t border-luxury-fg/10">
              <div>
                <span className="font-serif text-4xl md:text-5xl block">500+</span>
                <span className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg">
                  Homes Purchased
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5xl block">48hr</span>
                <span className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg">
                  Fast Offers
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl md:text-5xl block">$0</span>
                <span className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg">
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
