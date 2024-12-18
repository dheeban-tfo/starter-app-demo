import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Communities } from './Communities';
import { CommunityDetails } from './CommunityDetails';

export const CommunityManagement: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Communities />} />
      <Route path="/:id" element={<CommunityDetails />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};