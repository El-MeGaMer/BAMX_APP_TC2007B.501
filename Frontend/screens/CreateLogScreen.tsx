// This screen is used to create a new log entry, destinated to
// users that capture the information
// role: area_supervisor

import { View, Text } from "../components/Themed";
import Container from "../components/Container";

import { styled } from "nativewind";

import Background from "../components/Background";
import ContainerAlert from "../components/ContainerAlert";
import SelectLogButton from "../components/SelectLogButton";
import { useEffect, useState } from "react";
import { getLogsAvailable } from "../apis/VisualizationApi";

import { LogsNames, LogsUpdateRef } from "../constants/LogsConstants";
import { useIsFocused } from "@react-navigation/native";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function CreateLogScreen() {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const callAPI = async () => {
    try {
      const response = await getLogsAvailable(2);
      setData(response);
      console.log(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      callAPI();
    }
    console.log(data);
  }, [isFocused]);

  if (loading || !data.length) {
    return (
      <StyledView className="flex-1 ">
        <Background>
          <ContainerAlert>
            <StyledText className = "font-bold">No hay bitácoras para mostrar!</StyledText>
          </ContainerAlert>
        </Background>
      </StyledView>
    );
  }
  return (
    <>
      {!loading && (
        <StyledView className="flex-1 ">
          <Background>
            <Container className>
              {data.map((log) => {
                const keys = Object.keys(log);
                const bitacora = keys[keys.length - 1];
                console.log(bitacora)
                console.log(log.estado)
                console.log(LogsNames[bitacora])
                return(

                  <SelectLogButton
                    text={log["nombre"]}
                    destinatedLog={LogsNames[bitacora]}
                    id = {log["id"]}
                    logName ={bitacora}
                    getType = {false}
                  />
                )
                }
              )}
            </Container>
          </Background>
        </StyledView>
      )}
    </>
  );
}
