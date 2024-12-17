import React from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Users } from './Users';
import { UserDetails } from './UserDetails';
import { Roles } from './Roles';
import { RoleDetails } from './RoleDetails';
import { Modules } from './Modules';

export const UserManagement: React.FC = () => {
  return (
    <Routes>
      <Route path="users" element={<Users />} />
      <Route path="users/:id" element={<UserDetails />} />
      <Route path="roles" element={<Roles />} />
      <Route path="roles/:id" element={<RoleDetails />} />
      <Route path="modules" element={<Modules />} />
      <Route path="*" element={<Navigate to="users" replace />} />
    </Routes>
  );
};