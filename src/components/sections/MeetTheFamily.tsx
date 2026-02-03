import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';

export function MeetTheFamily() {
  return (
    <section className="py-16 md:py-24 bg-[#c5d5e4]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium tracking-warm text-espresso/70 bg-white/50 px-3 py-1 rounded-full">
                Meet The Family
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-espresso mb-6">
              A Father & Son You Can Trust
            </h2>
            <p className="text-espresso/80 leading-relaxed mb-6">
              We're not a faceless corporation — we're a local father and son team who've combined decades of real estate and construction experience to help homeowners like you.
            </p>
            <p className="text-espresso/70 leading-relaxed mb-8">
              Watch our video to learn why we do what we do, and why transparency is at the heart of everything we offer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="btn-terracotta px-6 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center"
              >
                Get Your Cash Offer
              </Link>
              <a
                href="tel:+19495412003"
                className="btn-secondary bg-white/80 border-espresso/20 px-6 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (949) 541-2003
              </a>
            </div>
          </div>

          {/* Video Placeholder */}
          <div className="relative">
            <div className="aspect-video rounded-2xl bg-[#a8c0d4] flex items-center justify-center shadow-warm-lg overflow-hidden">
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/40 transition-warm">
                  <svg className="w-10 h-10 text-espresso ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-espresso/70 text-sm">Video coming soon</p>
                <p className="text-espresso/50 text-xs mt-2">"We believe every seller deserves honesty and respect."</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
