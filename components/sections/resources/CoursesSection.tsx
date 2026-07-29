'use client';

import Image from 'next/image';
import { Reveal } from '@/components/animations/Reveal';

export function CoursesSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <h2 className="text-center font-nunito text-3xl font-bold text-gold md:text-4xl">
            Courses
          </h2>
        </Reveal>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: image */}
          <Reveal direction="right">
            <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg md:h-80">
              <Image
                src="/images/courses.jpg"
                alt="Educational course materials"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          {/* Right: text + button */}
          <Reveal direction="left" delay={0.15}>
            <div>
              <h3 className="font-nunito text-2xl font-bold text-navy-600 md:text-3xl">
                The Realignment Path
              </h3>
              <p className="mt-4 font-roboto text-sm leading-relaxed text-blacktext md:text-base">
                A 6-week transformational journey designed to guide you from wounded to
                walking in purpose. This course helps you confront past pain, embrace
                healing, and step into your God-given calling through biblical teaching and
                practical steps.
              </p>
              <a
                href="mailto:info@aligned4lifeproject.com?subject=The%20Realignment%20Path"
                className="mt-6 inline-block rounded-md bg-gold px-8 py-3 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Enroll Now
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
