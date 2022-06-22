import pg from "pg";

const { Pool } = pg;
const developmentPoolConfig = {
  user: "postgres",
  password: "password1",
  database: "todo_database",
  host: "localhost",
  post: 5432,
};

const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : developmentPoolConfig;

const pool = new Pool(poolConfig);
export default pool;
