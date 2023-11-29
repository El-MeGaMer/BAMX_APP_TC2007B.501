import { StyleSheet } from "react-native";

import { View, Text } from "./Themed";

import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
const background = "../assets/images/background_rectangle.png";

import { styled } from "nativewind";
import { ScrollView } from "react-native-gesture-handler";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);

const DisplayBool = (props) => {
  return (
    <StyledView className = "items-center">
      <StyledText className ={props.value? "text-xl font-semibold text-green-600" : "text-lg font-semibold text-red-600"}>{props.value ? "Si" : "No"}</StyledText>
    </StyledView>
  );
};

export default DisplayBool;
