import { Container } from './Container';

export function Header() {
  return (
    <header className="border-b-4 border-black bg-white">
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-swiss-accent" />
            <span className="font-black text-sm md:text-base uppercase tracking-tight">
              Father & Son
              <span className="block text-xs font-bold tracking-wider">
                Home Buyers
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#how-it-works">How It Works</NavLink>
            <NavLink href="#why-us">Why Us</NavLink>
            <NavLink href="#areas">Service Areas</NavLink>
          </nav>

          {/* CTA */}
          <a
            href="#contact"
            className="
              bg-black text-white
              px-4 py-2 md:px-6 md:py-3
              text-xs md:text-sm font-bold uppercase tracking-wide
              hover:bg-swiss-accent
              transition-colors duration-200
            "
          >
            Get Offer
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
        relative text-sm font-bold uppercase tracking-wide
        text-black hover:text-swiss-accent
        transition-colors duration-200
      "
    >
      {children}
    </a>
  );
}
