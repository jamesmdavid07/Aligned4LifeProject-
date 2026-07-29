'use client';

import Image from 'next/image';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const ruinsBooks = [
  {
    src: '/images/ruins-main.png',
    title: 'Main Book',
    href: 'https://a.co/d/0bqgzp7t',
  },
  {
    src: '/images/ruins-workbook.png',
    title: 'Companion WorkBook',
    href: 'https://amzn.asia/d/0gShxZOf',
  },
  {
    src: '/images/ruins-prayer.png',
    title: 'Prayer Book',
    href: 'https://a.co/d/0bqgzp7t',
  },
];

export function RuinsCollection() {
  return (
    <section className="bg-darknavy py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <Reveal>
          <h2 className="text-center font-nunito text-3xl font-bold text-white md:text-4xl">
            Redeemed From the Ruins Collection
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-3xl text-center font-roboto text-sm leading-relaxed text-lightgray md:text-base">
            A complete transformational resource system designed to guide you from
            brokenness to restoration. Each component works together to help you process
            pain, pursue healing, and realign your life with purpose through biblical truth.
          </p>
        </Reveal>

        {/* Three book cards */}
        <StaggerGroup className="mt-10 grid gap-8 sm:grid-cols-3" stagger={0.15}>
          {ruinsBooks.map((book) => (
            <StaggerItem key={book.title}>
              <div className="group flex flex-col items-center">
                <div className="relative h-72 w-52 transition-transform duration-500 group-hover:scale-105 md:h-80 md:w-56">
                  <Image
                    src={book.src}
                    alt={`${book.title} book cover`}
                    fill
                    className="rounded-lg object-contain shadow-2xl"
                    sizes="(max-width: 640px) 208px, 224px"
                  />
                </div>
                <h3 className="mt-4 font-nunito text-xl font-bold text-white">
                  {book.title}
                </h3>
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block rounded-md bg-gold px-6 py-2.5 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
