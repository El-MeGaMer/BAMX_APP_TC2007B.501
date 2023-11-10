import { Text, View , TextInput} from 'react-native'
import React, { Component } from 'react'
import { CheckBox } from "react-native-elements";

export const TableData = {

  
    bitacora_limpieza: [
      ["Area de armado de despensas", <CheckBox />],
      ["Area de recibo", <CheckBox />],
      ["Patios", <CheckBox />],
      ["Rampas (entrega, recibo, criba f y v)", <CheckBox />],
      ["Cuartos frios", <CheckBox />],
      ["Congelador", <CheckBox />],
      ["Transporte", <CheckBox />],
      ["Observaciones"],
      [<TextInput />]
    ],

    bitacora_limpieza2: [
      ["Area de armado de despensas", <CheckBox />],
      ["Area de recibo", <CheckBox />],
      ["Patios, rampas de entrega", <CheckBox />],
      ["Area de entrega", <CheckBox />],
      ["Patios, rampas de recibo", <CheckBox />],
      ["Cuartos frios", <CheckBox />],
      ["Transporte", <CheckBox />],
      ["Observaciones"],
      [<TextInput />]
    ],

    bitacora_limpiezaRecibo: [
      ["Pisos, paredes", <CheckBox />],
      ["Racks", <CheckBox />],
      ["Bascula", <CheckBox />],
      ["Patios", <CheckBox />],
      ["Rampa, cortinas", <CheckBox />],
      ["Rejillas, coladeras, canaletas", <CheckBox />],
      ["Patines", <CheckBox />],
      ["Observaciones"],
      [<TextInput />]
    ],
    bitacora_limpiezaFruta: [
      ["Pisos, paredes, racks", <CheckBox />],
      ["Mesas, cajas de empaque", <CheckBox />],
      ["Basculas, banda", <CheckBox />],
      ["Patios", <CheckBox />],
      ["Rampa, cortinas", <CheckBox />],
      ["Rejillas, coladeras, canaletas", <CheckBox />],
      ["Patines", <CheckBox />]
      ["Observaciones"],
      [<TextInput />]
    ],
    bitacora_limpiezaPaquetes: [
      ["Pisos, pasillos, extintores", <CheckBox />],
      ["Mesas, cajas de empaque", <CheckBox />],
      ["Basculas", <CheckBox />],
      ["Selladoras", <CheckBox />],
      ["Estantes, ventanas", <CheckBox />],
      ["Cucharones, bandejas", <CheckBox />],
      ["Patines, diablitos", <CheckBox />],
      ["Observaciones"],
      [<TextInput />]
    ],
    bitacora_limpiezaEntrega: [
      ["Pisos, pasillos, extintores", <CheckBox />],
      ["Cuartos frios", <CheckBox />],
      ["Bascula", <CheckBox />],
      ["Racks", <CheckBox />],
      ["Cortinas, coladeras, rejillas", <CheckBox />],
      ["Rampa, banqueta", <CheckBox />],
      ["Patines", <CheckBox />],
      ["Observaciones"],
      [<TextInput />]
    ],
    bitacora_limpiezaAlimento: [
      ["Pisos, paredes, mesas", <CheckBox />],
      ["Refrigerador", <CheckBox />],
      ["Congelador", <CheckBox />],
      ["Estantes, racks", <CheckBox />],
      ["Cortinas, coladeras. rejillas, rampa, banqueta", <CheckBox />],
      ["Bascula (S)", <CheckBox />],
      ["Patin", <CheckBox />],
      ["Observaciones"],
      [<TextInput />]
    ],
    bitacora_limpiezaAlmacen: [
      ["Pisos, pasillos, extintores", <CheckBox />],
      ["Cuartos Frios", <CheckBox />],
      ["Puertas, muros", <CheckBox />],
      ["Racks", <CheckBox />],
      ["Cortinas, coladeras, rejillas", <CheckBox />],
      ["Montacargas", <CheckBox />],
      ["Patines", <CheckBox />],
      ["Observaciones"],
      [<TextInput />]
    ],
    bitacora_temperatira: [
      ["Hora", <TextInput />],
      ["Cuarto frio 1 (panaderia)", <TextInput />],
      ["Cuarto frio 2 (frutas y verduras)", <TextInput />],
      ["Camara de conservacion B", <TextInput />],
      ["Camara de conservacion C", <TextInput />]
    ]
  };

  