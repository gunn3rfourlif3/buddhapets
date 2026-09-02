/**
 * Launch content for the marketing and catalogue pages.
 *
 * This is the catalogue AS DESIGNED — names, copy and prices written to build
 * and price the site against. Once WooCommerce is live, `lib/woo.ts` supplies
 * real products and this file keeps only the editorial content (collections,
 * journal, promises).
 *
 * Anything in [brackets] is a deliberate placeholder awaiting a real fact.
 * Never invent reviews, dates, addresses or customer names.
 */

export type Tile = "lemon" | "sky" | "mint" | "rose" | "lavender" | "peach";

/** Which illustration a product uses. One drawing per product. */
export type ArtKey =
  | "bed"
  | "cave-bed"
  | "mat-set"
  | "mat"
  | "slow-feeder"
  | "scratcher"
  | "starter-kit"
  | "fountain"
  | "bowl-set"
  | "chews"
  | "vest"
  | "lick-mat"
  | "heartbeat"
  | "stuffable-chew";

/** The slot a product fills in a ritual — drives the Ritual Builder. */
export type RitualRole = "comfort" | "enrichment" | "finishing";

export type CollectionSlug = "calm-comfort" | "slow-living" | "zen-home" | "together";

export type Product = {
  slug: string;
  name: string;
  /** Price in USD. Strings so the designed catalogue reads exactly as displayed. */
  price: number;
  blurb: string;
  /** Longer copy for the product page. */
  description: string;
  collection: CollectionSlug;
  role: RitualRole;
  art: ArtKey;
  tile: Tile;
  badge?: string;
  featured?: boolean;
  /** Honest delivery window, shown before checkout. See the launch plan. */
  delivery: string;
};

export const collections: {
  slug: CollectionSlug;
  name: string;
  blurb: string;
  intro: string;
  tile: Tile;
  badge?: string;
}[] = [
  {
    slug: "calm-comfort",
    name: "Calm & Comfort",
    blurb: "Donut beds · calming vests",
    intro:
      "Deep-pressure beds, soft dens and wearable calm. The physical environment does a surprising amount of the work — an anxious body settles faster when it has somewhere that feels enclosed and safe.",
    tile: "lemon",
  },
  {
    slug: "slow-living",
    name: "Slow Living",
    blurb: "Snuffle mats · slow feeders",
    intro:
      "Mindful eating for busy noses. Foraging and licking both lower arousal, which is why stretching a meal from ninety seconds to twenty minutes changes a pet's whole evening.",
    tile: "mint",
    badge: "Popular",
  },
  {
    slug: "zen-home",
    name: "Zen Home",
    blurb: "Fountains · calm spaces",
    intro:
      "Pieces that calm the room, not just the pet. Moving water, quiet materials and shapes you won't mind looking at every day.",
    tile: "sky",
  },
  {
    slug: "together",
    name: "Together",
    blurb: "Owner + pet ritual sets",
    intro:
      "Calm is shared. These are made to be used at the same time — your wind-down and theirs, in the same room, on the same schedule.",
    tile: "rose",
  },
];

export const products: Product[] = [
  // --- Calm & Comfort ---
  {
    slug: "cloud-nine-donut-bed",
    name: "Cloud Nine Donut Bed",
    price: 49,
    blurb: "Deep-pressure comfort for thunder-night sleepers.",
    description:
      "A raised rim to rest a chin on and a sunken middle that holds a curled body — the shape does the reassuring. Machine washable, because the good beds are the ones that get used.",
    collection: "calm-comfort",
    role: "comfort",
    art: "bed",
    tile: "lavender",
    badge: "Bestseller",
    featured: true,
    delivery: "3–7 business days · ships from the US",
  },
  {
    slug: "quiet-hours-cave-bed",
    name: "Quiet Hours Cave Bed",
    price: 55,
    blurb: "An enclosed den for pets who like to disappear.",
    description:
      "A hooded bed for the ones who take themselves under the duvet. The canopy cuts light and softens sound, which matters more than most people expect during fireworks season.",
    collection: "calm-comfort",
    role: "comfort",
    art: "cave-bed",
    tile: "sky",
    delivery: "3–7 business days · ships from the US",
  },
  {
    slug: "steady-hold-calming-vest",
    name: "Steady Hold Calming Vest",
    price: 39,
    blurb: "Gentle constant pressure, like a long hug.",
    description:
      "Adjustable wrap that applies light, even pressure across the chest and flank. Put it on before the trigger, not during — it works best as part of a routine.",
    collection: "calm-comfort",
    role: "finishing",
    art: "vest",
    tile: "rose",
    delivery: "5–10 business days · ships from the EU",
  },

  {
    slug: "second-heartbeat-plush",
    name: "Second Heartbeat Plush",
    price: 34,
    blurb: "A pulse to sleep against, for the ones who miss their litter.",
    description:
      "A soft companion with a gentle battery-powered pulse and a warmable insert. Puppies and newly adopted pets settle faster with something that breathes beside them — it is the closest a first night alone gets to not being alone.",
    collection: "calm-comfort",
    role: "comfort",
    art: "heartbeat",
    tile: "peach",
    delivery: "3–7 business days · ships from the US",
  },

  // --- Slow Living ---
  {
    slug: "forage-and-flow-snuffle-mat",
    name: "Forage & Flow Snuffle Mat",
    price: 29,
    blurb: "Turns dinner into a calming 20-minute treasure hunt.",
    description:
      "Dense fabric fronds hide kibble so a meal becomes nose work. The single cheapest change most people can make to an anxious dog's day, and the effect usually shows inside a week.",
    collection: "slow-living",
    role: "enrichment",
    art: "mat",
    tile: "lemon",
    featured: true,
    delivery: "3–7 business days · ships from the US",
  },
  {
    slug: "still-water-lick-mat",
    name: "Still Water Lick Mat",
    price: 19,
    blurb: "Licking lowers arousal — this makes it last.",
    description:
      "A textured mat for wet food, yoghurt or peanut butter. Repetitive licking is genuinely self-soothing, which makes this the easiest last task before bed.",
    collection: "slow-living",
    role: "finishing",
    art: "lick-mat",
    tile: "mint",
    delivery: "3–7 business days · ships from the US",
  },
  {
    slug: "meander-slow-feeder-bowl",
    name: "Meander Slow Feeder Bowl",
    price: 24,
    blurb: "For the ones who inhale dinner.",
    description:
      "A maze-bottomed bowl that stretches a ninety-second meal into something closer to ten minutes. Gulping is arousal, not greed — slowing it down settles the mood as well as the stomach.",
    collection: "slow-living",
    role: "enrichment",
    art: "slow-feeder",
    tile: "peach",
    delivery: "3–7 business days · ships from the US",
  },

  {
    slug: "long-hours-stuffable-chew",
    name: "Long Hours Stuffable Chew",
    price: 22,
    blurb: "Stuff it, freeze it, hand it over as you leave.",
    description:
      "A hollow natural-rubber chew that holds wet food, yoghurt or peanut butter. Frozen, it turns the first anxious twenty minutes of being alone into a long, absorbing job — which is exactly the window that matters.",
    collection: "slow-living",
    role: "enrichment",
    art: "stuffable-chew",
    tile: "sky",
    delivery: "3–7 business days · ships from the US",
  },

  // --- Zen Home ---
  {
    slug: "lotus-whisper-fountain",
    name: "Lotus Whisper Fountain",
    price: 59,
    blurb: "A trickling water garden that keeps cats hydrated.",
    description:
      "Ceramic, near-silent, and filtered. Moving water encourages steady drinking, and in cats hydration and calm track together more closely than people expect.",
    collection: "zen-home",
    role: "comfort",
    art: "fountain",
    tile: "mint",
    featured: true,
    delivery: "5–10 business days · ships from the EU",
  },
  {
    slug: "stoneware-calm-bowl-set",
    name: "Stoneware Calm Bowl Set",
    price: 44,
    blurb: "Weighted ceramic that doesn't skid or clatter.",
    description:
      "A heavy base means no chasing the bowl across the kitchen — less noise, less frustration, a quieter mealtime for everyone.",
    collection: "zen-home",
    role: "finishing",
    art: "bowl-set",
    tile: "sky",
    delivery: "5–10 business days · ships from the EU",
  },
  {
    slug: "enso-garden-scratcher",
    name: "Enso Garden Scratcher",
    price: 46,
    blurb: "A scratching post you won't want to hide.",
    description:
      "Recycled cardboard in a raked-sand pattern, on a solid base. Cats need to scratch; this gives them somewhere better than the sofa arm and looks like an object you chose.",
    collection: "zen-home",
    role: "enrichment",
    art: "scratcher",
    tile: "peach",
    delivery: "3–7 business days · ships from the US",
  },

  // --- Together ---
  {
    slug: "zenchews-calming-treats",
    name: "ZenChews Calming Treats",
    price: 24,
    blurb: "Hemp & L-theanine chews for storms, travel & vet days.",
    description:
      "Vet-approved natural ingredients, no sedatives. Give around forty minutes before the thing you're preparing for — they support a calm state rather than forcing one.",
    collection: "together",
    role: "finishing",
    art: "chews",
    tile: "rose",
    badge: "Bestseller",
    featured: true,
    delivery: "3–7 business days · ships from the US",
  },
  {
    slug: "shared-calm-mat-set",
    name: "Shared Calm Mat Set",
    price: 68,
    blurb: "A meditation mat for you, a matching one for them.",
    description:
      "Two mats in the same weave — one human-sized, one pet-sized. The point is proximity: a pet settles faster beside a person who has also stopped moving.",
    collection: "together",
    role: "comfort",
    art: "mat-set",
    tile: "lavender",
    delivery: "5–10 business days · ships from the EU",
  },
  {
    slug: "evening-ritual-starter-kit",
    name: "Evening Ritual Starter Kit",
    price: 52,
    blurb: "Lick mat, chews and a printed seven-night guide.",
    description:
      "Everything the first week of a wind-down needs, in one box. Built for people who'd rather be told what to do on night one than assemble it themselves.",
    collection: "together",
    role: "enrichment",
    art: "starter-kit",
    tile: "peach",
    delivery: "3–7 business days · ships from the US",
  },
];

/* -------------------------------------------------------------------------- */
/* Lookups                                                                     */
/* -------------------------------------------------------------------------- */

export const featuredProducts = products.filter((p) => p.featured);

export function productBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function collectionBySlug(slug: string) {
  return collections.find((c) => c.slug === slug) ?? null;
}

export function productsInCollection(slug: CollectionSlug) {
  return products.filter((p) => p.collection === slug);
}

export function productsForRole(role: RitualRole) {
  return products.filter((p) => p.role === role);
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

/** The Ritual Builder's discount. One place, so the copy can't drift from the maths. */
export const BUNDLE_DISCOUNT = 0.15;

export const promises = [
  "Sensory comfort essentials",
  "Cognitive enrichment toys",
  "Vet-approved, natural ingredients",
  "60-Day Happy Pet Guarantee",
  "Fast US & EU shipping",
  "Rituals for pets & their people",
];

export const faqs = [
  {
    q: "How fast is shipping?",
    a: "Most orders ship from US or EU warehouses and arrive in 3–7 business days. Every product page shows an honest delivery estimate before you buy.",
  },
  {
    q: "How does the 60-Day Happy Pet Guarantee work?",
    a: "Try anything for sixty days. If your pet doesn't settle, tell us and we'll make it right — a replacement, a different ritual, or your money back.",
  },
  {
    q: "Are ZenChews safe for every dog?",
    a: "They use vet-approved, natural ingredients like hemp and L-theanine. Check with your vet first for puppies, pregnant dogs, or any pet on medication.",
  },
  {
    q: "What is a personalized Zen Plan?",
    a: "It's the result of the Calm Quiz: a named ritual matched to your pet's stress signals, with the two or three products that support it — not a generic list.",
  },
];


/**
 * The full FAQ, grouped. The four entries in `faqs` above are the ones shown
 * on the home page; this is everything, for /faq.
 *
 * Anything in [brackets] needs a real policy decision before launch.
 */
export const faqGroups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Orders & delivery",
    items: [
      {
        q: "How fast is shipping?",
        a: "Most orders ship from US or EU warehouses and arrive in 3–7 business days. A few pieces ship from further afield and take 5–10. Every product page shows its own estimate before you buy — we would rather tell you up front than apologise later.",
      },
      {
        q: "Do you ship internationally?",
        a: "Yes. Delivery windows and any customs charges vary by country; the estimate on each product page assumes a standard destination. [Confirm which countries you will ship to before launch.]",
      },
      {
        q: "Can I track my order?",
        a: "You'll get a tracking link by email as soon as your parcel leaves the warehouse. If tracking hasn't updated in a few days, that's usually normal in transit — but tell us and we'll chase it.",
      },
      {
        q: "My order arrived in separate parcels — is that right?",
        a: "Probably, yes. Items ship from the warehouse closest to stock, so a ritual set can arrive over a few days. Each parcel gets its own tracking link.",
      },
    ],
  },
  {
    title: "The guarantee & returns",
    items: [
      {
        q: "How does the 60-Day Happy Pet Guarantee work?",
        a: "Try anything for sixty days. If your pet doesn't settle, email us and we'll make it right — a replacement, a different ritual, or your money back. You don't need to photograph a chewed bed to prove it.",
      },
      {
        q: "What if something arrives damaged?",
        a: "Send us a photo and we'll replace it. No return needed for damaged goods — posting a broken item back helps nobody.",
      },
      {
        q: "Can I return something my pet simply didn't like?",
        a: "That is exactly what the guarantee is for. Pets are individuals and no product suits every one of them.",
      },
    ],
  },
  {
    title: "Products & suitability",
    items: [
      {
        q: "Are ZenChews safe for every dog?",
        a: "They use vet-approved, natural ingredients like hemp and L-theanine, with no sedatives. Check with your vet first for puppies, pregnant dogs, or any pet on medication — that's not boilerplate, there are real interactions worth knowing about.",
      },
      {
        q: "Will a calming product fix my dog's anxiety?",
        a: "On its own, usually not. What shifts things is a routine repeated consistently, with the right product supporting it. That's why every order points you at a ritual rather than just a box.",
      },
      {
        q: "How do I choose a size?",
        a: "Each product page lists dimensions. For beds, measure your pet nose-to-tail while they're stretched out and add roughly 15cm — most people buy a size too small.",
      },
    ],
  },
  {
    title: "The Calm Quiz",
    items: [
      {
        q: "What is a personalized Zen Plan?",
        a: "It's the result of the Calm Quiz: a named ritual matched to your pet's stress signals, with the two or three products that support it. Not a generic list.",
      },
      {
        q: "Do I have to give my email to see my result?",
        a: "No. There's a skip option, and the plan shows either way. We ask because having it in your inbox is genuinely more useful on the night you need it.",
      },
      {
        q: "Is my Ritual Diary stored on your servers?",
        a: "No. Everything you log — notes, ticks, photos — stays in your own browser on your own device. Nothing is uploaded.",
      },
    ],
  },
  {
    title: "Payment & account",
    items: [
      {
        q: "How can I pay?",
        a: "Card payments through Paystack and Payfast, both of which handle the card details directly — we never see or store them.",
      },
      {
        q: "What currency are prices in?",
        a: "Prices are shown in US dollars. Your bank converts at their rate, and may add a foreign transaction fee.",
      },
    ],
  },
];

export const journal = [
  {
    slug: "five-evening-rituals-for-anxious-dogs",
    category: "Rituals",
    title: "5 evening rituals for anxious dogs",
    excerpt: "Small, repeatable practices that tell a worried body it's safe to switch off.",
    date: "[Publish date]",
    tile: "lavender" as Tile,
  },
  {
    slug: "why-slow-feeding-calms-fast-eaters",
    category: "Feeding",
    title: "Why slow feeding calms fast eaters",
    excerpt: "The gulp-and-pace cycle, and how snuffle mats break it in a week.",
    date: "[Publish date]",
    tile: "mint" as Tile,
  },
  {
    slug: "l-theanine-explained",
    category: "Ingredients",
    title: "L-theanine, explained for pet parents",
    excerpt: "What the research actually says about the calm-without-drowsiness amino acid.",
    date: "[Publish date]",
    tile: "peach" as Tile,
  },
];

/** Placeholder review slots — replace only with genuine customer reviews. */
export const reviewSlots = [
  { tile: "lemon" as Tile },
  { tile: "sky" as Tile },
  { tile: "mint" as Tile },
  { tile: "rose" as Tile },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const tileClass: Record<Tile, string> = {
  lemon: "bg-tile-lemon text-tile-lemon-ink",
  sky: "bg-tile-sky text-tile-sky-ink",
  mint: "bg-tile-mint text-tile-mint-ink",
  rose: "bg-tile-rose text-tile-rose-ink",
  lavender: "bg-tile-lavender text-tile-lavender-ink",
  peach: "bg-tile-peach text-tile-peach-ink",
};
