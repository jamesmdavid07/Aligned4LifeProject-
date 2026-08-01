'use client';

import Image from 'next/image';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const schedule = [
  {
    src: '/images/podcast/podcast-mon.png',
    day: 'Mondays',
    title: 'Alignment',
  },
  {
    src: '/images/podcast/podcast-wed.png',
    day: 'Wednesdays',
    title: 'Realignment',
  },
  {
    src: '/images/podcast/podcast-fri.png',
    day: 'Fridays',
    title: 'Renewal',
  },
];

export function PodcastAbout() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        {/* About text */}
        <Reveal>
          <h2 className="text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
            About <span className="text-gold">Align365</span> Podcast
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-3xl text-center font-roboto text-base text-navy-600 md:text-lg">
            Welcome to the Align365 Podcast. We release new episodes three times a week to
            help you grow, reflect, and stay aligned with God&apos;s purpose.
          </p>
        </Reveal>

        {/* Schedule cards */}
        <StaggerGroup className="mt-12 grid gap-8 sm:grid-cols-3 md:gap-10" stagger={0.15}>
          {schedule.map((item) => (
            <StaggerItem key={`${item.day}-${item.title}`}>
              <div className="group flex flex-col items-center">
                <div className="relative h-48 w-48 overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 group-hover:scale-105 md:h-56 md:w-56">
                  <Image
                    src={item.src}
                    alt={`${item.title} podcast artwork`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 192px, 224px"
                  />
                </div>
                <p className="mt-4 font-raleway text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  {item.day}
                </p>
                <h3 className="mt-1 font-nunito text-xl font-bold text-navy-600">
                  {item.title}
                </h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
