import type { Metadata } from 'next';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { DevotionalsPage } from '@/components/devotionals/DevotionalsPage';

export const metadata: Metadata = {
  title: 'Daily Devotionals | Aligned4LifeProject',
  description:
    "Spend time each day growing deeper in God's Word through practical, Christ-centered devotionals.",
};

export default function DevotionalsRoute() {
  return (
    <SiteLayout>
      <DevotionalsPage />
    </SiteLayout>
  );
}
