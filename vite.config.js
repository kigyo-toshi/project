import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { validateSiteUrl } from './scripts/site-url.js';

const pages = ['index', 'content', 'achievement', 'member', 'information', 'faq', 'contact', 'contact-thankyou', '2023'];
const { url } = JSON.parse(readFileSync(new URL('./site.config.json', import.meta.url), 'utf8'));
const siteUrl = url ? validateSiteUrl(url) : null;

export function siteMetadata(siteUrl) {
  return {
    name: 'site-metadata',
    transformIndexHtml(html) {
      if (!siteUrl) {
        return html.replace(/\s*<(?:link\b[^>]*rel="canonical"|meta\b[^>]*property="og:(?:url|image)")[^>]*>/g, '');
      }
      return html.replaceAll('%SITE_URL%', siteUrl);
    },
    generateBundle() {
      if (!siteUrl) {
        this.warn('独自ドメイン未設定: canonical・OGPのURL・サイトマップは出力しません。npm run configure-domain -- https://取得したドメイン を実行してください。');
        return;
      }
      const urls = pages.filter((page) => !['2023', 'contact-thankyou'].includes(page))
        .map((page) => `  <url><loc>${siteUrl}/${page === 'index' ? '' : `${page}.html`}</loc></url>`).join('\n');
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n` });
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), siteMetadata(siteUrl)],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(import.meta.dirname, `${page}.html`)])),
    },
  },
});
