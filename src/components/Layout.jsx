import { useEffect, useRef, useState } from 'react';

const navigation = [
  ['活動内容', 'content.html'], ['活動実績', 'achievement.html'],
  ['メンバー', 'member.html'], ['プロジェクト情報', 'information.html'],
  ['よくある質問', 'faq.html'], ['お問い合わせ', 'contact.html'],
];
const socials = [
  ['https://instagram.com/kigyo.toshi', 'instagram.png', 'Instagram'],
  ['https://x.com/kigyo_toshi', 'twitter.png', 'X (Twitter)'],
  ['https://note.com/kigyo_toshi', 'note.png', 'note'],
];
const copyright = `© 2023–${new Date().getFullYear()} Startup and Investment Project. All Rights Reserved.`;

function Navigation({ onNavigate }) {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  return <ul className="bar">{navigation.map(([label, href]) =>
    <li key={href}><a href={href} aria-current={current === href ? 'page' : undefined} onClick={onNavigate}>{label}</a></li>,
  )}</ul>;
}

function SocialLinks() {
  return <ul className="sns">{socials.map(([href, icon, label]) =>
    <li key={href}><a href={href} target="_blank" rel="noopener noreferrer"><img src={`${import.meta.env.BASE_URL}img/${icon}`} alt={label} /></a></li>,
  )}</ul>;
}

function Logo() {
  return <a href="index.html"><img src={`${import.meta.env.BASE_URL}img/logo.svg`} alt="起業・投資プロジェクト トップページ" className="logo" /></a>;
}

export function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef(null);

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    const desktop = window.matchMedia('(min-width: 1400px)');
    function closeOnDesktop(event) { if (event.matches) setOpen(false); }
    document.addEventListener('keydown', closeOnEscape);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  return <>
    <header id="site-header">
      <section className="header-1200"><Logo /><nav aria-label="メインナビゲーション"><Navigation /></nav><SocialLinks /></section>
      <section className="header-768">
        <Logo />
        <div className="nav">
          <button ref={toggle} type="button" className="drawer_open" aria-label={open ? 'メニューを閉じる' : 'メニューを開く'} aria-controls="mobile-navigation" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /></button>
          <nav id="mobile-navigation" className="nav_content" aria-label="メインナビゲーション" aria-hidden={!open} inert={!open}>
            <Navigation onNavigate={() => setOpen(false)} />
            <div className="p"><p>{copyright}</p></div>
          </nav>
        </div>
      </section>
    </header>
    {children}
    <footer id="site-footer"><Logo /><div className="menu"><nav className="bar" aria-label="フッターナビゲーション"><Navigation /></nav><div className="line" /><div className="sns"><SocialLinks /><p>{copyright}</p></div></div></footer>
  </>;
}
