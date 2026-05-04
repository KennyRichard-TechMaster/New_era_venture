import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SiteProvider } from './context/SiteContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteProvider>
      <App />
    </SiteProvider>
  </StrictMode>
);
