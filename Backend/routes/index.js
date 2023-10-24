import express from 'express'
import exampleRoutes from "./example_routes.js"

const router = express.Router()

router.use("/example", exampleRoutes)

router.all('*', (req, res) => {
	res.status(404).json({
		status: "Not Found",
		payload: null
	})
})

export default router