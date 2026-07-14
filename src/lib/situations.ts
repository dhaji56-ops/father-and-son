/**
 * Situation landing pages — highest-intent, lowest-competition.
 *
 * Each entry drives a /situations/<slug> conversion page. These are the
 * "why are you selling" topics (foreclosure, probate, divorce, etc.) that
 * previously only existed as blog posts. Blog posts educate; these pages
 * convert — the copy here is written for a seller ready to act, not a reader
 * researching. Source material is reused from blog-posts.ts, but the copy is
 * original and landing-page-appropriate, never duplicated blog text.
 *
 * Cross-linking is data-driven: each situation declares the county hubs, city
 * pages, and in-depth blog post it relates to, and the page renders those as
 * internal links. The prerender script and sitemap derive their route lists
 * from the `slug` values here, so this file is the single source of truth.
 */

export interface SituationFaq {
  question: string;
  answer: string;
}

export interface SituationPainPoint {
  /** Short headline for the pain-point card. */
  title: string;
  /** One or two sentences naming the problem the seller feels. */
  body: string;
}

export interface Situation {
  /** URL slug under /situations/<slug>. */
  slug: string;
  /** Short label used in cards, breadcrumbs, and cross-links: "Foreclosure". */
  name: string;
  /** Card blurb for the "situations we help with" grids (home + county hubs). */
  cardBlurb: string;
  /** Unique page H1. */
  h1: string;
  /** Region label shown above the H1. */
  eyebrow: string;
  /** <=60-char SEO <title>. */
  metaTitle: string;
  /** <=155-char meta description. */
  metaDescription: string;
  /** Hero sub-paragraph. */
  intro: string;
  /** The problems this seller is living with (rendered as cards). */
  painPoints: SituationPainPoint[];
  /** "How we help" — conversion body copy paragraphs (not a blog rehash). */
  howWeHelp: string[];
  /** Short label for the how-we-help section heading, e.g. "foreclosure". */
  howWeHelpLead: string;
  /** Page FAQ — also emitted as FAQPage schema. */
  faqs: SituationFaq[];
  /** In-depth blog post that goes deeper on this topic (optional). */
  relatedBlogSlug?: string;
  /** City pages most relevant to this situation. */
  relatedCitySlugs: string[];
  /** County/region hub slugs relevant to this situation. */
  relatedCountySlugs: string[];
}

export const situations: Situation[] = [
  {
    slug: 'foreclosure',
    name: 'Foreclosure',
    cardBlurb: 'Behind on payments or facing a Notice of Default — sell before the auction and protect your equity.',
    h1: 'Facing Foreclosure? Sell Your House Before the Auction',
    eyebrow: 'Stop Foreclosure',
    metaTitle: 'Sell Your House Fast to Stop Foreclosure | Father & Son',
    metaDescription:
      'Facing foreclosure in Southern California? Sell for cash before the auction, protect your equity, and avoid the hit to your credit. Fair offer in 24 hours.',
    intro:
      "If you've received a Notice of Default or you're falling behind on your mortgage, you still have time and options. We buy homes for cash before the trustee's sale — so you can settle the loan, protect the equity you've built, and avoid a foreclosure on your record.",
    howWeHelpLead: 'a pre-foreclosure sale',
    painPoints: [
      {
        title: 'The clock is already running',
        body: "Once a Notice of Default is filed, California's timeline moves fast — a reinstatement window, then a Notice of Trustee's Sale, then auction. Waiting rarely makes it easier.",
      },
      {
        title: 'A listing takes too long',
        body: 'A traditional sale can take 30 to 60 days to close, if it closes at all. When the auction date is weeks away, that gamble is one most homeowners can’t afford.',
      },
      {
        title: 'You could lose your equity',
        body: 'If the home goes to auction, any equity you’ve built can be wiped out by fees and a below-market sale price. Selling first is how you keep what’s yours.',
      },
    ],
    howWeHelp: [
      "The single most important thing to know about foreclosure is that selling before the trustee's sale almost always beats letting it happen. A foreclosure can stay on your credit for seven years and often wipes out the equity you've spent years building. A cash sale ahead of the auction settles the loan, puts the remaining equity in your pocket, and keeps a foreclosure off your record entirely.",
      "Because we buy with our own funds, we can move on your timeline instead of a lender's. There's no appraisal, no financing contingency, and no 45-day mortgage approval that might collapse in the final week — the exact failure that sinks so many pre-foreclosure listings. We present a fair, no-obligation offer within 24 hours and can close in as little as 14 days, which is often enough to beat a sale date that felt impossible.",
      "We'll also coordinate directly with your lender or their trustee to get an accurate payoff figure and make sure the numbers work before you commit to anything. If you have more than one loan, back taxes, or liens against the property, we're used to sorting that out at closing so you don't have to chase it down yourself.",
      "You never make a repair, clear out the house, or pay a commission. We buy the home exactly as it sits, cover the closing costs, and if you qualify, we can even advance you cash before closing to cover a deposit on your next place or the cost of the move. The goal is simple: get you out from under the mortgage with your dignity and as much of your equity as possible intact.",
    ],
    faqs: [
      {
        question: 'Can I still sell my house after a Notice of Default?',
        answer:
          "Yes. You can sell right up until the trustee's sale takes place. In fact, selling during the reinstatement or pre-sale window is one of the best ways to protect your equity and avoid a foreclosure on your credit. The sooner you act, the more room we have to close before the auction date.",
      },
      {
        question: 'Will selling to you stop the foreclosure?',
        answer:
          'Selling the home pays off the defaulted loan, which resolves the foreclosure. Once we close and the mortgage is paid in full, the lender has nothing left to foreclose on. We coordinate the payoff directly with your lender so the timing lines up before your sale date.',
      },
      {
        question: 'What if I owe more than the house is worth?',
        answer:
          "Even then you may have options, including a short sale where the lender agrees to accept less than the full balance. We've worked through underwater situations before and can talk you through whether a short sale or a standard cash sale makes more sense for your numbers.",
      },
      {
        question: 'How fast can you close before my auction date?',
        answer:
          'We can present an offer within 24 hours and close in as little as 14 days. If your sale date is close, tell us up front and we’ll tell you honestly whether we can beat it — we won’t string you along when the timeline is too tight.',
      },
    ],
    relatedBlogSlug: 'foreclosure-options-california',
    relatedCitySlugs: ['santa-ana', 'anaheim', 'long-beach', 'riverside', 'san-bernardino'],
    relatedCountySlugs: ['orange-county', 'los-angeles-county', 'inland-empire'],
  },
  {
    slug: 'inherited-probate',
    name: 'Inherited & Probate',
    cardBlurb: 'Inherited a house or settling an estate — sell as-is, buy out co-heirs, and skip months of repairs.',
    h1: 'Sell an Inherited or Probate House Without the Headache',
    eyebrow: 'Inherited Property',
    metaTitle: 'Sell an Inherited or Probate House for Cash | Father & Son',
    metaDescription:
      'Inherited a house in Southern California? Sell it as-is for cash, settle the estate, and buy out co-heirs — no repairs, no cleanout, no drawn-out listing.',
    intro:
      "Inheriting a home is often equal parts gift and burden — decades of belongings, deferred maintenance, co-heirs to agree with, and probate paperwork, all while you're grieving. We buy inherited and probate homes as-is for cash, so you can settle the estate and move forward.",
    howWeHelpLead: 'selling an inherited home',
    painPoints: [
      {
        title: 'The home needs work you can’t manage',
        body: 'Inherited homes often carry decades of deferred maintenance — an old roof, dated systems, a full house of belongings. Getting it market-ready can cost months and thousands you’d rather not spend.',
      },
      {
        title: 'Co-heirs need to agree',
        body: 'When siblings or relatives share the property, everyone has to align on price and timing. A clean cash sale gives all parties one clear number to say yes to.',
      },
      {
        title: 'You live out of the area',
        body: 'Managing repairs, showings, and a months-long listing from another city or state is exhausting. Many heirs simply want a fair, final sale without the travel.',
      },
    ],
    howWeHelp: [
      "Selling an inherited home is rarely just a transaction — there's history in the walls and often more than one person with a say. We move with patience and transparency, and when multiple heirs are involved we work with everyone to reach a number and a timeline the whole family can agree on. There's no pressure and no obligation to accept.",
      "We buy the home exactly as it sits, which for inherited properties is usually the biggest relief. You don't clear out the belongings, empty the garage, make a single repair, or stage anything. Take what's meaningful to you and leave the rest — we handle the cleanout and everything after closing. That alone saves most families weeks of exhausting work.",
      "Timing works around probate, not against it. In California, a home held without a trust often has to pass through probate before it can be sold, a process that can run several months. We understand where in that process your estate sits, can present an offer while it's still underway, and are ready to close as soon as the court clears the sale. Selling soon after inheriting is frequently very tax-efficient, too, thanks to the step-up in cost basis — though you'll want your own tax advisor to confirm your situation.",
      "For heirs who live out of the area, we handle nearly everything remotely and coordinate a clean closing so you're not making repeated trips. No commissions, no closing costs, and a fair cash offer within 24 hours — with the option of a cash advance before closing if the estate has bills that can't wait.",
    ],
    faqs: [
      {
        question: 'Can you buy a house that’s still in probate?',
        answer:
          "Yes. We regularly buy homes at various stages of the California probate process. We can make an offer while probate is underway and close once the court authorizes the sale. We're familiar with how the timeline works and will shape the closing around it.",
      },
      {
        question: 'What if there are several heirs who share the property?',
        answer:
          'That’s common, and we’re used to it. We work with all parties to agree on a fair price and a closing date everyone is comfortable with. A single cash offer gives co-heirs one clear number to evaluate, which often makes agreement much easier than a traditional listing would.',
      },
      {
        question: 'Do I have to clean out the house first?',
        answer:
          "No. Take whatever is meaningful to you and leave the rest exactly where it is. We buy the property fully as-is, including any belongings left behind, and handle the cleanout ourselves after closing. You never lift a box or schedule a junk haul.",
      },
      {
        question: 'Will I owe a lot in taxes if I sell?',
        answer:
          'Often less than people expect, because inherited property in California typically receives a step-up in cost basis to its value at the time of the original owner’s passing. That can make selling soon after inheriting quite tax-efficient. We’re not tax advisors, so confirm the specifics with yours — but it’s rarely the obstacle sellers fear.',
      },
    ],
    relatedBlogSlug: 'sell-inherited-property-california',
    relatedCitySlugs: ['santa-ana', 'fullerton', 'orange', 'long-beach', 'riverside'],
    relatedCountySlugs: ['orange-county', 'los-angeles-county', 'inland-empire'],
  },
  {
    slug: 'divorce',
    name: 'Divorce',
    cardBlurb: 'Dividing the house in a divorce — get one fair number, a fast neutral sale, and a clean split.',
    h1: 'Selling the House in a Divorce — Fast, Fair, and Neutral',
    eyebrow: 'Divorce',
    metaTitle: 'Sell Your House Fast During a Divorce | Father & Son',
    metaDescription:
      'Dividing a home in a divorce? Get one fair cash offer, a fast neutral sale, and a clean split — no repairs, no agents, no drawn-out listing to argue over.',
    intro:
      "When a marriage ends, the house is often the one asset nobody wants to keep maintaining and everybody wants resolved. We offer a fast, neutral cash sale that turns the property into a clear, divisible number — so both parties can close this chapter and move on.",
    howWeHelpLead: 'a divorce sale',
    painPoints: [
      {
        title: 'Nobody wants a months-long listing',
        body: 'Staging, showings, and negotiating repairs are the last thing either party wants to coordinate during a divorce. A drawn-out sale keeps you tied together far longer than you’d like.',
      },
      {
        title: 'You need a clean, divisible number',
        body: 'Splitting a house is hard when the final proceeds are a moving target. A firm cash offer gives both attorneys one fixed figure to work from.',
      },
      {
        title: 'Speed and neutrality matter',
        body: 'The faster the house sells, the sooner both people can move forward. A neutral third-party buyer removes one more thing to disagree about.',
      },
    ],
    howWeHelp: [
      "In a divorce, the family home is usually the largest shared asset and the hardest one to divide, because its value only becomes real once it sells. We remove that uncertainty. A firm cash offer converts the house into a single, agreed-upon number that both parties and their attorneys can plan around — no waiting to see what a buyer might eventually pay.",
      "Speed is often the kindest thing here. A traditional listing can keep two people financially and emotionally entangled for months, coordinating showings, agreeing on repairs, and splitting ongoing costs the whole time. We close in as little as 14 days on the date you choose, which lets both parties separate their finances and genuinely move on rather than staying tied to a house neither of them wants.",
      "We stay neutral by design. We work with both spouses, both attorneys, or a court-appointed party as needed, and we're glad to have proceeds handled through escrow and divided exactly as your agreement or the court directs. Our job is simply to be the fair, fixed price on the other side of the sale — not to take a side.",
      "And because we buy as-is, the condition of the home never becomes another argument. No repairs, no cleanout, no commissions, no staging for strangers to walk through. One fair offer within 24 hours, a clean close, and a straightforward split of the proceeds.",
    ],
    faqs: [
      {
        question: 'Can you work with both spouses and our attorneys?',
        answer:
          'Yes. We regularly coordinate with both parties and their attorneys, and we’re comfortable working with court-appointed representatives when a sale is ordered. Proceeds can run through escrow and be divided exactly as your settlement or the court specifies.',
      },
      {
        question: 'How does a cash sale make dividing the house easier?',
        answer:
          'A firm cash offer turns an uncertain future sale price into one fixed, agreed number. That gives both parties and their attorneys a concrete figure to divide, instead of waiting weeks or months to learn what the home ultimately sells for on the open market.',
      },
      {
        question: 'How quickly can we close and be done with it?',
        answer:
          'We can present an offer within 24 hours and close in as little as 14 days, on whatever date works for both parties. A fast close is often exactly what a divorce needs — it lets both people separate their finances and move forward without staying tied to the house.',
      },
      {
        question: 'Do we need to fix up or clean the house first?',
        answer:
          'No. We buy the home exactly as it is, so its condition never becomes one more thing to argue about. No repairs, no staging, no cleanout, and no agent commissions eating into the proceeds you’re trying to divide fairly.',
      },
    ],
    relatedBlogSlug: 'sell-house-during-divorce-orange-county',
    relatedCitySlugs: ['irvine', 'costa-mesa', 'huntington-beach', 'torrance', 'corona'],
    relatedCountySlugs: ['orange-county', 'los-angeles-county', 'inland-empire'],
  },
  {
    slug: 'as-is-repairs',
    name: 'As-Is / Major Repairs',
    cardBlurb: 'A home that needs a new roof, foundation, or full renovation — sell it as-is and skip every repair.',
    h1: 'Sell Your House As-Is — No Repairs, No Renovations',
    eyebrow: 'As-Is Sale',
    metaTitle: 'Sell Your House As-Is for Cash | Father & Son',
    metaDescription:
      'Need a new roof, foundation work, or a full renovation? Sell your house as-is for cash in Southern California — we buy in any condition, fees covered.',
    intro:
      "If your home needs more work than you can afford or want to take on, you don't have to fix a thing. We buy houses in any condition — old roofs, foundation issues, fire or water damage, half-finished projects — for cash, exactly as they sit.",
    howWeHelpLead: 'an as-is sale',
    painPoints: [
      {
        title: 'Repairs cost more than you have',
        body: 'A new roof, foundation work, or updated electrical can run tens of thousands — money you’d rather not sink into a house you’re about to sell.',
      },
      {
        title: 'Agents want it fixed first',
        body: 'A traditional listing usually means pre-sale repairs, inspections, and repair credits negotiated after the fact. That’s months of work before you ever see an offer.',
      },
      {
        title: 'Buyers keep falling through',
        body: 'Financed buyers often can’t close on a home with major issues — the lender’s appraisal flags them and the deal collapses. Cash removes that risk entirely.',
      },
    ],
    howWeHelp: [
      "The whole point of selling to us is that the condition of your home simply stops being your problem. Cracked slab, failing roof, outdated wiring, mold, fire or water damage, a renovation someone started and never finished — we've bought all of it. You don't get estimates, pull permits, or fix a single thing. We factor the work into a fair offer and take the house exactly as it stands.",
      "That's a real advantage over the open market, where homes needing major work are the hardest to sell. Financed buyers usually can't close on them because the lender's appraisal flags the issues, so those listings sit, collect price cuts, and fall out of escrow again and again. We buy with our own cash — no appraisal, no financing contingency — so none of that applies.",
      "You also skip the entire pre-sale gauntlet. No staging, no open houses, no repair credits negotiated after an inspection, no weekend spent making the place presentable. We handle the property as-is and cover the closing costs, so the number we agree on is what you actually walk away with.",
      "This is often the fastest path there is for a distressed home. We present a fair cash offer within 24 hours and close in as little as 14 days, on your schedule. Whether the house is simply dated or genuinely falling apart, we'll give you an honest number and a clean, certain close.",
    ],
    faqs: [
      {
        question: 'What condition of house will you actually buy?',
        answer:
          'Effectively any condition. We buy homes with old roofs, foundation and slab problems, outdated or unpermitted work, fire and water damage, mold, and long-deferred maintenance. If you’re wondering whether yours is "too far gone," it almost certainly isn’t — tell us about it and we’ll make an offer.',
      },
      {
        question: 'Do I need to make any repairs or clean up before selling?',
        answer:
          'None at all. That’s the core of an as-is sale. You don’t repair, renovate, or even clean. Take what you want and leave the rest; we handle the property and any cleanout after closing.',
      },
      {
        question: 'Why sell as-is instead of listing and offering a repair credit?',
        answer:
          'Homes needing major work are the hardest to sell on the open market — financed buyers often can’t get them past a lender’s appraisal, so listings stall and fall through. A cash sale skips repairs, credits, and financing risk entirely, giving you a firm number and a certain close.',
      },
      {
        question: 'Will I get a fair price for a home that needs a lot of work?',
        answer:
          'Yes — a fair one that reflects the home’s real condition and saves you the cost, time, and stress of the repairs. Because we’re a local buyer pricing from real knowledge of the market, our first number tends to be our real number, without a last-minute renegotiation after inspection.',
      },
    ],
    relatedBlogSlug: 'sell-house-as-is-southern-california',
    relatedCitySlugs: ['anaheim', 'garden-grove', 'compton', 'san-bernardino', 'ontario'],
    relatedCountySlugs: ['orange-county', 'los-angeles-county', 'inland-empire'],
  },
  {
    slug: 'code-violations',
    name: 'Code Violations',
    cardBlurb: 'Open permits, unpermitted work, or city citations — sell as-is and let the fines and liens stop.',
    h1: 'Sell a House With Code Violations or Unpermitted Work',
    eyebrow: 'Code Violations',
    metaTitle: 'Sell a House With Code Violations for Cash | Father & Son',
    metaDescription:
      'Facing code violations, open permits, or unpermitted work? Sell your house as-is for cash — stop the fines and skip the costly fixes and inspections.',
    intro:
      "Code violations, open or expired permits, and unpermitted additions can turn a normal sale into a nightmare of citations, accruing fines, and buyers who walk away. We buy homes with code issues as-is for cash — so the citations and the fines stop being yours to solve.",
    howWeHelpLead: 'a home with code violations',
    painPoints: [
      {
        title: 'The fines keep adding up',
        body: 'Many code violations carry daily or monthly penalties that grow the longer they go unresolved — and can eventually become a lien against the property.',
      },
      {
        title: 'Fixing it means permits and inspections',
        body: 'Bringing unpermitted work up to code often means opening walls, re-permitting, and multiple inspections — expensive, slow, and no guarantee of passing.',
      },
      {
        title: 'Retail buyers get scared off',
        body: 'Disclosed violations and open permits routinely kill traditional deals. Financed buyers and their lenders often refuse to touch a home with unresolved code issues.',
      },
    ],
    howWeHelp: [
      "Code problems are one of the situations where a cash buyer genuinely saves you money, not just time. Unpermitted additions, open or expired permits, work that was never inspected, health-and-safety citations — these often carry fines that accrue by the day or month and can harden into a lien on the property. Selling the home transfers the issue to us and stops the meter running against you.",
      "Correcting violations yourself is usually the expensive path. Bringing unpermitted work up to code can mean opening finished walls, re-permitting old work, and passing several rounds of inspection, with no guarantee the city signs off the first time. We take the home as-is, factor the open issues into a fair offer, and deal with the corrections and the municipality ourselves after closing.",
      "This is also where traditional sales fall apart most often. Once violations are disclosed — and in California they must be — financed buyers and their lenders frequently back out, so those listings stall and re-list. Because we buy with cash and intend to resolve the issues as the new owner, none of that stops us. We're not scared off by a thick file at the building department.",
      "You get the same clean process we offer every seller: a fair cash offer within 24 hours, no repairs, no permit-chasing, no commissions, and closing costs covered. We'll talk through exactly what's outstanding on your property and give you an honest number that reflects it, so you can hand off the whole headache and be done.",
    ],
    faqs: [
      {
        question: 'Can you buy a house with open or unpermitted work?',
        answer:
          "Yes. Unpermitted additions, expired or open permits, and work that was never inspected are exactly the kinds of issues we take on. We buy the home as-is and handle the corrections and the city ourselves after closing, so you're not the one opening walls or chasing sign-offs.",
      },
      {
        question: 'What happens to the fines and citations when I sell?',
        answer:
          'Any accruing fines stop being your problem once we close and take ownership. We factor known violations into our offer and resolve them as the new owner. Outstanding amounts and any liens are typically sorted out at closing through escrow so nothing follows you afterward.',
      },
      {
        question: 'Do I have to disclose the violations to you?',
        answer:
          'Please do — it actually helps. The more we know about what’s outstanding at the building department, the more accurate and firm our offer can be. We’re not scared off by code issues; we just want to price them correctly so there are no surprises on either side.',
      },
      {
        question: 'Why not just fix the violations and sell normally?',
        answer:
          'You can, but it’s often slow and costly — permits, inspections, and contractor work with no guarantee the city approves it quickly. Meanwhile fines may keep accruing and many buyers won’t wait. Selling as-is for cash lets you skip all of that and hand the issues to us.',
      },
    ],
    relatedBlogSlug: 'selling-home-with-code-violations-california',
    relatedCitySlugs: ['santa-ana', 'anaheim', 'compton', 'san-bernardino', 'riverside'],
    relatedCountySlugs: ['orange-county', 'los-angeles-county', 'inland-empire'],
  },
  {
    slug: 'tired-landlord',
    name: 'Tired Landlord',
    cardBlurb: 'Done being a landlord — sell with tenants in place, skip the turnover, and walk away for good.',
    h1: 'Tired of Being a Landlord? Sell Your Rental As-Is',
    eyebrow: 'Tired Landlord',
    metaTitle: 'Sell Your Rental Property Fast for Cash | Father & Son',
    metaDescription:
      'Done with problem tenants and repairs? Sell your Southern California rental as-is for cash — tenants in place, no turnover. Fair offer in 24 hours.',
    intro:
      "Difficult tenants, endless repairs, rent that barely covers the costs, and California's tightening rules — at some point the rental stops being worth it. We buy tenant-occupied and vacant rentals as-is for cash, so you can exit the landlord business for good.",
    howWeHelpLead: 'selling a rental',
    painPoints: [
      {
        title: 'Problem tenants and turnover',
        body: 'Late rent, evictions, and make-ready costs between tenants eat into every dollar the property was supposed to earn — and your time along with it.',
      },
      {
        title: 'Deferred maintenance is piling up',
        body: 'Older rentals often carry years of deferred repairs. Fixing everything to list retail can cost more than a season’s rent.',
      },
      {
        title: 'You don’t want to empty it first',
        body: 'Waiting for a lease to end or a tenant to leave before you can sell keeps you stuck. We can buy with tenants still in place.',
      },
    ],
    howWeHelp: [
      "There usually comes a point where the math and the stress no longer add up — the rent barely clears the costs, the repairs never stop, and California's rules keep tilting further toward the tenant. If you've decided you're done, we make the exit clean. We buy rental properties as-is for cash, in any condition, and you never have to fix, paint, or turn the unit to sell it.",
      "You don't have to empty the property first, either. We can buy with tenants in place and take on the lease and the tenant relationship ourselves, so you're not forced to wait out a term, coordinate a move-out, or pursue an eviction just to get to a sale. If the unit is already vacant, that's fine too — we're glad to take it either way.",
      "The deferred maintenance that makes a tired rental so hard to list retail is exactly what we absorb. Old systems, worn interiors, damage from a rough tenancy — we price it into a fair offer and handle it after closing. No make-ready, no staging, no agent commissions skimming the proceeds you've earned over the years of holding it.",
      "It's the fast, certain exit most landlords are really after: a fair cash offer within 24 hours, a closing date you choose, and no showings or open houses disrupting your tenants along the way. One clean sale and you're out of the landlord business — for good.",
    ],
    faqs: [
      {
        question: 'Can you buy my rental with tenants still living in it?',
        answer:
          "Yes. We buy tenant-occupied properties regularly and can take over the existing lease and tenant relationship at closing. You don't have to wait for a lease to end, coordinate a move-out, or pursue an eviction before you sell — we handle it from there.",
      },
      {
        question: 'Do I need to fix up the unit or make it rent-ready?',
        answer:
          'No. We buy rentals fully as-is, including years of deferred maintenance and any wear from a difficult tenancy. There’s no make-ready, no paint-and-carpet turn, and no staging. We factor the condition into a fair offer and handle the work ourselves after closing.',
      },
      {
        question: 'Will selling disrupt my current tenants?',
        answer:
          'Very little. Because we buy with cash and don’t need traditional showings or open houses, there’s minimal disruption to the people living there. In most cases the tenancy simply continues under new ownership after we close.',
      },
      {
        question: 'How fast can I be out of the landlord business?',
        answer:
          'Quickly. We present a fair cash offer within 24 hours and can close in as little as 14 days, on the date you choose. One clean sale and you’re done — no more repairs, rent collection, or late-night maintenance calls.',
      },
    ],
    relatedCitySlugs: ['anaheim', 'santa-ana', 'long-beach', 'riverside', 'ontario'],
    relatedCountySlugs: ['orange-county', 'los-angeles-county', 'inland-empire'],
  },
  {
    slug: 'relocation',
    name: 'Relocation',
    cardBlurb: 'Moving for a job or family on a deadline — sell fast for cash and close on the date you need.',
    h1: 'Relocating? Sell Your House Fast on Your Timeline',
    eyebrow: 'Relocation',
    metaTitle: 'Sell Your House Fast When Relocating | Father & Son',
    metaDescription:
      'Relocating for a job or family? Sell your Southern California house fast for cash and close on the exact date you need — no repairs, no showings.',
    intro:
      "A new job, a military transfer, or a family move often comes with a deadline the housing market doesn't respect. We buy homes for cash with a closing date you pick — so your house sells on your schedule and doesn't follow you to your next city.",
    howWeHelpLead: 'a relocation sale',
    painPoints: [
      {
        title: 'You have a hard deadline',
        body: 'A start date or transfer window doesn’t wait for a buyer’s financing. A listing that drags on can force you to move before the house sells.',
      },
      {
        title: 'You don’t want to carry two homes',
        body: 'Paying a mortgage here and rent or a new mortgage there is a heavy overlap. Every extra week the old house sits costs you.',
      },
      {
        title: 'Managing a sale from afar is hard',
        body: 'Coordinating repairs, showings, and closing from another city or state is a burden you don’t need on top of a move.',
      },
    ],
    howWeHelp: [
      "Relocations run on deadlines — a start date, a report-by date for a military transfer, the school calendar — and the open market rarely cooperates with any of them. We take the timing risk off the table. You pick the closing date, whether that's two weeks out to beat a start date or a couple of months to line up with your move, and we close then. No waiting on a buyer's mortgage approval that could slip and force you to leave before the house sells.",
      "That certainty is what saves you money. The most expensive part of relocating is often carrying two homes at once — a mortgage here plus rent or a new payment there — and every extra week a listing sits widens that overlap. A firm cash sale on a date you control ends the carrying costs cleanly, so you're not paying for an empty house in a city you no longer live in.",
      "We're built for sellers who can't be here to manage it all. We handle the process with minimal demands on your time, coordinate closing remotely, and don't need you staging the home or hosting weekend open houses while you're trying to pack and plan a move. You don't make repairs or clean the place out beyond what you're taking — we buy it as-is.",
      "The result is a relocation without a house hanging over it: a fair cash offer within 24 hours, no commissions, closing costs covered, and if you need funds before closing for deposits or moving expenses, eligible sellers can get a cash advance. Move forward to what's next without leaving a problem behind you.",
    ],
    faqs: [
      {
        question: 'Can I close on a specific date to match my move?',
        answer:
          'Yes — that’s one of the biggest advantages of selling to us. You choose the closing date. We can close in as little as 14 days to beat a tight start date, or schedule further out to line up with your move. The timeline bends around you, not a buyer’s lender.',
      },
      {
        question: 'Can you handle the sale if I’ve already moved?',
        answer:
          'Absolutely. We work with plenty of sellers who are already in their new city or state. We keep the demands on your time minimal, coordinate closing remotely, and don’t need you present for showings — because there aren’t any. You can finalize the sale from wherever you’ve landed.',
      },
      {
        question: 'How does this help me avoid paying for two homes?',
        answer:
          'A firm cash sale on a date you control ends your carrying costs on the old home cleanly, instead of letting a listing sit for months while you pay a mortgage here and housing costs in your new city. The faster, more certain close is often worth more than squeezing out the last few percent of list price.',
      },
      {
        question: 'Do I need to fix or stage the house before I go?',
        answer:
          'No. We buy the home as-is, so there’s no staging, no repairs, and no cleanout beyond taking what you want with you. That’s one less thing to manage while you’re focused on the move itself.',
      },
    ],
    relatedCitySlugs: ['irvine', 'costa-mesa', 'huntington-beach', 'murrieta', 'temecula'],
    relatedCountySlugs: ['orange-county', 'los-angeles-county', 'inland-empire'],
  },
];

export function getSituationBySlug(slug: string): Situation | undefined {
  return situations.find((s) => s.slug === slug);
}

export const situationSlugs = situations.map((s) => s.slug);
