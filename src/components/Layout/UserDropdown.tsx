import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

export const UserDropdown: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { navigation } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const adjustDropdownPosition = useCallback(() => {
    if (!menuRef.current || !buttonRef.current) return;
    
    const menu = menuRef.current;
    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const rect = menu.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const menuHeight = rect.height;
    
    if (spaceBelow < menuHeight && buttonRect.top > menuHeight) {
      // Position above if there's more space
      menu.style.bottom = '100%';
      menu.style.top = 'auto';
      menu.style.marginBottom = '0.5rem';
    } else {
      // Position below
      menu.style.top = '100%';
      menu.style.bottom = 'auto';
      menu.style.marginTop = '0.5rem';
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      adjustDropdownPosition();
    }
  }, [isOpen, adjustDropdownPosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className={`relative ${navigation?.collapsed ? 'w-10' : 'w-full'}`}
      ref={dropdownRef}
    >
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="relative w-full flex items-center justify-start space-x-2 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <User className="w-5 h-5 shrink-0" />
        {(!navigation?.collapsed || navigation?.type === 'top') && (
          <span className="truncate">{user?.name}</span>
        )}
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={`absolute ${
            navigation?.type === 'side' && navigation?.collapsed
              ? 'left-full ml-2 top-0'
              : navigation?.type === 'side'
              ? 'left-0 top-full mt-2'
              : 'right-0 top-full mt-2'
          } min-w-[200px] rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-[100]`}
        >
          <div className="py-1" role="menu">
            <button
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              {t('navigation.profile')}
            </button>
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              role="menuitem"
            >
              <div className="flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>{t('navigation.logout')}</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};