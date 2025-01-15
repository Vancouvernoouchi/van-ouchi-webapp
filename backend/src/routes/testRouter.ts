import { Router } from "express";
import { getAllRooms, getRoomById } from "../controllers/testController";

export const router = Router();

router.get("/", getAllRooms);
router.get("/:id", getRoomById);
