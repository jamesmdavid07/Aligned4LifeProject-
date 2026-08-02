'use client';

import { useState } from 'react';

type FormState = {
  title: string;
  scripture: string;
  imageFile: File | null;
  imagePreview: string;
  content: string;
  ellenWhiteInsight: string;
  reflection: string;
  todaysDeclaration: string;
  appeal: string;
  prayer: string;
  fullKeyVerse: string;
  publishDate: string;
};

const initialFormState = {
  title: '',
  scripture: '',
  imageFile: null as File | null,
  imagePreview: '',
  content: '',
  ellenWhiteInsight: '',
  reflection: '',
  todaysDeclaration: '',
  appeal: '',
  prayer: '',
  fullKeyVerse: '',
  publishDate: '',
};

export default function NewDevotionalPage() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setFormData((prev) => ({ ...prev, imageFile: null, imagePreview: '' }));
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, imageFile: file, imagePreview: previewUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      let imageUrl = '';

      if (formData.imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', formData.imageFile);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadResult.success) {
          throw new Error(uploadResult.message || 'Image upload failed.');
        }

        imageUrl = uploadResult.url;
      }

      const response = await fetch('/api/devotionals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          scripture: formData.scripture,
          image: imageUrl,
          content: formData.content,
          ellenWhiteInsight: formData.ellenWhiteInsight,
          reflection: formData.reflection,
          todaysDeclaration: formData.todaysDeclaration,
          appeal: formData.appeal,
          prayer: formData.prayer,
          fullKeyVerse: formData.fullKeyVerse,
          publish_date: formData.publishDate,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to save devotional.');
      }

      setStatus({ type: 'success', message: result.message || 'Devotional saved successfully.' });
      setFormData(initialFormState);
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
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
        <div className="mb-8 border-b border-slate-800 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">
            Admin Dashboard
          </p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">
            Create New Devotional
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Create a new devotional entry for the daily devotional experience. This form is ready for Pastor Roderic to publish content with a clean, focused workflow.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {status ? (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300'
                  : 'border-rose-700 bg-rose-950/40 text-rose-300'
              }`}
            >
              {status.message}
            </div>
          ) : null}
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-slate-200">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter devotional title"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none ring-0 transition focus:border-amber-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="scripture" className="text-sm font-medium text-slate-200">
                Scripture
              </label>
              <input
                id="scripture"
                name="scripture"
                value={formData.scripture}
                onChange={handleChange}
                placeholder="e.g. Psalm 23:1"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="imageFile" className="text-sm font-medium text-slate-200">
              Image Upload
            </label>
            <input
              id="imageFile"
              name="imageFile"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
            />
            {formData.imagePreview ? (
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-800">
                <img src={formData.imagePreview} alt="Selected preview" className="h-48 w-full object-cover" />
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-slate-200">
              Devotional Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write the devotional body here..."
              rows={10}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
              required
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="ellenWhiteInsight" className="text-sm font-medium text-slate-200">Ellen White Insight</label>
              <textarea id="ellenWhiteInsight" name="ellenWhiteInsight" value={formData.ellenWhiteInsight} onChange={handleChange} placeholder="Add an Ellen White insight..." rows={6} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="todaysDeclaration" className="text-sm font-medium text-slate-200">Today&apos;s Declaration</label>
              <textarea id="todaysDeclaration" name="todaysDeclaration" value={formData.todaysDeclaration} onChange={handleChange} placeholder="Add today's declaration..." rows={6} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500" />
            </div>
            <div className="space-y-2">
              <label htmlFor="appeal" className="text-sm font-medium text-slate-200">Appeal</label>
              <textarea id="appeal" name="appeal" value={formData.appeal} onChange={handleChange} placeholder="Add an appeal..." rows={6} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="reflection" className="text-sm font-medium text-slate-200">
                Reflection
              </label>
              <textarea
                id="reflection"
                name="reflection"
                value={formData.reflection}
                onChange={handleChange}
                placeholder="Add a short reflection..."
                rows={6}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="prayer" className="text-sm font-medium text-slate-200">
                Prayer
              </label>
              <textarea
                id="prayer"
                name="prayer"
                value={formData.prayer}
                onChange={handleChange}
                placeholder="Write a closing prayer..."
                rows={6}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="publishDate" className="text-sm font-medium text-slate-200">
              Publish Date
            </label>
            <input
              id="publishDate"
              name="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="fullKeyVerse" className="text-sm font-medium text-slate-200">Full Key Verse</label>
            <textarea id="fullKeyVerse" name="fullKeyVerse" value={formData.fullKeyVerse} onChange={handleChange} placeholder="Enter the complete Scripture verse text..." rows={4} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500" />
          </div>

          <div className="flex items-center justify-end border-t border-slate-800 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
