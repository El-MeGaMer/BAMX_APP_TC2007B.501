import React, { useState, useEffect } from "react";
import { TableInitialValues } from "./TableInitialValues";
import { Text, View } from "react-native";
import { GetTableFunctions } from "./LogsConstants";
import Container from "../components/Container";
import { styled } from "nativewind";

import Background from "../components/Background";
import ContainerAlert from "../components/ContainerAlert";
import SelectLogButton from "../components/SelectLogButton";
import { getLogsAvailable } from "../apis/VisualizationApi";
import { getRecibo } from "../apis/VisualizationApi";
import { LogsNames, LogsUpdateRef } from "../constants/LogsConstants";
const StyledView = styled(View);
const StyledText = styled(Text);
import { LogsConstants } from "./LogsConstants";


export const GetTableData = {
  bitacoraLimpiezaRecibos: {
    data: [
      ["Area de armado", LogsConstants.BITACORA_LIMPIEZA_RECIBOS.AREA_ARMADO],
      ["Area de recibo", LogsConstants.BITACORA_LIMPIEZA_RECIBOS.AREA_RECIBO],
      ["Congelador", LogsConstants.BITACORA_LIMPIEZA_RECIBOS.CONGELADOR],
      ["Cuartos Frios", LogsConstants.BITACORA_LIMPIEZA_RECIBOS.CUARTOS_FRIOS],
      ["Patio", LogsConstants.BITACORA_LIMPIEZA_RECIBOS.PATIO],
      ["Rampas", LogsConstants.BITACORA_LIMPIEZA_RECIBOS.RAMPAS],
      ["Transporte", LogsConstants.BITACORA_LIMPIEZA_RECIBOS.TRANSPORTE],
      ["Observaciones", LogsConstants.BITACORA_LIMPIEZA_RECIBOS.OBSERVACIONES],
    ],
  },

  bitacoraLimpiezaEmpaques: {
    data: [
      ["Pisos", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.PISOS],
      ["Mesas", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.MESAS],
      ["Selladores", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.SELLADORES],
      ["Básculas", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.BASCULAS],
      ["Rampas", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.RAMPAS],
      ["Estantes", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.ESTANTES],
      ["Bandejas", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.BANDEJAS],
      ["Patines", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.PATINES],
      ["Observaciones", LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.OBSERVACIONES],
    ],
  },
  bitacoraLimpiezaCribasFV: {
    data: [
      ["Pisos", LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.PISOS],
      ["Mesas", LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.MESAS],
      ["Patio", LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.PATIO],
      ["Básculas", LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.BASCULAS],
      ["Rampas", LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.RAMPAS],
      ["Rejillas", LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.REJILLAS],
      ["Patines", LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.PATINES],
      [
        "Observaciones",
        LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.OBSERVACIONES,
      ],
    ],
  },
  bitacoraLimpiezaAlmacenes: {
    data: [
      ["Pisos", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.PISOS],
      ["Pasillos", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.PASILLOS],
      ["Extintores", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.EXTINTORES],
      [
        "Cuartos Frios",
        LogsConstants.BITACORA_LIMPIEZA_ALMACENES.CUARTOS_FRIOS,
      ],
      ["Puertas", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.PUERTAS],
      ["Muros", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.MUROS],
      ["Racks", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.RACKS],
      ["Cortinas", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.CORTINAS],
      ["Coladera", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.COLADERAS],
      ["Rejillas", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.REJILLAS],
      ["Montacargas", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.MONTACARGAS],
      ["Patines", LogsConstants.BITACORA_LIMPIEZA_ALMACENES.PATINES],
      [
        "Observaciones",
        LogsConstants.BITACORA_LIMPIEZA_ALMACENES.OBSERVACIONES,
        "default",
      ],
    ],
  },
  bitacoraLimpiezaEntregas: {
    data: [
      ["Pisos", LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.PISOS],
      ["Cuartos Frios", LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.CUARTOS_FRIOS],
      ["Básculas", LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.BASCULAS],
      ["Racks", LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.RACKS],
      ["Cortinas", LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.CORTINAS],
      ["Rampas", LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.RAMPAS],
      ["Patines", LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.PATINES],
      ["Observaciones", LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.OBSERVACIONES],
    ],
  },
  bitacoraLimpiezaAlimentoCompartidos: {
    data: [
      ["Pisos", LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.PISOS],
      [
        "Cuartos Frios",
        LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.CUARTOS_FRIOS,
      ],
      [
        "Refrigeradores",
        LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.REFRIGERADORES,
      ],
      ["Congeladores", LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.CONGELADORES],
      ["Racks", LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.RACKS],
      ["Cortinas", LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.CORTINAS],
      ["Patines", LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.PATINES],
      ["Básculas", LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.BASCULAS],
      [
        "Observaciones",
        LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.OBSERVACIONES,
      ],
    ],
  },
  bitacoraTemperaturas: {
    data: [
      ["Cuarto Frío 1", LogsConstants.BITACORA_TEMPERATURAS.CUARTO_FRIO_1],
      ["Cuarto Frío 2", LogsConstants.BITACORA_TEMPERATURAS.CUARTO_FRIO_2],
      [
        "Cámara de conservación B",
        LogsConstants.BITACORA_TEMPERATURAS.CAMARA_CONSERVACION_B,
      ],
      [
        "Cámara de conservación C",
        LogsConstants.BITACORA_TEMPERATURAS.CAMARA_CONSERVACION_C,
      ],
      ["Observaciones", LogsConstants.BITACORA_TEMPERATURAS.OBSERVACIONES],
    ],
  },
  bitacoraExtintores: {
    data: [
      ["Capacidad", LogsConstants.BITACORA_EXTINTORES.CAPACIDAD],
      ["Manómetro", LogsConstants.BITACORA_EXTINTORES.MANOMETRO],
      ["Estado Físico", LogsConstants.BITACORA_EXTINTORES.ESTADO_FISICO],
      ["Mangueras", LogsConstants.BITACORA_EXTINTORES.MANGUERAS],
      ["Seguro", LogsConstants.BITACORA_EXTINTORES.SEGURO],
      ["Etiquetas", LogsConstants.BITACORA_EXTINTORES.ETIQUETAS],
      ["Holograma", LogsConstants.BITACORA_EXTINTORES.HOLOGRAMA],
      ["Última Revisión", LogsConstants.BITACORA_EXTINTORES.ULTIMA_REVISION],
      ["Próxima Recarga", LogsConstants.BITACORA_EXTINTORES.PROXIMA_RECARGA],
      ["Observaciones", LogsConstants.BITACORA_EXTINTORES.OBSERVACIONES],
    ],
  },
};
