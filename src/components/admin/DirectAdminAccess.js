import React from 'react';
import AdminDashboard from './AdminDashboard';

const DirectAdminAccess = () => {
  // This component directly renders the AdminDashboard without authentication checks
  console.log("DirectAdminAccess: Rendering AdminDashboard without auth checks");
  return <AdminDashboard />;
};

export default DirectAdminAccess; 