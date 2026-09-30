export const SITE_NAME = 'テック日報';
export const SITE_TAGLINE = '1日1ページの技術ニュース';
export const SITE_DESCRIPTION =
  '忙しいエンジニアのためのテックニュース要約。AI、フロントエンド、バックエンド、キャリア、ガジェットと、Xで話題のことも、週に一度のまとめもここに集めます。';
export const REPO_URL = 'https://github.com/amamlazy/tech-news';

export function href(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '/' || path === '') return `${base}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}

export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function categoryHref(slug: string): string {
  if (slug === 'weekly') return href('/weekly/');
  return href(`/category/${slug}/`);
}
