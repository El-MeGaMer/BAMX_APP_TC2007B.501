import { StyleSheet } from "react-native";

import { View, Text } from "./Themed";

import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
const background = "../assets/images/background_rectangle.png";

import { styled } from "nativewind";
import { ScrollView } from "react-native-gesture-handler";

const StyledView = styled(View);
const StyledScrollView = styled(ScrollView);

const Container = (props) => {
  return (
    <StyledView
      className={
        props.notCenter
          ? "flex-1 pt-6 justify-center m-6 mb-0 shadow"
          : "flex-1 pt-6 items-center justify-center m-6 mb-0 shadow"
      }
    >
      {props.children}
    </StyledView>
  );
};

export default Container;
