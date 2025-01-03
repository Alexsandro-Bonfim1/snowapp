export const API_BASE_URL = '/api';

export const ENDPOINTS = {
  QUERY: `${API_BASE_URL}/query`,
  WAREHOUSES: `${API_BASE_URL}/warehouses`,
  DATABASES: `${API_BASE_URL}/databases`,
  CONNECTION: `${API_BASE_URL}/connection`,
} as const;