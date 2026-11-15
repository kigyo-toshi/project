# 起業・投資プロジェクト公式サイト

早稲田大学高等学院公認団体の公式サイト。React + Viteで実装しています。

公開先: 独自ドメイン（`site.config.json`で設定）

## 開発

Node.js 22.12以降（または24 LTS）を使用します。

```sh
npm ci
npm run dev
```

表示先: http://localhost:5173/

```sh
npm run build
npm test
npm run preview
```

`build`で`dist/`を生成します。`test`はビルド後に実行し、全ページのReact描画、内部リンク、配信ファイル、メタ情報を確認します。

## 構成

- ルートのHTML: Viteの各ページ入口。ページ固有のtitle、description、canonical、OGPを管理。`%SITE_URL%`はビルド時に置き換えます。
- `src/entries/`: 各ページの起動処理とCSS読み込み。
- `src/pages/`: ページ本文のReactコンポーネント。
- `src/components/`: 共通レイアウト、アコーディオン、問い合わせフォーム。
- `src/mount.jsx`: Reactルートと共通レイアウトの初期化。
- `src/styles/`: 共通・ページ固有のCSS。
- `public/img/`: 画像。
- `site.config.json`: 独自ドメインの公開URL。サイトマップはこのURLからビルド時に生成。

既存の`.html` URLを維持する複数ページ構成です。ページごとにCSSを読み込みます。ナビゲーションとSNSは`src/components/Layout.jsx`を編集してください。

## 公開

`.github/workflows/deploy.yml`がmainへのpush時にビルドと検証を行い、`dist/`をGitHub Pagesに公開します。GitHubのSettings → Pages → Sourceを **GitHub Actions** に設定してください。

`vite.config.js`の`base`は`/`で、独自ドメイン直下で公開します。

### 独自ドメインの設定

取得済みのドメインを指定して実行し、更新された`site.config.json`をコミットしてください。

```sh
npm run configure-domain -- https://取得したドメイン
npm run build
npm test
```

`www`を使う場合は`https://www.取得したドメイン`を指定します。canonical・OGPのURLとサイトマップが一括で反映されます。ドメイン未設定でもビルドできますが、誤った公開先を出力しないためcanonical・OGPのURL・サイトマップを省略し、警告を表示します。

GitHubのSettings → Pages → Custom domainにも同じドメインを登録し、お名前.com側でDNSを設定してください。GitHub Actionsで公開するためCNAMEファイルは不要です。DNS確認後にEnforce HTTPSを有効にします。

## 問い合わせ

Google Formsへ非表示iframeを使ってPOSTします。クロスオリジンのため受付結果はアプリ側で確認できません。応答時にはその制約を表示し、20秒で応答がない場合は再試行・メール連絡を案内します。検証で実際の問い合わせは送信しません。

`contact-thankyou.html`は既存URLとの互換性のため残しています。フォームから自動遷移はしません。

## 手動確認

- 320px、768px、1068px、1400px以上のレイアウト。
- メニューの開閉、Escape、キーボードのフォーカス。
- FAQ・活動内容の開閉。
- 実際のフォーム受付、外部リンク、SNSプレビュー。
