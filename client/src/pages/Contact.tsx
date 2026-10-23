import { Card } from '../components/ui/card';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';
import ContactForm from '../components/ContactForm';
import { PageHero } from '../components/blocks';
import { projectTypes } from '../data/formOptions';
import { site } from '../data/site';

// Map a service name (from "Discuss this service") to the closest project-type option.
function guessType(name?: string) {
  if (!name) return '';
  const n = name.toLowerCase();
  const rules: [string, string][] = [
    ['website', 'Website design & development'], ['full-stack', 'Full-stack web application'], ['mobile', 'Mobile app'],
    ['ui/ux', 'UI/UX & Figma design'], ['figma', 'UI/UX & Figma design'], ['qa', 'QA & testing'], ['e-commerce', 'E-commerce store'],
    ['ai', 'AI agent / Generative AI'], ['generative', 'AI agent / Generative AI'], ['erp', 'ERP / SAP'], ['seo', 'SEO & digital marketing'],
    ['marketing', 'SEO & digital marketing'], ['python', 'Python / Java development'], ['java', 'Python / Java development'],
    ['ca ', 'CA & accounting automation'], ['branding', 'Branding & creative design'], ['maintenance', 'Maintenance & support'],
  ];
  const hit = rules.find(([k]) => n.includes(k))?.[1];
  return hit && projectTypes.includes(hit) ? hit : '';
}

export default function Contact() {
  const { state } = useLocation() as { state: { type?: string } | null };
  const preset = guessType(state?.type);

  return (
    <div className="page">
      <Seo path="/contact" />
      <PageHero
        eyebrow="Start a project"
        title="Have something good in mind?"
        lead="Tell us what you’re building. We’ll help you figure out the next step."
      />
      <section className="section--tight">
        <div className="container contact-layout">
          <Card style={{ padding: 'clamp(20px, 4vw, 40px)' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Project inquiry</h2>
            <ContactForm key={preset} defaultType={preset} />
          </Card>
          <aside className="contact-card">
            <Card className="tint-lilac" style={{ borderColor: 'var(--ink)' }}>
              <span className="eyebrow">Prefer email?</span>
              <h3>Write to us directly</h3>
              <p style={{ color: 'var(--ink)' }}><a className="link-arrow" href={`mailto:${site.email}`}>{site.email}</a></p>
              <hr style={{ border: 0, borderTop: '1.5px solid var(--ink)', opacity: 0.15, margin: '20px 0' }} />
              <h3>What happens next</h3>
              <ol style={{ paddingLeft: '1.2em', margin: 0, color: 'var(--ink-soft)' }}>
                <li>We read your message carefully.</li>
                <li>We reply within one to two working days.</li>
                <li>We set up a short call to understand your goals.</li>
              </ol>
            </Card>
          </aside>
        </div>
      </section>
    </div>
  );
}
