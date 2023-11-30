import express from 'express'
import bitacoraRoutes from "./bitacora_routes.js"
import recordatorioRoutes from "./recordatorio_routes.js"
import notificacionesRoutes from "./notificaciones_routes.js"
import loginRoutes from "./login_routes.js"

const router = express.Router();

router.use("/bitacoras", bitacoraRoutes)
router.use("/recordatorio", recordatorioRoutes)
router.use("/notificaciones", notificacionesRoutes)
router.use("/login", loginRoutes);

router.all('*', (req, res) => {
	res.status(404).json({
		status: "Not Found",
		payload: null
	})
});

export default router;
