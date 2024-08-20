import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
  const location = useLocation();

  const getLinkClassName = (path) => {
    return location.pathname === path
      ? 'block p-3 rounded-lg bg-gray-700 text-white font-semibold shadow-md'
      : 'block p-3 rounded-lg hover:bg-gray-700 hover:text-white transition-colors duration-300';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <nav className="w-64 bg-gray-800 text-white flex-shrink-0">
        <div className="p-4 h-full flex flex-col">
          <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
          <ul className="flex-1 space-y-2 overflow-y-auto">
            <li>
              <Link to="/sales-over-time" className={getLinkClassName('/sales-over-time')}>
                Sales Over Time
              </Link>
            </li>
            <li>
              <Link to="/sales-growth-rate" className={getLinkClassName('/sales-growth-rate')}>
                Sales Growth Rate
              </Link>
            </li>
            <li>
              <Link to="/new-customers" className={getLinkClassName('/new-customers')}>
                New Customers
              </Link>
            </li>
            <li>
              <Link to="/repeat-customers" className={getLinkClassName('/repeat-customers')}>
                Repeat Customers
              </Link>
            </li>
            <li>
              <Link to="/geographical-distribution" className={getLinkClassName('/geographical-distribution')}>
                Geographical Distribution
              </Link>
            </li>
            <li>
              <Link to="/lifetime-value-by-cohorts" className={getLinkClassName('/lifetime-value-by-cohorts')}>
                Lifetime Value by Cohorts
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <main className="flex-1 p-6 bg-gray-100 overflow-hidden">
      </main>
    </div>
  );
};

export default Dashboard;
