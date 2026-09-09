"use client";

import { useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiFacebook } from "react-icons/fi";
import AnimateIn from "@/components/AnimateIn";

export type NewsCard = {
  date: string;
  tag: string;
  title: string;
  excerpt: string;
  href: string;
  external: boolean;
  image: string;
};

const INITIAL_VISIBLE = 6;

export default function NewsGrid({ items }: { items: NewsCard[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((item, i) => (
          <AnimateIn key={`${item.href}-${i}`} delay={(i % INITIAL_VISIBLE) * 0.1}>
            <article className="group bg-white border-t-[5px] border-navy shadow-[0_4px_20px_-10px_rgba(15,30,60,0.08)] hover:shadow-[0_8px_30px_-10px_rgba(15,30,60,0.15)] transition-all duration-300 flex flex-col h-full">
              <div className="relative w-full h-56 overflow-hidden bg-cream-dark">
                <div className="absolute inset-0 bg-navy/10 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-6">
                  {item.tag === "Facebook" ? (
                    <FiFacebook className="w-4 h-4 text-navy/60" aria-label="Facebook" />
                  ) : (
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gold-dark bg-gold/10 border border-gold/20 px-3 py-1 rounded">
                      {item.tag}
                    </span>
                  )}
                  <span className="text-navy/35 text-xs">{item.date}</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-navy mb-4 group-hover:text-gold-dark transition-colors leading-[1.3] line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-navy/50 text-sm leading-relaxed mb-8 line-clamp-3 flex-1">{item.excerpt}</p>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group/arrow inline-flex items-center gap-2 text-gold text-sm font-semibold tracking-wide hover:text-gold-dark transition-colors w-fit"
                >
                  Read more
                  <FiArrowRight className="transition-transform duration-300 group-hover/arrow:translate-x-1" />
                </a>
              </div>
            </article>
          </AnimateIn>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
            className="px-8 py-3 rounded border border-navy text-navy font-semibold text-xs tracking-widest uppercase hover:bg-navy hover:text-white transition-colors duration-300"
          >
            Load More Posts
          </button>
        </div>
      )}
    </>
  );
}
