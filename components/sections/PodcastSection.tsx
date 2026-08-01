'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/animations/Reveal';

export function PodcastSection() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left: text + button */}
          <Reveal direction="right">
            <h2 className="font-nunito text-3xl font-bold text-navy-600 md:text-4xl lg:text-5xl">
              Align365 Podcast
            </h2>
            <p className="mt-4 font-roboto text-base text-textgray md:text-lg">
              Podcasts that provoke and point to purpose, where biblical truth meets
              real-life challenges.
            </p>
            <Link
              href="/podcast#section-shared-header"
              className="mt-6 inline-block rounded-md bg-navy-600 px-10 py-3.5 font-raleway text-xl font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              🎧 Listen Now
            </Link>
          </Reveal>

          {/* Right: podcast cover image */}
          <Reveal direction="left" delay={0.15}>
            <div className="flex justify-center md:justify-end">
              <div className="relative h-64 w-64 md:h-80 md:w-80">
                <Image
                  src="/images/home/podcast-cover.png"
                  alt="Align365 Podcast cover"
                  fill
                  className="rounded-2xl object-cover shadow-xl"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
