import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Warehouses from './pages/Warehouses';
import Databases from './pages/Databases';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Cloud from './pages/Cloud';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64">
          <Header />
          <main className="pt-16 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/warehouses" element={<Warehouses />} />
              <Route path="/databases" element={<Databases />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/cloud" element={<Cloud />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;