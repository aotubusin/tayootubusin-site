# Tayo Otubusin — Website + Decap CMS Starter

This folder is a ready-to-deploy starter for your personal site with:

- A **blog** you write yourself (title, date, category, tags, cover image, body)
- **Editable site content** (profile photo, hero text, tagline, "at a glance" stats, sectors, expertise) — all from a dashboard, no code
- **Automatic Medium pull** — your latest Medium posts appear on the site
- Free, fast hosting on **Cloudflare Pages**

It uses **Eleventy** (a build tool) + **Decap CMS** (the editing dashboard).
You edit content in a friendly dashboard; the site rebuilds itself and goes live.

---

## How it works (the 30-second version)

1. Your content lives as simple files in a **GitHub repository**.
2. **Decap CMS** (at `yoursite.com/admin/`) gives you a dashboard to edit those files. No code.
3. When you publish, **Cloudflare Pages** rebuilds the site (fetching your latest Medium posts) and serves it worldwide.

```
You type in /admin  →  saves to GitHub  →  Cloudflare rebuilds  →  live site updates
```

---

## What you can edit from the dashboard

- **Blog posts** — create, edit, delete. Title, date, category, tags, cover image, body.
- **Profile & hero** — your name, roles line, tagline, hero paragraph, **profile photo**, email, LinkedIn, Medium URL.
- **At a glance** — the four stat cells (value, prefix/suffix, count-up on/off, label).
- **Sectors** — the industries strip.
- **Expertise** — the capability pillars.

To make more of the page editable later, add fields in `admin/config.yml`.

---

## Deployment — step by step

You'll do this once. Steps 1–4 are easy. **Step 5 (login wiring) is the one worth giving to a developer** — budget about an hour.

### 1. Put this folder on GitHub
- Create a free account at github.com.
- Create a new repository called `tayootubusin-site`.
- Upload everything in this folder to it (GitHub lets you drag files in the browser).
- In `admin/config.yml`, change `repo: YOUR-GITHUB-USERNAME/tayootubusin-site` to your actual username.

### 2. Add your real homepage design
- This starter ships a **simplified** homepage (`src/index.njk`) to prove the wiring works.
- Your polished design is in `tayootubusin-personal-FINAL.html`. A developer moves that markup into `src/index.njk`, keeping the `{{ profile.* }}`, `{{ atglance.* }}`, `{{ sectors.* }}` and `{{ expertise.* }}` placeholders so it stays editable. Put your CSS at `src/assets/style.css`.
- (You can deploy first with the simple version and upgrade the design after — nothing breaks.)

### 3. Connect to Cloudflare Pages
- Sign up free at pages.cloudflare.com.
- "Create a project" → connect your GitHub repo.
- Build settings:
  - **Build command:** `npm run build`
  - **Output directory:** `_site`
- Deploy. You'll get a temporary `*.pages.dev` address — your site is live.

### 4. Point your domain at it
- In Cloudflare Pages → your project → "Custom domains" → add `tayootubusin.com`.
- Cloudflare tells you which DNS records to set. If your domain's DNS is already on Cloudflare, it's basically one click. HTTPS (the padlock) is automatic and free.
- For `princetayorski.com`, set up a redirect to `tayootubusin.com` (Cloudflare → Rules → Redirect Rules).

### 5. Turn on the editing login (the developer bit)
Decap needs to know it's really you logging in. With GitHub + Cloudflare the common path is:
- Register a **GitHub OAuth App** (Settings → Developer settings → OAuth Apps).
- Deploy a tiny **OAuth helper** so Decap can complete GitHub login. Two well-documented options:
  - A small **Cloudflare Worker** OAuth provider (search "Decap CMS Cloudflare Worker OAuth"), or
  - The community **Netlify/serverless OAuth** helpers.
- Point `admin/config.yml`'s `base_url` to that helper.
- Full guide: https://decapcms.org/docs/backends-overview/  and  https://decapcms.org/docs/github-backend/

Once done, visiting `tayootubusin.com/admin/` lets you log in with GitHub and edit everything.

---

## Writing a blog post (after setup)

1. Go to `tayootubusin.com/admin/`
2. Log in.
3. **Blog posts → New Blog post.**
4. Fill in title, date, category, tags, cover image (optional), a short summary, and your body text.
5. **Publish.** The site rebuilds and your post is live in a minute or two.

---

## The Medium integration

- Open `src/_data/medium.js` and set `MEDIUM_HANDLE` to your handle (e.g. `@tayotubusin`).
- On every build, the site fetches your latest Medium posts and shows them on the blog page.
- Medium only shares a short preview in its feed, so the site shows the title + a snippet + a link to read on Medium. That's by design.
- To refresh Medium posts on a schedule (not just when you publish), add a **Cloudflare Pages scheduled build** (or a "Deploy hook" triggered by a free cron service).

**Recommended pattern:** write the post on *your* site first (so your domain gets the SEO credit), then republish on Medium with a canonical link back. Best of both: your audience on Medium, your authority on your own domain.

---

## Running it on your own computer (optional)

If you or a developer want to preview locally:

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:8080).

---

## File map

```
admin/
  index.html        the Decap dashboard loader
  config.yml        defines every editable field  ← edit to add more
src/
  index.njk         homepage (simplified; migrate the FINAL design here)
  blog.njk          blog listing (your posts + Medium)
  posts/            your blog posts (one .md file each)
  content/settings/ editable site data (profile, stats, sectors, expertise)
  _data/medium.js   pulls Medium posts at build time
  _includes/        page layouts
  assets/           put your style.css and images here
.eleventy.js        build configuration
package.json        dependencies
```

---

## Honest summary of what's done vs. what remains

**Done (in this folder):** the CMS, all editable fields, the blog with tags, the Medium integration, the build setup, sample content, and this guide.

**Remaining (needs the live accounts / a developer):**
1. Migrating the polished `FINAL` design into `src/index.njk` + `src/assets/style.css`.
2. The GitHub/Cloudflare **login wiring** in step 5.

After those two, you have a fast, free, self-editable site with a real blog and live Medium feed.
