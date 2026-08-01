import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { ContactSection } from '@/components/sections/contact/ContactSection';

export const metadata = {
  title: 'Contact Us | Aligned4LifeProject',
  description:
    'Get in touch with Aligned4LifeProject. Reach out for questions, coaching, courses, events, or partnership opportunities.',
};

export default function ContactPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Contact Us"
        subtitle="We&apos;d Love to Hear From You"
        description="Whether you have a question, want to get involved, or are ready to take the next step, send us a message and we&apos;ll be in touch soon."
        breadcrumb="Contact Us"
      />
      <ContactSection />
    </SiteLayout>
  );
}
