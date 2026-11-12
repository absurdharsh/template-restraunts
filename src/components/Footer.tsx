import React, { useState } from 'react';
import { ArrowUp, Utensils, Check } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant.config';
import { scrollToTarget } from '../utils/smoothScroll';

export const Footer: React.FC = () => {
  const { brand, navigation } = restaurantConfig;
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      setIsSubscribed(true);
      setEmailInput('');
    }
  };

  const handleScrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollToTarget(0);
  };

  return (
    <footer className="relative bg-brand-surface pt-20 pb-12 px-6 md:px-12 lg:px-16 border-t border-brand-border text-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start justify-between">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-brand-accent/50 flex items-center justify-center text-brand-accent">
                <Utensils className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl tracking-wide font-normal">
                {brand.name}
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
              {brand.tagline} &bull; {brand.city}
            </p>
            <p className="text-xs text-brand-muted font-light max-w-sm leading-relaxed pt-2">
              {brand.descriptor}. An elemental restaurant celebration of wood coals, regenerative
              producers, and living natural wines.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-brand-accent font-medium block">
              Navigation
            </span>
            <ul className="space-y-2.5">
              {navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToTarget(link.href, -80);
                    }}
                    className="text-xs text-brand-cream/80 hover:text-brand-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#location"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget('#location', -80);
                  }}
                  className="text-xs text-brand-cream/80 hover:text-brand-accent transition-colors"
                >
                  Location &amp; Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Seasonal Dispatches Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-brand-accent font-medium block">
              Seasonal Dispatches
            </span>
            <p className="text-xs text-brand-muted font-light leading-relaxed">
              Receive monthly menu releases, winemaker dinner invitations, and harvest notes.
            </p>

            {isSubscribed ? (
              <div className="p-3 rounded-xl bg-brand-elevated border border-brand-accent/40 flex items-center gap-2 text-xs text-brand-cream">
                <Check className="w-4 h-4 text-brand-accent" />
                <span>You are subscribed to our seasonal dispatches.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-full bg-brand-elevated border border-brand-border text-xs text-brand-light placeholder:text-brand-muted/50 focus:border-brand-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-brand-accent hover:bg-brand-accent-hover text-brand-light text-xs uppercase tracking-wider font-medium transition-colors"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider & Re-theme documentation hint */}
        <div className="pt-8 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} {brand.name} {brand.tagline}. All rights reserved.
            </span>
            <span className="hidden sm:inline text-brand-border">&bull;</span>
            <span className="text-[11px] text-brand-muted/80">
              Config-driven template: modify <code className="text-brand-cream font-mono">src/data/restaurant.config.ts</code>
            </span>
          </div>

          {/* Smooth Scroll to Top Button */}
          <button
            onClick={handleScrollTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-2 text-xs uppercase tracking-widest text-brand-cream hover:text-brand-accent transition-colors focus-visible:outline-none"
          >
            <span>Back to top</span>
            <div className="w-7 h-7 rounded-full border border-brand-border flex items-center justify-center group-hover:border-brand-accent transition-colors">
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
