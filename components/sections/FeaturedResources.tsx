'use client';

import { Reveal } from '@/components/animations/Reveal';

export function FeaturedResources() {
  return (
    <>
      {/* Section label */}
      <section className="bg-white py-4">
        <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
          <Reveal>
            <h2 className="text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
              Featured Resources
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Featured resources banner image */}
      <section className="bg-darknavy">
        <div className="mx-auto max-w-site">
          <Reveal delay={0.1}>
            <div className="flex justify-center">
              <img
                src="/images/featured-resources.png"
                alt="Featured resources banner"
                className="h-auto w-full max-w-site"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* View Books button */}
      <section className="bg-darknavy pb-10 pt-2">
        <div className="mx-auto max-w-site px-4 text-center">
          <a
            href="/books#section-shared-header"
            className="inline-block rounded-md bg-white px-8 py-3 font-raleway text-xl font-bold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            View Books &gt;
          </a>
        </div>
      </section>
    </>
  );
}
