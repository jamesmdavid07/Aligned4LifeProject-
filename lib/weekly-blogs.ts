export interface WeeklyBlog {
  id: number;
  title: string;
  subtitle?: string;
  theme?: string;
  keyText?: string;
  content: string;
  publishDate: string;
  weekNumber: number | null;
  readingTime: number;
}

export type DbWeeklyBlog = {
  id: number;
  title: string;
  subtitle?: string;
  theme?: string;
  key_text?: string;
  content: string;
  week_number: number | null;
  publish_date: string;
};

function parseBlogDate(date: string) {
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

export function formatBlogDate(date: string) {
  const parsedDate = parseBlogDate(date);

  if (!parsedDate) return date;

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(parsedDate);
}

export function calculateReadingTime(content: string) {
  const wordCount = content?.split(/\s+/).filter(Boolean).length || 0;
  return Math.max(2, Math.ceil(wordCount / 200));
}

export function mapDbWeeklyBlog(row: DbWeeklyBlog): WeeklyBlog {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    theme: row.theme,
    keyText: row.key_text,
    content: row.content,
    publishDate: row.publish_date,
    weekNumber: row.week_number == null ? null : Number(row.week_number),
    readingTime: calculateReadingTime(row.content),
  };
}
