import React, { useEffect, useState } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { TableData, tableJson } from "../constants/TableData";
import Background from "./Background";
import { TouchableOpacity, View, Text, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Container from "./Container";
import { styled } from "nativewind";
import { LogsUpdateRef } from "../constants/LogsConstants";
import { StyleSheet } from "react-native";
import ModalComponent from "./ModalComponent";
import ModalConfirm from "./Modal";
import * as SecureStore from 'expo-secure-store'

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const TwoColLog = (props, { navigation }) => {
  const tableHead = ["Concepto", "Hecho (N / s)"];

  const [form, setForm] = useState(tableJson[props.type]);
  const [confirmation, setConfirmation] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null)

  useEffect(() => {
    obtenerToken();
  }, []);

  const obtenerToken = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        const tokenObj = JSON.parse(token);
        setTokenInfo(tokenObj);
      } else {
        console.log('No se encontro ningun token almacenado');
      }
    } catch (error) {
      console.log("Error: ", error)
    }
  };

  const enviarFormulario = async () => {
    console.log("envianding");
    setForm(tableJson[props.type]);
    try {
      const response = await LogsUpdateRef[props.logName](props.id, tokenInfo.id, form);
      setSubmissionStatus(response);
    } catch (error) {
      console.error("Error al enviar el incidente:", error);
      setSubmissionStatus({
        status: "error",
        message: "Hubo un error al enviar el incidente.",
      });
    }
    setIsModalVisible(true); 
  };

  const handleHideModal = () => {
    setIsModalVisible(false);
    navigation.navigate("OtroComponente");
  };

  return (
    <Background>
      <Container notCenter="true">
        <StyledView className="items-center pb-2">
          <StyledText className="text-black text-lg font-semibold">
            {props.title ? props.title : "Enviar Bitácora"}
          </StyledText>
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
        <ModalConfirm
          result={submissionStatus}
          isVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          handleHideModal={handleHideModal}
        />
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
