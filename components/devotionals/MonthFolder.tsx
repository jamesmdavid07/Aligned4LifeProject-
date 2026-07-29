'use client';

import { useState } from 'react';
import { DateSelector } from './DateSelector';

interface MonthFolderProps {
  year: number;
  month: number;
  availableDates: string[];
  selectedDate: string;
  today: string;
  onSelectDate: (date: string) => void;
}

export function MonthFolder({
  year,
  month,
  availableDates,
  selectedDate,
  today,
  onSelectDate,
}: MonthFolderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const label = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    new Date(year, month - 1, 1),
  );

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-2xl border border-navy-400/30 bg-white/95 px-4 py-5 text-left shadow-sm backdrop-blur transition-all hover:border-gold-300 hover:shadow-lg hover:shadow-gold-500/10 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 sm:px-5 sm:py-6"
        aria-label={`Open ${label} archive`}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-100 text-gold">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20h16" />
            <path d="M4 7h16" />
            <path d="M4 7V4a2 2 0 0 1 2-2h8l2 2h6a2 2 0 0 1 2 2v3" />
          </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20h16" />
              <path d="M4 7h16" />
              <path d="M4 7V4a2 2 0 0 1 2-2h8l2 2h6a2 2 0 0 1 2 2v3" />
              <path d="M4 7h16" />
            </svg>
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
      <div className="overflow-x-auto p-2 sm:p-3">
        <DateSelector
          year={year}
          month={month}
          availableDates={availableDates}
          selectedDate={selectedDate}
          today={today}
          onSelect={onSelectDate}
        />
      </div>
    </div>
  );
}