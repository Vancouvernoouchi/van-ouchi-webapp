import { Router } from "express";
import {
  getAllProperties,
  getPropertyById,
} from "../controllers/testController";

export const router = Router();

router.get("/", getAllProperties);
router.get("/:id", getPropertyById);
