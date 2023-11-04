import { StyleSheet } from "react-native";
import { View, Text } from "./Themed";
import { ImageBackground, SafeAreaView, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Path } from 'react-native-svg';

const background = "../assets/images/background_rectangle.svg";

const Background = (props) => {
  return (
    <ImageBackground source={require(background)} style={styles.background}>
      <View style={styles.box}>
         <Svg width="393" height="349" viewBox="0 100 393 349" fill="none" >
           <Path d="M0 0H393V255.622L0 349V0Z" fill="#FF8001"/>
          </Svg>
       </View>
       
      <SafeAreaView style={styles.container}>
        <ScrollView >
          {props.children}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
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
  box: {
    backgroundColor: '#FF8001',
    height: "0%",
  },
});

export default Background;
