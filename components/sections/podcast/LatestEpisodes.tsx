'use client';

import Image from 'next/image';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const episodes = [
  {
    title: 'Alignment',
    day: 'Monday',
    src: '/images/podcast/podcast-mon.png',
    embedUrl: 'https://open.spotify.com/embed/episode/3wfeV03opBWFwo7evDwtlS',
  },
  {
    title: 'Realignment',
    day: 'Wednesday',
    src: '/images/podcast/podcast-wed.png',
    embedUrl: 'https://open.spotify.com/embed/episode/5kV2UHagaMjDh8QUObPc6r',
  },
  {
    title: 'Renewal',
    day: 'Friday',
    src: '/images/podcast/podcast-fri.png',
    embedUrl: 'https://open.spotify.com/embed/episode/191aO1uwu5Niz90l7WQp8t',
  },
];

export function LatestEpisodes() {
  return (
    <section className="relative overflow-hidden bg-navy-600 py-14 md:py-20">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-5%] bottom-[10%] h-96 w-96 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <p className="text-center font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Listen Now
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-center font-nunito text-3xl font-bold text-white md:text-4xl">
            Latest Episodes
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-2xl text-center font-roboto text-base text-lightgray md:text-lg">
            New episodes are released three times a week. Press play and listen right here.
          </p>
        </Reveal>

        {/* Episode cards */}
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8" stagger={0.15}>
          {episodes.map((episode) => (
            <StaggerItem key={episode.title}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-700/40 shadow-lg transition-all duration-300 hover:border-gold/30 hover:shadow-2xl">
                {/* Artwork header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={episode.src}
                    alt={`${episode.title} podcast artwork`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-raleway text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                      {episode.day}s
                    </p>
                    <h3 className="mt-1 font-nunito text-2xl font-bold text-white">
                      {episode.title}
                    </h3>
                  </div>
                </div>

                {/* Embedded Spotify player */}
                <div className="flex flex-1 flex-col justify-center bg-white/5 p-4">
                  <iframe
                    src={episode.embedUrl}
                    width="100%"
                    height="232"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-lg"
                    title={`${episode.title} on Spotify`}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
