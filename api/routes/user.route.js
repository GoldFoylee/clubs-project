import express, { Router } from "express";
import { getSingleUser,updateUser,deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { allowSelfOrAdmin } from "../middleware/authorizeRoles.js";
const router = express.Router();

router.get("/:id", getSingleUser);
router.put("/:id", verifyToken,allowSelfOrAdmin,updateUser);
router.delete("/:id",verifyToken,allowSelfOrAdmin ,deleteUser);

export default router;