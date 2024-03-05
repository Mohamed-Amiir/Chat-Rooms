import express, { Router } from "express";
import userController from "../controllers/userController";
import validate from "../middlewares/userMwValidator";

const router: Router = express.Router();

// Customer registration
router.post("/signup", validate, userController);

export default router;
