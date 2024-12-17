import { create } from 'zustand';

import { ThemeState, ThemeSettings } from '../types/theme';

const getInitialTheme = (): ThemeSettings => {
  const stored = localStorage.getItem('themeSettings');
  if (stored) {
    const parsed = JSON.parse(stored);
    return {
      ...getDefaultTheme(),
      ...parsed,
    };
  }
  return getDefaultTheme();
};

const getDefaultTheme = (): ThemeSettings => {
  return {
    mode: 'light',
    direction: 'ltr',
    font: 'inter',
    language: 'en',
    navigation: {
      type: 'top',
      collapsed: false,
    },
    colors: {
      light: {
        primary: '#3b82f6',
        secondary: '#6b7280',
        background: '#ffffff',
        text: '#111827',
        accent: '#2563eb',
      },
      dark: {
        primary: '#60a5fa',
        secondary: '#9ca3af',
        background: '#111827',
        text: '#f9fafb',
        accent: '#3b82f6',
      },
    },
  };
};

export const useThemeStore = create<ThemeState>((set) => ({
  ...getInitialTheme(),
  isDarkMode: () => useThemeStore.getState().mode === 'dark',
  toggleTheme: () => 
    set((state) => {
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      const newSettings = { ...state, mode: newMode };
      
      // Update CSS variables
      const root = document.documentElement;
      const colors = newSettings.colors[newMode];
      
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      
      // Toggle dark mode class
      root.classList.toggle('dark', newMode === 'dark');
      
      // Save to localStorage
      localStorage.setItem('themeSettings', JSON.stringify(newSettings));
      
      return newSettings;
    }),
  setTheme: (settings) =>
    set((state) => {
      const newSettings = { ...state, ...settings };
      
      // Handle navigation type changes
      if (settings.navigation?.type) {
        newSettings.navigation = {
          ...state.navigation,
          ...settings.navigation,
        };
      }
      
      // Update CSS variables
      const root = document.documentElement;
      const colors = newSettings.colors[newSettings.mode];
      
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty(`--color-${key}`, value);
      });
      
      document.documentElement.dir = newSettings.direction;
      document.documentElement.lang = newSettings.language;
      document.documentElement.className = `font-${newSettings.font}`;
      
      if (newSettings.mode === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      localStorage.setItem('themeSettings', JSON.stringify(newSettings));
      return newSettings;
    }),
}));