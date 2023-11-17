import React from "react";
import { View, Text, FlatList, SectionList, StyleSheet } from "react-native";

const MIS_DATOS = [
  {
    title: "Bitácora de limpieza",
    desc: "Se ha recibido una bitácora de limpieza del área 1",
    time: "16 m",
  },
  {
    title: "Bitácora de limpieza",
    desc: "Se ha recibido una bitácora de limpieza del área 1",
    time: "14 m",
  },
];

const REVISADOS = [
  {
    title: "Bitácora de criba F y V",
    desc: "Se ha recibido una bitácora de limpieza del área 1 F y V",
    time: "5 m",
  },
  {
    title: "Bitácora de criba F y V",
    desc: "Se ha recibido una bitácora de limpieza del área 1 F y V",
    time: "1 h",
  },
];

const LogsScreen = () => {
  const data = [
    { title: "Sin Revisar", data: MIS_DATOS },
    { title: "Revisados", data: REVISADOS },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.desc}</Text>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  desc: {
    fontSize: 16,
    color: "#555",
  },
  time: {
    fontSize: 14,
    color: "#888",
  },
  sectionHeader: {
    backgroundColor: "#f0f0f0",
    padding: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LogsScreen;
