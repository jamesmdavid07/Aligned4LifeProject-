'use client';

import Image from 'next/image';
import { Reveal } from '@/components/animations/Reveal';

export function OurStory() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        {/* Section label */}
        <Reveal>
          <p className="text-center font-raleway text-sm font-semibold tracking-[0.3em] text-gold">
            W H E R E&nbsp; I T&nbsp; B E G A N
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-2 text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
            Our Story
          </h2>
        </Reveal>

        {/* Story content - 3 columns */}
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
          {/* Left: story text */}
          <Reveal direction="right">
            <div className="font-roboto text-sm leading-relaxed text-blacktext md:text-base">
              <p className="mb-4">
                <span className="font-bold text-gold">Aligned4LifeProject</span> was born
                from the heart and ministry of{' '}
                <span className="font-bold text-navy-600">Roderic Bishop</span>, a servant of
                God with a passion for reaching those who feel forgotten and forsaken.
              </p>
              <p className="mb-4">
                Though raised in a supportive Methodist home, Roderic experienced a
                life-changing encounter with Christ at Kingsboro Temple of Seventh-day
                Adventists in Brooklyn, New York. This moment awakened a deep passion for
                worship, prayer, and service.
              </p>
              <p className="mb-4">
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

          {/* Middle: quote */}
          <Reveal delay={0.15}>
            <div className="flex flex-col justify-center rounded-2xl bg-navy-600 p-8 text-center shadow-lg">
              <p className="font-raleway text-lg italic leading-relaxed text-white/90 md:text-xl">
                &ldquo;My calling is simple: reach the forgotten, speak truth, and point every
                life back toward its Creator.&rdquo;
              </p>
              <p className="mt-6 font-nunito text-base font-bold text-gold">
                — Pr. Roderic Bishop, Founder
              </p>
            </div>
          </Reveal>

          {/* Right: photo + scripture */}
          <Reveal direction="left" delay={0.2}>
            <div className="flex flex-col items-center gap-6">
              <div className="relative h-64 w-full max-w-xs">
                <Image
                  src="/images/roderic.png"
                  alt="Pr. Roderic Bishop, Founder of Aligned4LifeProject"
                  fill
                  className="rounded-2xl object-cover shadow-lg"
                  sizes="(max-width: 768px) 280px, 320px"
                />
              </div>

              {/* Scripture foundation */}
              <div className="w-full rounded-2xl bg-navy-600 p-6 text-center shadow-lg">
                <h3 className="font-nunito text-xl font-bold text-navy-600 bg-white rounded-lg py-2 mb-3">
                  Scripture Foundation
                </h3>
                <p className="font-nunito text-lg font-bold text-white">
                  Proverbs 3:5–6
                </p>
                <p className="mt-3 font-roboto text-sm leading-relaxed text-lightgray">
                  Trust in the Lord with all your heart,<br />
                  And lean not on your own understanding;<br />
                  In all your ways acknowledge Him,<br />
                  And He shall direct your paths.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
