import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import NewCustomers from './pages/NewCustomers';
import SalesOverTime from './pages/SalesOverTime';
import SalesGrowthRate from './pages/SalesGrowthRate';
import RepeatCustomers from './pages/RepeatCustomers';
import GeographicalDistribution from './pages/GeographicalDistribution';
import LifetimeValueByCohorts from './pages/LifetimeValueByCohorts';

const App = () => {
  return (
    <Router>
      <div className="h-screen w-screen overflow-hidden">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SalesOverTime />} />
            <Route path="sales-over-time" element={<SalesOverTime />} />
            <Route path="sales-growth-rate" element={<SalesGrowthRate />} />
            <Route path="new-customers" element={<NewCustomers />} />
            <Route path="repeat-customers" element={<RepeatCustomers />} />
            <Route path="geographical-distribution" element={<GeographicalDistribution />} />
            <Route path="lifetime-value-by-cohorts" element={<LifetimeValueByCohorts />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
