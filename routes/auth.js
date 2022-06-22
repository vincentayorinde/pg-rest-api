import express from "express";
import { login, logout, refreshToken } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);

router.get("/refresh_token", refreshToken);

router.get("/logout", logout);

export default router;
