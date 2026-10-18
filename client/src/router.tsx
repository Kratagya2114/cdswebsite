import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type ReactElement, type ReactNode } from 'react';

let navState: unknown = null;
const parse = () => {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, hash = ''] = raw.split('#');
  return { pathname: path || '/', hash: hash ? '#' + hash : '', state: navState };
};
const Ctx = createContext(parse());
export function HashRouter({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(parse());
  useEffect(() => {
    const on = () => setLoc(parse());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  return <Ctx.Provider value={loc}>{children}</Ctx.Provider>;
}
export const BrowserRouter = HashRouter;
export const useLocation = () => useContext(Ctx);

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; state?: unknown };
export function Link({ to, state, onClick, ...p }: LinkProps) {
  return <a href={'#' + to} onClick={(e) => { navState = state ?? null; onClick?.(e); }} {...p} />;
}
export function NavLink({ to, end, className, children, ...p }: Omit<LinkProps, 'className'> & { end?: boolean; className?: (a: { isActive: boolean }) => string }) {
  const { pathname } = useLocation();
  const isActive = end ? pathname === to : pathname === to || pathname.startsWith(to + '/');
  return <Link to={to} className={className?.({ isActive })} {...p}>{children}</Link>;
}
const ParamsCtx = createContext<Record<string, string>>({});
export const useParams = () => useContext(ParamsCtx);
export function Route(_p: { path: string; element: ReactNode }) { return null; }
export function Routes({ children }: { children: ReactElement<{ path: string; element: ReactNode }> | ReactElement<{ path: string; element: ReactNode }>[] }) {
  const { pathname } = useLocation();
  const routes = ([] as ReactElement<{ path: string; element: ReactNode }>[]).concat(children);
  for (const r of routes) {
    const { path, element } = r.props;
    if (path === '*') return <>{element}</>;
    const keys: string[] = [];
    const re = new RegExp('^' + path.replace(/:(\w+)/g, (_m, k) => { keys.push(k); return '([^/]+)'; }) + '/?$');
    const m = pathname.match(re);
    if (m) return <ParamsCtx.Provider value={Object.fromEntries(keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]))}>{element}</ParamsCtx.Provider>;
  }
  return null;
}
