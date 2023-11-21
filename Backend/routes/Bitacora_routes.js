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
import { getBitacorasEstado } from '../controllers/Bitacora/visualizacion_bitacoras_controller.js'

const upload = multer()
const router = express.Router()

//Incidentes Bitacoras
router.post("/Incidente/create", upload.single('photo'), createIncidente)
router.get("/Incidente/getBitacoras/:idArea", getIncidentes)

//Recibo Bitacoras
router.put("/Recibo/:idLog/:idUser", updateRecibo)

//Empaque Bitacoras
router.put("/Empaque/:idLog/:idUser", updateEmpaque)

// Almacen Bitacoras
router.put("/Almacen/:idLog/:idUser", updateAlmacen)

// Entregas Bitacora
router.put("/Entrega/:id", updateEntrega)

// Alimento Compartido Bitacora
router.put("/AlimentoCompartido/:id", updateAlimentoCompartido)

// Temperaturas Bitacora
router.put("/Temperatura/:id", updateTemperaturas)

// Criba FV Bitacora
router.put("/CribaFV/:id", updateCribaFV)

// Extintores Bitacora
router.put("/Extintor/:id", updateExtinctor)

// Estado bitacoras
router.get("/:estado", getBitacorasEstado)


export default router