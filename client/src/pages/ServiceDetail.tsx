import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Icon from '../components/Icon';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { CtaBanner, PageHero, tintClass } from '../components/blocks';
import { getService, services } from '../data/services';
import { projects } from '../data/projects';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { slug = '' } = useParams();
  const s = getService(slug);
  if (!s) return <NotFound />;

  const related = projects.filter((p) => p.services.some((x) => s.name.toLowerCase().includes(x.toLowerCase().split(' ')[0])) || s.tech.some((t) => p.stack.includes(t))).slice(0, 2);
  const others = services.filter((x) => x.slug !== s.slug && x.category === s.category).slice(0, 3);

  return (
    <div className="page">
      <div className="breadcrumb" style={{ marginTop: 16 , padding: 16 }}><Link to="/services"><Icon name="left" /> All services</Link></div>
      <Seo title={`${s.name} — Infincode`} description={s.summary} />
      <PageHero eyebrow={s.category} title={s.name} lead={s.summary}>
        
        <div className="ctas" style={{ marginTop: 8 }}>
          <Button asChild><Link to="/contact" state={{ type: s.name }}>Discuss this service <Icon name="upright" /></Link></Button>
        </div>
      </PageHero>

      <section className="section--tight">
        <div className="container grid grid--2">
          <Reveal><div className={`card ${tintClass(s.tint)}`} style={{ height: '100%', borderColor: 'var(--ink)' }}><span className="eyebrow">The outcome</span><h3 style={{ fontSize: '1.4rem' }}>{s.outcome}</h3></div></Reveal>
          <Reveal delay={80}><Card style={{ height: '100%' }}><span className="eyebrow">Tools &amp; tech</span><div className="chip-row">{s.tech.map((t) => (<Badge className="chip" key={t}>{t}</Badge>))}</div>{s.note && <p className="note" style={{ marginTop: 18 }}>{s.note}</p>}</Card></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div><span className="eyebrow">Problems we solve</span><h2>Sound familiar?</h2></div>
          <ul className="check-list">{s.problems.map((p) => (<li key={p}>{p}</li>))}</ul>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container split">
          <div><span className="eyebrow">Deliverables</span><h2>What you receive</h2></div>
          <ul className="check-list">{s.deliverables.map((d) => (<li key={d}>{d}</li>))}</ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Our process</span>
          <h2>How it goes</h2>
          <ol className="steps" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {s.process.map((p, i) => (
              <Reveal as="li" key={p} delay={i * 80} className="step">
                <span className="step__n">{String(i + 1).padStart(2, '0')}</span>
                <p style={{ fontWeight: 500, color: 'var(--ink)' }}>{p}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section--tight">
          <div className="container">
            <span className="eyebrow">Related examples</span>
            <div className="grid grid--2">
              {related.map((p) => (
                <Link key={p.slug} to={`/work/${p.slug}`} className="card">
                  <span className="badge-demo">Illustrative demo</span>
                  <h3 style={{ marginTop: 10 }}><Icon name={p.glyph} /> {p.title}</h3><p>{p.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="section--tight">
          <div className="container">
            <span className="eyebrow">You may also need</span>
            <div className="grid grid--3">
              {others.map((o) => (
                <Link key={o.slug} to={`/services/${o.slug}`} className="card"><div className={`icon-tile ${tintClass(o.tint)}`}>{o.icon}</div><h3>{o.name}</h3><p>{o.outcome}</p></Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title={`Let’s talk about ${s.name.toLowerCase()}.`} />
    </div>
  );
}
