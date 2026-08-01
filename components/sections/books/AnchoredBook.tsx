'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

export function AnchoredBook() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left: text */}
          <Reveal direction="right" className="text-center lg:text-left">
            <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Featured Resource
            </p>
            <h2 className="mt-3 font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
              Anchored In Alignment
            </h2>
            <h3 className="mt-2 font-nunito text-lg font-bold text-gold md:text-xl">
              Aligning With God&apos;s Purpose, Plans, and Promises
            </h3>
            <p className="mx-auto mt-4 max-w-xl font-roboto text-base leading-relaxed text-textgray md:text-lg lg:mx-0">
              A powerful devotional designed to help you align your life with God&apos;s will,
              grow in spiritual clarity, and stay grounded in His truth. This resource guides
              you through a journey of reflection, renewal, and deeper connection with God.
            </p>
            <a
              href="https://a.co/d/0gyLBfFV"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Buy Now
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Reveal>

          {/* Right: book cover */}
          <Reveal direction="left" delay={0.15}>
            <div className="flex justify-center md:justify-end">
              <div className="relative h-80 w-56 md:h-96 md:w-72">
                <Image
                  src="/images/books/anchored-book.png"
                  alt="Anchored In Alignment book cover"
                  fill
                  className="rounded-lg object-contain shadow-2xl"
                  sizes="(max-width: 768px) 224px, 288px"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
