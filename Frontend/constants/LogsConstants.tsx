import { UpdateLogAlmacen, UpdateLogEmpaque, updateLogAlimentoCompartido, updateLogCribaFV, UpdateLogRecibo, updateLogEntrega, updateLogExtintor, updateLogTemperatura } from "../apis/LogApi";

import { getRecibo, getAlimentoCompartido, getAlmacen, getCribaFV, getEmpaque, getEntrega, getExtintor, getTemperatura } from "../apis/VisualizationApi";

export const LogsConstants = Object.freeze({
  BITACORA_LIMPIEZA_RECIBOS: {
    AREA_ARMADO: "areaArmado",
    AREA_RECIBO: "areaRecibo",
    PATIO: "patio",
    RAMPAS: "rampas",
    CUARTOS_FRIOS: "cuartosFrios",
    CONGELADOR: "congelador",
    TRANSPORTE: "transporte",
    OBSERVACIONES: "observaciones",
  },
  BITACORA_LIMPIEZA_EMPAQUES: {
    PISOS: "pisos",
    MESAS: "mesas",
    SELLADORES: "selladores",
    BASCULAS: "basculas",
    RAMPAS: "rampas",
    ESTANTES: "estantes",
    BANDEJAS: "bandejas",
    PATINES: "patines",
    OBSERVACIONES: "observaciones",
  },
  BITACORA_LIMPIEZA_CRIBAS_FV: {
    PISOS: "pisos",
    MESAS: "mesas",
    PATIO: "patio",
    BASCULAS: "basculas",
    RAMPAS: "rampas",
    REJILLAS: "rejillas",
    PATINES: "patines",
    OBSERVACIONES: "observaciones",
  },
  BITACORA_LIMPIEZA_ALMACENES: {
    PISOS: "pisos",
    PASILLOS: "pasillos",
    EXTINTORES: "extintores",
    CUARTOS_FRIOS: "cuartosFrios",
    PUERTAS: "puertas",
    MUROS: "muros",
    RACKS: "racks",
    CORTINAS: "cortinas",
    COLADERAS: "coladeras",
    REJILLAS: "rejillas",
    MONTACARGAS: "montacargas",
    PATINES: "patines",
    OBSERVACIONES: "observaciones",
  },
  BITACORA_LIMPIEZA_ENTREGAS: {
    PISOS: "pisos",
    CUARTOS_FRIOS: "cuartosFrios",
    BASCULAS: "basculas",
    RACKS: "racks",
    CORTINAS: "cortinas",
    RAMPAS: "rampas",
    PATINES: "patines",
    OBSERVACIONES: "observaciones",
  },
  BITACORA_LIMPIEZA_ALIMENTOS:{
    PISOS: "pisos",
    CUARTOS_FRIOS: "cuartosFrios",
    REFRIGERADORES: "refrigeradores",
    CONGELADORES: "congeladores",
    RACKS: "racks",
    CORTINAS: "cortinas",
    PATINES: "patines",
    BASCULAS: "basculas",
    OBSERVACIONES: "observaciones",
  },
  BITACORA_TEMPERATURAS: {
    CUARTO_FRIO_1: "cuartoFrio1",
    CUARTO_FRIO_2: "cuartoFrio2",
    CAMARA_CONSERVACION_B: "camaraConservacionB",
    CAMARA_CONSERVACION_C: "camaraConservacionC",
    OBSERVACIONES: "observaciones",
  },
  BITACORA_INCIDENTES: {
    NOMBRE: "nombre",
    DESCRIPCION: "descripcion",
    IMAGEN: "imagen",
  },
  BITACORA_EXTINTORES: {
    CAPACIDAD: "capacidad",
    MANOMETRO: "manometro",
    ESTADO_FISICO: "estadoFisico",
    MANGUERAS: "mangueras",
    SEGURO: "seguro",
    ETIQUETAS: "etiquetas",
    HOLOGRAMA: "holograma",
    ULTIMA_REVISION: "ultimaRevision",
    PROXIMA_RECARGA: "proximaRecarga",
    OBSERVACIONES: "observaciones",
  }
});

export const LogsNames = Object.freeze({
  areaBitacoraLimpiezaRecibos: "bitacoraLimpiezaRecibos",
  areaBitacoraLimpiezaEmpaques: "bitacoraLimpiezaEmpaques",
  areaBitacoraLimpiezaCribasFVs: "bitacoraLimpiezaCribasFV",
  areaBitacoraLimpiezaAlmacenes: "bitacoraLimpiezaAlmacenes",
  areaBitacoraLimpiezaEntregas: "bitacoraLimpiezaEntregas",
  areaBitacoraLimpiezaAlimentoCompartido: "bitacoraLimpiezaAlimentoCompartidos",
  areaBitacoraTemperatura: "bitacoraTemperaturas",
  BITACORA_INCIDENTES: "bitacoraIncidentes",
  areaBitacoraExtintor: "bitacoraExtintores"
})

export const LogsUpdateRef = Object.freeze({
  areaBitacoraLimpiezaRecibos: UpdateLogRecibo,
  areaBitacoraLimpiezaEmpaques: UpdateLogEmpaque,
  areaBitacoraLimpiezaCribasFVs: updateLogCribaFV,
  areaBitacoraLimpiezaAlmacenes: UpdateLogAlmacen,
  areaBitacoraLimpiezaEntregas: updateLogEntrega,
  areaBitacoraLimpiezaAlimentoCompartido: updateLogAlimentoCompartido,
  areaBitacoraTemperatura: updateLogTemperatura,
  BITACORA_INCIDENTES: "",
  areaBitacoraExtintor: updateLogExtintor
})

export const GetTableFunctions = Object.freeze({
  areaBitacoraLimpiezaRecibos: getRecibo,
  areaBitacoraLimpiezaEmpaques: getEmpaque,
  areaBitacoraLimpiezaCribasFVs: getCribaFV,
  areaBitacoraLimpiezaAlmacenes: getAlmacen,
  areaBitacoraLimpiezaEntregas: getEntrega,
  areaBitacoraLimpiezaAlimentoCompartido: getAlimentoCompartido,
  areaBitacoraTemperatura: getTemperatura,
  BITACORA_INCIDENTES: "",
  areaBitacoraExtintor: getExtintor
})
