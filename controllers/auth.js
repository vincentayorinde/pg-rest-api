import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtTokens } from "../utils/jwt-helper.js";

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const users = await pool.query(
        "SELECT * FROM users WHERE user_email = $1",
        [email]
      );
      if (users.rows.length === 0)
        return res
          .status(400)
          .json({ success: false, data: { message: "Account does not exist" } });
      // Check password
      const validPassword = await bcrypt.compare(
        password,
        users.rows[0].user_password
      );
      if (!validPassword)
        return res
          .status(400)
          .json({ success: false, data: { message: "Incorrect credentials" } });
  
      //  Send back JWT 
      let tokens = jwtTokens(users.rows[0]);
      res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true, sameSite: 'lax', secure: true });
      return res.status(200).json({ success: true, data: { tokens } });
    } catch (error) {
      res.status(500).json({ success: false, data: error });
    }
}

export const refreshToken = async (req, res) => {
    try {
      const refreshToken = req.cookies.refresh_token;
      if (refreshToken === null)
        res
          .status(400)
          .json({ success: false, data: { message: "Null refresh token" } });
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, user) => {
          if (error)
            return res.status(403).json({
              success: false,
              data: { message: "Forbidden", error: error.message },
            });
          let tokens = jwtTokens(user);
          res.cookie("refresh_token", tokens.refreshToken, { httpOnly: true, sameSite: 'lax', secure: true });
          res.status(200).json({ success: true, data: { tokens } });
        }
      );
    } catch (error) {
      res.status(500).json({ success: false, data: error });
    }
};

export const logout = async (req, res) => {
    try {
      res.clearCookie("refresh_token");
      return res
        .status(200)
        .json({ success: true, data: { message: "refresh token cleared" } });
    } catch (error) {
      res.status(401).json({ success: false, data: error });
    }
  }
  