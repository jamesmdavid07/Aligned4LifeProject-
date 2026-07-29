'use client';

import { Reveal, StaggerGroup, StaggerItem } from '@/components/animations/Reveal';

const values = [
  {
    number: '01',
    title: 'Scripture is the Standard',
    description: "God's Word is the ultimate authority for life and transformation.",
  },
  {
    number: '02',
    title: 'Transformation Takes Time',
    description: "Change is a process worked through the Holy Spirit's faithful presence.",
  },
  {
    number: '03',
    title: 'Purpose is Personal and Powerful',
    description: 'Every life is divinely designed with an intentional Kingdom assignment.',
  },
  {
    number: '04',
    title: 'Healing Happens in His Hands',
    description: 'True wholeness and restoration come only through Christ.',
  },
  {
    number: '05',
    title: 'Resources Reinforce Realignment',
    description:
      'Books, coaching, and teaching support growth and alignment toward purpose.',
  },
];

export function CoreValues() {
  return (
    <>
      {/* Values heading */}
      <section className="bg-white py-8 md:py-10">
        <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
          <Reveal>
            <p className="text-center font-raleway text-sm font-semibold tracking-[0.3em] text-gold">
              W H Y&nbsp; W E&nbsp; S T A N D&nbsp; F O R
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-2 text-center font-nunito text-3xl font-bold text-navy-600 md:text-4xl">
              Our Core Values
            </h2>
          </Reveal>
        </div>
      </section>

      {/* Values list */}
      <section className="bg-white pb-16">
        <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
          <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
            {values.map((value) => (
              <StaggerItem key={value.number}>
                <div className="group h-full rounded-2xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:shadow-xl hover:border-gold/30">
                  <p className="font-nunito text-4xl font-extrabold text-navy-100 transition-colors group-hover:text-gold">
                    {value.number}
                  </p>
                  <h3 className="mt-3 font-nunito text-xl font-bold text-navy-600">
                    {value.title}
                  </h3>
                  <p className="mt-2 font-roboto text-sm leading-relaxed text-textgray">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
