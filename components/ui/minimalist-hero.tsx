"use client";

import { useState, useEffect, ComponentType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type IconComponent = ComponentType<{ className?: string }>;

interface MinimalistHeroProps {
  logoText: string;
  navLinks: { label: string; href: string }[];
  mainText: string;
  readMoreLink: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: { part1: string; part2: string | string[] };
  socialLinks: { icon: IconComponent; href: string }[];
  locationText: string;
  className?: string;
  circleSrc?: string;
  imageTop?: string;
  circleSize?: string;
  circleTop?: string;
  headlineSplit?: boolean;
  centerLabel?: string;
  footerText?: string;
}

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: IconComponent }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  mainText,
  readMoreLink,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
  circleSrc,
  imageTop = '0',
  circleSize = 'h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]',
  circleTop = '18%',
  headlineSplit = false,
  centerLabel,
  footerText,
}: MinimalistHeroProps) => {
  const words = Array.isArray(overlayText.part2) ? overlayText.part2 : [overlayText.part2];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = setInterval(() => setWordIndex(i => (i + 1) % words.length), 2500);
    return () => clearInterval(id);
  }, [words.length]);

  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between bg-background p-8 font-sans md:p-12',
        className
      )}
    >
      {/* Full-height portrait + circle — overflow-hidden here clips only the image */}
      <div className="absolute inset-0 flex justify-center pointer-events-none overflow-hidden">
        {circleSrc ? (
          <motion.img
            src={circleSrc}
            alt=""
            aria-hidden="true"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className={`absolute ${circleSize}`}
            style={{ top: circleTop, objectFit: 'contain' }}
          />
        ) : (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className={`absolute rounded-full ${circleSize}`}
            style={{ background: '#D4B06A', top: circleTop }}
          />
        )}
        <motion.img
          src={imageSrc}
          alt={imageAlt}
          className="absolute z-10"
          style={{ top: imageTop, height: '100%', width: 'auto', maxWidth: 'none' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
      </div>

      {/* Center label — over the image */}
      {centerLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute z-20 w-full left-0 px-6 pointer-events-none text-center"
          style={{ top: '12%' }}
        >
          <p className="font-extrabold text-gold leading-tight"
             style={{ fontSize: 'clamp(4rem, 10vw, 12rem)' }}>
            {centerLabel}
          </p>
          {headlineSplit && (
            <div className="md:hidden mt-2 flex flex-col items-center">
              <p className="font-extrabold text-navy leading-tight"
                 style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}>
                {overlayText.part1}
              </p>
              <p className="font-extrabold text-navy leading-tight"
                 style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)' }}>
                {words[wordIndex]}
              </p>
              {footerText && (
                <motion.div
                  className="flex items-center gap-2 mt-4"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <p className="text-xs font-medium text-foreground/60 tracking-widest uppercase">{footerText}</p>
                  <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-foreground/60 text-sm leading-none"
                  >
                    ↓
                  </motion.span>
                </motion.div>
              )}
            </div>
          )}
        </motion.div>
      )}

      {/* Text grid — on top of portrait */}
      <div className="relative z-20 grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">

        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className={`order-2 md:order-1 text-center md:text-left hidden md:block ${headlineSplit ? 'self-center' : ''}`}
        >
          {headlineSplit ? (
            <h1 className="font-extrabold text-navy leading-tight" style={{ fontSize: 'clamp(2.5rem, 5.5vw, 7rem)' }}>
              {overlayText.part1}
            </h1>
          ) : (
            <>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
              <a href={readMoreLink} className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-from-font">
                Read More
              </a>
            </>
          )}
        </motion.div>

        {/* Center column — empty, portrait is behind */}
        <div className="order-1 md:order-2" />

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className={`order-3 text-center md:text-left ${headlineSplit ? 'hidden md:block self-center pl-20' : 'self-start pt-44'}`}
        >
          <h1
            className={`font-extrabold leading-tight ${headlineSplit ? 'text-navy' : 'text-gold md:text-navy text-6xl md:text-7xl lg:text-8xl xl:text-9xl'}`}
            style={headlineSplit ? { fontSize: 'clamp(2.5rem, 5.5vw, 7rem)' } : undefined}
          >
            {!headlineSplit && <span className="block">{overlayText.part1}</span>}
            <span
              className="block"
              style={{ height: '1.4em', clipPath: 'inset(0 -50vw)' }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: '-100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '100%', opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>
        </motion.div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className={`items-center space-x-4 -translate-x-16 ${footerText ? 'hidden md:flex' : 'flex'}`}
        >
          {footerText ? (
            <motion.div
              className="flex items-center gap-2 cursor-default select-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                className="text-foreground/70 text-base leading-none"
              >
                ↓
              </motion.span>
              <p className="text-sm font-medium text-foreground/70 tracking-widest uppercase">{footerText}</p>
            </motion.div>
          ) : (
            socialLinks.map((link, index) => (
              <SocialIcon key={index} href={link.href} icon={link.icon} />
            ))
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="hidden md:block translate-x-16"
        >
          {footerText ? (
            <motion.div
              className="flex items-center gap-2 cursor-default select-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-sm font-medium text-foreground/70 tracking-widest uppercase">{footerText}</p>
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                className="text-foreground/70 text-base leading-none"
              >
                ↓
              </motion.span>
            </motion.div>
          ) : (
            <p className="text-sm font-medium text-foreground/80">{locationText}</p>
          )}
        </motion.div>
      </footer>
    </div>
  );
};
