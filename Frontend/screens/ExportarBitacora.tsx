import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Background from "../components/Background";
import Container from "../components/Container";
import { Text } from "react-native";
import { styled } from "nativewind";
const StyledView = styled(View);

export default function ExportarBitacoras() {
  return (
    <StyledView className="flex-1">
      <Background>
        <Container>
          <Text>Exportar Bitacoras</Text>
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
