import React, { useState } from "react";

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);


const background = "../assets/images/image_login.png";

function Login() {
  const onPress = () => {
    // do authentication
    console.log("Login Pressed!");
  };

  const forgotEmail = () =>{
    console.log("Forgot Email Pressed!");
  }

  const [email, setEmail] = useState("");

  return (
    <StyledView className="flex-1" >
    <ImageBackground source={require(background)} style={styles.background} resizeMode="cover">
      <StyledView className="flex-1 justify-center items-center pb-10">
        <StyledText className="my-6 font-bold text-xl text-white">
          Iniciar Sesión
        </StyledText>
          
          <StyledTextInput
            className="bg-white p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-full max-w-xs"
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            onChangeText={(email) => setEmail(email)}
          />

        <StyledTouchableOpacity onPress={forgotEmail}>
          <StyledText className=" text-red-500 pb-10">
            Olvidó su email?
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          onPress={onPress}
          className=" bg-red-hightlight p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-full max-w-xs items-center focus:bg-red-50"
        >
          <StyledText className="text-white font-bold text-md">Iniciar Sesión</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    </ImageBackground>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Login;
