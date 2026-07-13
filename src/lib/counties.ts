import { cities, type CityData } from './cities';

/**
 * County / region hub pages ("the missing spine").
 *
 * The site has flat /locations/<city> pages but no mid-level hub that ranks for
 * "we buy houses <county>" and links down to its cities. Each hub here is driven
 * off cities.ts: it declares which `countySlug`s it covers, and the cities that
 * belong to it are derived — never hand-maintained — so the hub can't drift out
 * of sync with the city list.
 *
 * Orange County and Los Angeles County map to a single county each. The Inland
 * Empire is a *region* hub that intentionally covers two counties (Riverside and
 * San Bernardino), matching how buyers actually search that market.
 */
export interface CountyHub {
  /** URL slug under /service-areas/<slug>. */
  slug: string;
  /** Short name used in the H1: "We Buy Houses in <name>". */
  name: string;
  /** Longer form for prose, e.g. "the Inland Empire" or "Orange County". */
  proseName: string;
  /** county `countySlug`s from cities.ts that roll up into this hub. */
  countySlugs: string[];
  metaTitle: string;
  metaDescription: string;
  /** Hero sub-paragraph. */
  intro: string;
  /** Body copy — county-specific paragraphs (targets 500–800 words total). */
  body: string[];
  /** The situations this region's sellers reach out about most. */
  situations: string[];
  /** Region label shown above the H1. */
  regionLabel: string;
}

export const countyHubs: CountyHub[] = [
  {
    slug: 'orange-county',
    name: 'Orange County',
    proseName: 'Orange County',
    regionLabel: 'Orange County, CA',
    countySlugs: ['orange-county'],
    metaTitle: 'We Buy Houses in Orange County, CA | Father & Son',
    metaDescription:
      'Sell your Orange County house fast for cash. No repairs, no fees, no agents. Father & Son Home Buyers makes fair cash offers within 24 hours across OC.',
    intro:
      "Father & Son Home Buyers is a local, family-owned cash buyer working across every corner of Orange County — from the coast to the hills to the older neighborhoods in between. Get a fair cash offer within 24 hours, close on your timeline, and skip repairs, fees, and agents entirely.",
    body: [
      "Orange County is our home base, and it shows in how we buy. We grew up around these neighborhoods, and we've spent years buying houses from Huntington Beach to Anaheim Hills, from the historic streets of Old Towne Orange to the master-planned villages of Irvine. That range matters, because no two OC sales look alike. A 1950s tract home in Garden Grove that's never been updated, a beach-close cottage in Huntington Beach that needs a full renovation, a Floral Park Victorian tangled up in a probate — we've handled all of it, and we buy each one exactly as it sits.",
      "What makes Orange County unique as a market is how much the situation drives the sale, not the ZIP code. Homes here hold their value, so most sellers who call us aren't in trouble — they're simply out of time or out of patience for the traditional process. Job relocations out of Irvine and Costa Mesa. Heirs settling an estate in Santa Ana or Fullerton who live out of state and can't manage a months-long listing. Landlords in Anaheim or Orange finally exiting a rental that's become more headache than income. Divorces that need a clean, fast split of the one asset nobody wants to keep maintaining. In every one of those cases, a cash sale trades a few percentage points of top-dollar list price for certainty, speed, and zero out-of-pocket cost.",
      "Because we buy directly with our own funds, there's no lender, no appraisal, and no financing contingency that can collapse a deal at the last minute. We can present an offer within 24 hours of hearing about your home and close in as little as 14 days — or later, if you need the extra time to move. You never make a repair, clear out the garage, stage a room, or host a single open house. We take the property as-is, cover the closing costs, and handle everything on the back end.",
      "Being local is not a marketing line for us — it changes the offer. We're not a national franchise buying leads and routing your information to whichever investor bids highest. We're a father-and-son team that has walked these streets, knows what a Mesa Verde rancher or an Eastside Costa Mesa bungalow actually trades for, and prices from real knowledge instead of a spreadsheet in another state. That means fewer renegotiations, fewer surprises, and an offer that holds from the first conversation to the closing table.",
      "One thing that sets us apart from other Orange County cash buyers: our cash advance. Once we're under contract on your home, eligible sellers can receive money before the sale is even final — to cover moving trucks, a deposit on the next place, storage, or an urgent bill that won't wait for closing day. Most buyers in this market simply won't do that. We put every term in writing up front, so there are never any surprises.",
      "Below you'll find every Orange County city where we have a dedicated local page. If your city or neighborhood isn't listed, it's very likely we still buy there — the list covers where we work most, not the limits of where we'll go. Reach out and we'll tell you honestly whether we can make you an offer.",
    ],
    situations: [
      'Inherited and probate properties',
      'Landlords exiting the rental market',
      'Divorce or partnership dissolution',
      'Relocation on a tight timeline',
      'Older homes needing major repairs',
      'Sellers who want privacy over open houses',
    ],
  },
  {
    slug: 'los-angeles-county',
    name: 'Los Angeles County',
    proseName: 'Los Angeles County',
    regionLabel: 'Los Angeles County, CA',
    countySlugs: ['los-angeles-county'],
    metaTitle: 'We Buy Houses in Los Angeles County, CA | Father & Son',
    metaDescription:
      'Sell your Los Angeles County house fast for cash. Any condition, any situation. Father & Son Home Buyers makes fair cash offers within 24 hours across LA County.',
    intro:
      "Father & Son Home Buyers buys houses for cash across Los Angeles County — the South Bay, the Gateway Cities, and the communities in between. Fair offer within 24 hours, no repairs, no commissions, and a closing date you choose.",
    body: [
      "Los Angeles County is one of the largest and most varied housing markets in the country, and we buy right across its heart. Long Beach craftsman bungalows and Naples Island properties, mid-century homes in Torrance and Downey, Gateway City family homes in Whittier, Compton, and Carson — the housing stock changes block to block, and we've bought in most of it. Whatever the era, style, or condition of your home, we make a fair cash offer and buy it as-is.",
      "The sellers who reach out to us across LA County tend to share a common thread: they need speed and certainty more than they need the last few thousand dollars of a retail listing. Many are heirs. A huge share of LA County homes were bought decades ago and passed down, and the people inheriting them often live elsewhere, have full lives, and simply can't take on months of repairs, showings, and buyer financing that might fall through. Others are longtime owners whose homes now need a new roof, updated electrical, or foundation work they'd rather not pay for. And plenty are tired landlords ready to walk away from a rental and a difficult tenant situation for good.",
      "For all of them, the math of a cash sale is straightforward. There are no agent commissions — that's 5 to 6 percent that stays with you. There are no closing costs, because we cover them. There are no repair credits or pre-listing fix-ups, because we buy the home exactly as it stands, including code violations, deferred maintenance, and storm or fire damage. The number we agree on is the number you walk away with.",
      "We buy with our own cash, which is what lets us move fast and close cleanly. No lender means no appraisal contingency and no financing fall-through — the two things that most often derail a traditional LA County sale in the final week. We can have an offer to you within 24 hours and close in as little as 14 days, or on a later date if you need time to sort out the next chapter. You do nothing to the property; we take it from there.",
      "Being a local, family-owned buyer matters more in a market this big. We're not a national brand buying leads and auctioning your information to out-of-area investors. We're a father-and-son team that knows the difference between a Belmont Shore address and a home a few miles inland, understands how South Bay and Gateway City values actually move, and makes an offer we can stand behind. That's why our first number tends to be our real number — no bait-and-switch after inspection, no last-week renegotiation.",
      "We also offer something most cash buyers in Los Angeles County don't: a cash advance once you're under contract. If you need funds before closing to cover a move, a deposit, or an urgent bill, eligible sellers can get money in hand ahead of the final sale, with every term written down first. Explore the LA County cities below where we have dedicated local pages — and if yours isn't here yet, call us anyway. There's a good chance we can still help.",
    ],
    situations: [
      'Inherited and probate homes',
      'Out-of-state heirs liquidating property',
      'Tired landlords and problem tenants',
      'Homes with major repair needs',
      'Tax liens or back taxes',
      'Downsizing or relocation',
    ],
  },
  {
    slug: 'inland-empire',
    name: 'the Inland Empire',
    proseName: 'the Inland Empire',
    regionLabel: 'Riverside & San Bernardino Counties, CA',
    countySlugs: ['riverside-county', 'san-bernardino-county'],
    metaTitle: 'We Buy Houses in the Inland Empire, CA | Father & Son',
    metaDescription:
      'Sell your Inland Empire house fast for cash across Riverside and San Bernardino counties. No repairs, no fees. Fair cash offer within 24 hours from Father & Son.',
    intro:
      "Father & Son Home Buyers buys houses for cash throughout the Inland Empire — both Riverside and San Bernardino counties. From aging homes in San Bernardino to newer builds in Eastvale, Corona, and Temecula, we make fair offers with closings that fit your timeline.",
    body: [
      "The Inland Empire spans two counties — Riverside and San Bernardino — and it's one of the fastest-changing housing markets in California. We buy across the whole region, and that breadth is deliberate, because buyers here rarely think in county lines. Someone selling in Corona is weighing the same decision as someone in Rancho Cucamonga a few miles north in a different county. So we treat the IE as one market: Riverside, San Bernardino, Ontario, Corona, Rancho Cucamonga, Murrieta, Temecula, and Eastvale all sit under this hub.",
      "That range spans a lot of house. On one end are the older, established neighborhoods — Riverside's historic Wood Streets Victorians, aging homes in San Bernardino with real deferred maintenance, original-owner estates being settled by heirs. On the other end are the region's newer master-planned communities — big family homes in Eastvale, gated neighborhoods in Rancho Cucamonga, wine-country and suburban builds around Temecula and Murrieta. We buy both ends and everything between, as-is, without asking you to fix a thing.",
      "The reasons people sell here are as varied as the housing. The Inland Empire has a heavy share of newer homeowners who bought at the top of their budget, so we hear from a lot of sellers navigating job changes, financial strain, or a home that needs to sell before the next one can close. There are military relocations near the region's bases around Murrieta and Temecula. There are landlords across San Bernardino and Riverside counties ready to exit rentals. There are estate sales, divorces, HOA delinquencies, and vacant or distressed properties that owners just want off their plate. We approach every one of these without judgment.",
      "Because we're a direct cash buyer, the process is the same no matter which IE city you're in. We present a fair, no-obligation offer within 24 hours, and because there's no lender involved, there's no appraisal and no financing contingency to fall through. You pick the closing date — as fast as 14 days, or further out if you need room to move. There are no agent commissions, no closing costs, and no repairs. The cash offer you accept is exactly what you keep.",
      "Working with a local, family-owned buyer changes the experience here too. The Inland Empire draws a lot of out-of-area investors and national lead-buying brands, and their offers tend to swing after inspection because they never really knew the market to begin with. We're a father-and-son team that buys directly and prices from real knowledge of both counties — what a Wood Streets Victorian needs versus a five-year-old Eastvale build — so the number we start with is the number we intend to close on.",
      "And in a region where a lot of sellers are moving because money is tight, our cash advance matters. Once you're under contract, eligible Inland Empire sellers can receive funds before closing to cover a move, a deposit, or an urgent bill — with all the terms in writing first. Below are the Riverside and San Bernardino county cities where we have dedicated local pages. If yours isn't listed, reach out anyway; across a region this large, there's a strong chance we still buy where you are.",
    ],
    situations: [
      'Sellers who need to sell before buying next',
      'Military relocations',
      'Financial hardship or job loss',
      'Distressed, vacant, or inherited homes',
      'Tax liens and HOA delinquency',
      'Newer homes owners need to exit fast',
    ],
  },
];

export function getHubBySlug(slug: string): CountyHub | undefined {
  return countyHubs.find((h) => h.slug === slug);
}

export const hubSlugs = countyHubs.map((h) => h.slug);

/** All cities that belong to a hub, grouped by their `countySlug` in cities.ts. */
export function getHubCities(hub: CountyHub): CityData[] {
  return cities.filter((c) => hub.countySlugs.includes(c.countySlug));
}

/** The hub a given city rolls up into (used for the city → hub uplink). */
export function getHubForCity(city: CityData): CountyHub | undefined {
  return countyHubs.find((h) => h.countySlugs.includes(city.countySlug));
}
