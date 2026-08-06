'use client';

import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const journeyWeeks = [
  {
    number: '01',
    week: 'Week One',
    title: 'The Foundation',
    description:
      'We begin by laying a biblical foundation for the month\u2019s theme, introducing the truths that will carry us through the journey.',
  },
  {
    number: '02',
    week: 'Week Two',
    title: 'The Deeper Study',
    description:
      'We go deeper into Scripture, unpacking what God\u2019s Word reveals and allowing truth to reshape how we see ourselves and others.',
  },
  {
    number: '03',
    week: 'Week Three',
    title: 'Practical Application',
    description:
      'We move from understanding to practice, learning how to live out the week\u2019s insights in our daily decisions and relationships.',
  },
  {
    number: '04',
    week: 'Week Four',
    title: 'Commitment & Transformation',
    description:
      'We close by turning growth into lasting change, committing to walk in the transformation God has begun in us.',
  },
];

export function JourneySection() {
  return (
    <section className="bg-white py-14 md:py-20" aria-labelledby="journey-heading">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <Reveal>
          <p className="text-center font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            The Journey
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2
            id="journey-heading"
            className="mt-3 text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl"
          >
            One Theme. Four Weeks.
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div
            className="mt-5 flex items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold/70" />
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold/70" />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-3xl text-center font-roboto text-base leading-relaxed text-textgray md:text-lg">
            Each month is a four-week journey exploring one biblical theme in depth. Every
            weekly reflection builds upon the one before it, encouraging spiritual growth
            and practical application as we walk together through the month.
          </p>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.15}>
          {journeyWeeks.map(({ number, week, title, description }) => (
            <StaggerItem key={number}>
              <div className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-600 font-nunito text-sm font-extrabold text-gold shadow-lg">
                    {number}
                  </span>
                  <span className="font-raleway text-xs font-bold uppercase tracking-[0.2em] text-gold">
                    {week}
                  </span>
                </div>
                <h3 className="mt-5 font-nunito text-lg font-extrabold text-navy-600">
                  {title}
                </h3>
                <p className="mt-3 flex-1 font-roboto text-sm leading-relaxed text-textgray">
                  {description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
