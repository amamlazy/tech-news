const STORAGE_KEY = 'tech-news-favorites';

type Favorite = {
  id: string;
  title: string;
  date: string;
  category: string;
  url: string;
  summary: string;
  sourceName: string;
};

function parseFavorite(value: unknown): Favorite | null {
  if (!value || typeof value !== 'object') return null;
  const item = value as Record<string, unknown>;
  const id = text(item.id, 200);
  const title = text(item.title, 200);
  const date = text(item.date, 40);
  const category = text(item.category, 40);
  const url = text(item.url, 300);
  if (!id || !title || !date || !category || !url) return null;
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(id)) return null;
  if (!/^[a-z0-9-]+$/.test(category)) return null;
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(date)) return null;
  if (!url.startsWith('/') || url.startsWith('//') || url.includes('\\')) return null;
  return {
    id,
    title,
    date,
    category,
    url,
    summary: typeof item.summary === 'string' ? item.summary.slice(0, 500) : '',
    sourceName: typeof item.sourceName === 'string' ? item.sourceName.slice(0, 120) : '',
  };
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function read(): Favorite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    const items: Favorite[] = [];
    for (const entry of parsed) {
      const item = parseFavorite(entry);
      if (item && !items.some((existing) => existing.id === item.id)) items.push(item);
    }
    return items;
  } catch {
    return [];
  }
}

function write(items: Favorite[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* private mode or quota */
  }
}

function labelFor(on: boolean, title: string): string {
  const action = on ? 'お気に入りから外す' : 'お気に入りに追加';
  return `${action}：${title}`;
}

function payloadFromButton(button: HTMLButtonElement): Favorite | null {
  const raw = button.dataset.favorite;
  if (!raw) return null;
  try {
    return parseFavorite(JSON.parse(raw) as unknown);
  } catch {
    return null;
  }
}

function syncButton(button: HTMLButtonElement, saved: Set<string>) {
  const item = payloadFromButton(button);
  if (!item) return;
  const on = saved.has(item.id);
  button.setAttribute('aria-pressed', on ? 'true' : 'false');
  button.setAttribute('aria-label', labelFor(on, item.title));
  const star = button.querySelector<HTMLElement>('[data-star]');
  if (star) star.textContent = on ? '★' : '☆';
}

function syncAll() {
  const saved = new Set(read().map((item) => item.id));
  document.querySelectorAll<HTMLButtonElement>('button.favorite-toggle').forEach((button) => {
    syncButton(button, saved);
  });
}

function categoryLabels(): Record<string, string> {
  const root = document.querySelector<HTMLElement>('#favorites-root');
  if (!root?.dataset.categoryLabels) return {};
  try {
    const parsed = JSON.parse(root.dataset.categoryLabels) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const labels: Record<string, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'string') labels[key] = value;
    }
    return labels;
  } catch {
    return {};
  }
}

function formatFavoriteDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(iso);
  if (!match) return iso;
  return `${match[1]}年${Number(match[2])}月${Number(match[3])}日 ${match[4]}:${match[5]}`;
}

function createCard(item: Favorite, labels: Record<string, string>): HTMLLIElement {
  const li = document.createElement('li');
  li.className = 'article-card';
  li.dataset.articleCategory = item.category;

  const link = document.createElement('a');
  link.className = 'article-card-link';
  link.href = item.url;

  const meta = document.createElement('p');
  meta.className = 'meta';

  const label = document.createElement('span');
  label.className = 'category-label';
  const dot = document.createElement('span');
  dot.className = 'dot';
  dot.setAttribute('aria-hidden', 'true');
  const labelText = document.createElement('span');
  labelText.textContent = labels[item.category] || item.category;
  label.append(dot, labelText);

  const time = document.createElement('time');
  time.dateTime = item.date;
  time.textContent = formatFavoriteDate(item.date);
  meta.append(label, time);

  const title = document.createElement('h3');
  title.className = 'article-title';
  title.textContent = item.title;
  link.append(meta, title);

  if (item.summary) {
    const summary = document.createElement('p');
    summary.className = 'summary';
    summary.textContent = item.summary;
    link.append(summary);
  }

  if (item.sourceName) {
    const source = document.createElement('p');
    source.className = 'card-source';
    source.textContent = item.sourceName;
    link.append(source);
  }

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'favorite-toggle';
  button.dataset.favoriteId = item.id;
  button.dataset.favorite = JSON.stringify(item);
  button.setAttribute('aria-pressed', 'true');
  button.setAttribute('aria-label', labelFor(true, item.title));
  const star = document.createElement('span');
  star.dataset.star = '';
  star.setAttribute('aria-hidden', 'true');
  star.textContent = '★';
  button.append(star);

  li.append(link, button);
  return li;
}

function renderFavorites() {
  const root = document.querySelector<HTMLElement>('#favorites-root');
  if (!root) return;
  const list = root.querySelector<HTMLUListElement>('#favorites-list');
  const empty = root.querySelector<HTMLElement>('#favorites-empty');
  const count = root.querySelector<HTMLElement>('#favorites-count');
  if (!list || !empty) return;

  const items = read().sort((a, b) => {
    const byDate = b.date.localeCompare(a.date);
    return byDate !== 0 ? byDate : b.id.localeCompare(a.id);
  });
  const labels = categoryLabels();
  list.replaceChildren(...items.map((item) => createCard(item, labels)));

  const has = items.length > 0;
  list.hidden = !has;
  empty.hidden = has;
  if (count) {
    count.hidden = !has;
    count.textContent = `${items.length}件`;
  }
}

function toggleFromButton(button: HTMLButtonElement) {
  const item = payloadFromButton(button);
  if (!item) return;

  const onFavoritesPage = Boolean(button.closest('#favorites-list'));
  let focusId: string | null = null;
  if (onFavoritesPage) {
    const cards = [...document.querySelectorAll<HTMLElement>('#favorites-list .article-card')];
    const index = cards.findIndex((card) => card.contains(button));
    const neighbor = cards[index + 1] ?? cards[index - 1];
    focusId = neighbor?.querySelector<HTMLButtonElement>('.favorite-toggle')?.dataset.favoriteId ?? null;
  }

  const current = read();
  const exists = current.some((entry) => entry.id === item.id);
  write(exists ? current.filter((entry) => entry.id !== item.id) : [...current, item]);
  syncAll();
  renderFavorites();

  if (!onFavoritesPage) return;
  const next = focusId
    ? document.querySelector<HTMLButtonElement>(
        `#favorites-list .favorite-toggle[data-favorite-id="${CSS.escape(focusId)}"]`,
      )
    : null;
  (next ?? document.querySelector<HTMLElement>('#favorites-empty a'))?.focus();
}

function onClick(event: Event) {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const button = target.closest<HTMLButtonElement>('button.favorite-toggle');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();
  toggleFromButton(button);
}

if (!window.__techNewsFavorites) {
  window.__techNewsFavorites = true;
  document.addEventListener('click', onClick);
  window.addEventListener('storage', (event) => {
    if (event.key !== STORAGE_KEY) return;
    syncAll();
    renderFavorites();
  });
}

syncAll();
renderFavorites();

declare global {
  interface Window {
    __techNewsFavorites?: boolean;
  }
}

export {};
