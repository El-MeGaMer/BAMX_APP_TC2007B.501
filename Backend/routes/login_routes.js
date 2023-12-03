import express from 'express'
import { genOTP, auth }  from "../controllers/login_controller.js"

const router = express.Router();

router.post("/gen_otp", genOTP);
router.post("/auth", auth);

export default router;
