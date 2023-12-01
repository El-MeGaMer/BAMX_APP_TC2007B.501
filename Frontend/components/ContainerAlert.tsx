import { StyleSheet } from "react-native";

import { View, Text } from "./Themed";

import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
const background = "../assets/images/background_rectangle.png";

import { styled } from "nativewind";

const StyledView = styled(View);

const ContainerAlert = (props) => {
  return (
    <StyledView
      className={
           "flex-1 p-20 pl-0 pr-0 justify-center m-6 mb-0 shadow items-center"
      }
    >
      {props.children}
    </StyledView>
  );
};

export default ContainerAlert;
