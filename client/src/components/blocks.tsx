import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Button } from './ui/button';
import Icon from './Icon';
import { Link } from 'react-router-dom';
import Reveal from './Reveal';
import { reviews } from '../data/reviews';
import { workingWithUs, site } from '../data/site';
import { services } from '../data/services';
import { team } from '../data/team';
import type { Project, Review, Service, TeamMember, Tint } from '../data/types';

export const tintClass = (t: Tint) => `tint-${t}`;

export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="section-head">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function PageHero({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}

export function ServiceRows({ items = services }: { items?: Service[] }) {
  return (
    <div className="service-list">
      {items.map((s, i) => (
        <Reveal key={s.slug} delay={Math.min(i, 5) * 40}>
          <Link to={`/services/${s.slug}`} className="service-row">
            <span className="service-row__n">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3><Icon name={s.icon} /> {s.name}</h3>
            </div>
            <p>{s.outcome}</p>
            <Badge className="chip chip--tint service-row__cat" style={{ background: `var(--${s.tint})` }}>{s.category}</Badge>
            <span className="service-row__arrow" aria-hidden="true"><Icon name="upright" /></span>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 3) * 70}>
      <Link to={`/work/${project.slug}`} className="project" aria-label={`${project.title} — view case study`}>
        <div className={`project__cover ${project.image ? 'project__cover--img' : ''} ${tintClass(project.tint)}`}>
          <span className="project__index">/{String(index + 1).padStart(2, '0')}</span>
          {project.isDemo && <span className="project__demo badge-demo">Illustrative demo</span>}
          {project.image ? <img src={project.image} alt={`${project.title} preview`} loading="lazy" /> : <span className="glyph" aria-hidden="true"><Icon name={project.glyph} /></span>}
        </div>
        <div className="project__meta">
          <h3>{project.title}</h3>
          <small>{project.industry}</small>
        </div>
        <p>{project.summary}</p>
        <div className="chip-row">
          {project.services.map((s) => (<Badge className="chip" key={s}>{s}</Badge>))}
        </div>
      </Link>
    </Reveal>
  );
}

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase();
}

export function TeamGrid({ members = team }: { members?: TeamMember[] }) {
  return (
    <div className="team-grid">
      {members.map((m, i) => (
        <Reveal key={m.id} delay={i * 60}>
          <article className="member">
            <div className={`member__photo ${tintClass(m.tint)}`}>
              {m.photo ? <img src={m.photo} alt={`Portrait of ${m.name}`} loading="lazy" /> : <span aria-hidden="true">{m.isPlaceholder ? '?' : initials(m.name)}</span>}
              {m.isPlaceholder && <span className="badge-demo">Placeholder</span>}
            </div>
            <h3>{m.name}</h3>
            <p className="member__role">{m.role}</p>
            <p style={{ color: 'var(--ink-soft)', fontSize: '0.95rem' }}>{m.bio}</p>
            <div className="chip-row">{m.skills.map((s) => (<Badge className="chip" key={s}>{s}</Badge>))}</div>
            {m.links && m.links.length > 0 && (
              <p style={{ marginTop: 12 }}>
                {m.links.map((l) => (
                  <a key={l.href} className="link-arrow" href={l.href} target="_blank" rel="noopener noreferrer" style={{ marginRight: 14 }}>{l.label} <Icon name="upright" /></a>
                ))}
              </p>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

function Stars({ n }: { n: number }) {
  return <div className="stars" role="img" aria-label={`${n} out of 5 stars`}>{[1, 2, 3, 4, 5].map((i) => <Icon key={i} name="star" className={i <= n ? 'star on' : 'star'} />)}</div>;
}

export function ReviewCard({ r }: { r: Review }) {
  const tints: Tint[] = ['lilac', 'peach', 'sky', 'blush', 'butter', 'mist'];
  const tint = tints[r.id.length % tints.length];
  return (
    <figure className="card review" style={{ margin: 0 }}>
      <Stars n={r.rating} />
      <blockquote>“{r.quote}”</blockquote>
      <footer>
        <span className={`avatar ${tintClass(tint)}`} aria-hidden="true">{initials(r.name)}</span>
        <div>
          <strong>{r.name}</strong>
          <div style={{ fontSize: '0.86rem', color: 'var(--muted)' }}>{[r.role, r.company].filter(Boolean).join(' · ')}{r.project ? ` — ${r.project}` : ''}</div>
        </div>
      </footer>
    </figure>
  );
}

/** Shows genuine reviews if any exist; otherwise shows how working with CDS looks (never invented testimonials). */
export function ReviewsBlock({ limit }: { limit?: number }) {
  const list = limit ? reviews.slice(0, limit) : reviews;
  if (list.length > 0) {
    return (
      <div className="grid grid--3">
        {list.map((r, i) => (<Reveal key={r.id} delay={i * 60}><ReviewCard r={r} /></Reveal>))}
      </div>
    );
  }
  return (
    <>
      <div className="grid grid--4">
        {workingWithUs.map((w, i) => (
          <Reveal key={w.title} delay={i * 60}>
            <Card style={{ height: '100%' }}>
              <span className="eyebrow" style={{ marginBottom: 10 }}>0{i + 1}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
      <p style={{ marginTop: 22, color: 'var(--muted)', fontSize: '0.92rem' }}>
        Client reviews will appear here as projects wrap up. Worked with us? <Link className="link-arrow" to="/reviews">Share your feedback</Link>
      </p>
    </>
  );
}

export function CtaBanner({ title = 'Have something good in mind?', text = "Tell us what you're building. We'll help you figure out the next step." }: { title?: string; text?: string }) {
  return (
    <section className="section--tight">
      <div className="container">
        <Reveal>
          <div className="banner">
            <div className="banner__deco" aria-hidden="true" />
            <span className="eyebrow" style={{ color: 'var(--peach)' }}>Let’s build</span>
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="ctas">
              <Button asChild><Link to="/contact">Start a Project <Icon name="upright" /></Link></Button>
              <Button variant="outline" asChild><a href={`mailto:${site.email}`}>Email Us</a></Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


