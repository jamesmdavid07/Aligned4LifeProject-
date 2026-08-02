'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || 'Unable to log in.');
        setSubmitting(false);
        return;
      }

      router.replace('/admin/devotionals');
      router.refresh();
    } catch {
      setError('Unable to log in. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-600 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-navy-700/60 p-8 shadow-2xl shadow-black/30">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Admin</p>
        <h1 className="text-3xl font-semibold text-white">Sign in</h1>
        <p className="mt-2 text-sm text-navy-100">Access the devotional CMS.</p>

        {error ? (
          <div className="mt-6 rounded-xl border border-rose-400/60 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy-100">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white placeholder:text-navy-200 focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy-100">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white placeholder:text-navy-200 focus:border-gold focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-navy-100/70">
          <Link href="/devotionals" className="text-navy-100 transition hover:text-gold-200">
            ← Back to devotionals
          </Link>
        </p>
      </div>
    </div>
  );
}
