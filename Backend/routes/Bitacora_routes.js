import express from 'express'
import { createIncidente, getIncidentes, deleteIncidenteById } from "../controllers/Bitacora/incidentes_controller.js"
import { fillRecibo, getReciboPending } from "../controllers/Bitacora/recibo_controller.js"
import { getEmpaquePending, fillEmpaque } from "../controllers/Bitacora/empaque_controller.js"
import { getAlmacenPending, fillAlmacen } from "../controllers/Bitacora/almacen_controller.js"
import { fillExtinctor } from '../controllers/Bitacora/extintor_controller.js'
import { fillEntrega } from '../controllers/Bitacora/entrega_controller.js'
import { fillAlimentoCompartido } from '../controllers/Bitacora/alimento_compartido_controller.js'
import { fillTemperaturas } from '../controllers/Bitacora/temperatura_controller.js'
import { fillCribaFV } from '../controllers/Bitacora/cribaFV_controller.js'
import { getBitacorasState, getBitacorasPending, getBitacorasExport, getBitacorasPerDay } from '../controllers/Bitacora/visualizacion_bitacoras_controller.js'


const router = express.Router()

//Incidentes Bitacoras
router.post("/Incidente/create", createIncidente)
router.get("/Incidente/getBitacoras/:idArea", getIncidentes)
router.delete("Incidente/delete/:id", deleteIncidenteById)

//Recibo Bitacoras
router.get("/Recibo/getPending/:id", getReciboPending)
router.put("/Recibo/fill/:id", fillRecibo)

//Empaque Bitacoras
router.get("/Empaque/getPending/:id", getEmpaquePending)
router.put("/Empaque/fill/:id", fillEmpaque)

// Almacen Bitacoras
router.get("/Almacen/getPending/:id", getAlmacenPending)
router.put("/Almacen/fill/:id", fillAlmacen)

// Extintor Bitacoras
router.put("/Extintor/fill/:id", fillExtinctor)

// Entregas Bitacora
router.put("/Entregas/fill/:id", fillEntrega)

// Alimento Compartido Bitacora
router.put("/AlimentoCompartido/fill/:id", fillAlimentoCompartido)

// Temperaturas Bitacora
router.put("/Temperatura/fill/:id", fillTemperaturas)

// Criba FV Bitacora
router.put("/CribaFV/fill/:id", fillCribaFV)

// Vizualizacion de bitacoras
router.get("/pending", getBitacorasPending)         // muestra las bitacoras no revisadas y en revision
router.get("/export", getBitacorasExport)           // exportar bitacotar
router.get("/display/:id", getBitacorasPerDay)      // despliega por dia 
router.get("/:estado", getBitacorasState)           // despliega las bitacoras dependiendo del estado

export default router
