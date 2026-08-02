'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type FormState = {
  title: string;
  scripture: string;
  imageFile: File | null;
  imagePreview: string;
  content: string;
  reflection: string;
  prayer: string;
  publishDate: string;
};

const initialFormState: FormState = {
  title: '',
  scripture: '',
  imageFile: null,
  imagePreview: '',
  content: '',
  reflection: '',
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
          scripture: row.scripture ?? '',
          imageFile: null,
          imagePreview: row.image ?? '',
          content: row.content ?? '',
          reflection: row.reflection ?? '',
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setFormData((prev) => ({ ...prev, imageFile: null, imagePreview: prev.imagePreview }));
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
      let imageUrl = formData.imagePreview;

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
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(id),
          title: formData.title,
          scripture: formData.scripture,
          image: imageUrl,
          content: formData.content,
          reflection: formData.reflection,
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
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
        <div className="mb-8 border-b border-slate-800 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Admin Dashboard</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Edit Devotional</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Update the devotional content and image for this existing entry.
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-6 text-sm text-slate-400">Loading devotional…</div>
        ) : null}

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
              <label htmlFor="title" className="text-sm font-medium text-slate-200">Title</label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter devotional title"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="scripture" className="text-sm font-medium text-slate-200">Scripture</label>
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
            <label htmlFor="imageFile" className="text-sm font-medium text-slate-200">Image Upload</label>
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
                <img src={formData.imagePreview} alt="Current devotional preview" className="h-48 w-full object-cover" />
              </div>
            ) : null}
          </div>

          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium text-slate-200">Devotional Content</label>
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
              <label htmlFor="reflection" className="text-sm font-medium text-slate-200">Reflection</label>
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
              <label htmlFor="prayer" className="text-sm font-medium text-slate-200">Prayer</label>
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
            <label htmlFor="publishDate" className="text-sm font-medium text-slate-200">Publish Date</label>
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

          <div className="flex items-center justify-end border-t border-slate-800 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
