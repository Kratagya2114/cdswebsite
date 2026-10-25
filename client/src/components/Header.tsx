import { Button } from './ui/button';
import Icon from './Icon';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { nav } from '../data/site';

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Infincode — home">
      <img className="logo__mark" src="/infincode-mark.png" alt="" aria-hidden="true" />
      <img className="logo__wordmark" src="/infincode-wordmark.png" alt="Infincode" />
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const burgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll, close on Escape, and move focus into the menu when it opens.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        burgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
          <Logo />
          <nav className="nav" aria-label="Main">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="header__actions">
            <Button size="sm" asChild><Link to="/contact" className="header__cta">Let’s Talk <Icon name="upright" /></Link></Button>
            <Button size="sm" asChild><Link to="/contact" className="header__cta-mobile">Talk <Icon name="upright" /></Link></Button>
            <button
              ref={burgerRef}
              className="burger" type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <Icon name="close" size={22} /> : <Icon name="menu" size={22} />}
            </button>
          </div>
        </div>
      </header>
      <div id="mobile-menu" ref={menuRef} className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open} {...(!open ? { inert: '' as unknown as boolean } : {})}>
        <nav aria-label="Mobile">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `m-link ${isActive ? 'active' : ''}`}>
              {n.label} <span aria-hidden="true"><Icon name="right" /></span>
            </NavLink>
          ))}
        </nav>
        <Button asChild><Link to="/contact">Start a Project <Icon name="upright" /></Link></Button>
      </div>
    </>
  );
}
