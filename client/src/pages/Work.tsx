import { useMemo, useState } from 'react';
import Seo from '../components/Seo';
import { CtaBanner, PageHero, ProjectCard } from '../components/blocks';
import { projectFilters, projects } from '../data/projects';

export default function Work() {
  const [filter, setFilter] = useState<(typeof projectFilters)[number]>('All');
  const list = useMemo(() => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)), [filter]);

  return (
    <div className="page">
      <Seo path="/work" />
      <PageHero eyebrow="Our work" title="Selected projects & case studies." lead="A look at how we approach different kinds of problems.">
        <p className="note" style={{ marginTop: 18, maxWidth: 640 }}>The projects shown are <strong>illustrative demo concepts</strong> marked as such. They are not real client work and will be replaced as genuine case studies are added.</p>
      </PageHero>
      <section className="section--tight">
        <div className="container">
          <div className="filters" role="group" aria-label="Filter projects by category">
            {projectFilters.map((f) => (
              <button key={f} className="filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <p className="sr-only" role="status">{list.length} project{list.length === 1 ? '' : 's'} shown</p>
          {list.length === 0 ? (
            <p>No projects in this category yet.</p>
          ) : (
            <div className="work-grid" key={filter}>
              {list.map((p, i) => (<ProjectCard key={p.slug} project={p} index={i} />))}
            </div>
          )}
        </div>
      </section>
      <CtaBanner title="Want to see your idea here?" />
    </div>
  );
}
