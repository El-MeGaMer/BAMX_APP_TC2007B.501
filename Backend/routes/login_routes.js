import express from 'express'
import { genOTP, verifyOTP }  from "../controllers/login_controller.js"

const router = express.Router();

router.post("/gen_otp", genOTP);
router.post("/verify_otp", verifyOTP);

export default router;
