import React, { Children, useState } from "react";

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { styled } from "nativewind";

// styled components
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

// login background
const background = "../assets/images/image_login.png";

function LoginCont(props) {
  return (
    <ImageBackground source={require(background)} style={styles.background}>
      {props.children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "fill",
  },
});

export default LoginCont;
