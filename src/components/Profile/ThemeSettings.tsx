import React from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Type, Languages, Palette, RotateCcw, Layout, PanelLeft } from 'lucide-react';
import { useThemeStore } from '../../store/themeStore';
import { ColorPicker } from '../Common/ColorPicker';
import type { ThemeMode, Direction, FontFamily, Language } from '../../types/theme';

export const ThemeSettings: React.FC = () => {
  const { t, i18n } = useTranslation('profile');
  const themeStore = useThemeStore();

  const handleModeChange = (mode: ThemeMode) => {
    themeStore.setTheme({ mode });
  };
  
  const handleColorChange = (colorKey: string, value: string) => {
    const { colors, mode } = themeStore;
    const newColors = {
      ...colors,
      [mode]: {
        ...colors[mode],
        [colorKey]: value,
      },
    };
    themeStore.setTheme({ colors: newColors });
  };

  const handleDirectionChange = (direction: Direction) => {
    themeStore.setTheme({ direction });
  };

  const handleFontChange = (font: FontFamily) => {
    themeStore.setTheme({ font });
    document.documentElement.className = `font-${font}`;
  };

  const handleLanguageChange = (language: Language) => {
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    const font = language === 'ar' ? 'cairo' : 'inter';
    themeStore.setTheme({ language, direction, font });
    i18n.changeLanguage(language);
  };

  const handleNavigationChange = (type: NavigationType) => {
    themeStore.setTheme({
      navigation: {
        type,
        collapsed: false,
      },
    });
  };

  const handleReset = () => {
    const defaultTheme = {
      mode: 'light' as ThemeMode,
      direction: 'ltr' as Direction,
      font: 'inter' as FontFamily,
      language: 'en' as Language,
      navigation: {
        type: 'top' as NavigationType,
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
    
    themeStore.setTheme(defaultTheme);
    i18n.changeLanguage('en');
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('themeSettings.title')}
        </h2>
        <button
          onClick={handleReset}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          title={t('themeSettings.reset')}
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {t('themeSettings.reset')}
        </button>
      </div>
      
      <div className="space-y-6">
        {/* Theme Mode */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('themeSettings.mode')}
          </label>
          <div className="mt-2 flex space-x-4">
            <button
              onClick={() => handleModeChange('light')}
              className={`flex items-center px-4 py-2 rounded-md ${
                themeStore.mode === 'light'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Sun className="w-4 h-4 mr-2" />
              {t('themeSettings.light')}
            </button>
            <button
              onClick={() => handleModeChange('dark')}
              className={`flex items-center px-4 py-2 rounded-md ${
                themeStore.mode === 'dark'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Moon className="w-4 h-4 mr-2" />
              {t('themeSettings.dark')}
            </button>
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            <Palette className="w-4 h-4 mr-2" />
            {t('themeSettings.colorSettings')}
          </label>
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              label={t('themeSettings.colorLabels.primary')}
              value={themeStore.colors[themeStore.mode].primary}
              onChange={(color) => handleColorChange('primary', color)}
            />
            <ColorPicker
              label={t('themeSettings.colorLabels.secondary')}
              value={themeStore.colors[themeStore.mode].secondary}
              onChange={(color) => handleColorChange('secondary', color)}
            />
            <ColorPicker
              label={t('themeSettings.colorLabels.background')}
              value={themeStore.colors[themeStore.mode].background}
              onChange={(color) => handleColorChange('background', color)}
            />
            <ColorPicker
              label={t('themeSettings.colorLabels.text')}
              value={themeStore.colors[themeStore.mode].text}
              onChange={(color) => handleColorChange('text', color)}
            />
            <ColorPicker
              label={t('themeSettings.colorLabels.accent')}
              value={themeStore.colors[themeStore.mode].accent}
              onChange={(color) => handleColorChange('accent', color)}
            />
          </div>
        </div>

        {/* Navigation Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('themeSettings.navigation')}
          </label>
          <div className="mt-2 flex space-x-4">
            <button
              onClick={() => handleNavigationChange('top')}
              className={`flex items-center px-4 py-2 rounded-md ${
                themeStore.navigation.type === 'top'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Layout className="w-4 h-4 mr-2" />
              {t('themeSettings.navigationTypes.top')}
            </button>
            <button
              onClick={() => handleNavigationChange('side')}
              className={`flex items-center px-4 py-2 rounded-md ${
                themeStore.navigation.type === 'side'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <PanelLeft className="w-4 h-4 mr-2" />
              {t('themeSettings.navigationTypes.side')}
            </button>
          </div>
        </div>

        {/* Font Family */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('themeSettings.font')}
          </label>
          <div className="mt-2 grid grid-cols-3 gap-4">
            {['inter', 'roboto', 'cairo'].map((font) => (
              <button
                key={font}
                onClick={() => handleFontChange(font as FontFamily)}
                className={`flex items-center px-4 py-2 rounded-md ${
                  themeStore.font === font
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <Type className="w-4 h-4 mr-2" />
                {t(`themeSettings.fonts.${font}`)}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('themeSettings.language')}
          </label>
          <div className="mt-2 flex space-x-4">
            <button
              onClick={() => handleLanguageChange('en')}
              className={`flex items-center px-4 py-2 rounded-md ${
                themeStore.language === 'en'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Languages className="w-4 h-4 mr-2" />
              {t('themeSettings.languages.en')}
            </button>
            <button
              onClick={() => handleLanguageChange('ar')}
              className={`flex items-center px-4 py-2 rounded-md ${
                themeStore.language === 'ar'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Languages className="w-4 h-4 mr-2" />
              {t('themeSettings.languages.ar')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};