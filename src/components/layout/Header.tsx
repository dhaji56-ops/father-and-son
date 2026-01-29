import { Container } from './Container';

export function Header() {
  return (
    <header className="border-b border-espresso/10 bg-linen sticky top-0 z-[60]">
      <Container>
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Father & Son Home Buyers"
              className="h-20 w-auto"
            />
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
