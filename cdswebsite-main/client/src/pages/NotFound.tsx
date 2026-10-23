import { Button } from '../components/ui/button';
import Icon from '../components/Icon';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFound() {
  return (
    <div className="page">
      <Seo title="Page not found — CDS" description="The page you’re looking for doesn’t exist." />
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">404</span>
          <h1>That page wandered off.</h1>
          <p className="lead">The link may be broken or the page may have moved.</p>
          <div className="ctas"><Button asChild><Link to="/">Back home <Icon name="upright" /></Link></Button><Button variant="outline" asChild><Link to="/services">See services</Link></Button></div>
        </div>
      </section>
    </div>
  );
}
