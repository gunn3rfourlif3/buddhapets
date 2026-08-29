/**
 * The photo registry.
 *
 * Every image slot on the site looks itself up here. `null` means "no photo
 * yet" and the brand illustration is drawn instead — so the site always looks
 * finished, and adding real photography is a one-line change per slot.
 *
 * To add a photo:
 *   1. Drop the file into apps/web/public/images/<folder>/ using the exact
 *      filename listed below (see IMAGES.md for the full shot list, with the
 *      dimensions and crop each slot expects).
 *   2. Change that slot's value from null to its path.
 *   3. Write a real `alt` describing what the photo shows — the illustration's
 *      description does not carry over.
 *
 * Product photography is the exception: once WooCommerce is live, product
 * images come from the Woo API (supplier photos synced from CJdropshipping),
 * not from this file. `products` here only covers the pre-launch catalogue.
 */

export type Photo = { src: string; alt: string } | null;

/** Full-bleed hero background. Sits under a violet gradient, so mid-tones work best. */
export const heroPhoto: Photo = null;
// Example once the shoot lands:
// export const heroPhoto: Photo = {
//   src: "/images/lifestyle/hero-owner-and-dog.jpg",
//   alt: "A woman sitting on a rug with a sleeping golden retriever across her lap",
// };

/** Portrait beside the "We offer calm for special pets" copy. */
export const aboutPhoto: Photo = null;

/** Keyed by collection slug (lib/content.ts). */
export const collectionPhotos: Record<string, Photo> = {
  "calm-comfort": null,
  "slow-living": null,
  "zen-home": null,
  together: null,
};

/** Keyed by product slug. Replaced by Woo/CJ imagery once the catalogue is live. */
export const productPhotos: Record<string, Photo> = {
  "cloud-nine-donut-bed": null,
  "forage-and-flow-snuffle-mat": null,
  "lotus-whisper-fountain": null,
  "zenchews-calming-treats": null,
};

/** Keyed by journal post slug. */
export const journalPhotos: Record<string, Photo> = {
  "five-evening-rituals-for-anxious-dogs": null,
  "why-slow-feeding-calms-fast-eaters": null,
  "l-theanine-explained": null,
};

/**
 * Reviewer avatars stay illustrated on purpose: a stock face next to a
 * testimonial reads as a fabricated customer. Use a real photo only when a
 * real reviewer has given you one.
 */
export const reviewAvatars: Photo[] = [null, null, null, null];
