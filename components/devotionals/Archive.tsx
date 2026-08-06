'use client';

import { useEffect, useState } from 'react';
import { MonthFolder } from './MonthFolder';
import { YearSelector } from './YearSelector';

const ARCHIVE_MONTHS = [8, 9, 10, 11, 12];

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
  const [openMonth, setOpenMonth] = useState<number | null>(null);

  useEffect(() => {
    const selectedMonthFromDate = Number(selectedDate.slice(5, 7));
    if (ARCHIVE_MONTHS.includes(selectedMonthFromDate)) {
      setOpenMonth(selectedMonthFromDate);
    } else if (ARCHIVE_MONTHS.length > 0) {
      setOpenMonth(ARCHIVE_MONTHS[0]);
    }
  }, [selectedDate]);

  function handleMonthSelect(month: number) {
    setOpenMonth((prev) => (prev === month ? null : month));
  }

  return (
    <section className="rounded-3xl bg-gradient-to-br from-navy-600 via-darknavy to-deepnavy p-6 shadow-lg sm:p-8" aria-labelledby="archive-heading">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-raleway text-xs font-bold uppercase tracking-[0.25em] text-gold-200">Browse the archive</p>
          <h2 id="archive-heading" className="mt-2 font-nunito text-2xl font-extrabold text-white">Devotional Archive</h2>
        </div>
        <YearSelector year={year} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ARCHIVE_MONTHS.map((month) => {
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
    </section>
  );
}
