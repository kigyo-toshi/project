# コードリーディングガイド — 起業投資プロジェクト ウェブサイト

## プロジェクトアーキテクチャ

本プロジェクトは、ビルドシステム、フレームワーク、サーバーサイドロジックを持たない
**マルチページ静的ウェブサイト**です。各ページは専用のCSSファイルを持つ独立したHTMLファイルです。
サイトはGitHub Pagesでデプロイされています。

```
project/
├── index.html              ← ランディングページ（ホーム）
├── index.css
├── content.html            ← 活動内容ページ
├── content.css
├── achievement.html        ← 活動実績ページ
├── achievement.css
├── member.html             ← メンバー・OBページ
├── member.css
├── information.html        ← プロジェクト概要ページ
├── information.css
├── faq.html                ← よくある質問ページ
├── faq.css
├── contact.html            ← お問い合わせフォーム（Google Forms）
├── contact.css
├── contact-thankyou.html   ← フォーム送信後のサンクスページ
├── contact-thankyou.css
├── 2023.html / 2023.css    ← 年度別活動ページ（2023年度）
├── 2024.html / 2024.css    ← 年度別活動ページ（空ファイル）
├── 2025.html / 2025.css    ← 年度別活動ページ（空ファイル）
├── accordtion.css          ← 共有アコーディオンコンポーネントのスタイル
├── script.js               ← 共有JS（参照されているがリポジトリに存在しない）
├── sitemap.xml             ← 検索エンジン用サイトマップ
├── README.md               ← 簡単なプロジェクト説明
└── img/                    ← 画像アセット
    ├── logo.svg            ← メインサイトロゴ
    ├── logo-aikon.svg      ← OG画像 / ファビコンソース
    ├── logo2.png           ← 代替ロゴ
    ├── firstview.svg/png   ← ヒーローバナー画像
    ├── instagram.png       ← SNSアイコン
    ├── twitter.png         ← SNSアイコン
    ├── note.png / note.svg ← SNSアイコン（2フォーマット存在）
    ├── suzukidaiki.png     ← メンバー写真
    ├── suzuki.png          ← メンバー写真
    ├── murata.png          ← メンバー写真
    ├── kashima.png         ← メンバー写真
    └── poster.png          ← イベントポスター
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

### 1. ヘッダー / ナビゲーションシステム

2つのヘッダーセクションがすべてのページに共存しています：

| セクション | セレクター | 表示条件 |
|---|---|---|
| デスクトップナビ | `.header-1200` | ビューポート幅 ≥ 1400px |
| モバイルナビ | `.header-768` | ビューポート幅 < 1400px |

モバイルナビは**チェックボックスベースのドロワー**パターンを使用：
- `<input type="checkbox" id="drawer_input">` でメニューを切り替え
- CSS疑似クラス `#drawer_input:checked ~ .nav_content` でドロワーをスライドイン
- ハンバーガーアイコンはCSS疑似要素（`::before`, `::after`）で構築

### 2. CSSレイアウトシステム

各CSSファイルは同じ順序で構成されています：
1. **ユニバーサルリセット**（`* { padding: 0; margin: 0; }`）
2. **デスクトップヘッダー**（`@media min-width: 1400px`）
3. **タブレットヘッダー**（`@media 1068px – 1399.98px`）
4. **モバイルヘッダー**（`@media max-width: 1067.98px`）
5. **メインコンテンツ**（共通 + ブレークポイント別）
6. **フッター**（ブレークポイント別）

### 3. アコーディオンコンポーネント

`content.html`、`faq.html`、`2023.html` で使用：
- 共有CSS: `accordtion.css`
- JS: インラインスクリプト（各ページに同一コピー）
- アクセシビリティ: ARIAロール（`role="list"`, `role="listitem"`, `role="region"`）

### 4. Google Formsの統合

`contact.html` にて：
- `<form>` がGoogle Formsのレスポンスエンドポイントに POST
- 隠し `<iframe>` でレスポンスをキャプチャ
- `onsubmit="submitted=true;"` フラグによりiframe読み込み時にリダイレクト

---

## 依存関係

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

    アコーディオンを使用するページはさらに以下に依存：
    ┌──────────────────┐
    │ accordtion.css   │  ← 共有アコーディオンスタイル
    │ インライン<script>│  ← アコーディオン切替ロジック（ページごとにコピー）
    └──────────────────┘
```

### 外部依存関係

| 依存関係 | 種類 | URL |
|---|---|---|
| jQuery 3.4.1 | JS CDN | `https://code.jquery.com/jquery-3.4.1.min.js` |
| Google Forms | API | `https://docs.google.com/forms/...` |
| Instagram | 外部リンク | `https://instagram.com/kigyo.toshi` |
| X (Twitter) | 外部リンク | `https://x.com/kigyo_toshi` |
| note | 外部リンク | `https://note.com/kigyo_toshi` |

---

## システムの動作原理

### ページライフサイクル

1. ブラウザが `*.html` を読み込み
2. CSSファイルがパースされ → ヘッダー、メインコンテンツ、フッターが描画
3. メディアクエリがビューポート幅を評価 → 適切なヘッダーセクションを表示
4. jQuery と `script.js` が読み込まれる（ただし `script.js` はリポジトリに存在しない）
5. アコーディオンページの場合：インラインスクリプトがアコーディオンボタンにクリックハンドラを付与
6. ユーザーインタラクション：
   - ナビリンク → 別のHTMLファイルへフルページリロード
   - ハンバーガーメニュー → チェックボックス切替 → CSSトランジションでドロワーがスライド
   - アコーディオン → JSが `aria-expanded` / `hidden` 属性を切替
   - お問い合わせフォーム → Google FormsへPOST → サンクスページにリダイレクト

### ビルドシステムなし

バンドラー、プリプロセッサー、フレームワークは存在しません。開発手順：
1. HTML/CSS/JSファイルを直接編集
2. ブラウザで開く（またはローカルサーバー例: `python -m http.server` を使用）
3. GitHubにプッシュ → GitHub Pagesが更新されたファイルを配信
