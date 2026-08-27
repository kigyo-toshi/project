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

  /* ── ナビゲーション項目 ── */
  var NAV_ITEMS = [
    { text: '活動内容',       href: 'content.html' },
    { text: '活動実績',       href: 'achievement.html' },
    { text: 'メンバー',       href: 'member.html' },
    { text: 'プロジェクト情報', href: 'information.html' },
    { text: 'よくある質問',    href: 'faq.html' },
    { text: 'お問い合わせ',    href: 'contact.html' }
  ];

  /* ── SNSリンク ── */
  var SNS_LINKS = [
    { url: 'https://instagram.com/kigyo.toshi', icon: 'img/instagram.png', alt: 'Instagram' },
    { url: 'https://x.com/kigyo_toshi',         icon: 'img/twitter.png',   alt: 'X (Twitter)' },
    { url: 'https://note.com/kigyo_toshi',       icon: 'img/note.png',      alt: 'note' }
  ];

  var COPYRIGHT = '© 2023–' + new Date().getFullYear() + ' Startup and Investment Project. All Rights Reserved.';

  /* ── ヘルパー ── */
  function currentPage() {
    var page = window.location.pathname.split('/').pop();
    return page || 'index.html';
  }

  function navListHTML(cls) {
    var className = cls ? ' class="' + cls + '"' : '';
    return '<ul' + className + '>' +
      NAV_ITEMS.map(function (item) {
        var current = currentPage() === item.href ? ' aria-current="page"' : '';
        return '<li><a href="' + item.href + '"' + current + '>' + item.text + '</a></li>';
      }).join('\n') +
      '</ul>';
  }

  function snsListHTML(cls) {
    return '<ul class="' + cls + '">' +
      SNS_LINKS.map(function (item) {
        return '<li><a href="' + item.url + '" target="_blank" rel="noopener noreferrer"><img src="' + item.icon + '" alt="' + item.alt + '"></a></li>';
      }).join('\n') +
      '</ul>';
  }

  /* ── ヘッダー生成 ── */
  function renderHeader() {
    return '' +
      '<!-- Desktop header (≥1400px) -->' +
      '<section class="header-1200">' +
        '<a href="index.html"><img src="img/logo.svg" alt="ロゴ" class="logo"></a>' +
        navListHTML('bar') +
        snsListHTML('sns') +
      '</section>' +

      '<!-- Compact header (<1400px) -->' +
      '<section class="header-768">' +
        '<a href="index.html"><img src="img/logo.svg" alt="ロゴ" class="logo"></a>' +
        '<div class="nav">' +
          '<input id="drawer_input" class="drawer_hidden" type="checkbox" aria-label="メニューを開閉" aria-controls="mobile-navigation" aria-expanded="false">' +
          '<label for="drawer_input" class="drawer_open"><span></span></label>' +
          '<nav id="mobile-navigation" class="nav_content" aria-hidden="true">' +
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

    var drawer = document.getElementById('drawer_input');
    var mobileNav = document.getElementById('mobile-navigation');

    if (!drawer || !mobileNav) return;

    function syncDrawerState() {
      var isOpen = drawer.checked;
      drawer.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
      mobileNav.inert = !isOpen;
    }

    drawer.addEventListener('change', syncDrawerState);
    mobileNav.addEventListener('click', function (event) {
      if (event.target.closest('a')) {
        drawer.checked = false;
        syncDrawerState();
      }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.checked) {
        drawer.checked = false;
        syncDrawerState();
        drawer.focus();
      }
    });
    syncDrawerState();
  });
})();
