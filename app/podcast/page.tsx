import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { PodcastAbout } from '@/components/sections/podcast/PodcastAbout';
import { LatestEpisodes } from '@/components/sections/podcast/LatestEpisodes';
import { PodcastCTA } from '@/components/sections/podcast/PodcastCTA';

export const metadata = {
  title: 'Podcast | Aligned4LifeProject',
  description:
    'Align365 Podcast - Where Faith Aligns with Daily Life. Real conversations to help you grow, reflect, and stay aligned with God\'s purpose.',
};

export default function PodcastPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Align365 Podcast"
        subtitle="Where Faith Aligns with Daily Life"
        description="Real conversations to help you grow, reflect, and stay aligned with God's purpose—one episode at a time."
      />
      <PodcastAbout />
      <LatestEpisodes />
      <PodcastCTA />
    </SiteLayout>
  );
}
