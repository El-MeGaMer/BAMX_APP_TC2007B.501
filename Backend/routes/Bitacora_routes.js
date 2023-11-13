import express from 'express'
import { createIncidente, getIncidentes, deleteIncidenteById } from "../controllers/Bitacora/incidentes_controller.js"
import { fillRecibo, getReciboPending } from "../controllers/Bitacora/recibo_controller.js"
import { getEmpaquePending, fillEmpaque } from "../controllers/Bitacora/empaque_controller.js"
import { getAlmacenPending, fillAlmacen} from "../controllers/Bitacora/almacen_controller.js"

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


export default router