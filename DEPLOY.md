# Deploying Saggi Law Firm to cPanel

Full step-by-step guide to take the site from local dev to running live on
saggilawfirm.com via the cPanel/Jupiter host that currently serves the
WordPress site.

The plan replaces WordPress with the Next.js + Payload CMS build. WordPress
files stay untouched during the deploy — a rollback is one DNS change away
until you cancel the WP install at the very end.

---

## 0. Before you touch cPanel

**Back up WordPress** — even though every post and page has already been
migrated to Payload as drafts, keep a safety net until the new site has been
live and stable for at least a week.

- cPanel → **Softaculous / WP Toolkit** → Backup all files + DB
- Download the backup zip to your machine
- Also export the WordPress content: WP Admin → **Tools → Export → All content**

**Note down the current DNS records** so you can revert:

- Log into your domain registrar
- Screenshot the DNS record table (A, CNAME, MX rows)

---

## 1. Push the latest code to GitHub

The GitHub repo is https://github.com/noumanbilal100/saggi-law-firm.

Make sure your local repo has all the latest work, then:

```bash
git add -A
git commit -m "Ready for production deploy"
git push origin main
```

---

## 2. Create the Node.js app in cPanel

1. In cPanel, open **Setup Node.js App**.
2. Click **Create Application**.
3. Fill in:
   - **Node.js version**: `20.x` (or the newest 22.x if offered)
   - **Application mode**: `Production`
   - **Application root**: `saggilawfirm` (this becomes `/home/USER/saggilawfirm/`)
   - **Application URL**: your domain (`saggilawfirm.com`) — leave the
     subdirectory blank so the app serves the site root
   - **Application startup file**: `node_modules/next/dist/bin/next` — we
     will overwrite this below with a small wrapper
   - **Passenger log file**: leave default
4. Click **Create**.

cPanel provisions a folder at `/home/USER/saggilawfirm/` and shows the
**Node.js Command** cheatsheet ("Enter to the virtual environment"). Keep
that tab open — you'll need the command to activate the Node env in the
terminal.

---

## 3. Pull the repo into the app folder

The easiest path is **cPanel → Git Version Control**:

1. Open **Git Version Control** in cPanel.
2. Click **Create**.
3. Fill in:
   - **Clone URL**: `https://github.com/noumanbilal100/saggi-law-firm.git`
   - **Repository path**: `/home/USER/saggilawfirm/`
   - **Repository Name**: `saggilawfirm`
4. Click **Create**.

The repo files land inside `/home/USER/saggilawfirm/`. When you push new
commits later, come back here and click **Pull or Deploy** to update.

If Git Version Control isn't available, upload the code via the File
Manager or SCP the tarball. Either way, the final folder layout should be:

```
/home/USER/saggilawfirm/
  ├─ src/
  ├─ public/
  ├─ package.json
  ├─ next.config.ts
  └─ …everything else
```

---

## 4. Install dependencies

Back in **Setup Node.js App**, click the pencil icon on the app row →
scroll down → **Run NPM Install**.

Or open **Terminal** in cPanel and paste the "Enter to the virtual
environment" command (that's the one from step 2), then:

```bash
cd $HOME/saggilawfirm
npm install --omit=dev
```

This takes 2–5 minutes. Fine to walk away.

---

## 5. Set environment variables

In **Setup Node.js App** → your app → the **Environment variables** area
below "Detected configuration files", add each row from `.env.example`:

Minimum for the site to run:

| Key                              | Value                                                     |
| -------------------------------- | --------------------------------------------------------- |
| `PAYLOAD_SECRET`                 | 32+ random chars — see `.env.example` for the generator   |
| `DATABASE_URI`                   | `file:./saggi-cms.db`                                     |
| `NEXT_PUBLIC_SERVER_URL`         | `https://saggilawfirm.com`                                |
| `NODE_ENV`                       | `production`                                              |

Recommended for full feature parity:

| Key                                     | Value                                    |
| --------------------------------------- | ---------------------------------------- |
| `RESEND_API_KEY`                        | from https://resend.com                  |
| `RESEND_FROM_EMAIL`                     | `noreply@saggilawfirm.com` once verified |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`  | from Google Search Console               |

Click **Save**.

---

## 6. Ship the database + media

The SQLite DB (`saggi-cms.db`) and the images (`public/media/*`) are NOT
tracked in Git. They need to reach the server another way.

Easiest: from your local machine, use **cPanel File Manager** or an SFTP
client to upload:

- `saggi-cms.db` → `/home/USER/saggilawfirm/saggi-cms.db`
- Every file in `public/media/` → `/home/USER/saggilawfirm/public/media/`

Alternative: zip both locally, upload the zip, and extract on the server
using File Manager's "Extract" action.

---

## 7. Build the app

Back in the app row → click **Run NPM Install** dropdown → **Run Script**
→ pick `build` from the list.

Or in the terminal:

```bash
cd $HOME/saggilawfirm
npm run build
```

Takes 3–8 minutes. Watch for a "Compiled successfully" line at the end. If
you see errors, note the first one and share it — everything after the
first error is noise.

---

## 8. Start the app

In **Setup Node.js App** → your app → click **Restart**. cPanel starts the
Node process and reverse-proxies traffic from your domain to it.

Verify:

- Open `https://saggilawfirm.com` in an incognito window
- The Next.js homepage should load
- Try `/admin` — the Payload login screen should appear
- Log in with the admin user you created locally (same DB, same user)

---

## 9. Point the domain (only if the app isn't already answering)

If `https://saggilawfirm.com` is still showing WordPress, the Apache
config on the domain root is still pointed at the old `public_html` folder.

Two ways to fix:

**A.  Rename `public_html` and let cPanel use the Node app as the root**

1. cPanel → **File Manager** → rename `public_html` to `public_html-wp-backup`
2. cPanel → **Setup Node.js App** → **Restart** the Node app

Now the domain points at the Passenger proxy, which routes to your Node app.

**B.  Delete the WordPress files from `public_html` and drop in a small
    `.htaccess` proxy**

Only pursue this if option A doesn't fit your host's Passenger setup. In
that case share the cPanel error message and we adjust.

---

## 10. SSL certificate

cPanel usually auto-provisions Let's Encrypt for the domain. If you get a
certificate warning:

- cPanel → **SSL/TLS Status** → check the row for `saggilawfirm.com`
- Click **Run AutoSSL** if it's stale

Wait 5 minutes and refresh. The browser lock icon should return.

---

## 11. Sanity-check the live site

Open each of these and confirm they load:

- `https://saggilawfirm.com/` — home
- `https://saggilawfirm.com/services` — practice areas
- `https://saggilawfirm.com/services/criminal-law-impairedover-80-dui` — a
  service detail page
- `https://saggilawfirm.com/case-studies` — case-study index
- `https://saggilawfirm.com/criminal-defence-legal-guidance-in-brampton`
  — the Google Ads landing page
- `https://saggilawfirm.com/admin` — Payload login

Test the booking form on `/booking` (fill in a test entry — you should
receive the email at the recipient in `siteConfig.contact.email`).

---

## 12. Old WordPress URLs → new URLs (SEO safety net)

Once the site is live, add 301 redirects for any WP paths that Google has
already indexed. Edit `next.config.ts`:

```ts
async redirects() {
  return [
    { source: "/2023/:year/:month/:slug",  destination: "/blog/:slug", permanent: true },
    { source: "/category/:slug",           destination: "/blog",       permanent: true },
    // …add any high-value WP paths here
  ];
}
```

Rebuild + restart. Google will re-crawl within a few weeks.

Also submit the new sitemap in **Google Search Console**:

- Property: `https://saggilawfirm.com`
- Sitemaps → Add: `https://saggilawfirm.com/sitemap.xml`

---

## 13. Cancel WordPress hosting (only after 1–2 weeks of stability)

Wait a couple of weeks to make sure the new site is stable:

- No downtime spikes
- Forms delivering
- Google indexing new pages
- Client is happy

Then:

- Take one more full backup of the WordPress files/DB (keep it for 3–6
  months in cold storage)
- cPanel → **Softaculous / WP Toolkit** → remove the WordPress
  installation
- Cancel the WordPress hosting plan if it's billed separately from cPanel

---

## Rollback plan (if anything goes wrong at any step)

1. cPanel → **Setup Node.js App** → **Stop** the Node app
2. cPanel → **File Manager** → rename `public_html-wp-backup` back to
   `public_html`
3. WordPress is live again — no data loss.

Your rollback window is open until step 13 is done.

---

## Contact for help

If any cPanel step behaves differently from what's written here, share the
exact screen and I'll adjust the instructions for your specific hosting
setup.
