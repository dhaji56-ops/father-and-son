/**
 * Real, verifiable trust data. Single source of truth shared by the visible
 * testimonials UI and the JSON-LD schema so the two can never drift apart.
 *
 * RULE: nothing in this file is invented. Every name, quote, rating, and count
 * reflects a real Google review the owners provided. Do not add placeholder or
 * fabricated entries — thin-but-real beats padded-but-fake for E-E-A-T (and for
 * Google's structured-data policies).
 */

/** The two founders. Used for on-page bios and Person/founder schema. */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  photoAlt: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Ahmad Hajiali',
    role: 'Co-Founder & Head of Construction',
    bio: 'Ahmad brings more than 20 years of hands-on experience in home renovation, contracting, and residential construction. His deep construction knowledge lets our team accurately evaluate each property and understand exactly what it takes to bring a home back to its full potential.',
    photo: '/team-father.jpg',
    photoAlt: 'Ahmad Hajiali, Co-Founder and Head of Construction at Father & Son Home Buyers',
  },
  {
    name: 'Dustin Hajiali',
    role: 'Co-Founder & Head of Acquisitions',
    bio: 'Dustin has been involved in real estate since the age of 17, with experience spanning lending, construction, acquisitions, and dispositions. Over his career he has participated in more than 4,000 real estate transactions, giving him a deep understanding of how to evaluate properties and navigate complex situations.',
    photo: '/team-son.jpg',
    photoAlt: 'Dustin Hajiali, Co-Founder and Head of Acquisitions at Father & Son Home Buyers',
  },
];

/** Real credential/track-record bullets. No licensing claim — DRE is expired. */
export const CREDENTIALS: string[] = [
  'More than 20 years of residential construction and renovation experience',
  'Involvement in more than 4,000 real estate transactions',
  'Experience across lending, acquisitions, dispositions, contracting, construction, and renovation',
  'Local, family-owned and operated',
];

export interface Testimonial {
  name: string;
  city: string;
  situation: string;
  quote: string;
  rating: number;
}

/**
 * Real reviews only. We currently have two 5-star Google reviews; Pam supplied
 * the full written testimonial below. Add more here as real reviews come in.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Pam',
    city: 'Rialto, CA',
    situation: 'Relocation',
    rating: 5,
    quote:
      'Dustin had helped my mother sell her home a few years back so he was my first call when we decided to sell our home and relocate. Dustin and his father were so helpful and transparent. They explained everything in detail for us. They made the process so easy during a stressful time. He even helped us with the relocation and making sure our loan would be approved for our new purchase in Texas. They were awesome to work with. They are a father son duo with integrity and we would definitely recommend them for anyone looking to sell their home that needs work.',
  },
];

/**
 * Aggregate Google rating. EXACT real numbers — 2 reviews, both 5 stars.
 * Only surfaced because it is real and publicly verifiable on the Google
 * Business Profile linked below.
 */
export const GOOGLE_REVIEWS = {
  ratingValue: 5,
  reviewCount: 2,
  profileUrl: 'https://share.google/mYFjndAgX62vZejGs',
};

/**
 * Below this many reviews we do NOT emit aggregateRating/Review JSON-LD.
 * Rationale: Google doesn't render star rich-results from self-hosted
 * LocalBusiness review markup anyway, and a rating built on a tiny sample is a
 * self-serving-review pattern its policies discourage. The visible on-page
 * "on Google" badge still shows the real number — this only gates the schema.
 * Bump the real reviewCount above and this turns back on automatically.
 */
export const MIN_REVIEWS_FOR_RATING_SCHEMA = 5;

export const RATING_SCHEMA_ENABLED =
  GOOGLE_REVIEWS.reviewCount >= MIN_REVIEWS_FOR_RATING_SCHEMA;
