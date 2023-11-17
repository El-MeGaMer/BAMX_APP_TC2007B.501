// This screen is used to visalize the uploaded logs, destinated to
// users that review the logs
// role: area_supervisor

import { Text, View } from "../components/Themed";
import Container from "../components/Container";

import { styled } from "nativewind";

import Background from "../components/Background";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function LogsScreen() {
  return (
    <StyledView className="flex-1 ">
      <Background>
        <Container className>
          <StyledText className="text-black  text-xl font-bold">
            Bitacoras
          </StyledText>
        </Container>
      </Background>
    </StyledView>
  );
}