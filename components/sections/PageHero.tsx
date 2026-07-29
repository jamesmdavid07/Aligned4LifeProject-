'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: string;
  subtitleColor?: string;
}

export function PageHero({
  title,
  subtitle,
  description,
  subtitleColor = '#9C7331',
}: PageHeroProps) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-28"
      style={{ background: 'linear-gradient(135deg, #1A3A70 0%, #253763 50%, #0A195F 100%)' }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-5%] bottom-[15%] h-96 w-96 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8">
        <motion.h1
          className="font-nunito text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.h2
            className="mt-4 font-nunito text-xl font-bold sm:text-2xl md:text-3xl"
            style={{ color: subtitleColor }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            {subtitle}
          </motion.h2>
        )}

        {description && (
          <motion.p
            className="mx-auto mt-6 max-w-2xl font-roboto text-base text-lightgray sm:text-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
