# New Era Ventures — Project Documentation

> Internal engineering & product documentation. Last reviewed: 2026-06-01.

---

## 1. What this is

**New Era Ventures (NEV)** is a single-page marketing website + lightweight CMS for a
technology agency / code academy headquartered in Lagos, Nigeria (positioned as
"Nigeria — UK & many more"). It markets four core offerings:

1. **Agency services** — web dev, mobile, UI/UX, branding, cloud/DevOps, AI/ML, cybersecurity, backend.
2. **Owned products** — SaaS/products the company sells (CMS, LMS, brand kit, site builder).
3. **A blog** — thought-leadership / SEO content.
4. **A code academy** — paid training cohorts ("Learn to Code").

It is a **public site driven by a Supabase database**, with a hidden **admin panel** the
team uses to edit team members, blog posts, products, services, and site settings without
touching code.

### The site is a single scrolling page

`App.tsx` renders all sections in one vertical scroll. Navigation is anchor-based
(`scrollIntoView`), not routed. Section order:

`Hero → About → Services → Portfolio (team) → Products → Blog → Learn → Contact → Footer`

There is **no router**. The admin panel is shown by swapping the entire app tree when a
localStorage flag is set (see §4).

---

## 2. Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Build | **Vite 6** | Scaffolded from `bolt-vite-react-ts` (see `.bolt/`) |
| UI | **React 18.3** + TypeScript 5.5 | Function components + hooks only |
| Styling | **Tailwind CSS 3.4** | Empty `theme.extend` — no design tokens defined |
| Icons | **lucide-react** | Used everywhere |
| Backend | **Supabase** (`@supabase/supabase-js`) | Postgres + RLS, no edge functions |
| State | React hooks + one Context (`SiteContext`) | No Redux/Zustand/query lib |
| Hosting | Vercel (`new-era-venture.vercel.app`) | per OG tags |

No test framework, no CI, no error tracking, no analytics.

---

## 3. Directory map

```
src/
  App.tsx                  # Root: loading screen, section composition, footer, admin gate
  main.tsx                 # Mounts <SiteProvider><App/>
  index.css                # Only @tailwind directives (3 lines)
  vite-env.d.ts

  components/
    LoadingScreen.tsx      # Typewriter splash ("TECH PARTNERS | ACADEMY")
    Navbar.tsx             # Fixed nav + hamburger drawer + dropdowns
    AdminLogin.tsx         # Admin login modal (HARDCODED creds — see §6)

  sections/                # The public marketing page, one file per section
    HeroSection.tsx        # Parallax bg, rotating word, particles, stat counters
    AboutSection.tsx       # Mission/vision cards + 16-item capability grid
    ServicesSection.tsx    # Supabase services + hardcoded detail modal map
    PortfolioSection.tsx   # Supabase team_members + hover flip cards + profile modal
    ProductsSection.tsx    # Supabase products
    BlogSection.tsx        # Supabase blog_posts + reading-time + post modal
    LearnSection.tsx       # 100% hardcoded course tracks
    ContactSection.tsx     # Form → contact_messages, + FAQ

  pages/
    AdminPanel.tsx         # Admin shell: header + sidebar + tab switch
    admin/
      AdminDashboard.tsx   # Count tiles
      AdminTeam.tsx        # CRUD team_members
      AdminBlog.tsx        # CRUD blog_posts
      AdminProducts.tsx    # CRUD products
      AdminServices.tsx    # CRUD services
      AdminSettings.tsx    # Edit site_settings key/values

  context/
    SiteContext.tsx        # Loads site_settings into a {key: value} map

  lib/
    supabase.ts            # Client + all TypeScript row types
    auth.ts                # localStorage "auth" (HARDCODED creds — see §6)

supabase/
  migrations/2026..._create_new_era_ventures_schema.sql   # Full schema + seed data

public/
  robots.txt, sitemap.xml  # NOTE: point at new-eraventures.com, not the vercel domain
```

---

## 4. How auth & the admin panel work (today)

This is the most important thing to understand about the architecture, because it is both
**insecure** and **internally contradictory**.

1. The footer has an "Admin Login" button → opens `AdminLogin`.
2. `AdminLogin` checks the typed username/password against **two hardcoded credential pairs
   in client-side JS** and, on match, writes `localStorage["nev_admin_auth"] = "true"`.
3. `App.tsx` reads `isAdminLoggedIn()` (just reads that localStorage flag). If true, it
   renders `<AdminPanel/>` **instead of** the public site.
4. The admin panel then does `supabase.from(...).insert/update/delete(...)` directly.

### The contradiction

The SQL migration enables **Row Level Security** on every table and grants write access
**only to the `authenticated` role**:

```sql
CREATE POLICY "Team members: admin can update"
  ON team_members FOR UPDATE TO authenticated ...
```

But the app **never calls `supabase.auth.signIn`** — it only flips a localStorage boolean.
So every Supabase request goes out as the **anonymous (`anon`)** role. Under the RLS
policies as written in the migration, all admin writes (team/blog/products/services/
settings) **should be rejected**.

This means one of two things is true in the live deployment:
- The admin CRUD silently fails (the panel looks like it works but nothing saves), **or**
- The RLS policies were loosened in the Supabase dashboard (e.g. granted to `anon`), in
  which case **anyone on the internet can write to your database** using the public anon key.

Either way this must be resolved. See §6 and §7.

---

## 5. Data model (Supabase / Postgres)

All tables have `id uuid` PK + `created_at`. RLS enabled on all.

| Table | Purpose | Public read | Notes |
|---|---|---|---|
| `site_settings` | key/value site config (name, logo, contact, socials) | ✅ | Read by `SiteContext` app-wide |
| `team_members` | Portfolio team cards | ✅ | headshot + candid URLs, social links, `display_order` |
| `blog_posts` | Blog | ✅ (only `published=true`) | `slug` unique, `published_at` |
| `products` | Owned products | ✅ | `features text[]`, `price` is free text |
| `services` | Service offerings | ✅ | `icon` is a Lucide component name string |
| `contact_messages` | Contact form inbox | insert-only for public | admin reads |
| `admin_users` | Intended for hashed admin creds | self-row only | **Defined but unused** — app uses hardcoded creds instead |

Seed data ships real-looking team members (Kenneth Osei, Ama Serwaa, etc.), 8 services,
4 products, 4 blog posts.

### Schema observations
- `services.icon` couples the DB to frontend component names. If an admin types an icon
  name that isn't in `iconMap` (ServicesSection), it silently falls back to `Globe`.
- `serviceDetails` (summaries, feature bullets, hero image per service) is **hardcoded in
  `ServicesSection.tsx` keyed by service title**. If an admin renames a service in the DB,
  the modal loses its rich detail and falls back to the bare description. The "admin can
  edit services" promise is therefore only half true.
- `admin_users` table exists but is dead — real auth was never wired up.

---

## 6. Critical issues (fix before any "professional" claim)

These are correctness/security, not aesthetics. They matter more than the redesign.

### 🔴 6.1 Hardcoded admin credentials in shipped client code
`src/lib/auth.ts` and `src/components/AdminLogin.tsx` contain plaintext usernames and
passwords (`Newerateam/55019`, `kenny/1234richard`, `Kenny/1234richard`). These are
**bundled into the public JS** and visible to anyone who opens DevTools. This is a full
admin bypass. **The two files even disagree** (`auth.ts` says `Kenny`, `AdminLogin` says
`kenny`/`Newerateam`), so the login logic is duplicated and inconsistent.

**Fix:** Use real Supabase Auth (`supabase.auth.signInWithPassword`). Store admins in
`admin_users` (or Supabase's `auth.users`). Gate the panel on a real session, not
localStorage. Then the existing RLS `authenticated` policies actually work.

### 🔴 6.2 RLS / auth mismatch (see §4)
Admin writes go out as `anon`. Either broken or wide open. Fixing 6.1 fixes this.

### 🟠 6.3 `localStorage` "auth" is trivially forgeable
Even without the password, `localStorage.setItem('nev_admin_auth','true')` in the console
opens the admin panel. (The panel is useless without DB write access, but it still exposes
the entire admin UI.)

### 🟠 6.4 No env example, hard crash on missing env
`supabase.ts` throws if `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` are missing — the
whole site white-screens. There's no `.env.example` committed, so a new dev has no idea
what to set. Add `.env.example`.

### 🟠 6.5 Contact form has no spam protection
`contact_messages` allows anonymous insert (correct) but there's no rate limit, captcha, or
honeypot. The public anon key + open insert policy invites spam/abuse.

### 🟡 6.6 SEO/meta inconsistencies
- `robots.txt` and `sitemap.xml` reference `new-eraventures.com`, but OG tags + Supabase
  point at `new-era-venture.vercel.app`. Pick one canonical domain.
- Favicon is declared twice in `index.html` (a `vite.svg` and an ibb.co png).
- No `<meta name="description">` for search engines (only OG/Twitter).

---

## 7. Technical improvement points (non-design)

Prioritized, roughly highest-leverage first.

1. **Real authentication** (§6.1/6.2) — the single most important fix.
2. **Add a router** (`react-router` or keep anchors but add real routes for blog posts).
   Right now blog posts open in a modal — there are no shareable/SEO-able post URLs, which
   undercuts the entire point of having a blog for SEO.
3. **Decouple service content from code.** Move `serviceDetails` (summary, features, image)
   into the `services` table as columns so admins can actually edit what the modal shows.
4. **Centralize the `useScrollReveal` hook.** It is **copy-pasted into 5 section files**
   verbatim. Extract to `src/hooks/useScrollReveal.ts`.
5. **Loading & error states for data.** Every section does `supabase...then(setX)` with no
   loading skeleton and no error handling. If Supabase is slow or down, sections render
   empty with no feedback. (Portfolio is the only one that logs errors.)
6. **Empty states.** If `team_members`/`products`/`posts` are empty, sections render a bare
   heading over nothing. Add composed empty states.
7. **`SiteContext` underused.** It loads settings but only `ContactSection` and `AdminLogin`
   consume them; the footer, hero badge, and nav still hardcode company name/links.
8. **Type the Supabase client.** `createClient` is untyped; queries return `any`. Generate
   types from the schema (`supabase gen types typescript`) and use `createClient<Database>`.
9. **Accessibility:** the hamburger menu is the *only* way to reach nav on desktop until lg
   breakpoint; modals lack focus trapping and Esc-to-close; the candid/headshot toggle has
   no keyboard equivalent; social links in contact render just the first letter ("T", "L").
10. **Performance:** Hero attaches a non-throttled `scroll` listener writing inline
    transforms every frame (jank risk on low-end devices); 20 particles use `Math.random()`
    inline so they re-randomize on every re-render. Use `useMemo` / `requestAnimationFrame`.
11. **No tests / no CI / no error monitoring.** Add at least typecheck + lint in CI (scripts
    already exist: `npm run typecheck`, `npm run lint`).
12. **Dead code:** `admin_users` table, unused `scrollTo`/imports in places, duplicated
    `formatDate`/`readTime`.

---

## 8. Local development

```bash
npm install

# Create .env (not committed) with your Supabase project values:
#   VITE_SUPABASE_URL=...
#   VITE_SUPABASE_ANON_KEY=...

npm run dev        # Vite dev server
npm run build      # Production build
npm run preview    # Preview the build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

Database: apply `supabase/migrations/*.sql` to your Supabase project (SQL editor or
`supabase db push`). Admin login (current, insecure): see `AdminLogin.tsx`.

---

## 9. Design

The visual design is covered in depth in **[DESIGN_AUDIT.md](DESIGN_AUDIT.md)** — a critique
of what currently reads as "AI-generated / vibecoded" and a prioritized plan to make it look
like a deliberately-designed startup product.
