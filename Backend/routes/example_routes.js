import express from 'express'
//import multer from 'multer'
import { postExample, getExample, updateExample, deleteExample, getExampleById } from "../controllers/example_controller.js"
import { fillExtinctor } from '../controllers/Bitacora/extintor_controller.js'
import { fillAlimentoCompartido } from '../controllers/Bitacora/alimento_compartido_controller.js'
import { fillCribaFV } from '../controllers/Bitacora/cribaFV_controller.js'
import { fillEntrega } from '../controllers/Bitacora/entrega_controller.js'
import { fillTemperaturas } from '../controllers/Bitacora/temperatura_controller.js'

//multer is for the Image uploader
// const upload = multer()

const router = express.Router()

router.post("/", postExample)
router.get("/", getExample)
router.get("/:id", getExampleById)
router.put("/hola", fillTemperaturas)
router.delete("/:id", deleteExample)


//TO DO: See better options for mobile app
// router.post("/upload", upload.single('pic'), postPostImg)
// router.get("/img/:id", getPostImg)

export default router