import pool from "./db.js";
import fs from "fs";

const makeSql = fs.readFileSync("./db/sql/makeDatabase.sql", "utf8");
const seedSql = fs.readFileSync("./db/sql/seedDatabase.sql", "utf8");
await pool.query(makeSql);
await pool.query(seedSql);
