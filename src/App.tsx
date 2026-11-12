import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { MenuShowcase } from './components/MenuShowcase';
import { AtmosphereGallery } from './components/AtmosphereGallery';
import { LocationHours } from './components/LocationHours';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { initSmoothScroll, scrollToTarget } from './utils/smoothScroll';

export const App: React.FC = () => {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [activeView, setActiveView] = useState<string | null>(null);

  useEffect(() => {
    // Initialize Lenis + GSAP ScrollTrigger synchronization
    const scrollSetup = initSmoothScroll();

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get('view');
      if (viewParam) {
        setActiveView(viewParam);
      }

      const sectionParam = params.get('section');
      if (sectionParam) {
        setTimeout(() => {
          scrollToTarget(`#${sectionParam}`, -80, true);
        }, 100);
      }

      if (params.get('reserve') === 'open') {
        setReservationOpen(true);
      }
    }

    return () => {
      if (scrollSetup) {
        scrollSetup.cleanup();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light flex flex-col selection:bg-brand-accent selection:text-white">
      {/* Sticky Header */}
      <Header onOpenReservation={() => setReservationOpen(true)} />

      {/* Main Flow or Section Inspection Mode */}
      <main className="flex-1">
        {activeView === 'story' ? (
          <div className="pt-24">
            <Story />
          </div>
        ) : activeView === 'menu' ? (
          <div className="pt-24">
            <MenuShowcase />
          </div>
        ) : activeView === 'atmosphere' ? (
          <div className="pt-24">
            <AtmosphereGallery />
          </div>
        ) : activeView === 'location' ? (
          <div className="pt-24">
            <LocationHours onOpenReservation={() => setReservationOpen(true)} />
          </div>
        ) : (
          <>
            <Hero onOpenReservation={() => setReservationOpen(true)} />
            <Story />
            <MenuShowcase />
            <AtmosphereGallery />
            <LocationHours onOpenReservation={() => setReservationOpen(true)} />
          </>
        )}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Reservation Drawer / Modal */}
      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
      />
    </div>
  );
};

export default App;
