"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const GRID_PHOTOS = [
  { src: "/aboutus10.jpeg", alt: "About us" },
  { src: "/aboutus11.jpeg", alt: "About us" },
  { src: "/aboutus12.jpeg", alt: "About us" },
  { src: "/aboutus13.jpeg", alt: "About us" },
  { src: "/aboutus14.jpeg", alt: "About us" },
  { src: "/aboutus15.jpeg", alt: "About us" },
];

export default function AboutEditorial2() {
  return (
    <section style={{ background: "#F8F5F0" }} className="py-16 lg:py-24 overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 lg:gap-20 items-start">

          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease }}
              className="flex gap-3 mb-8"
            >
              {[
                { src: "/aboutus16.jpeg", alt: "About us", rotate: "-rotate-2" },
                { src: "/aboutus17.jpeg", alt: "About us", rotate: "rotate-1" },
              ].map(({ src, alt, rotate }, i) => (
                <motion.div
                  key={src}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease }}
                  className={`relative overflow-hidden ${rotate} h-[130px] lg:h-[180px] w-[130px] lg:w-[180px]`}
                  style={{ borderRadius: 14, boxShadow: "0 4px 20px rgba(18,27,47,0.12)" }}
                >
                  <Image src={src} alt={alt} fill className="object-cover" sizes="180px" />
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease }}
              style={{ color: "#A07840" }}
              className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-5"
            >
              Friends of St. Carlo Acutis Foundation
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.06, ease }}
              className="font-sans font-bold tracking-tight mb-5"
              style={{ fontSize: "clamp(28px, 3vw, 48px)", lineHeight: 0.97, color: "#121B2F" }}
            >
              Inspiring a new<br />generation of<br />digital disciples.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
              className="leading-relaxed mb-3"
              style={{ fontSize: 15, color: "#6B7280" }}
            >
              We want to make faith as accessible as possible so that young people
              around the world can encounter Christ through the digital tools they
              already use every day.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.24, ease }}
              className="leading-relaxed mb-8"
              style={{ fontSize: 15, color: "#6B7280" }}
            >
              No matter the background, every young Catholic should be equipped
              to carry the Gospel forward with creativity, courage, and conviction
              — following the example of St. Carlo Acutis.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.34, ease }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-white font-semibold transition-opacity duration-200 hover:opacity-85"
                style={{ background: "#121B2F", fontSize: 14, padding: "13px 26px", borderRadius: 12 }}
              >
                Get Involved →
              </Link>
            </motion.div>
          </div>

          {/* Right: photo grid */}
          <div
            className="grid gap-[10px]"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gridTemplateRows: "repeat(3, 220px)" }}
          >
            {GRID_PHOTOS.map(({ src, alt }, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.78, delay: i * 0.07, ease }}
                className="relative overflow-hidden"
                style={{ borderRadius: 14, boxShadow: "0 2px 12px rgba(18,27,47,0.07), 0 8px 32px rgba(18,27,47,0.08)" }}
              >
                <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 30vw" />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
