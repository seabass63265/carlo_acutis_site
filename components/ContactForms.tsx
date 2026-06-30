"use client";
import { useState } from "react";

type Tab = "general" | "partnership" | "speaking";

const tabs: { key: Tab; label: string }[] = [
  { key: "general", label: "General Inquiry" },
  { key: "partnership", label: "Partnership" },
  { key: "speaking", label: "Speaking Request" },
];

const inputClass =
  "w-full border border-cream-dark rounded-sm px-4 py-3 text-sm text-navy bg-cream placeholder:text-navy/35 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all duration-200";

const labelClass = "block text-xs font-semibold tracking-wide text-navy/60 mb-1.5";

function GeneralForm() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name</label>
          <input type="text" placeholder="First name" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input type="text" placeholder="Last name" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Email Address</label>
        <input type="email" placeholder="your@email.com" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Subject</label>
        <select className={inputClass}>
          <option value="">Select a subject</option>
          <option>Carlo&apos;s Story</option>
          <option>Eucharistic Miracles Exhibition</option>
          <option>Youth Resources</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Message</label>
        <textarea rows={5} placeholder="How can we help?" className={`${inputClass} resize-none`} />
      </div>
    </div>
  );
}

function PartnershipForm() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Contact Name</label>
          <input type="text" placeholder="Full name" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Title / Role</label>
          <input type="text" placeholder="Executive Director" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Organization</label>
        <input type="text" placeholder="Organization name" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Organization Type</label>
        <select className={inputClass}>
          <option value="">Select type</option>
          <option>Diocese / Parish</option>
          <option>Catholic Foundation</option>
          <option>Corporation</option>
          <option>Educational Institution</option>
          <option>Other Nonprofit</option>
        </select>
      </div>
      <div>
        <label className={labelClass}>Email Address</label>
        <input type="email" placeholder="your@organization.org" className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Partnership Interest</label>
        <textarea rows={4} placeholder="Describe your organization's mission and how you'd like to partner with us." className={`${inputClass} resize-none`} />
      </div>
      <div>
        <label className={labelClass}>Estimated Gift Range (Optional)</label>
        <select className={inputClass}>
          <option value="">Prefer not to say</option>
          <option>Under $10,000</option>
          <option>$10,000 – $50,000</option>
          <option>$50,000 – $250,000</option>
          <option>$250,000+</option>
        </select>
      </div>
    </div>
  );
}

function SpeakingForm() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Your Name</label>
          <input type="text" placeholder="Full name" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input type="email" placeholder="your@email.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Event / Organization</label>
        <input type="text" placeholder="Parish, school, conference..." className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Audience</label>
        <select className={inputClass}>
          <option value="">Select audience</option>
          <option>Teens (13–18)</option>
          <option>Young Adults (18–30)</option>
          <option>Adults / Families</option>
          <option>Youth Ministers / Educators</option>
          <option>Mixed / All Ages</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Expected Date</label>
          <input type="date" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Expected Attendance</label>
          <input type="text" placeholder="e.g. 200" className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Additional Details</label>
        <textarea rows={4} placeholder="Tell us more about your event..." className={`${inputClass} resize-none`} />
      </div>
    </div>
  );
}

export default function ContactForms() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="bg-cream border border-cream-dark rounded-sm p-12 text-center">
        <div className="text-gold text-4xl mb-4">✓</div>
        <h3 className="font-serif text-2xl font-semibold text-navy mb-3">Message Sent</h3>
        <p className="text-navy/60 text-sm leading-relaxed mb-6">
          Thank you for reaching out. A member of our team will reply within 2–3
          business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-gold text-sm font-semibold hover:text-gold-dark transition-colors"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <div className="bg-cream border border-cream-dark rounded-sm overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-cream-dark overflow-x-auto">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-shrink-0 px-5 py-4 text-xs font-semibold tracking-wide transition-all duration-200 border-b-2 -mb-[2px] ${
              activeTab === key
                ? "border-gold text-navy"
                : "border-transparent text-navy/40 hover:text-navy/60"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} className="p-8">
        {activeTab === "general" && <GeneralForm />}
        {activeTab === "partnership" && <PartnershipForm />}
        {activeTab === "speaking" && <SpeakingForm />}

        <button
          type="submit"
          className="mt-6 w-full bg-navy text-white font-semibold py-4 rounded-sm text-sm tracking-wide hover:bg-navy-light transition-colors duration-200"
        >
          Send Message →
        </button>
      </form>
    </div>
  );
}
