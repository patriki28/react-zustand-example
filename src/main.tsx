import './assets/css/tailwind.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './context/theme-provider';
import AppRoutes from './routes/AppRoutes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={AppRoutes} />
    </ThemeProvider>
  </StrictMode>
);
