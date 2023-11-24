import React, { useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { TableData, tableJson } from "../constants/TableData";
import Background from "./Background";
import { TouchableOpacity, View, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Container from "./Container";
import { styled } from "nativewind";

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const TwoColLog = (props) => {
  const tableHead = ["Concepto", "Hecho (N / s)"];

  const [form, setForm] = useState(tableJson[props.type]);
  const [confirmation, setConfirmation] = useState(false);

  const enviarFormulario = () => {
    console.log("envianding");
    console.log(props.type);
    setForm(tableJson[props.type]);
    console.log(form);
  };

  return (
    <Background>
      <Container notCenter="true">
        <StyledView className="items-center pb-2">
          <StyledText className="text-black text-lg">{props.title? props.title : "Enviar Bitácora"}</StyledText>
        </StyledView>
        <Table borderStyle={{ borderWidth: 2, borderColor: "#BBC2CF" }}>
          <Row
            data={tableHead}
            style={{ height: 40, backgroundColor: "#f1f8ff" }}
            textStyle={{ textAlign: "center", fontWeight: "bold" }}
          />
          <Rows
            data={TableData[props.type].data}
            style={{ height: 80 }}
            textStyle={{ textAlign: "center", alignItems: "center" }}
          />
        </Table>
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

export default TwoColLog;
