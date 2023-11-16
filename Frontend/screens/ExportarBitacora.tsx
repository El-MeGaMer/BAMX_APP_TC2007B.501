import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Background from "../components/Background";
import Container from "../components/Container";
import { Text } from "react-native";
import { styled } from "nativewind";
import ExpBit from "../components/ExpBit";

const StyledView = styled(View);

export default function ExportarBitacoras() {
  return (
    <StyledView className="flex-1">
      <Background>
        <Container>
          <Text style={{ fontSize: 20, fontWeight: "bold" ,}}>
            2023
          </Text>
          <ExpBit />
        </Container>
      </Background>
    </StyledView>
  );
};
