import { Router } from "express";
import { verifyNotionToken } from "../controllers/authController";
import { auth } from "../middlewares/auth";

export const router = Router();

router.get("/", auth, verifyNotionToken);
