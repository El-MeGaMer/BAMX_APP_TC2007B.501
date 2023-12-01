import { View, Text } from "../components/Themed";

import { styled } from "nativewind";

import Background from "../components/Background";
import ContainerAlert from "../components/ContainerAlert";
import SelectLogButton from "../components/SelectLogButton";
import { useEffect, useState } from "react";
import { getLogsAvailable } from "../apis/VisualizationApi";

import { LogsNames, LogsUpdateRef } from "../constants/LogsConstants";
import { useIsFocused } from "@react-navigation/native";
import { getLogPending } from "../apis/VisualizationApi";
import LogRevisionItem from "../components/LogRevisionItem";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function PendingLogScreen() {
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const callAPI = async () => {
    try {
      const response = await getLogPending();
      setData(response);
      console.log(data[1]);
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
            <StyledText className="font-bold">
              ¡No hay bitácoras para mostrar!
            </StyledText>
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
            <StyledView className="bg-white">
              <Text className="p-3 shadow text-xl font-bold pt-4 pb-1 w-max items-left">
                Por revisar
              </Text>

              {data[1].map((log) => {
                console.log(log);
                const keys = Object.keys(log);
                const bitacora = keys[keys.length - 1];
                console.log("BITACORA");
                console.log(bitacora);
                console.log(log.estado);
                console.log(LogsNames[bitacora]);

                return (
                  <LogRevisionItem
                    text={log["nombre"]}
                    destinatedLog={LogsNames[bitacora]}
                    id={log.id}
                    logName={bitacora}
                    getType={true}
                    fecha={log["fechaHora"]}
                  />
                );
              })}

              <Text className="p-3 shadow text-xl font-bold pt-4 pb-1 w-max items-left">
                Revisados
              </Text>
              {data[0].map((log) => {
                console.log(log);
                const keys = Object.keys(log);
                const bitacora = keys[keys.length - 1];
                console.log("BITACORA");
                console.log(bitacora);
                console.log(log.estado);
                console.log(LogsNames[bitacora]);

                return (
                  <LogRevisionItem
                    text={log["nombre"]}
                    destinatedLog={LogsNames[bitacora]}
                    id={log.id}
                    logName={bitacora}
                    getType={true}
                    fecha={log["fechaHora"]}
                  />
                );
              })}
            </StyledView>
          </Background>
        </StyledView>
      )}
    </>
  );
}
