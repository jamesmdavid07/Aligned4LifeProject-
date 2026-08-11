import { Clock3 } from 'lucide-react';

export function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-1.5 font-roboto text-sm font-semibold text-navy-600 shadow-sm">
      <Clock3 size={16} className="text-gold" aria-hidden="true" />
      {minutes} min read
    </span>
  );
}
