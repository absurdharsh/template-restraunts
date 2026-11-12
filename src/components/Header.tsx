import React, { useState, useEffect } from 'react';
import { Utensils, X, Menu, Calendar } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant.config';
import { scrollToTarget } from '../utils/smoothScroll';

interface HeaderProps {
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { brand, navigation } = restaurantConfig;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollToTarget(href, -80);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-brand-dark/85 backdrop-blur-md border-b border-brand-border/60 py-4 shadow-2xl shadow-black/40'
            : 'bg-gradient-to-b from-brand-dark/90 via-brand-dark/40 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          {/* Brand Mark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
          >
            <div className="w-8 h-8 rounded-full border border-brand-accent/50 flex items-center justify-center text-brand-accent group-hover:border-brand-accent group-hover:bg-brand-accent/10 transition-colors">
              <Utensils className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl tracking-wide font-normal text-brand-light">
                {brand.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-brand-muted -mt-0.5">
                {brand.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xs uppercase tracking-[0.18em] text-brand-light/75 hover:text-brand-accent transition-colors duration-200 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Trigger */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenReservation}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.16em] font-medium bg-brand-accent hover:bg-brand-accent-hover text-brand-light transition-all duration-300 hover:shadow-lg hover:shadow-brand-accent/25 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve a Table</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={onOpenReservation}
              className="px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider bg-brand-accent text-brand-light"
            >
              Reserve
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-brand-light/80 hover:text-brand-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden bg-brand-dark/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28">
          <nav className="flex flex-col gap-6">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-serif text-2xl text-brand-light hover:text-brand-accent transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pt-8 border-t border-brand-border/60 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3.5 rounded-full text-center text-xs uppercase tracking-widest bg-brand-accent text-brand-light font-medium"
            >
              Reserve a Table
            </button>
            <div className="text-center text-xs text-brand-muted">
              {restaurantConfig.locationHours.phone} &bull; {restaurantConfig.brand.city}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
