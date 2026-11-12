# Aurelia — Editorial Restaurant Website Template

A production-grade, art-directed restaurant website template crafted for high-end dining sanctuaries, bistros, wine bars, and cafés. Built with **React 18**, **TypeScript**, **Tailwind CSS**, **Three.js**, **GSAP + ScrollTrigger**, **Lenis**, and **Framer Motion**.

Designed to be **100% config-driven**: easily rebrand and retheme the entire website for any restaurant simply by updating `src/data/restaurant.config.ts`.

---

## Key Features

- **Config-Driven Architecture:** Brand identity, menu courses, opening hours, WhatsApp endpoint, and media assets all configured from a single central file (`src/data/restaurant.config.ts`).
- **Editorial Art Direction:** High-contrast typographic hierarchy (Playfair Display + Plus Jakarta Sans), rich culinary photography, and balanced asymmetric layouts without generic AI UI tropes.
- **Synchronized Lenis + GSAP ScrollTrigger:** Fluid 60fps smooth scrolling with ticker synchronization, responsive `gsap.matchMedia()` breakpoints, and strict `prefers-reduced-motion` compliance.
- **Three.js Ambient WebGL Canvas:** Lightweight, procedural warm-ember particle atmosphere that gracefully handles context disposal on unmount and respects reduced-motion preferences.
- **Interactive Menu Showcase:** Animated category tab indicator, clean typographic dish rows with dietary tags and sommelier pairings, plus floating dish preview hover cards on desktop.
- **Accessible Table Reservation Drawer:** Keyboard-navigable (`Esc` to dismiss) sheet drawer featuring party size selection, seating preference (Hearth Counter, Dining Room, Cellar), standard reservation confirmation, and direct WhatsApp booking.
- **Atmosphere & Cellar Gallery:** Curated showcase of culinary craft and wine cellar with interactive photo lightbox.
- **Zero AI Slop:** Zero ASCII art, zero emojis in UI chrome, zero generic purple glow gradients, and authentic culinary storytelling.

---

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/absurdharsh/template-restraunts.git
cd template-restraunts

# Install dependencies
npm install

# Start local development server
npm run dev
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## How to Re-Theme in 5 Minutes

All content and configuration lives in [`src/data/restaurant.config.ts`](./src/data/restaurant.config.ts).

### 1. Brand Identity & Color Tokens

```typescript
export const restaurantConfig: RestaurantConfig = {
  brand: {
    name: 'Your Restaurant Name',
    tagline: 'Bistro & Wine Bar',
    descriptor: 'Seasonal wood-fired gastronomy',
    established: 2024,
    city: 'Brooklyn, NY',
    philosophy: {
      eyebrow: 'Our Heritage',
      headline: 'The honest discipline of open wood fire.',
      quote: '...',
      chefName: 'Chef Name',
      chefTitle: 'Executive Chef',
      paragraphs: ['...'],
      pillars: [
        { title: 'Wood-Fired Hearth', description: '...' },
        // ...
      ],
    },
    themeTokens: {
      dark: '#0F0E0D',
      surface: '#181615',
      accent: '#C05A3E', // Muted terracotta, saffron, or olive
      gold: '#D4A359',
      light: '#F8F6F1',
      cream: '#EDE7DC',
    },
  },
  // ...
};
```

### 2. Menu Structure

Add or edit menu categories and dishes:

```typescript
menu: [
  {
    id: 'starters',
    title: 'First Courses & Crudos',
    subtitle: 'Cold-pressed oils, wild coastal herbs, and ember-toasted grains',
    items: [
      {
        id: 'sourdough',
        name: '48-Hour Heritage Sourdough',
        description: 'Cultured butter with smoked bone tallow',
        price: '$14',
        dietary: ['VG'],
        featured: true,
        pairings: 'Timorasso 2021',
        image: 'https://images.unsplash.com/...',
      },
    ],
  },
  // Add Mains, Desserts, Cocktails, etc.
];
```

### 3. Location, Service Hours & WhatsApp Booking

Configure your opening times and booking channels:

```typescript
locationHours: {
  address: {
    street: '428 Jackson Street',
    neighborhood: 'Jackson Square',
    cityStateZip: 'San Francisco, CA 94111',
    country: 'United States',
  },
  googleMapsUrl: 'https://maps.google.com/...',
  phone: '+1 (415) 890-3420',
  phoneRaw: '+14158903420',
  email: 'hello@aureliahearth.com',
  whatsappNumber: '14158903420', // Format: country code + number without symbols
  schedule: [
    {
      service: 'Dinner Service',
      days: 'Tuesday through Saturday',
      hours: '5:30 PM — 10:30 PM',
      note: 'Last seating at 9:30 PM',
    },
  ],
  reservationsNote: 'Reservations open on the 1st of every month at 9:00 AM PST.',
  privateDiningEmail: 'gatherings@aureliahearth.com',
},
```

---

## Project Structure

```text
├── src/
│   ├── components/
│   │   ├── AtmosphereCanvas.tsx   # Three.js ambient particle embers
│   │   ├── AtmosphereGallery.tsx  # Atmosphere & cellar showcase + lightbox
│   │   ├── Footer.tsx             # Editorial footer with smooth scroll-to-top
│   │   ├── Header.tsx             # Sticky minimalist navigation & mobile drawer
│   │   ├── Hero.tsx               # Choreographed GSAP hero & typography
│   │   ├── LocationHours.tsx      # Hours schedule & physical location
│   │   ├── MenuShowcase.tsx       # Animated menu tabs & floating hover preview
│   │   ├── ReservationModal.tsx   # Accessible booking drawer & WhatsApp link
│   │   └── Story.tsx              # Asymmetric philosophy & GSAP scrub parallax
│   ├── data/
│   │   └── restaurant.config.ts   # Centralized restaurant configuration
│   ├── types/
│   │   └── restaurant.ts          # Strong TypeScript interfaces
│   ├── utils/
│   │   ├── cn.ts                  # Tailwind class merge utility
│   │   └── smoothScroll.ts        # Lenis + GSAP ScrollTrigger synchronization
│   ├── App.tsx                    # Root layout with Lenis lifecycle
│   ├── index.css                  # Tailwind & smooth-scroll styling
│   └── main.tsx                   # React DOM entry
├── index.html                     # HTML shell with Google Fonts
├── tailwind.config.js             # Warm editorial color palette & typography
├── tsconfig.json                  # TypeScript compiler settings
└── vite.config.ts                 # Vite bundler & vendor chunk splitting
```

---

## Tech Stack

- **React 18** + **Vite 5**
- **TypeScript** (Strict mode)
- **Tailwind CSS** (Editorial warm palette)
- **GSAP 3** + **ScrollTrigger**
- **Lenis** (Smooth scroll synchronized with GSAP ticker)
- **Three.js** (WebGL ambient ember canvas with WebGL cleanup)
- **Framer Motion** (Accessible drawer & animated tab indicator)
- **Lucide Icons** (Clean, modern SVG iconography)

---

## License

MIT License. Free to use for commercial restaurant projects, personal portfolios, or client commissions.
