import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import Seo from '../components/Seo';
import Reveal from '../components/Reveal';
import { CtaBanner, PageHero, tintClass } from '../components/blocks';
import { techGroups } from '../data/techstack';

export default function TechStack() {
  return (
    <div className="page">
      <Seo path="/tech-stack" />
      <PageHero
        eyebrow="Languages & frameworks"
        title="The tools we build with."
        lead="We pick the right tool for the job, not the trendiest one. Here’s what we work with across web, mobile, AI, QA, ERP and more."
      />
      <section className="section--tight">
        <div className="container grid grid--3">
          {techGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 60}>
              <Card className="tech-card" style={{ height: '100%' }}>
                <div>
                  <span className={`chip chip--tint ${tintClass(g.tint)}`}>{g.title}</span>
                  <p style={{ marginTop: 12 }}>{g.blurb}</p>
                </div>
                <div className="chip-row">
                  {g.items.map((t) => (<Badge className="chip" key={t}>{t}</Badge>))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
        {/*  */}
      </section>
      <CtaBanner title="Have a specific stack in mind?" text="Tell us the languages, frameworks or platforms you want to use and we’ll take it from there." />
    </div>
  );
}
