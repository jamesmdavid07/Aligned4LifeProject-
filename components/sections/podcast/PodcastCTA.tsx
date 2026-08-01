'use client';

import { Music2, Play } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

const spotifyUrl =
  'https://open.spotify.com/show/6hDIn9yf4lU6kqmEBSAZgT?si=6b3f234dffc64ef4';

export function PodcastCTA() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 text-center md:px-8 lg:px-12">
        <Reveal>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-white shadow-lg">
            <Music2 size={28} aria-hidden="true" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Stay Connected
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="mx-auto mt-3 max-w-2xl font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
            Stay Aligned, One Conversation at a Time
          </h2>
        </Reveal>
        <Reveal delay={0.25}>
          <p className="mx-auto mt-4 max-w-2xl font-roboto text-base text-textgray md:text-lg">
            Catch every episode of the Align365 Podcast — truth, healing, and transformation
            for your daily walk with God.
          </p>
        </Reveal>

        <Reveal delay={0.35}>
          <div className="mt-9">
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-gold px-10 py-3.5 font-raleway text-xl font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <Play size={18} aria-hidden="true" />
              Listen on Spotify
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
