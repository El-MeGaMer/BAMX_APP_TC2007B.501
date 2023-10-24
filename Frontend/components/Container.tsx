import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

import { View } from "./Themed";

import { ImageBackground } from "react-native";
const background = "../assets/images/background_rectangle.png";

const Container = (props) => {
  return (
    <ImageBackground source={require(background)} style={styles.background}>
      <View
        style={styles.card_container}
        lightColor={Colors.light.background}
        darkColor={Colors.dark.background}
      >
        {props.children}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "fill",
    height: "40%",
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
