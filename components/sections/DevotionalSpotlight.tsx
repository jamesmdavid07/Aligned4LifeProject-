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
          content: row.content,
          ellenWhiteInsight: row.ellenWhiteInsight,
          reflection: row.reflection,
          todaysDeclaration: row.todaysDeclaration,
          appeal: row.appeal,
          prayer: row.prayer,
          keyText: row.keyText,
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
        {/* Section title */}
        <Reveal className="text-center">
          <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {formatDevotionalDate(devotional.date)}
          </p>
          <h2 className="mt-3 font-nunito text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
            Daily Devotional
          </h2>
          <span className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/70" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/70" />
          </span>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left: devotional text */}
          <Reveal direction="right" className="text-center lg:text-left">
            <h3 className="font-nunito text-2xl font-bold text-white md:text-3xl lg:text-4xl">
              {firstPart}.
              {subtitle && (
                <span className="mt-1 block font-extrabold text-gold">{subtitle}</span>
              )}
            </h3>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <ReadingTime minutes={devotional.readingTime} />
            </div>

            <p className="mx-auto mt-4 max-w-xl font-roboto text-base leading-relaxed text-lightgray md:text-lg lg:mx-0">
              {devotional.reflection}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
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
            </div>
          </Reveal>

          {/* Right: Key Text card */}
          <Reveal direction="left" delay={0.15}>
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-3 rounded-3xl border border-gold/30"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gold-50 to-white px-8 py-10 text-center shadow-xl">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-[-20%] top-[-20%] h-40 w-40 rounded-full bg-gold/10 blur-3xl" />
                </div>
                <div className="relative">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-navy-600 text-gold shadow-lg">
                    <BookOpen size={20} aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-raleway text-xs font-bold uppercase tracking-[0.25em] text-gold">
                    Key Text
                  </p>
                  <blockquote className="mt-4">
                    <p className="font-nunito text-xl font-bold leading-relaxed text-navy-700 md:text-2xl">
                      &ldquo;{devotional.keyText}&rdquo;
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
