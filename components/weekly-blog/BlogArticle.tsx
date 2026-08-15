'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import type { WeeklyBlog } from '@/lib/weekly-blogs';
import { formatBlogDate } from '@/lib/weekly-blogs';
import { ReadingTime } from '@/components/devotionals/ReadingTime';
import { ShareButtons } from '@/components/devotionals/ShareButtons';

const weekNumberMap: Record<string, string> = {
  One: '01',
  Two: '02',
  Three: '03',
  Four: '04',
};

function renderItalic(text: string) {
  const segments = text.split('*');
  return segments.map((segment, idx) =>
    idx % 2 === 1 ? (
      <em key={idx} className="italic">
        {segment}
      </em>
    ) : (
      <span key={idx}>{segment}</span>
    ),
  );
}

function renderInline(text: string) {
  const segments = text.split('**');
  return segments.map((segment, idx) =>
    idx % 2 === 1 ? (
      <strong key={idx} className="font-bold text-navy-700">
        {segment}
      </strong>
    ) : (
      renderItalic(segment)
    ),
  );
}

function renderBlogParagraphs(content: string) {
  return content.split('\n\n').map((paragraph, idx) => {
    const trimmed = paragraph.trim();

    if (trimmed === '---') {
      return (
        <div key={idx} className="flex items-center gap-3" aria-hidden="true">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/50" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/50" />
        </div>
      );
    }

    if (trimmed.startsWith('### ')) {
      return (
        <h4
          key={idx}
          className="font-nunito text-xl font-extrabold text-gold sm:text-2xl"
        >
          {renderInline(trimmed.replace(/^###\s+/, ''))}
        </h4>
      );
    }

    if (trimmed.startsWith('## ')) {
      return (
        <h3
          key={idx}
          className="font-nunito text-2xl font-extrabold text-navy-600 sm:text-3xl"
        >
          {renderInline(trimmed.replace(/^##\s+/, ''))}
        </h3>
      );
    }

    if (trimmed.startsWith('> ')) {
      return (
        <blockquote
          key={idx}
          className="rounded-2xl border-l-4 border-gold bg-gold-50/70 px-6 py-5"
        >
          <p className="font-nunito text-lg font-bold leading-relaxed text-navy-700 md:text-xl">
            &ldquo;{renderInline(trimmed.replace(/^>\s+/, ''))}&rdquo;
          </p>
        </blockquote>
      );
    }

    const weekMatch = trimmed.match(/^Week (One|Two|Three|Four):\s*(.*)$/);
    if (weekMatch) {
      const [, weekWord, body] = weekMatch;
      return (
        <div
          key={idx}
          className="flex items-start gap-4 rounded-xl border border-navy-100 bg-white px-5 py-4 shadow-sm"
        >
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-600 font-nunito text-sm font-extrabold text-gold">
            {weekNumberMap[weekWord]}
          </span>
          <div>
            <p className="font-nunito text-base font-extrabold text-navy-700">
              Week {weekWord}
            </p>
            <p className="mt-1 leading-7 text-textgray">{renderInline(body)}</p>
          </div>
        </div>
      );
    }

    const listLines = trimmed.split('\n');
    if (listLines.every((line) => /^\d+\.\s/.test(line))) {
      return (
        <ol key={idx} className="space-y-3">
          {listLines.map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span className="mt-1.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-100 font-nunito text-xs font-extrabold text-gold-700">
                {line.match(/^(\d+)\./)?.[1]}
              </span>
              <span className="flex-1">{renderInline(line.replace(/^\d+\.\s+/, ''))}</span>
            </li>
          ))}
        </ol>
      );
    }

    if (listLines.every((line) => /^[-*]\s/.test(line))) {
      return (
        <ul key={idx} className="space-y-3">
          {listLines.map((line) => (
            <li key={line} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
              <span className="flex-1">{renderInline(line.replace(/^[-*]\s+/, ''))}</span>
            </li>
          ))}
        </ul>
      );
    }

    return <p key={idx} className="leading-8">{renderInline(trimmed)}</p>;
  });
}

export function BlogArticle({ blog }: { blog: WeeklyBlog }) {
  return (
    <motion.article
      key={blog.id}
      className="mx-auto w-full max-w-site overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy-900/5"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="h-1.5 bg-gradient-to-r from-gold via-gold-300 to-gold" />

      <div className="px-6 py-8 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-lg bg-navy-600 px-4 py-1.5 font-raleway text-sm font-bold uppercase tracking-[0.18em] text-gold">
              <Calendar size={14} aria-hidden="true" />
              {formatBlogDate(blog.publishDate)}
            </span>
            <ReadingTime minutes={blog.readingTime} />
          </div>

          <h2 className="mt-5 font-nunito text-2xl font-extrabold leading-tight text-navy-700 sm:text-3xl md:text-4xl">
            {blog.title}
          </h2>

          {blog.subtitle ? (
            <p className="mt-3 font-nunito text-lg font-bold leading-relaxed text-gold md:text-xl">
              {blog.subtitle}
            </p>
          ) : null}

          <div
            className="mt-6 flex items-center gap-2"
            aria-hidden="true"
          >
            <span className="h-px w-16 bg-gradient-to-r from-gold/70 to-transparent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </div>

          <div className="mt-8 space-y-6 font-roboto text-base leading-8 text-textgray md:text-lg md:leading-8">
            {renderBlogParagraphs(blog.content)}
          </div>

          <div className="mt-10 border-t border-navy-100 pt-6">
            <ShareButtons title={blog.title} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
