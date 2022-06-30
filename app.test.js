import request from "supertest";
import app from "./app.js";
import pool from "./db/db.js";
import fs from "fs";

describe("test the users controllers", () => {
  beforeEach(async () => {
    const sql = fs.readFileSync("./db/sql/makeDatabase.sql", "utf8");
    await pool.query(sql);
  });

  afterEach(async () => {
    const sql = fs.readFileSync("./db/sql/dropDatabase.sql", "utf8");
    await pool.query(sql);
  });
  test("should be able to create a user and return 201", async () => {
    const user = { name: "mike", email: "mike@mike.com", password: "password" };
    const response = await request(app).post("/api/users").send(user);
    expect(response.statusCode).toBe(201);
    expect(response.body.data.user_name).toBe(user.name);
    expect(response.body.data.user_email).toBe(user.email);
  });
});
