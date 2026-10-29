# Portfolio — Deni

A personal portfolio website for Deni, a software engineer in Jakarta, Indonesia.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS 3, Framer Motion and
Lucide icons. The site is a static export, ready for GitHub Pages.

> **Originality note:** this site is inspired only by the *structure* of a
> personal engineer portfolio (hero, stats, highlights, projects, open source,
> skills, timeline, testimonials, contact). No text, achievements, testimonials,
> company names or photos were copied from any other person's site. The avatar
> is CSS initials and project images are generic Unsplash photos.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export in ./out
```

## Deploy to GitHub Pages

The workflow file `.github/workflows/deploy.yml` is included in this project.
It uses Node 20, `npm ci`, builds with `DEPLOY_TARGET=github` (so the
`basePath` becomes `/portfolio-web`), uploads `./out` and deploys with
`actions/deploy-pages@v4`. The workflow needs Pages permissions
(`pages: write`, `id-token: write`, `contents: read`).

## Data layer — JSON today, API tomorrow (read this before editing content)

All content lives in `data/*.json`:

| File | Contents |
| --- | --- |
| `profile.json` | Name, role, bio, stats, trusted stack |
| `highlights.json` | Hot highlights |
| `projects.json` | Selected work |
| `skills.json` | 10 skill domains + detailed skill groups |
| `career.json` | Career timeline |
| `opensource.json` | Contributions, tools, published apps |
| `testimonials.json` | Testimonials |
| `education.json` | Education |
| `certifications.json` | Certifications and awards |

**Components must never import a JSON file directly.** They only call the
getters in `lib/data.ts` (`getProfile`, `getProjects`, `getSkills`,
`getCareer`, `getOpenSource`, `getTestimonials`, `getHighlights`,
`getEducation`, `getCertifications`).

To swap JSON for an API, without touching any component:

1. In `lib/data.ts`, implement the same `DataSource` interface with `fetch()`
   calls that return the same types (map API field names inside that
   implementation, not in components).
2. Change the single export at the bottom of `lib/data.ts` from
   `jsonSource` to your API implementation (or gate it on an env flag such as
   `NEXT_PUBLIC_DATA_SOURCE === 'api'`).
3. Done. Components keep calling the same getters.

Note: a static export (`output: 'export'`) cannot call a server-only API at
request time. If you move to a live API, either fetch at build time in
`lib/data.ts`, or drop the static export and deploy as a normal Next.js app.

## Replace this sample data before presenting it as a CV

- `data/profile.json`: replace the placeholder email (`hello@example.com`).
- `data/career.json`, `data/testimonials.json`, `data/certifications.json`,
  `data/education.json`: entries marked "sample" are **not real**. Replace them
  with real, verifiable roles, quotes and credentials, or delete them. Do not
  present sample entries as real employers, clients or certificates.
- `data/projects.json`: the DocScan, PuzzleVerse and Sensei Homemade entries
  describe real public repositories. The warehouse API and mini commerce
  entries are samples — replace them with real implementations or remove them.
- The contribution heatmap is an illustrative, deterministic grid, not real
  GitHub activity. Connect a real data source for real counts.
- The `.app` suffix in bundle identifiers on other projects is unrelated to
  this site and is not used here.

## Project structure

```
app/            Next.js App Router: layout, globals.css, page (all sections)
components/     Navbar, Reveal (motion), Section/Card helpers
lib/data.ts     Typed DataSource interface + JSON implementation + getters
data/*.json     All editable content
.github/workflows/deploy.yml   GitHub Pages deploy (paste manually, see below)
```

## Manual steps (GitHub App limitation)

This project was **not** pushed or deployed by the agent that built it. The
connected GitHub App lacks the Workflows permission, so workflow files cannot
be pushed by the agent and must be pasted manually:

1. Create an empty **public** repository named `portfolio-web` on GitHub.
2. Push all files **except** `.github/workflows/deploy.yml` (the main agent
   does this with the snapshot push).
3. In the repository web UI, create `.github/workflows/deploy.yml` and paste
   the contents of the local file with the same name.
4. In the repository, go to **Settings → Pages → Build and deployment →
   Source: GitHub Actions**, then push to `main` (or run the workflow
   manually) to deploy. The site will be at
   `https://<username>.github.io/portfolio-web/`.
