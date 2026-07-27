"use client";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import AnimateIn from "@/components/AnimateIn";

const fieldWrap = "flex flex-col gap-2";
const labelClass = "text-xs font-semibold tracking-widest uppercase text-navy/70";
const inputClass =
  "w-full bg-transparent border-b-2 border-navy/20 py-3 text-lg text-navy focus:outline-none focus:border-navy transition-colors placeholder:text-navy/30";
const selectClass = `${inputClass} appearance-none pr-8 cursor-pointer text-navy/70`;

const audienceOptions = [
  "Individual / Faithful",
  "Parish or Diocese",
  "Educator / Catechist",
  "Media / Press",
  "Donor / Partner Organization",
  "Other",
];

const reasonOptions = [
  "General Inquiry",
  "Prayer Request",
  "Partnerships & Giving",
  "Speaking & Media",
  "Volunteering",
  "Education & Resources",
  "Other",
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/friendsofstcarlo", Icon: FaFacebookF },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/friendsofstcarlo/", Icon: FaLinkedinIn },
];

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M11 2v9H2v2h9v9h2v-9h9v-2h-9V2z" />
    </svg>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-sm">
        <div className="text-gold text-4xl mb-4">✓</div>
        <h3 className="font-serif text-2xl font-semibold text-navy mb-3">Message Sent</h3>
        <p className="text-navy/60 text-sm leading-relaxed mb-6">
          Thank you for reaching out. A member of our team will reply within 2–3 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-gold-dark text-sm font-semibold hover:text-navy transition-colors"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-3xl">
      <div className={fieldWrap}>
        <label className={labelClass}>What&apos;s Your Name?</label>
        <input type="text" placeholder="Full Name" required className={inputClass} />
      </div>

      <div className={fieldWrap}>
        <label className={labelClass}>What&apos;s Your Email?</label>
        <input type="email" placeholder="your@email.com" required className={inputClass} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className={`${fieldWrap} relative`}>
          <label className={labelClass}>Who Are You?</label>
          <select required defaultValue="" className={selectClass}>
            <option value="" disabled>Select one</option>
            {audienceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <FiChevronDown className="pointer-events-none absolute right-2 bottom-4 text-navy/50" />
        </div>
        <div className={`${fieldWrap} relative`}>
          <label className={labelClass}>What&apos;s This Regarding?</label>
          <select required defaultValue="" className={selectClass}>
            <option value="" disabled>Select one</option>
            {reasonOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <FiChevronDown className="pointer-events-none absolute right-2 bottom-4 text-navy/50" />
        </div>
      </div>

      <div className={fieldWrap}>
        <label className={labelClass}>What&apos;s On Your Heart?</label>
        <textarea
          rows={4}
          placeholder="Write your message here in no more than five hundred words..."
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="mt-2 inline-flex items-center gap-2 bg-navy text-white uppercase tracking-widest text-sm font-semibold py-4 px-10 self-start hover:bg-gold transition-colors duration-300"
      >
        Send Message
      </button>
    </form>
  );
}

export default function ContactHero() {
  return (
    <section className="flex flex-col md:flex-row bg-cream md:min-h-[calc(100vh-88px)]">
      {/* Form panel */}
      <div className="w-full md:w-2/3 pt-32 md:pt-40 pb-16 px-6 sm:px-12 lg:px-24 flex flex-col">
        <AnimateIn>
          <header className="mb-16">
            <h1 className="font-serif text-6xl lg:text-8xl tracking-tight text-navy flex items-center gap-4">
              LET&apos;S
              <PlusIcon className="w-10 h-10 lg:w-12 lg:h-12 text-gold" />
            </h1>
            <h1 className="font-serif text-6xl lg:text-8xl tracking-tight text-navy ml-16">
              CONNECT
            </h1>
          </header>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <ContactForm />
        </AnimateIn>
      </div>

      {/* Info panel */}
      <div className="w-full md:w-1/3 bg-navy text-cream pt-16 md:pt-40 pb-16 px-6 sm:px-12 lg:px-16 flex flex-col relative overflow-hidden">
        <PlusIcon className="absolute -right-16 -bottom-16 w-72 h-72 lg:w-96 lg:h-96 text-white/5 pointer-events-none" />

        <AnimateIn delay={0.15} className="relative z-10">
          <p className="font-serif text-gold text-lg italic mb-2">Reach out to us</p>
          <h2 className="text-2xl lg:text-3xl font-serif mb-12 leading-snug">
            We are here to listen and pray with you.
          </h2>

          <div className="space-y-10">
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-cream/50 mb-2">Email</h3>
              <a
                href="mailto:info@friendsofstcarlo.org"
                className="text-xl lg:text-2xl font-serif hover:text-gold transition-colors"
              >
                info@friendsofstcarlo.org
              </a>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.2} className="relative z-10 mt-16">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-cream/50 mb-4">Follow Us</h3>
          <div className="flex gap-4">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-gold hover:border-gold transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
