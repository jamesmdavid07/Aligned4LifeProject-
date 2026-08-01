'use client';

import { ArrowRight, CheckCircle2, Gift, HeartHandshake } from 'lucide-react';
import Link from 'next/link';
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
    <section className="bg-navy-50 py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: text + CTA */}
          <Reveal direction="right" className="text-center lg:text-left lg:col-span-5">
            <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Get Involved
            </p>
            <h2 className="mt-3 font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
              Partner With Us
            </h2>
            <h3 className="mt-2 font-nunito text-xl font-bold text-gold md:text-2xl">
              Become an Alignment Ambassador
            </h3>
            <p className="mx-auto mt-4 max-w-xl font-roboto text-sm leading-relaxed text-textgray md:text-base lg:mx-0">
              Join the movement and help spread the mission of alignment. As an Alignment
              Ambassador, you play a vital role in advancing this ministry&apos;s work.
            </p>
            <Link
              href="/contact?subject=Alignment%20Ambassador%20Inquiry"
              className="group mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Join Us
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </Reveal>

          {/* Right: role + benefit cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            <Reveal direction="left">
              <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-md transition-all duration-300 hover:border-gold/30 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-white shadow-lg">
                  <HeartHandshake size={22} aria-hidden="true" />
                </span>
                <h4 className="mt-4 font-nunito text-lg font-bold text-navy-600">
                  What an Ambassador Does
                </h4>
                <ul className="mt-4 space-y-3">
                  {ambassadorRoles.map((role) => (
                    <li
                      key={role}
                      className="flex items-start gap-2.5 font-roboto text-sm leading-relaxed text-textgray"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.15}>
              <div className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-8 shadow-md transition-all duration-300 hover:border-gold/30 hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-white shadow-lg">
                  <Gift size={22} aria-hidden="true" />
                </span>
                <h4 className="mt-4 font-nunito text-lg font-bold text-navy-600">
                  Ambassador Benefits
                </h4>
                <ul className="mt-4 space-y-3">
                  {ambassadorBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-2.5 font-roboto text-sm leading-relaxed text-textgray"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 flex-shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
