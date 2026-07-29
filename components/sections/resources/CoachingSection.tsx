'use client';

import Image from 'next/image';
import { Reveal } from '@/components/animations/Reveal';

export function CoachingSection() {
  return (
    <section className="bg-navy-600 py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <h2 className="text-center font-nunito text-3xl font-bold text-gold md:text-4xl">
            Coaching
          </h2>
        </Reveal>

        <div className="mt-8 grid items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: text + button */}
          <Reveal direction="right">
            <div>
              <p className="font-roboto text-sm leading-relaxed text-white md:text-base">
                We offer one-on-one and group coaching sessions that provide biblical
                guidance and practical support. Whether you are navigating life transitions,
                overcoming misalignment, or seeking clarity, coaching helps you move forward
                with confidence and purpose.
              </p>
              <a
                href="mailto:info@aligned4lifeproject.com?subject=Coaching%20Inquiry"
                className="mt-6 inline-block rounded-md bg-gold px-8 py-3 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Book Now
              </a>
            </div>
          </Reveal>

          {/* Right: image */}
          <Reveal direction="left" delay={0.15}>
            <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-lg md:h-80">
              <Image
                src="/images/coaching.jpg"
                alt="Coaching session"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
