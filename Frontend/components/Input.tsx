import * as React from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from "react-native";
import { FieldError } from "react-hook-form";
interface Props extends TextInputProps {
  name: string;
  label?: string;
  labelStyle?: TextStyle;
  error?: FieldError | undefined;
}

export default React.forwardRef<any, Props>(
  (props, ref): React.ReactElement => {
    const { label, labelStyle, error, ...inputProps } = props;

    return (
      <View>
        {label && <Text>{label}</Text>}
        <TextInput autoCapitalize="none" ref={ref} {...inputProps} />
        <Text>{error && error.message}</Text>
      </View>
    );
  }
);
