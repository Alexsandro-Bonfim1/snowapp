import React from 'react';
import { NavLink } from 'react-router-dom';
import { Database, LayoutDashboard, Settings, Users, Warehouse, Cloud } from 'lucide-react';

const navItems = [
  { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/' },
  { icon: <Warehouse className="w-5 h-5" />, label: 'Warehouses', path: '/warehouses' },
  { icon: <Database className="w-5 h-5" />, label: 'Databases', path: '/databases' },
  { icon: <Users className="w-5 h-5" />, label: 'Users', path: '/users' },
  { icon: <Cloud className="w-5 h-5" />, label: 'Cloud', path: '/cloud' },
  { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#0C3B5E] h-screen fixed left-0 top-0 text-white p-4">
      <div className="flex items-center gap-2 mb-8">
        <Database className="w-8 h-8" />
        <span className="text-xl font-bold">SnowApp</span>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 w-full rounded-lg transition-colors ${
                    isActive ? 'bg-[#164B78]' : 'hover:bg-[#164B78]'
                  }`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;