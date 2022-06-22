import express from "express";
import authController from "../controllers/auth.js";

const router = express.Router();

router.post("/login", authController.login);
router.get("/refresh_token", authController.refreshToken);
router.get("/logout", authController.logout);

export default router;
