import Link from 'next/link';
import { BookOpen, FileText, ArrowUpRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const folders = [
    {
      href: '/admin/devotionals',
      title: 'Devotions',
      description: 'Manage daily devotional content — titles, key texts, reflections, and prayers for each day.',
      icon: BookOpen,
    },
    {
      href: '/admin/blog',
      title: 'Blog',
      description: 'Manage weekly blog reflections — titles, subtitles, and full content that publish automatically to the blog.',
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen bg-navy-600 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Admin Dashboard
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Welcome</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-navy-100 sm:text-base">
            Choose a content area to manage. Changes you publish go live on the site automatically.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {folders.map(({ href, title, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-white/10 bg-navy-700/60 p-6 shadow-2xl shadow-black/30 transition hover:border-gold/60 hover:bg-navy-700 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <ArrowUpRight
                  size={20}
                  className="mt-1 text-navy-100/50 transition group-hover:text-gold"
                  aria-hidden="true"
                />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white sm:text-2xl">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-navy-100">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
