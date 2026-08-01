'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, CalendarCheck, Heart } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

const courseHighlights = [
  { icon: BookOpen, label: 'Biblical Teaching' },
  { icon: Heart, label: 'Practical Healing Steps' },
  { icon: CalendarCheck, label: '6-Week Journey' },
];

export function CoursesSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left: text */}
          <Reveal direction="right" className="text-center lg:text-left">
            <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Courses
            </p>
            <h2 className="mt-3 font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
              The Realignment Path
            </h2>
            <h3 className="mt-2 font-nunito text-lg font-bold text-gold md:text-xl">
              From Wounded to Walking in Purpose
            </h3>
            <p className="mx-auto mt-4 max-w-xl font-roboto text-base leading-relaxed text-textgray md:text-lg lg:mx-0">
              A 6-week transformational journey designed to guide you from wounded to
              walking in purpose. This course helps you confront past pain, embrace
              healing, and step into your God-given calling through biblical teaching and
              practical steps.
            </p>

            <ul className="mt-6 space-y-3">
              {courseHighlights.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 font-roboto text-sm font-semibold text-navy-600 md:text-base"
                >
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold-50 text-gold">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>

            <Link
              href="/contact?subject=The%20Realignment%20Path"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Enroll Now
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          {/* Right: image */}
          <Reveal direction="left" delay={0.15}>
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-3 rounded-3xl border border-gold/30"
                aria-hidden="true"
              />
              <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-lg md:h-96">
                <Image
                  src="/images/resources/courses.jpg"
                  alt="Educational course materials"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
