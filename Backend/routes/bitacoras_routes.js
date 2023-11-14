import express from 'express'

import { getBitacorasEstado } from '../controllers/visualizacion_bitacoras_controller.js'

const router = express.Router()

router.get("/:estado", getBitacorasEstado)

export default router