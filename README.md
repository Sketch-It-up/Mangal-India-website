# Mangal India website

Marketing site for Mangal India · Krishna Mohan Exports, built from the build document
`Mangal_India_Website_Final_Content.docx` (the "spec"; section numbers in code comments refer to it).

React 18 · Vite 5 · React Router 6 · Tailwind CSS 3 · Framer Motion · d3-geo.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173 (forms are logged to the console, not sent)
npm run build     # production build into dist/, then scripts/postbuild.mjs
npm run preview   # serve dist/ locally
```

The design-system reference is at `/styleguide/` in development only.

## Where things live

| What | Where |
| --- | --- |
| All page copy (word for word from the spec) | `src/data/*.js`: `home.js`, `pages.js`, `founder.js`, `faq.js`, `products.js`, `exports.js` |
| Routes, SEO titles, meta descriptions, H1s | `src/data/routes.js` |
| Company facts, contact details, domain | `src/data/site.js` |
| Countries, India network (drives both maps) | `src/data/countries.js`, `src/data/network.js` |
| Enquiry forms (fields, routing, validation) | `src/data/forms.js`, shared by the browser and `api/enquiry.js` |
| Pages | `src/pages/` |

Changing copy or adding a country never needs a component change.

## Build output and SEO

`npm run build` runs `scripts/postbuild.mjs`, which writes one HTML file per route with that
page's title, description, Open Graph and robots/canonical tags, plus `404.html` and
`robots.txt`. Once `site.url` is set it also writes `sitemap.xml` and adds canonical URLs,
breadcrumb and website structured data. It warns if a title passes 60 characters or a
description passes 155.

## Forms

Forms post to `/api/enquiry` (`api/enquiry.js`, a Vercel serverless function). It validates,
rate-limits, emails the team inbox for that form type, acknowledges the sender and can forward
each enquiry to a webhook. Configure it with the variables in `.env.example`. Without email or
webhook settings it answers 503, so a misconfigured site fails visibly rather than losing
enquiries.

Enquiry links can pre-fill a form: `/contact/?product=kiwi`, `/contact/?type=supplier`.

## Deploy (Vercel)

1. Import the project; Vercel reads `vercel.json` (build command, output, trailing slashes,
   security headers, asset caching).
2. Add the environment variables from `.env.example`.
3. Set `site.url` in `src/data/site.js` to the final domain and redeploy (enables the sitemap,
   canonical URLs and URL-based structured data).
4. Submit `sitemap.xml` in Google Search Console and Bing Webmaster Tools.

Another static host works too: serve `dist/`, map unknown paths to `404.html`, and replace
`api/enquiry.js` with an equivalent endpoint or set `VITE_ENQUIRY_ENDPOINT`.

## Before launch

Every client-supplied item still missing is marked `[CONFIRM: …]`. They show on the page as
dashed markers and as `null` values in `src/data/site.js` and `src/data/exports.js`. The launch
checklist requires none to remain:

```bash
grep -rn "CONFIRM" src
```

Outstanding: official email, phone/WhatsApp, office address, privacy email, retention period
and grievance contact, jurisdiction wording, Dubai shop address and opening date, founder
portrait, logo files, real photography, domain, team inboxes, and the "8+ years" versus 2020
founder-timeline question. The privacy policy and terms are drafts and need legal review
(including the Digital Personal Data Protection Act, 2023) before publication.
