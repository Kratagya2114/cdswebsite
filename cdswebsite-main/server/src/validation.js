import { z } from 'zod';

// Strip control characters / line breaks from single-line fields (prevents header injection).
const singleLine = (max) =>
  z
    .string()
    .transform((v) => v.replace(/[\r\n\t\u0000-\u001f]+/g, ' ').trim())
    .pipe(z.string().max(max, `Please keep this under ${max} characters.`));

const multiLine = (min, max, minMsg) =>
  z
    .string()
    .transform((v) => v.replace(/\u0000/g, '').trim())
    .pipe(z.string().min(min, minMsg).max(max, `Please keep this under ${max} characters.`));

export const PROJECT_TYPES = [
  'Website design & development',
  'Full-stack web application',
  'Mobile app',
  'UI/UX & Figma design',
  'E-commerce store',
  'AI agent / Generative AI',
  'ERP / SAP',
  'QA & testing',
  'SEO & digital marketing',
  'Python / Java development',
  'CA & accounting automation',
  'Branding & creative design',
  'Maintenance & support',
  'Something else',
];

export const BUDGETS = ['Not sure yet', 'Under ₹50,000', '₹50,000 – ₹1,50,000', '₹1,50,000 – ₹5,00,000', '₹5,00,000+'];
export const TIMELINES = ['Flexible', 'Within 1 month', '1 – 3 months', '3 – 6 months', 'Ongoing / retainer'];

const emailField = singleLine(254).pipe(z.string().email('Please enter a valid email address.'));

const optionalLinks = z
  .string()
  .optional()
  .default('')
  .transform((v) => v.replace(/\u0000/g, '').trim())
  .pipe(z.string().max(1000, 'Please keep this under 1000 characters.'));

export const contactSchema = z.object({
  name: singleLine(100).pipe(z.string().min(2, 'Please tell us your name.')),
  email: emailField,
  company: singleLine(120).optional().default(''),
  projectType: z.enum(PROJECT_TYPES, { message: 'Please choose a project type.' }),
  budget: z.enum(BUDGETS).optional().or(z.literal('')).default(''),
  timeline: z.enum(TIMELINES).optional().or(z.literal('')).default(''),
  message: multiLine(20, 4000, 'Please describe your project in at least 20 characters.'),
  links: optionalLinks,
  // Anti-spam
  website_url: z.string().optional().default(''), // honeypot – real users never fill this
  startedAt: z.number().optional(), // client timestamp when form was first rendered
});

export const feedbackSchema = z.object({
  name: singleLine(100).pipe(z.string().min(2, 'Please tell us your name.')),
  email: emailField,
  company: singleLine(120).optional().default(''),
  role: singleLine(120).optional().default(''),
  rating: z.number().int().min(1).max(5),
  message: multiLine(20, 2000, 'Please write at least 20 characters.'),
  consent: z.literal(true, { message: 'Please confirm we may display your feedback.' }),
  website_url: z.string().optional().default(''),
  startedAt: z.number().optional(),
});

export const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().transform((v) => v.slice(0, 1000)),
      }),
    )
    .min(1)
    .max(40),
});

export const fieldErrors = (zodError) => {
  const out = {};
  for (const issue of zodError.issues) {
    const key = issue.path[0] ?? 'form';
    if (!out[key]) out[key] = issue.message;
  }
  return out;
};
