import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { SideNav } from './SideNav';
import { useThemeStore } from '../../store/themeStore';

export const MainLayout: React.FC = () => {
  const { navigation } = useThemeStore();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {navigation.type === 'top' ? (
        <>
          <Navbar />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <Outlet />
            </div>
          </main>
        </>
      ) : (
        <div className="flex h-screen overflow-hidden relative">
          <SideNav />
          <div className="flex-1 overflow-auto relative">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
};