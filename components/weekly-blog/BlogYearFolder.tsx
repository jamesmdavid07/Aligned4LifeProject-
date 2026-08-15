'use client';

import { useState } from 'react';
import { CalendarRange, ChevronDown, ChevronUp } from 'lucide-react';
import type { WeeklyBlog } from '@/lib/weekly-blogs';
import { BlogMonthFolder } from './BlogMonthFolder';

export function BlogYearFolder({
  year,
  months,
  activeId,
  onSelect,
  onReadToday,
  defaultOpen = false,
}: {
  year: number;
  months: Array<{ key: string; label: string; posts: WeeklyBlog[] }>;
  activeId: number | null;
  onSelect: (id: number) => void;
  onReadToday?: () => void;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border border-navy-100 bg-white p-5 shadow-md shadow-navy-900/5 sm:p-6">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-navy-600 via-darknavy to-deepnavy px-5 py-4 text-left shadow-md transition-all hover:border hover:border-gold-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Close' : 'Open'} ${year} archive`}
      >
        <span className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-100/20 text-gold-200">
            <CalendarRange size={20} aria-hidden="true" />
          </span>
          <span className="font-nunito text-xl font-extrabold text-white">{year}</span>
        </span>
        <span className="text-gold-200" aria-hidden="true">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      {isOpen ? (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {months.map((month) => (
            <BlogMonthFolder
              key={month.key}
              label={month.label}
              posts={month.posts}
              activeId={activeId}
              onSelect={onSelect}
              onReadToday={onReadToday}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
