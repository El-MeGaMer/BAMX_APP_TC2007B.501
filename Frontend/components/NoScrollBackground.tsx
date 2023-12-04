import { StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";

const background = "../assets/images/background_rectangle.svg";

const NoScrollBackground = (props) => {
  return (
    <View style={styles.background}>
      <View style={styles.box}>
        <Svg width="721" height="488" viewBox="0 175 721 488">
          <Path d="M0 0h721v357.431L0 488V0Z" fill="#FF8001" />
        </Svg>
      </View>

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll_view}>{props.children}</ScrollView>
      </SafeAreaView>
    </View>
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
    width: "100%",
  },
  scroll_view: {
    flex: 1,
    width: "100%",
    padding: 0,
    paddingTop: 0,
  },
  card_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    marginBottom: 0,
    shadowColor: "black",
    shadowOpacity: 0.25,
  },
  box: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});

export default NoScrollBackground;
