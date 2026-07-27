import { Link } from "@/i18n/navigation";
import ChangeLanguageButton from "@/components/ChangeLanguageButton";

const footerSections = [
  {
    heading: "Foundation",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/carlo", label: "Carlo's Story" },
      { href: "/eucharistic-miracles", label: "Eucharistic Miracles" },
      { href: "/about#governance", label: "Governance" },
    ],
  },
  {
    heading: "Get Involved",
    links: [
      { href: "/donate", label: "Ways to Give" },
      { href: "/donate#institutional", label: "Institutional Giving" },
      { href: "/donate#corporate", label: "Corporate Partners" },
      { href: "/contact", label: "Volunteer" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/eucharistic-miracles", label: "Miracle Archive" },
      { href: "/contact", label: "Prayer Requests" },
      { href: "/contact", label: "Speaking Requests" },
      { href: "/donate#reports", label: "Annual Reports" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/friendsofstcarlo" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/friendsofstcarlo/" },
];

function CrossIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2V26M7 9H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <span className="text-gold">
                <CrossIcon />
              </span>
              <div>
                <p className="text-white font-serif font-semibold leading-tight">
                  Friends of St. Carlo Acutis
                </p>
                <p className="text-gold text-[10px] tracking-[0.2em] uppercase mt-0.5">
                  Foundation
                </p>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Inspiring a new generation to use technology, faith, and service to transform the world in the example of Carlo Acutis.
            </p>

            {/* Carlo quote */}
            <blockquote className="border-l-2 border-gold pl-4 mb-8">
              <p className="text-gold/80 font-serif italic text-sm leading-relaxed">
                &ldquo;The Eucharist is my highway to Heaven.&rdquo;
              </p>
              <cite className="text-white/30 text-xs mt-1 block not-italic">
                — St. Carlo Acutis
              </cite>
            </blockquote>

            {/* Socials */}
            <div className="flex gap-5">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white/35 hover:text-gold text-xs tracking-widest uppercase transition-colors duration-200"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase mb-5">
                {heading}
              </h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Friends of St. Carlo Acutis Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Use", "Accessibility"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200"
              >
                {item}
              </a>
            ))}
            <ChangeLanguageButton />
          </div>
        </div>

        {/* Builder credit */}
        <div className="pt-6 border-t border-white/5 mt-6 text-center">
          <p className="text-white/20 text-[10px] tracking-[0.2em] uppercase">
            Built by <span className="text-white/40">Sebastian Rocha</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
