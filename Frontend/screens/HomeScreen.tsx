import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Container from "../components/Container";
import TwoColLog from "../components/TwoColLog";
import Background from "../components/Background";

import { styled } from "nativewind";

const StyledView = styled(View);
// Home screen function
export default function HomeScreen() {
  return (
    <StyledView className="flex-1">
      <Background>
          <TwoColLog type = "bitacora_limpieza"/>
      </Background>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
