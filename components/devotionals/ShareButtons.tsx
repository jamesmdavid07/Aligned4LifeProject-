'use client';

import { Facebook, Linkedin, Share2 } from 'lucide-react';

export function ShareButtons({ title }: { title: string }) {
  const shareUrl = typeof window === 'undefined' ? '' : window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Share devotional">
      <span className="inline-flex items-center gap-2 font-raleway text-sm font-bold text-navy-600">
        <Share2 size={16} aria-hidden="true" /> Share
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="rounded-full bg-navy-50 p-2 text-navy-600 transition-colors hover:bg-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-gold"
      >
        <Facebook size={16} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="rounded-full bg-navy-50 p-2 text-navy-600 transition-colors hover:bg-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-gold"
      >
        <Linkedin size={16} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="rounded-full bg-navy-50 px-2.5 py-2 text-xs font-bold text-navy-600 transition-colors hover:bg-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-gold"
      >
        X
      </a>
    </div>
  );
}
