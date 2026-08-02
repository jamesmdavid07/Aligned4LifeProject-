'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminBar({ email, role }: { email: string; role: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      const response = await fetch('/api/admin/logout', { method: 'POST' });
      const result = await response.json();

      if (!response.ok || !result.success) {
        window.alert(result.message || 'Unable to log out.');
        setLoggingOut(false);
        return;
      }

      router.replace('/admin/login');
      router.refresh();
    } catch {
      window.alert('Unable to log out.');
      setLoggingOut(false);
    }
  }

  const links = [
    { href: '/admin/devotionals', label: 'Devotionals' },
    { href: '/admin/account', label: 'Account settings' },
    ...(role === 'owner' ? [{ href: '/admin/accounts', label: 'Admin accounts' }] : []),
  ];

  return (
    <div className="border-b border-white/10 bg-navy-700/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="truncate text-sm text-navy-100">
            Signed in as{' '}
            <span className="font-medium text-white">
              {email}
              <span className="ml-2 inline-flex items-center rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold-200">
                {role}
              </span>
            </span>
          </p>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="shrink-0 rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-navy-100 transition hover:border-rose-400 hover:text-rose-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? 'Logging out…' : 'Log out'}
          </button>
        </div>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? 'bg-gold text-white'
                    : 'text-navy-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
