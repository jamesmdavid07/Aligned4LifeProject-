'use client';

import Image from 'next/image';
import { BookOpen, Quote } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

export function OurStory() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        {/* Section label */}
        <Reveal>
          <p className="text-center font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Where It Began
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
            Our Story
          </h2>
        </Reveal>

        {/* Story + portrait */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal direction="right" className="text-center lg:text-left lg:col-span-7">
            <div className="font-roboto text-sm leading-relaxed text-blacktext md:text-base lg:text-lg">
              <p className="mb-5">
                <span className="font-bold text-gold">Aligned4LifeProject</span> was born
                from the heart and ministry of{' '}
                <span className="font-bold text-navy-600">Roderic Bishop</span>, a servant of
                God with a passion for reaching those who feel forgotten and forsaken.
              </p>
              <p className="mb-5">
                Though raised in a supportive Methodist home, Roderic experienced a
                life-changing encounter with Christ at Kingsboro Temple of Seventh-day
                Adventists in Brooklyn, New York. This moment awakened a deep passion for
                worship, prayer, and service.
              </p>
              <p className="mb-5">
                His journey has taken him from Brooklyn to Berrien Springs, Houston, and
                Lake Jackson, Texas—demonstrating that no distance is too far when God calls.
              </p>
              <p>
                Anchored in Proverbs 3:5–6, his mission is to reach the overlooked, share the
                hope of the gospel, and inspire others to live fully aligned with God&apos;s
                will.
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <div
                className="absolute -inset-2 rounded-3xl border border-gold/40"
                aria-hidden="true"
              />
              <Image
                src="/images/about/roderic.png"
                alt="Pr. Roderic Bishop, Founder of Aligned4LifeProject"
                fill
                className="relative rounded-3xl object-cover shadow-lg"
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 60vw, 90vw"
              />
            </div>
          </Reveal>
        </div>

        {/* Quote + Scripture cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-navy-600 p-8 shadow-lg md:p-10">
              <Quote
                className="pointer-events-none absolute -top-3 right-4 h-20 w-20 text-white/5"
                aria-hidden="true"
              />
              <p className="font-raleway text-lg italic leading-relaxed text-white/90 md:text-xl">
                &ldquo;My calling is simple: reach the forgotten, speak truth, and point every
                life back toward its Creator.&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <p className="font-nunito text-sm font-bold text-gold">
                  Pr. Roderic Bishop, Founder
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-navy-600 p-8 shadow-lg md:p-10">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-gold" aria-hidden="true" />
                <h3 className="font-nunito text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Scripture Foundation
                </h3>
              </div>
              <p className="font-nunito text-xl font-bold text-white md:text-2xl">
                Proverbs 3:5–6
              </p>
              <p className="mt-4 flex flex-1 items-center font-roboto text-sm leading-relaxed text-lightgray md:text-base">
                Trust in the Lord with all your heart, and lean not on your own
                understanding; in all your ways acknowledge Him, and He shall direct your
                paths.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
