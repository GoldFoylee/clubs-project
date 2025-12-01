import express, { Router } from "express";
import { login,logout,signup,getMe  } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.get('/me',verifyToken,getMe)
router.post("/signup", signup);
router.post("/login", login); 
router.post("/logout", logout);

export default router;
