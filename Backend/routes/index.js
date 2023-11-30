import express from 'express'
import bitacoraRoutes from "./Bitacora_routes.js"
import recordatorioRoutes from "./recordatorio_routes.js"
import notificacionesRoutes from "./notificaciones_routes.js"

const router = express.Router()

router.use("/bitacoras", bitacoraRoutes)
router.use("/recordatorio", recordatorioRoutes)
router.use("/notificaciones", notificacionesRoutes)

router.all('*', (req, res) => {
	res.status(404).json({
		status: "Not Found",
		payload: null
	})
})

export default router