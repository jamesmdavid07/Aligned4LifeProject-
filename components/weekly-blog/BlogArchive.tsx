'use client';

import { ArrowLeftRight } from 'lucide-react';
import type { WeeklyBlog } from '@/lib/weekly-blogs';
import { BlogYearFolder } from './BlogYearFolder';

const ARCHIVE_YEARS = [2026, 2027, 2028];

function monthKey(date: string) {
  return date.slice(0, 7);
}

function yearOf(post: WeeklyBlog) {
  return Number(monthKey(post.publishDate).slice(0, 4));
}

function monthLabel(key: string) {
  const [year, month] = key.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
    new Date(year, month - 1, 1),
  );
}

export function BlogArchive({
  blogs,
  activeId,
  onSelect,
  onBackToThisWeek,
  onReadToday,
}: {
  blogs: WeeklyBlog[];
  activeId: number | null;
  onSelect: (id: number) => void;
  onBackToThisWeek: () => void;
  onReadToday?: () => void;
}) {
  const grouped = new Map<string, WeeklyBlog[]>();
  blogs.forEach((post) => {
    const key = monthKey(post.publishDate);
    const bucket = grouped.get(key) ?? [];
    bucket.push(post);
    grouped.set(key, bucket);
  });

  const years = ARCHIVE_YEARS.map((year, index) => {
    const yearPosts = blogs.filter((post) => yearOf(post) === year);
    const firstMonth =
      yearPosts.length > 0
        ? Math.min(...yearPosts.map((post) => Number(monthKey(post.publishDate).slice(5, 7))))
        : 1;
    const startMonth = index === 0 ? firstMonth : 1;

    const months = [];
    for (let month = startMonth; month <= 12; month += 1) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      months.push({
        key,
        label: monthLabel(key),
        posts: [...(grouped.get(key) ?? [])].sort(
          (a, b) => (a.weekNumber ?? 99) - (b.weekNumber ?? 99),
        ),
      });
    }
    return { year, months, hasPosts: yearPosts.length > 0 };
  });

  return (
    <section
      className="w-full bg-white py-14 md:py-16"
      aria-labelledby="blog-archive-heading"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-6">
          <div className="w-full text-center">
            <button
              type="button"
              onClick={onBackToThisWeek}
              className="inline-flex items-center gap-2 rounded-lg border border-gold bg-gold/10 px-4 py-2.5 font-raleway text-sm font-bold text-gold transition hover:bg-gold hover:text-white sm:px-5"
            >
              <ArrowLeftRight size={16} aria-hidden="true" />
              Back to This Week
            </button>
          </div>

          <div className="text-center">
            <h2
              id="blog-archive-heading"
              className="font-nunito text-2xl font-extrabold text-navy-700 sm:text-3xl"
            >
              Blog Archive
            </h2>
            <span className="mx-auto mt-3 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
            </span>
            <p className="mx-auto mt-4 max-w-md font-roboto text-sm leading-relaxed text-textgray">
              Explore previous weekly reflections and revisit earlier messages from past weeks.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6">
          {years.map(({ year, months, hasPosts }, index) => (
            <BlogYearFolder
              key={year}
              year={year}
              months={months}
              activeId={activeId}
              onSelect={onSelect}
              onReadToday={onReadToday}
              defaultOpen={index === 0 && hasPosts}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
