import React, { useState } from "react";
import { Image, TextInput } from "react-native";
import { styled } from "nativewind";

// import CrossMark from "../assets/images/CrossMark.svg";
// import CheckMark from "../assets/images/CheckMark.svg"
const FormsNumeric = (props) => {
  const [text, onChangeText] = React.useState('');
  return (
    <TextInput
      style={{ alignSelf: "center" }}
      placeholder="Pulsa para escribir"
      keyboardType={props.type}
      onChangeText={onChangeText}
      value={text}
      onEndEditing={() => {
        props.updateJson(props.value, props.id, parseFloat(text));
        console.log(props.value);
      }}

    />
  );
};

export default FormsNumeric;
