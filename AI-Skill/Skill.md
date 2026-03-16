---
name: Kigyo-Toshi Website Contributor Skill
description: >
  AI skill for contributing to the Waseda University Entrepreneurship & Investment Project
  (起業・投資プロジェクト) static website. Covers the project conventions, structure,
  styling rules, and best practices for adding pages, updating content, and maintaining
  consistency across the site.
---

# Kigyo-Toshi Website Contributor Skill

## Overview

This repository is the **official website** for the Waseda University Senior High School
Entrepreneurship & Investment Project (早稲田大学高等学院「起業・投資プロジェクト」).
It is a purely static site hosted on **GitHub Pages** at
`https://kigyo-toshi.github.io/project/`.

The site is written in plain **HTML + CSS + vanilla JavaScript**, with jQuery 3.4.1
loaded via CDN. There is no build step or bundler — files are served as-is.

---

## When to Use This Skill

Use this skill when you need to:

- **Add a new page** to the website (e.g. a new yearly activity page).
- **Update existing content** such as member profiles, FAQ items, or achievement records.
- **Fix a layout or styling issue** across one or more pages.
- **Refactor CSS** to reduce duplication or improve responsiveness.
- **Extend the navigation** with new menu items or social links.
- **Update the contact form** or change the Google Forms integration.
- **Improve accessibility** (ARIA attributes, alt texts, semantic HTML).
- **Maintain SEO** (Open Graph tags, sitemap, meta descriptions).

---

## Project Conventions

### File Naming

| Pattern | Purpose |
|---|---|
| `*.html` | Each HTML file is a standalone page |
| `*.css` | Each page has a dedicated CSS file with the same basename |
| `accordtion.css` | Shared accordion component styles (note: filename has a typo) |
| `script.js` | Shared JavaScript (loaded via CDN jQuery + this file) |
| `img/` | All image assets (SVG, PNG) |
| `sitemap.xml` | Search-engine sitemap |

### HTML Structure

Every page follows this skeleton:

```
<!DOCTYPE html>
<html lang="ja">
  <head>
    <!-- Meta block (charset, viewport, OG tags, Google verification) -->
    <!-- Page-specific CSS link -->
  </head>
  <body>
    <header>
      <section class="header-1200">  <!-- Desktop nav (≥1400px) -->
      <section class="header-768">   <!-- Tablet/Mobile nav (<1400px) -->
    </header>
    <main>
      <!-- Page content -->
    </main>
    <aside class=""></aside>          <!-- Currently unused -->
    <footer>
      <!-- Logo + nav links + SNS links + copyright -->
    </footer>
    <!-- jQuery CDN -->
    <!-- script.js -->
  </body>
</html>
```

### Responsive Breakpoints

The site uses three media-query tiers (defined in each CSS file):

| Breakpoint | Target |
|---|---|
| `min-width: 1400px` | Large desktop — shows `header-1200`, hides `header-768` |
| `1068px – 1399.98px` | Tablet / small desktop — shows `header-768` with horizontal nav |
| `max-width: 1067.98px` | Mobile — shows `header-768` with hamburger drawer menu |

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Background (dark) | `#1f1f1f` | Header, footer |
| Background (main) | `#2f2f2f` | Main content area |
| Text (white) | `#ffffff` | Body text, links |
| Text (muted) | `#afafaf` | Headings (h2, h3) |
| Accordion bg | `#000000` | Accordion buttons/panels |

### Navigation Links

All pages share the same six navigation items:

1. 活動内容 → `content.html`
2. 活動実績 → `achievement.html`
3. メンバー → `member.html`
4. プロジェクト情報 → `information.html`
5. よくある質問 → `faq.html`
6. お問い合わせ → `contact.html`

### SNS Links

- Instagram: `https://instagram.com/kigyo.toshi`
- X (Twitter): `https://x.com/kigyo_toshi`
- note: `https://note.com/kigyo_toshi`

---

## Best Practices for Contributing

### Adding a New Page

1. Create `newpage.html` by copying an existing page (e.g. `information.html`) as a template.
2. Create `newpage.css` by copying the corresponding CSS and adjusting the main-content styles.
3. Update the header/footer navigation in **every existing HTML file** to include the new link.
4. Add the new URL to `sitemap.xml`.
5. If the page uses accordions, include `<link rel="stylesheet" href="accordtion.css">` and the inline accordion script.

### Editing Content

- Content is plain HTML — edit the `<main>` section of the relevant page directly.
- Member profiles live in `member.html` inside `<div class="member2">` blocks.
- FAQ accordion items are in `faq.html` and `content.html` — follow the existing `accordion-item` pattern.
- Achievement records are in `achievement.html`.

### CSS Guidelines

- **Each page owns its CSS file.** If a layout change applies globally, you must update every CSS file.
- Avoid introducing inline styles; use class-based CSS instead.
- When modifying shared layout (header/footer), test at all three breakpoints.
- Use `clamp()` for fluid sizing where appropriate (already used in `index.css` header).

### Accessibility

- Use ARIA attributes on interactive elements (see accordion in `content.html` / `faq.html`).
- Always include `alt` text on `<img>` tags.
- Use semantic elements (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`).

### Testing

- Open each HTML file directly in a browser (no server required).
- Test responsive behaviour at widths: 1400px+, 1068–1399px, and <1068px.
- Verify the hamburger menu opens/closes correctly on narrow viewports.
- Check that the contact form submits to the correct Google Forms endpoint.

### Deployment

The site is deployed automatically via GitHub Pages from the repository's default branch.
Simply push changes and the site updates within minutes.
