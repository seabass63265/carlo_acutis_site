import CrowdCanvasClient from "@/components/CrowdCanvasClient";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  videoSrc?: string;
  crowdCanvas?: boolean;
}

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  dark = true,
  videoSrc,
  crowdCanvas = false,
}: PageHeroProps) {
  return (
    <section
      className={`relative overflow-hidden pt-40 px-6 ${crowdCanvas ? "pb-56" : "pb-24"} ${
        dark ? "bg-navy text-white" : "bg-cream-dark text-navy"
      }`}
    >
      {/* Video background */}
      {videoSrc && !crowdCanvas && (
        <>
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/70" />
        </>
      )}

      {/* Crowd canvas background — mirrors original Skiper39 structure */}
      {crowdCanvas && (
        <>
          {/* absolute container is itself a containing block for the canvas inside */}
          <div className="absolute bottom-0 left-0 w-full h-full">
            <CrowdCanvasClient />
          </div>
          {/* Solid navy at top (text area), dissolve into crowd at bottom */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, #0f1f3d 0%, #0f1f3d 38%, rgba(15,31,61,0.5) 58%, rgba(15,31,61,0.05) 80%, transparent 100%)",
            }}
          />
        </>
      )}

      {/* Background accents (plain hero, no video or crowd) */}
      {!videoSrc && !crowdCanvas && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }}
          />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto text-center">
        {eyebrow && (
          <p
            className={`text-[11px] font-semibold tracking-[0.25em] uppercase mb-5 ${
              dark ? "text-gold" : "text-gold-dark"
            }`}
            style={crowdCanvas ? { textShadow: "0 1px 12px rgba(15,31,61,0.9)" } : undefined}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-balance"
          style={crowdCanvas ? { textShadow: "0 2px 24px rgba(15,31,61,1), 0 0 60px rgba(15,31,61,0.9)" } : undefined}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${
              dark ? "text-white/60" : "text-navy/60"
            }`}
            style={crowdCanvas ? { textShadow: "0 1px 16px rgba(15,31,61,1), 0 0 40px rgba(15,31,61,1)" } : undefined}
          >
            {subtitle}
          </p>
        )}
        {/* Gold accent line */}
        <div className="mt-10 flex justify-center">
          <span className="block w-12 h-[2px] bg-gold" />
        </div>
      </div>
    </section>
  );
}
