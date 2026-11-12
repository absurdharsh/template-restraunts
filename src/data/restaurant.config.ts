import { RestaurantConfig } from '../types/restaurant';

export const restaurantConfig: RestaurantConfig = {
  brand: {
    name: 'Aurelia',
    tagline: 'Hearth & Cellar',
    descriptor: 'Wood-fired seasonal dining and handcrafted culinary cellar',
    established: 2021,
    city: 'Dhanbad, Jharkhand',
    philosophy: {
      eyebrow: 'Culinary Terroir',
      headline: 'The honest discipline of timber, cast iron, and living embers.',
      quote:
        'Cooking over open wood is an act of patient listening. The fire reveals the natural grain and seasonal flavors without needing disguise.',
      chefName: 'Maren Lindqvist',
      chefTitle: 'Executive Chef & Co-Founder',
      paragraphs: [
        'Aurelia was founded on an elemental premise: that the most memorable gastronomy emerges from raw materials allowed to speak in their truest register. We burn seasoned fruitwoods and timber in a bespoke masonry hearth built by hand in 2021.',
        'Every vegetable is sourced directly from trusted regional regenerative farms and bio-intensive orchards across the Chota Nagpur plateau. We do not use commercial sauces, artificial emulsifiers, or frozen bases—only time, heat, sea salt, and patience.',
      ],
      pillars: [
        {
          title: 'Live Hearth Cooking',
          description:
            'Direct flame, ember baking, and cold smoking over seasoned hardwood and fruitwood coals.',
        },
        {
          title: 'Regenerative Growers',
          description:
            'Long-term partnerships with regional growers practicing heirloom seed preservation and clean soil cultivation.',
        },
        {
          title: 'Artisanal Cellar',
          description:
            'A curated cellar focused on low-intervention vintages, indigenous botanicals, and bespoke ferments.',
        },
      ],
    },
    themeTokens: {
      dark: '#0F0E0D',
      surface: '#181615',
      accent: '#C05A3E',
      gold: '#D4A359',
      light: '#F8F6F1',
      cream: '#EDE7DC',
    },
  },

  navigation: [
    { label: 'Philosophy', href: '#story' },
    { label: 'Menu', href: '#menu' },
    { label: 'Atmosphere', href: '#atmosphere' },
    { label: 'Hours & Location', href: '#location' },
  ],

  menu: [
    {
      id: 'starters',
      title: 'First Courses & Crudos',
      subtitle: 'Cold-pressed oils, wild herbs, and ember-toasted grains',
      items: [
        {
          id: 'sourdough-hearth',
          name: '48-Hour Emmer Sourdough',
          description:
            'Cultured organic butter churned with sea salt and smoked herb tallow.',
          price: '₹380',
          dietary: ['VG'],
          featured: true,
          pairings: 'Piedmontese Timorasso 2021',
          image: './images/sourdough.jpg',
        },
        {
          id: 'yellowtail-crudo',
          name: 'Wild Yellowtail Crudo',
          description:
            'Finger lime pearls, preserved Meyer lemon vinaigrette, sea beans, and toasted coriander oil.',
          price: '₹720',
          dietary: ['GF', 'DF'],
          featured: true,
          pairings: 'Domaine de Bellevue Muscadet 2022',
          image: './images/yellowtail.jpg',
        },
        {
          id: 'charred-leeks',
          name: 'Ember-Charred Baby Leeks',
          description:
            'Whipped sheep curd, hazelnut-praline crunch, wild sumac, and brown butter vinegar.',
          price: '₹490',
          dietary: ['GF', 'VG'],
          pairings: 'Loire Valley Chenin Blanc 2020',
          image: './images/leeks.jpg',
        },
        {
          id: 'charred-octopus',
          name: 'Hearth-Roasted Prawns & Calamari',
          description:
            'Smoked potato foam, fermented chili glaze, crisp garlic chips, and wild caper berries.',
          price: '₹780',
          dietary: ['GF', 'DF'],
          pairings: 'Etna Rosato 2022',
          image: './images/octopus.jpg',
        },
      ],
    },
    {
      id: 'mains',
      title: 'Hearth & Mains',
      subtitle: 'Prime pasture cuts, coastal seafood, and ember-braised produce',
      items: [
        {
          id: 'aged-ribeye',
          name: '60-Day Dry-Aged Prime Steak',
          description:
            'Cooked directly over oak embers, charred shallot jus, roasted marrow, and smoked sea salt.',
          price: '₹1,850',
          dietary: ['GF', 'DF'],
          featured: true,
          pairings: 'Barolo Monvigliero 2018',
          image: './images/ribeye.jpg',
        },
        {
          id: 'roasted-duck',
          name: 'Dry-Aged Honey-Glazed Duck',
          description:
            'Lacquered with sour wild berry honey, roasted heirloom parsnips, and cracked pepper jus.',
          price: '₹1,450',
          dietary: ['GF'],
          featured: true,
          pairings: 'Willamette Valley Pinot Noir 2019',
          image: './images/duck.jpg',
        },
        {
          id: 'agnolotti-morel',
          name: 'Handmade Sweet Corn & Morel Agnolotti',
          description:
            'Cultured brown butter, mountain thyme, aged pecorino, and shaved summer truffles.',
          price: '₹880',
          dietary: ['VG'],
          pairings: 'Jura Savagnin Ouillé 2020',
          image: './images/agnolotti.jpg',
        },
        {
          id: 'black-cod',
          name: 'Coastal Black Cod in Fig Leaf',
          description:
            'Steamed over white oak embers, dashi-infused buttermilk broth, and foraged greens.',
          price: '₹1,250',
          dietary: ['GF'],
          pairings: 'Chablis Premier Cru 2021',
          image: './images/black-cod.jpg',
        },
      ],
    },
    {
      id: 'desserts',
      title: 'Pastry & Sweet Embers',
      subtitle: 'Smoked elements, stone fruit preserves, and unrefined sugars',
      items: [
        {
          id: 'smoked-chocolate',
          name: 'Single-Origin Smoked Chocolate Tart',
          description:
            'Wild cocoa 72%, smoked sea salt flakes, and cold-pressed olive oil gelato.',
          price: '₹420',
          dietary: ['VG'],
          featured: true,
          pairings: 'Tawny Port 20 Year',
          image: './images/chocolate-tart.jpg',
        },
        {
          id: 'burnt-basque',
          name: 'Hearth-Burnt Basque Custard',
          description:
            'Caramelized fig compote, toasted organic walnuts, and aged milk crema.',
          price: '₹390',
          dietary: ['GF', 'VG'],
          pairings: 'Tokaji Aszú 5 Puttonyos 2017',
          image: './images/basque-custard.jpg',
        },
        {
          id: 'roasted-pear',
          name: 'Ember-Roasted Autumn Pear',
          description:
            'Hay-smoked diplomat cream, crisp rye tuile, and reduced spiced apple cider syrup.',
          price: '₹360',
          dietary: ['VG'],
          pairings: 'Normandy Ice Cider 2021',
          image: './images/sourdough.jpg',
        },
      ],
    },
    {
      id: 'drinks',
      title: 'Cellar & Aperitifs',
      subtitle: 'Artisanal cocktails, botanical infusions, and low-intervention labels',
      items: [
        {
          id: 'ember-old-fashioned',
          name: 'Smoked Cedar Old Fashioned',
          description:
            'Small-batch aged spirit, charred cedar smoke, raw demerara syrup, and toasted pecan bitters.',
          price: '₹650',
          featured: true,
          image: './images/cocktail.jpg',
        },
        {
          id: 'botanical-spritz',
          name: 'Bay Laurel & Bergamot Spritz',
          description:
            'Foraged botanical bay laurel infusion, bitter gentian aperitif, sparkling pet-nat, and citrus mist.',
          price: '₹550',
          dietary: ['VG', 'GF'],
          image: './images/spritz.jpg',
        },
        {
          id: 'natural-orange',
          name: 'Radikon Ribolla Gialla 2017',
          description:
            'Skin-macerated white vintage. Wild apricot, dried herbs, and deep mineral complexity.',
          price: '₹950 / Glass',
          dietary: ['VG', 'GF'],
          image: './images/hero-detail.jpg',
        },
        {
          id: 'heritage-cider',
          name: 'Wild-Ferment Orchard Cooler',
          description:
            'Crisp orchard apples crushed fresh, botanical sparkling notes, refreshing dry finish.',
          price: '₹380 / Glass',
          dietary: ['VG', 'GF'],
          image: './images/cider.jpg',
        },
      ],
    },
  ],

  locationHours: {
    address: {
      street: 'City Centre, Luby Circular Road',
      neighborhood: 'Saraidhela',
      cityStateZip: 'Dhanbad, Jharkhand 826001',
      country: 'India',
    },
    googleMapsUrl: 'https://maps.google.com/?q=Saraidhela+Dhanbad+Jharkhand+826001',
    phone: '+91 (326) 220-4820',
    phoneRaw: '+919431102840',
    email: 'hello@aureliadhanbad.in',
    whatsappNumber: '919431102840',
    schedule: [
      {
        service: 'Dinner Service',
        days: 'Tuesday through Sunday',
        hours: '7:00 PM — 11:30 PM',
        note: 'Last seating at 10:30 PM',
      },
      {
        service: 'Lunch & Afternoon Hearth',
        days: 'Thursday through Sunday',
        hours: '12:30 PM — 3:30 PM',
        note: 'Seasonal à la carte and business lunch courses',
      },
      {
        service: 'Cellar & Lounge',
        days: 'Tuesday through Sunday',
        hours: '6:00 PM — Midnight',
        note: 'Walk-ins welcomed for drinks and small plates',
      },
      {
        service: 'Kitchen Closed',
        days: 'Mondays',
        hours: 'Dark',
        note: 'Private gatherings and buyout events available upon request',
      },
    ],
    reservationsNote:
      'Reservations recommended for dinner service and weekend gatherings. We gladly accommodate vegetarian and Jain dietary preferences with prior notice.',
    privateDiningEmail: 'gatherings@aureliadhanbad.in',
  },

  media: {
    hero: {
      primary: './images/hero-primary.jpg',
      detail: './images/hero-detail.jpg',
      alt: 'Artisanal wood-fired hearth dining at Aurelia Dhanbad',
    },
    story: {
      hearth: './images/hearth.jpg',
      chef: './images/chef.jpg',
      cellar: './images/cellar.jpg',
    },
    atmosphere: [
      {
        id: 'atm-1',
        title: 'The Open Masonry Hearth',
        caption: 'Handcrafted brick hearth fired with seasoned aromatic wood',
        tag: 'Craft',
        image: './images/hearth.jpg',
      },
      {
        id: 'atm-2',
        title: 'Evening Candlelit Dining Room',
        caption: 'Solid natural timber tables and warm unlacquered brass accents',
        tag: 'Ambience',
        image: './images/dining-room.jpg',
      },
      {
        id: 'atm-3',
        title: 'Fresh Catch & Butchery Pass',
        caption: 'Daily butcher pass and cold-pressed citrus finishing',
        tag: 'Culinary',
        image: './images/yellowtail.jpg',
      },
      {
        id: 'atm-4',
        title: 'Artisanal Wine & Spirits Cellar',
        caption: 'Rare low-intervention labels and handcrafted botanical aperitifs',
        tag: 'Cellar',
        image: './images/cellar.jpg',
      },
      {
        id: 'atm-5',
        title: 'Naturally Leavened Baking',
        caption: 'Heritage sourdough loaves baked fresh in our hearth daily',
        tag: 'Heritage',
        image: './images/sourdough.jpg',
      },
    ],
    press: [
      {
        critic: 'Culinary Review India',
        publication: 'Culinary Review',
        quote:
          'Aurelia redefines hearth dining in Jharkhand with quiet authority—uncovering the pure magic of flame, seasoned wood, and honest hospitality.',
        year: '2024',
      },
      {
        critic: 'Gourmet Gazette',
        publication: 'Gourmet Gazette',
        quote:
          'Chef Lindqvist and team bring an elemental culinary devotion. The sourdough and wood-charred cuts are an absolute revelation.',
        year: '2023',
      },
      {
        critic: 'The Gastronomic Trail',
        publication: 'Gastronomic Trail',
        quote:
          'An intimate sanctuary where every ember serves a dedicated gastronomic purpose. A destination dining experience in Dhanbad.',
        year: '2024',
      },
    ],
  },
};
