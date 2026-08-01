'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

export function BooksCTA() {
  return (
    <section className="relative overflow-hidden bg-navy-50 py-16 md:py-20">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-20%] h-80 w-80 -translate-x-1/2 rounded-full bg-gold/15 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-5%] h-96 w-96 rounded-full bg-navy-100/40 blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-5%] h-96 w-96 rounded-full bg-navy-100/40 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 text-center md:px-8 lg:px-12">
        <Reveal>
          <h2 className="font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
            Start Your Journey of Alignment
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-2xl font-roboto text-base text-textgray md:text-lg">
            Each resource is designed to help you grow, heal, and live aligned with God&apos;s
            purpose.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9">
            <Link
              href="/podcast#section-shared-header"
              className="group inline-flex items-center gap-2 rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Listen to the Podcast
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
