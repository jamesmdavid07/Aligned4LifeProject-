import { Clock3 } from 'lucide-react';

export function ReadingTime({ minutes }: { minutes: number }) {
  return (
    <span className="inline-flex items-center gap-2 font-roboto text-sm text-textgray">
      <Clock3 size={16} aria-hidden="true" />
      {minutes} min read
    </span>
  );
}
