#!/bin/bash
# Seed the designed BuddhaPets catalogue into WooCommerce.
#
# These are the 12 products from apps/web/lib/content.ts — the catalogue the
# site was designed and priced against. They are PLACEHOLDERS: real SKUs,
# supplier images and true costs come from CJdropshipping later. Seeding them
# now means the storefront has something real to read over the REST API.
#
# Run from ~/buddhapets/infra after WooCommerce is installed:
#   bash seed-catalogue.sh
#
# Safe to re-run: it skips any product whose slug already exists.

set -euo pipefail
cd "$(dirname "$0")"

wp() { docker compose run --rm -T wpcli "$@"; }

echo "→ Checking WooCommerce is active…"
wp plugin is-active woocommerce >/dev/null || {
  echo "WooCommerce is not active. Run the plugin install step first." >&2
  exit 1
}

# --- Categories (the four collections) ---------------------------------------
declare -A CAT_ID

seed_cat() {
  local slug="$1" name="$2" id
  id=$(wp term list product_cat --slug="$slug" --field=term_id 2>/dev/null | tr -d '\r' | head -1)
  if [ -z "$id" ]; then
    id=$(wp term create product_cat "$name" --slug="$slug" --porcelain | tr -d '\r')
    echo "  created category $name (#$id)"
  else
    echo "  category $name exists (#$id)"
  fi
  CAT_ID["$slug"]="$id"
}

echo "→ Categories"
seed_cat calm-comfort "Calm & Comfort"
seed_cat slow-living  "Slow Living"
seed_cat zen-home     "Zen Home"
seed_cat together     "Together"

# --- Products ----------------------------------------------------------------
echo "→ Products"

while IFS='|' read -r slug name price cat short long; do
  [ -z "${slug:-}" ] && continue

  existing=$(wp post list --post_type=product --name="$slug" --field=ID 2>/dev/null | tr -d '\r' | head -1)
  if [ -n "$existing" ]; then
    echo "  skip $name (already exists, #$existing)"
    continue
  fi

  id=$(wp wc product create \
        --name="$name" \
        --slug="$slug" \
        --type=simple \
        --regular_price="$price" \
        --short_description="$short" \
        --description="$long" \
        --categories="[{\"id\":${CAT_ID[$cat]}}]" \
        --manage_stock=false \
        --status=publish \
        --user=1 \
        --porcelain | tr -d '\r')

  echo "  created $name (#$id) \$$price"
done <<'ROWS'
cloud-nine-donut-bed|Cloud Nine Donut Bed|49|calm-comfort|Deep-pressure comfort for thunder-night sleepers.|A raised rim to rest a chin on and a sunken middle that holds a curled body — the shape does the reassuring. Machine washable, because the good beds are the ones that get used.
quiet-hours-cave-bed|Quiet Hours Cave Bed|55|calm-comfort|An enclosed den for pets who like to disappear.|A hooded bed for the ones who take themselves under the duvet. The canopy cuts light and softens sound, which matters more than most people expect during fireworks season.
steady-hold-calming-vest|Steady Hold Calming Vest|39|calm-comfort|Gentle constant pressure, like a long hug.|Adjustable wrap that applies light, even pressure across the chest and flank. Put it on before the trigger, not during — it works best as part of a routine.
forage-and-flow-snuffle-mat|Forage & Flow Snuffle Mat|29|slow-living|Turns dinner into a calming 20-minute treasure hunt.|Dense fabric fronds hide kibble so a meal becomes nose work. The single cheapest change most people can make to an anxious dog's day, and the effect usually shows inside a week.
still-water-lick-mat|Still Water Lick Mat|19|slow-living|Licking lowers arousal — this makes it last.|A textured mat for wet food, yoghurt or peanut butter. Repetitive licking is genuinely self-soothing, which makes this the easiest last task before bed.
meander-slow-feeder-bowl|Meander Slow Feeder Bowl|24|slow-living|For the ones who inhale dinner.|A maze-bottomed bowl that stretches a ninety-second meal into something closer to ten minutes. Gulping is arousal, not greed — slowing it down settles the mood as well as the stomach.
lotus-whisper-fountain|Lotus Whisper Fountain|59|zen-home|A trickling water garden that keeps cats hydrated.|Ceramic, near-silent, and filtered. Moving water encourages steady drinking, and in cats hydration and calm track together more closely than people expect.
stoneware-calm-bowl-set|Stoneware Calm Bowl Set|44|zen-home|Weighted ceramic that doesn't skid or clatter.|A heavy base means no chasing the bowl across the kitchen — less noise, less frustration, a quieter mealtime for everyone.
enso-garden-scratcher|Enso Garden Scratcher|46|zen-home|A scratching post you won't want to hide.|Recycled cardboard in a raked-sand pattern, on a solid base. Cats need to scratch; this gives them somewhere better than the sofa arm and looks like an object you chose.
zenchews-calming-treats|ZenChews Calming Treats|24|together|Hemp & L-theanine chews for storms, travel & vet days.|Vet-approved natural ingredients, no sedatives. Give around forty minutes before the thing you're preparing for — they support a calm state rather than forcing one.
shared-calm-mat-set|Shared Calm Mat Set|68|together|A meditation mat for you, a matching one for them.|Two mats in the same weave — one human-sized, one pet-sized. The point is proximity: a pet settles faster beside a person who has also stopped moving.
evening-ritual-starter-kit|Evening Ritual Starter Kit|52|together|Lick mat, chews and a printed seven-night guide.|Everything the first week of a wind-down needs, in one box. Built for people who'd rather be told what to do on night one than assemble it themselves.
ROWS

echo
echo "Done. Product count:"
wp post list --post_type=product --format=count
