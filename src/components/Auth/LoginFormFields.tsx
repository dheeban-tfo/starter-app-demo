import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormField } from '../Common/FormField';

const DEFAULT_VALUES = {
  tenantId: 'alpha',
  email: 'superadmin@example.com',
  password: 'SuperAdminPassword123',
};

export const LoginFormFields: React.FC = () => {
  const { t } = useTranslation('auth');

  return (
    <div className="rounded-md shadow-sm -space-y-px">
      <FormField
        id="tenantId"
        name="tenantId"
        type="text"
        label={t('login.tenantId')}
        defaultValue={DEFAULT_VALUES.tenantId}
        required
      />
      <FormField
        id="email"
        name="email"
        type="email"
        label={t('login.email')}
        defaultValue={DEFAULT_VALUES.email}
        autoComplete="email"
        required
      />
      <FormField
        id="password"
        name="password"
        type="password"
        label={t('login.password')}
        defaultValue={DEFAULT_VALUES.password}
        autoComplete="current-password"
        required
      />
    </div>
  );
};