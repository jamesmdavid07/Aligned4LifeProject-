'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const helpCards = [
  {
    src: '/images/help-1.png',
    alt: 'Alignment through biblical truth',
  },
  {
    src: '/images/help-2.png',
    alt: 'Healing and restoration',
  },
  {
    src: '/images/help-3.png',
    alt: 'Transformation and purpose',
  },
];

export function HowWeHelp() {
  return (
    <section className="bg-darknavy py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <Reveal>
          <h2 className="text-center font-nunito text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            How We Help You Align
          </h2>
        </Reveal>

        {/* Three image cards */}
        <StaggerGroup className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 md:gap-8" stagger={0.15}>
          {helpCards.map((card) => (
            <StaggerItem key={card.src}>
              <div className="group relative overflow-hidden rounded-2xl bg-navy-700/40 shadow-lg transition-all duration-300 hover:shadow-2xl">
                <div className="relative aspect-[315/228] w-full">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 350px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Tagline */}
        <Reveal delay={0.2}>
          <h3 className="mt-12 text-center font-nunito text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Don&apos;t Just Live—Live Aligned
          </h3>
        </Reveal>

        {/* About Us button */}
        <Reveal delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/about#section-shared-header"
              className="inline-block rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              About Us&gt;&gt;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
