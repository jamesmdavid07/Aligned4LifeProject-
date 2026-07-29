import { SiteLayout } from '@/components/layout/SiteLayout';
import { Hero } from '@/components/sections/Hero';
import { FeaturedResources } from '@/components/sections/FeaturedResources';
import { PodcastSection } from '@/components/sections/PodcastSection';
import { HowWeHelp } from '@/components/sections/HowWeHelp';

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <FeaturedResources />
      <PodcastSection />
      <HowWeHelp />
    </SiteLayout>
  );
}
