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

const styles = StyleSheet.create({
  contentContainer: {},
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  background: {
    flex: 1,
    resizeMode: "fill",
    height: "40%",
  },
  scroll_view: {
    flex: 1,
    width: "100%",
    padding: 20,
    paddingTop: 0,
  },
  card_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
    marginBottom: 0,
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
});

export default Container;
