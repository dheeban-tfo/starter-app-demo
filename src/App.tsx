import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes';
import { useThemeStore } from './store/themeStore';
import { useAuthStore } from './store/authStore';
import './i18n/config';
import './styles/theme.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) {
      queryClient.clear();
    }
  }, [isAuthenticated, queryClient]);

  return <AppRoutes />;
};

function App() {
  const { mode, direction, font, language, colors } = useThemeStore();

  React.useEffect(() => {
    const root = document.documentElement;
    
    // Apply initial colors
    const currentColors = colors[mode];
    Object.entries(currentColors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    document.documentElement.className = `font-${font}`;
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode, direction, font, language, colors]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'dark:bg-gray-800 dark:text-white',
            duration: 3000,
            style: {
              background: 'var(--color-background)',
              color: 'var(--color-text)',
              border: '1px solid var(--color-primary)',
            },
          }}
        />
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;