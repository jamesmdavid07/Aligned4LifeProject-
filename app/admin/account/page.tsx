'use client';

import { useState } from 'react';

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const emptyForm: PasswordForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

export default function AdminAccountPage() {
  const [form, setForm] = useState<PasswordForm>(emptyForm);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function updateField(field: keyof PasswordForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const response = await fetch('/api/admin/account/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || 'Unable to change password.');
        setSubmitting(false);
        return;
      }

      setSuccess(result.message || 'Password updated.');
      setForm(emptyForm);
      setSubmitting(false);
    } catch {
      setError('Unable to change password. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy-600 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-navy-700/60 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Admin Dashboard</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Account settings</h1>
        <p className="mt-2 text-sm text-navy-100">Change the password for your admin account.</p>

        {error ? (
          <div className="mt-6 rounded-xl border border-rose-400/60 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        ) : null}
        {success ? (
          <div className="mt-6 rounded-xl border border-emerald-400/60 bg-emerald-500/15 px-4 py-3 text-sm text-emerald-200">
            {success}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-navy-100">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              name="currentPassword"
              autoComplete="current-password"
              required
              value={form.currentPassword}
              onChange={(event) => updateField('currentPassword', event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white placeholder:text-navy-200 focus:border-gold focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-navy-100">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              name="newPassword"
              autoComplete="new-password"
              required
              minLength={8}
              value={form.newPassword}
              onChange={(event) => updateField('newPassword', event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white placeholder:text-navy-200 focus:border-gold focus:outline-none"
              placeholder="At least 8 characters"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-navy-100">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              required
              minLength={8}
              value={form.confirmPassword}
              onChange={(event) => updateField('confirmPassword', event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-3 text-sm text-white placeholder:text-navy-200 focus:border-gold focus:outline-none"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? 'Updating…' : 'Change password'}
          </button>
        </form>
      </div>
    </div>
  );
}
