'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Archive } from './Archive';
import { BackToTodayButton } from './BackToTodayButton';
import { DevotionalCard } from './DevotionalCard';
import { HeroBanner } from './HeroBanner';
import { devotionals, formatDevotionalDate, getLatestPublished, getTodayDate } from '@/lib/devotionals';

export function DevotionalsPage() {
  const [today, setToday] = useState(getTodayDate);
  const [selectedDate, setSelectedDate] = useState(
    () => getLatestPublished(getTodayDate())?.date ?? devotionals[0].date,
  );
  const devotional = devotionals.find((item) => item.date === selectedDate);
  const fallbackDevotional = getLatestPublished(today);
  const isUnavailable = selectedDate > today && !devotional;
  const displayedDevotional = devotional ?? fallbackDevotional;
  const isToday = displayedDevotional?.date === today;

  useEffect(() => {
    const currentDate = getTodayDate();
    setToday(currentDate);
    const latest = getLatestPublished(currentDate);
    if (latest) setSelectedDate(latest.date);
  }, []);

  function selectDate(date: string) {
    setSelectedDate(date);
    window.requestAnimationFrame(() => {
      document.getElementById('featured-devotional')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if (!displayedDevotional) return null;

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
                  {isUnavailable ? "Devotional not yet available" : isToday ? `Today's Devotional - ${formatDevotionalDate(displayedDevotional.date)}` : `Devotional for ${formatDevotionalDate(displayedDevotional.date)}`}
                </h2>
              </div>
              {isUnavailable && (
                <BackToTodayButton onClick={() => selectDate(getLatestPublished(today)?.date ?? displayedDevotional.date)} />
              )}
              {!isToday && !isUnavailable && (
                <BackToTodayButton onClick={() => selectDate(getLatestPublished(today)?.date ?? displayedDevotional.date)} />
              )}
            </div>
            <AnimatePresence mode="wait">
              {isUnavailable ? (
                <motion.div
                  key="unavailable"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="mx-auto max-w-site px-4 md:px-8 lg:px-12"
                >
                  <div className="rounded-2xl border border-gold-200 bg-gradient-to-b from-gold-50 to-white p-8 text-center shadow-md">
                    <p className="font-nunito text-lg font-bold text-navy-700">This devotional is not yet available</p>
                    <p className="mt-2 font-roboto text-sm text-textgray">
                      Check back on {formatDevotionalDate(selectedDate)} for today&apos;s reading.
                    </p>
                    <BackToTodayButton onClick={() => selectDate(getLatestPublished(today)?.date ?? displayedDevotional.date)} />
                  </div>
                </motion.div>
              ) : (
                <DevotionalCard devotional={displayedDevotional} />
              )}
            </AnimatePresence>
          </section>
          <div className="mx-auto w-full max-w-site px-4 md:px-8 lg:px-12">
            <Archive year={Number(today.slice(0, 4))} today={today} selectedDate={selectedDate} onSelectDate={selectDate} />
          </div>
        </div>
      </main>
    </>
  );
}
