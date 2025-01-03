import { apiClient } from '../client';
import { ENDPOINTS } from '../endpoints';
import type { Warehouse } from '../../services/snowflake/warehouse';

export async function getWarehouses(): Promise<Warehouse[]> {
  return apiClient.get<Warehouse[]>(ENDPOINTS.WAREHOUSES);
}

export async function startWarehouse(name: string): Promise<Warehouse> {
  return apiClient.put<Warehouse>(`${ENDPOINTS.WAREHOUSES}/${name}/start`, {});
}

export async function suspendWarehouse(name: string): Promise<Warehouse> {
  return apiClient.put<Warehouse>(`${ENDPOINTS.WAREHOUSES}/${name}/suspend`, {});
}

export async function getWarehouseMetrics(name: string) {
  return apiClient.get(`${ENDPOINTS.WAREHOUSES}/${name}/metrics`);
}