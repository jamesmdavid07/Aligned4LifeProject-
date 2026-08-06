'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageHero } from '@/components/sections/PageHero';
import { JourneySection } from './JourneySection';
import { BlogArticle } from './BlogArticle';
import { BlogArchive } from './BlogArchive';
import { mapDbWeeklyBlog, type DbWeeklyBlog, type WeeklyBlog } from '@/lib/weekly-blogs';
import { getTodayDate } from '@/lib/devotionals';

export function WeeklyBlogPage({ initialBlogs = [] }: { initialBlogs?: DbWeeklyBlog[] }) {
  const initialMapped = initialBlogs.map(mapDbWeeklyBlog);
  const [blogs, setBlogs] = useState<WeeklyBlog[]>(initialMapped);
  const [currentIndex, setCurrentIndex] = useState(() => defaultIndexFor(initialMapped));
  const [isLoading, setIsLoading] = useState(initialMapped.length === 0);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const response = await fetch('/api/weekly-blogs?includeFuture=1', { cache: 'no-store' });
        const result = await response.json();

        if (response.ok && result.success && Array.isArray(result.data)) {
          const mapped = (result.data as DbWeeklyBlog[]).map(mapDbWeeklyBlog);
          setBlogs(mapped);
          setCurrentIndex(defaultIndexFor(mapped));
          setLoadError(null);
        } else {
          setLoadError('Unable to load weekly reflections right now.');
        }
      } catch (error) {
        console.error('Failed to load weekly blogs from MySQL', error);
        setLoadError('Unable to load weekly reflections right now.');
      } finally {
        setIsLoading(false);
      }
    }

    loadBlogs();
  }, []);

  const displayedBlog = blogs[currentIndex] ?? null;
  const latestPublishedIndex = defaultIndexFor(blogs);

  function selectBlog(id: number) {
    const index = blogs.findIndex((post) => post.id === id);
    if (index === -1) return;
    setCurrentIndex(index);
    scrollToReflection();
  }

  function backToThisWeek() {
    setCurrentIndex(latestPublishedIndex);
    scrollToReflection();
  }

  function scrollToReflection() {
    window.requestAnimationFrame(() => {
      document.getElementById('weekly-reflection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <>
      <PageHero
        title="Blog"
        subtitle="A new reflection every week."
        description="Biblical insights designed to move beyond inspiration toward lasting transformation."
      />
      <JourneySection />
      <main className="bg-navy-50 py-12 md:py-16">
        <div className="space-y-10">
          <section
            id="weekly-reflection"
            className="scroll-mt-24"
            aria-labelledby="reflection-heading"
          >
            <div className="mx-auto mb-6 w-full max-w-site px-4 md:px-8 lg:px-12">
              <p className="font-raleway text-sm font-bold uppercase tracking-[0.25em] text-gold">
                This Week&apos;s Reflection
              </p>
              <h2
                id="reflection-heading"
                className="mt-2 font-nunito text-3xl font-extrabold text-navy-600 sm:text-4xl"
              >
                {currentIndex === latestPublishedIndex || !displayedBlog
                  ? 'This Week\u2019s Reflection'
                  : displayedBlog.weekNumber != null
                    ? `Reflection for Week ${displayedBlog.weekNumber}`
                    : 'Reflection from a Previous Week'}
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="mx-auto max-w-site px-4 md:px-8 lg:px-12"
                >
                  <div className="rounded-2xl border border-gold-200 bg-gradient-to-b from-gold-50 to-white p-8 text-center shadow-md">
                    <p className="font-nunito text-lg font-bold text-navy-700">
                      Loading reflection...
                    </p>
                  </div>
                </motion.div>
              ) : loadError || !displayedBlog ? (
                <motion.div
                  key="unavailable"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="mx-auto max-w-site px-4 md:px-8 lg:px-12"
                >
                  <div className="rounded-2xl border border-gold-200 bg-gradient-to-b from-gold-50 to-white p-8 text-center shadow-md">
                    <p className="font-nunito text-lg font-bold text-navy-700">
                      {loadError || 'No weekly reflection available yet.'}
                    </p>
                    <p className="mt-2 font-roboto text-sm text-textgray">
                      Check back soon for the next reflection.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
                  <BlogArticle blog={displayedBlog} />
                </div>
              )}
            </AnimatePresence>
          </section>

          <div className="mx-auto w-full max-w-site px-4 md:px-8 lg:px-12">
            <BlogArchive
              blogs={blogs}
              activeId={displayedBlog?.id ?? null}
              onSelect={selectBlog}
              onBackToThisWeek={backToThisWeek}
            />
          </div>
        </div>
      </main>
    </>
  );
}

function defaultIndexFor(blogs: WeeklyBlog[]) {
  const today = getTodayDate();
  const index = blogs.findIndex((post) => post.publishDate <= today);
  return index === -1 ? 0 : index;
}
