import type { Project } from './types';

/**
 * ALL ENTRIES BELOW ARE ILLUSTRATIVE DEMO CONTENT (isDemo: true) — they are sample
 * concepts, not real client work. Replace them with your real projects, set
 * isDemo to false, and only add `results` that are real and verified.
 */
const demoLesson = 'Replace this with a real lesson learned from the actual project.';

export const projects: Project[] = [
  // ---- COPY THIS TEMPLATE FOR EACH REAL PROJECT (put it at the top of the list) ----
  // {
  //   slug: 'my-project',                       // used in the URL: /work/my-project
  //   title: 'My Project Name',
  //   category: 'Web Applications',             // Websites | Web Applications | E-commerce | UI/UX | Branding
  //   industry: 'Education',
  //   services: ['Full-stack development', 'UI/UX'],
  //   summary: 'One line about what it does.',
  //   tint: 'sky',                              // fallback colour if no image
  //   glyph: 'code',                            // fallback icon if no image
  //   image: '/projects/my-project/cover.jpg',  // file in client/public/projects/my-project/
  //   liveUrl: 'https://my-project.vercel.app', // optional
  //   repoUrl: 'https://github.com/Kratagya2114/my-project', // optional
  //   isDemo: false,
  //   overview: 'Short overview.',
  //   clientType: 'College project / Personal project / Client name',
  //   challenge: 'What problem it solves.',
  //   goals: ['Goal 1', 'Goal 2'],
  //   strategy: 'How you planned it.',
  //   design: 'Design approach.',
  //   development: 'How you built it.',
  //   stack: ['React', 'Node.js', 'MongoDB'],
  //   gallery: [
  //     { caption: 'Home page', tint: 'sky', image: '/projects/my-project/1.jpg' },
  //     { caption: 'Dashboard', tint: 'mist', image: '/projects/my-project/2.jpg' },
  //   ],
  //   lessons: ['What you learned.'],
  // },
    {
    slug: 'clinic',
    title: 'Clinic Booking System',
    category: 'Web Applications',
    industry: 'Healthcare',
    services: ['Full-stack development', 'UI/UX'],
    summary: 'A clinic website where patients can view services and book appointments online.',
    tint: 'sky',
    glyph: 'stethoscope',
    image: '/projects/clinic/home.png',
    liveUrl: 'https://apex-care-clinic-react-apex-care-cl.vercel.app',
    isDemo: false,
    overview: 'A responsive clinic website with an easy appointment booking flow.',
    clientType: 'Personal project',
    challenge: 'Patients needed a quick way to find services and book an appointment.',
    goals: ['Make booking simple', 'Work well on phones'],
    strategy: 'Map the main patient questions, then structure the pages around them.',
    design: 'Clean layout, clear buttons and easy-to-read text.',
    development: 'Built with React and a simple booking form.',
    stack: ['React', 'Node.js', 'MongoDB'],
    gallery: [
      { caption: 'Home page', tint: 'sky', image: '/projects/clinic/home.png' },
    ],
    lessons: ['Keep the booking steps as few as possible.'],
  },
  {
    slug: 'sample-inventory-dashboard',
    title: 'Inventory Control Dashboard',
    category: 'Web Applications',
    industry: 'Retail & Distribution',
    services: ['Full-stack development', 'UI/UX', 'QA'],
    summary: 'Concept: a stock and order dashboard that replaces scattered spreadsheets.',
    tint: 'peach',
    glyph: 'package',
     image: '/projects/inventory control/inventoryhome.jpg',
    isDemo: false,
    overview: 'An illustrative concept for a role-based inventory app with alerts and reports.',
    clientType: 'Small distributor (sample concept)',
    challenge: 'Stock levels live in several spreadsheets and are often out of date.',
    goals: ['Single source of truth for stock', 'Low-stock alerts', 'Simple reports for owners'],
    strategy: 'Start with the most error-prone workflow and replace it first, then expand.',
    design: 'Dense but readable tables, clear status chips and a mobile view for warehouse staff.',
    development: 'React frontend, REST API, relational database, automated tests for critical flows.',
    stack: ['React', 'Node.js', 'Express', 'PostgreSQL', 'Playwright'],
    gallery: [
      { caption: ' Inventory Home page', tint: 'sky', image: '/projects/inventory control/inventoryhome.png' },
    ],
      lessons: ['All inventory should be tracked in one place to avoid errors and confusion ans maintain clear records'],
  },
   {
    slug: 'atelier-vera',
    title: 'Atelier Vera – Interior & Architecture Studio',
    category: 'Websites',
    industry: 'Interior Design & Architecture',
    services: ['Website design', 'Full-stack development', 'UI/UX'],
    summary: 'A full-stack studio website that showcases interior and architecture projects and lets clients send enquiries.',
    tint: 'mist',
    glyph: 'palette',
    image: '/projects/interior design/interiordesignhome.png',
    liveUrl: 'https://ateliervera.vercel.app',
    isDemo: false,
    overview: 'A responsive website for an interior design and architecture studio, with a project showcase and a working contact form.',
    clientType: 'Interior design and architecture studio',
    challenge: 'Studios need a site that shows their work clearly and makes it easy for visitors to get in touch.',
    goals: ['Show projects in a clean, easy-to-browse layout', 'Make every button and action clearly visible', 'Send enquiries straight to the studio by email'],
    strategy: 'Keep the pages simple, put the studio\'s best work first, and make contacting the studio one clear step.',
    design: 'A refined colour palette, large project images, clear buttons and a layout that works well on phones.',
    development: 'Built with Next.js and Prisma, with Node middleware and SMTP email so the contact form works end to end.',
    stack: ['Next.js', 'React', 'Node.js', 'Prisma', 'SMTP'],
    gallery: [
      { caption: 'Home page', tint: 'mist', image: '/projects/atelier-vera/home.png' },
    ],
    lessons: ['Simple layouts and clearly visible buttons help visitors act faster.'],
  },
  // {
  //   slug: 'sample-fintech-app-ui',
  //   title: 'Personal Finance App UI',
  //   category: 'UI/UX',
  //   industry: 'Fintech',
  //   services: ['UX research', 'UI design', 'Figma prototype'],
  //   summary: 'Concept: a friendly mobile app design that makes budgeting feel less like homework.',
  //   tint: 'lilac',
  //   glyph: 'wallet',
  //   isDemo: true,
  //   overview: 'An illustrative design exercise focused on onboarding and weekly insights.',
  //   clientType: 'Design concept',
  //   challenge: 'Finance apps feel intimidating, so first-time users drop out early.',
  //   goals: ['Short, encouraging onboarding', 'Clear weekly summary', 'Accessible colours and type'],
  //   strategy: 'Define the first five minutes of the experience and design everything around them.',
  //   design: 'Large numbers, playful but calm colours, and progressive disclosure for detail.',
  //   development: 'Design handoff via a Figma component library with spacing and colour tokens.',
  //   stack: ['Figma', 'Design tokens', 'Prototyping'],
  //   gallery: [
  //     { caption: 'Onboarding flow', tint: 'lilac' },
  //     { caption: 'Weekly summary', tint: 'sky' },
  //     { caption: 'Spending detail', tint: 'butter' },
  //   ],
  //   lessons: [demoLesson],
  // },
    {
    slug: 'blue-roof-cafe',
    title: 'Blue Roof Cafe ',
    category: 'Websites',
    industry: 'Food & Beverage',
    services: ['Website design', 'Frontend development', 'UI/UX'],
    summary: 'A warm, mobile-friendly website that helps customers discover Blue Roof Cafe and plan a visit.',
    tint: 'peach',
    glyph: 'coffee',
    image: '/projects/cafe/cafehome.png',
    liveUrl: 'https://blue-roof-cafe-main1.vercel.app',
    isDemo: false,
    overview: 'A responsive cafe website with a welcoming look, clear sections and easy ways for customers to find the cafe.',
    clientType: 'Cafe website',
    challenge: 'Customers wanted to see the cafe\'s atmosphere and key information quickly, especially on their phones.',
    goals: ['Show the cafe\'s personality at first glance', 'Make key information easy to find', 'Work smoothly on phones and tablets'],
    strategy: 'Put the most important information first, keep the pages short and make every call to action obvious.',
    design: 'A calm blue and warm colour palette, a custom logo, large readable text and clear buttons.',
    development: 'A fast React frontend with reusable components and a fully responsive layout.',
    stack: ['React', 'JavaScript', 'CSS'],
    gallery: [
      { caption: 'Home page', tint: 'peach', image: '/projects/blue-roof-cafe/home.png' },
    ],
    lessons: ['A clear layout and easy-to-find information matter more than extra features.'],
  },
  {
    slug: 'sample-ca-automation-portal',
    title: 'CA Firm Document Portal',
    category: 'Web Applications',
    industry: 'Accounting & Finance',
    services: ['Web application', 'Automation', 'AI document extraction'],
    summary: 'Concept: a client portal that collects documents and automates reminders for a CA practice.',
    tint: 'mist',
    glyph: 'receipt',
     image: '/projects/CA firm/CAhome.png',
     liveUrl: 'https://vyas-consultancy-github-ready.vercel.app',
    isDemo: false,
    overview: 'An illustrative concept showing how document collection and reminders could be automated.',
    clientType: 'CA practice (sample concept)',
    challenge: 'Staff spend hours chasing documents and re-typing data from invoices.',
    goals: ['One place for client uploads', 'Automatic deadline reminders', 'Extract invoice data into sheets'],
    strategy: 'Automate the most repetitive step first, keeping a human review before anything is final.',
    design: 'Simple checklist-style interface clients can use without training.',
    development: 'Web portal with scheduled reminders and AI-assisted data extraction with manual review.',
    stack: ['React', 'Python', 'Node.js', 'AI document extraction'],
    gallery: [
     { caption: 'Home page', tint: 'peach', image: '/projects/CA firm/CAhome.png' }, 
      
    ],
    lessons: ['Plain language and a clear layout build trust faster than a complicated design.'],
  },
];

export const projectFilters = ['All', 'Websites', 'Web Applications', 'E-commerce', 'UI/UX', 'Branding'] as const;

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
