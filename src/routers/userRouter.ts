import express, { Router } from "express";
import userController from "../controllers/userController";
import validate from "../middlewares/userMwValidator";

const router: Router = express.Router();

// User registration
router.post("/signup", validate, userController.registerUser);

// User Login
router.post("/login", userController.loginUser);

export default router;
