import { SnowflakeConfig } from './types';

class SnowflakeConnection {
  private static instance: SnowflakeConnection;
  private config: SnowflakeConfig | null = null;
  private connected: boolean = false;
  private connectionError: string | null = null;

  private constructor() {}

  static getInstance(): SnowflakeConnection {
    if (!SnowflakeConnection.instance) {
      SnowflakeConnection.instance = new SnowflakeConnection();
    }
    return SnowflakeConnection.instance;
  }

  async connect(config: SnowflakeConfig): Promise<void> {
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.config = config;
      this.connected = true;
      this.connectionError = null;
    } catch (error) {
      this.connected = false;
      this.connectionError = error.message;
      throw error;
    }
  }

  isConnected(): boolean {
    return this.connected;
  }

  getError(): string | null {
    return this.connectionError;
  }

  getConfig(): SnowflakeConfig | null {
    return this.config;
  }

  // Initialize with default configuration
  async initializeDefaultConnection(): Promise<void> {
    if (!this.connected) {
      await this.connect({
        account: 'demo_account',
        username: 'demo_user',
        warehouse: 'COMPUTE_WH',
        database: 'SALES_DB',
        schema: 'PUBLIC'
      });
    }
  }
}

export default SnowflakeConnection.getInstance();