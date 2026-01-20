import { Container } from './Container';

export function Header() {
  return (
    <header className="border-b border-luxury-fg/10 bg-luxury-bg/80 backdrop-blur-sm sticky top-0 z-30">
      <Container>
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-1 h-12 bg-luxury-accent" />
            <div>
              <span className="font-serif text-xl md:text-2xl tracking-tight block">
                Father <em className="text-luxury-accent">&</em> Son
              </span>
              <span className="text-[10px] uppercase tracking-luxury text-luxury-muted-fg block">
                Home Buyers
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <NavLink href="#how-it-works">Process</NavLink>
            <NavLink href="#why-us">About</NavLink>
            <NavLink href="#areas">Areas</NavLink>
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="btn-luxury-primary px-6 py-3 md:px-8 md:py-4"
          >
            <span className="text-xs uppercase tracking-luxury font-medium">
              Get Offer
            </span>
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
        text-xs uppercase tracking-luxury font-medium
        text-luxury-fg hover:text-luxury-accent
        transition-luxury
      "
    >
      {children}
    </a>
  );
}
