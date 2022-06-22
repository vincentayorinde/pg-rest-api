import pool from "../db.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
      const users = await pool.query("SELECT * FROM USERS");
      res.status(200).json({ success: true, data: users.rows });
    } catch (error) {
      res.status(500).json({ success: false, data: error });
    }
}

export const createUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = await pool.query(
        "INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *",
        [name, email, hashPassword]
      );
      res.status(200).json({ success: true, data: newUser.rows[0] });
    } catch (error) {
      res.status(500).json({ success: false, data: error });
    }
  }