import express from 'express'

import {
    // getBitacorasRevisadas,
    // getBitacorasNoRevisadas,
    // getBitacorasEnRevision,
    getBitacorasEstado,
} from '../controllers/visualizacion_bitacoras_controller.js'

import {
    updateBitacoraTemperatura,
    updateBitacoraExtintores,
    updateBitacoraLimpiezaAlimentoCompartido,
    updateBitacoraLimpiezaRecibos,
    updateBitacoraLimpiezaEmpaques,
    updateBitacoraLimpiezaCribasFV,
    updateBitacoraLimpiezaAlmacenes
} from '../controllers/update_bitacoras_controller.js'

const router = express.Router()

router.get("/:estado", getBitacorasEstado)
// router.get("/no_revisadas", getBitacorasNoRevisadas)
// router.get("/en_revision", getBitacorasEnRevision)

router.put("/temperatura/:id", updateBitacoraTemperatura)
router.put("/extintores/:id", updateBitacoraExtintores)
router.put("/alimentos_compartidos/:id", updateBitacoraLimpiezaAlimentoCompartido)
router.put("/limpieza_recibidos/:id", updateBitacoraLimpiezaRecibos)
router.put("/limpieza_recibidos/:id", updateBitacoraLimpiezaEmpaques)
router.put("/limpieza_cribas/:id", updateBitacoraLimpiezaCribasFV)
router.put("/limpieza_almacenes/:id", updateBitacoraLimpiezaAlmacenes)

export default router