import express from 'express'
import multer from 'multer'

import { createIncidente, getIncidentes } from "../controllers/Bitacora/incidentes_controller.js"
import { updateRecibo, getRecibo } from "../controllers/Bitacora/recibo_controller.js"
import { updateEmpaque, getEmpaque } from "../controllers/Bitacora/empaque_controller.js"
import { updateAlmacen, getAlmacen } from "../controllers/Bitacora/almacen_controller.js"
import { updateExtinctor, getExtintor } from '../controllers/Bitacora/extintor_controller.js'
import { updateEntrega, getEntrega } from '../controllers/Bitacora/entrega_controller.js'
import { updateAlimentoCompartido, getAlimentoCompartido } from '../controllers/Bitacora/alimento_compartido_controller.js'
import { updateTemperaturas, getTemperaturas } from '../controllers/Bitacora/temperatura_controller.js'
import { updateCribaFV, getCribaFV } from '../controllers/Bitacora/cribaFV_controller.js'
import { getBitacorasState, getBitacorasPending, getBitacorasExport, getBitacorasPerDay } from '../controllers/Bitacora/visualizacion_bitacoras_controller.js'

const upload = multer()
const router = express.Router()

//Incidentes Bitacoras
router.post("/Incidente/create/:id", upload.single('photo'), createIncidente)
router.get("/Incidente/getBitacoras/:idArea", getIncidentes)

//Recibo Bitacoras
router.put("/Recibo/:idLog/:idUser", updateRecibo)
router.get("/Recibo/:idLog", getRecibo)

//Empaque Bitacoras
router.put("/Empaque/:idLog/:idUser", updateEmpaque)
router.get("/Empaque/:idLog", getEmpaque)

// Almacen Bitacoras
router.put("/Almacen/:idLog/:idUser", updateAlmacen)
router.get("/Almacen/:idLog", getAlmacen)

// Entregas Bitacora
router.put("/Entrega/:idLog/:idUser", updateEntrega)
router.get("/Entrega/:idLog", getEntrega)

// Alimento Compartido Bitacora
router.put("/AlimentoCompartido/:idLog/:idUser", updateAlimentoCompartido)
router.get("/AlimentoCompartido/:idLog", getAlimentoCompartido)

// Temperaturas Bitacora
router.put("/Temperatura/:idLog", updateTemperaturas)
router.get("/Temperatura/:idLog", getTemperaturas)

// Criba FV Bitacora
router.put("/CribaFV/:idLog/:idUser", updateCribaFV)
router.get("/CribaFV/:idLog", getCribaFV)

// Extintores Bitacora
router.put("/Extintor/:idLog", updateExtinctor)
router.get("/Extintor/:idLog", getExtintor)

// Vizualizacion de bitacoras
router.get("/pending", getBitacorasPending)         // muestra las bitacoras no revisadas y en revision
router.get("/export", getBitacorasExport)           // exportar bitacotar
router.get("/display/:id", getBitacorasPerDay)      // despliega por dia 
router.get("/:estado", getBitacorasState)           // despliega las bitacoras dependiendo del estado

export default router
