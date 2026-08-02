import devotional2026 from '@/data/devotionals/2026.json';

export interface Devotional {
  id: number;
  date: string;
  title: string;
  scripture: string;
  image: string;
  content: string;
  ellenWhiteInsight?: string;
  reflection: string;
  todaysDeclaration?: string;
  appeal?: string;
  prayer: string;
  fullKeyVerse?: string;
  keyVerse: string;
  readingTime: number;
}

export const devotionals: Devotional[] = devotional2026;

export function getTodayDate() {
  const today = new Date();
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
}

export function getLatestPublished(date = getTodayDate()) {
  return devotionals
    .filter((devotional) => devotional.date <= date)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}

function parseDevotionalDate(date: string) {
  const trimmed = date?.trim();

  if (!trimmed) return null;

  const dateOnlyMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    return new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0);
  }

  const parsedDate = new Date(trimmed);
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
}

export function formatDevotionalDate(date: string) {
  const parsedDate = parseDevotionalDate(date);

  if (!parsedDate) return date;

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
}

export function getPublishedMonths(_year: number, _today = getTodayDate()) {
  const archiveMonths = [8, 9, 10, 11, 12];
  return archiveMonths;
}

export function getPublishedDates(year: number, month: number, today = getTodayDate()) {
  return devotionals
    .filter(
      (devotional) =>
        devotional.date.startsWith(`${year}-${String(month).padStart(2, '0')}-`) &&
        devotional.date <= today,
    )
    .sort((a, b) => a.date.localeCompare(b.date));
}
