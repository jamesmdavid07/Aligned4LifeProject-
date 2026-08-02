'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getTodayDate } from '@/lib/devotionals';

type DevotionalRow = {
  id: number;
  title: string;
  scripture: string;
  publish_date: string;
};

export default function DevotionalsAdminListPage() {
  const [rows, setRows] = useState<DevotionalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadRows() {
    try {
      const response = await fetch('/api/devotionals?includeFuture=1', { cache: 'no-store' });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to fetch devotionals.');
      }

      setRows(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch devotionals.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Delete this devotional?')) return;

    try {
      const response = await fetch(`/api/devotionals?id=${id}`, { method: 'DELETE' });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to delete devotional.');
      }

      setRows((current) => current.filter((item) => item.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to delete devotional.');
    }
  }

  useEffect(() => {
    loadRows();
  }, []);

  return (
    <div className="min-h-screen bg-navy-600 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-navy-700/60 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Admin Dashboard</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Devotionals</h1>
            <p className="mt-2 text-sm text-navy-100">Manage your devotional posts from the MySQL-backed CMS.</p>
          </div>
          <Link
            href="/admin/devotionals/new"
            className="inline-flex items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:w-auto w-full"
          >
            Create New Devotional
          </Link>
        </div>

        {error ? (
          <div className="rounded-xl border border-rose-400/60 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">{error}</div>
        ) : null}

        {loading ? (
          <div className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-6 text-sm text-navy-100">Loading devotionals…</div>
        ) : rows.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-navy-800/60 px-4 py-6 text-sm text-navy-100">No devotionals found yet.</div>
        ) : (
          <>
            <div className="overflow-hidden rounded-xl border border-white/10 sm:block md:hidden">
              <ul className="divide-y divide-white/10 bg-navy-700/40">
                {rows.map((row) => (
                  <li key={row.id} className="px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-white">{row.title}</p>
                          <span
                            className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                              row.publish_date > getTodayDate()
                                ? 'bg-gold/20 text-gold-200'
                                : 'bg-emerald-400/15 text-emerald-200'
                            }`}
                          >
                            {row.publish_date > getTodayDate() ? 'Scheduled' : 'Published'}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-navy-100">{row.scripture}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Link
                          href={`/admin/devotionals/edit/${row.id}`}
                          className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-navy-100 transition hover:border-gold hover:text-gold"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="rounded-lg border border-rose-400/50 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <dl className="mt-3 text-sm">
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-xs uppercase tracking-wide text-navy-100/70">Publish date</dt>
                        <dd className="mt-0.5 text-navy-100">{row.publish_date}</dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden overflow-x-auto rounded-xl border border-white/10 sm:block">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-navy-800/60 text-navy-100">
                  <tr>
                    <th className="px-4 py-3 font-medium">Title</th>
                    <th className="px-4 py-3 font-medium">Scripture</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Publish date</th>
                    <th className="px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-navy-700/40">
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td className="px-4 py-3 font-medium text-white">{row.title}</td>
                      <td className="px-4 py-3 text-navy-100">{row.scripture}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            row.publish_date > getTodayDate()
                              ? 'bg-gold/20 text-gold-200'
                              : 'bg-emerald-400/15 text-emerald-200'
                          }`}
                        >
                          {row.publish_date > getTodayDate() ? 'Scheduled' : 'Published'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-navy-100">{row.publish_date}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            href={`/admin/devotionals/edit/${row.id}`}
                            className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-navy-100 transition hover:border-gold hover:text-gold"
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDelete(row.id)}
                            className="rounded-lg border border-rose-400/50 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
