import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { OurStory } from '@/components/sections/about/OurStory';
import { MissionVisionSection } from '@/components/sections/about/MissionVision';
import { CoreValues } from '@/components/sections/about/CoreValues';
import { AlignmentCTA } from '@/components/sections/about/AlignmentCTA';

export const metadata = {
  title: 'About | Aligned4LifeProject',
  description:
    'Dedicated to realigning lives with God\'s purpose through truth, healing, and transformation.',
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        title={
          <>
            About <span className="text-gold">Aligned4LifeProject</span>
          </>
        }
        subtitle="Dedicated to realigning lives with God's purpose through truth, healing, and transformation."
        breadcrumb="About"
      />
      <OurStory />
      <MissionVisionSection />
      <CoreValues />
      <AlignmentCTA />
    </SiteLayout>
  );
}
