import pg from "pg";
import * as dotenv from "dotenv";
dotenv.config();
const { Pool } = pg;
const developmentPoolConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
  host: process.env.DB_HOST,
  post: process.env.DB_PORT,
};

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : developmentPoolConfig;

const pool = new Pool(poolConfig);
export default pool;
