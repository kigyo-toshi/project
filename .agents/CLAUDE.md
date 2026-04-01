# CLAUDE.md — AI Contributor Guide for Kigyo-Toshi Website

> This file is the **single AI instruction document** for this project.
> It merges all previous skill docs (Skill.md, Skill_Jp.md, Code_reading_Eng.md) into one.

---

## Overview

This repository is the **official website** for the Waseda University Senior High School
Entrepreneurship & Investment Project (早稲田大学高等学院「起業・投資プロジェクト」).

- **Hosting:** GitHub Pages → `https://kigyo-toshi.github.io/project/`
- **Tech:** Plain HTML + CSS + vanilla JavaScript + jQuery 3.4.1 (CDN)
- **Build system:** None — files are served as-is
- **Language:** Japanese (日本語)

---

## When to Activate

Use this context when you need to:

- Add a new page or update existing content
- Fix layout, styling, or accessibility issues
- Refactor CSS or extend navigation
- Update the contact form or Google Forms integration
- Maintain SEO (Open Graph, sitemap, meta tags)

---

## Content Management System (`.agents/.content/`)

**All site text is managed in `.agents/.content/`.** This is the Single Source of Truth.

| Content File | Manages | Target HTML |
| --- | --- | --- |
| `site.md` | Global info (SNS, nav, meta, copyright) | All pages (via `components.js`) |
| `index.md` | Home page (About, Vision, recruitment) | `index.html` |
| `content.md` | Activity descriptions (accordion items) | `content.html` |
| `achievement.md` | Yearly achievement records | `achievement.html` |
| `members.md` | Member & OB profiles | `member.html` |
| `information.md` | Project overview | `information.html` |
| `faq.md` | FAQ Q&A pairs | `faq.html` |
| `contact.md` | Contact form & Google Forms config | `contact.html`, `contact-thankyou.html` |

### Content Update Workflow

1. **Read** the relevant `.content/*.md` file
2. **Clean up formatting** if messy:
   - Normalize heading levels (`#`, `##`, `###`)
   - Fix bullet lists and tables to valid Markdown
   - Correct mixed half/full-width spaces, extra blank lines
   - Mark missing info with `（未記入）`
3. **Edit** the `.content/*.md` file with new content (always save in clean state)
4. **Rewrite for web** — polish the language to be appropriate for a public-facing website
5. **Update HTML** to match — even if `.content` is rough, HTML must use proper structure
6. **Write back** — overwrite the `.content` file with the cleaned version
7. If shared elements change (nav, SNS, copyright), update `site.md` and `components.js`

---

## Project Conventions

### File Layout

| Pattern | Purpose |
| --- | --- |
| `*.html` | Each HTML file = one page |
| `*.css` | Matching CSS for each page (same basename) |
| `common.css` | Shared header/footer/reset styles |
| `components.js` | Shared header/footer HTML generator (dynamic injection) |
| `accordtion.css` | Shared accordion component styles (note: filename typo is intentional) |
| `img/` | All image assets (SVG, PNG) |
| `sitemap.xml` | Search-engine sitemap |
| `.agents/.content/` | Content source files |

### HTML Skeleton

Every page follows:

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <!-- Meta (charset, viewport, OG tags, Google verification) -->
    <!-- CSS: common.css → page-specific.css [→ accordtion.css if needed] -->
  </head>
  <body>
    <header id="site-header"></header>   <!-- Injected by components.js -->
    <main>
      <!-- Page content -->
    </main>
    <footer id="site-footer"></footer>   <!-- Injected by components.js -->
    <script src="components.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js" ...></script>
    <script src="script.js"></script>
  </body>
</html>
```

### Header/Footer System

Header and footer are **dynamically generated** by `components.js`:

- Navigation items and SNS links are defined once in `components.js`
- Each HTML file has `<header id="site-header"></header>` and `<footer id="site-footer"></footer>`
- To add a nav item or SNS link, edit **only** `components.js`

`components.js` generates two header variants:

| Section | Selector | Visible When |
| --- | --- | --- |
| Desktop | `.header-1200` | Viewport ≥ 1400px |
| Mobile | `.header-768` | Viewport < 1400px |

### Responsive Breakpoints

| Breakpoint | Target |
| --- | --- |
| `min-width: 1400px` | Large desktop |
| `1068px – 1399.98px` | Tablet / small desktop |
| `max-width: 1067.98px` | Mobile (hamburger drawer) |

### Color Palette

| Token | Hex | Usage |
| --- | --- | --- |
| Background (dark) | `#1f1f1f` | Header, footer |
| Background (main) | `#2f2f2f` | Main content area |
| Text (white) | `#ffffff` | Body text, links |
| Text (muted) | `#afafaf` | Headings (h2, h3) |

---

## Best Practices

### Adding a New Page

1. Copy an existing page (e.g. `information.html`) as a template
2. Create matching CSS file
3. Add nav link in `components.js` (`NAV_ITEMS` array)
4. Add URL to `sitemap.xml`
5. If accordion is needed, link `accordtion.css` and add inline accordion script

### CSS Rules

- Shared layout → `common.css`
- Page-specific → `pagename.css` (only `main` content styles)
- Avoid inline styles; use class-based CSS
- Test at all three breakpoints
- Use `clamp()` for fluid sizing where appropriate

### Accessibility

- ARIA attributes on interactive elements (`accordion-btn`, `accordion-content`)
- `alt` text on all `<img>` tags
- Semantic elements (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`)

### Testing & Deployment

- Open HTML files directly in browser (no server required)
- Test at 1400px+, 1068–1399px, <1068px
- Push to GitHub → GitHub Pages auto-deploys within minutes

---

## External Dependencies

| Dependency | Type | URL |
| --- | --- | --- |
| jQuery 3.4.1 | JS CDN | `https://code.jquery.com/jquery-3.4.1.min.js` |
| Google Forms | API | `https://docs.google.com/forms/...` |
| Instagram | Link | `https://instagram.com/kigyo.toshi` |
| X (Twitter) | Link | `https://x.com/kigyo_toshi` |
| note | Link | `https://note.com/kigyo_toshi` |

---

## Known Issues & Risks

See `.agents/.skills/Maintenance_Risks.md` for the full risk register (18 items, 4 resolved).
