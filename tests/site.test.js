import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer, preview } from 'vite';
import { siteMetadata } from '../vite.config.js';
import { validateSiteUrl } from '../scripts/site-url.js';

const pages = ['index', 'content', 'achievement', 'member', 'information', 'faq', 'contact', 'contact-thankyou', '2023'];
const { url: siteUrl } = JSON.parse(readFileSync('site.config.json', 'utf8'));

test('build retains every original URL, metadata and referenced assets', () => {
  for (const name of pages) {
    const html = readFileSync(`dist/${name}.html`, 'utf8');
    assert.match(html, /<title>[^<]+<\/title>/);
    if (siteUrl) assert.ok(html.includes(`href="${siteUrl}/${name === 'index' ? '' : `${name}.html`}"`));
    else assert.doesNotMatch(html, /rel="canonical"|property="og:(url|image)"/);
    assert.doesNotMatch(html, /\/src\/entries|%BASE_URL%|%SITE_URL%|kigyo-toshi\.github\.io|\/project\//);
    for (const match of html.matchAll(/(?:src|href)="(\/[^/"?#][^"?#]*)"/g)) {
      assert.ok(existsSync(resolve('dist', match[1].slice('/'.length))), match[1]);
    }
  }
  assert.equal(existsSync('dist/sitemap.xml'), Boolean(siteUrl));
  if (siteUrl) {
    const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
    assert.ok(sitemap.includes(`${siteUrl}/`));
    assert.doesNotMatch(sitemap, /kigyo-toshi\.github\.io|contact-thankyou|2023\.html/);
  }
});

test('React pages render with valid local links and accordion semantics', async () => {
  const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { Layout } = await server.ssrLoadModule('/src/components/Layout.jsx');
    const previousWindow = globalThis.window;
    globalThis.window = { location: { pathname: '/faq.html' } };
    try {
      const layout = renderToStaticMarkup(createElement(Layout, null, createElement('main', null, 'test')));
      assert.match(layout, /aria-current="page"/);
      assert.match(layout, /aria-controls="mobile-navigation"/);
      assert.match(layout, /inert=""/);
      assert.match(layout, /src="\/img\/logo.svg"/);
      assert.match(layout, /<footer/);
    } finally {
      if (previousWindow === undefined) delete globalThis.window;
      else globalThis.window = previousWindow;
    }
    for (const name of pages) {
      const { default: Page } = await server.ssrLoadModule(`/src/pages/${name}.jsx`);
      const html = renderToStaticMarkup(createElement(Page));
      assert.match(html, /<main>/);
      assert.match(html, /<h1[ >]/);
      for (const match of html.matchAll(/(?:href|src)="([^"#]+)"/g)) {
        const ref = match[1];
        if (!/^(https?:|mailto:|data:)/.test(ref)) assert.ok(existsSync(resolve('dist', ref.replace(/^\//, ''))), `${name}: ${ref}`);
      }
      if (name === 'faq' || name === 'content') {
        const count = name === 'faq' ? 6 : 4;
        assert.equal([...html.matchAll(/aria-expanded="false"/g)].length, count);
        assert.equal([...html.matchAll(/role="region"/g)].length, count);
      }
      if (name === 'contact') {
        assert.match(html, /method="post"/);
        for (const field of ['1706845888', '127583046', '1469060305']) assert.ok(html.includes(`entry.${field}`));
      }
    }
  } finally { await server.close(); }
});

test('production preview serves every page and asset under /', async () => {
  const server = await preview({ preview: { host: '127.0.0.1', port: 0, open: false } });
  const origin = `http://127.0.0.1:${server.httpServer.address().port}`;
  try {
    for (const name of pages) {
      const response = await fetch(`${origin}/${name}.html`);
      assert.equal(response.status, 200, name);
      const html = await response.text();
      assert.match(html, /id="root"/);
      for (const match of html.matchAll(/(?:src|href)="(\/[^/"?#][^"?#]*)"/g)) {
        const asset = await fetch(`${origin}${match[1]}`);
        assert.equal(asset.status, 200, match[1]);
        if (match[1].endsWith('.js')) assert.match(asset.headers.get('content-type'), /javascript/);
        if (match[1].endsWith('.css')) assert.match(asset.headers.get('content-type'), /text\/css/);
      }
    }
  } finally { await new Promise((done) => server.httpServer.close(done)); }
});

test('custom domain updates metadata and sitemap from a single origin', () => {
  const origin = validateSiteUrl('https://www.example.com/');
  assert.equal(origin, 'https://www.example.com');
  for (const invalid of ['http://example.com', 'https://example.com/project/', 'https://user:pass@example.com', 'https://example.com/?x=1']) {
    assert.throws(() => validateSiteUrl(invalid));
  }
  const plugin = siteMetadata(origin);
  const html = plugin.transformIndexHtml(readFileSync('index.html', 'utf8'));
  assert.ok(html.includes(`href="${origin}/"`));
  assert.ok(html.includes(`content="${origin}/img/logo-aikon.svg"`));
  assert.doesNotMatch(html, /%SITE_URL%|kigyo-toshi\.github\.io/);
  let asset;
  plugin.generateBundle.call({ emitFile(value) { asset = value; } });
  assert.equal(asset.fileName, 'sitemap.xml');
  assert.equal([...asset.source.matchAll(/<loc>/g)].length, 7);
  assert.ok(asset.source.includes(`${origin}/faq.html`));
});
