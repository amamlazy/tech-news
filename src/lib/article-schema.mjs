import { z } from 'astro/zod';

export const CATEGORIES = [
  {
    slug: 'ai',
    label: 'AI',
    description: 'モデル、エージェント、AIプロダクトの動き。',
  },
  {
    slug: 'frontend',
    label: 'フロントエンド',
    description: 'UI、ブラウザ、フレームワーク。',
  },
  {
    slug: 'backend',
    label: 'バックエンド',
    description: 'サーバ、インフラ、言語、データ。',
  },
  {
    slug: 'career',
    label: 'キャリア',
    description: '働き方、組織、スキル。',
  },
  {
    slug: 'gadget',
    label: 'ガジェット',
    description: 'デバイスとハードウェア。',
  },
  {
    slug: 'x-trend',
    label: 'Xで話題',
    description: 'X上で広がった話題。',
  },
  {
    slug: 'weekly',
    label: '今週のまとめ',
    description: '一週間の動きを短く振り返る。',
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((category) => category.slug);

const PUBLISHED_AT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00$/;

export function isValidPublishedAt(value) {
  if (typeof value !== 'string' || !PUBLISHED_AT.test(value)) return false;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return false;
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Tokyo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(parsed)
      .map((part) => [part.type, part.value]),
  );
  const roundTrip = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}+09:00`;
  return roundTrip === value;
}

function sentenceCount(summary) {
  return summary
    .split(/[。！？]/)
    .map((part) => part.trim())
    .filter(Boolean).length;
}

export const articleSchema = z
  .object({
    title: z.string({ error: 'title は文字列です' }).trim().min(1, 'title は必須です').max(100, 'title は100文字以内です'),
    summary: z
      .string({ error: 'summary は文字列です' })
      .trim()
      .min(20, 'summary は20文字以上です')
      .max(280, 'summary は280文字以内です')
      .refine((value) => {
        const count = sentenceCount(value);
        return count >= 1 && count <= 2;
      }, 'summary は「。」「！」「？」で区切った1〜2文です'),
    points: z
      .array(
        z
          .string({ error: 'points の各項目は文字列です' })
          .trim()
          .min(1, 'points の各項目は空にできません')
          .max(120, 'points の各項目は120文字以内です'),
      )
      .min(2, 'points は2〜5個です')
      .max(5, 'points は2〜5個です'),
    category: z.enum(CATEGORY_SLUGS, {
      message: `category は ${CATEGORY_SLUGS.join(' / ')} のいずれかです`,
    }),
    sourceName: z
      .string({ error: 'sourceName は文字列です' })
      .trim()
      .min(1, 'sourceName は必須です')
      .max(80, 'sourceName は80文字以内です'),
    sourceUrl: z
      .string({ error: 'sourceUrl は文字列です' })
      .trim()
      .url('sourceUrl は URL です')
      .refine((value) => /^https?:\/\//.test(value), 'sourceUrl は http または https です'),
    publishedAt: z.string({ error: 'publishedAt は文字列です' }).refine(
      isValidPublishedAt,
      'publishedAt は "YYYY-MM-DDTHH:mm:ss+09:00" です',
    ),
  })
  .strict();

export function getCategory(slug) {
  const category = CATEGORIES.find((item) => item.slug === slug);
  if (!category) throw new Error(`未知のカテゴリです: ${slug}`);
  return category;
}
