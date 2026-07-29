'use client';

import { Reveal } from '@/components/animations/Reveal';

export function EventsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-site px-4 text-center md:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-nunito text-3xl font-bold text-midnavy md:text-4xl">
            🌆 Events
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-3xl font-roboto text-sm leading-relaxed text-blacktext md:text-base">
            Join our workshops, seminars, and spiritual retreats designed to create space for
            rest, renewal, and revelation. These experiences are available both in-person and
            online, helping you reconnect, refocus, and realign with God&apos;s purpose.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="mailto:info@aligned4lifeproject.com?subject=Events%20Inquiry"
            className="mt-8 inline-block rounded-md bg-gold px-8 py-3 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Book Now
          </a>
        </Reveal>
      </div>
    </section>
  );
}
