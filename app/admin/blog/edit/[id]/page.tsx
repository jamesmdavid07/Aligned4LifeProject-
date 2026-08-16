'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type FormState = {
  theme: string;
  title: string;
  subtitle: string;
  keyText: string;
  weekNumber: string;
  publishDate: string;
  content: string;
};

const initialFormState: FormState = {
  theme: '',
  title: '',
  subtitle: '',
  keyText: '',
  weekNumber: '',
  publishDate: '',
  content: '',
};

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const response = await fetch(`/api/weekly-blogs?id=${id}`, { cache: 'no-store' });
        const result = await response.json();

        if (!response.ok || !result.success || !Array.isArray(result.data) || !result.data[0]) {
          throw new Error(result.message || 'Unable to load blog.');
        }

        const row = result.data[0];
        setFormData({
          theme: row.theme ?? '',
          title: row.title ?? '',
          subtitle: row.subtitle ?? '',
          keyText: row.key_text ?? '',
          weekNumber: row.week_number == null ? '' : String(row.week_number),
          publishDate: row.publish_date ?? '',
          content: row.content ?? '',
        });
      } catch (error) {
        setStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'Unable to load blog.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadBlog();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/weekly-blogs', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(id),
          theme: formData.theme,
          title: formData.title,
          subtitle: formData.subtitle,
          key_text: formData.keyText,
          week_number: formData.weekNumber ? Number(formData.weekNumber) : null,
          publish_date: formData.publishDate,
          content: formData.content,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to update blog.');
      }

      setStatus({ type: 'success', message: result.message || 'Blog updated successfully.' });
      router.push('/admin/blog');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy-600 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/10 bg-navy-700/60 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
        <Link
          href="/admin/blog"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-navy-100 transition hover:border-gold hover:text-gold"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Blog
        </Link>
        <div className="mb-8 border-b border-white/10 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gold">
            Admin Dashboard
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Edit Blog</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-navy-100 sm:text-base">
            Update the blog reflection for this existing entry.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-6 text-sm text-navy-100">Loading blog…</div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-6">
          {status ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-emerald-400/60 bg-emerald-500/15 text-emerald-200'
                  : 'border-rose-400/60 bg-rose-500/15 text-rose-200'
              }`}
            >
              {status.message}
            </div>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="theme" className="text-sm font-medium text-navy-100">Theme</label>
            <input
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              placeholder="Beyond the Five Love Languages"
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-navy-100">Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Week One: Channels – How Love Is Expressed"
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-gold"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="subtitle" className="text-sm font-medium text-navy-100">Subtitle</label>
            <input
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              placeholder="The Doorway to Love Is Not Its Destination"
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-gold"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="keyText" className="text-sm font-medium text-navy-100">Key Text</label>
            <textarea
              id="keyText"
              name="keyText"
              value={formData.keyText}
              onChange={handleChange}
              placeholder={'"Let all that you do be done with love." — 1 Corinthians 16:14 (NKJV)'}
              rows={3}
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="weekNumber" className="text-sm font-medium text-navy-100">Week Number</label>
              <input
                id="weekNumber"
                name="weekNumber"
                type="number"
                min={1}
                value={formData.weekNumber}
                onChange={handleChange}
                placeholder="1"
                className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="publishDate" className="text-sm font-medium text-navy-100">Publish Date</label>
              <input
                id="publishDate"
                name="publishDate"
                type="date"
                value={formData.publishDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-gold"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-navy-100">Blog Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder={'Write the devotional body. Use --- on its own line to separate sections.\n\nYour devotional content goes here...'}
              rows={14}
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold"
              required
            />
          </div>

          <div className="flex items-center justify-end border-t border-white/10 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
