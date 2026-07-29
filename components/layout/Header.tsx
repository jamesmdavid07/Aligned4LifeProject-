'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { navLinks } from '@/lib/site-data';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-4 py-3 md:px-8 lg:px-12">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="Aligned4LifeProject home">
          <Image
            src="/images/logo.png"
            alt="Aligned4LifeProject logo"
            width={200}
            height={44}
            className="h-auto w-[140px] md:w-[200px] lg:w-[250px]"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-nunito text-lg font-bold text-deepnavy transition-colors duration-200 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA button - desktop */}
        <Link
          href="/#section-shared-header"
          className="hidden rounded-md bg-gold px-6 py-2.5 font-raleway text-sm font-bold text-white transition-all duration-300 hover:shadow-lg hover:brightness-110 lg:inline-block"
        >
          Get Started
        </Link>

        {/* Mobile menu button */}
        <button
          className="rounded-md p-2 text-deepnavy lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className="overflow-hidden bg-white lg:hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-4 py-3 font-nunito text-base font-bold text-deepnavy transition-colors hover:bg-navy-50 hover:text-gold"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#section-shared-header"
                className="mt-2 rounded-md bg-gold px-6 py-3 text-center font-raleway text-base font-bold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
