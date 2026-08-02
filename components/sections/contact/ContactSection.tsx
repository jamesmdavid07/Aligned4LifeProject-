'use client';

import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CalendarCheck,
  CheckCircle2,
  Mail,
  Mic,
} from 'lucide-react';
import { Reveal } from '@/components/animations/Reveal';

const whatToExpect = [
  {
    icon: BookOpen,
    title: 'Daily Devotionals',
    description: 'Weekly encouragement and Scripture to anchor your day.',
  },
  {
    icon: Mic,
    title: 'Podcast & Books',
    description: 'Updates on new episodes, releases, and exclusive content.',
  },
  {
    icon: CalendarCheck,
    title: 'Events & Coaching',
    description: 'Early notice of courses, retreats, and coaching openings.',
  },
];

const interestOptions = [
  'Newsletter & Updates',
  'Coaching & Courses',
  'Events & Retreats',
  'Volunteering & Partnership',
  'Donate',
  'Other',
];

const subjectToInterest: Array<{ keyword: string; interest: string }> = [
  { keyword: 'coaching', interest: 'Coaching & Courses' },
  { keyword: 'realignment', interest: 'Coaching & Courses' },
  { keyword: 'events', interest: 'Events & Retreats' },
  { keyword: 'ambassador', interest: 'Volunteering & Partnership' },
];

function interestFromSubject(subject: string) {
  const normalized = subject.toLowerCase();
  const match = subjectToInterest.find(({ keyword }) => normalized.includes(keyword));
  return match?.interest ?? interestOptions[0];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = { name?: string; email?: string; other?: string };
type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'w-full rounded-md border border-navy-200 bg-white px-4 py-3 font-roboto text-sm text-navy-700 placeholder:text-navy-300 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30';

export function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(interestOptions[0]);
  const [otherInterest, setOtherInterest] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get('subject');
    if (subject) setInterest(interestFromSubject(subject));
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!name.trim()) nextErrors.name = 'Please enter your name.';
    if (!email.trim()) nextErrors.email = 'Please enter your email address.';
    else if (!EMAIL_REGEX.test(email)) nextErrors.email = 'Please enter a valid email address.';
    if (interest === 'Other' && !otherInterest.trim())
      nextErrors.other = 'Please tell us what you\u2019re interested in.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('submitting');
    setErrorMessage('');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          interest,
          other: interest === 'Other' ? otherInterest : '',
        }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        setErrorMessage(data?.message ?? '');
        throw new Error('Request failed');
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="bg-navy-50 py-14 md:py-20">
      <div className="mx-auto max-w-site px-4 md:px-8 lg:px-12">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left: info panel */}
          <Reveal direction="right" className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-navy-600 p-8 shadow-lg md:p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[-20%] top-[-10%] h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
                <div className="absolute bottom-[-20%] right-[-10%] h-72 w-72 rounded-full bg-navy-300/10 blur-3xl" />
              </div>

              <div className="relative z-10">
                <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  What to Expect
                </p>
                <h2 className="mt-3 font-nunito text-2xl font-bold text-white md:text-3xl">
                  Begin Your Journey
                </h2>
                <p className="mt-4 font-roboto text-sm leading-relaxed text-lightgray md:text-base">
                  When you join, you&apos;ll receive practical tools and timely
                  encouragement to help you live aligned with God&apos;s purpose.
                </p>

                <ul className="mt-8 space-y-6">
                  {whatToExpect.map(({ icon: Icon, title, description }) => (
                    <li key={title} className="flex items-start gap-4">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold text-white shadow-lg">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <div>
                        <h3 className="font-nunito text-base font-bold text-white">{title}</h3>
                        <p className="mt-1 font-roboto text-sm leading-relaxed text-lightgray">
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                  <Mail size={16} className="text-gold" aria-hidden="true" />
                  <p className="font-roboto text-xs text-lightgray md:text-sm">
                    Prefer email? Reach us at{' '}
                    <span className="font-semibold text-white">
                      info@aligned4lifeproject.com
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal direction="left" delay={0.15} className="lg:col-span-7">
            <div className="rounded-3xl border border-navy-100 bg-white p-8 shadow-md md:p-10">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-50">
                    <CheckCircle2 size={36} className="text-gold" aria-hidden="true" />
                  </span>
                  <h2 className="mt-6 font-nunito text-2xl font-bold text-navy-600 md:text-3xl">
                    Thank you, {name.split(' ')[0]}!
                  </h2>
                  <p className="mt-3 max-w-md font-roboto text-sm leading-relaxed text-textgray md:text-base">
                    You&apos;re on the list. Keep an eye on your inbox—we&apos;ll be in
                    touch soon with your next steps toward alignment.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setOtherInterest('');
                      setInterest(interestOptions[0]);
                      setStatus('idle');
                    }}
                    className="mt-8 font-raleway text-sm font-bold text-gold transition-colors hover:text-gold-700"
                  >
                    Submit another response
                  </button>
                </div>
              ) : (
                <>
                  <p className="font-raleway text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                    Get In Touch
                  </p>
                  <h2 className="mt-3 font-nunito text-2xl font-bold text-navy-600 md:text-3xl">
                    Contact Us
                  </h2>
                  <p className="mt-3 font-roboto text-sm leading-relaxed text-textgray md:text-base">
                    Fill out the form below and let us know how we can help or how
                    you&apos;d like to get involved. We&apos;ll be in touch soon.
                  </p>

                  {status === 'error' && (
                    <div className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 font-roboto text-sm text-red-700">
                      {errorMessage || 'Something went wrong. Please try again in a moment.'}
                    </div>
                  )}

                  <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block font-raleway text-sm font-bold text-navy-600"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your full name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        aria-invalid={Boolean(errors.name)}
                        className={inputClasses}
                      />
                      {errors.name && (
                        <p className="mt-2 font-roboto text-xs text-red-600">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-raleway text-sm font-bold text-navy-600"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        className={inputClasses}
                      />
                      {errors.email && (
                        <p className="mt-2 font-roboto text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="interest"
                        className="mb-2 block font-raleway text-sm font-bold text-navy-600"
                      >
                        I&apos;m Interested In
                      </label>
                      <select
                        id="interest"
                        value={interest}
                        onChange={(event) => setInterest(event.target.value)}
                        className={inputClasses}
                      >
                        {interestOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {interest === 'Other' && (
                      <div>
                        <label
                          htmlFor="other-interest"
                          className="mb-2 block font-raleway text-sm font-bold text-navy-600"
                        >
                          Tell Us More
                        </label>
                        <textarea
                          id="other-interest"
                          rows={3}
                          placeholder="Describe what you&apos;re interested in..."
                          value={otherInterest}
                          onChange={(event) => setOtherInterest(event.target.value)}
                          aria-invalid={Boolean(errors.other)}
                          className={`${inputClasses} resize-none`}
                        />
                        {errors.other && (
                          <p className="mt-2 font-roboto text-xs text-red-600">{errors.other}</p>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gold px-8 py-3.5 font-raleway text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {status === 'submitting' ? 'Sending...' : 'Contact Us'}
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>

                    <p className="text-center font-roboto text-xs text-textgray">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
