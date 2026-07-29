'use client';

import { Reveal } from '@/components/animations/Reveal';

export function PodcastCTA() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 text-center md:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
            Stay Aligned, One Conversation at a Time
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-md bg-navy-600 px-10 py-3.5 font-raleway text-xl font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            🎧 Listen Now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
