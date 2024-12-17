import React from 'react';
import { Menu, PanelLeft, Layout } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { UserDropdown } from './UserDropdown';
import { Navigation } from './Navigation';
import { useThemeStore } from '../../store/themeStore';

export const Navbar: React.FC = () => {
  const { setTheme } = useThemeStore();

  const toggleNavType = () => {
    setTheme({
      navigation: {
        type: 'side',
        collapsed: false,
      },
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold dark:text-white mr-8">Logo</span>
            <div className="hidden md:flex items-center space-x-4">
              <Navigation />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleNavType}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              title="Switch to side navigation"
            >
              <PanelLeft className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
        <div className="md:hidden py-2">
          <Navigation />
        </div>
      </div>
    </nav>
  );
};