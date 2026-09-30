import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCategory } from '../lib/article-schema.mjs';
import { getArticles } from '../lib/articles';
import { SITE_DESCRIPTION, SITE_NAME } from '../lib/paths';

function escapeHtml(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function renderContent(summary: string, points: string[]): string {
  const items = points.map((point) => `<li>${escapeHtml(point)}</li>`).join('');
  return `<p>${escapeHtml(summary)}</p><ul>${items}</ul>`;
}

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error('astro.config の site が未設定です');
  }

  const articles = await getArticles();
  const siteWithBase = new URL(import.meta.env.BASE_URL, context.site);

  return rss({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: siteWithBase.toString(),
    customData: '<language>ja</language>',
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.summary,
      pubDate: new Date(article.data.publishedAt),
      link: `articles/${article.id}/`,
      categories: [getCategory(article.data.category).label],
      content: renderContent(article.data.summary, article.data.points),
    })),
  });
}
