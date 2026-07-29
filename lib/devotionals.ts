import devotional2026 from '@/data/devotionals/2026.json';

export interface Devotional {
  id: number;
  date: string;
  title: string;
  scripture: string;
  image: string;
  content: string;
  reflection: string;
  prayer: string;
  keyVerse: string;
  readingTime: number;
}

export const devotionals: Devotional[] = devotional2026;

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function getLatestPublished(date = getTodayDate()) {
  return devotionals
    .filter((devotional) => devotional.date <= date)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
}

export function formatDevotionalDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${date}T12:00:00`));
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
