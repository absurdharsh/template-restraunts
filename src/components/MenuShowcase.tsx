import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Wine, Info } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant.config';
import { MenuItem } from '../types/restaurant';

export const MenuShowcase: React.FC = () => {
  const { menu } = restaurantConfig;
  const [activeCategoryId, setActiveCategoryId] = useState<string>(menu[0]?.id || 'starters');
  const [hoveredDish, setHoveredDish] = useState<MenuItem | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeCategory = menu.find((c) => c.id === activeCategoryId) || menu[0];

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      id="menu"
      onMouseMove={handleMouseMove}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-brand-dark overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="text-xs uppercase tracking-[0.22em] text-brand-accent font-medium">
            Daily Hearth Menu
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-brand-light">
            Crafted with fire, patience, and sea salt.
          </h2>
          <p className="max-w-lg mx-auto text-sm text-brand-muted font-light leading-relaxed">
            Our menu shifts with seasonal harvests and Pacific line-catches. Ingredients are sourced
            from bio-intensive California growers within 90 miles.
          </p>
        </div>

        {/* Animated Category Tabs */}
        <div className="relative flex justify-center mb-12 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-full bg-brand-surface border border-brand-border/80">
            {menu.map((category) => {
              const isActive = category.id === activeCategoryId;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`relative px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent ${
                    isActive ? 'text-brand-light' : 'text-brand-muted hover:text-brand-light'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 rounded-full bg-brand-elevated border border-brand-accent/40 shadow-sm"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category.title.split('&')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Subtitle */}
        <div className="text-center mb-10">
          <h3 className="font-serif text-xl sm:text-2xl text-brand-light font-normal">
            {activeCategory.title}
          </h3>
          <p className="text-xs text-brand-muted mt-1 italic font-light font-serif">
            {activeCategory.subtitle}
          </p>
        </div>

        {/* Typographic Dish Rows with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategoryId}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="divide-y divide-brand-border/60 border-t border-b border-brand-border/60"
          >
            {activeCategory.items.map((dish) => (
              <div
                key={dish.id}
                onMouseEnter={() => setHoveredDish(dish)}
                onMouseLeave={() => setHoveredDish(null)}
                className="group py-6 sm:py-7 transition-colors duration-300 hover:bg-brand-surface/40 px-3 -mx-3 rounded-lg flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 cursor-default"
              >
                {/* Dish Info */}
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-serif text-lg sm:text-xl text-brand-light font-normal group-hover:text-brand-cream transition-colors">
                      {dish.name}
                    </span>

                    {dish.featured && (
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>Hearth Signature</span>
                      </span>
                    )}

                    {dish.dietary && dish.dietary.length > 0 && (
                      <div className="flex items-center gap-1">
                        {dish.dietary.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] uppercase tracking-wider text-brand-muted bg-brand-elevated px-1.5 py-0.5 rounded border border-brand-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-brand-muted font-light leading-relaxed">
                    {dish.description}
                  </p>

                  {dish.pairings && (
                    <div className="flex items-center gap-1.5 text-[11px] text-brand-muted/80 pt-0.5">
                      <Wine className="w-3 h-3 text-brand-accent/80 flex-shrink-0" />
                      <span className="italic font-serif">Pairing: {dish.pairings}</span>
                    </div>
                  )}
                </div>

                {/* Price & Mobile Thumbnail */}
                <div className="flex items-center justify-between md:justify-end gap-4 pt-1 md:pt-0">
                  {/* Mobile image preview thumbnail */}
                  <div className="md:hidden w-14 h-14 rounded-lg overflow-hidden border border-brand-border flex-shrink-0">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <span className="font-serif text-lg sm:text-xl text-brand-cream font-medium tracking-tight">
                    {dish.price}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Dietary Legend & Hearth Notes */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted border-t border-brand-border/40">
          <div className="flex items-center gap-4 flex-wrap text-[11px]">
            <span className="flex items-center gap-1">
              <Info className="w-3 h-3 text-brand-muted" />
              <span>Dietary:</span>
            </span>
            <span>GF = Gluten-Free</span>
            <span>VG = Vegetarian</span>
            <span>V = Vegan</span>
            <span>DF = Dairy-Free</span>
          </div>

          <div className="text-[11px] text-brand-muted/90 italic">
            Gratuity of 20% included on parties of 6 or more.
          </div>
        </div>
      </div>

      {/* Floating Dish Preview on Desktop Hover */}
      <AnimatePresence>
        {hoveredDish && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: mousePos.x + 24,
              top: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="hidden md:block fixed pointer-events-none z-50 w-64 rounded-xl overflow-hidden border border-brand-border-light shadow-2xl bg-brand-surface"
            style={{ left: 0 }}
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-brand-dark">
              <img
                src={hoveredDish.image}
                alt={hoveredDish.name}
                className="w-full h-full object-cover filter contrast-[1.05]"
              />
            </div>
            <div className="p-3 bg-brand-surface/95 backdrop-blur-sm">
              <p className="font-serif text-sm text-brand-light font-normal truncate">
                {hoveredDish.name}
              </p>
              <p className="text-[11px] text-brand-muted font-mono mt-0.5">{hoveredDish.price}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
