'use client';

import { Compass, Eye } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

export function MissionVisionSection() {
  return (
    <section className="relative overflow-hidden bg-navy-600 py-16 md:py-20">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] bottom-[-20%] h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-5%] top-[-10%] h-80 w-80 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <p className="text-center font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Why We Exist
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-center font-nunito text-3xl font-bold text-white md:text-4xl">
            Mission &amp; Vision
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:gap-8">
          <Reveal direction="right">
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-gold/30 md:p-10">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold text-white shadow-lg">
                  <Compass size={22} />
                </span>
                <h3 className="font-nunito text-2xl font-bold text-white">Our Mission</h3>
              </div>
              <div className="mt-5 h-px w-12 bg-gold/60" />
              <p className="mt-5 font-roboto text-base leading-relaxed text-white md:text-lg">
                The Align4LifeProject exists to realign lives for maximum{' '}
                <span className="font-bold text-white">Kingdom impact</span>—helping people
                live <span className="font-bold text-white">aligned</span>,{' '}
                <span className="font-bold text-white">anchored</span>, and{' '}
                <span className="font-bold text-white">activated</span> for purpose.
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.15}>
            <div className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-gold/30 md:p-10">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold text-white shadow-lg">
                  <Eye size={22} />
                </span>
                <h3 className="font-nunito text-2xl font-bold text-white">Our Vision</h3>
              </div>
              <div className="mt-5 h-px w-12 bg-gold/60" />
              <p className="mt-5 font-roboto text-base leading-relaxed text-white md:text-lg">
                To see lives <span className="font-bold text-white">aligned</span> and{' '}
                <span className="font-bold text-white">activated</span> in God&apos;s purpose,
                living with <span className="font-bold text-white">clarity</span>,{' '}
                <span className="font-bold text-white">conviction</span>, and{' '}
                <span className="font-bold text-white">Kingdom impact</span>.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
