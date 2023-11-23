import React, { useState } from "react";
import { Image, View } from "react-native";
import { styled } from "nativewind";

// import CrossMark from "../assets/images/CrossMark.svg";
// import CheckMark from "../assets/images/CheckMark.svg"
const backgroundlogo = "../assets/images/Logo.png";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const StyledView = styled(View);
import BouncyCheckboxGroup, {
  ICheckboxButton,
} from "react-native-bouncy-checkbox-group";

const _iconStyle = (borderColor: string) => ({
  height: 40,
  width: 40,
  borderRadius: 25,
  borderColor: borderColor,
});

// const styles = {
//   container: { marginTop: 24 },
//   verticalStyle: { marginTop: 16 },
//   textStyle: { textDecorationLine: "none" },
//   iconImageStyle: { height: 20, width: 20 },
// };

const DualCheck = (props) => {
  const [value, setValue] = useState(false);
  return (
    <StyledView className="flex-row justify-center">
      <BouncyCheckbox
        disableBuiltInState
        size={40}
        fillColor="#ff7473"
        unfillColor="#fbbfbb"
        iconImageStyle = {{width: "90%", height: "90%"}}
        checkIconImageSource = {require('../assets/images/crossmark.png')}
        onPress={() => {
          setValue(false);
          props.updateJson(props.value, props.id, false);
          console.log(props.value);
        }}
        isChecked={!value}
      />
      <BouncyCheckbox
        disableBuiltInState
        size={40}
        iconImageStyle = {{width: "90%", height: "90%"}}
        checkIconImageSource = {require('../assets/images/checkmark.png')}
        fillColor= "#00CA94"
        unfillColor= "#rgba(0, 201, 148, 0.70)"
        onPress={() => {
          setValue(true);
          props.updateJson(props.value, props.id, true);
          console.log(props.value);
        }}
        isChecked={value}
      />
    </StyledView>
    // <BouncyCheckboxGroup
    //   style={{ alignSelf: "center" }}
    //   data={staticData}
    //   checkboxProps={{ bounceVelocityIn: 1, bounceEffectIn: 1}}
    //   onChange={(selectedItem: ICheckboxButton) => {
    //     if (selectedItem.id === "false") {
    //       setValue(false);
    //     } else {
    //       setValue(true)
    //     }
    //     console.log(value)
    //     props.updateJson(props.value, props.id, value)
    //     console.log(props.value)
    //   }}

    // />
  );
};

const styles = ({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: "100%",
    height: "100%",
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default DualCheck;
