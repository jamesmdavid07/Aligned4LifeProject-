'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const resourceLinks = [
  { label: 'Books', href: '/books' },
  { label: 'Podcast', href: '/podcast' },
  { label: 'Devotionals', href: '/devotionals' },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden py-16 md:py-24 lg:py-28"
      style={{ background: '#1A3A71' }}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-5%] bottom-[15%] h-96 w-96 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid items-stretch gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: brand + message */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="sr-only">Aligned4LifeProject</h1>
            <div className="inline-flex rounded-xl bg-white p-5 md:p-6">
              <Image
                src="/images/shared/logo.png"
                alt="Aligned4LifeProject logo"
                width={320}
                height={70}
                className="h-auto w-[240px] md:w-[320px] lg:w-[380px]"
                priority
              />
            </div>

            <p className="mx-auto mt-8 max-w-xl font-roboto text-base leading-relaxed text-lightgray sm:text-lg md:text-xl lg:mx-0">
              Aligned4LifeProject was born from the heart and ministry of Roderic Bishop, a
              servant of God with a passion for reaching those who feel forgotten and
              forsaken.
            </p>

            {/* Featured resources */}
            <nav
              className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
              aria-label="Featured resources"
            >
              {resourceLinks.map((item, index) => (
                <span key={item.label} className="flex items-center gap-6">
                  {index > 0 && (
                    <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                  )}
                  <Link
                    href={item.href}
                    className="font-raleway text-base font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-gold md:text-lg"
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </nav>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link
                href="/contact"
                className="inline-block rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Contact Us
              </Link>
              <Link
                href="/resources"
                className="inline-block rounded-md border-2 border-white/40 px-10 py-3.5 font-raleway text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-white"
              >
                Explore Resources
              </Link>
            </div>
          </motion.div>

          {/* Right: founder portrait + scripture */}
          <motion.div
            className="flex flex-col text-center lg:text-left"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="relative mx-auto aspect-square w-full max-w-sm sm:max-w-md lg:max-w-lg">
              {/* Glow */}
              <div
                className="pointer-events-none absolute -inset-8 rounded-full bg-gold/10 blur-3xl"
                aria-hidden="true"
              />
              {/* Gold offset frame */}
              <div
                className="absolute -inset-3 rounded-3xl border border-gold/40"
                aria-hidden="true"
              />
              <Image
                src="/images/about/roderic.png"
                alt="Pastor Roderic Bishop, Founder of Aligned4LifeProject"
                fill
                className="relative rounded-3xl object-cover shadow-2xl"
                sizes="(min-width: 1024px) 512px, (min-width: 640px) 448px, 384px"
              />
            </div>

            <div className="mt-10 lg:mt-auto lg:pt-10">
              <p className="font-nunito text-lg font-bold text-gold md:text-xl">
                Pastor Roderic Bishop
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
