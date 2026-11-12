export type DietaryTag = 'GF' | 'VG' | 'V' | 'DF' | 'NF';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  dietary?: DietaryTag[];
  featured?: boolean;
  pairings?: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  title: string;
  subtitle: string;
  items: MenuItem[];
}

export interface Pillar {
  title: string;
  description: string;
}

export interface BrandPhilosophy {
  eyebrow: string;
  headline: string;
  quote: string;
  chefName: string;
  chefTitle: string;
  paragraphs: string[];
  pillars: Pillar[];
}

export interface BrandIdentity {
  name: string;
  tagline: string;
  descriptor: string;
  established: number;
  city: string;
  philosophy: BrandPhilosophy;
  themeTokens: {
    dark: string;
    surface: string;
    accent: string;
    gold: string;
    light: string;
    cream: string;
  };
}

export interface ScheduleBlock {
  service: string;
  days: string;
  hours: string;
  note?: string;
}

export interface LocationHours {
  address: {
    street: string;
    neighborhood: string;
    cityStateZip: string;
    country: string;
  };
  googleMapsUrl: string;
  phone: string;
  phoneRaw: string;
  email: string;
  whatsappNumber: string; // e.g. "15550192834"
  schedule: ScheduleBlock[];
  reservationsNote: string;
  privateDiningEmail: string;
}

export interface AtmosphereImage {
  id: string;
  title: string;
  caption: string;
  tag: string;
  image: string;
}

export interface ReviewBadge {
  critic: string;
  publication: string;
  quote: string;
  year: string;
}

export interface MediaManifest {
  hero: {
    primary: string;
    detail: string;
    alt: string;
  };
  story: {
    hearth: string;
    chef: string;
    cellar: string;
  };
  atmosphere: AtmosphereImage[];
  press: ReviewBadge[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface RestaurantConfig {
  brand: BrandIdentity;
  navigation: NavLink[];
  menu: MenuCategory[];
  locationHours: LocationHours;
  media: MediaManifest;
}
