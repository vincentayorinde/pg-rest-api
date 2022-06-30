import pool from "../db/db.js";
import bcrypt from "bcrypt";
import queries from "../db/queries.js";

const getUsers = async (req, res) => {
  try {
    const users = await pool.query(queries.getUsers);
    res.status(200).json({ success: true, data: users.rows });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(queries.createUser, [
      name,
      email,
      hashPassword,
    ]);
    res.status(201).json({ success: true, data: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, data: error });
  }
};

const testUser =  async(req, res) => {
  res.sendStatus(200)
};

export default { getUsers, createUser, testUser };
