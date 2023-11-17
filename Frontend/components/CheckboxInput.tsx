import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { Image } from "react-native";
import { styled } from "nativewind";

import CrossMark from "../assets/images/CrossMark.svg";
import CheckMark from "../assets/images/CheckMark.svg"
const backgroundlogo = "../assets/images/Logo.png";

import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";

const imagePNG = require("../assets/images/wrong-delete-remove-trash-minus-cancel-close-2-svgrepo-com.png");

const StyledCheckBox = styled(Checkbox);

const _iconStyle = (borderColor: string) => ({
  height: 40,
  width: 40,
  borderRadius: 25,
  borderColor: borderColor,
});

const _props = (props) => ({
  animationDuration: 0.2,
});

const styles = {
  container: { marginTop: 24 },
  verticalStyle: { marginTop: 16 },
  textStyle: { textDecorationLine: "none" },
  iconImageStyle: { height: 20, width: 20 },
};

const staticData: ICheckboxButton[] = [
  {
    id: 0,
    fillColor: "#ff7473",
    unfillColor: "#fbbfbb",
    iconStyle: _iconStyle("#fbbfbb"),
    iconImageStyle: styles.iconImageStyle,
    ImageComponent: () => (
      <CrossMark width={"90%"} height={"90%"} /> 
    ),
  },

  {
    id: 1,
    fillColor: "#00CA94",
    unfillColor: "#rgba(0, 201, 148, 0.43)",
    iconStyle: _iconStyle("#afb5f5"),
    iconImageStyle: styles.iconImageStyle,
    ImageComponent: () => (
      <CheckMark width={"90%"} height={"90%"} /> 
    ),
    
  },
];

const CheckboxInput = (props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <BouncyCheckboxGroup
      style={{ alignSelf: "center" }}
      data={staticData}
      checkboxProps={{ bounceVelocityIn: 1, bounceEffectIn: 1,}}
      onChange={(selectedItem: ICheckboxButton) => {
        console.log("SelectedItem: ", JSON.stringify(selectedItem));
      }}
    />
  );
};

export default CheckboxInput;
