import { Text, TouchableOpacity } from "react-native";
import React from "react";

import { styled } from "nativewind";

import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

import { useNavigation } from "@react-navigation/native";

const LogoutButton = () => {
  const navigation = useNavigation();
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      await Updates.reloadAsync();
      } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
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
