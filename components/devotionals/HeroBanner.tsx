'use client';

import { motion } from 'framer-motion';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-navy-600 via-darknavy to-deepnavy py-20 md:py-28">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-navy-300/10 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8">
        <motion.p
          className="font-raleway text-sm font-semibold uppercase tracking-[0.3em] text-gold-200"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          A daily moment of alignment
        </motion.p>
        <motion.h1
          className="mt-4 font-nunito text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Daily Devotionals
        </motion.h1>
        <motion.p
          className="mx-auto mt-5 max-w-2xl font-roboto text-base leading-relaxed text-lightgray sm:text-lg"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Spend time each day growing deeper in God&apos;s Word through practical, Christ-centered devotionals.
        </motion.p>
      </div>
    </section>
  );
}
