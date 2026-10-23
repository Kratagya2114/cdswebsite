import { Card } from '../components/ui/card';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { CtaBanner, PageHero, SectionHead, TeamGrid } from '../components/blocks';
import { process, site, values } from '../data/site';
import { team } from '../data/team';

/** EDIT ME — the founder story. Rewrite freely so it matches the real journey. */
const story = [
  `Crafting Digital Solution began with a simple frustration. Too many business owners were being handed websites and software they couldn’t understand, couldn’t update and couldn’t reach anyone about once the invoice was paid.`,
  `${site.founder} started CDS to do it differently: a small, young team that builds with modern tools, explains every decision in plain language, and stays around after launch. The idea was never to be the biggest agency, but the one clients actually enjoy working with.`,
  `Today CDS covers the full journey, from design and development to testing, AI automation, ERP work and growth, because real businesses don’t have a “frontend problem” or a “backend problem”. They have goals. We start there, and work backwards to the technology.`,
];

const differences = [
  'One team for design, code, QA, AI and marketing, so nothing is lost in handoffs.',
  'Founder-led: you speak with the people actually doing the work.',
  'Modern, Gen-Z-fluent approach to product, interfaces and tools.',
  'Honest scoping: we’ll tell you when something isn’t worth building.',
];

export default function About() {
  return (
    <div className="page">
      <Seo path="/about" />
      <PageHero
        eyebrow="About us"
        title="We’re here to build something that works."
        lead={`${site.name} is a young, ambitious team that designs and builds digital products and helps businesses grow online.`}
      />

      <section className="section--tight">
        <div className="container split">
          <div><span className="eyebrow">Our story</span><h2>Why CDS exists</h2></div>
          <div className="story">
            {story.map((p, i) => (<Reveal key={i} delay={i * 80}><p>{p}</p></Reveal>))}
            <p style={{ fontWeight: 600, color: 'var(--ink)' }}>— {site.founder}, Founder</p>
          </div>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container grid grid--2">
          <Reveal><Card className="tint-lilac" style={{ height: '100%', borderColor: 'var(--ink)' }}><span className="eyebrow">Mission</span><h3 style={{ fontSize: '1.4rem' }}>To turn ambitious ideas into digital experiences that are useful, dependable and a pleasure to use.</h3></Card></Reveal>
          <Reveal delay={80}><Card className="tint-peach" style={{ height: '100%', borderColor: 'var(--ink)' }}><span className="eyebrow">Vision</span><h3 style={{ fontSize: '1.4rem' }}>To be the technology partner growing businesses trust first — modern, honest and always within reach.</h3></Card></Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Philosophy" title="Design and engineering, side by side" />
          <div className="grid grid--2">
            <Reveal><Card><h3><Icon name="palette" /> Thoughtful design</h3><p>We design for the people using the product, not for design awards. Clear hierarchy, accessible colour and type, and interfaces that explain themselves.</p></Card></Reveal>
            <Reveal delay={80}><Card><h3><Icon name="wrench" /> Dependable engineering</h3><p>Clean, maintainable code with testing built in. We choose boring, proven foundations where it counts and modern tools where they genuinely help.</p></Card></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container">
          <SectionHead eyebrow="Values" title="What we stand for" />
          <div className="grid grid--4">
            {values.map((v, i) => (<Reveal key={v.title} delay={i * 60}><Card style={{ height: '100%' }}><h3>{v.title}</h3><p>{v.text}</p></Card></Reveal>))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div><span className="eyebrow">How we work with clients</span><h2>Simple, visible, collaborative</h2></div>
          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {process.map((s) => (<li key={s.n} className="check-list" style={{ borderBottom: '1px solid var(--line)', padding: '14px 0' }}><strong>{s.n} · {s.title}</strong><br /><span style={{ color: 'var(--ink-soft)' }}>{s.text}</span></li>))}
          </ol>
        </div>
      </section>

      <section className="section section--tinted">
        <div className="container split">
          <div><span className="eyebrow">What makes us different</span><h2>Not another agency template</h2></div>
          <ul className="check-list">{differences.map((d) => (<li key={d}>{d}</li>))}</ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Team" title="The people behind CDS"><Link to="/team" className="link-arrow">Full team <Icon name="upright" /></Link></SectionHead>
          <TeamGrid members={team.slice(0, 3)} />
        </div>
      </section>

      <CtaBanner title="Let’s start a conversation." text="No pressure, no jargon — just tell us what you’re working on." />
    </div>
  );
}
