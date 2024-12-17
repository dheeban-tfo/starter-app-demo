export type ThemeMode = 'light' | 'dark';
export type Direction = 'ltr' | 'rtl';
export type FontFamily = 'inter' | 'roboto' | 'cairo';
export type Language = 'en' | 'ar';
export type NavigationType = 'top' | 'side';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export interface ThemeSettings {
  mode: ThemeMode;
  direction: Direction;
  font: FontFamily;
  language: Language;
  navigation: {
    type: NavigationType;
    collapsed: boolean;
  };
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

export interface ThemeState extends ThemeSettings {
  isDarkMode: () => boolean;
  toggleTheme: () => void;
  setTheme: (settings: Partial<ThemeSettings>) => void;
}