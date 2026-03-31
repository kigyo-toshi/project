# 起業・投資プロジェクト ウェブサイト — コードリーディングガイド

## プロジェクトアーキテクチャ

本プロジェクトは、ビルドシステム・フレームワーク・サーバーサイドロジックを持たない
**マルチページ静的ウェブサイト**です。各ページは専用のCSSファイルを持つ独立したHTMLファイルです。
サイトはGitHub Pagesでデプロイされています。

```
project/
├── common.css              ← ★ 共有レイアウトスタイル（全ページでリンク）
├── components.js           ← ★ ヘッダー/フッターの動的生成（一元管理）
├── accordtion.css          ← ★ 共有アコーディオンコンポーネント
├── index.html / index.css              ← ホームページ
├── content.html / content.css          ← 活動内容ページ
├── achievement.html / achievement.css  ← 活動実績ページ
├── member.html / member.css            ← メンバー・OBページ
├── information.html / information.css  ← プロジェクト概要ページ
├── faq.html / faq.css                  ← よくある質問ページ
├── contact.html / contact.css          ← お問い合わせフォーム
├── contact-thankyou.html / .css        ← フォーム送信完了ページ
├── 2023.html / 2023.css                ← 年度別活動ページ（2023年度）
├── 2024.html / 2024.css                ← 年度別活動ページ（未使用）
├── 2025.html / 2025.css                ← 年度別活動ページ（未使用）
├── sitemap.xml                         ← 検索エンジン用サイトマップ
├── README.md                           ← リポジトリ説明
├── img/                                ← 画像アセット
│   ├── logo.svg            ← メインサイトロゴ
│   ├── logo-aikon.svg      ← OG画像 / ファビコンソース
│   ├── firstview.svg/png   ← ヒーローバナー画像
│   ├── instagram.png       ← SNSアイコン
│   ├── twitter.png         ← SNSアイコン
│   ├── note.png            ← SNSアイコン
│   └── *.png               ← メンバー写真・ポスター等
└── .agents/                ← AI・開発者向けドキュメント
    ├── CLAUDE.md           ← AI統合指示書
    ├── README.md           ← このファイル
    ├── skills/str.md       ← プロジェクト構造ガイド
    ├── .content/           ← コンテンツ管理ディレクトリ
    └── .skills/            ← リスク管理文書
```

---

## 主要エントリーポイント

### `index.html` — ホームページ

主要なエントリーポイントです。以下を含みます：
- ヒーロー画像（`firstview.svg`）
- About セクション
- ビジョンステートメント
- 活動報告リンク（→ note.com）
- メンバー募集の呼びかけ

### `contact.html` — お問い合わせフォーム

**Google Forms** と隠しiframeパターンで連携しています：
- フォームのaction URLがGoogle Formsに POST
- フィールド：氏名（`entry.1706845888`）、メール（`entry.127583046`）、メッセージ（`entry.1469060305`）
- 送信後、`contact-thankyou.html` にリダイレクト

### `content.html` / `faq.html` — アコーディオンページ

アコーディオンUIコンポーネントを使用するページ：
- CSS: `accordtion.css`
- JS: `aria-expanded` と `hidden` 属性を切り替えるインライン `<script>` ブロック
- パターン: `<button class="accordion-btn">` + `<div class="accordion-content">`

---

## 重要モジュール

### 1. ヘッダー / フッター（`components.js`）

ヘッダーとフッターは **`components.js` により動的生成**されます。
各HTMLファイルには空のプレースホルダーだけが存在します：

```html
<header id="site-header"></header>
<footer id="site-footer"></footer>
```

`components.js` が `DOMContentLoaded` イベントで以下を注入します：
- デスクトップヘッダー（`.header-1200`）
- モバイルヘッダー（`.header-768`）+ ハンバーガーメニュー
- フッター（ナビ + SNSリンク + コピーライト）

ナビゲーション項目やSNSリンクの変更は `components.js` の配列を編集するだけで全ページに反映されます。

### 2. CSSレイアウトシステム

CSSは共有ファイルとページ固有ファイルに分割されています：

**`common.css`**（全ページ共有）：
1. ユニバーサルリセット
2. デスクトップヘッダー（`@media min-width: 1400px`）
3. タブレットヘッダー（`@media 1068px – 1399.98px`）
4. モバイルヘッダー（`@media max-width: 1067.98px`）
5. フッター（ブレークポイント別 × 3）

**ページ固有CSS**（例：`index.css`）：
- `main` セクションのスタイルのみ

### 3. アコーディオンコンポーネント

`content.html`、`faq.html`、`2023.html` で使用：
- 共有CSS: `accordtion.css`（グラスモーフィズムデザイン）
- JS: インラインスクリプト（各ページに配置）
- アクセシビリティ: ARIAロール対応

### 4. Google Forms連携

`contact.html` のフォームがGoogle Formsに POST → 隠しiframeでレスポンス受信 → リダイレクト

---

## 依存関係図

```
                     ┌─────────────┐
                     │  jQuery CDN │  (3.4.1)
                     └──────┬──────┘
                            │
                            ▼
┌──────────────┐     ┌─────────────┐
│components.js │────▶│  全ページ   │◀──── common.css
│（ヘッダー/   │     │  *.html     │
│ フッター生成）│     │  *.css      │
└──────────────┘     └──────┬──────┘
                            │
                   ┌────────┼────────┐
                   ▼        ▼        ▼
            ┌──────────┐ ┌────┐ ┌──────────┐
            │ accordion│ │ …  │ │ contact  │
            │ pages    │ │    │ │ (GForms) │
            │+accordtion│ │    │ └──────────┘
            │.css      │ │    │
            └──────────┘ └────┘
```

### 外部依存関係

| 依存関係 | 種類 | URL |
| --- | --- | --- |
| jQuery 3.4.1 | JS CDN | `https://code.jquery.com/jquery-3.4.1.min.js` |
| Google Forms | API | `https://docs.google.com/forms/...` |
| Instagram | 外部リンク | `https://instagram.com/kigyo.toshi` |
| X (Twitter) | 外部リンク | `https://x.com/kigyo_toshi` |
| note | 外部リンク | `https://note.com/kigyo_toshi` |

---

## システムの動作原理

### ページライフサイクル

1. ブラウザが `*.html` を読み込み
2. CSSファイルがパースされ → メインコンテンツが描画
3. `components.js` が実行 → ヘッダー・フッターが注入される
4. メディアクエリがビューポート幅を評価 → 適切なヘッダーセクションを表示
5. アコーディオンページの場合：インラインスクリプトがクリックハンドラを付与
6. ユーザーインタラクション：
   - ナビリンク → 別のHTMLファイルへフルページリロード
   - ハンバーガーメニュー → チェックボックス切替 → CSSトランジションでドロワーがスライド
   - アコーディオン → JSが `aria-expanded` / `hidden` 属性を切替
   - お問い合わせフォーム → Google FormsへPOST → サンクスページにリダイレクト

### ビルドシステムなし

バンドラー、プリプロセッサー、フレームワークは存在しません。開発手順：
1. HTML/CSS/JSファイルを直接編集
2. ブラウザで開く（またはローカルサーバーを使用）
3. GitHubにプッシュ → GitHub Pagesが自動デプロイ
