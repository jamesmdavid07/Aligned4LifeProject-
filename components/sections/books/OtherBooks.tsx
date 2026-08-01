'use client';

import Image from 'next/image';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const otherBooks = [
  {
    src: '/images/books/dangerous-liaisons.png',
    title: 'Dangerous Liaisons',
    subtitle: 'How People, Patterns, and Partnerships Derail Devotion',
    description:
      "A powerful exploration of how relationships influence your spiritual life. This book reveals how misaligned connections can impact your purpose and helps you realign with God's will.",
    href: 'https://a.co/d/0dZnBdw3',
  },
  {
    src: '/images/books/trauma-triggers.png',
    title: 'Trauma, Triggers, and Transformation',
    subtitle: 'Where Biblical Truth Meets Emotional Recovery',
    description:
      'A healing-centered guide that helps you confront pain, understand emotional triggers, and experience restoration through biblical truth and spiritual growth.',
    href: null,
  },
  {
    src: '/images/books/purposeful-pursuit.png',
    title: 'Purposeful Pursuit',
    subtitle: 'The 10 Pillars of Spiritually Aligned People',
    description:
      'A practical and inspiring framework to help you live with clarity, intention, and purpose through spiritually aligned principles.',
    href: null,
  },
];

export function OtherBooks() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <p className="text-center font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            More From the Library
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
            Other Books
          </h2>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8" stagger={0.15}>
          {otherBooks.map((book) => (
            <StaggerItem key={book.title}>
              <div className="group flex h-full flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:border-gold/30 hover:shadow-xl">
                <div className="relative h-56 w-40 transition-transform duration-500 group-hover:scale-105">
                  <Image
                    src={book.src}
                    alt={`${book.title} book cover`}
                    fill
                    className="rounded-lg object-contain shadow-xl"
                    sizes="(max-width: 768px) 160px, 160px"
                  />
                </div>
                <h3 className="mt-5 text-center font-nunito text-xl font-bold text-navy-600">
                  {book.title}
                </h3>
                <p className="mt-1.5 text-center font-nunito text-sm font-bold text-gold">
                  {book.subtitle}
                </p>
                <p className="mt-3 flex-1 text-center font-roboto text-sm leading-relaxed text-textgray md:text-base">
                  {book.description}
                </p>
                {book.href ? (
                  <a
                    href={book.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    Buy Now
                  </a>
                ) : (
                  <span className="mt-5 inline-block rounded-md border-2 border-navy-200 px-8 py-2.5 font-raleway text-base font-bold text-navy-400">
                    Coming Soon
                  </span>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
