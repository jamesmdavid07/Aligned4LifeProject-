'use client';

import { useEffect, useState } from 'react';
import { Check, Facebook, Instagram, MessageCircle, Share2 } from 'lucide-react';

export function ShareButtons({ title }: { title: string }) {
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  async function copyShareLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable
    }
  }

  async function handleInstagramShare() {
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch {
        // fall through to copy link if the share sheet is cancelled or unavailable
      }
    }

    copyShareLink();
  }

  return (
    <div className="flex flex-wrap items-center gap-3" aria-label="Share devotional">
      <button
        type="button"
        onClick={copyShareLink}
        aria-label={`Copy link: ${shareUrl}`}
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-navy-200 bg-white px-4 py-2 font-raleway text-sm font-bold text-navy-600 transition-colors hover:bg-navy-50 focus:outline-none focus:ring-2 focus:ring-gold"
      >
        <Share2 size={16} aria-hidden="true" />
        {copied ? (
          <>
            <Check size={14} className="text-gold" aria-hidden="true" /> Link copied!
          </>
        ) : (
          <span className="whitespace-nowrap">Share</span>
        )}
      </button>
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
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="rounded-full bg-navy-50 p-2 text-navy-600 transition-colors hover:bg-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-gold"
      >
        <MessageCircle size={16} />
      </a>
      <button
        type="button"
        onClick={handleInstagramShare}
        aria-label="Share on Instagram"
        className="rounded-full bg-navy-50 p-2 text-navy-600 transition-colors hover:bg-gold hover:text-white focus:outline-none focus:ring-2 focus:ring-gold"
      >
        <Instagram size={16} />
      </button>
    </div>
  );
}
