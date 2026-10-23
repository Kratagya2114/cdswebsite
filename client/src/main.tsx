import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';

// Standalone preview builds (VITE_HASH_ROUTER=1) use hash routing so they work from any static URL.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter;
import App from './App';
import './styles.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
);
