import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { articleSchema, isValidPublishedAt } from '../src/lib/article-schema.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILENAME_RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/;
const PUBLISHED_AT_LINE = /^publishedAt: "(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+09:00)"[ \t]*$/;

export function validateMarkdown(filename, raw) {
  const errors = [];
  const normalized = raw.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
  const nameMatch = FILENAME_RE.exec(filename);

  if (!nameMatch) {
    errors.push(
      `ファイル名は YYYY-MM-DD-slug.md です。slug は英小文字・数字・ハイフンのみ: ${filename}`,
    );
    return errors;
  }

  const [, fileDate, slug] = nameMatch;
  if (slug.length > 80) errors.push('slug は80文字以内です');
  if (!isValidPublishedAt(`${fileDate}T12:00:00+09:00`)) {
    errors.push(`ファイル名の日付が実在しません: ${fileDate}`);
  }

  if (!normalized.startsWith('---\n')) {
    errors.push('ファイル先頭に YAML frontmatter（---）が必要です');
    return errors;
  }

  const end = normalized.indexOf('\n---\n', 3);
  if (end === -1) {
    errors.push('frontmatter の閉じ --- がありません');
    return errors;
  }

  const yaml = normalized.slice(4, end);
  const body = normalized.slice(end + '\n---\n'.length);
  const publishedLines = yaml.split('\n').filter((line) => line.startsWith('publishedAt:'));

  if (publishedLines.length !== 1 || !PUBLISHED_AT_LINE.test(publishedLines[0])) {
    errors.push(
      'publishedAt は次の1行にしてください: publishedAt: "YYYY-MM-DDTHH:mm:ss+09:00"（二重引用符必須）',
    );
  }

  let data;
  try {
    data = matter(normalized).data;
  } catch (error) {
    errors.push(`frontmatter の YAML を読めません: ${error instanceof Error ? error.message : String(error)}`);
    return errors;
  }

  const parsed = articleSchema.safeParse(data);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      if (issue.code === 'unrecognized_keys') {
        errors.push(`未対応のフィールドがあります: ${issue.keys.join(', ')}`);
        continue;
      }
      const issuePath = issue.path.join('.') || '(root)';
      errors.push(`${issuePath}: ${issue.message}`);
    }
  } else if (parsed.data.publishedAt.slice(0, 10) !== fileDate) {
    errors.push(
      `ファイル名の日付 ${fileDate} と publishedAt の日付 ${parsed.data.publishedAt.slice(0, 10)} が一致しません`,
    );
  }

  if (!body.trim()) errors.push('本文が空です');
  if (!/^#{2,3} +\S/m.test(body)) {
    errors.push('本文に ## または ### の見出しを1つ以上書いてください（ページの h1 は title です）');
  }

  return errors;
}

function assertPasses(name, filename, raw) {
  const errors = validateMarkdown(filename, raw);
  if (errors.length === 0) return;
  console.error(`self-test failed: ${name} should pass`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
}

function assertFails(name, filename, raw) {
  const errors = validateMarkdown(filename, raw);
  if (errors.length > 0) return;
  console.error(`self-test failed: ${name} should fail`);
  process.exit(1);
}

function runSelfTest() {
  const valid = `---
title: "バリデーション確認用"
summary: "この文字列はチェッカーの自己テストです。公開される記事ではありません。"
points:
  - "ポイント1"
  - "ポイント2"
  - "ポイント3"
category: career
sourceName: "tech-news"
sourceUrl: "https://github.com/amamlazy/tech-news"
publishedAt: "2026-09-30T09:00:00+09:00"
---

## 見出し

本文。
`;
  assertPasses('valid', '2026-09-30-valid.md', valid);
  assertPasses('crlf', '2026-09-30-valid.md', valid.replace(/\n/g, '\r\n'));
  assertFails('bad category', '2026-09-30-valid.md', valid.replace('category: career', 'category: news'));
  assertFails('extra key', '2026-09-30-valid.md', valid.replace('category: career', 'category: career\ndraft: true'));
  assertFails('one point', '2026-09-30-valid.md', valid.replace('  - "ポイント2"\n  - "ポイント3"\n', ''));
  assertFails('no heading', '2026-09-30-valid.md', valid.replace('## 見出し\n\n', ''));
  assertFails('date mismatch', '2026-09-29-valid.md', valid);
  assertFails('unquoted time', '2026-09-30-valid.md', valid.replace(
    'publishedAt: "2026-09-30T09:00:00+09:00"',
    'publishedAt: 2026-09-30T09:00:00+09:00',
  ));
  assertFails('bad filename', 'Welcome.md', valid);
  assertFails('three sentences', '2026-09-30-valid.md', valid.replace(
    '公開される記事ではありません。',
    '公開される記事ではありません。三つ目の文です。',
  ));
  assertFails('impossible day', '2026-02-31-valid.md', valid.replaceAll('2026-09-30', '2026-02-31'));
}

function collectMarkdown(dir) {
  if (!fs.existsSync(dir)) return { missing: true, files: [] };
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    if (entry.isDirectory()) {
      files.push({ filename: `${entry.name}/`, raw: null, nested: true });
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    files.push({
      filename: entry.name,
      raw: fs.readFileSync(fullPath, 'utf8'),
      nested: false,
    });
  }
  return { missing: false, files };
}

function checkDirectory(relativeDir, { allowEmpty }) {
  const absolute = path.join(root, relativeDir);
  const { missing, files } = collectMarkdown(absolute);
  const errors = [];
  if (missing) {
    errors.push(`${relativeDir} がありません`);
    return errors;
  }
  if (!allowEmpty && files.length === 0) {
    errors.push(`${relativeDir} に Markdown がありません`);
  }
  for (const file of files) {
    const label = `${relativeDir}/${file.filename}`;
    if (file.nested || !file.filename.endsWith('.md')) {
      errors.push(`${label}: 記事は直下の .md ファイルだけです`);
      continue;
    }
    for (const error of validateMarkdown(file.filename, file.raw)) {
      errors.push(`${label}: ${error}`);
    }
  }
  return errors;
}

runSelfTest();

const errors = [
  ...checkDirectory('src/content/articles', { allowEmpty: false }),
  ...checkDirectory('docs/examples', { allowEmpty: false }),
];

if (errors.length > 0) {
  for (const error of errors) console.error(error);
  process.exit(1);
}

const articleCount = fs.readdirSync(path.join(root, 'src/content/articles')).filter((name) => name.endsWith('.md')).length;
const exampleCount = fs.readdirSync(path.join(root, 'docs/examples')).filter((name) => name.endsWith('.md')).length;
console.log(`ok: articles ${articleCount}, examples ${exampleCount}`);
