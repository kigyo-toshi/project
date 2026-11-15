import { writeFileSync } from 'node:fs';
import { validateSiteUrl } from './site-url.js';

try {
  const input = process.argv[2];
  if (!input) throw new Error('使用方法: npm run configure-domain -- https://取得したドメイン');
  const url = validateSiteUrl(input);
  writeFileSync(new URL('../site.config.json', import.meta.url), `${JSON.stringify({ url }, null, 2)}\n`);
  console.log(`公開先を ${url} に設定しました。npm run build で反映してください。`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
