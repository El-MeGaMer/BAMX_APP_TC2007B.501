import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Container from "../components/Container";

import { styled } from "nativewind";

import Background from "../components/Background";
import SelectLogButton from "../components/SelectLogButton";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function LogsScreen() {
  return (
    <StyledView className="flex-1 ">
      <Background>
        <Container className>
          <SelectLogButton text = "Bitacora Limpieza Recibo" destinatedLog = "bitacora_limpiezaRecibo"/>
          <SelectLogButton text = "Bitacora Limpieza" destinatedLog = "bitacora_limpieza"/>
        </Container>
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
