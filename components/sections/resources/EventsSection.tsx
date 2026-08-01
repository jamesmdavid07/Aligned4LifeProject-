'use client';

import { ArrowRight, CalendarCheck, MapPin, Mountain, Presentation } from 'lucide-react';
import Link from 'next/link';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const eventTypes = [
  {
    icon: Presentation,
    title: 'Workshops',
    description: 'Hands-on experiences designed to create space for rest, renewal, and revelation.',
  },
  {
    icon: CalendarCheck,
    title: 'Seminars',
    description: 'Teaching moments that help you reconnect, refocus, and realign with God\u2019s purpose.',
  },
  {
    icon: Mountain,
    title: 'Spiritual Retreats',
    description: 'Immersive getaways for deep rest, renewal, and fresh revelation from the Lord.',
  },
];

export function EventsSection() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <p className="text-center font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Gatherings &amp; Community
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-3 text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
            Events
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-4 max-w-3xl text-center font-roboto text-sm leading-relaxed text-textgray md:text-base">
            Join our workshops, seminars, and spiritual retreats designed to create space for
            rest, renewal, and revelation. These experiences are available both in-person and
            online, helping you reconnect, refocus, and realign with God&apos;s purpose.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-5 py-2 font-raleway text-sm font-bold text-gold-700">
              <MapPin size={16} aria-hidden="true" />
              Available In-Person &amp; Online
            </span>
          </div>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8" stagger={0.15}>
          {eventTypes.map(({ icon: Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md transition-all duration-300 hover:border-gold/30 hover:shadow-xl">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-nunito text-xl font-bold text-navy-600">{title}</h3>
                <p className="mt-3 flex-1 font-roboto text-sm leading-relaxed text-textgray md:text-base">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link
              href="/contact?subject=Events%20Inquiry"
              className="group inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Book Now
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
