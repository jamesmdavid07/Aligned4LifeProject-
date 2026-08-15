'use client';

import { useState } from 'react';
import { CalendarRange, ChevronDown, ChevronUp } from 'lucide-react';
import { MonthFolder } from './MonthFolder';

const ARCHIVE_MONTHS = [8, 9, 10, 11, 12];
const ALL_MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const ARCHIVE_YEARS = [2026, 2027, 2028];

function YearFolder({
  year,
  months,
  availableDates,
  selectedDate,
  today,
  onSelectDate,
  defaultOpen = false,
}: {
  year: number;
  months: number[];
  availableDates: string[];
  selectedDate: string;
  today: string;
  onSelectDate: (date: string) => void;
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
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {months.map((month) => {
            const monthDates = availableDates
              .filter((date) => date.startsWith(`${year}-${String(month).padStart(2, '0')}-`))
              .sort((a, b) => a.localeCompare(b));

            return (
              <MonthFolder
                key={month}
                year={year}
                month={month}
                availableDates={monthDates}
                selectedDate={selectedDate}
                today={today}
                onSelectDate={onSelectDate}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function Archive({
  year,
  today,
  selectedDate,
  availableDates,
  onSelectDate,
}: {
  year: number;
  today: string;
  selectedDate: string;
  availableDates: string[];
  onSelectDate: (date: string) => void;
}) {
  const years = ARCHIVE_YEARS.includes(year)
    ? ARCHIVE_YEARS
    : [year, ...ARCHIVE_YEARS].sort((a, b) => a - b);

  return (
    <section className="w-full bg-white py-14 md:py-16" aria-labelledby="archive-heading">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="font-raleway text-sm font-bold uppercase tracking-[0.3em] text-gold">
              Browse the archive
            </p>
            <h2
              id="archive-heading"
              className="mt-3 font-nunito text-2xl font-extrabold text-navy-700 sm:text-3xl"
            >
              Devotional Archive
            </h2>
            <span className="mx-auto mt-3 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
            </span>
            <p className="mx-auto mt-4 max-w-md font-roboto text-sm leading-relaxed text-textgray">
              Revisit previous daily devotionals and select any date from the archive.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6">
          {years.map((archiveYear) => (
            <YearFolder
              key={archiveYear}
              year={archiveYear}
              months={archiveYear === year ? ARCHIVE_MONTHS : ALL_MONTHS}
              availableDates={availableDates}
              selectedDate={selectedDate}
              today={today}
              onSelectDate={onSelectDate}
              defaultOpen={archiveYear === year}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
