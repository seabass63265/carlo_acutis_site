import type { Metadata } from "next";
import AnimateIn from "@/components/AnimateIn";
import PageHero from "@/components/PageHero";
import ContactForms from "@/components/ContactForms";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Friends of St. Carlo Acutis Foundation — for general inquiries, prayer requests, speaking opportunities, and more.",
};

const contactChannels = [
  {
    label: "General Inquiries",
    email: "info@carloaculisfoundation.org",
    description: "Questions about the foundation, our programs, or Carlo's story.",
  },
  {
    label: "Institutional Giving",
    email: "partnerships@carloaculisfoundation.org",
    description: "Foundation grants, diocesan partnerships, and institutional giving.",
  },
  {
    label: "Speaking & Media",
    email: "media@carloaculisfoundation.org",
    description: "Speaking requests, media inquiries, and press relations.",
  },
  {
    label: "Education & Resources",
    email: "resources@carloaculisfoundation.org",
    description: "Exhibition bookings, lesson plans, and educational partnerships.",
  },
];

const socialLinks = [
  { name: "Facebook", handle: "@CarloAcutisFoundation", href: "#" },
  { name: "Instagram", handle: "@carloaculisfoundation", href: "#" },
  { name: "YouTube", handle: "St. Carlo Acutis Foundation", href: "#" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to Hear from You"
        subtitle="Whether you're a teen seeking inspiration, a parish looking for resources, or a donor exploring partnership — reach out. We're here."
      />

      {/* Contact channels */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: channels */}
            <div>
              <AnimateIn>
                <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">
                  Contact Channels
                </p>
              </AnimateIn>
              <AnimateIn delay={0.1}>
                <h2 className="font-serif text-4xl font-semibold text-navy mb-10 leading-tight">
                  The Right Inbox for Every Question
                </h2>
              </AnimateIn>

              <div className="space-y-5">
                {contactChannels.map(({ label, email, description }, i) => (
                  <AnimateIn key={label} direction="left" delay={i * 0.08}>
                    <div className="border border-cream-dark rounded-sm p-6 hover:border-gold/30 hover:shadow-md hover:shadow-navy/5 transition-all duration-300">
                      <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold mb-2">{label}</p>
                      <a
                        href={`mailto:${email}`}
                        className="font-semibold text-navy hover:text-navy-light transition-colors text-sm block mb-2"
                      >
                        {email}
                      </a>
                      <p className="text-navy/55 text-sm">{description}</p>
                    </div>
                  </AnimateIn>
                ))}
              </div>

              {/* Social */}
              <AnimateIn delay={0.4}>
                <div className="mt-10 pt-10 border-t border-cream-dark">
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-gold-dark mb-6">
                    Follow Us
                  </p>
                  <div className="space-y-3">
                    {socialLinks.map(({ name, handle, href }) => (
                      <a
                        key={name}
                        href={href}
                        className="flex items-center gap-4 group"
                      >
                        <span className="text-navy/30 text-xs w-20 group-hover:text-navy/60 transition-colors">{name}</span>
                        <span className="text-navy font-medium text-sm group-hover:text-gold transition-colors">{handle}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right: form */}
            <div>
              <AnimateIn direction="left" delay={0.15}>
                <ContactForms />
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer request section */}
      <section className="py-24 px-6 bg-navy-dark" id="prayer">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <div className="text-gold/25 font-serif text-7xl leading-none mb-4 select-none">&dagger;</div>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white mb-6">
              Submit a Prayer Request
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.15}>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              We pray for every person who contacts us. Submit your intentions
              and our team will include them in our daily prayers and at Mass.
            </p>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <a
              href="mailto:prayer@carloaculisfoundation.org"
              className="inline-block bg-gold text-navy-dark font-semibold px-8 py-4 rounded-sm hover:bg-gold-light transition-colors text-sm tracking-wide"
            >
              Submit a Prayer Request
            </a>
          </AnimateIn>
          <AnimateIn delay={0.25}>
            <blockquote className="mt-12 border border-white/10 rounded-sm p-8">
              <p className="font-serif italic text-xl text-white/80 leading-relaxed mb-4">
                &ldquo;Carlo used to say that sadness is looking at ourselves;
                happiness is looking at God.&rdquo;
              </p>
              <cite className="text-white/30 text-xs tracking-widest uppercase not-italic">
                Antonia Salzano — Carlo&apos;s mother
              </cite>
            </blockquote>
          </AnimateIn>
        </div>
      </section>

      {/* Speaking / Volunteer */}
      <section className="py-24 px-6 bg-cream" id="speaking">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                eyebrow: "Speaking Requests",
                title: "Bring Carlo's Story to Your Event",
                body: "Our team is available to speak at retreats, conferences, school events, and parish missions. We bring Carlo's story to life with compelling presentations tailored to your audience.",
                cta: "Request a Speaker",
                href: "mailto:media@carloaculisfoundation.org",
              },
              {
                eyebrow: "Volunteer",
                title: "Join the Mission",
                body: "From digital content creation to event coordination to translation, we welcome volunteers who share Carlo's passion for using their gifts in service of the Gospel.",
                cta: "Volunteer with Us",
                href: "mailto:info@carloaculisfoundation.org",
                id: "volunteer",
              },
            ].map(({ eyebrow, title, body, cta, href }, i) => (
              <AnimateIn key={title} delay={i * 0.1}>
                <div className="bg-white border border-cream-dark rounded-sm p-10 h-full hover:shadow-xl hover:shadow-navy/5 transition-all duration-300">
                  <p className="text-gold-dark text-[10px] font-semibold tracking-[0.25em] uppercase mb-5">{eyebrow}</p>
                  <h3 className="font-serif text-2xl font-semibold text-navy mb-5">{title}</h3>
                  <p className="text-navy/60 text-base leading-relaxed mb-8">{body}</p>
                  <a
                    href={href}
                    className="inline-block bg-navy text-white text-sm font-semibold px-6 py-3 rounded-sm hover:bg-navy-light transition-colors"
                  >
                    {cta} →
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
