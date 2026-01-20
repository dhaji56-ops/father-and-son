import { Container } from './Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-4 border-swiss-accent pattern-grid-dark">
      <Container>
        <div className="py-12 md:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-swiss-accent" />
                <span className="font-black text-sm uppercase tracking-tight">
                  Father & Son
                  <span className="block text-xs font-bold tracking-wider text-gray-400">
                    Home Buyers
                  </span>
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
                Family-owned cash home buyers serving Southern California since 2015.
                We buy houses as-is with no fees or commissions.
              </p>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
                <span className="text-swiss-accent">02.</span> Contact
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">
                  <span className="text-white font-medium">Phone:</span>{' '}
                  <a href="tel:+15551234567" className="hover:text-swiss-accent transition-colors">
                    (555) 123-4567
                  </a>
                </p>
                <p className="text-gray-400">
                  <span className="text-white font-medium">Email:</span>{' '}
                  <a href="mailto:info@fathersonhomebuyers.com" className="hover:text-swiss-accent transition-colors">
                    info@fathersonhomebuyers.com
                  </a>
                </p>
                <p className="text-gray-400">
                  <span className="text-white font-medium">Hours:</span>{' '}
                  Mon-Sat 8am-6pm
                </p>
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4">
                <span className="text-swiss-accent">03.</span> Quick Links
              </h3>
              <nav className="space-y-2">
                <FooterLink href="#how-it-works">How It Works</FooterLink>
                <FooterLink href="#why-us">Why Choose Us</FooterLink>
                <FooterLink href="#areas">Service Areas</FooterLink>
                <FooterLink href="#contact">Get Your Offer</FooterLink>
              </nav>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              &copy; {currentYear} Father & Son Home Buyers. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-gray-500 uppercase tracking-wide hover:text-swiss-accent transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs text-gray-500 uppercase tracking-wide hover:text-swiss-accent transition-colors">
                Terms
              </a>
            </div>
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
      className="
        block text-sm text-gray-400
        hover:text-swiss-accent
        transition-colors duration-200
      "
    >
      {children}
    </a>
  );
}
