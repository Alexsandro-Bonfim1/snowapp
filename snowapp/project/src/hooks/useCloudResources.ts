import { useState, useEffect } from 'react';
import { cloudSimulator } from '../services/cloud/cloudSimulator';
import type { CloudResource, ResourceType } from '../services/cloud/types';

export function useCloudResources() {
  const [resources, setResources] = useState<CloudResource[]>([]);
  const [loading, setLoading] = useState(false);

  const loadResources = async () => {
    const data = await cloudSimulator.listResources();
    setResources(data);
  };

  const createResource = async (type: ResourceType, name: string) => {
    setLoading(true);
    try {
      const resource = await cloudSimulator.createResource(type, name);
      await loadResources();
      return resource;
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id: string) => {
    setLoading(true);
    try {
      await cloudSimulator.deleteResource(id);
      await loadResources();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  return {
    resources,
    loading,
    createResource,
    deleteResource,
    refreshResources: loadResources,
  };
}