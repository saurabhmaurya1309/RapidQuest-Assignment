import React from 'react';
import { Outlet } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

const Layout = () => {
  return (
    <div className="flex h-full overflow-hidden">
      <div className="w-64 bg-gray-800 text-white min-h-screen flex-none">
        <Dashboard /> 
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <Outlet /> 
      </div>
    </div>
  );
};

export default Layout;
