'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type FormState = {
  title: string;
  keyText: string;
  content: string;
  ellenWhiteInsight: string;
  reflection: string;
  todaysDeclaration: string;
  appeal: string;
  prayer: string;
  publishDate: string;
};

const initialFormState: FormState = {
  title: '',
  keyText: '',
  content: '',
  ellenWhiteInsight: '',
  reflection: '',
  todaysDeclaration: '',
  appeal: '',
  prayer: '',
  publishDate: '',
};

export default function EditDevotionalPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDevotional() {
      try {
        const response = await fetch(`/api/devotionals?id=${id}`, { cache: 'no-store' });
        const result = await response.json();

        if (!response.ok || !result.success || !Array.isArray(result.data) || !result.data[0]) {
          throw new Error(result.message || 'Unable to load devotional.');
        }

        const row = result.data[0];
        setFormData({
          title: row.title ?? '',
          keyText: row.keyText ?? '',
          content: row.content ?? '',
          ellenWhiteInsight: row.ellenWhiteInsight ?? '',
          reflection: row.reflection ?? '',
          todaysDeclaration: row.todaysDeclaration ?? '',
          appeal: row.appeal ?? '',
          prayer: row.prayer ?? '',
          publishDate: row.publish_date ?? '',
        });
      } catch (error) {
        setStatus({
          type: 'error',
          message: error instanceof Error ? error.message : 'Unable to load devotional.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadDevotional();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/devotionals', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(id),
          title: formData.title,
          keyText: formData.keyText,
          content: formData.content,
          ellenWhiteInsight: formData.ellenWhiteInsight,
          reflection: formData.reflection,
          todaysDeclaration: formData.todaysDeclaration,
          appeal: formData.appeal,
          prayer: formData.prayer,
          publish_date: formData.publishDate,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to update devotional.');
      }

      setStatus({ type: 'success', message: result.message || 'Devotional updated successfully.' });
      router.push('/admin/devotionals');
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
          href="/admin/devotionals"
          className="mb-6 inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-2 text-sm font-semibold text-navy-100 transition hover:border-gold hover:text-gold"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Devotionals
        </Link>
        <div className="mb-8 border-b border-white/10 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Admin Dashboard</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Edit Devotional</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-navy-100 sm:text-base">
            Update the devotional content for this existing entry.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-6 text-sm text-navy-100">Loading devotional…</div>
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
            <label htmlFor="title" className="text-sm font-medium text-navy-100">Title</label>
            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter devotional title"
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="keyText" className="text-sm font-medium text-navy-100">Key Text</label>
            <textarea id="keyText" name="keyText" value={formData.keyText} onChange={handleChange} placeholder="Enter the complete Scripture verse text..." rows={4} className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold" />
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-navy-100">Devotional Content</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write the devotional body here..."
              rows={10}
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold"
              required
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="ellenWhiteInsight" className="text-sm font-medium text-navy-100">Ellen White Insight</label>
              <textarea id="ellenWhiteInsight" name="ellenWhiteInsight" value={formData.ellenWhiteInsight} onChange={handleChange} placeholder="Add an Ellen White insight..." rows={6} className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold" />
            </div>
            <div className="space-y-2">
              <label htmlFor="todaysDeclaration" className="text-sm font-medium text-navy-100">Today&apos;s Declaration</label>
              <textarea id="todaysDeclaration" name="todaysDeclaration" value={formData.todaysDeclaration} onChange={handleChange} placeholder="Add today&apos;s declaration..." rows={6} className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold" />
            </div>
            <div className="space-y-2">
              <label htmlFor="appeal" className="text-sm font-medium text-navy-100">Appeal</label>
              <textarea id="appeal" name="appeal" value={formData.appeal} onChange={handleChange} placeholder="Add an appeal..." rows={6} className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="reflection" className="text-sm font-medium text-navy-100">Reflection</label>
              <textarea
                id="reflection"
                name="reflection"
                value={formData.reflection}
                onChange={handleChange}
                placeholder="Add a short reflection..."
                rows={6}
                className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="prayer" className="text-sm font-medium text-navy-100">Prayer</label>
              <textarea
                id="prayer"
                name="prayer"
                value={formData.prayer}
                onChange={handleChange}
                placeholder="Write a closing prayer..."
                rows={6}
                className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white outline-none transition focus:border-gold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="publishDate" className="text-sm font-medium text-navy-100">Publish Date</label>
            <input
              id="publishDate"
              name="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={handleChange}
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
