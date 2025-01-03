import React from 'react';
import { Cloud, Database, HardDrive } from 'lucide-react';

interface CloudRegion {
  id: string;
  name: string;
  location: string;
}

const regions: CloudRegion[] = [
  { id: 'us-east-1', name: 'US East', location: 'N. Virginia' },
  { id: 'us-west-1', name: 'US West', location: 'N. California' },
  { id: 'eu-west-1', name: 'EU West', location: 'Ireland' },
  { id: 'ap-southeast-1', name: 'Asia Pacific', location: 'Singapore' },
];

const CloudSettings = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Cloud Provider</h3>
          </div>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option>AWS</option>
            <option>Azure</option>
            <option>GCP</option>
          </select>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Storage Integration</h3>
          </div>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            <option>S3</option>
            <option>Azure Blob Storage</option>
            <option>Google Cloud Storage</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-blue-600" />
            <h3 className="font-medium">Available Regions</h3>
          </div>
        </div>
        <div className="divide-y">
          {regions.map((region) => (
            <label key={region.id} className="flex items-center p-4 hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="region"
                value={region.id}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">{region.name}</div>
                <div className="text-sm text-gray-500">{region.location}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CloudSettings;