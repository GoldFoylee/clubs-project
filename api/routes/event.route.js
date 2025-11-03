import express, { Router } from "express";
//verifyToken as middleware
import { getEvents, createEvent ,updateEvent} from "../controllers/event.controller.js";
const router = express.Router();

router.get("/", getEvents);
router.post("/create", createEvent); //verifyToken as middleware
router.put("/:id", updateEvent); //verifyToken as middleware

export default router;
