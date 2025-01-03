export type CloudProvider = 'AWS' | 'Azure' | 'GCP';
export type ResourceType = 'WAREHOUSE' | 'DATABASE' | 'STORAGE';
export type ResourceStatus = 'CREATING' | 'RUNNING' | 'STOPPED' | 'DELETING' | 'NOT_FOUND';

export interface CloudResource {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  provider: CloudProvider;
  createdAt: Date;
  metrics: {
    cpu: number;
    memory: number;
    storage: number;
  };
}