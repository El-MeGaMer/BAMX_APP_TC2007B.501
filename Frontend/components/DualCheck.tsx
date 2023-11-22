import React, { useState } from "react";
import { Image } from "react-native";
import { styled } from "nativewind";

// import CrossMark from "../assets/images/CrossMark.svg";
// import CheckMark from "../assets/images/CheckMark.svg"
const backgroundlogo = "../assets/images/Logo.png";


import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";


const _iconStyle = (borderColor: string) => ({
  height: 40,
  width: 40,
  borderRadius: 25,
  borderColor: borderColor,
});

const styles = {
  container: { marginTop: 24 },
  verticalStyle: { marginTop: 16 },
  textStyle: { textDecorationLine: "none" },
  iconImageStyle: { height: 20, width: 20 },

};



const DualCheck = (props) => {
  const staticData: ICheckboxButton[] = [
    {
      id: 0,
      fillColor: "#ff7473",
      unfillColor: "#fbbfbb",
      iconStyle: _iconStyle("#fbbfbb"),
      iconImageStyle: styles.iconImageStyle,
      
      
      
      // ImageComponent: () => (
      //   <CrossMark width={"90%"} height={"90%"} /> 
      // ),
    },
  
    {
      id: 1,
      fillColor: "#00CA94",
      unfillColor: "#rgba(0, 201, 148, 0.70)",
      iconStyle: _iconStyle("#afb5f5"),
      iconImageStyle: styles.iconImageStyle,
      // ImageComponent: () => (
      //   <CheckMark width={"90%"} height={"90%"} /> 
      // ),
      
    },
  ];

  return (
    <BouncyCheckboxGroup
      style={{ alignSelf: "center" }}
      data={staticData}
      initial={0}
      checkboxProps={{ bounceVelocityIn: 1, bounceEffectIn: 1}}
      onChange={(selectedItem: ICheckboxButton) => {
        props.updateJson(props.value, props.id, selectedItem.id)
        console.log(props.value)
      }}
      
    />
  );
};

export default DualCheck;