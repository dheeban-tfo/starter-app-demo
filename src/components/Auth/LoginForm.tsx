import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../../hooks/useLogin';
import { LoginFormFields } from './LoginFormFields';
import { ErrorMessage } from '../Common/ErrorMessage';
import { LoadingButton } from '../Common/LoadingButton';

export const LoginForm: React.FC = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useLogin();
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const formData = new FormData(e.currentTarget);
    const credentials = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      tenantId: formData.get('tenantId') as string,
    };

    try {
      await login(credentials);
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(t('login.error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {t('login.title')}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <LoginFormFields />
          {(error || formError) && <ErrorMessage message={error || formError} />}
          <LoadingButton
            isLoading={isLoading}
            text={t('login.submit')}
            loadingText={t('login.submitting')}
          />
        </form>
      </div>
    </div>
  );
};