import Icon from './Icon';
import { Link } from 'react-router-dom';
import { nav, site } from '../data/site';
import { services } from '../data/services';

export default function Footer() {
  const year = new Date().getFullYear();
  const topServices = services.slice(0, 7);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__big">Crafting<br />Digital <span>Solution.</span></div>
            <p style={{ marginTop: 18, maxWidth: '44ch', color: '#cfcbe3' }}>{site.tagline}</p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
              ))}
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              {topServices.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
              <li><Link to="/services">All services <Icon name="right" /></Link></li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li><a href={`mailto:${site.email}`}>Email us</a></li>
              {site.socials.map((s) => (
                <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
              ))}
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {year} {site.name}. All rights reserved.</span>
          <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Back to top <Icon name="up" />
          </button>
        </div>
      </div>
    </footer>
  );
}
