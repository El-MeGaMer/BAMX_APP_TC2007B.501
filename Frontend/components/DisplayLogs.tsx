import { View } from "react-native";
import React from "react";
import TwoColLog from "./TwoColLog";
import { styled } from "nativewind";
import { TableInitialValues } from "../constants/TableInitialValues";

const StyledView = styled(View);

export default function DisplayLogs({ route, navigation, updateFunction}) {
  const { desiredLog, logTitle, logID, nameOfLog } = route.params;
  return (
    <StyledView className="flex-1">
      <TwoColLog type={desiredLog} initialValues={TableInitialValues[desiredLog]} title={logTitle} id={logID} logName ={nameOfLog}/>
    </StyledView>
  );
}
