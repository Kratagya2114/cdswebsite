import type { TechGroup } from './types';

export const techGroups: TechGroup[] = [
  {
    title: 'Languages',
    blurb: 'The core languages we write production code in.',
    tint: 'lilac',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'HTML & CSS', 'Dart'],
  },
  {
    title: 'Frontend frameworks',
    blurb: 'For fast, accessible and animated interfaces.',
    tint: 'sky',
    items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Redux / Zustand', 'Framer Motion'],
  },
  {
    title: 'Backend & APIs',
    blurb: 'Dependable services behind every product.',
    tint: 'peach',
    items: ['Node.js', 'Express', 'Django', 'FastAPI', 'Flask', 'Spring Boot', 'REST', 'GraphQL'],
  },
  {
    title: 'Mobile',
    blurb: 'Android and iOS from one codebase where it makes sense.',
    tint: 'blush',
    items: ['React Native', 'Flutter', 'Android (Java)', 'Firebase'],
  },
  {
    title: 'Databases',
    blurb: 'Relational, document and cache layers.',
    tint: 'butter',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Firebase / Firestore'],
  },
  {
    title: 'AI & automation',
    blurb: 'LLM-powered agents and workflow automation.',
    tint: 'mist',
    items: ['Gemini API', 'LLM tool use & agents', 'RAG / vector search', 'Python automation', 'n8n-style workflows'],
  },
  {
    title: 'QA & testing',
    blurb: 'Manual and automated quality checks.',
    tint: 'lilac',
    items: ['Selenium', 'Cypress', 'Playwright', 'Postman', 'JUnit', 'PyTest', 'JMeter'],
  },
  {
    title: 'Design',
    blurb: 'From wireframes to design systems.',
    tint: 'sky',
    items: ['Figma', 'FigJam', 'Prototyping', 'Design systems', 'Accessibility checks'],
  },
  {
    title: 'ERP & enterprise',
    blurb: 'Business systems and integrations.',
    tint: 'peach',
    items: ['SAP', 'ERP integrations', 'Excel / Tally data workflows', 'Reporting & dashboards'],
  },
  {
    title: 'DevOps & hosting',
    blurb: 'Reliable deployment and monitoring.',
    tint: 'blush',
    items: ['Git & GitHub', 'GitHub Actions', 'Docker', 'Vercel', 'Netlify', 'Render', 'AWS basics'],
  },
  {
    title: 'SEO & marketing tools',
    blurb: 'Making sure the right people find you.',
    tint: 'butter',
    items: ['Google Search Console', 'Google Analytics', 'Lighthouse', 'Meta Business tools'],
  },
];
