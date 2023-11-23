import express from 'express'
import multer from 'multer'

import { createIncidente, getIncidentes } from "../controllers/Bitacora/incidentes_controller.js"
import { updateRecibo } from "../controllers/Bitacora/recibo_controller.js"
import { updateEmpaque } from "../controllers/Bitacora/empaque_controller.js"
import { updateAlmacen} from "../controllers/Bitacora/almacen_controller.js"
import { updateExtinctor } from '../controllers/Bitacora/extintor_controller.js'
import { updateEntrega } from '../controllers/Bitacora/entrega_controller.js'
import { updateAlimentoCompartido } from '../controllers/Bitacora/alimento_compartido_controller.js'
import { updateTemperaturas } from '../controllers/Bitacora/temperatura_controller.js'
import { updateCribaFV } from '../controllers/Bitacora/cribaFV_controller.js'
import { getBitacorasState, getBitacorasPending, getBitacorasExport, getBitacorasPerDay } from '../controllers/Bitacora/visualizacion_bitacoras_controller.js'

const upload = multer()
const router = express.Router()

//Incidentes Bitacoras
router.post("/Incidente/create/:id", upload.single('photo'), createIncidente)
router.get("/Incidente/getBitacoras/:idArea", getIncidentes)

//Recibo Bitacoras
router.put("/Recibo/:idLog/:idUser", updateRecibo)

//Empaque Bitacoras
router.put("/Empaque/:idLog/:idUser", updateEmpaque)

// Almacen Bitacoras
router.put("/Almacen/:idLog/:idUser", updateAlmacen)

// Entregas Bitacora
router.put("/Entrega/:idLog/:idUser", updateEntrega)

// Alimento Compartido Bitacora
router.put("/AlimentoCompartido/:idLog/:idUser", updateAlimentoCompartido)

// Temperaturas Bitacora
router.put("/Temperatura/:idLog", updateTemperaturas)

// Criba FV Bitacora
router.put("/CribaFV/:idLog/:idUser", updateCribaFV)

// Extintores Bitacora
router.put("/Extintor/:idLog", updateExtinctor)

// Vizualizacion de bitacoras
router.get("/pending", getBitacorasPending)         // muestra las bitacoras no revisadas y en revision
router.get("/export", getBitacorasExport)           // exportar bitacotar
router.get("/display/:id", getBitacorasPerDay)      // despliega por dia 
router.get("/:estado", getBitacorasState)           // despliega las bitacoras dependiendo del estado

export default router
