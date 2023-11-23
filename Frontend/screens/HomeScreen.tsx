import React, { useState, Component } from "react";
import { StyleSheet, Alert, Text, View, TouchableOpacity } from "react-native";

import { styled } from "nativewind";

import {
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
  isCalendarOpen: boolean;
}

export default class AgendaScreen extends Component<State> {
  state: State = {
    items: undefined,
    isCalendarOpen: false,
  };

  render() {
    const currentDate = new Date();
    const selectedDate = currentDate.toISOString();

    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={selectedDate}
        renderEmptyData={this.renderEmptyData}
        renderItem={this.renderItem}
        onCalendarToggled={this.onCalendarToggled}
        rowHasChanged={this.rowHasChanged}
        showClosingKnob={true}
      />
    );
  }

  loadItems = async (day: DateData) => {
    const items = this.state.items || {};

    try {
      // Cambiar IP a donde se esta corriendo el Backend
      const BACKEND_IP = "10.41.34.161";
      const response = await fetch(`http://${BACKEND_IP}:3000/recordatorio/`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await response.json();

      const newItems: AgendaSchedule = {};
      Object(data).forEach((recordatorio) => {
        const day = recordatorio.horaInicial.slice(0, 10);
        if (newItems.hasOwnProperty(day)) {
          newItems[day].push(recordatorio);
        } else {
          newItems[day] = [recordatorio];
        }
      });

      this.setState({
        items: newItems,
      });
    } catch (err) {
      console.log(err);
    }
  };

  renderItem = (recordatorio: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";
    console.log("holis");

    return (
      <TouchableOpacity
        style={[styles.item, { height: recordatorio.height }]}
        onPress={() => Alert.alert(recordatorio.descripcion)}
      >
        <Text style={{ fontSize, color }}>{recordatorio.nombre}</Text>
      </TouchableOpacity>
    );
  };

  renderEmptyData = () => {
    return (
      <View style={styles.emptyDate}>
        <Text style={styles.emptyDateText}>
          ¡No hay tareas pendientes por hoy!
        </Text>
      </View>
    );
  };

  onCalendarToggled = (isCalendarOpen: boolean) => {
    // Handle calendar toggle event
    console.log("Calendar is now", isCalendarOpen ? "open" : "closed");

    // You can perform additional actions based on the calendar state
    // For example, you might want to fetch data when the calendar is opened
    if (!isCalendarOpen) {
      console.log(isCalendarOpen);
      this.renderEmptyData();
    }
    this.setState({ isCalendarOpen });
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
    display: "flex",
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  emptyDateText: {
    fontSize: 25,
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
