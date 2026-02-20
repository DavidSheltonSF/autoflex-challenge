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

  async resetTables(){
    await this.query(`
      DROP TABLE IF EXISTS products_commodities;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS commodities;

      CREATE TABLE products (
      id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      code VARCHAR(8),
      name VARCHAR(80),
      price REAL
      );

      CREATE TABLE commodities (
      id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      code VARCHAR(8),
      name VARCHAR(80),
      quantity integer
      );
      
      CREATE TABLE products_commodities (
      id BIGINT GENERATED ALWAYS AS IDENTITY,
      productid BIGINT REFERENCES products (id) ON DELETE CASCADE,
      commodityid BIGINT REFERENCES commodities (id) ON DELETE CASCADE,
      quantity integer
      );
      
      `);
  }
}
