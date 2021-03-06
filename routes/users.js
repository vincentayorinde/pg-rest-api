import express from "express";
import { authenticateToken } from "../middleware/auth.js";
import userController from "../controllers/users.js";

const router = express.Router();

router.get("/", authenticateToken, userController.getUsers);
router.post("/", userController.createUser);
router.post("/test", userController.testUser);

export default router;
