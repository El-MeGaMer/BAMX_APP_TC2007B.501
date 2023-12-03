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


const backgroundlogo = "../assets/images/Logo.png";
const footer = "../assets/images/footer.png";

function Login() {
  const onPress = () => {
    // do authentication
    console.log("Login Pressed!");
  };

  const forgotEmail = () =>{
    console.log("Forgot Email Pressed!");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  return (
    <StyledView className="flex-1" style={{width: "100%",height:"100%", backgroundColor: '#FF9122'}}>
      <ImageBackground
        source={require(backgroundlogo)}
        style={{ width: 130, height: 110, display: "flex", alignSelf: "center", marginTop: 100}}
      />  
      <StyledView className="flex-1 justify-top items-center pb-10 ">
        <StyledText className="my-6 font-bold text-2xl text-white mb-12">
          Iniciar Sesión
        </StyledText>
          
        <StyledTextInput
            className="bg-white p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-full max-w-xs mt-3"
            placeholder="Email"
            placeholderTextColor="#A0A0A0"
            onChangeText={(email) => setEmail(email)}
          />

        <StyledTextInput
            className="bg-white p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-full max-w-xs mt-3"
            placeholder="Contraseña"
            placeholderTextColor="#A0A0A0"
            onChangeText={(password) => setPassword(password)}
          />

        <StyledTouchableOpacity onPress={forgotEmail}>
          <StyledText className="pb-10" style={{color:"#D90024"}}>
            Olvidó su email?
          </StyledText>
        </StyledTouchableOpacity>
        <StyledTouchableOpacity
          disabled = {!email && !password}
          onPress={onPress}
          className="p-3 rounded-xl shadow px-10 pt-4 pb-4 mb-4 w-full max-w-xs items-center" style={{backgroundColor: '#FB002A'}}
        >
          <StyledText className="text-white font-bold text-md">Iniciar Sesión</StyledText>

        </StyledTouchableOpacity>
        <ImageBackground
            source={require(footer)}
            style={{ width: "150%", height: "90%", display: "flex", alignSelf: "center", marginTop: 40, marginRight: "150%"}}
          />
      </StyledView>
    
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
