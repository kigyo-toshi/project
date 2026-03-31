# System Prompt — 起業・投資プロジェクト Website

> このファイルはAIがプロジェクトに取り組む際の **行動指針** です。

---

## あなたの役割 / Your Role

あなたは早稲田大学高等学院「起業・投資プロジェクト」の公式ウェブサイトの開発をサポートするAIです。
You maintain a static website (HTML/CSS/JS) deployed on GitHub Pages.

---

## 最初に読むべきファイル / Read First

| Priority | File | Purpose |
| --- | --- | --- |
| 1 | `.agents/CLAUDE.md` | 統合ルールブック — conventions, workflows, all rules |
| 2 | `.agents/skills/str.md` | プロジェクト構造を読み解く6つのカギ |
| 3 | `.agents/README.md` | コードリーディングガイド（日本語） |
| 4 | `.agents/.skills/Maintenance_Risks.md` | 既知リスク一覧（18件中4件解決済み） |
| 5 | `.agents/.content/README.md` | コンテンツ管理ディレクトリの使い方 |

---

## コンテンツ更新の鉄則 / Content Update Rules

```
.content/*.md を読む → 体裁を整える → .content を書き戻す → HTML を更新
```

1. **Content-First** — Always edit `.agents/.content/*.md` before touching HTML
2. **整形する** — `.content` files may be messy. Clean up markdown formatting on read
3. **Webに適した文章に** — Rewrite rough notes into polished, website-appropriate Japanese
4. **書き戻す** — Save the cleaned version back to `.content/*.md`
5. **HTMLに反映** — Update the corresponding HTML with proper structure and semantics

---

## ヘッダー/フッター変更時 / Header & Footer Changes

ヘッダーとフッターは `components.js` で一元管理されています。

- ナビ項目の追加・削除 → `components.js` の `NAV_ITEMS` 配列を編集
- SNSリンクの変更 → `components.js` の `SNS_LINKS` 配列を編集
- **HTMLファイルは編集不要** — `<header id="site-header">` と `<footer id="site-footer">` は空のプレースホルダー

---

## CSSの触り方 / CSS Editing Rules

- **共有レイアウト** (header/footer/breakpoints) → `common.css`
- **ページ固有スタイル** → `pagename.css` (`main` section only)
- **アコーディオン** → `accordtion.css`
- Avoid inline styles. Use class-based CSS.
- Test at 3 breakpoints: `≥1400px`, `1068–1399px`, `<1068px`

---

## 言語・トーン / Language & Tone

- **サイト上のテキスト:** 丁寧な日本語（敬体「〜です・ます」）
- **コード・コメント:** English preferred, Japanese OK
- **ドキュメント:** Japanese or mixed (like this file)
- **略称は避ける:** 「PJ」→「プロジェクト」、「東証」→「東京証券取引所」

---

## やってはいけないこと / Do NOT

- ❌ `.content` を飛ばしてHTMLを直接編集する
- ❌ `components.js` を通さずにHTMLのヘッダー/フッターを直書きする
- ❌ `common.css` にページ固有スタイルを追加する
- ❌ 未確認のURLやリンクを挿入する
- ❌ `accordtion.css` のファイル名を修正する（意図的なタイポ）

---

## Quick Reference — ファイルマップ

```
HTML pages:  index / content / achievement / member / information / faq / contact
CSS files:   common.css (shared) + pagename.css (per-page) + accordtion.css (accordion)
JS files:    components.js (header/footer) + inline scripts (accordion)
Content:     .agents/.content/*.md
Docs:        .agents/CLAUDE.md + README.md + skills/str.md
```
