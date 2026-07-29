'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin } from 'lucide-react';
import { siteConfig, navLinks } from '@/lib/site-data';
import { Reveal } from '@/components/animations/Reveal';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-navy-600 via-darknavy to-deepnavy">
      {/* Back home button */}
      <div className="flex justify-center px-4 py-12 md:py-12">
        <Link
          href="/#section-shared-header"
          className="rounded-md bg-gold px-6 py-3 font-raleway text-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:brightness-110"
        >
          &lt; Back Home
        </Link>
      </div>

      {/* Logo + Social (left) | Nav grid (right) */}
      <div className="mx-auto flex max-w-site flex-col gap-10 px-4 md:flex-row md:justify-between md:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-6 md:items-start">
          <Reveal direction="right">
          <div className="rounded-xl bg-white p-4">
            <Image
              src="/images/footer-logo.png"
              alt="Aligned4LifeProject logo"
              width={200}
              height={80}
              className="h-auto w-[180px] md:w-[220px]"
            />
          </div>
          </Reveal>
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://aligned4lifeproject.gr-site.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-gold hover:text-white"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com/intent/tweet?url=https://aligned4lifeproject.gr-site.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-gold hover:text-white"
            >
              <span className="text-sm font-bold">X</span>
            </a>
            <a
              href="https://www.linkedin.com/shareArticle?mini=true&url=https://aligned4lifeproject.gr-site.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-gold hover:text-white"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://aligned4lifeproject.gr-site.com/"
              aria-label="Website"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:bg-gold hover:text-white"
            >
              <span className="text-xs font-bold">Web</span>
            </a>
          </div>
        </div>

        <nav className="grid grid-cols-2 gap-x-10 gap-y-4 sm:grid-cols-3" aria-label="Footer navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-raleway text-sm font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Copyright + Credit */}
      <div className="mt-10 border-t border-white/15 px-4 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-site flex-col items-center justify-between gap-2 py-6 md:flex-row">
          <p className="font-roboto text-sm text-white/60">{siteConfig.copyright}</p>
          <p className="font-roboto text-xs text-white/60 text-center md:text-right">
            Designed by JavidVerse - For All Creative Solutions | Email us at:{' '}
            <a href="mailto:javidverse@gmail.com" className="text-gold underline transition-colors hover:text-gold-300">
              javidverse@gmail.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
