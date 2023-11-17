import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Container from "../components/Container";
import Background from "../components/Background";

import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function NotFoundScreen() {
  return (
    <StyledView className="flex-1">
    <Background>
      <Container>
        <StyledText className="font-bold text-2xl">Not Found</StyledText>
      </Container>
    </Background></StyledView>
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
