'use client';

import { useState } from 'react';
import { FolderClosed, FolderOpen } from 'lucide-react';
import type { WeeklyBlog } from '@/lib/weekly-blogs';

function postLabel(post: WeeklyBlog) {
  return post.weekNumber != null ? `Week ${post.weekNumber}` : 'Introduction';
}

export function BlogMonthFolder({
  label,
  posts,
  activeId,
  onSelect,
}: {
  label: string;
  posts: WeeklyBlog[];
  activeId: number | null;
  onSelect: (id: number) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-navy-400/30 bg-white/95 px-4 py-5 text-left shadow-sm backdrop-blur transition-all hover:border-gold-300 hover:shadow-lg hover:shadow-gold-500/10 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 sm:px-5 sm:py-6"
        aria-label={`Open ${label} archive`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-100 text-gold">
          <FolderClosed size={20} aria-hidden="true" />
        </span>
        <h3 className="font-nunito text-lg font-extrabold text-navy-700">{label}</h3>
      </button>
    );
  }

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
        {posts.length === 0 ? (
          <p className="px-2 py-4 text-center font-roboto text-sm leading-relaxed text-textgray">
            No reflections yet for this month.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {posts.map((post) => {
              const selected = post.id === activeId;
              const isIntroduction = postLabel(post) === 'Introduction';
              return (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => onSelect(post.id)}
                  className={`rounded-xl border px-3 py-3 text-center font-raleway font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
                    isIntroduction ? 'text-xs' : 'text-sm'
                  } ${
                    selected
                      ? 'border-gold bg-gold text-white shadow-md shadow-gold-300/30'
                      : 'border-navy-200 bg-white text-navy-700 hover:border-gold hover:bg-gold-50'
                  }`}
                  aria-pressed={selected}
                >
                  {postLabel(post)}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
