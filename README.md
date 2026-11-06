# tr3s.ai — launch website

Marketing site for **tr3s** (tr3s.ai / ALT F2, S.A. de C.V.), a data, analytics
and AI consultancy. Built with **Jekyll** and hosted on **GitHub Pages**.

The site is a faithful build of the approved design (dark theme, lime `#A3E635`
accent, Archivo variable font). It is bilingual: a full Spanish site plus an
English home page.

## Pages

| URL | Page | Source file |
|-----|------|-------------|
| `/` | Inicio (ES) | `index.html` |
| `/soluciones/` | Soluciones | `soluciones.html` |
| `/casos/` | Casos de uso | `casos.html` |
| `/nosotros/` | Nosotros | `nosotros.html` |
| `/contacto/` | Contacto | `contacto.html` |
| `/ai-info/` | Info for AI assistants | `ai-info.html` |
| `/en/` | Home (EN) | `en.html` |

Shared chrome lives in `_layouts/default.html` + `_includes/` (head, header,
footer, newsletter form). Global styles: `assets/css/site.css`.

## Local development

```bash
bundle install
bundle exec jekyll serve
# → http://localhost:4000
```

## The two "backends" (external services — nothing runs on GitHub Pages)

GitHub Pages serves static files only, so both interactive features POST
directly from the browser to hosted services. No secrets live in this repo.
Both are configured in `_config.yml`.

### 1. Contact form → Web3Forms

The custom-designed contact form on `/contacto/` submits via `fetch()` to
[Web3Forms](https://web3forms.com) (free, no account — just verify an email and
get an access key). Submissions arrive at **hola@tr3s.ai**.

1. Create an access key at https://web3forms.com (enter `hola@tr3s.ai`).
2. Paste it into `_config.yml` → `web3forms_key`.

Prefer Formspree instead? Swap the endpoint + field in
`assets/js/forms.js` (`https://formspree.io/f/<id>`) — the form markup stays the
same. Until a key is set, the form shows a "not configured yet" message.

### 2. Newsletter → beehiiv

A beehiiv signup appears in the footer (all pages) and as a dedicated section on
the home pages. The **new tr3s.ai publication must be created in the beehiiv
dashboard first** (publication creation isn't in the API). Then:

1. In beehiiv, add an **embedded subscribe form** and copy its embed URL
   (`https://embeds.beehiiv.com/<uuid>`).
2. Paste it into `_config.yml` → `beehiiv_embed_url`.

Until that value is set, the signup renders as a styled "coming soon"
placeholder so the layout stays complete.

### Also fill in

`_config.yml` placeholders: `whatsapp_url` / `whatsapp_label`, `calendar_url`
(the Google Calendar booking link for `/contacto/`), and the office address /
survey URLs marked `[...]` throughout the content. Partner names, bios, photos,
and proof/KPI numbers are intentionally placeholders in the design.

## Deployment (GitHub Pages)

Builds with Jekyll 4 via GitHub Actions (`.github/workflows/pages.yml`). This
works on any Ruby — the legacy `github-pages` gem pins an old Jekyll/Liquid that
breaks on modern Rubies, so we build Jekyll 4 directly and publish to Pages.

1. Push to GitHub (workflow triggers on `main`).
2. Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. For the custom domain `tr3s.ai`: set it under Settings → Pages (adds a
   `CNAME`), and set `url: https://tr3s.ai` in `_config.yml`.

## Logos & favicon

Brand logo library lives in `assets/img/logos/` (all seven official variants:
`primary-horizontal`, `light-horizontal`, `black-on-white`, `white-on-black`,
`stacked-square`, `symbol-square`, `wide-banner`). The source PNGs ship with a
solid background; `*-transparent.png` versions (generated for the dark UI) are
used in the header and footer. `.context/process_logos.py` regenerates them.

- Header / footer wordmark: `logos/primary-horizontal-transparent.png`
- Decorative "3" (Nosotros): `assets/img/mark.png` (transparent symbol)
- Favicon / app icon: `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`,
  `icon-512.png` (navy square, lime "3")
- Social / OG image: `logos/wide-banner.png`

## Design source

The original design export and extraction scripts are kept (gitignored) under
`.context/` for reference.
