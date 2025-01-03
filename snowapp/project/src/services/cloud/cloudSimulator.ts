import { CloudProvider, CloudResource, ResourceType, ResourceStatus } from './types';

class CloudSimulator {
  private resources: Map<string, CloudResource> = new Map();
  private currentProvider: CloudProvider = 'AWS';

  // Simulate resource creation
  async createResource(type: ResourceType, name: string): Promise<CloudResource> {
    const id = `${type}-${Date.now()}`;
    const resource: CloudResource = {
      id,
      name,
      type,
      status: 'CREATING',
      provider: this.currentProvider,
      createdAt: new Date(),
      metrics: {
        cpu: 0,
        memory: 0,
        storage: 0,
      },
    };

    this.resources.set(id, resource);

    // Simulate creation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    resource.status = 'RUNNING';
    
    return resource;
  }

  // Get resource status
  async getResourceStatus(id: string): Promise<ResourceStatus> {
    const resource = this.resources.get(id);
    return resource?.status || 'NOT_FOUND';
  }

  // List all resources
  async listResources(): Promise<CloudResource[]> {
    return Array.from(this.resources.values());
  }

  // Delete resource
  async deleteResource(id: string): Promise<boolean> {
    const resource = this.resources.get(id);
    if (!resource) return false;

    resource.status = 'DELETING';
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.resources.delete(id);
    return true;
  }

  // Update resource metrics
  private updateMetrics(id: string) {
    const resource = this.resources.get(id);
    if (resource) {
      resource.metrics = {
        cpu: Math.random() * 100,
        memory: Math.random() * 100,
        storage: Math.random() * 100,
      };
    }
  }

  // Start metrics collection
  startMetricsCollection(id: string) {
    setInterval(() => this.updateMetrics(id), 5000);
  }
}

export const cloudSimulator = new CloudSimulator();