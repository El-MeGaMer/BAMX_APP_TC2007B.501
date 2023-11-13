import { StyleSheet } from "react-native";

import NotificationInfo from "../components/NotificationInfo";
import { View } from "../components/Themed";
import Background from "../components/Background";

import { styled } from "nativewind";

const StyledView = styled(View);

export default function NotificationScreen() {
  return (
    <StyledView className="flex-1">
      <Background>
        <View className="pt-2">
          <NotificationInfo/>
          <NotificationInfo/>
        </View>
      </Background>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
