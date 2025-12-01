import express, { Router } from "express";
//verifyToken as middleware
import { login,logout,signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login); //verifyToken as middleware
router.post("/logout", logout); //verifyToken as middleware

export default router;
