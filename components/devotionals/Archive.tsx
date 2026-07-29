'use client';

import { useEffect, useState } from 'react';
import { getPublishedDates, getPublishedMonths } from '@/lib/devotionals';
import { MonthFolder } from './MonthFolder';
import { YearSelector } from './YearSelector';

export function Archive({
  year,
  today,
  selectedDate,
  onSelectDate,
}: {
  year: number;
  today: string;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}) {
  const months = getPublishedMonths(year, today);
  const [openMonth, setOpenMonth] = useState<number | null>(null);

  useEffect(() => {
    const selectedMonthFromDate = Number(selectedDate.slice(5, 7));
    if (months.includes(selectedMonthFromDate)) {
      setOpenMonth(selectedMonthFromDate);
    } else if (months.length > 0) {
      setOpenMonth(months[0]);
    }
  }, [months, selectedDate]);

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
        {months.map((month) => {
          const monthDates = getPublishedDates(year, month, today).map((devotional) => devotional.date);
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
