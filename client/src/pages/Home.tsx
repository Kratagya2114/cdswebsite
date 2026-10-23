import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { CtaBanner, ProjectCard, ReviewsBlock, SectionHead, ServiceRows, TeamGrid, tintClass } from '../components/blocks';
import { capabilities, process, site, whyChooseUs } from '../data/site';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { team } from '../data/team';

export default function Home() {
  const marquee = [...capabilities, ...capabilities];
  return (
    <div className="page">
      <Seo path="/" />

      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div>
            <h1>
              Good ideas deserve <em>better</em> digital <span className="accent">experiences.</span>
            </h1>
            <p className="lead">
              <strong>{site.name}</strong> designs, builds and scales web, app, AI and enterprise products for businesses ready to move forward — with Gen-Z energy and modern tech.
            </p>
            <div className="hero__ctas">
              <Button asChild><Link to="/contact">Start a Project <Icon name="upright" /></Link></Button>
              <Button variant="outline" type="button" onClick={() => document.getElementById('featured-work')?.scrollIntoView({ behavior: 'smooth' })}>Explore Our Work <Icon name="down" /></Button>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <div className="code-window">
              <div className="code-window__bar"><i /><i /><i /><span>cds.config.ts</span></div>
              <pre>
{`const `}<span className="k">studio</span>{` = {
  name: `}<span className="s">"Crafting Digital Solution"</span>{`,
  builds: [`}<span className="s">"web"</span>{`, `}<span className="s">"apps"</span>{`, `}<span className="s">"AI agents"</span>{`],
  quality: `}<span className="s">"tested, always"</span>{`,
  vibe: `}<span className="s">"modern & human"</span>{`,
};

`}<span className="c">{`// next: your idea`}</span>{`
ship(`}<span className="k">idea</span>{`)`}<span className="caret" />
              </pre>
            </div>
            <span className="sticker sticker--1"><Icon name="rocket" /> Web + App</span>
            <span className="sticker sticker--2"><Icon name="bot" /> AI Agents</span>
            <span className="sticker sticker--3"><Icon name="palette" /> UI/UX</span>
          </div>
        </div>
      </section>

      {/* Capability strip */}
      <div className="marquee" aria-label="Our capabilities">
        <div className="marquee__track">
          {marquee.map((c, i) => (<span className="marquee__item" key={`${c}-${i}`} aria-hidden={i >= capabilities.length}>{c}</span>))}
        </div>
      </div>

      {/* Why choose us */}
      <section className="section" id="why-us">
        <div className="container">
          <SectionHead eyebrow="Why choose us" title="Six reasons teams pick CDS" />
          <div className="grid grid--3">
            {whyChooseUs.map((w, i) => (
              <Reveal key={w.title} delay={(i % 3) * 70}>
                <Card style={{ height: '100%' }}>
                  <div className={`icon-tile ${tintClass(w.tint)}`} aria-hidden="true"><Icon name={w.icon} /></div>
                  <h3>{w.title}</h3>
                  <p>{w.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured work */}
      <section className="section section--tinted" id="featured-work">
        <div className="container">
          <SectionHead eyebrow="Selected work" title="Projects we like to talk about">
            <Link to="/work" className="link-arrow">View All Projects <Icon name="upright" /></Link>
          </SectionHead>
          
          <div className="work-grid">
            {projects.slice(0, 4).map((p, i) => (<ProjectCard key={p.slug} project={p} index={i} />))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="container">
          <SectionHead eyebrow="What we do" title="Everything digital, under one roof">
            <Link to="/services" className="link-arrow">All services <Icon name="upright" /></Link>
          </SectionHead>
          <ServiceRows items={services.slice(0, 9)} />
          <p style={{ marginTop: 24 }}>
            …plus {services.length - 9} more including Python, Java, ERP/SAP, CA automation and maintenance. <Link className="link-arrow" to="/services">See the full list</Link>
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="section section--tinted">
        <div className="container">
          <SectionHead eyebrow="Our approach" title="From rough idea to real impact." />
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

      {/* Tech stack teaser */}
      <section className="section--tight">
        <div className="container">
          <Reveal>
            <Card style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', justifyContent: 'space-between', background: 'var(--sky)' }}>
              <div style={{ maxWidth: 560 }}>
                <h3>React, Node, Python, Java, Flutter, SAP, Figma, Gemini &amp; more</h3>
                <p>See every language and framework we work with, grouped by what they’re used for.</p>
              </div>
              <Button variant="dark" asChild><Link to="/tech-stack">Explore Tech Stack <Icon name="upright" /></Link></Button>
            </Card>
          </Reveal>
        </div>
      </section>

      

      {/* About preview */}
      <section className="section section--tinted">
        <div className="container split">
          <div>
            <span className="eyebrow">About CDS</span>
            <p className="statement"><span>We’re not here to add another website to the internet.</span> We’re here to build something that works.</p>
          </div>
          <div>
            <p className="lead">Thoughtful design, dependable engineering, honest collaboration and measurable business value — that’s the whole philosophy. CDS was founded by {site.founder} to give ambitious businesses a technology partner they can actually talk to.</p>
            <Link to="/about" className="link-arrow">Read our story <Icon name="upright" /></Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Client feedback" title="What working with us looks like">
            <Link to="/reviews" className="link-arrow">Client feedback <Icon name="upright" /></Link>
          </SectionHead>
          <ReviewsBlock limit={3} />
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
