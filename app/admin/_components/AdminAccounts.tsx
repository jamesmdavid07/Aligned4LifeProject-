'use client';

import { useCallback, useEffect, useState } from 'react';

type AccountRow = {
  id: number;
  email: string;
  role: string;
  createdAt: string;
};

export default function AdminAccountsClient() {
  const [rows, setRows] = useState<AccountRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [email, setEmail] = useState('');
  const [role, setRole] = useState('developer');
  const [password, setPassword] = useState('');
  const [creating, setCreating] = useState(false);

  const loadRows = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/accounts', { cache: 'no-store' });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Unable to fetch admin accounts.');
      }
      setRows(result.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch admin accounts.');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    clearMessages();
    setCreating(true);
    try {
      const response = await fetch('/api/admin/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, password }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.message || 'Unable to create account.');
        setCreating(false);
        return;
      }
      setSuccess(result.message || 'Account created.');
      setEmail('');
      setRole('developer');
      setPassword('');
      setCreating(false);
      await loadRows();
    } catch {
      setError('Unable to create account.');
      setCreating(false);
    }
  }

  async function handleDelete(account: AccountRow) {
    if (!window.confirm(`Delete account ${account.email}?`)) return;
    clearMessages();
    try {
      const response = await fetch(`/api/admin/accounts?id=${account.id}`, { method: 'DELETE' });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.message || 'Unable to delete account.');
        return;
      }
      setSuccess(result.message || 'Account deleted.');
      await loadRows();
    } catch {
      setError('Unable to delete account.');
    }
  }

  async function handleResetPassword(account: AccountRow) {
    const newPassword = window.prompt(`New password for ${account.email} (min 8 characters):`);
    if (!newPassword) return;
    clearMessages();
    try {
      const response = await fetch('/api/admin/accounts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: account.id, password: newPassword }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        setError(result.message || 'Unable to reset password.');
        return;
      }
      setSuccess(result.message || 'Password reset.');
    } catch {
      setError('Unable to reset password.');
    }
  }

  useEffect(() => {
    loadRows();
  }, [loadRows]);

  return (
    <div className="min-h-screen bg-navy-600 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-navy-700/60 p-6 shadow-2xl shadow-black/30 sm:p-8 lg:p-10">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-gold">Admin Dashboard</p>
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Admin accounts</h1>
        <p className="mt-2 text-sm text-navy-100">Owner only — manage admin accounts and roles.</p>

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

        <form
          onSubmit={handleCreate}
          className="mt-6 grid gap-4 rounded-xl border border-white/10 bg-navy-800/60 p-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <div>
            <label htmlFor="newEmail" className="mb-1.5 block text-sm font-medium text-navy-100">
              Email
            </label>
            <input
              id="newEmail"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-2.5 text-sm text-white placeholder:text-navy-200 focus:border-gold focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="newRole" className="mb-1.5 block text-sm font-medium text-navy-100">
              Role
            </label>
            <select
              id="newRole"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-2.5 text-sm text-white focus:border-gold focus:outline-none"
            >
              <option value="developer">developer</option>
              <option value="owner">owner</option>
            </select>
          </div>
          <div>
            <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-navy-100">
              Password
            </label>
            <input
              id="newPassword"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Min 8 characters"
              className="w-full rounded-xl border border-white/15 bg-navy-800/60 px-4 py-2.5 text-sm text-white placeholder:text-navy-200 focus:border-gold focus:outline-none"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={creating}
              className="w-full rounded-xl bg-gold px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {creating ? 'Creating…' : 'Create account'}
            </button>
          </div>
        </form>

        {loading ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-navy-800/60 px-4 py-6 text-sm text-navy-100">
            Loading admin accounts…
          </div>
        ) : rows.length === 0 ? (
          <div className="mt-6 rounded-xl border border-white/10 bg-navy-800/60 px-4 py-6 text-sm text-navy-100">
            No admin accounts yet.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-navy-800/60 text-navy-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-navy-700/40">
                {rows.map((account) => (
                  <tr key={account.id}>
                    <td className="px-4 py-3 font-medium text-white">{account.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          account.role === 'owner'
                            ? 'bg-gold/20 text-gold-200'
                            : 'bg-white/10 text-white/80'
                        }`}
                      >
                        {account.role}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-100">
                      {new Date(account.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {account.role !== 'owner' ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleResetPassword(account)}
                              className="rounded-lg border border-white/20 px-3 py-2 text-xs font-semibold text-navy-100 transition hover:border-gold hover:text-gold"
                            >
                              Reset password
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(account)}
                              className="rounded-lg border border-rose-400/50 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <span className="text-xs text-navy-100/70">Owner</span>
                        )}
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
