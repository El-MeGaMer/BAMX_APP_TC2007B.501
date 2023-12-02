import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Container from "../components/Container";

import Background from "../components/Background";
import LogoutButton from "../components/LogoutButton";

import { styled } from "nativewind";

const StyledView = styled(View);

export default function UserScreen() {
  return (
    <StyledView className="flex-1">
      <Background>
        <Container>
          <LogoutButton></LogoutButton>
        </Container>
      </Background>
    </StyledView>
  );
}