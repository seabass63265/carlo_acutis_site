import { Link } from "@/i18n/navigation";
import { FiFacebook, FiLinkedin } from "react-icons/fi";
import ChangeLanguageButton from "@/components/ChangeLanguageButton";
import { getTranslations } from "next-intl/server";

const footerSections = [
  {
    heading: "about",
    links: [
      { href: "/about", label: "aboutUs" },
      { href: "/carlo", label: "carloStory" },
      { href: "/eucharistic-miracles", label: "eucharisticMiracles" },
      { href: "/about#governance", label: "governance" },
    ],
  },
  {
    heading: "getInvolved",
    links: [
      { href: "/youth-council", label: "youthCouncil" },
      { href: "/donate", label: "waysToGive" },
      { href: "/donate#institutional", label: "institutionalGiving" },
      { href: "/donate#corporate", label: "corporatePartners" },
      { href: "/contact", label: "volunteer" },
    ],
  },
  {
    heading: "resources",
    links: [
      { href: "/eucharistic-miracles", label: "miracleArchive" },
      { href: "/contact", label: "prayerRequests" },
      { href: "/contact", label: "speakingRequests" },
    ],
  },
];

const socials = [
  { label: "Facebook", href: "https://www.facebook.com/friendsofstcarlo", Icon: FiFacebook },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/friendsofstcarlo/", Icon: FiLinkedin },
];

function CrossIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 2V26M7 9H21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default async function Footer() {
  const t = await getTranslations("footer");
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
                  {t("brand")}
                </p>
                <p className="text-gold text-[10px] tracking-[0.04em] mt-1 leading-snug max-w-[240px]">
                  {t("brandTagline")}
                </p>
              </div>
            </Link>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              {t("description")}
            </p>

            {/* Carlo quote */}
            <blockquote className="border-l-2 border-gold pl-4 mb-8">
              <p className="text-gold/80 font-serif italic text-sm leading-relaxed">
                {t("quote")}
              </p>
              <cite className="text-white/30 text-xs mt-1 block not-italic">
                {t("quoteBy")}
              </cite>
            </blockquote>

            {/* Socials */}
            <div className="flex gap-5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-white/35 hover:text-gold transition-colors duration-200"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-gold text-[10px] font-semibold tracking-[0.2em] uppercase mb-5">
                {t(heading)}
              </h4>
              <ul className="space-y-3">
                {links.map(({ href, label }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200"
                    >
                      {t(label)}
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
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6">
            {(["privacy", "terms", "accessibility"] as const).map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200"
              >
                {t(item)}
              </a>
            ))}
            <ChangeLanguageButton />
          </div>
        </div>

      </div>
    </footer>
  );
}
