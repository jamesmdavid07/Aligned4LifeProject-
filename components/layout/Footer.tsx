'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube, Mail } from 'lucide-react';
import { siteConfig, navLinks } from '@/lib/site-data';
import { Reveal } from '@/components/animations/Reveal';

export function Footer() {
  const [siteUrl, setSiteUrl] = useState('/');
  const encodedSiteUrl = encodeURIComponent(siteUrl);

  useEffect(() => {
    setSiteUrl(window.location.origin);
  }, []);

  return (
    <footer className="bg-navy-600">
      {/* Main footer - 3 sections */}
      <div className="mx-auto max-w-site px-4 pb-10 pt-16 md:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3 lg:gap-10">
          {/* 1. Brand */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="rounded-xl bg-white p-4">
              <Image
                src="/images/shared/footer-logo.png"
                alt="Aligned4LifeProject logo"
                width={200}
                height={80}
                className="h-auto w-[180px] md:w-[200px]"
              />
            </div>
            <p className="mt-6 max-w-xs font-roboto text-sm leading-relaxed text-lightgray">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedSiteUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-white"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-white"
              >
                <Youtube size={20} />
              </a>
              <Link
                href="/contact"
                aria-label="Contact"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-white"
              >
                <Mail size={20} />
              </Link>
            </div>
          </div>

          {/* 2. Explore */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="font-nunito text-lg font-bold uppercase tracking-[0.2em] text-white">
              Explore
            </h3>
            <span className="mt-3 h-0.5 w-10 rounded-full bg-gold" aria-hidden="true" />
            <nav
              className="mt-7 grid flex-1 grid-flow-col grid-rows-[repeat(3,minmax(0,1fr))] items-start gap-x-10"
              aria-label="Footer navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-raleway text-sm font-semibold tracking-wide text-white/70 transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. Connect */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="font-nunito text-lg font-bold uppercase tracking-[0.2em] text-white">
              Connect
            </h3>
            <span className="mt-3 h-0.5 w-10 rounded-full bg-gold" aria-hidden="true" />
            <p className="mt-6 max-w-xs font-roboto text-sm leading-relaxed text-lightgray">
              Have a question or want to partner with the ministry? We&apos;d love to hear
              from you.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 font-raleway text-sm font-bold text-gold transition-colors hover:text-gold-300"
            >
              <Mail size={16} aria-hidden="true" />
              Contact Us
            </Link>
            <p className="mt-6 font-nunito text-sm italic text-white/60">
              &ldquo;In all your ways acknowledge Him, and He shall direct your paths.&rdquo;
              <span className="mt-1 block text-xs not-italic text-gold">
                Proverbs 3:6
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright + Credit */}
      <div className="border-t border-white/15 px-4 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-site flex-col items-center justify-between gap-2 py-6 md:flex-row">
          <p className="font-roboto text-sm text-white/60">{siteConfig.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
