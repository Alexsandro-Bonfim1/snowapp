import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useCloudResources } from '../../hooks/useCloudResources';
import ResourceCard from './ResourceCard';
import type { ResourceType } from '../../services/cloud/types';

const ResourceManager = () => {
  const { resources, loading, createResource, deleteResource } = useCloudResources();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newResourceName, setNewResourceName] = useState('');
  const [newResourceType, setNewResourceType] = useState<ResourceType>('WAREHOUSE');

  const handleCreate = async () => {
    if (!newResourceName) return;
    await createResource(newResourceType, newResourceName);
    setShowCreateModal(false);
    setNewResourceName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Cloud Resources</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create Resource
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading resources...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onDelete={deleteResource}
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New Resource</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Resource Type</label>
                <select
                  value={newResourceType}
                  onChange={(e) => setNewResourceType(e.target.value as ResourceType)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="WAREHOUSE">Warehouse</option>
                  <option value="DATABASE">Database</option>
                  <option value="STORAGE">Storage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Resource Name</label>
                <input
                  type="text"
                  value={newResourceName}
                  onChange={(e) => setNewResourceName(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Enter resource name"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceManager;