import React, { useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { TableData, tableJson } from "../constants/TableData";
import Background from "./Background";
import { TouchableOpacity, View, Text, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Container from "./Container";
import { styled } from "nativewind";
import { LogsUpdateRef } from "../constants/LogsConstants";
import { StyleSheet } from "react-native";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const TwoColLog = (props, {navigation}) => {
  const tableHead = ["Concepto", "Hecho (N / s)"];

  const [form, setForm] = useState(tableJson[props.type]);
  const [confirmation, setConfirmation] = useState(false);

  const enviarFormulario = () => {
    console.log("envianding");
    console.log(props.type);
    setForm(tableJson[props.type]);
    console.log(form);
    LogsUpdateRef[props.logName](props.id, 1, form)
  };

  return (
    <Background>
      <Container notCenter="true">
        <StyledView className="items-center pb-2">
          <StyledText className="text-black text-lg font-semibold">{props.title? props.title : "Enviar Bitácora"}</StyledText>
        </StyledView>
        <StyledView className=" p-3">

        <Table borderStyle={{ borderWidth: 1, borderColor: "#BBC2CF" }}>
          <Row
            data={tableHead}
            style={{ height: 40, backgroundColor: "#D9D9D9" }}
            textStyle={{ textAlign: "center", alignItems: "center" }}
          />
          <Rows
            data={TableData[props.type].data}
            style={{ height: 80 }}
            textStyle={{ textAlign: "center", alignItems: "center" }}
          />
        </Table>
        </StyledView>
        <StyledView className=" pt-5 items-center">
          <BouncyCheckbox
            disableBuiltInState
            text="Confirmo que los datos son correctos"
            isChecked={confirmation}
            onPress={() => setConfirmation(!confirmation)}
            fillColor="orange"
          />
          <StyledView className="pt-4">
            <StyledTouchableOpacity
              className={
                confirmation
                  ? "bg-orange p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-4/5 items-center"
                  : " bg-gray-400 p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-4/5 items-center"
              }
              disabled={!confirmation}
              onPress={enviarFormulario}
            >
              <View>
                <StyledText className="text-md text-white">
                  Enviar Formulario
                </StyledText>
              </View>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </Container>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#D9D9D9" },
  text: { margin: 7 },
  textTitle: { margin: 6, fontWeight: "bold" },
});

export default TwoColLog;
