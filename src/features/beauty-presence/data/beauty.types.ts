export type BeautyMode = "case" | "demo" | "client";

export type BeautyTheme = {
  background: string;
  foreground: string;
  accent: string;
  secondary: string;
  surface: string;
  line: string;
};

export type BeautyService = {
  id: string;
  name: string;
  shortName?: string;
  description: string;
  price?: string;
  showPrice?: boolean;
  duration?: string;
  image?: string;
};

export type BeautyWork = {
  id: string;
  serviceId: string;
  category: string;
  title: string;
  description?: string;
  image?: string;
  images?: string[];
  alt: string;
  featured?: boolean;
};

export type BeautyBeforeAfter = {
  id: string;
  serviceId?: string;
  title: string;
  beforeImage?: string;
  afterImage?: string;
  beforeAlt?: string;
  afterAlt?: string;
  demonstrationOnly?: boolean;
};

export type BeautyReview = {
  id: string;
  author: string;
  text: string;
  source?: string;
  rating?: number;
};

export type BeautyFaq = {
  id: string;
  question: string;
  answer: string;
};

export type BeautyPageData = {
  mode: BeautyMode;
  showDemoBadge: boolean;
  brand: {
    name: string;
    specialty: string;
    city: string;
    region?: string;
    logo?: string;
  };
  theme: BeautyTheme;
  contact: {
    whatsapp?: string;
    instagram?: string;
    bookingUrl?: string;
  };
  hero: {
    eyebrow?: string;
    title: string;
    description: string;
    image?: string;
    serviceHighlights: string[];
  };
  services: BeautyService[];
  works: BeautyWork[];
  beforeAfter: BeautyBeforeAfter[];
  professional: {
    title: string;
    description: string;
    image?: string;
    facts: string[];
  };
  reviews: BeautyReview[];
  location: {
    city: string;
    region?: string;
    description: string;
    address?: string;
    directionsUrl?: string;
    hours?: Array<{ label: string; value: string }>;
  };
  faq: BeautyFaq[];
  finalCta: {
    title: string;
    description: string;
    image?: string;
  };
  nobronCta?: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
    label: string;
  };
};

export type BeautyBookingContext = {
  serviceId?: string;
  work?: BeautyWork | null;
};
