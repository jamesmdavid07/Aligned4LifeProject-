'use client';

import Link from 'next/link';
import { ArrowRight, Compass, Flame, Heart } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const helpCards = [
  {
    icon: Compass,
    label: 'Align',
    title: 'Biblical Truth',
    description:
      'Ground your decisions in God\'s Word and bring your everyday life into line with His purpose.',
    gradient: 'from-navy-700 via-navy-600 to-navy-500',
  },
  {
    icon: Heart,
    label: 'Heal',
    title: 'Healing & Restoration',
    description:
      'Find freedom from past pain as God restores the wounded places that have held you back.',
    gradient: 'from-navy-900 via-navy-700 to-navy-500',
  },
  {
    icon: Flame,
    label: 'Transform',
    title: 'Transformation & Purpose',
    description:
      'Step boldly into the calling God has for you and live the life you were created for.',
    gradient: 'from-deepnavy via-navy-600 to-gold-600',
  },
];

export function HowWeHelp() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <Reveal>
          <p className="text-center font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Our Impact
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl lg:text-5xl">
            How We Help You Align
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-2xl text-center font-roboto text-base leading-relaxed text-textgray md:text-lg">
            Through teaching, healing, and discipleship, we walk with you toward the life
            God has designed for you.
          </p>
        </Reveal>

        {/* Three cards */}
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3 md:gap-8" stagger={0.15}>
          {helpCards.map((card) => {
            const Icon = card.icon;
            return (
              <StaggerItem key={card.title}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Designed header (replaces photo) */}
                  <div
                    className={`relative flex aspect-[315/228] w-full items-center justify-center overflow-hidden bg-gradient-to-br ${card.gradient}`}
                  >
                    <div className="pointer-events-none absolute left-[-15%] top-[-20%] h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-[-25%] right-[-10%] h-44 w-44 rounded-full bg-navy-300/20 blur-3xl" />
                    <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg bg-gold px-3 py-1.5 font-raleway text-xs font-bold uppercase tracking-[0.18em] text-white">
                      <Icon size={14} aria-hidden="true" />
                      {card.label}
                    </span>
                    <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 text-gold shadow-lg ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110">
                      <Icon size={40} aria-hidden="true" />
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-nunito text-xl font-bold text-navy-600">{card.title}</h3>
                    <p className="mt-2 flex-1 font-roboto text-sm leading-relaxed text-textgray md:text-base">
                      {card.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        {/* Tagline + CTA */}
        <Reveal delay={0.2}>
          <h3 className="mt-12 text-center font-nunito text-2xl font-bold text-navy-600 md:text-3xl lg:text-4xl">
            Don&apos;t Just Live—Live Aligned
          </h3>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 text-center">
            <Link
              href="/about#section-shared-header"
              className="group inline-flex items-center gap-2 rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              About Us
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
