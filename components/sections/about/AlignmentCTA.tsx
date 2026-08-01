'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

export function AlignmentCTA() {
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
            Be Part of the <span className="text-gold">Alignment</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-2xl font-roboto text-base text-textgray md:text-lg">
            Join a growing movement of individuals committed to living{' '}
            <span className="font-bold text-navy-600">aligned</span> with God&apos;s purpose.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-9">
            <Link
              href="/books#section-shared-header"
              className="group inline-flex items-center gap-2 rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore Books
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
