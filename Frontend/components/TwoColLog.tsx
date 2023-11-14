import React from "react";
import { View, TextInput } from "react-native";
import { CheckBox } from "react-native-elements";
import { Table, Row, Rows } from "react-native-table-component";
import { TableData } from "../constants/TableData";
import Container from "./Container";
import Background from "./Background";

const TwoColLog = (props) => {
  const tableHead = ["Concepto", "Hecho (s / N)"];

  return (
    <Background>
      <Container notCenter={true}>
        <View
          style={{
            flex: 1,
            padding: 16,
            paddingTop: 30,
            backgroundColor: "#fff",
          }}
        >
          <Table borderStyle={{ borderWidth: 2, borderColor: "#BBC2CF" }}>
            <Row
              data={tableHead}
              style={{ height: 40, backgroundColor: "#f1f8ff" }}
              textStyle={{ textAlign: "center", fontWeight: "bold" }}
            />
            <Rows
              data={TableData[props.type]}
              style={{ height: 80,}}
              textStyle={{ textAlign: "center", alignItems: "center" }}
            />
          </Table>
        </View>
      </Container>
    </Background>
  );
};

export default TwoColLog;