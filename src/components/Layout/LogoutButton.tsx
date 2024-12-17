import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const LogoutButton: React.FC = () => {
  const { t } = useTranslation('dashboard');
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-red-600 hover:text-red-700"
      aria-label={t('navigation.logout')}
    >
      <LogOut className="w-5 h-5" />
      <span>{t('navigation.logout')}</span>
    </button>
  );
};