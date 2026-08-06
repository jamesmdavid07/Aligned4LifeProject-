'use client';

import { ArrowLeftRight } from 'lucide-react';
import type { WeeklyBlog } from '@/lib/weekly-blogs';
import { BlogMonthFolder } from './BlogMonthFolder';

function monthKey(date: string) {
  return date.slice(0, 7);
}

export function BlogArchive({
  blogs,
  activeId,
  onSelect,
  onBackToThisWeek,
}: {
  blogs: WeeklyBlog[];
  activeId: number | null;
  onSelect: (id: number) => void;
  onBackToThisWeek: () => void;
}) {
  const grouped = new Map<string, WeeklyBlog[]>();
  blogs.forEach((post) => {
    const key = monthKey(post.publishDate);
    const bucket = grouped.get(key) ?? [];
    bucket.push(post);
    grouped.set(key, bucket);
  });

  const months = (() => {
    if (blogs.length === 0) return [];

    const keys = Array.from(grouped.keys()).sort();
    const year = Number(keys[0].slice(0, 4));
    const startMonth = Math.min(...keys.map((key) => Number(key.slice(5, 7))));

    const folders: Array<{ key: string; label: string; posts: WeeklyBlog[] }> = [];
    for (let month = startMonth; month <= 12; month += 1) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      folders.push({
        key,
        label: new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(
          new Date(year, month - 1, 1),
        ),
        posts: [...(grouped.get(key) ?? [])].sort((a, b) =>
          a.publishDate.localeCompare(b.publishDate),
        ),
      });
    }
    return folders;
  })();

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-600 via-darknavy to-deepnavy p-6 shadow-lg sm:p-8"
      aria-labelledby="blog-archive-heading"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-20%] h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-[-25%] right-[-10%] h-72 w-72 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10">
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
              className="font-nunito text-2xl font-extrabold text-white sm:text-3xl"
            >
              Blog Archive
            </h2>
            <span
              className="mx-auto mt-3 flex items-center justify-center gap-2"
              aria-hidden="true"
            >
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
            </span>
            <p className="mx-auto mt-4 max-w-md font-roboto text-sm leading-relaxed text-lightgray/80">
              Explore previous weekly reflections and revisit earlier messages from past
              weeks.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {months.map(({ key, label, posts }) => (
            <BlogMonthFolder
              key={key}
              label={label}
              posts={posts}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
