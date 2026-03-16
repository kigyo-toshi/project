# Code Reading Guide — Kigyo-Toshi Website

## Project Architecture

This project is a **multi-page static website** with no build system, framework, or
server-side logic. Each page is a self-contained HTML file with its own CSS file.
The site is deployed on GitHub Pages.

```
project/
├── index.html              ← Landing page (home)
├── index.css
├── content.html            ← Activities page
├── content.css
├── achievement.html        ← Achievements/results page
├── achievement.css
├── member.html             ← Members & alumni page
├── member.css
├── information.html        ← Project overview page
├── information.css
├── faq.html                ← Frequently asked questions
├── faq.css
├── contact.html            ← Contact form (Google Forms)
├── contact.css
├── contact-thankyou.html   ← Thank-you page after form submit
├── contact-thankyou.css
├── 2023.html / 2023.css    ← Yearly activity page (2023)
├── 2024.html / 2024.css    ← Yearly activity page (empty)
├── 2025.html / 2025.css    ← Yearly activity page (empty)
├── accordtion.css          ← Shared accordion component styles
├── script.js               ← Shared JS (referenced but NOT in repo)
├── sitemap.xml             ← Search engine sitemap
├── README.md               ← Brief project description
└── img/                    ← Image assets
    ├── logo.svg            ← Main site logo
    ├── logo-aikon.svg      ← OG image / favicon source
    ├── logo2.png           ← Alternative logo
    ├── firstview.svg/png   ← Hero banner image
    ├── instagram.png       ← SNS icon
    ├── twitter.png         ← SNS icon
    ├── note.png / note.svg ← SNS icon (two formats exist)
    ├── suzukidaiki.png     ← Member photo
    ├── suzuki.png          ← Member photo
    ├── murata.png          ← Member photo
    ├── kashima.png         ← Member photo
    └── poster.png          ← Event poster
```

---

## Main Entry Points

### `index.html` — Home Page

The primary entry point. Contains:
- Hero image (`firstview.svg`)
- About section
- Vision statement
- Activity report link (→ note.com)
- Member recruitment call-to-action

### `contact.html` — Contact Form

Integrates with **Google Forms** via a hidden iframe pattern:
- Form action URL posts to Google Forms
- Fields: Name (`entry.1706845888`), Email (`entry.127583046`), Message (`entry.1469060305`)
- On submit, redirects to `contact-thankyou.html`

### `content.html` / `faq.html` — Accordion Pages

These pages use an accordion UI component:
- CSS: `accordtion.css`
- JS: Inline `<script>` block that toggles `aria-expanded` and `hidden` attributes
- Pattern: `<button class="accordion-btn">` + `<div class="accordion-content">`

---

## Important Modules

### 1. Header / Navigation System

Two header sections coexist in every page:

| Section | Selector | Visible When |
|---|---|---|
| Desktop navigation | `.header-1200` | Viewport ≥ 1400px |
| Mobile navigation | `.header-768` | Viewport < 1400px |

The mobile navigation uses a **checkbox-based drawer** pattern:
- `<input type="checkbox" id="drawer_input">` toggles the menu
- CSS pseudo-class `#drawer_input:checked ~ .nav_content` slides the drawer in
- Hamburger icon is built with CSS pseudo-elements (`::before`, `::after`)

### 2. CSS Layout System

Each CSS file is structured in the same order:
1. **Universal reset** (`* { padding: 0; margin: 0; }`)
2. **Desktop header** (`@media min-width: 1400px`)
3. **Tablet header** (`@media 1068px – 1399.98px`)
4. **Mobile header** (`@media max-width: 1067.98px`)
5. **Main content** (general + per-breakpoint)
6. **Footer** (per-breakpoint)

### 3. Accordion Component

Used in `content.html`, `faq.html`, and `2023.html`:
- Shared CSS: `accordtion.css`
- JS: Inline script (identical copy in each page)
- Accessibility: ARIA roles (`role="list"`, `role="listitem"`, `role="region"`)

### 4. Google Forms Integration

In `contact.html`:
- `<form>` POSTs to a Google Forms response endpoint
- Hidden `<iframe>` captures the response
- `onsubmit="submitted=true;"` flag triggers redirect on iframe load

---

## Dependency Relationships

```
                     ┌─────────────┐
                     │  jQuery CDN │  (3.4.1)
                     └──────┬──────┘
                            │
                            ▼
                     ┌─────────────┐
             ┌──────▶│  script.js  │◀──────┐
             │       └─────────────┘       │
             │              │              │
    ┌────────┴─────┐  ┌────┴────┐  ┌──────┴───────┐
    │  index.html  │  │ *.html  │  │ contact.html │
    │  index.css   │  │ *.css   │  │ contact.css  │
    └──────────────┘  └─────────┘  │ Google Forms │
                                   └──────────────┘

    Pages using accordions also depend on:
    ┌──────────────────┐
    │ accordtion.css   │  ← shared accordion styles
    │ inline <script>  │  ← accordion toggle logic (copied per page)
    └──────────────────┘
```

### External Dependencies

| Dependency | Type | URL |
|---|---|---|
| jQuery 3.4.1 | JS CDN | `https://code.jquery.com/jquery-3.4.1.min.js` |
| Google Forms | API | `https://docs.google.com/forms/...` |
| Instagram | External link | `https://instagram.com/kigyo.toshi` |
| X (Twitter) | External link | `https://x.com/kigyo_toshi` |
| note | External link | `https://note.com/kigyo_toshi` |

---

## How the System Works

### Page Lifecycle

1. Browser loads `*.html`
2. CSS file is parsed → header, main, footer rendered
3. Media queries evaluate viewport width → appropriate header section is displayed
4. jQuery and `script.js` load (though `script.js` is missing from the repository)
5. For accordion pages: inline script attaches click handlers to accordion buttons
6. User interaction:
   - Navigation links → full-page reload to another HTML file
   - Hamburger menu → checkbox toggle → CSS transition slides drawer
   - Accordion → JS toggles `aria-expanded` / `hidden` attributes
   - Contact form → POST to Google Forms → redirect to thank-you page

### No Build System

There is no bundler, preprocessor, or framework. To develop:
1. Edit HTML/CSS/JS files directly
2. Open in browser (or use a local server like `python -m http.server`)
3. Push to GitHub → GitHub Pages serves updated files
