import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Compass, Wine, Award } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant.config';

gsap.registerPlugin(ScrollTrigger);

export const Story: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const parallaxImgRef = useRef<HTMLImageElement>(null);
  const { brand, media } = restaurantConfig;
  const { philosophy } = brand;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // Parallax scroll effect on the primary image
      if (parallaxImgRef.current && containerRef.current) {
        gsap.to(parallaxImgRef.current, {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Fade-in stagger for philosophy pillars
      gsap.fromTo(
        '.philosophy-pillar',
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.philosophy-pillars-grid',
            start: 'top 95%',
          },
        }
      );

      // Press quotes stagger
      gsap.fromTo(
        '.press-card',
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          scrollTrigger: {
            trigger: '.press-section',
            start: 'top 95%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const pillarIcons = [Flame, Compass, Wine];

  return (
    <section
      id="story"
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-brand-surface border-t border-b border-brand-border/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Asymmetric Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.22em] text-brand-accent font-medium">
                {philosophy.eyebrow}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-brand-light">
                {philosophy.headline}
              </h2>
            </div>

            {/* Chef Quote Card */}
            <div className="relative pl-6 border-l-2 border-brand-accent/60 my-6 py-1">
              <p className="font-serif italic text-lg sm:text-xl text-brand-cream/95 leading-relaxed">
                &ldquo;{philosophy.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-brand-border">
                  <img
                    src={media.story.chef}
                    alt={philosophy.chefName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-medium uppercase tracking-wider text-brand-light">
                    {philosophy.chefName}
                  </h4>
                  <p className="text-[11px] text-brand-muted">{philosophy.chefTitle}</p>
                </div>
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-brand-muted text-sm sm:text-base leading-relaxed font-light">
              {philosophy.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Core Craft Pillars */}
            <div className="philosophy-pillars-grid pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-brand-border/60">
              {philosophy.pillars.map((pillar, idx) => {
                const IconComponent = pillarIcons[idx % pillarIcons.length];
                return (
                  <div key={idx} className="philosophy-pillar space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-brand-elevated border border-brand-border flex items-center justify-center text-brand-accent">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-base text-brand-light font-normal">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-brand-muted leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Diptych with Parallax Frame */}
          <div className="lg:col-span-5 relative space-y-6">
            <div className="relative rounded-2xl overflow-hidden border border-brand-border shadow-2xl bg-brand-dark aspect-[3/4]">
              <img
                ref={parallaxImgRef}
                src={media.story.hearth}
                alt="Open masonry hearth at Aurelia"
                className="absolute inset-0 w-full h-full object-cover filter contrast-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-brand-dark/80 backdrop-blur-md border border-brand-border/80">
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-accent block">
                  The Hearth
                </span>
                <p className="text-xs text-brand-cream mt-0.5 font-light">
                  Direct flame, white oak coals, and unhurried artisanal baking.
                </p>
              </div>
            </div>

            {/* Smaller secondary detail image */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden border border-brand-border aspect-[4/3] relative">
                <img
                  src={media.story.cellar}
                  alt="Low intervention cellar barrels"
                  className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-4 rounded-xl border border-brand-border bg-brand-elevated flex flex-col justify-between">
                <Award className="w-5 h-5 text-brand-gold" />
                <div>
                  <span className="font-serif text-2xl text-brand-light block">340+</span>
                  <span className="text-[11px] text-brand-muted leading-tight block">
                    Curated natural and biodynamic labels
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Press Accolades Strip */}
        <div className="press-section mt-20 pt-12 border-t border-brand-border/60">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.22em] text-brand-muted">
              Critical Acclaim
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {media.press.map((item, idx) => (
              <div
                key={idx}
                className="press-card p-6 rounded-2xl bg-brand-elevated/60 border border-brand-border/80 flex flex-col justify-between space-y-4"
              >
                <p className="font-serif italic text-sm text-brand-light/90 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between text-xs">
                  <span className="font-medium tracking-wide text-brand-cream">
                    {item.critic}
                  </span>
                  <span className="text-[11px] text-brand-muted font-mono">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
