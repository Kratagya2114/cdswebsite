import type { TeamMember } from './types';

/**
 * EDIT ME: Add real team members here. To use a photo, put the file in client/public/team/
 * and set photo: '/team/filename.jpg'. Entries with isPlaceholder: true show a visible
 * "Placeholder" label so nothing fake is presented as real.
 */
export const team: TeamMember[] = [
  {
    id: 'keshav-vyas',
    name: 'Keshav Vyas',
    role: 'Founder / Full Stack Developer',
    photo: '/team/keshav.jpg',
    bio: 'Founded Crafting Digital Solution to give ambitious businesses a technology partner that is honest, quick and genuinely invested in their success.',
    skills: ['Product thinking', 'Client partnership', 'Delivery'],
    tint: 'lilac',
    links: [],
  },
  {
    id: 'lakshya-joshi',
    name: 'Lakshya joshi',
    role: 'UI/UX Designer / BDE ',
    photo: '/team/lakshya.jpg',
    bio: 'Turns ideas into clear, friendly interfaces. From user flows and wireframes to polished Figma designs, they make sure every screen is easy to use, looks great on any device, and feels consistent across the product',
    skills: ['Figma', 'UX research', 'Design systems'],
    tint: 'blush',
    
  },
  {
    id: 'kritagya-gami',
    name: 'Kritagya Gami',
    role: 'Co-Founder/Frontend Developer / QA Engineer',
    photo: '/team/kratagya.jpg',
    bio: 'Brings designs to life with fast, responsive and accessible interfaces. They build with React and TypeScript, care about clean, reusable code, and sweat the details that make a site feel smooth on both phones and desktops..',
    skills: ['React', 'TypeScript', 'Accessibility'],
    tint: 'sky',
   
  },
  {
    id: 'aditya-singh-bhati',
    name: 'Aditya Singh Bhati',
    role: 'Backend / AI Engineer',
    photo: '/team/aditya.jpg',
    bio: 'Builds the engine behind the product: secure APIs, reliable databases and smart AI features. They connect the system to real data and tools, so the final product is dependable as well as impressive.',
    skills: ['Node.js', 'Python', 'LLM integration'],
    tint: 'peach',
    
  },
  {
    id: 'priyaksh-vyas',
    name: 'Priyaksh Vyas',
    role: 'Client Support Specialist',
    photo: '/team/priyaksh.jpg',
    bio: 'Makes sure what we ship actually works. They test every feature across devices and edge cases, catch problems before clients do, and help keep releases stable, polished and ready for real users.',
    skills: ['Manual testing', 'Automation', 'Test planning'],
    tint: 'butter',
   
  },
];
