# 早稲田大学高等学院「起業・投資プロジェクト」公式サイト

早稲田大学高等学院公認団体「起業・投資プロジェクト」の公式ウェブサイトです。

- 公開URL: https://kigyo-toshi.github.io/project/
- ホスティング: GitHub Pages
- 構成: HTML / CSS / JavaScript
- ビルド工程: なし

## ファイル構成

```text
project/
├── index.html / index.css
├── content.html / content.css
├── achievement.html / achievement.css
├── member.html / member.css
├── information.html / information.css
├── faq.html / faq.css
├── contact.html / contact.css
├── contact-thankyou.html / contact-thankyou.css
├── 2023.html / 2023.css
├── common.css
├── components.js
├── accordion.css
├── accordion.js
├── script.js
├── sitemap.xml
└── img/
```

## 共通実装

- `common.css`: リセット、ヘッダー、フッター、レスポンシブ表示
- `components.js`: ナビゲーション、SNSリンク、ヘッダー、フッター
- `accordion.css` / `accordion.js`: 活動内容・FAQのアコーディオン
- `script.js`: Google Formsを利用したお問い合わせ送信処理

ナビゲーションやSNSリンクを変更する場合は、`components.js` の配列を更新してください。

## ローカル確認

```bash
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。特に次を確認してください。

- 1400px以上、1068〜1399px、1067px以下のレイアウト
- キーボードによるメニューとアコーディオンの操作
- 各ページの内部リンクと外部リンク
- お問い合わせフォームの送信と完了ページへの遷移

## 公開

`main` ブランチへの変更がGitHub Pagesへ反映されます。ビルドコマンドはありません。

## コンテンツ更新時の注意

- ページ固有の本文は各HTMLを直接編集します。
- 共通ナビゲーションは `components.js` のみを編集します。
- ページを追加・削除した場合は `sitemap.xml` も更新します。
- 画像は表示サイズに合わせて圧縮し、未使用ファイルを残さないでください。

© 2023–2026 Startup and Investment Project.
