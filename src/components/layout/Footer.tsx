import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-fg text-white">
      <Container size="wide">
        {/* Main Footer Content */}
        <div className="py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-12 bg-luxury-accent" />
                <div>
                  <span className="font-serif text-2xl md:text-3xl tracking-tight block">
                    Father <em className="text-luxury-accent">&</em> Son
                  </span>
                  <span className="text-[10px] uppercase tracking-luxury text-white/60 block">
                    Home Buyers
                  </span>
                </div>
              </div>
              <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-8">
                Family-owned cash home buyers serving Southern California since 2015.
                We buy houses as-is with no fees or commissions.
              </p>
              <a
                href="#contact"
                className="btn-luxury-secondary inline-block px-8 py-4 text-white border-white/30 hover:bg-white hover:text-luxury-fg"
              >
                <span className="text-xs uppercase tracking-luxury font-medium">
                  Get Your Offer
                </span>
              </a>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid grid-cols-2 gap-12">
                {/* Contact Column */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-luxury-wide text-white/40 mb-6">
                    Contact
                  </h3>
                  <div className="space-y-4 text-sm">
                    <p>
                      <a href="tel:+15551234567" className="text-white/80 hover:text-luxury-accent transition-luxury">
                        (555) 123-4567
                      </a>
                    </p>
                    <p>
                      <a href="mailto:info@fathersonhomebuyers.com" className="text-white/80 hover:text-luxury-accent transition-luxury">
                        info@fathersonhomebuyers.com
                      </a>
                    </p>
                    <p className="text-white/60">
                      Mon-Sat 8am-6pm PST
                    </p>
                  </div>
                </div>

                {/* Quick Links Column */}
                <div>
                  <h3 className="text-[10px] uppercase tracking-luxury-wide text-white/40 mb-6">
                    Quick Links
                  </h3>
                  <nav className="space-y-4">
                    <FooterLink href="#how-it-works">How It Works</FooterLink>
                    <FooterLink href="#why-us">About Us</FooterLink>
                    <FooterLink href="#areas">Service Areas</FooterLink>
                    <FooterLink href="#contact">Get Your Offer</FooterLink>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] uppercase tracking-luxury text-white/40">
            &copy; {currentYear} Father & Son Home Buyers. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase tracking-luxury text-white/40 hover:text-luxury-accent transition-luxury">
              Privacy
            </a>
            <a href="#" className="text-[10px] uppercase tracking-luxury text-white/40 hover:text-luxury-accent transition-luxury">
              Terms
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block text-sm text-white/60 hover:text-luxury-accent transition-luxury"
    >
      {children}
    </a>
  );
}
