import React from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Compass } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant.config';

interface LocationHoursProps {
  onOpenReservation: () => void;
}

export const LocationHours: React.FC<LocationHoursProps> = ({ onOpenReservation }) => {
  const { locationHours } = restaurantConfig;

  return (
    <section
      id="location"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-brand-dark overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Hours Schedule */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.22em] text-brand-accent font-medium">
                Sanctuary &amp; Hours
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-brand-light">
                Gather around our hearth.
              </h2>
              <p className="text-sm text-brand-muted font-light leading-relaxed">
                Located in {locationHours.address.neighborhood}, {locationHours.address.cityStateZip}.
                Nestled within bespoke architecture designed for intimate gatherings.
              </p>
            </div>

            {/* Structured Hours Schedule */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand-cream font-medium pb-2 border-b border-brand-border">
                <Clock className="w-3.5 h-3.5 text-brand-accent" />
                <span>Service Schedule</span>
              </div>

              <div className="divide-y divide-brand-border/60">
                {locationHours.schedule.map((item, idx) => (
                  <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div>
                      <h4 className="font-serif text-base text-brand-light font-normal">
                        {item.service}
                      </h4>
                      <p className="text-xs text-brand-muted mt-0.5 font-light">{item.days}</p>
                      {item.note && (
                        <p className="text-[11px] text-brand-gold italic mt-0.5">{item.note}</p>
                      )}
                    </div>
                    <span className="text-xs font-mono text-brand-cream/90 pt-1 sm:pt-0">
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest bg-brand-accent hover:bg-brand-accent-hover text-brand-light font-medium transition-colors shadow-lg shadow-brand-accent/20"
              >
                <span>Book Table Online</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Physical Location, Contact & Map Preview */}
          <div className="lg:col-span-6 space-y-6">
            {/* Address Card */}
            <div className="p-8 rounded-2xl bg-brand-surface border border-brand-border space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-brand-cream font-medium">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  <span>Physical Address</span>
                </div>
                <a
                  href={locationHours.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-accent hover:underline font-medium"
                >
                  <span>Open in Maps</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <p className="font-serif text-2xl text-brand-light font-normal">
                  {locationHours.address.street}
                </p>
                <p className="text-sm text-brand-muted mt-1 font-light">
                  {locationHours.address.neighborhood} &bull; {locationHours.address.cityStateZip}
                </p>
                <p className="text-xs text-brand-muted/80 mt-0.5">{locationHours.address.country}</p>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-brand-border">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-brand-accent" />
                    <span>Direct Line</span>
                  </span>
                  <a
                    href={`tel:${locationHours.phoneRaw}`}
                    className="text-xs text-brand-light hover:text-brand-accent transition-colors font-mono block"
                  >
                    {locationHours.phone}
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-brand-accent" />
                    <span>General Enquiries</span>
                  </span>
                  <a
                    href={`mailto:${locationHours.email}`}
                    className="text-xs text-brand-light hover:text-brand-accent transition-colors block"
                  >
                    {locationHours.email}
                  </a>
                </div>
              </div>

              {/* Private Dining Dispatch Box */}
              <div className="p-4 rounded-xl bg-brand-elevated border border-brand-border text-xs space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-brand-gold font-medium block">
                  Private Gatherings &amp; Buyouts
                </span>
                <p className="text-brand-muted font-light leading-relaxed">
                  Our private dining cellar hosts up to 24 guests with custom wine pairings.
                  Inquiries at{' '}
                  <a
                    href={`mailto:${locationHours.privateDiningEmail}`}
                    className="text-brand-cream hover:underline"
                  >
                    {locationHours.privateDiningEmail}
                  </a>
                </p>
              </div>
            </div>

            {/* Architectural note badge */}
            <div className="p-5 rounded-2xl bg-brand-surface/60 border border-brand-border/70 flex items-center gap-4 text-xs">
              <div className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center text-brand-muted flex-shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <p className="text-brand-muted font-light leading-snug">
                Valet parking available on-site at {locationHours.address.neighborhood}. Dhanbad Junction Railway Station is a convenient 8-minute drive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
