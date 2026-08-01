'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden py-20 md:py-32 lg:py-40"
      style={{ background: 'linear-gradient(135deg, #1A3A70 0%, #253763 50%, #0A195F 100%)' }}
    >
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-5%] bottom-[15%] h-96 w-96 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 text-center md:px-8 lg:px-12">
        <motion.h1
          className="font-nunito text-4xl font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Aligned4LifeProject
        </motion.h1>

        <motion.h2
          className="mt-4 font-nunito text-2xl font-bold text-gold sm:text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          Anchored in Alignment
        </motion.h2>

        <motion.p
          className="mx-auto mt-6 max-w-2xl font-roboto text-base text-lightgray sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          Helping individuals realign their lives with God&apos;s purpose through truth,
          healing, and transformation
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <Link
            href="/#section-shared-header"
            className="rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Get Started
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
