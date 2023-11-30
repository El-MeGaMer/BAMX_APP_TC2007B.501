import express from 'express'
import { postRecordatorio, getRecordatorio, updateRecordatorio, deleteRecordatorio } from "../controllers/recordatorio_controller.js"

const router = express.Router()

router.post("/", postRecordatorio)
router.get("/", getRecordatorio)
router.put("/:id", updateRecordatorio)
router.delete("/:id", deleteRecordatorio)

export default router