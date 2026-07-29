'use client';

import Link from 'next/link';
import { Reveal } from '@/components/animations/Reveal';

export function AlignmentCTA() {
  return (
    <section className="bg-navy-600 py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 text-center md:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-nunito text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Be Part of the <span className="text-gold">Alignment</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-2xl font-roboto text-base text-lightgray md:text-lg">
            Join a growing movement of individuals committed to living{' '}
            <span className="font-bold text-white">aligned</span> with God&apos;s purpose.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8">
            <Link
              href="/resources#section-shared-header"
              className="inline-block rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore Resources &gt;&gt;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
