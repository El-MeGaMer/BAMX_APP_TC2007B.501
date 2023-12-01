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
    date.setTime(date.getTime()- date.getTimezoneOffset()*60000)
    props.updateJson(props.value, props.id, date.toISOString());
    console.log(props.value);
    hideDatePicker();
  };

  return (
    <View>
      <Button title="Elegir fecha" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        themeVariant="light"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default FormsDatetime;
