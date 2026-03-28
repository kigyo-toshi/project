# Maintenance Risks / 保守リスク分析

This document identifies maintainability risks found during a full audit of the codebase.
**No code modifications have been made.** Each item includes a recommended improvement.

---

## 🔴 Critical — High Impact

### 1. Massive CSS Duplication (Header / Footer / Media Queries)

**Problem:** Every CSS file (`index.css`, `content.css`, `achievement.css`, `member.css`, `information.css`, `faq.css`, `contact.css`, `contact-thankyou.css`, `2023.css`) contains an almost identical copy of the header, footer, and three-tier media-query blocks. This results in ~600+ lines of duplicate CSS per file.

**Risk:** Changing the header style requires editing 9+ files (and forgetting one breaks consistency). This is the single largest maintenance burden in the project.

**Recommendation:**

- Extract shared header/footer/nav styles into a single `common.css` (or `layout.css`).
- Each page CSS should `@import` or link to `common.css` first, then only define page-specific styles.

---

### 2. Header / Footer HTML Duplicated Across All Pages

**Problem:** The full `<header>` and `<footer>` HTML blocks (including navigation, SNS links, copyright) are copy-pasted into every HTML file. Any nav change (e.g., adding a page) requires editing all 11 HTML files.

**Risk:** Inconsistencies already exist — e.g., `contact.html` footer uses `note.svg` while all others use `note.png`.

**Recommendation:**

- Use JavaScript includes, an SSG (e.g., 11ty/Hugo), or HTML `<template>` + Web Components to share header/footer across pages.
- At minimum, keep a single "canonical" template and use a script to synchronise changes.

---

### 3. `script.js` Referenced but Missing from Repository

**Problem:** Every HTML file loads `<script type="text/javascript" src="script.js"></script>`, but there is **no `script.js` file** in the repository.

**Risk:** Browser console error on every page. If the file previously existed and was deleted, functionality may be silently broken.

**Recommendation:**

- If `script.js` is needed, add it to the repository.
- If it is no longer needed, remove the `<script>` tag from all HTML files.

---

## 🟠 High — Should Fix Soon

### 4. Accordion Script Copy-Pasted Inline (3 pages)

**Problem:** The identical accordion toggle script (15 lines) is embedded inline in `content.html`, `faq.html`, and `2023.html`.

**Risk:** Bug fixes or enhancements must be applied in 3 places. Easy to miss one.

**Recommendation:**

- Extract this script into a shared file, e.g. `accordion.js`, and link it from the pages that need it.

---

### 5. Stale Sitemap (`sitemap.xml`)

**Problem:** The sitemap references pages that do not exist:

- `service.html` — no such file in the repo
- `kigyo.html` — no such file in the repo
- Missing many actual pages: `content.html`, `achievement.html`, `member.html`, `faq.html`, `information.html`
- `lastmod` dates are stuck at 2023-08-17

**Risk:** Search engine crawlers receive wrong information, potentially hurting SEO.

**Recommendation:**

- Regenerate `sitemap.xml` to include all actual pages with correct `lastmod` dates.
- Remove entries for non-existent pages (`service.html`, `kigyo.html`).

---

### 6. Empty Year Pages (`2024.html`, `2025.html`)

**Problem:** Both `2024.html` and `2025.html` are completely empty files (0 bytes). Their corresponding CSS files (`2024.css`, `2025.css`) also exist.

**Risk:** If someone navigates to these URLs, they see a blank page. They are also not linked from any navigation, creating phantom pages.

**Recommendation:**

- Either populate them with placeholder "Under Construction" content (like `2023.html`), or delete them until ready.

---

### 7. Broken HTML Structure in `achievement.html` and `member.html`

**Problem:** Both files have an extra orphan `</section>` closing tag:

```html
        </section>
        </section>  <!-- ← Extra closing tag, no matching opening -->
```

**Risk:** Browsers may silently handle this, but it could cause unexpected rendering in edge cases.

**Recommendation:**

- Remove the extra `</section>` tags.

---

## 🟡 Medium — Improve When Possible

### 8. Duplicate `id` in `contact.html` Form

**Problem:** Two input fields share `id="field-name"`:

```html
<input ... id="field-name" placeholder="お名前" ... />
<input ... id="field-name" placeholder="メールアドレス" ... />
```

**Risk:** HTML `id` must be unique. This breaks `<label for="...">` association and may confuse accessibility tools.

**Recommendation:**

- Change the email field's id to `id="field-mail"` (matching its `<label for="field-mail">`).

---

### 9. Commented-Out Dead Code Everywhere

**Problem:** Large blocks of commented-out HTML exist across multiple files:

- `index.html` lines 59-75 (mobile SNS links)
- `faq.html` lines 110-172 (5+ commented-out FAQ items)
- `content.html` lines 126-133 (commented-out accordion item)
- `member.html` lines 92-97, 142, 150, 159, 174-177 (various commented-out sections)
- `achievement.html` lines 92-97, 107-117 (old content + achievement data)

**Risk:** Makes files harder to read and maintain. Developers may be unsure whether the code is "temporarily disabled" or "permanently removed."

**Recommendation:**

- Remove commented-out code that has been superseded.
- Use Git history to recover old code if needed in the future.

---

### 10. Empty `<aside>` Element on Every Page

**Problem:** Every page contains `<aside class=""></aside>` which renders nothing.

**Risk:** Unnecessary markup, and the empty `class=""` attribute is a code smell.

**Recommendation:**

- Remove the `<aside>` elements unless sidebar content is planned.

---

### 11. Invalid CSS `font-weight: 5`

**Problem:** Multiple CSS files use `font-weight: 5`, which is not a valid CSS value. Valid values are `100` through `900` (multiples of 100), or keywords like `normal`, `bold`.

**Files affected:** `index.css` (lines 202, 363, 668, 761), and corresponding rules in other CSS files.

**Risk:** Browser will ignore or fall back to default, causing inconsistent font rendering.

**Recommendation:**

- Change `font-weight: 5` to `font-weight: 500` (or the intended value).

---

### 12. Invalid CSS `background-color: linear-gradient(...)`

**Problem:** In `index.css` line 237:

```css
background-color: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
```

`linear-gradient()` must use the `background` or `background-image` property, not `background-color`.

**Risk:** The gradient will not render; the element will have no visible background.

**Recommendation:**

- Change to `background: linear-gradient(...)` or `background-image: linear-gradient(...)`.

---

### 13. Inconsistent `<ul class>` Attribute in Footers

**Problem:** Footer navigation lists use `<ul class>` (missing the `=` and value), e.g.:

```html
<ul class>
```

This is technically valid HTML (empty attribute), but is inconsistent with the rest of the code.

**Recommendation:**

- Change to `<ul>` (remove the empty attribute) or `<ul class="footer-nav">`.

---

### 14. Typo in Shared CSS Filename

**Problem:** The accordion stylesheet is named `accordtion.css` (extra "t"). This is misspelled from "accordion."

**Risk:** Confusing for new contributors; must remember the misspelling.

**Recommendation:**

- Rename to `accordion.css` and update all `<link>` references in `content.html`, `faq.html`, and any other files that import it.

---

## 🟢 Low — Nice to Have

### 15. jQuery Loaded but Potentially Unused

**Problem:** jQuery 3.4.1 is loaded on every page, but the accordion logic uses vanilla `document.querySelectorAll()`. If `script.js` is missing, jQuery may not be needed.

**Risk:** Unnecessary ~87KB download on every page load.

**Recommendation:**

- Audit whether jQuery is actually used. If not, remove the CDN `<script>` tag.

---

### 16. Missing `alt` Text on SNS Icons

**Problem:** SNS icon images (`instagram.png`, `twitter.png`, `note.png`) lack `alt` attributes:

```html
<img src="img/instagram.png">
```

**Risk:** Accessibility issue — screen readers cannot identify the icons.

**Recommendation:**

- Add descriptive alt text: `alt="Instagram"`, `alt="X (Twitter)"`, `alt="note"`.

---

### 17. No Favicon on Most Pages

**Problem:** Only `achievement.html` and `member.html` include a favicon link:

```html
<link rel="icon" href="img/logo2.ico" type="image/x-icon">
```

All other pages show the browser default favicon.

**Recommendation:**

- Add the favicon `<link>` tag to all pages.

---

### 18. Mixed Instagram `igshid` Parameters

**Problem:** Instagram links use two different `igshid` values:

- Desktop header: `igshid=YTQwZjQ0NmI0OA==`
- Footer / mobile: `igshid=MmIzYWVlNDQ5Yg==`

**Risk:** These are tracking parameters and may cause inconsistent analytics or broken links if they expire.

**Recommendation:**

- Standardize to a single, current `igshid` value, or remove the parameter entirely.

---

## Summary

| Severity | Count | Key Theme |
|---|---|---|
| 🔴 Critical | 3 | CSS/HTML duplication, missing `script.js` |
| 🟠 High | 4 | Stale sitemap, empty pages, broken HTML, inline script copies |
| 🟡 Medium | 7 | Duplicate IDs, dead code, invalid CSS, typo in filename |
| 🟢 Low | 4 | Unused jQuery, missing alt text, favicon, tracking params |
| **Total** | **18** | |
