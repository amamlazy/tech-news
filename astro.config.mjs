import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const root = path.dirname(fileURLToPath(import.meta.url));

function runArticleCheck() {
  const result = spawnSync(process.execPath, [path.join(root, 'scripts/validate-articles.mjs')], {
    cwd: root,
    stdio: 'inherit',
  });
  if (result.status !== 0) {
    throw new Error('Article validation failed. Fix the files reported by npm run check.');
  }
}

export default defineConfig({
  site: 'https://amamlazy.github.io',
  base: '/tech-news',
  trailingSlash: 'always',
  markdown: {
    processor: satteri({
      features: { gfm: true, smartPunctuation: false },
    }),
  },
  integrations: [
    {
      name: 'article-check',
      hooks: {
        'astro:build:start': runArticleCheck,
        'astro:server:start': runArticleCheck,
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
