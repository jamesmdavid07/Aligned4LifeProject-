'use client';

import { motion } from 'framer-motion';

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#1A3A71' }}>
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-5%] bottom-[15%] h-96 w-96 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      {/* Subtle grid texture for a modern feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-site px-4 py-14 md:px-8 md:py-20 lg:px-12">
        <motion.h1
          className="mt-4 text-center font-nunito text-3xl font-extrabold text-white sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Daily Devotionals
        </motion.h1>

        {/* Gold accent divider */}
        <motion.div
          className="mt-5 flex items-center justify-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          aria-hidden="true"
        >
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/70" />
        </motion.div>

        <motion.p
          className="mx-auto mt-5 max-w-2xl text-center font-roboto text-sm text-lightgray/80 sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Spend time each day growing deeper in God&apos;s Word through practical,
          Christ-centered devotionals.
        </motion.p>
      </div>
    </section>
  );
}
