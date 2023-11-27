import { StyleSheet } from "react-native";

import React from 'react';
import { styled } from 'nativewind';
import { Text, View } from './Themed';

import Background from "../components/Background";
import Container from './Container';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function ModalConfirm({ prop1 }) {
    return (
        <StyledView className="flex-1">
          <Background>
            <Container>
              <StyledText className="text-black  text-xl font-bold">
                Incidentes
              </StyledText>
              <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
            </Container>
          </Background>
        </StyledView>
      );
};

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