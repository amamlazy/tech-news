import { getCollection, type CollectionEntry } from 'astro:content';

export type Article = CollectionEntry<'articles'>;

export async function getArticles(): Promise<Article[]> {
  const articles = await getCollection('articles');
  return articles.sort((a, b) => {
    const byDate = b.data.publishedAt.localeCompare(a.data.publishedAt);
    return byDate !== 0 ? byDate : b.id.localeCompare(a.id);
  });
}

export function countByCategory(articles: Article[]): Record<string, number> {
  const counts: Record<string, number> = { all: articles.length };
  for (const article of articles) {
    counts[article.data.category] = (counts[article.data.category] ?? 0) + 1;
  }
  return counts;
}

export function groupByDate(articles: Article[]): { date: string; articles: Article[] }[] {
  const groups: { date: string; articles: Article[] }[] = [];
  for (const article of articles) {
    const date = article.data.publishedAt.slice(0, 10);
    const last = groups.at(-1);
    if (last && last.date === date) last.articles.push(article);
    else groups.push({ date, articles: [article] });
  }
  return groups;
}

export function formatDateLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const weekday = new Intl.DateTimeFormat('ja-JP', {
    weekday: 'short',
    timeZone: 'Asia/Tokyo',
  }).format(new Date(`${isoDate}T12:00:00+09:00`));
  return `${year}年${month}月${day}日（${weekday}）`;
}

export function formatTime(publishedAt: string): string {
  return publishedAt.slice(11, 16);
}

export function formatDateTime(publishedAt: string): string {
  return `${formatDateLabel(publishedAt.slice(0, 10))} ${formatTime(publishedAt)}`;
}
