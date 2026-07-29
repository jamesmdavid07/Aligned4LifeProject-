'use client';

import { ArrowLeft } from 'lucide-react';

export function BackToTodayButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 font-raleway text-sm font-bold text-gold transition-colors hover:text-gold-700 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
    >
      <ArrowLeft size={16} aria-hidden="true" />
      Back to Today&apos;s Devotional
    </button>
  );
}
