# Maintenance Risks / 保守リスク分析

This document identifies maintainability risks found during a full audit of the codebase.
**No code modifications have been made.** Each item includes a recommended improvement.

---

## 🔴 Critical — High Impact

### 1. ~~Massive CSS Duplication (Header / Footer / Media Queries)~~ ✅ Resolved

**Status: RESOLVED** — Shared header/footer/media-query styles have been extracted into `common.css`. All 9 page CSS files now contain only page-specific styles, and all HTML files link `common.css` before their page-specific CSS.

**Original Problem:** Every CSS file contained ~600+ lines of duplicated header/footer/media-query blocks.

**What was done:**

- Created `common.css` with all shared header (3 media-query tiers), footer (3 media-query tiers), and universal reset styles.
- Stripped duplicated blocks from all 9 CSS files (`index.css`, `content.css`, `achievement.css`, `member.css`, `information.css`, `faq.css`, `contact.css`, `contact-thankyou.css`, `2023.css`).
- Added `<link rel="stylesheet" href="common.css">` to all 9 HTML files before their page-specific CSS.

---

### 2. ~~Header / Footer HTML Duplicated Across All Pages~~ ✅ Resolved

**Problem:** The full `<header>` and `<footer>` HTML blocks (including navigation, SNS links, copyright) were copy-pasted into every HTML file. Any nav change required editing all HTML files.

**Risk:** Inconsistencies existed — e.g., `contact.html` footer used `note.svg` while all others used `note.png`, and Instagram `igshid` parameters differed between header and footer.

**Resolution:**

- Created `components.js` which dynamically generates header and footer HTML from a single data source.
- All 9 HTML files now use `<header id="site-header"></header>` and `<footer id="site-footer"></footer>` placeholders.
- Navigation items, SNS links, and copyright text are defined once in `components.js`.
- The `note.svg` / `note.png` inconsistency and `igshid` parameter inconsistency were fixed simultaneously.

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

### 11. ~~Invalid CSS `font-weight: 5`~~ ✅ Resolved

**Status: RESOLVED** — All instances of `font-weight: 5` have been corrected to `font-weight: 500` in `common.css` (the shared styles file where these rules now live).

**Original Problem:** Multiple CSS files used `font-weight: 5`, which is not a valid CSS value.

---

### 12. ~~Invalid CSS `background-color: linear-gradient(...)`~~ ✅ Resolved

**Status: RESOLVED** — Changed to `background: linear-gradient(...)` in `common.css` (the shared styles file where this rule now lives).

**Original Problem:** `background-color: linear-gradient(...)` was used instead of `background: linear-gradient(...)`, preventing the gradient from rendering.

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

| Severity | Count | Resolved | Key Theme |
|---|---|---|---|
| 🔴 Critical | 3 | 2 ✅ | CSS duplication + HTML duplication resolved; missing `script.js` remains |
| 🟠 High | 4 | 0 | Stale sitemap, empty pages, broken HTML, inline script copies |
| 🟡 Medium | 7 | 2 ✅ | `font-weight: 5` + `background-color: linear-gradient` fixed; 5 remain |
| 🟢 Low | 4 | 0 | Unused jQuery, missing alt text, favicon, tracking params |
| **Total** | **18** | **4 ✅** | |
