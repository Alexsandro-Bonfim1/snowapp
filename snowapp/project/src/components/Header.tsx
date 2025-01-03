import React from 'react';
import { Search } from 'lucide-react';
import NotificationMenu from './Header/NotificationMenu';
import UserMenu from './Header/UserMenu';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search warehouses, databases..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <NotificationMenu />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;