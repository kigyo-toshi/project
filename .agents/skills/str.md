# str.md — プロジェクト構造ガイド

> 本プロジェクトを読み解くためのカギとなる情報をまとめたファイルです。

---

## ファイルツリー

```
project/
├── .agents/                    ← AI・開発者向けドキュメント
│   ├── CLAUDE.md               ← AI統合指示書（全ルールの集約）
│   ├── README.md               ← プロジェクト読解ガイド（日本語）
│   ├── .content/               ← コンテンツ管理（Single Source of Truth）
│   │   ├── README.md           ← .contentディレクトリの使い方
│   │   ├── site.md             ← サイト共通情報
│   │   ├── index.md            ← トップページ
│   │   ├── content.md          ← 活動内容
│   │   ├── achievement.md      ← 活動実績
│   │   ├── members.md          ← メンバー情報
│   │   ├── information.md      ← プロジェクト情報
│   │   ├── faq.md              ← よくある質問
│   │   └── contact.md          ← お問い合わせ
│   └── .skills/                ← リスク管理文書
│       └── Maintenance_Risks.md
│
├── index.html / index.css              ← ホームページ
├── content.html / content.css          ← 活動内容（アコーディオン）
├── achievement.html / achievement.css  ← 活動実績（カードグリッド）
├── member.html / member.css            ← メンバー・OB紹介
├── information.html / information.css  ← プロジェクト概要
├── faq.html / faq.css                  ← よくある質問（アコーディオン）
├── contact.html / contact.css          ← お問い合わせフォーム
├── contact-thankyou.html / .css        ← 送信完了ページ
├── 2023.html / 2023.css                ← 2023年度活動
├── 2024.html / 2024.css                ← 2024年度（未使用）
├── 2025.html / 2025.css                ← 2025年度（未使用）
│
├── common.css              ← ★ 共通スタイル（レイアウト・ブレークポイント）
├── accordtion.css           ← ★ アコーディオンコンポーネント
├── components.js            ← ★ ヘッダー/フッター動的生成
├── sitemap.xml              ← 検索エンジン用サイトマップ
├── README.md                ← リポジトリ説明
└── img/                     ← 画像アセット
```

---

## 読み解くカギ① — DOMの仕組み

### ヘッダー/フッターは `components.js` で生成される

各HTMLファイルのヘッダー・フッターはすべて空のプレースホルダーです：

```html
<header id="site-header"></header>
<footer id="site-footer"></footer>
```

`components.js` が `DOMContentLoaded` 時にこれらを動的に埋めます。ナビゲーション項目やSNSリンクを変更したい場合は、HTMLではなく `components.js` の `NAV_ITEMS` / `SNS_LINKS` 配列を編集してください。

### アコーディオン（展開UI）

`content.html`, `faq.html`, `2023.html` で使用されています。

```
ボタン:  <button class="accordion-btn" aria-expanded="false">
パネル:  <div class="accordion-content" hidden>
CSS:     accordtion.css
JS:      各ページのインライン <script> ブロック
```

---

## 読み解くカギ② — CSSの構成

```
common.css  ─────────────────────────────────
  ├── * { padding:0; margin:0 }    ← ユニバーサルリセット
  ├── @media (min-width:1400px)    ← デスクトップヘッダー
  ├── @media (1068–1399.98px)      ← タブレットヘッダー
  ├── @media (max-width:1067.98px) ← モバイルヘッダー
  └── footer × 3 ブレークポイント
  
pagename.css ────────────────────────────────
  └── main セクションのスタイルのみ

accordtion.css ──────────────────────────────
  └── グラスモーフィズム風アコーディオン
```

**ルール:** 共有レイアウト → `common.css`。ページ固有 → `pagename.css`。

---

## 読み解くカギ③ — コンテンツの流れ

```
.agents/.content/*.md  （テキスト情報の正）
       │
       │  AIが読み込み・整形
       ▼
   *.html の <main> セクション  （表示用HTML）
```

コンテンツの更新は必ず `.content` → HTML の順で行います。ユーザーが `.content` に雑に書いた内容でも、AIが整形して書き戻し、適切なHTMLに変換します。

---

## 読み解くカギ④ — Google Forms 連携

`contact.html` のフォームは Google Forms に POST します：

| フィールド | entry ID |
| --- | --- |
| 名前 | `entry.1706845888` |
| メールアドレス | `entry.127583046` |
| メッセージ | `entry.1469060305` |

送信後、隠し `<iframe>` 経由でレスポンスを受け取り、`contact-thankyou.html` にリダイレクトします。

---

## 読み解くカギ⑤ — 外部依存関係

| 依存 | 種類 | 備考 |
| --- | --- | --- |
| jQuery 3.4.1 | CDN | 全ページ。実際の使用箇所は `script.js`（リポジトリに存在しない） |
| Google Forms | API | `contact.html` のフォーム送信先 |
| `components.js` | 自作 | ヘッダー/フッター動的注入 |
| `script.js` | 自作 | **リポジトリに存在しない**（参照のみ） |

---

## 読み解くカギ⑥ — レスポンシブ対応

3段階のブレークポイント：

| 幅 | ヘッダー | 備考 |
| --- | --- | --- |
| ≥ 1400px | `header-1200` | フルナビ + SNSアイコン |
| 1068–1399px | `header-768` | 水平ナビ（SNS非表示） |
| < 1068px | `header-768` | ハンバーガーメニュー（チェックボックスドロワー） |
