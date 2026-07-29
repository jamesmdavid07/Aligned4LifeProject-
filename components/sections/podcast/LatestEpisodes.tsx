'use client';

import { Reveal } from '@/components/animations/Reveal';
import { Headphones } from 'lucide-react';

export function LatestEpisodes() {
  return (
    <section className="bg-navy-600 py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <h2 className="text-center font-nunito text-3xl font-bold text-white md:text-4xl">
            Latest Episodes
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-2xl text-center font-roboto text-sm text-lightgray md:text-base">
            New episodes are released three times a week. Check back soon for the latest
            conversations.
          </p>
        </Reveal>

        {/* Placeholder episode cards */}
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-col items-center gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex w-full max-w-2xl items-center gap-4 rounded-xl bg-navy-700/50 p-5 shadow-md transition-all duration-300 hover:bg-navy-700/70"
              >
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                  <Headphones size={24} />
                </div>
                <div className="flex-1">
                  <p className="font-nunito text-base font-bold text-white">
                    Episode Coming Soon
                  </p>
                  <p className="font-roboto text-sm text-lightgray">
                    Stay tuned for new Align365 episodes
                  </p>
                </div>
                <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-semibold text-lightgray">
                  Upcoming
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
