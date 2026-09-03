#!/usr/bin/env bash
# Re-price the seeded catalogue in rand and put WooCommerce itself into ZAR.
#
# Idempotent: run it as often as you like. It only touches products that already
# exist, so it is safe to run before or after seed-catalogue.sh.
#
#   cd ~/buddhapets/infra && bash reprice-zar.sh
set -euo pipefail

wp() { docker compose run --rm -T wpcli wp "$@" </dev/null; }

echo "Setting store currency to ZAR..."
wp option update woocommerce_currency ZAR
wp option update woocommerce_currency_pos left
wp option update woocommerce_price_thousand_sep ' '
wp option update woocommerce_price_decimal_sep ','
wp option update woocommerce_price_num_decimals 0

echo
echo "Re-pricing products..."
while IFS='|' read -r slug price <&3; do
  [ -z "${slug:-}" ] && continue
  id="$(wp post list --post_type=product --name="$slug" --field=ID --posts_per_page=1 | tr -d '\r')"
  if [ -z "$id" ]; then
    echo "  skip   $slug (not in WooCommerce yet — run seed-catalogue.sh first)"
    continue
  fi
  # _price is the field Woo actually sorts and filters on; _regular_price is the
  # source of truth. Setting only one of them produces a store that shows one
  # number and charges another.
  wp post meta update "$id" _regular_price "$price" >/dev/null
  wp post meta update "$id" _price "$price" >/dev/null
  echo "  R$price  $slug (#$id)"
done 3<<'ROWS'
cloud-nine-donut-bed|799
quiet-hours-cave-bed|899
steady-hold-calming-vest|649
second-heartbeat-plush|549
forage-and-flow-snuffle-mat|479
still-water-lick-mat|299
meander-slow-feeder-bowl|399
long-hours-stuffable-chew|349
lotus-whisper-fountain|949
stoneware-calm-bowl-set|699
enso-garden-scratcher|749
zenchews-calming-treats|399
shared-calm-mat-set|1099
evening-ritual-starter-kit|849
ROWS

echo
echo "Creating the ritual bundle coupon (ignore an 'already exists' error)..."
wp wc shop_coupon create --code=ritual15 --discount_type=percent --amount=15 \
  --description='Ritual Builder bundle discount' --user=1 || true

echo
echo "Flushing caches..."
wp wc update || true
wp cache flush || true

echo
echo "Done. Currency:"
wp option get woocommerce_currency
