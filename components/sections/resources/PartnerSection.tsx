'use client';

import Image from 'next/image';
import { Reveal } from '@/components/animations/Reveal';

const ambassadorRoles = [
  'Prays for the ministry\'s growth and impact',
  'Shares and promotes content and events',
  'Supports through giving or volunteering',
  'Helps guide others toward living aligned with God\'s purpose',
];

const ambassadorBenefits = [
  'Early access to books, courses, and content',
  'Exclusive updates and ministry insights',
  'Opportunities to serve and lead',
  'Digital welcome kit and impact reports',
];

export function PartnerSection() {
  return (
    <section className="bg-midnavy py-12 md:py-16">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* Left: text content */}
          <Reveal direction="right">
            <div>
              <h2 className="font-nunito text-3xl font-bold text-white md:text-4xl">
                Partner With Us
              </h2>
              <h3 className="mt-2 font-nunito text-xl font-bold text-gold md:text-2xl">
                Become an Alignment Ambassador
              </h3>
              <p className="mt-4 font-roboto text-sm leading-relaxed text-lightgray md:text-base">
                Join the movement and help spread the mission of alignment. As an Alignment
                Ambassador, you play a vital role in advancing this ministry&apos;s work.
              </p>

              {/* What an Ambassador Does */}
              <h4 className="mt-6 font-nunito text-lg font-bold text-gold">
                What an Ambassador Does:
              </h4>
              <ul className="mt-2 space-y-2">
                {ambassadorRoles.map((role) => (
                  <li
                    key={role}
                    className="flex items-start gap-2 font-roboto text-sm text-white"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    {role}
                  </li>
                ))}
              </ul>

              {/* Benefits */}
              <h4 className="mt-6 font-nunito text-lg font-bold text-gold">Benefits:</h4>
              <ul className="mt-2 space-y-2">
                {ambassadorBenefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 font-roboto text-sm text-white"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Right: image */}
          <Reveal direction="left" delay={0.15}>
            <div className="relative h-96 w-full overflow-hidden rounded-2xl shadow-xl md:h-full md:min-h-[400px]">
              <Image
                src="/images/resources/events.jpg"
                alt="Partnership and collaboration"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>

        {/* Join button */}
        <Reveal delay={0.3}>
          <div className="mt-8 text-center">
            <a
              href="mailto:info@aligned4lifeproject.com?subject=Alignment%20Ambassador%20Inquiry"
              className="inline-block rounded-md bg-gold px-10 py-3.5 font-raleway text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Join Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
