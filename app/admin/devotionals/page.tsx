'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type DevotionalRow = {
  id: number;
  title: string;
  scripture: string;
  publish_date: string;
  created_at: string;
};

export default function DevotionalsAdminListPage() {
  const [rows, setRows] = useState<DevotionalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadRows() {
    try {
      const response = await fetch('/api/devotionals', { cache: 'no-store' });
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
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Admin Dashboard</p>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">Devotionals</h1>
            <p className="mt-2 text-sm text-slate-400">Manage your devotional posts from the MySQL-backed CMS.</p>
          </div>
          <Link
            href="/admin/devotionals/new"
            className="inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Create New Devotional
          </Link>
        </div>

        {error ? (
          <div className="rounded-xl border border-rose-700 bg-rose-950/40 px-4 py-3 text-sm text-rose-300">{error}</div>
        ) : null}

        {loading ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-6 text-sm text-slate-400">Loading devotionals…</div>
        ) : rows.length === 0 ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-6 text-sm text-slate-400">No devotionals found yet.</div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-950/70 text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Scripture</th>
                  <th className="px-4 py-3 font-medium">Publish date</th>
                  <th className="px-4 py-3 font-medium">Created date</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/60">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-medium text-white">{row.title}</td>
                    <td className="px-4 py-3 text-slate-300">{row.scripture}</td>
                    <td className="px-4 py-3 text-slate-300">{row.publish_date}</td>
                    <td className="px-4 py-3 text-slate-300">{row.created_at}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/devotionals/edit/${row.id}`}
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-amber-500 hover:text-amber-400"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(row.id)}
                          className="rounded-lg border border-rose-700 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-900/40"
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
        )}
      </div>
    </div>
  );
}
