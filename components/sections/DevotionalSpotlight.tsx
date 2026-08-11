'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { formatDevotionalDate, getTodayDate, type Devotional } from '@/lib/devotionals';
import { ReadingTime } from '@/components/devotionals/ReadingTime';

export function DevotionalSpotlight() {
  const [today, setToday] = useState<string | null>(null);
  const [devotional, setDevotional] = useState<Devotional | null>(null);

  useEffect(() => {
    const currentDate = getTodayDate();
    setToday(currentDate);

    fetch(`/api/devotionals?date=${encodeURIComponent(currentDate)}`, { cache: 'no-store' })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success || !Array.isArray(result.data) || !result.data[0]) return;
        const row = result.data[0];
        setDevotional({
          id: row.id,
          date: row.publish_date || row.date,
          title: row.title,
          scripture: row.scripture,
          content: row.content,
          ellenWhiteInsight: row.ellenWhiteInsight,
          reflection: row.reflection,
          todaysDeclaration: row.todaysDeclaration,
          appeal: row.appeal,
          prayer: row.prayer,
          keyText: row.keyText,
          keyVerse: row.keyText || row.scripture,
          readingTime: Math.max(2, Math.ceil((row.content?.split(/\s+/).filter(Boolean).length || 0) / 150)),
        });
      })
      .catch((error) => console.error('Failed to load devotional spotlight', error));
  }, []);

  if (!today || !devotional) return null;

  const [firstPart, ...restParts] = devotional.title.split('. ');
  const subtitle = restParts.join('. ');

  return (
    <section
      className="relative overflow-hidden py-14 md:py-20"
      style={{ background: '#1A3A71' }}
    >
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-5%] top-[10%] h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute left-[-10%] bottom-[10%] h-96 w-96 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-3xl">
          <Reveal direction="up">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {formatDevotionalDate(devotional.date)}
              </p>
              <h2 className="font-nunito text-3xl font-bold text-white md:text-4xl">
                {firstPart}.
                {subtitle && (
                  <span className="mt-1 block font-extrabold">{subtitle}</span>
                )}
              </h2>
              <ReadingTime minutes={devotional.readingTime} />
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15} className="mt-8">
            <div className="rounded-2xl border border-gold/40 bg-navy-800/60 px-6 py-6 text-center shadow-2xl backdrop-blur sm:px-10 sm:py-8">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white shadow-lg">
                <BookOpen size={18} aria-hidden="true" />
              </div>
              <p className="mt-3 font-nunito text-sm font-bold uppercase tracking-widest text-gold">Key Text</p>
              <blockquote className="mx-auto mt-4 max-w-2xl">
                <p className="font-nunito text-xl font-bold leading-relaxed text-white md:text-2xl">
                  &ldquo;{devotional.keyText || devotional.keyVerse || devotional.scripture}&rdquo;
                </p>
              </blockquote>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.25} className="mt-8 text-center">
            <Link
              href="/devotionals"
              className="group inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Read Today&apos;s Devotional
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
