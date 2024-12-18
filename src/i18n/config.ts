import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enAuth from './locales/en/auth.json';
import arAuth from './locales/ar/auth.json';
import enDashboard from './locales/en/dashboard.json';
import arDashboard from './locales/ar/dashboard.json';
import enProfile from './locales/en/profile.json';
import arProfile from './locales/ar/profile.json';
import enNavigation from './locales/en/navigation.json';
import arNavigation from './locales/ar/navigation.json';
import enRoles from './locales/en/roles.json';
import arRoles from './locales/ar/roles.json';
import enModules from './locales/en/modules.json';
import arModules from './locales/ar/modules.json';
import enUsers from './locales/en/users.json';
import arUsers from './locales/ar/users.json';
import enCommunity from './locales/en/community.json';
import arCommunity from './locales/ar/community.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      auth: enAuth,
      dashboard: enDashboard,
      profile: enProfile,
      navigation: enNavigation,
      roles: enRoles,
      modules: enModules,
      users: enUsers,
      community: enCommunity
    },
    ar: {
      auth: arAuth,
      dashboard: arDashboard,
      profile: arProfile,
      navigation: arNavigation,
      roles: arRoles,
      modules: arModules,
      users: arUsers,
      community: arCommunity
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;