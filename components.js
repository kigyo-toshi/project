/**
 * components.js — 共有ヘッダー・フッターコンポーネント
 *
 * 全ページのヘッダーとフッターHTMLを一元管理する。
 * 各HTMLファイルに空の <header id="site-header"> と <footer id="site-footer"> を置き、
 * このスクリプトが DOMContentLoaded 時に内容を注入する。
 *
 * 変更時はこのファイルだけ編集すれば全ページに反映される。
 */

(function () {
  'use strict';

  /* ── ナビゲーション項目（site.md と同期） ── */
  var NAV_ITEMS = [
    { text: '活動内容',       href: 'content.html' },
    { text: '活動実績',       href: 'achievement.html' },
    { text: 'メンバー',       href: 'member.html' },
    { text: 'プロジェクト情報', href: 'information.html' },
    { text: 'よくある質問',    href: 'faq.html' },
    { text: 'お問い合わせ',    href: 'contact.html' }
  ];

  /* ── SNSリンク（site.md と同期） ── */
  var SNS_LINKS = [
    { url: 'https://instagram.com/kigyo.toshi', icon: 'img/instagram.png', alt: 'Instagram' },
    { url: 'https://x.com/kigyo_toshi',         icon: 'img/twitter.png',   alt: 'X (Twitter)' },
    { url: 'https://note.com/kigyo_toshi',       icon: 'img/note.png',      alt: 'note' }
  ];

  var COPYRIGHT = '© 2023-2026 Startup and Investment Project. All Rights Reserved.';

  /* ── ヘルパー ── */
  function navListHTML(cls) {
    return '<ul class="' + cls + '">' +
      NAV_ITEMS.map(function (item) {
        return '<li><a href="' + item.href + '">' + item.text + '</a></li>';
      }).join('\n') +
      '</ul>';
  }

  function snsListHTML(cls) {
    return '<ul class="' + cls + '">' +
      SNS_LINKS.map(function (item) {
        return '<li><a href="' + item.url + '"><img src="' + item.icon + '" alt="' + item.alt + '"></a></li>';
      }).join('\n') +
      '</ul>';
  }

  /* ── ヘッダー生成 ── */
  function renderHeader() {
    return '' +
      '<!-- Desktop header (≥1400px / 1068–1399px) -->' +
      '<section class="header-1200">' +
        '<a href="index.html"><img src="img/logo.svg" alt="ロゴ" class="logo"></a>' +
        navListHTML('bar') +
        snsListHTML('sns') +
      '</section>' +

      '<!-- Mobile header (<1068px) -->' +
      '<section class="header-768">' +
        '<a href="index.html"><img src="img/logo.svg" alt="ロゴ" class="logo"></a>' +
        '<div class="nav">' +
          '<input id="drawer_input" class="drawer_hidden" type="checkbox">' +
          '<label for="drawer_input" class="drawer_open"><span></span></label>' +
          '<nav class="nav_content">' +
            navListHTML('bar') +
            '<div class="p"><p>' + COPYRIGHT + '</p></div>' +
          '</nav>' +
        '</div>' +
      '</section>';
  }

  /* ── フッター生成 ── */
  function renderFooter() {
    return '' +
      '<a href="index.html"><img src="img/logo.svg" alt="ロゴ" class="logo"></a>' +
      '<div class="menu">' +
        '<div class="bar">' +
          navListHTML('') +
        '</div>' +
        '<div class="line"></div>' +
        '<div class="sns">' +
          snsListHTML('sns') +
          '<p>' + COPYRIGHT + '</p>' +
        '</div>' +
      '</div>';
  }

  /* ── DOM注入 ── */
  document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('site-header');
    var footer = document.getElementById('site-footer');

    if (header) header.innerHTML = renderHeader();
    if (footer) footer.innerHTML = renderFooter();
  });
})();
