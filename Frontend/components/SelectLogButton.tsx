import { Text, View, TouchableOpacity, Pressable } from "react-native";
import React, { Component } from "react";

import { styled } from "nativewind";

import { TableInitialValues } from "../constants/TableInitialValues";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);




import { useNavigation } from "@react-navigation/native";

const SelectLogButton = ({ text, destinatedLog, id, logName, getType }) => {
  const navigation = useNavigation();

  //
  const showLog = () => {
    navigation.removeListener;
    console.log(TableInitialValues[destinatedLog])
    navigation.navigate({
      name: "DisplayLogs",
      params: { desiredLog: destinatedLog, initialValues: TableInitialValues[destinatedLog], logTitle: text, logID: id, nameOfLog: logName, getData: getType},
    } as never);
  };

  return (
    <StyledTouchableOpacity
      onPress={showLog}
      className=" bg-orange p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-4/5 items-center"
    >
      <StyledText className="text-white font-bold text-lg">
        {text ? text : "asdsd"}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default SelectLogButton;
