import { useEffect } from 'react';
import { pageMeta } from '../data/site';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

interface Props {
  path?: string;
  title?: string;
  description?: string;
}

/** Sets page-specific <title>, description and Open Graph tags. */
export default function Seo({ path, title, description }: Props) {
  const fallback = path ? pageMeta[path] : undefined;
  const t = title ?? fallback?.title ?? 'Infincode';
  const d = description ?? fallback?.description ?? '';
  useEffect(() => {
    document.title = t;
    setMeta('meta[name="description"]', 'name', 'description', d);
    setMeta('meta[property="og:title"]', 'property', 'og:title', t);
    setMeta('meta[property="og:description"]', 'property', 'og:description', d);
  }, [t, d]);
  return null;
}
