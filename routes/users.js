import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import { createUser, getUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/", authenticateToken, getUsers);
router.post("/", createUser);

export default router;
