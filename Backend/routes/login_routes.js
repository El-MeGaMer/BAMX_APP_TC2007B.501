import express from 'express'
import { verUser }  from "../controllers/login_controller.js"

const router = express.Router();

router.post('/verUser', verUser);

export default router;
