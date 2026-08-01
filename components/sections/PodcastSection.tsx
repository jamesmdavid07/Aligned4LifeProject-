'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

const spotifyUrl =
  'https://open.spotify.com/show/6hDIn9yf4lU6kqmEBSAZgT?si=6b3f234dffc64ef4';

export function PodcastSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left: text */}
          <Reveal direction="right" className="text-center lg:text-left">
            <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              The Podcast
            </p>
            <h2 className="mt-3 font-nunito text-3xl font-bold text-navy-600 md:text-4xl lg:text-5xl">
              Align365 Podcast
            </h2>
            <h3 className="mt-2 font-nunito text-lg font-bold text-gold md:text-xl">
              Where Faith Aligns with Daily Life
            </h3>
            <p className="mx-auto mt-4 max-w-xl font-roboto text-base leading-relaxed text-textgray md:text-lg lg:mx-0">
              Podcasts that provoke and point to purpose — where biblical truth meets
              real-life challenges. New episodes every Monday, Wednesday, and Friday.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/podcast#section-shared-header"
                className="group inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Listen Now
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <a
                href={spotifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border-2 border-navy-600 px-8 py-3 font-raleway text-base font-bold text-navy-600 transition-all duration-300 hover:-translate-y-1 hover:bg-navy-600 hover:text-white"
              >
                <Play size={18} aria-hidden="true" />
                Subscribe on Spotify
              </a>
            </div>
          </Reveal>

          {/* Right: podcast cover */}
          <Reveal direction="left" delay={0.15}>
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-3 rounded-3xl border border-gold/30"
                aria-hidden="true"
              />
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-lg">
                <Image
                  src="/images/home/podcast-cover.png"
                  alt="Align365 Podcast cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
