'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, User, Users } from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

const coachingModes = [
  {
    icon: User,
    title: 'One-on-One Coaching',
    description: 'Focused biblical guidance and practical support tailored to your season.',
  },
  {
    icon: Users,
    title: 'Group Coaching',
    description: 'Shared growth and encouragement alongside others on the journey.',
  },
];

export function CoachingSection() {
  return (
    <section className="relative overflow-hidden bg-navy-600 py-14 md:py-20">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute right-[-5%] bottom-[10%] h-96 w-96 rounded-full bg-navy-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Left: image */}
          <Reveal direction="right">
            <div className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-3 rounded-3xl border border-gold/30"
                aria-hidden="true"
              />
              <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-lg md:h-96">
                <Image
                  src="/images/resources/coaching.jpg"
                  alt="Coaching session"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </Reveal>

          {/* Right: text + cards */}
          <Reveal direction="left" delay={0.15} className="text-center lg:text-left">
            <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Guidance &amp; Support
            </p>
            <h2 className="mt-3 font-nunito text-3xl font-bold text-white md:text-4xl">
              Coaching
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-roboto text-base leading-relaxed text-lightgray md:text-lg lg:mx-0">
              We offer one-on-one and group coaching sessions that provide biblical
              guidance and practical support. Whether you are navigating life transitions,
              overcoming misalignment, or seeking clarity, coaching helps you move forward
              with confidence and purpose.
            </p>

            <div className="mt-6 grid gap-4 text-left sm:grid-cols-2">
              {coachingModes.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-gold/30 hover:bg-white/10"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-white shadow-lg">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-nunito text-base font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 font-roboto text-sm leading-relaxed text-lightgray">
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <Link
              href="/contact?subject=Coaching%20Inquiry"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Book Now
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
