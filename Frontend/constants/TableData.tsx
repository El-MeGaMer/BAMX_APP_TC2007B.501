// TableData
// this file contains the data for the tables in the app
// this file is imported in the screens that use tables
// Implementado por: andre castillo (principalmente) y marco montoya (escribista)

import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
import DualCheck from "../components/DualCheck";
import { TableInitialValues } from "./TableInitialValues";
import { LogsConstants, LogsNames } from "./LogsConstants";
import FormsText from "../components/FormsText";

export const tableJson = TableInitialValues;

function jsonUpdate(jsonToUpdate, id: string, value: string) {
  jsonToUpdate[id] = value;
}

const element = (area: string, key: string) => (
  <DualCheck value={tableJson[area]} id={key} updateJson={jsonUpdate} />
);

const inputElement = (area: string, key: string, inputType: string) => (
  <FormsText
    value={tableJson[area]}
    id={key}
    updateJson={jsonUpdate}
    type={inputType}
  />
);

export const TableData = {
  bitacoraLimpiezaRecibos: {
    data: [
      [
        "Area de armado",
        element(
          LogsNames.BITACORA_LIMPIEZA_RECIBOS,
          LogsConstants.BITACORA_LIMPIEZA_RECIBOS.AREA_ARMADO
        ),
      ],
      [
        "Area de recibo",
        element(
          LogsNames.BITACORA_LIMPIEZA_RECIBOS,
          LogsConstants.BITACORA_LIMPIEZA_RECIBOS.AREA_RECIBO
        ),
      ],
      [
        "Congelador",
        element(
          LogsNames.BITACORA_LIMPIEZA_RECIBOS,
          LogsConstants.BITACORA_LIMPIEZA_RECIBOS.CONGELADOR
        ),
      ],
      [
        "Cuartos Frios",
        element(
          LogsNames.BITACORA_LIMPIEZA_RECIBOS,
          LogsConstants.BITACORA_LIMPIEZA_RECIBOS.CUARTOS_FRIOS
        ),
      ],
      [
        "Patio",
        element(
          LogsNames.BITACORA_LIMPIEZA_RECIBOS,
          LogsConstants.BITACORA_LIMPIEZA_RECIBOS.PATIO
        ),
      ],
      [
        "Rampas",
        element(
          LogsNames.BITACORA_LIMPIEZA_RECIBOS,
          LogsConstants.BITACORA_LIMPIEZA_RECIBOS.RAMPAS
        ),
      ],
      [
        "Transporte",
        element(
          LogsNames.BITACORA_LIMPIEZA_RECIBOS,
          LogsConstants.BITACORA_LIMPIEZA_RECIBOS.TRANSPORTE
        ),
      ],
      ["Observaciones"],
      [
        inputElement(
          LogsNames.BITACORA_LIMPIEZA_RECIBOS,
          LogsConstants.BITACORA_LIMPIEZA_RECIBOS.OBSERVACIONES,
          "default"
        ),
      ],
    ],
  },

  bitacoraLimpiezaEmpaques: {
    data: [
      [
        "Pisos",
        element(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.PISOS
        ),
      ],
      [
        "Mesas",
        element(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.MESAS
        ),
      ],
      [
        "Selladores",
        element(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.SELLADORES
        ),
      ],
      [
        "Básculas",
        element(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.BASCULAS
        ),
      ],
      [
        "Rampas",
        element(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.RAMPAS
        ),
      ],
      [
        "Estantes",
        element(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.ESTANTES
        ),
      ],
      [
        "Bandejas",
        element(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.BANDEJAS
        ),
      ],
      [
        "Patines",
        element(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.PATINES
        ),
      ],
      ["Observaciones"],
      [
        inputElement(
          LogsNames.BITACORA_LIMPIEZA_EMPAQUES,
          LogsConstants.BITACORA_LIMPIEZA_EMPAQUES.OBSERVACIONES,
          "default"
        ),
      ],
    ],
  },
  bitacoraLimpiezaCribasFV: {
    data: [
      [
        "Pisos",
        element(
          LogsNames.BITACORA_LIMPIEZA_CRIBAS_FV,
          LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.PISOS
        ),
      ],
      [
        "Mesas",
        element(
          LogsNames.BITACORA_LIMPIEZA_CRIBAS_FV,
          LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.MESAS
        ),
      ],
      [
        "Patio",
        element(
          LogsNames.BITACORA_LIMPIEZA_CRIBAS_FV,
          LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.PATIO
        ),
      ],
      [
        "Básculas",
        element(
          LogsNames.BITACORA_LIMPIEZA_CRIBAS_FV,
          LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.BASCULAS
        ),
      ],
      [
        "Rampas",
        element(
          LogsNames.BITACORA_LIMPIEZA_CRIBAS_FV,
          LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.RAMPAS
        ),
      ],
      [
        "Rejillas",
        element(
          LogsNames.BITACORA_LIMPIEZA_CRIBAS_FV,
          LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.REJILLAS
        ),
      ],
      [
        "Patines",
        element(
          LogsNames.BITACORA_LIMPIEZA_CRIBAS_FV,
          LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.PATINES
        ),
      ],
      ["Observaciones"],
      [
        inputElement(
          LogsNames.BITACORA_LIMPIEZA_CRIBAS_FV,
          LogsConstants.BITACORA_LIMPIEZA_CRIBAS_FV.OBSERVACIONES,
          "default"
        ),
      ],
    ],
  },
  bitacoraLimpiezaAlmacenes: {
    data: [
      [
        "Pisos",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.PISOS
        ),
      ],
      [
        "Pasillos",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.PASILLOS
        ),
      ],
      [
        "Extintoress",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.EXTINTORES
        ),
      ],
      [
        "Cuartos Frios",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.CUARTOS_FRIOS
        ),
      ],
      [
        "Puertas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.PUERTAS
        ),
      ],
      [
        "Muros",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.MUROS
        ),
      ],
      [
        "Racks",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.RACKS
        ),
      ],
      [
        "Cortinas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.CORTINAS
        ),
      ],
      [
        "Coladera",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.COLADERAS
        ),
      ],
      [
        "Rejillas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.REJILLAS
        ),
      ],
      [
        "Montacargas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.MONTACARGAS
        ),
      ],
      [
        "Patines",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.PATINES
        ),
      ],
      ["Observaciones"],
      [
        inputElement(
          LogsNames.BITACORA_LIMPIEZA_ALMACENES,
          LogsConstants.BITACORA_LIMPIEZA_ALMACENES.OBSERVACIONES,
          "default"
        ),
      ],
    ],
  },
  bitacoraLimpiezaEntregas: {
    data: [
      [
        "Pisos",
        element(
          LogsNames.BITACORA_LIMPIEZA_ENTREGAS,
          LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.PISOS
        ),
      ],
      [
        "Cuartos Frios",
        element(
          LogsNames.BITACORA_LIMPIEZA_ENTREGAS,
          LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.CUARTOS_FRIOS
        ),
      ],
      [
        "Básculas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ENTREGAS,
          LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.BASCULAS
        ),
      ],
      [
        "Racks",
        element(
          LogsNames.BITACORA_LIMPIEZA_ENTREGAS,
          LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.RACKS
        ),
      ],
      [
        "Cortinas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ENTREGAS,
          LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.CORTINAS
        ),
      ],
      [
        "Rampas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ENTREGAS,
          LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.RAMPAS
        ),
      ],
      [
        "Patines",
        element(
          LogsNames.BITACORA_LIMPIEZA_ENTREGAS,
          LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.PATINES
        ),
      ],
      ["Observaciones"],
      [
        inputElement(
          LogsNames.BITACORA_LIMPIEZA_ENTREGAS,
          LogsConstants.BITACORA_LIMPIEZA_ENTREGAS.OBSERVACIONES,
          "default"
        ),
      ],
    ],
  },
  bitacoraLimpiezaAlimentoCompartidos: {
    data: [
      [
        "Pisos",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.PISOS
        ),
      ],
      [
        "Cuartos Frios",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.CUARTOS_FRIOS
        ),
      ],
      [
        "Refrigeradores",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.REFRIGERADORES
        ),
      ],
      [
        "Congeladores",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.CONGELADORES
        ),
      ],
      [
        "Racks",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.RACKS
        ),
      ],
      [
        "Cortinas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.CORTINAS
        ),
      ],
      [
        "Patines",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.PATINES
        ),
      ],
      [
        "Básculas",
        element(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.BASCULAS
        ),
      ],
      ["Observaciones"],
      [
        inputElement(
          LogsNames.BITACORA_LIMPIEZA_ALIMENTOS,
          LogsConstants.BITACORA_LIMPIEZA_ALIMENTOS.OBSERVACIONES,
          "default"
        ),
      ],
    ],
  },
  bitacoraTemperaturas: {
    data: [
      [
        "Cuarto Frío 1",
        inputElement(
          LogsNames.BITACORA_TEMPERATURAS,
          LogsConstants.BITACORA_TEMPERATURAS.CUARTO_FRIO_1,
          "numeric"
        ),
      ],
      [
        "Cuarto Frío 2",
        inputElement(
          LogsNames.BITACORA_TEMPERATURAS,
          LogsConstants.BITACORA_TEMPERATURAS.CUARTO_FRIO_2,
          "numeric"
        ),
      ],
      [
        "Cámara de conservación B",
        inputElement(
          LogsNames.BITACORA_TEMPERATURAS,
          LogsConstants.BITACORA_TEMPERATURAS.CAMARA_CONSERVACION_B,
          "numeric"
        ),
      ],
      [
        "Cámara de conservación C",
        inputElement(
          LogsNames.BITACORA_TEMPERATURAS,
          LogsConstants.BITACORA_TEMPERATURAS.CAMARA_CONSERVACION_C,
          "numeric"
        ),
      ],
      ["Observaciones"],
      [
        inputElement(
          LogsNames.BITACORA_TEMPERATURAS,
          LogsConstants.BITACORA_TEMPERATURAS.OBSERVACIONES,
          "default"
        ),
      ],
    ],
  },
  bitacoraExtintores: {
    data: [
      [
        "Capacidad",
        element(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.CAPACIDAD
        ),
      ],
      [
        "Manómetro",
        element(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.MANOMETRO
        ),
      ],
      [
        "Estado Físico",
        element(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.ESTADO_FISICO
        ),
      ],
      [
        "Mangueras",
        element(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.MANGUERAS
        ),
      ],
      [
        "Seguro",
        element(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.SEGURO
        ),
      ],
      [
        "Etiquetas",
        element(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.ETIQUETAS
        ),
      ],
      [
        "Holograma",
        element(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.HOLOGRAMA
        ),
      ],
      [
        "Última Revisión",
        inputElement(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.ULTIMA_REVISION,
          "numeric"
        ),
      ],
      [
        "Próxima Recarga",
        inputElement(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.PROXIMA_RECARGA,
          "numeric"
        ),
      ],
      ["Observaciones"],
      [
        inputElement(
          LogsNames.BITACORA_EXTINTORES,
          LogsConstants.BITACORA_EXTINTORES.OBSERVACIONES,
          "default"
        ),
      ],
    ],
  },
};
