'use client';

import Image from 'next/image';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const ruinsBooks = [
  {
    src: '/images/books/ruins-main.png',
    title: 'Main Book',
    href: 'https://a.co/d/0bqgzp7t',
  },
  {
    src: '/images/books/ruins-workbook.png',
    title: 'Companion WorkBook',
    href: 'https://amzn.asia/d/0gShxZOf',
  },
  {
    src: '/images/books/ruins-prayer.png',
    title: 'Prayer Book',
    href: 'https://a.co/d/0bqgzp7t',
  },
];

export function RuinsCollection() {
  return (
    <section className="relative overflow-hidden bg-navy-600 py-14 md:py-20">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-5%] bottom-[10%] h-96 w-96 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <Reveal>
          <p className="text-center font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            The Collection
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-center font-nunito text-3xl font-bold text-white md:text-4xl">
            Redeemed From the Ruins Collection
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-4 max-w-3xl text-center font-roboto text-base leading-relaxed text-lightgray md:text-lg">
            A complete transformational resource system designed to guide you from
            brokenness to restoration. Each component works together to help you process
            pain, pursue healing, and realign your life with purpose through biblical truth.
          </p>
        </Reveal>

        {/* Three book cards */}
        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-3 md:gap-8" stagger={0.15}>
          {ruinsBooks.map((book) => (
            <StaggerItem key={book.title}>
              <div className="group flex h-full flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-white/10">
                <div className="relative h-72 w-52 transition-transform duration-500 group-hover:scale-105 md:h-80 md:w-56">
                  <Image
                    src={book.src}
                    alt={`${book.title} book cover`}
                    fill
                    className="rounded-lg object-contain shadow-2xl"
                    sizes="(max-width: 640px) 208px, 224px"
                  />
                </div>
                <h3 className="mt-5 font-nunito text-xl font-bold text-white">
                  {book.title}
                </h3>
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Buy Now
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
