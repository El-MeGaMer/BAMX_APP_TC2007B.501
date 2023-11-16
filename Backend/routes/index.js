import express from 'express'
import exampleRoutes from "./example_routes.js"
import bitacoraRoutes from "./Bitacora_routes.js"
import recordatorioRoutes from "./recordatorio_routes.js"
import notificacionesRoutes from "./notificaciones_routes.js"

const router = express.Router()

router.use("/example", exampleRoutes)
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