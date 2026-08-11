'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Archive } from './Archive';
import { BackToTodayButton } from './BackToTodayButton';
import { DevotionalCard } from './DevotionalCard';
import { HeroBanner } from './HeroBanner';
import { formatDevotionalDate, getTodayDate } from '@/lib/devotionals';
import type { Devotional } from '@/lib/devotionals';

export type DbDevotional = {
  id: number;
  title: string;
  content: string;
  ellenWhiteInsight?: string;
  reflection: string;
  todaysDeclaration?: string;
  appeal?: string;
  prayer: string;
  keyText?: string;
  publish_date: string;
  date: string;
};

function mapDbDevotional(row: DbDevotional): Devotional {
  return {
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
  };
}

export function DevotionalsPage({ initialDevotionals = [] }: { initialDevotionals?: DbDevotional[] }) {
  const initialMapped = initialDevotionals.map(mapDbDevotional);
  const initialToday = getTodayDate();
  const initialDisplayed = initialMapped.find((item) => item.date === initialToday) ?? null;
  const initialDevotionalIsMissing = !initialDisplayed;
  const [today, setToday] = useState(getTodayDate);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [displayedDevotional, setDisplayedDevotional] = useState<Devotional | null>(initialDisplayed);
  const [isLoading, setIsLoading] = useState(initialDevotionalIsMissing);
  const [loadError, setLoadError] = useState<string | null>(null);

  const isUnavailable = Boolean(selectedDate) && selectedDate > today && !displayedDevotional;
  const isToday = Boolean(displayedDevotional?.date) && displayedDevotional?.date === today;

  useEffect(() => {
    const currentDate = getTodayDate();
    setToday(currentDate);

    async function loadDevotionals() {
      try {
        const response = await fetch('/api/devotionals', { cache: 'no-store' });
        const result = await response.json();

        if (response.ok && result.success && Array.isArray(result.data)) {
          const rows = result.data as DbDevotional[];
          const mapped = rows.map(mapDbDevotional);
          const dates = mapped.map((item) => item.date).filter((date) => date <= currentDate);

          setAvailableDates(dates);

          const todaysDevotional = mapped.find((item) => item.date === currentDate) ?? null;
          setDisplayedDevotional(todaysDevotional);
          setSelectedDate(todaysDevotional?.date ?? currentDate);
          setLoadError(todaysDevotional ? null : 'Today\'s devotional is not available yet.');
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setLoadError('Unable to load devotionals right now.');
        }
      } catch (error) {
        console.error('Failed to load devotionals from MySQL', error);
        setLoadError('Unable to load devotionals right now.');
        setIsLoading(false);
      }
    }

    loadDevotionals();
  }, []);

  async function selectDate(date: string) {
    setSelectedDate(date);
    setLoadError(null);

    if (date > today) {
      setDisplayedDevotional(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/devotionals?date=${encodeURIComponent(date)}`, { cache: 'no-store' });
      const result = await response.json();

      if (response.ok && result.success && Array.isArray(result.data) && result.data[0]) {
        const row = result.data[0] as DbDevotional;
        setDisplayedDevotional(mapDbDevotional(row));
      } else {
        setDisplayedDevotional(null);
        setLoadError('No devotional available for this date.');
      }
    } catch (error) {
      setDisplayedDevotional(null);
      setLoadError('Unable to load the devotional for this date.');
      console.error('Failed to load selected devotional', error);
    } finally {
      setIsLoading(false);
      window.requestAnimationFrame(() => {
        document.getElementById('featured-devotional')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  const activeDevotional = displayedDevotional;
  const activeSelectedDate = selectedDate || activeDevotional?.date || today;

  return (
    <>
      <HeroBanner />
      <main className="bg-navy-50 py-12 md:py-16">
        <div className="space-y-8">
          <section id="featured-devotional" className="scroll-mt-24" aria-labelledby="featured-heading">
            <div className="mx-auto mb-5 flex w-full max-w-site flex-wrap items-end justify-between gap-4 px-4 md:px-8 lg:px-12">
              <div>
                <p className="font-raleway text-sm font-bold uppercase tracking-[0.25em] text-gold">Daily nourishment</p>
                <h2 id="featured-heading" className="mt-2 font-nunito text-3xl font-extrabold text-navy-600 sm:text-4xl">
                  {isUnavailable || !activeDevotional ? "Devotional not yet available" : isToday ? `Today's Devotional - ${formatDevotionalDate(activeDevotional.date)}` : `Devotional for ${formatDevotionalDate(activeDevotional.date)}`}
                </h2>
              </div>
              {isUnavailable && (
                <BackToTodayButton onClick={() => selectDate(today)} />
              )}
              {!isToday && !isUnavailable && (
                <BackToTodayButton onClick={() => selectDate(today)} />
              )}
            </div>
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="mx-auto max-w-site px-4 md:px-8 lg:px-12"
                >
                  <div className="rounded-2xl border border-gold-200 bg-gradient-to-b from-gold-50 to-white p-8 text-center shadow-md">
                    <p className="font-nunito text-lg font-bold text-navy-700">Loading devotional...</p>
                  </div>
                </motion.div>
              ) : isUnavailable || loadError || !activeDevotional ? (
                <motion.div
                  key="unavailable"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="mx-auto max-w-site px-4 md:px-8 lg:px-12"
                >
                  <div className="rounded-2xl border border-gold-200 bg-gradient-to-b from-gold-50 to-white p-8 text-center shadow-md">
                    <p className="font-nunito text-lg font-bold text-navy-700">
                      {loadError || 'This devotional is not yet available'}
                    </p>
                    <p className="mt-2 font-roboto text-sm text-textgray">
                      Check back on {formatDevotionalDate(activeSelectedDate)} for today&apos;s reading.
                    </p>
                    <BackToTodayButton onClick={() => selectDate(today)} />
                  </div>
                </motion.div>
              ) : (
                <DevotionalCard devotional={activeDevotional} />
              )}
            </AnimatePresence>
          </section>
          <div className="mx-auto w-full max-w-site px-4 md:px-8 lg:px-12">
            <Archive year={Number(today.slice(0, 4))} today={today} selectedDate={activeSelectedDate} availableDates={availableDates} onSelectDate={selectDate} />
          </div>
        </div>
      </main>
    </>
  );
}
