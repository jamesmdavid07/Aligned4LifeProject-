'use client';

import { Reveal } from '@/components/animations/Reveal';

interface MissionVisionProps {
  label: string;
  title: string;
  content: React.ReactNode;
}

export function MissionSection() {
  return (
    <section className="bg-navy-600 py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <p className="text-center font-raleway text-sm font-semibold tracking-[0.3em] text-gold">
            W H Y&nbsp; W E&nbsp; E X I S T
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-2 text-center font-nunito text-3xl font-bold text-white md:text-4xl">
            Our Mission
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-3xl text-center font-roboto text-base leading-relaxed text-lightgray md:text-lg">
            The Align4LifeProject exists to realign lives for maximum{' '}
            <span className="font-bold text-white">Kingdom impact</span>—helping people live{' '}
            <span className="font-bold text-gold">aligned</span>,{' '}
            <span className="font-bold text-gold">anchored</span>, and{' '}
            <span className="font-bold text-gold">activated</span> for purpose.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function VisionSection() {
  return (
    <section className="bg-navy-600 py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <p className="text-center font-raleway text-sm font-semibold tracking-[0.3em] text-gold">
            W H Y&nbsp; W E&nbsp; A R E&nbsp; H E A D E D
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-2 text-center font-nunito text-3xl font-bold text-white md:text-4xl">
            Our Vision
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-3xl text-center font-roboto text-base leading-relaxed text-white/85 md:text-lg">
            To see lives <span className="font-bold text-gold">aligned</span> and{' '}
            <span className="font-bold text-gold">activated</span> in God&apos;s purpose, living
            with <span className="font-bold text-white">clarity</span>,{' '}
            <span className="font-bold text-white">conviction</span>, and{' '}
            <span className="font-bold text-white">Kingdom impact</span>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
