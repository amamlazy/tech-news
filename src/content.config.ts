import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { articleSchema } from './lib/article-schema.mjs';

const articles = defineCollection({
  loader: glob({
    base: './src/content/articles',
    pattern: '*.md',
    generateId: ({ entry }) => entry.replace(/\\/g, '/').replace(/\.md$/, '').replace(/^.*\//, ''),
  }),
  schema: articleSchema,
});

export const collections = { articles };
