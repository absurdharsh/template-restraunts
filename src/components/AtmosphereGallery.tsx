import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant.config';
import { AtmosphereImage } from '../types/restaurant';

gsap.registerPlugin(ScrollTrigger);

export const AtmosphereGallery: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<AtmosphereImage | null>(null);

  const { media } = restaurantConfig;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // On large desktop screens, reveal cards with scrollTrigger
      mm.add('(min-width: 1024px)', () => {
        if (!scrollContainerRef.current || !sectionRef.current) return;

        const cards = gsap.utils.toArray<HTMLElement>('.gallery-card');
        gsap.fromTo(
          cards,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
            },
          }
        );
      });

      // On mobile/tablet screens, gentle vertical scroll reveal
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          '.gallery-card',
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 90%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="atmosphere"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-brand-surface border-t border-b border-brand-border/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs uppercase tracking-[0.22em] text-brand-accent font-medium">
              Sanctuary of Flame &amp; Craft
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-brand-light">
              Atmosphere &amp; Living Cellar
            </h2>
          </div>
          <p className="max-w-md text-sm text-brand-muted font-light leading-relaxed">
            Every surface is chosen to age with dignity—hand-thrown ceramics, reclaimed California
            walnut, unlacquered brass, and the lingering fragrance of almond wood smoke.
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {media.atmosphere.map((item, index) => {
            const isTall = index === 0 || index === 3;
            return (
              <div
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className={`gallery-card group relative rounded-2xl overflow-hidden border border-brand-border bg-brand-dark cursor-pointer shadow-xl ${
                  isTall ? 'sm:row-span-2 aspect-[3/4] sm:aspect-auto sm:h-full' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-[1.04] brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/85 via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Card Tag */}
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-brand-light/90 bg-brand-surface/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                    {item.tag}
                  </span>
                </div>

                {/* Zoom indicator icon */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-brand-dark/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-brand-light/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>

                {/* Caption Details */}
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <h3 className="font-serif text-lg text-brand-light font-normal group-hover:text-brand-cream transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted line-clamp-2 font-light">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cellar Experience Prompt */}
        <div className="mt-14 p-8 rounded-2xl border border-brand-border bg-brand-elevated/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand-gold block font-mono">
              The Cellar Experience
            </span>
            <p className="font-serif text-xl text-brand-light font-normal">
              Private tastings &amp; cellar tours with Head Sommelier
            </p>
            <p className="text-xs text-brand-muted font-light">
              Curated vertical flights featuring rare biodynamic producers from Jura, Etna, and
              Sonoma.
            </p>
          </div>

          <a
            href={`mailto:${restaurantConfig.locationHours.privateDiningEmail}`}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-brand-cream hover:text-brand-accent transition-colors font-medium group"
          >
            <span>Inquire About Cellar Tastings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Lightbox / Modal when clicking photo */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden border border-brand-border bg-brand-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo preview"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-dark/80 backdrop-blur-md border border-white/20 text-brand-light flex items-center justify-center hover:bg-brand-accent transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[16/10] w-full bg-brand-dark overflow-hidden">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 bg-brand-surface flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-accent font-medium">
                  {activePhoto.tag}
                </span>
                <h3 className="font-serif text-xl text-brand-light font-normal mt-0.5">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-brand-muted mt-1 font-light">{activePhoto.caption}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
