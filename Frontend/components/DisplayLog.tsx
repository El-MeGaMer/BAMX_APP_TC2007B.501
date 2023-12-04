import React, { useState, useEffect } from "react";
import { Table, Row, Rows } from "react-native-table-component";
import { TableData, tableJson } from "../constants/TableData";
import Background from "./Background";
import { TouchableOpacity, View, Text, Button } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Container from "./Container";
import { ScrollView } from "react-native-gesture-handler";
import { styled } from "nativewind";
import { getRecibo, getTemperatura } from "../apis/VisualizationApi";
import { GetTableData } from "../constants/GetTableData";
import DisplayBool from "./DisplayBool";
import { GetTableFunctions } from "../constants/LogsConstants";
import { StyleSheet } from "react-native";
import { LogsUpdateRef } from "../constants/LogsConstants";
import ModalConfirm from "./Modal";
import * as SecureStore from 'expo-secure-store'

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);

const DisplayLog = (props, { navigation }) => {
  const [confirmation, setConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [reqData, setData] = useState([]);
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

  console.log(tokenInfo)

  const callAPI = async () => {
    try {
      // Gets the function from the LogsConstants file and calls it
      const response = await GetTableFunctions[props.logRef](props.id); // TODO: Change the 1 to the actual ID
      setData(response);
      setLoading(false);
    } catch (err) {
      console.warn("erroe: ", err);
    }
  };

  const enviarFormulario = async () => {
    console.log("Sending");
    try {
      const response = await LogsUpdateRef[props.logRef](props.id, tokenInfo.id, {});
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

  useEffect(() => {
    callAPI();
  }, []);

  const tableHead = ["Campo", "Valor"];
  const tableData = GetTableData[props.type].data.map((log) => {
    return [
      log[0], // Log[0] is the name of the field
      typeof reqData[log[1]] == "boolean" ? ( // Log[1] is the name of the field in the API
        <DisplayBool value={reqData[log[1]]} /> // Checks if field is boolean
      ) : // !TODO: Change numbers color depending on the parameters in backend
      typeof reqData[log[1]] == "number" ? (
        reqData[log[1]].toString()
      ) : (
        reqData[log[1]]
      ),
    ];
  });
  const logData = tableData;

  if (!loading) {
    return (
      <Background>
        <Container notCenter="true">
          <StyledView className="items-center pb-2">
            <StyledText className="text-black font-semibold text-lg">
              {props.title ? props.title : "Revisar Bitácora"}
            </StyledText>
          </StyledView>
          <StyledView className="flex-row justify-between pr-3 pl-3">
            <StyledView>
              <StyledText style={styles.textTitle}>ID de bitácora</StyledText>
              <StyledText style={styles.text}>
                {reqData ? reqData["id"] : "bitácora sin ID"}
              </StyledText>
            </StyledView>
            <StyledView>
              <StyledText style={styles.textTitle}>Nombre</StyledText>
              <StyledText style={styles.text}>
                {reqData ? reqData["nombre"] : "bitácora sin ID"}
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="pl-3 pr-3">
            <StyledText style={styles.textTitle}>Fecha y hora</StyledText>
            <StyledText style={styles.text}>
              {reqData ? reqData["fechaHora"] : "bitácora sin ID"}
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
                data={logData}
                style={{ height: 80 }}
                textStyle={{ textAlign: "center", alignItems: "center" }}
              />
            </Table>
          </StyledView>

          <StyledView className=" pt-5 items-center">
            {/* FIXME: Make it functional */}
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
  }
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#D9D9D9" },
  text: { margin: 7 },
  textTitle: { margin: 6, fontWeight: "bold" },
});

export default DisplayLog;
