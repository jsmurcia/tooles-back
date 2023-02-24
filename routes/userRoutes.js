import express from "express"; //ES Modules
import { confirmUser, login, register } from "../controllers/userController.js";

const router = express.Router();

// Auth
router.post("/register", register);
router.post("/login", login);
router.get("/confirm-user/:token", confirmUser);

export default router;
