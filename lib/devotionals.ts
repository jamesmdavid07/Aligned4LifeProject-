export interface Devotional {
  id: number;
  date: string;
  title: string;
  content: string;
  ellenWhiteInsight?: string;
  reflection: string;
  todaysDeclaration?: string;
  appeal?: string;
  prayer: string;
  keyText?: string;
  readingTime: number;
}

const devotionalTimeZone = process.env.NEXT_PUBLIC_DEVOTIONAL_TIME_ZONE || 'America/New_York';

export function getTodayDate() {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: devotionalTimeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${values.year}-${values.month}-${values.day}`;
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
