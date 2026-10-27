export const site = {
  name: 'Infincode',
  short: 'Infincode',
  tagline: 'Where code meets infinite possibilities.',
  email: 'info@infincode.org',
  founder: 'Keshav Vyas',
  // Add real profile URLs here. Empty ones are simply not rendered.
  socials: [] as { label: string; href: string }[],
};

export const nav = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/tech-stack', label: 'Tech Stack' },
  { to: '/work', label: 'Work' },
  { to: '/reviews', label: 'Reviews' },
  // { to: '/team', label: 'Team' },
  { to: '/about', label: 'About' },
];

export const capabilities = [
  'Web', 'Mobile Apps', 'UI/UX', 'QA Testing', 'AI Agents', 'Gen AI', 'ERP & SAP', 'SEO', 'Digital Marketing', 'Python', 'Java', 'CA Automation',
];

export const whyChooseUs = [
  { icon: 'puzzle', tint: 'lilac', title: 'One team, every layer', text: 'Design, code, QA, AI and marketing under one roof, so nothing gets lost between vendors.' },
  { icon: 'zap', tint: 'butter', title: 'Modern stack, Gen-Z speed', text: 'We build with current tools and ship in small, visible steps instead of disappearing for months.' },
  { icon: 'search', tint: 'sky', title: 'Radically transparent', text: 'You see progress, decisions and trade-offs as they happen. No jargon walls, no surprise invoices.' },
  { icon: 'shield', tint: 'peach', title: 'Quality is built in', text: 'Testing is part of the build, not an afterthought. We care about what happens after launch.' },
  { icon: 'handshake', tint: 'blush', title: 'Founder-led, human support', text: 'You talk to the people doing the work. Questions get real answers, not ticket numbers.' },
  { icon: 'trending', tint: 'mist', title: 'Built for business value', text: 'Every feature has to earn its place by helping you get customers, save time or reduce effort.' },
] as const;

export const process = [
  { n: '01', title: 'Discover', text: 'Understand the business, audience and objectives.' },
  { n: '02', title: 'Design', text: 'Shape the user experience and visual direction.' },
  { n: '03', title: 'Build', text: 'Develop, test and refine the product.' },
  { n: '04', title: 'Launch & Improve', text: 'Deploy, measure and iterate.' },
];

export const workingWithUs = [
  { title: 'Clear communication', text: 'One point of contact, regular check-ins and plain-language updates.' },
  { title: 'Honest scoping', text: 'We tell you what is realistic for your budget and timeline before we start.' },
  { title: 'Visible progress', text: 'Working previews along the way so you can steer early, not at the end.' },
  { title: 'Support after launch', text: 'We stay available for fixes, improvements and maintenance when you need us.' },
];

export const values = [
  { title: 'Build something that works', text: 'Pretty is not enough. It has to load fast, be easy to use and keep working.' },
  { title: 'Be honest, even when it is awkward', text: 'If an idea will not work or a deadline is unrealistic, we say so early.' },
  { title: 'Stay curious', text: 'Tools change quickly. We keep learning and use what genuinely helps the client.' },
  { title: 'Respect the people on the other side', text: 'Your customers are real people. We design for them, not for awards.' },
];

export const pageMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Infincode — Web, App, AI & ERP Services',
    description: 'Infincode designs and builds digital experiences: web, mobile apps, UI/UX, QA, AI agents, ERP/SAP, SEO and more.',
  },
  '/services': { title: 'Services — Infincode', description: 'Web, app, UI/UX, QA, AI agents, Gen AI, ERP, SAP, SEO, digital marketing, Python, Java and CA automation services from Infincode.' },
  '/tech-stack': { title: 'Languages & Frameworks — Infincode', description: 'The programming languages, frameworks and tools Infincode works with across web, mobile, AI, ERP and QA.' },
  '/work': { title: 'Our Work — Infincode', description: 'Selected projects and case studies from Infincode.' },
  '/reviews': { title: 'Client Feedback — Infincode', description: 'What clients say about working with Infincode, and how to share your own feedback.' },
  '/team': { title: 'Our Team — Infincode', description: 'Meet the people behind Infincode.' },
  '/about': { title: 'About Us — Infincode', description: 'The story, mission and values behind Infincode, founded by Keshav Vyas.' },
  '/contact': { title: 'Start a Project — Infincode', description: 'Tell us what you are building. Start a project with Infincode.' },
  '/privacy': { title: 'Privacy Policy — Infincode', description: 'How Infincode handles your information.' },
};
