import React from 'react';
import { BarChart3, Database, Server, Users } from 'lucide-react';
import QueryEditor from './QueryEditor/QueryEditor';
import WarehouseManager from './Warehouse/WarehouseManager';

const StatCard = ({ icon: Icon, title, value, change }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-50 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-sm text-gray-600">{title}</h3>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <p className={`text-sm mt-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? '+' : ''}{change}% from last month
        </p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Database} title="Active Databases" value="24" change={12} />
        <StatCard icon={Server} title="Warehouses" value="8" change={-3} />
        <StatCard icon={Users} title="Active Users" value="156" change={8} />
        <StatCard icon={BarChart3} title="Queries Today" value="2.4k" change={15} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <QueryEditor />
        <WarehouseManager />
      </div>
    </div>
  );
};

export default Dashboard;