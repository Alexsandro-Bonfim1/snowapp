import React, { useState, useEffect } from 'react';
import { etlService } from '../../services/warehouse/etl.service';
import ETLJobsList from './ETLJobsList';
import { Plus } from 'lucide-react';

interface WarehouseProcessingProps {
  warehouseName: string;
}

const WarehouseProcessing: React.FC<WarehouseProcessingProps> = ({ warehouseName }) => {
  const [jobs, setJobs] = useState(etlService.listJobs());
  const [showNewJobModal, setShowNewJobModal] = useState(false);
  const [newJob, setNewJob] = useState({
    name: '',
    type: 'extract' as const,
    source: '',
    destination: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setJobs(etlService.listJobs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStartJob = async () => {
    if (!newJob.name || !newJob.source || !newJob.destination) return;

    await etlService.startJob(
      newJob.name,
      newJob.type,
      newJob.source,
      newJob.destination
    );

    setShowNewJobModal(false);
    setNewJob({ name: '', type: 'extract', source: '', destination: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Processing Tasks</h2>
        <button
          onClick={() => setShowNewJobModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          New ETL Job
        </button>
      </div>

      <ETLJobsList jobs={jobs} />

      {showNewJobModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Start New ETL Job</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Job Name</label>
                <input
                  type="text"
                  value={newJob.name}
                  onChange={(e) => setNewJob({ ...newJob, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={newJob.type}
                  onChange={(e) => setNewJob({ ...newJob, type: e.target.value as any })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  <option value="extract">Extract</option>
                  <option value="transform">Transform</option>
                  <option value="load">Load</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Source</label>
                <input
                  type="text"
                  value={newJob.source}
                  onChange={(e) => setNewJob({ ...newJob, source: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Destination</label>
                <input
                  type="text"
                  value={newJob.destination}
                  onChange={(e) => setNewJob({ ...newJob, destination: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowNewJobModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStartJob}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Start Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseProcessing;