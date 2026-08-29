# Image slots — the shot list

Every image on the site is a **slot**. A slot shows the brand illustration
until a real photo is registered, so the site always looks finished and photos
can land one at a time.

**To fill a slot:** drop the file into `public/images/<folder>/` with the
filename below, then set that slot in `lib/images.ts` from `null` to
`{ src: "...", alt: "..." }`. That's it — sizing, cropping and lazy-loading are
already handled by `components/ui/Figure.tsx`.

Write the `alt` yourself, describing what the photo actually shows. The
illustration's description does not carry over, and "product image" is not alt
text.

---

## Lifestyle

| Slot | File | Size | Notes |
|---|---|---|---|
| `heroPhoto` | `public/images/lifestyle/hero-owner-and-dog.jpg` | 2400 × 1200, landscape | Sits under a dark violet scrim with the headline on the **left third** — choose a frame with the subject right-of-centre and nothing important in the left third. Mid-tones read best; avoid blown highlights. |
| `aboutPhoto` | `public/images/lifestyle/about-calm-pet.jpg` | 1200 × 1060, portrait-ish | Crops to a tall rounded card. A resting pet, close, warm light. A review card overlaps the bottom-right corner — keep that area quiet. |

## Collections — `public/images/collections/`

Square-ish crops, 800 × 640 minimum. Shot on or near the product, not studio-isolated.

| Slot | File |
|---|---|
| `calm-comfort` | `calm-comfort.jpg` |
| `slow-living` | `slow-living.jpg` |
| `zen-home` | `zen-home.jpg` |
| `together` | `together.jpg` |

## Products — `public/images/products/`

**These are temporary.** Once WooCommerce is live, product imagery comes from
the Woo API (supplier photos synced from CJdropshipping) and this folder stops
mattering. Use it only for the pre-launch catalogue.

800 × 800, product centred, generous margin — cards crop to a 4:3 box.

| Slot | File |
|---|---|
| `cloud-nine-donut-bed` | `cloud-nine-donut-bed.jpg` |
| `forage-and-flow-snuffle-mat` | `forage-and-flow-snuffle-mat.jpg` |
| `lotus-whisper-fountain` | `lotus-whisper-fountain.jpg` |
| `zenchews-calming-treats` | `zenchews-calming-treats.jpg` |

## Journal — `public/images/journal/`

1200 × 800 landscape, one per post.

| Slot | File |
|---|---|
| `five-evening-rituals-for-anxious-dogs` | `evening-rituals.jpg` |
| `why-slow-feeding-calms-fast-eaters` | `slow-feeding.jpg` |
| `l-theanine-explained` | `l-theanine.jpg` |

## Reviewer avatars

Deliberately left illustrated. A stock face beside a testimonial reads as a
fabricated customer — use a photo only when a real reviewer supplies one.

---

## Formats and weight

- Prefer `.webp` (or `.avif`) over `.jpg`; Next.js serves modern formats and
  resizes automatically, but a smaller source still helps.
- Keep sources under ~400 KB each. Anything over 1 MB is worth compressing
  before it reaches the repo.
- Photos of **your** products or lifestyle shoots are always safest. If you use
  stock, check the licence covers commercial use, and keep a note of it —
  supplier photos from CJdropshipping are normally fine to use for the products
  you sell, but confirm per supplier.

## The illustrations

`components/ui/illustrations.tsx` holds the fallback artwork: sleeping dog,
sleeping cat, dog-and-cat, the four products, and three journal spots. House
style is soft filled shapes in the brand palette, resting postures, closed
eyes — every animal is calm. Add a new one there and register it in the map at
the bottom of that file.
