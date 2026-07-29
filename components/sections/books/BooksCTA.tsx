'use client';

import Link from 'next/link';
import { Reveal } from '@/components/animations/Reveal';

export function BooksCTA() {
  return (
    <section className="bg-navy-600 py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 text-center md:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-nunito text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Start Your Journey of Alignment
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-2xl font-roboto text-base text-lightgray md:text-lg">
            Each resource is designed to help you grow, heal, and live aligned with God&apos;s
            purpose.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8">
            <Link
              href="/resources#section-shared-header"
              className="inline-block rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore More Resources &gt;&gt;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
