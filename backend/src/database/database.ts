import { Client, ClientConfig, QueryResult } from 'pg';
import { config } from 'dotenv';
config();

export class PostgreHelper {
  static instance: PostgreHelper | null = null;
  private client: Client | null = null;

  private constructor(config: ClientConfig) {
    this.client = new Client(config);
  }

  static getInstance(): PostgreHelper {
    if (this.instance) return this.instance;
    this.instance = new PostgreHelper({
      connectionString: process.env.DATABASE_URL,
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      port: Number(process.env.DATABASE_PORT),
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      ssl: true,
    });

    return this.instance;
  }

  async connect() {
    if (!this.client) {
      throw Error('Could not connect because PostgreHelper.client is null');
    }
    await this.client.connect();
  }

  async query(query: any): Promise<QueryResult<any>> {
    if (!this.client) {
      throw Error('Could not make query because PostgreHelper.client is null');
    }
    return await this.client.query(query);
  }

  async disconnect() {
    if (!this.client) {
      throw Error('Could not disconnect because PostgreHelper.client is null');
    }
    await this.client.end();
    this.client = null;
  }
}
