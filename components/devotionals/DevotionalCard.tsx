'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bookmark, Heart, BookOpen } from 'lucide-react';
import type { Devotional } from '@/lib/devotionals';
import { ReadingTime } from './ReadingTime';
import { ShareButtons } from './ShareButtons';

function renderContentParagraphs(content: string) {
  return content.split('\n\n').map((paragraph, idx) => {
    const trimmed = paragraph.trim();

    if (trimmed.startsWith('Ellen White Insight')) {
      const text = trimmed.replace(/^Ellen White Insight:\n?/, '');
      return (
        <div key={idx} className="rounded-2xl border-l-4 border-gold bg-gold-50/70 px-6 py-5 italic text-navy-700">
          <p className="font-nunito text-sm font-bold uppercase tracking-wider text-gold not-italic">Ellen White Insight</p>
          <p className="mt-2 leading-7">{text}</p>
        </div>
      );
    }

    if (trimmed.startsWith("Today's Declaration")) {
      const text = trimmed.replace(/^Today's Declaration:\n?/, '');
      return (
        <div key={idx} className="rounded-2xl border border-navy-200 bg-gradient-to-br from-navy-50 to-white px-6 py-5 text-center">
          <p className="font-nunito text-sm font-bold uppercase tracking-wider text-navy-600">Today&apos;s Declaration</p>
          <p className="mt-2 font-nunito text-lg font-bold leading-8 text-navy-700">&ldquo;{text.replace(/^["']|["']$/g, '')}&rdquo;</p>
        </div>
      );
    }

    if (trimmed.startsWith('The Appeal')) {
      const text = trimmed.replace(/^The Appeal:\n?/, '');
      return (
        <div key={idx} className="rounded-2xl border border-gold-200 bg-white px-6 py-5">
          <p className="font-nunito text-sm font-bold uppercase tracking-wider text-gold">The Appeal</p>
          <p className="mt-2 leading-7">{text}</p>
        </div>
      );
    }

    if (trimmed.startsWith('Further Reading')) {
      const text = trimmed.replace(/^Further Reading:\n?/, '');
      const lines = text.split('\n').filter(Boolean);
      return (
        <div key={idx} className="rounded-2xl bg-navy-50 px-6 py-5">
          <p className="font-nunito text-sm font-bold uppercase tracking-wider text-navy-600">Further Reading</p>
          <ul className="mt-2 space-y-1">
            {lines.map((line, i) => (
              <li key={i} className="font-roboto text-sm leading-7 text-textgray">{line}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const [num, ...rest] = trimmed.split('. ');
      const title = rest[0];
      const body = rest.slice(1).join('. ');
      return (
        <div key={idx} className="rounded-xl border border-navy-100 bg-white px-5 py-4 shadow-sm">
          <p className="font-nunito text-base font-extrabold text-navy-700">
            <span className="mr-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy-600 text-sm text-white">{num}</span>
            {title}
          </p>
          {body && <p className="mt-2 leading-7 text-textgray">{body}</p>}
        </div>
      );
    }

    return <p key={idx} className="leading-8">{trimmed}</p>;
  });
}

function renderOptionalParagraphs(content: string) {
  return content.split('\n\n').map((paragraph, idx) => (
    <p key={idx} className="leading-7">{paragraph.trim()}</p>
  ));
}

export function DevotionalCard({ devotional }: { devotional: Devotional }) {
  return (
    <motion.article
      key={devotional.id}
      className="mx-auto w-full max-w-site overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy-900/5"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="h-1.5 bg-gradient-to-r from-gold via-gold-300 to-gold" />
      <div className="flex flex-col gap-6 bg-navy-50/30 p-6 sm:flex-row sm:p-8 lg:p-10">
        <div className="aspect-square h-48 w-full shrink-0 overflow-hidden rounded-2xl shadow-lg sm:w-48">
          <Image
            src={devotional.image || '/images/shared/logo.png'}
            alt={`Featured devotional: ${devotional.title}`}
            width={192}
            height={192}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-block rounded-lg bg-navy-600 px-4 py-1.5 font-raleway text-sm font-bold uppercase tracking-[0.18em] text-gold">
              {devotional.scripture}
            </span>
            <ReadingTime minutes={devotional.readingTime} />
          </div>
          {(() => {
            const parts = devotional.title.split('. ');
            return (
              <h2 className="font-nunito text-2xl leading-tight text-navy-700 sm:text-3xl">
                <span className="font-semibold">{parts[0]}.</span>
                <span className="block font-extrabold">{parts.slice(1).join('. ')}</span>
              </h2>
            );
          })()}
        </div>
      </div>
      <div className="space-y-6 px-6 pb-6 font-roboto text-base leading-8 text-textgray sm:px-8 lg:px-10">
        {renderContentParagraphs(devotional.content)}
        {devotional.ellenWhiteInsight ? (
          <div className="rounded-2xl border-l-4 border-gold bg-gold-50/70 px-6 py-5 italic text-navy-700">
            <h3 className="font-nunito text-sm font-bold uppercase tracking-wider text-gold not-italic">Ellen White Insight</h3>
            <div className="mt-2 space-y-3">{renderOptionalParagraphs(devotional.ellenWhiteInsight)}</div>
          </div>
        ) : null}
        <div className="rounded-2xl border-l-4 border-gold bg-gold-50 px-6 py-5">
          <div className="flex items-center gap-2">
            <Bookmark size={16} className="text-gold" aria-hidden="true" />
            <h3 className="font-nunito text-sm font-bold uppercase tracking-wider text-navy-600">Reflection</h3>
          </div>
          <p className="mt-2 leading-7 italic text-navy-700">{devotional.reflection}</p>
        </div>
        {devotional.todaysDeclaration ? (
          <div className="rounded-2xl border border-navy-200 bg-gradient-to-br from-navy-50 to-white px-6 py-5 text-center">
            <h3 className="font-nunito text-sm font-bold uppercase tracking-wider text-navy-600">Today&apos;s Declaration</h3>
            <div className="mt-2 space-y-3 font-nunito text-lg font-bold leading-8 text-navy-700">{renderOptionalParagraphs(devotional.todaysDeclaration)}</div>
          </div>
        ) : null}
        {devotional.appeal ? (
          <div className="rounded-2xl border border-gold-200 bg-white px-6 py-5">
            <h3 className="font-nunito text-sm font-bold uppercase tracking-wider text-gold">The Appeal</h3>
            <div className="mt-2 space-y-3">{renderOptionalParagraphs(devotional.appeal)}</div>
          </div>
        ) : null}
        <div className="rounded-2xl bg-navy-50 px-6 py-5">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-gold" aria-hidden="true" />
            <h3 className="font-nunito text-sm font-bold uppercase tracking-wider text-navy-600">Prayer</h3>
          </div>
          <p className="mt-2 leading-7 text-textgray">{devotional.prayer}</p>
        </div>
        {devotional.fullKeyVerse ? <div className="rounded-2xl bg-navy-600 px-6 py-6 text-center">
          <BookOpen size={20} className="mx-auto text-gold-200" aria-hidden="true" />
          <p className="mt-2 font-nunito text-sm font-bold uppercase tracking-widest text-gold-200">Full Key Verse</p>
          <p className="mt-3 font-nunito text-xl font-bold leading-relaxed text-white">&ldquo;{devotional.fullKeyVerse}&rdquo;</p>
        </div> : <div className="rounded-2xl bg-navy-600 px-6 py-6 text-center">
          <BookOpen size={20} className="mx-auto text-gold-200" aria-hidden="true" />
          <p className="mt-2 font-nunito text-sm font-bold uppercase tracking-widest text-gold-200">Key Verse</p>
          <p className="mt-3 font-nunito text-xl font-bold leading-relaxed text-white">&ldquo;{devotional.keyVerse || devotional.scripture}&rdquo;</p>
        </div>}
      </div>
      <div className="border-t border-navy-100 px-6 pb-8 pt-5 sm:px-8 lg:px-10">
        <ShareButtons title={devotional.title} />
      </div>
    </motion.article>
  );
}
