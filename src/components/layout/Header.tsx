import { Container } from './Container';

export function Header() {
  return (
    <header className="border-b border-espresso/10 bg-linen/90 backdrop-blur-sm sticky top-0 z-30">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-1.5 h-10 bg-terracotta rounded-full" />
            <div>
              <span className="font-serif text-xl font-medium tracking-tight block text-espresso">
                Father <em className="text-terracotta">&</em> Son
              </span>
              <span className="text-xs font-medium tracking-warm text-driftwood block">
                Home Buyers
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <NavLink href="#how-it-works">Process</NavLink>
            <NavLink href="#why-us">About</NavLink>
            <NavLink href="#areas">Areas</NavLink>
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="btn-primary px-5 py-2.5 rounded-md text-sm font-medium"
          >
            Get Your Offer
          </a>
        </div>
      </Container>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="
        text-sm font-medium
        text-espresso hover:text-terracotta
        transition-warm
      "
    >
      {children}
    </a>
  );
}
