# Runbook — WooCommerce on the Contabo VPS

Installs the BuddhaPets commerce engine **alongside the apps already running on
this box**, touching none of them.

`buddhapets.co.za` isn't registered yet, so **phase 1 runs WordPress on
localhost only** — nothing public, no certificate, no vhost. You reach wp-admin
through an SSH tunnel. Phase 2 (at the end) is the two-command switch to the
public domain once you own it.

> ### Read this first — this is a shared production server
>
> `169.58.46.223` (`vmi3453343`, Ubuntu 24.04.4 LTS) already runs three compose
> projects:
>
> | Project | What it is | Config |
> |---|---|---|
> | `deploy` | Dantalan / Locare PMS — Caddy edge proxy, web, api, tenant, landlord, marketing, postgres, redis | `/home/deploy/PMS03/deploy/compose.prod.yml` |
> | `eternalguard` | EternalGuard app, postgres, redis — published on `0.0.0.0:3100` | `/home/deploy/eternalguard/docker-compose.yml` |
> | `zaaka-pi-auction` | Pi auction app, worker, mysql — on `127.0.0.1:3000` | `/home/deploy/zaaka-pi-auction/docker-compose.yml` |
>
> **`deploy-caddy-1` owns ports 80 and 443.** BuddhaPets runs no proxy of its
> own and publishes nothing to the internet.
>
> **Three things never to run on this box:**
>
> ```bash
> docker system prune -a        # deletes images the other three stacks need
> docker compose down           # from the wrong directory, stops someone else's app
> sudo ufw --force enable       # with a 22/80/443-only ruleset, cuts EternalGuard off 3100
> ```
>
> Always `cd ~/buddhapets/infra` first, and check `docker compose ls` shows you
> acting on `buddhapets`.

---

# Phase 1 — install, private

## 1. Pick a free local port

`3000` and `3100` are taken. Check your choice is free:

```bash
sudo ss -tulpn | grep -E ':(8080|8081)\s' || echo "8080 and 8081 are both free"
```

Use `8080` below unless that shows it's occupied — if so, set
`WP_LOCAL_PORT=8081` in the `.env` you're about to write.

## 2. Get the project onto the server

```bash
cd ~
git clone https://github.com/gunn3rfourlif3/buddhapets.git
cd buddhapets/infra
```

Generate the secrets — **generate, don't invent**:

```bash
cat > .env <<EOF
DOMAIN=buddhapets.co.za
SITE_URL=http://localhost:8080
WP_LOCAL_PORT=8080

MARIADB_PASSWORD=$(openssl rand -base64 24)
MARIADB_ROOT_PASSWORD=$(openssl rand -base64 24)
POSTGRES_PASSWORD=$(openssl rand -base64 24)
EOF

chmod 600 .env
cat .env          # put these in your password manager now
```

`SITE_URL` is what WordPress writes into its database as the site address.
It changes in phase 2; everything else stays.

## 3. Start it

```bash
docker compose up -d
docker compose ps
```

Confirm you haven't disturbed anything:

```bash
docker compose ls          # buddhapets + the three existing projects
curl -I http://127.0.0.1:8080     # 200 or 302 — WordPress is up, locally only
```

From the internet it is unreachable, which is the point.

## 4. Install WordPress and WooCommerce

```bash
alias dc-wp='docker compose run --rm wpcli wp'

dc-wp core install \
  --url=http://localhost:8080 \
  --title="BuddhaPets" \
  --admin_user=<your admin username> \
  --admin_password='<A STRONG PASSWORD>' \
  --admin_email=<your admin email> \
  --skip-email
```

```bash
dc-wp plugin install woocommerce --activate
dc-wp plugin install woo-paystack --activate
dc-wp plugin install woocommerce-payfast-gateway --activate

dc-wp plugin update --all
dc-wp core update
```

Store settings — USD pricing settled to a ZAR account, per the launch plan:

```bash
dc-wp option update woocommerce_currency USD
dc-wp option update woocommerce_default_country ZA
dc-wp option update woocommerce_price_num_decimals 2
dc-wp option update woocommerce_calc_taxes no
```

Strip what a headless store doesn't need:

```bash
dc-wp plugin delete akismet hello
dc-wp theme install twentytwentyfour --activate
dc-wp post delete 1 2 3 --force        # sample page, post, privacy draft
dc-wp plugin list
```

## 5. Seed the designed catalogue

Puts the 12 products the site was built against into WooCommerce, so the
storefront has real data to read:

```bash
bash seed-catalogue.sh
```

Safe to re-run — it skips anything that already exists. These are placeholders;
real SKUs and supplier images come from CJdropshipping later.

## 6. Reach wp-admin over an SSH tunnel

From **your Windows machine**, in a PowerShell window you leave open:

```powershell
ssh -L 8080:127.0.0.1:8080 deploy@169.58.46.223
```

Then browse to **http://localhost:8080/wp-admin** and log in with the admin account you created.
Close the SSH session and the site becomes unreachable again — that's correct.

## 7. REST API keys for the storefront

Made in the browser — WooCommerce doesn't expose key creation to WP-CLI, and
the secret is shown exactly once.

1. With the tunnel open: **WooCommerce → Settings → Advanced → REST API → Add key**
2. Description `Next.js storefront`, User `<your admin user>`, Permissions **Read/Write**.
3. Paste into `apps/web/.env.local` on your laptop:

```
WOO_URL=http://localhost:8080
WOO_CONSUMER_KEY=ck_...
WOO_CONSUMER_SECRET=cs_...
```

Test it, with the tunnel still open:

```powershell
curl.exe -u "ck_...:cs_..." http://localhost:8080/wp-json/wc/v3/products
```

You should get the 12 seeded products back. `npm run dev` in `apps/web` will
now read the real catalogue — as long as the tunnel is up.

## 8. Backups

```bash
mkdir -p ~/backups/buddhapets

cat > ~/backup-buddhapets.sh <<'EOF'
#!/bin/bash
set -e
cd ~/buddhapets/infra
STAMP=$(date +%F)
OUT=~/backups/buddhapets
docker compose exec -T mariadb sh -c \
  'exec mysqldump -u root -p"$MARIADB_ROOT_PASSWORD" buddhapets' \
  | gzip > $OUT/db-$STAMP.sql.gz
docker run --rm -v buddhapets_wp_data:/data -v $OUT:/backup alpine \
  tar czf /backup/uploads-$STAMP.tar.gz -C /data wp-content/uploads
find $OUT -type f -mtime +14 -delete
EOF

chmod +x ~/backup-buddhapets.sh
~/backup-buddhapets.sh && ls -lh ~/backups/buddhapets   # prove it before trusting it

crontab -l                                              # check what's already there
(crontab -l 2>/dev/null; echo "17 3 * * * /home/deploy/backup-buddhapets.sh >> /home/deploy/backups/buddhapets/backup.log 2>&1") | crontab -
```

Same disk as the data, so add an off-server copy (Backblaze B2 via `rclone`)
before taking real orders.

---

# Phase 2 — go public (once buddhapets.co.za is registered)

## 1. DNS

| Type | Name | Value |
|---|---|---|
| A | `cms` | `169.58.46.223` |

```bash
dig +short cms.buddhapets.co.za      # must return the VPS IP before continuing
```

## 2. Point WordPress at the real address

```bash
cd ~/buddhapets/infra
sed -i 's|^SITE_URL=.*|SITE_URL=https://cms.buddhapets.co.za|' .env
docker compose up -d                 # recreates with the new SITE_URL

docker compose run --rm wpcli wp search-replace \
  'http://localhost:8080' 'https://cms.buddhapets.co.za' --all-tables --report-changes-only
```

`search-replace` rewrites URLs already stored in post content and options —
without it, seeded products keep pointing at localhost.

## 3. Add the vhost to the existing Caddy

**Back it up first** — a syntax error here takes down Locare and Dantalan too:

```bash
cp /home/deploy/PMS03/deploy/Caddyfile ~/Caddyfile.bak.$(date +%F)
cat ~/buddhapets/infra/caddy-buddhapets.snippet >> /home/deploy/PMS03/deploy/Caddyfile
docker exec deploy-caddy-1 caddy validate --config /etc/caddy/Caddyfile
```

Only if validate passes:

```bash
docker exec deploy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

Reload is graceful — live connections to the other sites aren't dropped. Then:

```bash
curl -I https://cms.buddhapets.co.za      # 200/302, valid certificate
curl -I https://app.locare.co.za          # still fine
curl -I https://app.dantalan.co.za        # still fine
```

To undo: restore the backup Caddyfile and reload.

## 4. Tidy up

Update the API keys' host in `apps/web/.env.local` to the public URL, and
drop the loopback port from `infra/docker-compose.yml` if you no longer want
the tunnel option:

```yaml
    # ports:
    #   - "127.0.0.1:${WP_LOCAL_PORT:-8080}:80"
```

---

## Payment gateways

In wp-admin under **WooCommerce → Settings → Payments**. Leave both in test
mode until a full order completes end to end.

- **Paystack** — test keys, then set the webhook URL it gives you back in
  Paystack's settings. Webhooks need the public URL, so this waits for phase 2.
- **Payfast** — merchant ID, merchant key, passphrase, sandbox mode on.

---

## Day-to-day

Always from `~/buddhapets/infra`:

```bash
docker compose ps
docker compose logs -f wordpress
docker compose restart wordpress
docker compose pull && docker compose up -d
docker compose run --rm wpcli wp plugin update --all
```

To remove only this stack, ever:

```bash
cd ~/buddhapets/infra && docker compose down     # never elsewhere
```

Unused images pile up. The safe cleanup on a shared box is
`docker image prune` (dangling only) — **never** `docker system prune -a`,
which would delete images the other three stacks depend on.
