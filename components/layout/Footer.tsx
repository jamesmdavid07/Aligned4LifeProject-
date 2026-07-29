'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Linkedin } from 'lucide-react';
import { siteConfig } from '@/lib/site-data';
import { Reveal } from '@/components/animations/Reveal';

export function Footer() {
  return (
    <footer className="bg-white">
      {/* Back home button */}
      <div className="flex justify-center px-4 py-12 md:py-12">
        <Link
          href="/#section-shared-header"
          className="rounded-md bg-gold px-6 py-3 font-raleway text-lg font-bold text-white transition-all duration-300 hover:shadow-lg hover:brightness-110"
        >
          &lt; Back Home
        </Link>
      </div>

      {/* Footer logo + social */}
      <div className="mx-auto flex max-w-site flex-col items-center gap-8 px-4 py-8 md:flex-row md:justify-between md:px-8 lg:px-12">
        <Reveal direction="right">
          <Image
            src="/images/footer-logo.png"
            alt="Aligned4LifeProject logo"
            width={200}
            height={80}
            className="h-auto w-[180px] md:w-[220px]"
          />
        </Reveal>

        <div className="flex items-center gap-4">
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=https://aligned4lifeproject.gr-site.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-deepnavy transition-all duration-300 hover:bg-gold hover:text-white"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://twitter.com/intent/tweet?url=https://aligned4lifeproject.gr-site.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-deepnavy transition-all duration-300 hover:bg-gold hover:text-white"
          >
            <span className="text-sm font-bold">X</span>
          </a>
          <a
            href="https://www.linkedin.com/shareArticle?mini=true&url=https://aligned4lifeproject.gr-site.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-deepnavy transition-all duration-300 hover:bg-gold hover:text-white"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://aligned4lifeproject.gr-site.com/"
            aria-label="Website"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-deepnavy transition-all duration-300 hover:bg-gold hover:text-white"
          >
            <span className="text-xs font-bold">Web</span>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200">
        <p className="py-6 text-center font-roboto text-sm text-blacktext">
          {siteConfig.copyright}
        </p>
      </div>
    </footer>
  );
}
