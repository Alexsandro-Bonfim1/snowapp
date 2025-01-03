import React from 'react';
import { Server, Database, HardDrive, Trash2 } from 'lucide-react';
import type { CloudResource } from '../../services/cloud/types';

interface ResourceCardProps {
  resource: CloudResource;
  onDelete: (id: string) => void;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, onDelete }) => {
  const getIcon = () => {
    switch (resource.type) {
      case 'WAREHOUSE':
        return <Server className="w-5 h-5" />;
      case 'DATABASE':
        return <Database className="w-5 h-5" />;
      case 'STORAGE':
        return <HardDrive className="w-5 h-5" />;
    }
  };

  const getStatusColor = () => {
    switch (resource.status) {
      case 'RUNNING':
        return 'bg-green-100 text-green-800';
      case 'CREATING':
        return 'bg-yellow-100 text-yellow-800';
      case 'DELETING':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
            {getIcon()}
          </div>
          <div>
            <h3 className="font-medium">{resource.name}</h3>
            <p className="text-sm text-gray-500">{resource.type}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor()}`}>
          {resource.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">CPU</span>
          <span>{resource.metrics.cpu.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Memory</span>
          <span>{resource.metrics.memory.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Storage</span>
          <span>{resource.metrics.storage.toFixed(1)}%</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <button
          onClick={() => onDelete(resource.id)}
          className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
          Delete Resource
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;