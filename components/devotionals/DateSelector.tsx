'use client';

import { motion } from 'framer-motion';
import { formatDevotionalDate } from '@/lib/devotionals';

export function DateSelector({
  year,
  month,
  availableDates,
  selectedDate,
  today,
  onSelect,
}: {
  year: number;
  month: number;
  availableDates: string[];
  selectedDate: string;
  today: string;
  onSelect: (date: string) => void;
}) {
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const leadingDays = Array.from({ length: firstDay });
  const availableDateSet = new Set(availableDates);
  const calendarDays = Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  });

  return (
    <div className="mt-2" aria-label="Select devotional date">
      <div className="grid grid-cols-7 gap-1 text-center font-raleway text-[10px] font-bold uppercase tracking-wider text-gold sm:gap-2 sm:text-xs">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-1.5 sm:gap-2">
        {leadingDays.map((_, index) => <span key={`empty-${index}`} aria-hidden="true" />)}
        {calendarDays.map((date) => {
        const selected = date === selectedDate;
          const available = availableDateSet.has(date);
        return (
          <motion.button
            key={date}
            type="button"
            onClick={() => onSelect(date)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.92 }}
            className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full font-nunito text-xs font-extrabold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 sm:h-11 sm:w-11 sm:text-sm ${
              selected
                ? available
                  ? 'bg-gold text-white shadow-md shadow-gold-300/30'
                  : 'bg-navy-600 text-white shadow-md'
                : available
                  ? 'border border-gold-200 bg-white text-navy-700 hover:bg-gold-50'
                  : 'border border-dashed border-navy-200/50 bg-navy-50 text-navy-300 hover:border-gold-300 hover:bg-gold-50 hover:text-navy-700'
            }`}
            aria-label={
              available
                ? `Read devotional for ${formatDevotionalDate(date)}`
                : `Devotional unavailable for ${formatDevotionalDate(date)}`
            }
            aria-pressed={selected}
          >
            {Number(date.slice(-2))}
          </motion.button>
        );
        })}
      </div>
    </div>
  );
}
