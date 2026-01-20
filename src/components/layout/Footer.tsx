import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-linen">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-10 bg-terracotta rounded-full" />
                <div>
                  <span className="font-serif text-2xl font-medium tracking-tight block">
                    Father <em className="text-terracotta">&</em> Son
                  </span>
                  <span className="text-xs font-medium tracking-warm text-linen/60 block">
                    Home Buyers
                  </span>
                </div>
              </div>
              <p className="text-sm text-linen/70 leading-relaxed max-w-sm mb-8">
                Family-owned cash home buyers serving Southern California since 2015.
                We buy houses as-is with no fees or commissions.
              </p>
              <a
                href="#contact"
                className="btn-secondary inline-block px-6 py-3 text-linen border-linen/30 hover:bg-linen/10 hover:border-linen/50 rounded-md text-sm font-medium"
              >
                Get Your Offer
              </a>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="grid grid-cols-2 gap-10">
                {/* Contact Column */}
                <div>
                  <h3 className="text-sm font-medium tracking-warm text-linen/50 mb-5">
                    Contact
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p>
                      <a href="tel:+15551234567" className="text-linen/80 hover:text-terracotta transition-warm">
                        (555) 123-4567
                      </a>
                    </p>
                    <p>
                      <a href="mailto:info@fathersonhomebuyers.com" className="text-linen/80 hover:text-terracotta transition-warm">
                        info@fathersonhomebuyers.com
                      </a>
                    </p>
                    <p className="text-linen/60">
                      Mon-Sat 8am-6pm PST
                    </p>
                  </div>
                </div>

                {/* Quick Links Column */}
                <div>
                  <h3 className="text-sm font-medium tracking-warm text-linen/50 mb-5">
                    Quick Links
                  </h3>
                  <nav className="space-y-3">
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
        <div className="py-6 border-t border-linen/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-linen/40">
            &copy; {currentYear} Father & Son Home Buyers. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-linen/40 hover:text-terracotta transition-warm">
              Privacy
            </a>
            <a href="#" className="text-xs text-linen/40 hover:text-terracotta transition-warm">
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
      className="block text-sm text-linen/70 hover:text-terracotta transition-warm"
    >
      {children}
    </a>
  );
}
