import { StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Container from "../components/Container";

import Background from "../components/Background";
import LogoutButton from "../components/LogoutButton";

import { styled } from "nativewind";
import { useEffect } from "react";

const StyledView = styled(View);

export default function UserScreen({ route }) {
  const { setLoggedIn } = route.params;

  // useEffect(() => {
  //   async function getToken() {
  //     let result = await SecureStore.getItemAsync("token");

  //     if (setLoggedIn) {
  //       console.log("llego")
  //       setLoggedIn(false);
  //     }
  //   }

  //   getToken();
  // }, [setLoggedIn]);
  return (
    <StyledView className="flex-1">
      <Background>
        <Container>
          <LogoutButton setLoggedIn={setLoggedIn}></LogoutButton>
        </Container>
      </Background>
    </StyledView>
  );
}