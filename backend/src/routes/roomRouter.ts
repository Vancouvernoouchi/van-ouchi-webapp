import { Router } from "express";
import {
  getAllRooms,
  getRoomById,
  registerRoom,
} from "../controllers/roomController";

export const router = Router();

router.get("/", getAllRooms);
router.post("/", registerRoom);
router.get("/:id", getRoomById);
