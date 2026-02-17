import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export function useSEO({ title, description, canonical }: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta title
    let metaTitle = document.querySelector<HTMLMetaElement>('meta[name="title"]');
    if (metaTitle) {
      metaTitle.setAttribute('content', title);
    }

    // Update Open Graph title
    let ogTitle = document.querySelector<HTMLMetaElement>('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Update Open Graph description
    let ogDescription = document.querySelector<HTMLMetaElement>('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', description);
    }

    // Update OG URL and canonical
    if (canonical) {
      let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
      if (ogUrl) {
        ogUrl.setAttribute('content', canonical);
      }

      let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', canonical);
      }

      // Update Twitter URL
      let twitterUrl = document.querySelector<HTMLMetaElement>('meta[name="twitter:url"]');
      if (twitterUrl) {
        twitterUrl.setAttribute('content', canonical);
      }
    }

    // Update Twitter title
    let twitterTitle = document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', title);
    }

    // Update Twitter description
    let twitterDescription = document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', description);
    }
  }, [title, description, canonical]);
}
