'use client';

import { motion } from 'framer-motion';

interface MonthSelectorProps {
  months: number[];
  selectedMonth: number;
  onSelect: (month: number) => void;
}

export function MonthSelector({ months, selectedMonth, onSelect }: MonthSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Select month">
      {months.map((month) => {
        const label = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
          new Date(2026, month - 1, 1),
        );
        const selected = month === selectedMonth;
        return (
          <motion.button
            key={month}
            type="button"
            onClick={() => onSelect(month)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
         className={`shrink-0 rounded-full px-6 py-3 font-raleway text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 ${
               selected ? 'bg-navy-600 text-white shadow-md' : 'bg-navy-50 text-navy-600 hover:bg-gold-100'
             }`}
            aria-pressed={selected}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
}
