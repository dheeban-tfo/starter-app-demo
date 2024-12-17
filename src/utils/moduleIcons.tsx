import React from 'react';
import { LayoutDashboard, Users, Building2, CalendarRange } from 'lucide-react';

export const getModuleIcon = (moduleName: string) => {
  switch (moduleName) {
    case 'UserManagement':
      return <Users className="w-5 h-5" />;
    case 'CommunityManagement':
      return <Building2 className="w-5 h-5" />;
    case 'FacilityManagement':
      return <Building2 className="w-5 h-5" />;
    case 'FacilityBooking':
      return <CalendarRange className="w-5 h-5" />;
    default:
      return <LayoutDashboard className="w-5 h-5" />;
  }
};