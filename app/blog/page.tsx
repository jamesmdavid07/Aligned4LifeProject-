import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { WeeklyBlogPage } from '@/components/weekly-blog/WeeklyBlogPage';
import type { DbWeeklyBlog } from '@/lib/weekly-blogs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | Aligned4LifeProject',
  description:
    'A new reflection every week. Biblical insights designed to move beyond inspiration toward lasting transformation.',
};

async function getInitialWeeklyBlogs(): Promise<DbWeeklyBlog[]> {
  try {
    const requestHeaders = headers();
    const host = requestHeaders.get('host');
    const protocol = requestHeaders.get('x-forwarded-proto') || 'http';

    if (!host) return [];

    const response = await fetch(`${protocol}://${host}/api/weekly-blogs?includeFuture=1`, { cache: 'no-store' });
    const result = await response.json();

    return response.ok && result.success && Array.isArray(result.data) ? (result.data as DbWeeklyBlog[]) : [];
  } catch (error) {
    console.error('Failed to load initial weekly blogs', error);
    return [];
  }
}

export default async function WeeklyBlogRoute() {
  const initialBlogs = await getInitialWeeklyBlogs();

  return (
    <SiteLayout>
      <WeeklyBlogPage initialBlogs={initialBlogs} />
    </SiteLayout>
  );
}
