'use client';

import { useState } from 'react';
import { ArrowLeft, FolderClosed, FolderOpen } from 'lucide-react';
import type { WeeklyBlog } from '@/lib/weekly-blogs';

function postLabel(post: WeeklyBlog) {
  return post.weekNumber != null ? `Week ${post.weekNumber}` : 'Introduction';
}

export function BlogMonthFolder({
  label,
  posts,
  activeId,
  onSelect,
  onReadToday,
}: {
  label: string;
  posts: WeeklyBlog[];
  activeId: number | null;
  onSelect: (id: number) => void;
  onReadToday?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [unavailableWeek, setUnavailableWeek] = useState<number | null>(null);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-navy-100 bg-white px-4 py-6 text-left shadow-sm transition-all hover:border-gold-300 hover:shadow-lg hover:shadow-gold-500/10 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 sm:px-6 sm:py-7"
        aria-label={`Open ${label} archive`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-100 text-gold">
          <FolderClosed size={20} aria-hidden="true" />
        </span>
        <h3 className="font-nunito text-lg font-extrabold text-navy-700">{label}</h3>
      </button>
    );
  }

  const slots = [1, 2, 3, 4].map((week) => {
    const post = posts.find((item) => item.weekNumber === week);
    return { week, post };
  });
  const extraPosts = posts.filter((item) => item.weekNumber == null);

  return (
    <div className="rounded-2xl border border-gold-200 bg-gradient-to-b from-gold-50 to-white shadow-lg shadow-gold-500/5">
      <div className="rounded-t-2xl bg-gradient-to-r from-navy-600 via-darknavy to-deepnavy p-3">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-100/20 text-gold-200">
            <FolderOpen size={16} aria-hidden="true" />
          </span>
          <h3 className="font-nunito text-base font-extrabold text-white">{label}</h3>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="ml-auto rounded-md bg-white/15 px-3 py-1 font-raleway text-xs font-bold text-gold-200 transition-colors hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
            aria-label={`Close ${label} archive`}
          >
            Close
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        {unavailableWeek != null ? (
          <div className="rounded-xl border border-gold-200 bg-white px-4 py-5 text-center shadow-sm">
            <p className="font-nunito text-sm font-bold text-navy-700">
              Week {unavailableWeek} &middot; This blog is not available.
            </p>
            <p className="mt-1 font-roboto text-xs text-textgray">
              Check back soon for this reflection.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setUnavailableWeek(null)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-navy-200 bg-white px-4 py-2 font-raleway text-xs font-bold text-navy-700 transition hover:border-gold hover:bg-gold-50 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                Back
              </button>
              {onReadToday ? (
                <button
                  type="button"
                  onClick={onReadToday}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gold px-4 py-2 font-raleway text-xs font-bold text-white transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  Read Today&apos;s Blog
                </button>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {slots.map(({ week, post }) =>
              post ? (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => onSelect(post.id)}
                  className={`rounded-xl border px-3 py-3 text-center font-raleway font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                    postLabel(post) === 'Introduction' ? 'text-xs' : 'text-sm'
                  } ${
                    activeId === post.id
                      ? 'border-gold bg-gold text-white shadow-md shadow-gold-300/30'
                      : 'border-navy-200 bg-white text-navy-700 hover:border-gold hover:bg-gold-50'
                  }`}
                  aria-pressed={activeId === post.id}
                >
                  {postLabel(post)}
                </button>
              ) : (
                <button
                  key={week}
                  type="button"
                  onClick={() => setUnavailableWeek(week)}
                  className="rounded-xl border border-dashed border-navy-300 bg-navy-50 px-3 py-3 text-center font-raleway text-sm font-bold text-navy-400 transition-colors hover:border-navy-400 hover:bg-navy-100 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
                >
                  Week {week}
                </button>
              ),
            )}
            {extraPosts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => onSelect(post.id)}
                className={`rounded-xl border px-3 py-3 text-center font-raleway font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                  postLabel(post) === 'Introduction' ? 'text-xs' : 'text-sm'
                } ${
                  activeId === post.id
                    ? 'border-gold bg-gold text-white shadow-md shadow-gold-300/30'
                    : 'border-navy-200 bg-white text-navy-700 hover:border-gold hover:bg-gold-50'
                }`}
                aria-pressed={activeId === post.id}
              >
                {postLabel(post)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
