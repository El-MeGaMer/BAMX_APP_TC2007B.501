import { View } from "react-native";
import React from "react";
import TwoColLog from "./TwoColLog";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function DisplayLogs({ route, navigation }) {
  const { desiredLog } = route.params;
  return (
    <StyledView className="flex-1">
      <TwoColLog type={desiredLog} />
    </StyledView>
  );
}
