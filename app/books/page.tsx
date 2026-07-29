import { SiteLayout } from '@/components/layout/SiteLayout';
import { PageHero } from '@/components/sections/PageHero';
import { AnchoredBook } from '@/components/sections/books/AnchoredBook';
import { RuinsCollection } from '@/components/sections/books/RuinsCollection';
import { OtherBooks } from '@/components/sections/books/OtherBooks';
import { BooksCTA } from '@/components/sections/books/BooksCTA';

export const metadata = {
  title: 'Books | Aligned4LifeProject',
  description:
    'Books to help you heal, align, and transform. Explore biblically grounded resources designed to guide your journey.',
};

export default function BooksPage() {
  return (
    <SiteLayout>
      <PageHero
        title="Our Books"
        subtitle="Books to Help You Heal, Align, and Transform"
        description="Explore biblically grounded resources designed to guide your journey toward healing, clarity, and alignment with God's purpose."
      />
      <AnchoredBook />
      <RuinsCollection />
      <OtherBooks />
      <BooksCTA />
    </SiteLayout>
  );
}
