# NIAT-AMA — File Structure

This document describes the full file and folder structure of the **niat-ama** project (React + Vite).

---

## Directory tree

```
niat-ama/
├── docs/
│   ├── FAQ-IMPLEMENTATION.md      # FAQ section: mobile/desktop implementation
│   ├── FILE-STRUCTURE.md          # This file — project structure
│   └── NIAT-COLOR-PALETTE-SECTIONS.md   # NIAT brand colors → section mapping
│
├── public/
│   └── vite.svg                  # Favicon / Vite logo
│
├── src/
│   ├── App.jsx                   # Root component: layout, scroll state, section order
│   ├── App.css                    # App-level CSS (if any)
│   ├── main.jsx                   # React entry: mounts App into #root
│   ├── index.css                  # Global CSS + CSS variables (NIAT palette)
│   │
│   ├── assets/
│   │   └── react.svg              # React logo asset
│   │
│   ├── components/
│   │   ├── index.js               # Barrel: exports all section components
│   │   ├── Navbar.jsx             # Fixed top nav: logo, “Book Your Slot” link
│   │   ├── Hero.jsx               # Hero: headline, one-to-many copy, CTA
│   │   ├── HowItWorks.jsx         # How it works: 3 cards + video placeholder
│   │   ├── MeetSeniors.jsx        # Senior cards + “Book Slot” links
│   │   ├── DiscoverLife.jsx       # Life at NIAT: story cards
│   │   ├── FAQ.jsx                # FAQ: accordion or bubble layout
│   │   ├── CTA.jsx                # “Book Your Slot Now” block
│   │   └── Footer.jsx             # Footer: logo, copyright
│   │
│   ├── data/
│   │   └── constants.js           # BOOK_SLOT_URL, seniorsData, storiesData, faqsData
│   │
│   ├── hooks/
│   │   └── useInView.js           # IntersectionObserver hook (section in view)
│   │
│   └── styles/
│       └── GlobalStyles.jsx       # Injected global CSS (layout, components, keyframes)
│
├── .gitignore
├── eslint.config.js               # ESLint config
├── index.html                    # HTML shell; script src=/src/main.jsx
├── package.json                  # Dependencies (React, Vite, Framer Motion, Lucide)
├── README.md
└── vite.config.js               # Vite + React plugin config
```

---

## Root files

| File | Purpose |
|------|--------|
| `index.html` | Single page shell; `<div id="root">`; loads `/src/main.jsx`. |
| `package.json` | Scripts (`dev`, `build`, `lint`, `preview`); deps: React 19, Vite 7, Framer Motion, Lucide. |
| `vite.config.js` | Vite config; React plugin. |
| `eslint.config.js` | ESLint rules. |
| `.gitignore` | Git ignore (e.g. `node_modules`, `dist`). |
| `README.md` | Project readme. |

---

## `src/` — Application code

### Entry & root

| File | Purpose |
|------|--------|
| `main.jsx` | Creates root, renders `<App />` (with StrictMode if present). Imports `index.css`. |
| `App.jsx` | Root component: scroll state, `GlobalStyles`, and section order (Navbar → Hero → … → Footer). Uses Framer Motion `AnimatePresence`. |
| `App.css` | Extra app-level styles (if used). |
| `index.css` | **First**: `@import` Google Fonts. **Then** `:root` with NIAT palette (primary, secondary, accents, navbar-bg, section-bg, text, hero gradient, etc.). Base resets and `body`/`a`/`button` defaults. |

### `src/components/`

| File | Purpose |
|------|--------|
| `index.js` | Re-exports Navbar, Hero, HowItWorks, MeetSeniors, DiscoverLife, FAQ, CTA, Footer for clean imports in `App.jsx`. |
| `Navbar.jsx` | Fixed navbar: NIAT + “Senior Connect”, “Book Your Slot” link (opens `BOOK_SLOT_URL` in new tab). Uses `scrolled` for style. |
| `Hero.jsx` | Hero block: badge, headline, one-to-many copy, primary CTA link. Uses Framer Motion for entrance. |
| `HowItWorks.jsx` | “How It Works”: label, 3 cards (Honest Answers, One-to-Many Sessions, Zero Judgement), video placeholder. Uses motion + Lucide icons. |
| `MeetSeniors.jsx` | “Meet Your Seniors”: grid of senior cards (from `seniorsData`), each with “Book Slot” link. |
| `DiscoverLife.jsx` | “Life at NIAT”: story cards from `storiesData`, horizontal scroll. |
| `FAQ.jsx` | FAQ section: either accordion or bubble layout; questions/answers and optional expand/collapse. |
| `CTA.jsx` | Final CTA block: “Ready to Have a Chat?”, “Book Your Slot Now” link to `BOOK_SLOT_URL`. |
| `Footer.jsx` | Footer: NIAT + “Senior Connect”, copyright. |

### `src/data/constants.js`

- **BOOK_SLOT_URL** — Google Form URL used by all “Book Your Slot” / “Book Slot” links.
- **seniorsData** — Array of senior profiles (name, year, traits, quote, accent, bgGradient).
- **storiesData** — Array of story cards (name, year, color).
- **faqsData** — Used only if FAQ is list-based; otherwise FAQ may use its own data.

### `src/hooks/useInView.js`

- **useInView(threshold)** — Returns `[ref, inView]`. Uses `IntersectionObserver` to set `inView` when the element crosses the threshold. Used for scroll-triggered animations if needed.

### `src/styles/GlobalStyles.jsx`

- **GlobalStyles** — Renders a `<style>` tag with global rules: same `:root` tokens as `index.css`, layout classes (navbar, hero, sections, cards, buttons, dividers), keyframes (float, pulse-badge, pulse-ring, fadeSlideUp, etc.). No layout logic, only CSS.

---

## `docs/`

| File | Purpose |
|------|--------|
| `FILE-STRUCTURE.md` | This document — full file structure. |
| `FAQ-IMPLEMENTATION.md` | FAQ section: data model, desktop vs mobile layout, animations, interactions. |
| `NIAT-COLOR-PALETTE-SECTIONS.md` | NIAT brand tokens and which color is used in each section (Navbar, Hero, How It Works, etc.). |

---

## `public/`

Static assets served at root. `vite.svg` is typically used as favicon or logo.

---

## Build & run

- **Install:** `npm install`
- **Dev:** `npm run dev` — Vite dev server
- **Build:** `npm run build` — output in `dist/`
- **Preview:** `npm run preview` — serve `dist/`
- **Lint:** `npm run lint`

---

## Summary

- **Root:** Vite + React app; config and entry in `index.html`, `main.jsx`, `App.jsx`.
- **UI:** Section-based components under `src/components/`, composed in `App.jsx`.
- **Data & config:** Single place for URL and copy in `src/data/constants.js`.
- **Styling:** NIAT palette and globals in `index.css` + `GlobalStyles.jsx`; section-specific styles in components or global classes.
- **Docs:** `docs/` holds FAQ implementation, color/section mapping, and this file structure.
