import express from 'express'
import { getNotificacionesUsuario } from '../controllers/notificaciones_controller.js'

const router = express.Router()

router.get("/:id", getNotificacionesUsuario)

export default router