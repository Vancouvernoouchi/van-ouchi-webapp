import { Router } from "express";
import { registerProperty } from "../controllers/testPropertyController";

export const router = Router();
router.post("/", registerProperty);
