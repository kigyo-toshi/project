export function validateSiteUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.port || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('https://example.com の形式で、パスを含まないURLを指定してください。');
  }
  return url.origin;
}
