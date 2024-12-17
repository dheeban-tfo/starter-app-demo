import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';

export const ThemeToggle: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const { mode, toggleTheme } = useThemeStore();
  const isDarkMode = mode === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
      aria-label={t('theme.toggle')}
      title={isDarkMode ? t('theme.light') : t('theme.dark')}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Moon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
};