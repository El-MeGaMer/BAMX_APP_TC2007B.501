import { Text, View, TouchableOpacity, Pressable } from "react-native";
import React, { Component } from "react";

import { styled } from "nativewind";

import { TableInitialValues } from "../constants/TableInitialValues";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

import { useNavigation } from "@react-navigation/native";

const LogoutButton = () => {
  const logout = () => {
    console.log("Logged Out!");
  };

  return (
    <StyledTouchableOpacity
      onPress={logout}
      className=" bg-orange p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-4/5 items-center focus:bg-red-50"
    >
      <StyledText className="text-white font-bold text-md">
        Cerrar Sesión
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default LogoutButton;
