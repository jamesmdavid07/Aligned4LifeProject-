import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { DevotionalsPage, type DbDevotional } from '@/components/devotionals/DevotionalsPage';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Daily Devotionals | Aligned4LifeProject',
  description:
    "Spend time each day growing deeper in God's Word through practical, Christ-centered devotionals.",
};

async function getInitialDevotionals(): Promise<DbDevotional[]> {
  try {
    const requestHeaders = headers();
    const host = requestHeaders.get('host');
    const protocol = requestHeaders.get('x-forwarded-proto') || 'http';

    if (!host) return [];

    const response = await fetch(`${protocol}://${host}/api/devotionals`, { cache: 'no-store' });
    const result = await response.json();

    return response.ok && result.success && Array.isArray(result.data) ? (result.data as DbDevotional[]) : [];
  } catch (error) {
    console.error('Failed to load initial devotionals', error);
    return [];
  }
}

export default async function DevotionalsRoute() {
  const initialDevotionals = await getInitialDevotionals();

  return (
    <SiteLayout>
      <DevotionalsPage initialDevotionals={initialDevotionals} />
    </SiteLayout>
  );
}
