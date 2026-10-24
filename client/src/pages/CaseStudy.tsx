import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Icon from '../components/Icon';
import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { CtaBanner, tintClass } from '../components/blocks';
import { getProject, projects } from '../data/projects';
import NotFound from './NotFound';

/** Reusable case-study template — add a project in data/projects.ts and this page renders it. */
export default function CaseStudy() {
  const { slug = '' } = useParams();
  const p = getProject(slug);
  if (!p) return <NotFound />;

  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const Block = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <Reveal><section className="section--tight"><div className="container split"><div><span className="eyebrow">{label}</span></div><div>{children}</div></div></section></Reveal>
  );

  return (
    <div className="page">
      <Seo title={`${p.title} — Case study | CDS`} description={p.summary} />
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb"><Link to="/work"><Icon name="left" /> All work</Link></div>
          <div className="chip-row" style={{ marginBottom: 16 }}>
            <Badge className="chip">{p.category}</Badge><Badge className="chip">{p.industry}</Badge>
            {p.isDemo && <span className="badge-demo">Illustrative demo — not real client work</span>}
          </div>
          <h1>{p.title}</h1>
          <p className="lead">{p.overview}</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className={`project__cover project__cover--wide ${p.image ? 'project__cover--img' : ''} ${tintClass(p.tint)}`}>
            {p.image ? <img src={p.image} alt={`${p.title} preview`} /> : <span className="glyph" aria-hidden="true"><Icon name={p.glyph} /></span>}
          </div>
          {(p.liveUrl || p.repoUrl) && (
            <div className="chip-row" style={{ marginTop: 18 }}>
              {p.liveUrl && <Button size="sm" asChild><a href={p.liveUrl} target="_blank" rel="noopener noreferrer">View live site <Icon name="upright" /></a></Button>}
              {p.repoUrl && <Button variant="outline" size="sm" asChild><a href={p.repoUrl} target="_blank" rel="noopener noreferrer">Source code <Icon name="upright" /></a></Button>}
            </div>
          )}
        </div>
      </section>

      <Block label="Project type"><p className="lead">{p.clientType}</p><div className="chip-row">{p.services.map((s) => (<Badge className="chip" key={s}>{s}</Badge>))}</div></Block>
      <Block label="Business challenge"><p className="lead">{p.challenge}</p></Block>
      <Block label="Goals & constraints"><ul className="check-list">{p.goals.map((g) => (<li key={g}>{g}</li>))}</ul></Block>
      <Block label="Research & strategy"><p className="lead">{p.strategy}</p></Block>
      <Block label="Design direction"><p className="lead">{p.design}</p></Block>
      <Block label="Development & stack"><p className="lead">{p.development}</p><div className="chip-row">{p.stack.map((s) => (<Badge className="chip" key={s}>{s}</Badge>))}</div></Block>

        {/* <Reveal>
          <section className="section--tight">
            <div className="container">
              <span className="eyebrow">Visual gallery</span>
              <div className="gallery">
                {p.gallery.map((g) => (
                  <figure key={g.caption}>{g.image ? <img className="shot shot--img" src={g.image} alt={g.caption} loading="lazy" /> : <div className={`shot ${tintClass(g.tint)}`} role="img" aria-label={`${g.caption} (placeholder visual)`}><Icon name={p.glyph} /></div>}<figcaption>{g.caption}</figcaption></figure>
                ))}
              </div>
            </div>
          </section>
        </Reveal> */}

      {p.results && p.results.length > 0 && <Block label="Results"><ul className="check-list">{p.results.map((r) => (<li key={r}>{r}</li>))}</ul></Block>}
      <Block label="Lessons learned"><ul className="check-list">{p.lessons.map((l) => (<li key={l}>{l}</li>))}</ul></Block>

      <section className="section--tight">
        <div className="container pager">
          <Link to={`/work/${prev.slug}`} className="card"><small><Icon name="left" /> Previous</small><strong>{prev.title}</strong></Link>
          <Link to={`/work/${next.slug}`} className="card"><small>Next <Icon name="right" /></small><strong>{next.title}</strong></Link>
        </div>
      </section>

      <CtaBanner title="Want something similar?" text="Tell us about your project and we’ll discuss how we’d approach it." />
    </div>
  );
}
