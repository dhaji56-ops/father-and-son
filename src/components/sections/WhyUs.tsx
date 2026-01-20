import { Container } from '../layout/Container';
import { SectionLabel } from '../ui/SectionLabel';

export function WhyUs() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-swiss-muted pattern-dots">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: Image/Logo placeholder */}
          <div className="lg:col-span-5">
            <div className="border-4 border-black bg-white aspect-square flex items-center justify-center p-12">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-swiss-accent" />
                <span className="font-black text-2xl md:text-3xl uppercase tracking-tighter block">
                  Father
                  <span className="text-swiss-accent"> & </span>
                  Son
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-600 block mt-2">
                  Home Buyers
                </span>
                <span className="text-xs tracking-wide text-gray-500 block mt-4">
                  Est. 2015
                </span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7">
            <SectionLabel number="05" text="About Us" className="mb-6" />

            <h2 className="font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter leading-tight mb-6">
              Family-Owned.
              <span className="block text-swiss-accent">Local Experts.</span>
            </h2>

            <div className="space-y-4 text-gray-600 mb-8">
              <p>
                We're not a faceless corporation or a tech startup. Father & Son Home Buyers is a
                family business built on trust, transparency, and treating every homeowner like family.
              </p>
              <p>
                Since 2015, we've helped hundreds of Southern California homeowners sell their properties
                quickly and hassle-free. Whether you're facing foreclosure, dealing with an inherited
                property, or simply need to sell fast—we're here to help.
              </p>
            </div>

            {/* Testimonial */}
            <div className="border-l-4 border-swiss-accent pl-6 py-2">
              <blockquote className="text-lg font-medium mb-4">
                "Sold my parents' home in just 2 weeks after they passed. The team was
                compassionate, professional, and made everything so easy during a difficult time."
              </blockquote>
              <cite className="text-sm font-bold uppercase tracking-wide not-italic">
                — Maria R., Anaheim
              </cite>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
