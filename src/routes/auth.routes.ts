import { Router } from "express";
import { registerUser, loginUser } from "../app/modules/auth/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
