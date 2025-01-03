import React from 'react';
import { Clock, ArrowRight, CheckCircle, XCircle, Loader } from 'lucide-react';
import type { ETLJob } from '../../services/warehouse/etl.service';

interface ETLJobsListProps {
  jobs: ETLJob[];
}

const ETLJobsList: React.FC<ETLJobsListProps> = ({ jobs }) => {
  const getStatusIcon = (status: ETLJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Active ETL Jobs</h3>
      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getStatusIcon(job.status)}
                <span className="font-medium">{job.name}</span>
              </div>
              <div className="text-sm text-gray-500">
                <Clock className="w-4 h-4 inline mr-1" />
                {new Date(job.startTime).toLocaleTimeString()}
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <span>{job.source}</span>
              <ArrowRight className="w-4 h-4" />
              <span>{job.destination}</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{job.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${job.progress}%` }}
                />
              </div>
              <div className="text-sm text-gray-500">
                {job.rowsProcessed.toLocaleString()} rows processed
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ETLJobsList;