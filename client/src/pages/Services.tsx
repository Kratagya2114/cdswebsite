import { Badge } from '../components/ui/badge';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { CtaBanner, PageHero, SectionHead, tintClass } from '../components/blocks';
import { services } from '../data/services';
import { process } from '../data/site';

const faqs = [
  { q: 'I’m not technical. Can I still work with you?', a: 'Absolutely. We explain things in plain language and handle the technical decisions with you, not over your head.' },
  { q: 'How much will my project cost?', a: 'It depends on scope, features and timeline, so we don’t publish fixed prices. Share your idea through the Contact page and we’ll give an honest estimate.' },
  { q: 'Do you support projects after launch?', a: 'Yes. We offer maintenance and support so your product stays secure, updated and improving.' },
  { q: 'Can you work with something we already have?', a: 'Often, yes. We can improve, extend, test or migrate existing websites, apps and systems.' },
];

export default function Services() {
  return (
    <div className="page">
      <Seo path="/services" />
      <PageHero
        eyebrow="Services"
        title="What we do, and why it matters to your business."
        lead="From a first website to AI agents and ERP systems — here is every service, who it’s for and what you get. No jargon required."
      />

      <section className="section--tight">
        <div className="container grid grid--3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 60}>
              <Link to={`/services/${s.slug}`} className="card" style={{ height: '100%' }}>
                <div className={`icon-tile ${tintClass(s.tint)}`} aria-hidden="true"><Icon name={s.icon} /></div>
                <Badge className="chip chip--tint" style={{ background: `var(--${s.tint})`, marginBottom: 10 }}>{s.category}</Badge>
                <h3>{s.name}</h3>
                <p>{s.summary}</p>
                <p style={{ marginTop: 12, fontWeight: 600, color: 'var(--accent)' }}>Learn more <Icon name="upright" /></p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Compare" title="Find the right service at a glance" />
          <Reveal>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="Services comparison table (scrollable)">
              <table className="compare">
                <thead><tr><th>Service</th><th>Best for</th><th>You get</th><th /></tr></thead>
                <tbody>
                  {services.map((s) => (
                    <tr key={s.slug}>
                      <td><strong><Icon name={s.icon} /> {s.name}</strong></td>
                      <td>{s.problems[0]}</td>
                      <td>{s.outcome}</td>
                      <td><Link to={`/services/${s.slug}`}>Details <Icon name="upright" /></Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <p style={{ color: 'var(--muted)', marginTop: 14, fontSize: '0.9rem' }}>We don’t list fixed prices or promise guaranteed results — every project is scoped to your needs.</p>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container">
          <SectionHead eyebrow="How it works" title="One simple process for every service" />
          <ol className="steps" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {process.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 80} className="step">
                <span className="step__n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div><span className="eyebrow">FAQ</span><h2>Questions we hear a lot</h2></div>
          <div className="faq">
            {faqs.map((f) => (<details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>))}
          </div>
        </div>
      </section>

      <CtaBanner title="Not sure which service you need?" text="Describe your goal and we’ll point you to the right starting point." />
    </div>
  );
}
