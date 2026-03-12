import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/layout';
import { CTASection } from '../components/sections';
import { useSEO } from '../hooks/useSEO';
import { getPostBySlug, blogPosts } from '../lib/blog-posts';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useSEO({
    title: post
      ? `${post.title} | Father & Son Home Buyers`
      : 'Post Not Found | Father & Son Home Buyers',
    description: post?.description ?? 'Post not found.',
    canonical: post ? `https://fathersonhomes.com/blog/${post.slug}` : undefined,
  });

  // Inject Article structured data
  useEffect(() => {
    if (!post) return;
    const id = 'article-schema';
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      author: {
        '@type': 'Organization',
        name: 'Father & Son Home Buyers',
        url: 'https://fathersonhomes.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Father & Son Home Buyers',
        url: 'https://fathersonhomes.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://fathersonhomes.com/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://fathersonhomes.com/blog/${post.slug}`,
      },
    });
    return () => {
      document.getElementById(id)?.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <section className="py-24">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-medium text-espresso mb-4">Post Not Found</h1>
            <p className="text-driftwood mb-8">That article couldn't be found.</p>
            <Link to="/blog" className="btn-terracotta px-8 py-3 rounded-md text-sm font-medium inline-flex items-center gap-2">
              View All Articles
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* Article Hero */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-oatmeal/50 to-linen">
        <Container size="narrow">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-driftwood mb-8">
            <Link to="/blog" className="hover:text-terracotta transition-warm">Blog</Link>
            <span>/</span>
            <span className="text-espresso line-clamp-1">{post.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium tracking-warm text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-driftwood/60">{post.readTime}</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight text-espresso mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-driftwood mb-6">{post.description}</p>
          <p className="text-sm text-driftwood/60">
            Published {post.date} &middot; Father & Son Home Buyers
          </p>
        </Container>
      </section>

      {/* Article Body */}
      <section className="py-12 md:py-16">
        <Container size="narrow">
          <div className="prose-warm">
            {post.sections.map((section, i) => (
              <div key={i} className="mb-8">
                {section.heading && (
                  <h2 className="font-serif text-2xl font-medium text-espresso mb-4 mt-10 first:mt-0">
                    {section.heading}
                  </h2>
                )}
                {section.body.split('\n\n').map((paragraph, j) => (
                  <p key={j} className="text-driftwood leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* CTA Card */}
          <div className="mt-12 p-8 bg-oatmeal/40 rounded-lg border border-espresso/10">
            <h3 className="font-serif text-2xl font-medium text-espresso mb-3">
              Ready to Talk to a Local Cash Buyer?
            </h3>
            <p className="text-driftwood mb-6 text-sm">
              Father & Son Home Buyers serves Orange County, LA County, and the Inland Empire. Get a fair cash offer within 24 hours — no repairs, no fees, no obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="btn-terracotta px-6 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                Get My Cash Offer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="tel:+19495412003"
                className="btn-secondary px-6 py-3 rounded-md text-sm font-medium inline-flex items-center justify-center gap-2"
              >
                Call (949) 541-2003
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* More Articles */}
      {otherPosts.length > 0 && (
        <section className="py-12 md:py-16 bg-oatmeal/20">
          <Container>
            <h2 className="font-serif text-2xl font-medium text-espresso mb-8">More Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherPosts.map((p) => (
                <article key={p.slug} className="card-warm p-8">
                  <span className="text-xs font-medium tracking-warm text-terracotta bg-terracotta/10 px-3 py-1 rounded-full">
                    {p.category}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-espresso mt-4 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-driftwood mb-4 line-clamp-2">{p.description}</p>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="text-sm font-medium text-terracotta hover:underline flex items-center gap-1"
                  >
                    Read article
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTASection />
    </>
  );
}
