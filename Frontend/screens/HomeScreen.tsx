import React, { useState, Component } from "react";
import { StyleSheet, Alert, Text, View, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
//import { Text, View } from "../components/Themed";
import Container from "../components/Container";
import Background from "../components/Background";
import {
  Calendar,
  CalendarList,
  Agenda,
  LocaleConfig,
  DateData,
  AgendaEntry,
  AgendaSchedule,
} from "react-native-calendars";

import testIDs from "../test/testIDs";

LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene.",
    "Feb.",
    "Mar.",
    "Abr.",
    "May.",
    "Jun.",
    "Jul.",
    "Ago.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mié.", "Jue.", "Vie.", "Sáb."],
  today: "Hoy",
};

LocaleConfig.defaultLocale = "es";

interface State {
  items?: AgendaSchedule;
}

export default class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined,
  };

  render() {
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={"2023-11-21"}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
      />
    );
  }

  loadItems = async (day: DateData) => {
    const items = this.state.items || {};

    try {
      // Cambiar IP a donde se esta corriendo el Backend
      const BACKEND_IP = "10.41.55.7";
      const response = await fetch(`http://${BACKEND_IP}:3000/recordatorio/`, {
        method: "GET",
        headers: {
          "Content-type": "application/json"
        }
      });
      const data = await response.json()

      const newItems: AgendaSchedule = {};
      Object(data).forEach((recordatorio) => {
        const day = recordatorio.horaInicial.slice(0, 10);
        if (newItems.hasOwnProperty(day)) {
          newItems[day].push(recordatorio)
        } else {
          newItems[day] = [recordatorio]
        }
      });
      this.setState({
        items: newItems,
      });

      console.log(items)
    
    }  catch(err) {
      console.log(err);
    }
  };

  renderDay = (day) => {
    if (day) {
      return <Text style={styles.customDay}>{day.getDay()}</Text>;
    }
    return <View style={styles.dayItem} />;
  };

  renderItem = (recordatorio: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, { height: recordatorio.height }]}
        onPress={() => Alert.alert(recordatorio.descripcion)}
      >
        <Text style={{ fontSize, color }}>{recordatorio.nombre}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  rowHasChanged = (r1: AgendaEntry, r2: AgendaEntry) => {
    return r1.name !== r2.name;
  };

  timeToString(time: number) {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: "green",
  },
  dayItem: {
    marginLeft: 34,
  },
});

// .
