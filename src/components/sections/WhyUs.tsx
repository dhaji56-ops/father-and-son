import { Container } from '../layout/Container';

// Father and son in professional/business context - Unsplash
// Two generations working together in real estate
const FATHER_SON_IMAGE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80';

// Alternative: Southern California family business vibe
const ALT_IMAGE = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80';

export function WhyUs() {
  return (
    <section id="why-us" className="py-20 md:py-32 border-t border-luxury-fg/10">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left: Image */}
          <div className="lg:col-span-5 relative group">
            {/* Vertical Label */}
            <div className="hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 z-10">
              <span className="vertical-text text-[10px] uppercase tracking-luxury-wide text-luxury-muted-fg">
                Est. 2015 / Family Owned
              </span>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[3/4] overflow-hidden shadow-luxury-lg">
              <img
                src={FATHER_SON_IMAGE}
                alt="Father and son - the team behind Father & Son Home Buyers"
                className="img-editorial w-full h-full object-cover object-top group-hover:scale-105"
              />
              {/* Inner border overlay */}
              <div className="absolute inset-0 shadow-luxury-inset pointer-events-none" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-8 md:w-12 bg-luxury-fg" />
              <span className="text-[10px] uppercase tracking-luxury-wide text-luxury-muted-fg">
                About Us
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.9] mb-8">
              Family-Owned.
              <span className="block"><em className="text-luxury-accent">Local</em> Experts.</span>
            </h2>

            <div className="space-y-6 text-luxury-muted-fg leading-relaxed mb-12">
              <p className="drop-cap">
                We're not a faceless corporation or a tech startup. Father & Son Home Buyers is a
                family business built on trust, transparency, and treating every homeowner like family.
              </p>
              <p>
                Since 2015, we've helped hundreds of Southern California homeowners sell their properties
                quickly and hassle-free. Whether you're facing foreclosure, dealing with an inherited
                property, going through divorce, or simply need to sell fast—we're here to help with
                compassion and professionalism.
              </p>
            </div>

            {/* Testimonial */}
            <div className="border-l border-luxury-accent pl-8 py-4 transition-luxury hover:pl-10 hover:border-l-2">
              <blockquote className="font-serif text-xl md:text-2xl leading-snug mb-6 text-luxury-fg">
                "Sold my parents' home in just 2 weeks after they passed. The team was
                compassionate, professional, and made everything so easy during a difficult time."
              </blockquote>
              <cite className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg not-italic block">
                Maria R. — Anaheim, CA
              </cite>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
