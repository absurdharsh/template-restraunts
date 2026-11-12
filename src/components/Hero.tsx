import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, Calendar, Sparkles } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant.config';
import { AtmosphereCanvas } from './AtmosphereCanvas';
import { scrollToTarget } from '../utils/smoothScroll';

interface HeroProps {
  onOpenReservation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReservation }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { brand, media, locationHours } = restaurantConfig;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.7 } });

      tl.fromTo(
        '.hero-badge',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 }
      )
        .fromTo(
          '.hero-title-line',
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7 },
          '-=0.3'
        )
        .fromTo(
          '.hero-subhead',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          '.hero-cta',
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.5 },
          '-=0.4'
        )
        .fromTo(
          '.hero-image-frame',
          { y: 20, opacity: 0, scale: 0.98 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          '.hero-footer-item',
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.4 },
          '-=0.4'
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-16 overflow-hidden bg-brand-dark"
    >
      {/* Three.js Atmospheric Background */}
      <AtmosphereCanvas intensity={1.1} />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Typography & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6 lg:space-y-8">
          {/* Subtle Tagline / Eyebrow */}
          <div className="hero-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-accent/30 bg-brand-surface/60 backdrop-blur-sm text-brand-cream text-[11px] uppercase tracking-[0.22em]">
            <Sparkles className="w-3 h-3 text-brand-accent" />
            <span>
              Est. {brand.established} &bull; {brand.city}
            </span>
          </div>

          {/* Bold Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-brand-light">
            <span className="hero-title-line block">Living embers,</span>
            <span className="hero-title-line block italic font-normal text-brand-cream">
              heirloom grains,
            </span>
            <span className="hero-title-line block">&amp; natural wines.</span>
          </h1>

          {/* Grounded Culinary Description */}
          <p className="hero-subhead max-w-xl text-base md:text-lg text-brand-muted font-light leading-relaxed">
            {brand.philosophy.headline} {brand.descriptor}. An elemental dining sanctuary
            in {locationHours.address.neighborhood}, {brand.city}.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium bg-brand-accent hover:bg-brand-accent-hover text-brand-light transition-all duration-300 shadow-xl shadow-brand-accent/20 hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>

            <button
              onClick={() => scrollToTarget('#menu', -80)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs uppercase tracking-[0.18em] font-medium border border-brand-border-light text-brand-cream hover:bg-brand-surface hover:border-brand-muted/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cream"
            >
              <span>Explore Seasonal Menu</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Editorial Visual Showcase */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <div className="hero-image-frame relative w-full max-w-md lg:max-w-none">
            {/* Primary Aspect Ratio Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-brand-border shadow-2xl shadow-black/80 bg-brand-surface">
              <img
                src={media.hero.primary}
                alt={media.hero.alt}
                className="w-full h-full object-cover filter contrast-[1.05] brightness-95 scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-black/20" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-cream/80 block">
                    Tonight at the Hearth
                  </span>
                  <p className="font-serif text-lg text-brand-light font-normal mt-0.5">
                    California White Oak &bull; 650°F
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 backdrop-blur-md bg-white/5 flex items-center justify-center text-brand-cream text-xs font-serif">
                  01
                </div>
              </div>
            </div>

            {/* Subtle floating detail card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-8 bg-brand-surface/90 backdrop-blur-md p-4 rounded-xl border border-brand-border/80 shadow-2xl items-center gap-4 max-w-xs">
              <img
                src={media.hero.detail}
                alt="Decanting natural wine"
                className="w-14 h-14 rounded-lg object-cover border border-brand-border"
              />
              <div>
                <p className="text-xs font-medium text-brand-light">Natural Cellar</p>
                <p className="text-[11px] text-brand-muted mt-0.5 leading-snug">
                  Over 340 biodynamic vintages by the glass &amp; bottle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Service Strip */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-brand-border/50 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
        <div className="hero-footer-item">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted block">
            Dinner Service
          </span>
          <span className="text-brand-cream font-medium mt-1 block">Tue — Sat &bull; 5:30 PM — Late</span>
        </div>

        <div className="hero-footer-item">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted block">
            Location
          </span>
          <span className="text-brand-cream font-medium mt-1 block">
            {locationHours.address.street}, {locationHours.address.neighborhood}
          </span>
        </div>

        <div className="hero-footer-item">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted block">
            Direct Inquiries
          </span>
          <a
            href={`tel:${locationHours.phoneRaw}`}
            className="text-brand-cream hover:text-brand-accent transition-colors font-medium mt-1 block"
          >
            {locationHours.phone}
          </a>
        </div>

        <div className="hero-footer-item">
          <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted block">
            Reservations
          </span>
          <button
            onClick={onOpenReservation}
            className="text-brand-accent hover:underline font-medium mt-1 block text-left"
          >
            Tables Released Monthly &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
