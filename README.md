# 早稲田大学高等学院「起業・投資プロジェクト」公式ウェブサイト

早稲田大学高等学院 公認団体「起業・投資プロジェクト」の公式ウェブサイトのリポジトリです。

🌐 **公開URL**: [https://kigyo-toshi.github.io/project/](https://kigyo-toshi.github.io/project/)

---

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [技術スタック](#技術スタック)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [ページ一覧](#ページ一覧)
5. [サイト構造・設計](#サイト構造設計)
6. [開発の始め方](#開発の始め方)
7. [ページの追加・編集方法](#ページの追加編集方法)
8. [デプロイ](#デプロイ)
9. [既知の課題・注意点](#既知の課題注意点)
10. [SNS・外部サービス連携](#sns外部サービス連携)

---

## プロジェクト概要

本プロジェクトは、早大学院生がスキルとしてビジネスについて知る機会創出を目指す団体「起業・投資プロジェクト」の公式ウェブサイトです。活動内容・実績・メンバー紹介・FAQ・お問い合わせなどのページで構成されています。

---

## 技術スタック

| 技術 | 詳細 |
|---|---|
| HTML | 各ページが独立した `.html` ファイル（`lang="ja"`） |
| CSS | 各ページに同名の専用 `.css` ファイル（バニラCSS） |
| JavaScript | バニラJS（アコーディオン等）+ jQuery 3.4.1（CDN） |
| ホスティング | GitHub Pages（デフォルトブランチから自動デプロイ） |
| フレームワーク | **なし**（ビルドステップ・バンドラーなし） |
| お問い合わせ | Google Forms 連携（隠しiframeパターン） |

> **ポイント**: ビルドシステムは存在しません。HTML/CSS/JSファイルを直接編集し、GitHubにプッシュするだけでデプロイされます。

---

## ディレクトリ構成

```
project/
├── index.html / index.css          ← トップページ（ホーム）
├── content.html / content.css      ← 活動内容ページ
├── achievement.html / achievement.css ← 活動実績ページ
├── member.html / member.css        ← メンバー・OBページ
├── information.html / information.css ← プロジェクト概要ページ
├── faq.html / faq.css              ← よくある質問ページ
├── contact.html / contact.css      ← お問い合わせフォーム
├── contact-thankyou.html / contact-thankyou.css ← フォーム送信後サンクスページ
├── 2023.html / 2023.css            ← 2023年度活動ページ
├── 2024.html / 2024.css            ← 2024年度（空ファイル）
├── 2025.html / 2025.css            ← 2025年度（空ファイル）
├── accordtion.css                  ← 共有アコーディオンスタイル（※ファイル名タイポ）
├── sitemap.xml                     ← サイトマップ
├── README.md                       ← 本ファイル
├── img/                            ← 画像アセット
│   ├── logo.svg                    ← メインロゴ
│   ├── logo-aikon.svg              ← OG画像用ロゴ
│   ├── logo2.png                   ← 代替ロゴ
│   ├── firstview.svg / firstview.png ← ヒーローバナー画像
│   ├── instagram.png               ← SNSアイコン
│   ├── twitter.png                 ← SNSアイコン
│   ├── note.png / note.svg         ← SNSアイコン
│   ├── suzukidaiki.png / suzuki.png / murata.png / kashima.png ← メンバー写真
│   └── poster.png                  ← イベントポスター
└── .agents/                        ← AI開発支援用ドキュメント
    └── .skills/                    ← AI Skill定義・コード読解ガイド・保守リスク分析
```

---

## ページ一覧

| ページ | ファイル | 説明 |
|---|---|---|
| トップ | `index.html` | ヒーロー画像、About、Vision、活動報告リンク、メンバー募集 |
| 活動内容 | `content.html` | アコーディオンで活動内容を表示 |
| 活動実績 | `achievement.html` | これまでの活動実績 |
| メンバー | `member.html` | メンバー・OBプロフィール |
| プロジェクト情報 | `information.html` | プロジェクト概要 |
| よくある質問 | `faq.html` | アコーディオンでFAQ表示 |
| お問い合わせ | `contact.html` | Google Formsフォーム |
| サンクスページ | `contact-thankyou.html` | フォーム送信完了メッセージ |
| 2023年度活動 | `2023.html` | 年度別活動ページ |
| 2024年度活動 | `2024.html` | **未作成（空ファイル）** |
| 2025年度活動 | `2025.html` | **未作成（空ファイル）** |

---

## サイト構造・設計

### HTML共通構造

すべてのページが以下のスケルトンに従っています：

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <!-- charset, viewport, OGタグ, Google Search Console検証 -->
    <!-- ページ固有のCSSリンク -->
  </head>
  <body>
    <header>
      <section class="header-1200">  <!-- デスクトップナビ（≥1400px） -->
      <section class="header-768">   <!-- タブレット/モバイルナビ（<1400px） -->
    </header>
    <main>
      <!-- ページコンテンツ -->
    </main>
    <footer>
      <!-- ロゴ + ナビリンク + SNSリンク + 著作権表示 -->
    </footer>
    <!-- jQuery CDN -->
    <!-- script.js -->
  </body>
</html>
```

### レスポンシブブレークポイント

| ブレークポイント | 対象デバイス | ヘッダー動作 |
|---|---|---|
| `min-width: 1400px` | 大画面デスクトップ | `header-1200` 表示、`header-768` 非表示 |
| `1068px – 1399.98px` | タブレット / 小型デスクトップ | `header-768` に水平ナビ表示 |
| `max-width: 1067.98px` | モバイル | `header-768` ハンバーガーメニュー表示 |

### カラーパレット

| 用途 | Hex |
|---|---|
| ヘッダー・フッター背景 | `#1f1f1f` |
| メインコンテンツ背景 | `#2f2f2f` |
| 本文テキスト | `#ffffff` |
| 見出し（muted） | `#afafaf` |
| アコーディオン背景 | `#000000` |

### ナビゲーション（全ページ共通）

1. 活動内容 → `content.html`
2. 活動実績 → `achievement.html`
3. メンバー → `member.html`
4. プロジェクト情報 → `information.html`
5. よくある質問 → `faq.html`
6. お問い合わせ → `contact.html`

### ハンバーガーメニューの仕組み

モバイルナビは**チェックボックスベースのドロワー**パターンを使用しています：

- `<input type="checkbox" id="drawer_input">` でメニュー開閉をトグル
- CSS疑似クラス `#drawer_input:checked ~ .nav_content` でドロワーをスライドイン
- ハンバーガーアイコンはCSS疑似要素（`::before`, `::after`）で構築

### アコーディオンコンポーネント

`content.html`, `faq.html`, `2023.html` で使用：

- **CSS**: `accordtion.css`（共有スタイル）
- **JS**: インラインスクリプト（各ページに同一コードがコピーされている）
- **HTML**: `<button class="accordion-btn">` + `<div class="accordion-content">`
- ARIAロール対応済み（`role="list"`, `role="listitem"`, `role="region"`）

### お問い合わせフォーム（Google Forms連携）

`contact.html` にて：

- フォームの `action` が Google Forms のレスポンスエンドポイントに POST
- 隠し `<iframe>` でレスポンスをキャプチャ
- `onsubmit="submitted=true;"` フラグで `contact-thankyou.html` にリダイレクト
- **フィールド対応**:
  - 氏名 → `entry.1706845888`
  - メール → `entry.127583046`
  - メッセージ → `entry.1469060305`

---

## 開発の始め方

### 前提条件

- テキストエディタ（VS Code 推奨）
- ウェブブラウザ（Chrome、Firefox 等）
- Git

### ローカル開発

```bash
# リポジトリのクローン
git clone https://github.com/kigyo-toshi/project.git
cd project

# HTMLファイルをブラウザで直接開くだけでOK（サーバー不要）
# ローカルサーバーを使う場合:
python -m http.server 8000
# → http://localhost:8000 でアクセス
```

### テスト

- 各HTMLファイルをブラウザで直接開いて確認
- **必ず3つの画面幅でレスポンシブ動作を確認すること**：
  - 1400px以上（デスクトップ）
  - 1068px〜1399px（タブレット）
  - 1068px未満（モバイル）
- ハンバーガーメニューの開閉動作を確認
- お問い合わせフォーム送信が正しいGoogle Formsエンドポイントに送られるか確認

---

## ページの追加・編集方法

### 新しいページを追加する場合

1. 既存のページ（例: `information.html`）をコピーして `newpage.html` を作成
2. 対応する CSS をコピーして `newpage.css` を作成し、メインコンテンツ部分のスタイルを調整
3. **すべての既存 HTML ファイル** のヘッダー・フッターのナビゲーションに新しいリンクを追加
4. `sitemap.xml` に新しいURLを追加
5. アコーディオンを使う場合は `<link rel="stylesheet" href="accordtion.css">` とインラインのアコーディオンスクリプトを含める

> ⚠️ **重要**: ヘッダーとフッターのHTML/CSSは全ページにコピーされています。ナビ変更時は**全HTMLファイルとCSSファイルを更新**する必要があります。

### コンテンツ編集

| 操作 | 対象ファイル | 編集箇所 |
|---|---|---|
| メンバー追加・編集 | `member.html` | `<div class="member2">` ブロック |
| FAQ追加 | `faq.html` | 既存の `accordion-item` パターンに従う |
| 活動実績追加 | `achievement.html` | `<main>` セクション内 |
| 活動内容更新 | `content.html` | `accordion-item` パターンに従う |

### CSS編集の注意点

- **各ページが専用のCSSファイルを持つ** → グローバルなレイアウト変更は全CSSファイルを更新
- インラインスタイルは避け、クラスベースのCSSを使用
- ヘッダー・フッター変更時は3つすべてのブレークポイントでテスト
- フルイドサイジングには `clamp()` を活用（`index.css` で使用例あり）

---

## デプロイ

**GitHub Pages** によってデフォルトブランチから自動デプロイされます。

```
1. ローカルで変更
2. git add & commit
3. git push
4. → 数分以内にサイトが自動更新
```

特別なビルドコマンドやCI/CDの設定は不要です。

---

## 既知の課題・注意点

引継ぎ時に把握しておくべき課題を重要度順に記載します。

### 🔴 重大な課題

| # | 課題 | 詳細 |
|---|---|---|
| 1 | **CSS大量重複** | ヘッダー・フッター・メディアクエリが全CSSファイル（9+個）に重複コピー。レイアウト変更時に全ファイル修正が必要 |
| 2 | **HTML大量重複** | ヘッダー・フッターのHTMLが全HTMLファイルにコピー。ナビ変更時に全ファイル修正が必要 |
| 3 | **`script.js` が存在しない** | 全ページで `<script src="script.js">` を読み込んでいるが、ファイルがリポジトリに存在しない。ブラウザコンソールエラーの原因 |

### 🟠 早めに修正すべき課題

| # | 課題 | 詳細 |
|---|---|---|
| 4 | **アコーディオンスクリプト重複** | 同一のJSが3ページにインラインでコピーされている |
| 5 | **`sitemap.xml` が古い** | 存在しないページ（`service.html`, `kigyo.html`）への参照あり。主要ページが未登録 |
| 6 | **空ページ** | `2024.html`, `2025.html` が空ファイル |
| 7 | **壊れたHTML** | `achievement.html`, `member.html` に余分な `</section>` 閉じタグ |

### 🟡 改善推奨

| # | 課題 | 詳細 |
|---|---|---|
| 8 | 重複ID | `contact.html` で `id="field-name"` が2つの入力に使われている |
| 9 | コメントアウトされた大量のコード | 複数ファイルに未使用のコメントアウトHTMLが残存 |
| 10 | 無効なCSS値 | `font-weight: 5`（無効値、`500` が正しい）、`background-color: linear-gradient()`（`background` が正しい） |
| 11 | ファイル名タイポ | `accordtion.css` → 正しくは `accordion.css` |
| 12 | Favicon未設定 | 一部ページのみ設定済み、他は未設定 |
| 13 | SNSアイコンの `alt` テキスト未設定 | アクセシビリティ上の問題 |
| 14 | jQuery が未使用の可能性 | CDNで読み込んでいるが、実際に使用しているコードが見当たらない |

> 💡 **改善の方向性**: 共通のヘッダー・フッターCSS/HTMLを1ファイルに切り出す（`common.css` やSSG導入等）ことで保守性が大幅に向上します。詳細は `.agents/.skills/Maintenance_Risks.md` を参照してください。

---

## SNS・外部サービス連携

| サービス | URL | 用途 |
|---|---|---|
| Instagram | https://instagram.com/kigyo.toshi | SNSリンク |
| X (Twitter) | https://x.com/kigyo_toshi | SNSリンク |
| note | https://note.com/kigyo_toshi | 活動報告ブログ |
| Google Forms | (hidden endpoint in `contact.html`) | お問い合わせフォーム |
| Google Search Console | 検証タグ設定済み（`index.html` 内 `<meta>` タグ） | SEO |

---

## ライセンス

© 2023-2026 Startup and Investment Project. All Rights Reserved.
