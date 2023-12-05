import { Text, View, TouchableOpacity, Pressable } from "react-native";
import React, { Component } from "react";
import { styled } from "nativewind";
import { TableInitialValues } from "../constants/TableInitialValues";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

import { useNavigation } from "@react-navigation/native";

const LogRevisionItem = ({
  text,
  destinatedLog,
  id,
  logName,
  getType,
  fecha,
}) => {
  const navigation = useNavigation();

  const hora = new Date(fecha);
  console.log(hora);
  const ms = hora.getTime();
  const subsms = 420 * 60000;
  const horaAjustada = new Date(ms + subsms);
  console.log(horaAjustada);
  const timeAgo = formatDistanceToNow(horaAjustada, {
    addSuffix: false,
    locale: es,
    includeSeconds: false,
  });

  const formattedTimeAgo = `hace ${timeAgo}`;

  //
  const showLog = () => {
    navigation.removeListener;
    console.log(TableInitialValues[destinatedLog]);
    navigation.navigate({
      name: "DisplayLogs",
      params: {
        desiredLog: destinatedLog,
        initialValues: TableInitialValues[destinatedLog],
        logTitle: text,
        logID: id,
        nameOfLog: logName,
        getData: getType,
      },
    } as never);
  };

  return (
    <StyledTouchableOpacity
      onPress={showLog}
      className=" p-3 shadow px-8 pt-4 pb-4 mb-4 w-max items-left"
    >
      <StyledText className="text-lg font-bold">
        {text ? text : "asdsd"}
      </StyledText>
      <StyledText className=" text-lg">{formattedTimeAgo}</StyledText>
      <StyledText className=" text-lg">{id}</StyledText>
    </StyledTouchableOpacity>
  );
};

export default LogRevisionItem;

//
