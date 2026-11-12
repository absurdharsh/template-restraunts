import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Users, CheckCircle, MessageSquare, ArrowRight } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant.config';
import { getActiveLenis } from '../utils/smoothScroll';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const { brand, locationHours } = restaurantConfig;

  // Form State
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('19:00');
  const [guests, setGuests] = useState<number>(2);
  const [seating, setSeating] = useState<string>('Hearth Counter');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  // Lock Lenis scroll while open
  useEffect(() => {
    const lenis = getActiveLenis();
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
      setSubmitted(false);
      setErrors({});
    }

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Set default date to today or tomorrow
  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Keyboard escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = 'Please provide your name';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid email is required';
    if (!phone.trim()) newErrors.phone = 'Contact number is required';
    if (!date) newErrors.date = 'Please select a date';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStandardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate instant reservation confirmation
    const randomRef = 'AUR-' + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(randomRef);
    setSubmitted(true);
  };

  const handleWhatsAppSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const message = encodeURIComponent(
      `Hello ${brand.name},\nI would like to request a reservation:\n- Name: ${name}\n- Date: ${date}\n- Time: ${time}\n- Party Size: ${guests} guests\n- Seating: ${seating}\n- Phone: ${phone}\n- Notes: ${notes || 'None'}\n\nThank you!`
    );

    const waUrl = `https://wa.me/${locationHours.whatsappNumber}?text=${message}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const timeSlots = [
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:45',
    '20:15',
    '20:45',
    '21:15',
  ];

  const seatingOptions = [
    { label: 'Hearth Counter', desc: "Direct view of the chef's pass" },
    { label: 'Dining Room', desc: 'Candlelit walnut tables' },
    { label: 'Cellar Alcove', desc: 'Intimate wine library seating' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative z-10 w-full max-w-xl h-full bg-brand-surface border-l border-brand-border shadow-2xl flex flex-col justify-between overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="sticky top-0 z-20 p-6 md:p-8 bg-brand-surface/95 backdrop-blur-md border-b border-brand-border flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-brand-accent font-medium">
                  {brand.name} &bull; Reservations
                </span>
                <h3 className="font-serif text-2xl text-brand-light font-normal mt-0.5">
                  Reserve a Table
                </h3>
              </div>

              <button
                onClick={onClose}
                aria-label="Close reservation modal"
                className="w-9 h-9 rounded-full bg-brand-elevated border border-brand-border flex items-center justify-center text-brand-light hover:bg-brand-accent transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 md:p-8 flex-1">
              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-brand-accent/20 border border-brand-accent text-brand-accent flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-brand-gold font-mono">
                      Reservation Request Received
                    </span>
                    <h4 className="font-serif text-3xl text-brand-light font-normal">
                      We await your company, {name}.
                    </h4>
                    <p className="text-xs text-brand-muted max-w-sm mx-auto font-light leading-relaxed">
                      A confirmation email and SMS reminder have been dispatched. Your booking
                      reference is <span className="text-brand-cream font-mono font-medium">{bookingRef}</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-elevated border border-brand-border text-left max-w-sm mx-auto space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Date &amp; Time:</span>
                      <span className="text-brand-light font-medium">{date} at {time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Party Size:</span>
                      <span className="text-brand-light font-medium">{guests} Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-muted">Seating Area:</span>
                      <span className="text-brand-light font-medium">{seating}</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-full text-xs uppercase tracking-widest bg-brand-accent text-brand-light hover:bg-brand-accent-hover transition-colors font-medium"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleStandardSubmit} className="space-y-6">
                  {/* Party Size Counter */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-brand-cream flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-brand-accent" />
                      <span>Party Size</span>
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={`w-10 h-10 rounded-lg text-xs font-mono border transition-all ${
                            guests === num
                              ? 'bg-brand-accent text-brand-light border-brand-accent shadow-md shadow-brand-accent/25'
                              : 'bg-brand-elevated border-brand-border text-brand-muted hover:text-brand-light hover:border-brand-muted/50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    {guests >= 7 && (
                      <p className="text-[11px] text-brand-gold italic">
                        Parties of 7 or more will be served our family-style hearth tasting menu.
                      </p>
                    )}
                  </div>

                  {/* Date & Time Selection */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-brand-cream flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-brand-accent" />
                        <span>Date</span>
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-brand-elevated border border-brand-border text-brand-light text-xs focus:border-brand-accent focus:outline-none"
                      />
                      {errors.date && <p className="text-[11px] text-red-400">{errors.date}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-wider text-brand-cream flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-brand-accent" />
                        <span>Preferred Time</span>
                      </label>
                      <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-brand-elevated border border-brand-border text-brand-light text-xs focus:border-brand-accent focus:outline-none"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-brand-surface">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider text-brand-cream block font-medium">
                      Seating Preference
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {seatingOptions.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setSeating(opt.label)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            seating === opt.label
                              ? 'bg-brand-elevated border-brand-accent'
                              : 'bg-brand-surface border-brand-border hover:border-brand-border-light'
                          }`}
                        >
                          <span className="text-xs font-serif text-brand-light block">
                            {opt.label}
                          </span>
                          <span className="text-[10px] text-brand-muted block mt-0.5 line-clamp-1">
                            {opt.desc}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-brand-cream block font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Maren Vance"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-brand-elevated border border-brand-border text-brand-light text-xs placeholder:text-brand-muted/50 focus:border-brand-accent focus:outline-none"
                      />
                      {errors.name && <p className="text-[11px] text-red-400">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-brand-cream block font-medium">
                          Email *
                        </label>
                        <input
                          type="email"
                          placeholder="maren@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-elevated border border-brand-border text-brand-light text-xs placeholder:text-brand-muted/50 focus:border-brand-accent focus:outline-none"
                        />
                        {errors.email && <p className="text-[11px] text-red-400">{errors.email}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase tracking-wider text-brand-cream block font-medium">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          placeholder="+1 (415) 555-0192"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-brand-elevated border border-brand-border text-brand-light text-xs placeholder:text-brand-muted/50 focus:border-brand-accent focus:outline-none"
                        />
                        {errors.phone && <p className="text-[11px] text-red-400">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs uppercase tracking-wider text-brand-cream block font-medium">
                        Special Requests or Dietary Notes
                      </label>
                      <textarea
                        rows={2}
                        placeholder="E.g., anniversary celebration, severe shellfish allergy..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-brand-elevated border border-brand-border text-brand-light text-xs placeholder:text-brand-muted/50 focus:border-brand-accent focus:outline-none resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission CTA Options */}
                  <div className="pt-4 space-y-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-medium bg-brand-accent hover:bg-brand-accent-hover text-brand-light transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20"
                    >
                      <span>Confirm Reservation Request</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppSubmit}
                      className="w-full py-3 rounded-full text-xs uppercase tracking-widest font-medium border border-brand-border-light text-brand-cream hover:bg-brand-elevated transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Instant Booking via WhatsApp</span>
                    </button>

                    <p className="text-[11px] text-center text-brand-muted font-light pt-2 leading-relaxed">
                      {locationHours.reservationsNote}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
