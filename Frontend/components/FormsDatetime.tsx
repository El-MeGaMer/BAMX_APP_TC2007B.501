import React, { useState } from "react";
import { Image, TextInput } from "react-native";
import { styled } from "nativewind";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { View, Button } from "react-native";


// import CrossMark from "../assets/images/CrossMark.svg";
// import CheckMark from "../assets/images/CheckMark.svg"
const FormsDatetime = (props) => {
  const [text, onChangeText] = React.useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    props.updateJson(props.value, props.id, date);
    console.log(props.value);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Elegir fecha" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default FormsDatetime;
