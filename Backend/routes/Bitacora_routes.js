import express from 'express'
import { createIncidente, getIncidentes } from "../controllers/Bitacora/incidentes_controller.js"
import { updateRecibo } from "../controllers/Bitacora/recibo_controller.js"
import { updateEmpaque } from "../controllers/Bitacora/empaque_controller.js"
import { updateAlmacen} from "../controllers/Bitacora/almacen_controller.js"
import { fillExtinctor } from '../controllers/Bitacora/extintor_controller.js'
import { fillEntrega } from '../controllers/Bitacora/entrega_controller.js'
import { fillAlimentoCompartido } from '../controllers/Bitacora/alimento_compartido_controller.js'
import { fillTemperaturas } from '../controllers/Bitacora/temperatura_controller.js'
import { fillCribaFV } from '../controllers/Bitacora/cribaFV_controller.js'
import { getBitacorasEstado } from '../controllers/Bitacora/visualizacion_bitacoras_controller.js'

const router = express.Router()

//Incidentes Bitacoras
router.post("/Incidente/create", createIncidente)
router.get("/Incidente/getBitacoras/:idArea", getIncidentes)

//Recibo Bitacoras
router.put("/Recibo/user=:idUser/log=:id", updateRecibo)

//Empaque Bitacoras
router.put("/Empaque/user=:idUser/log=:id", updateEmpaque)

// Almacen Bitacoras
router.put("/Almacen/user=:idUser/log=:id", updateAlmacen)

// Entregas Bitacora
router.put("/Entregas/fill/:id", fillEntrega)

// Alimento Compartido Bitacora
router.put("/AlimentoCompartido/fill/:id", fillAlimentoCompartido)

// Temperaturas Bitacora
router.put("/Temperatura/fill/:id", fillTemperaturas)

// Criba FV Bitacora
router.put("/CribaFV/fill/:id", fillCribaFV)

// Estado bitacoras
router.get("/:estado", getBitacorasEstado)

export default router