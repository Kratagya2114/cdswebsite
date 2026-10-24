export type ServiceCategory = 'Build' | 'Design' | 'Quality & AI' | 'Enterprise' | 'Growth' | 'Business';

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  icon: string; // emoji used as a lightweight, dependency-free icon
  tint: Tint;
  summary: string;
  outcome: string;
  problems: string[];
  deliverables: string[];
  process: string[];
  tech: string[];
  note?: string;
}

export type Tint = 'peach' | 'lilac' | 'sky' | 'butter' | 'blush' | 'mist';

export interface TechGroup {
  title: string;
  blurb: string;
  tint: Tint;
  items: string[];
}

export type ProjectCategory = 'Websites' | 'Web Applications' | 'E-commerce' | 'UI/UX' | 'Branding';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  industry: string;
  services: string[];
  summary: string;
  tint: Tint;
  glyph: string;
  image?: string; // cover screenshot under /public, e.g. "/projects/my-app/cover.jpg"
  liveUrl?: string;
  repoUrl?: string;
  isDemo: boolean; // true = illustrative sample, NOT real client work
  overview: string;
  clientType: string;
  challenge: string;
  goals: string[];
  strategy: string;
  design: string;
  development: string;
  stack: string[];
  gallery: { caption: string; tint: Tint; image?: string }[];
  results?: string[]; // only add REAL, verified results
  lessons: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  tint: Tint;
  photo?: string; // path under /public, e.g. "/team/keshav.jpg"
  links?: { label: string; href: string }[];
  isPlaceholder?: boolean;
}

export interface Review {
  id: string;
  name: string;
  role?: string;
  company?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  project?: string;
}
