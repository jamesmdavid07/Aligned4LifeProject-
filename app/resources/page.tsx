import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { CoursesSection } from '@/components/sections/resources/CoursesSection';
import { CoachingSection } from '@/components/sections/resources/CoachingSection';
import { EventsSection } from '@/components/sections/resources/EventsSection';
import { PartnerSection } from '@/components/sections/resources/PartnerSection';

export const metadata = {
  title: 'Resources | Aligned4LifeProject',
  description:
    'Grow, heal, and live aligned. Explore courses, coaching, and events designed to help you move toward where God is calling you.',
};

export default function ResourcesPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Resources"
        subtitle="Grow, Heal, and Live Aligned"
        description="Explore opportunities designed to help you move from where you are to where God is calling you to be—through guidance, growth, and community."
      />
      <CoursesSection />
      <CoachingSection />
      <EventsSection />
      <PartnerSection />
    </SiteLayout>
  );
}
