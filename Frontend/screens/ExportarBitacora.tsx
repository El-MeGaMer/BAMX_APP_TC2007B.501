import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import Background from "../components/Background";
import Container from "../components/Container";
import { Text } from "react-native";
import { styled } from "nativewind";
import ExpBit_Semana from "../components/ExpBit_Semana";

const StyledView = styled(View);

export default function ExportarBitacoras() {
  return (
    <StyledView className="flex-1">
      <Background>
        <Container>
          <Text style={{ fontSize: 20, fontWeight: "bold" , marginBottom: 10,}}>
            2023
          </Text>
          <ExpBit_Semana/>
        </Container>
      </Background>
    </StyledView>
  );
};
