'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';
import { getLatestPublished, formatDevotionalDate, getTodayDate } from '@/lib/devotionals';

export function DevotionalSpotlight() {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(getTodayDate());
  }, []);

  const devotional = today ? getLatestPublished(today) : null;

  if (!devotional) return null;

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
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left: devotional image */}
          <Reveal direction="right">
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-3 rounded-3xl border border-gold/40"
                aria-hidden="true"
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={devotional.image}
                  alt={`Devotional artwork: ${devotional.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-1.5 font-raleway text-sm font-bold uppercase tracking-[0.18em] text-white">
                  <BookOpen size={14} aria-hidden="true" />
                  Today&apos;s Devotional
                </span>
              </div>
            </div>
          </Reveal>

          {/* Right: text */}
          <Reveal direction="left" delay={0.15} className="text-center lg:text-left">
            <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              {formatDevotionalDate(devotional.date)}
            </p>
            <h2 className="mt-3 font-nunito text-3xl font-bold text-white md:text-4xl">
              {firstPart}.
              {subtitle && (
                <span className="mt-1 block font-extrabold">{subtitle}</span>
              )}
            </h2>
            <span className="mt-4 inline-block rounded-lg bg-white/10 px-4 py-1.5 font-raleway text-sm font-bold uppercase tracking-[0.18em] text-gold">
              {devotional.scripture}
            </span>

            <blockquote className="mx-auto mt-6 max-w-md border-l-4 border-gold pl-5 text-left lg:mx-0">
              <p className="font-nunito text-lg font-bold leading-relaxed text-lightgray md:text-xl">
                &ldquo;{devotional.keyVerse}&rdquo;
              </p>
            </blockquote>

            <p className="mt-5 font-roboto text-sm text-lightgray md:text-base">
              {devotional.readingTime} min read
            </p>

            <Link
              href="/devotionals"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
