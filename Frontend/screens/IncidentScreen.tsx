import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import DropDown from "../components/DropDown";
import Background from "../components/Background";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function IncidentScreen() {
  return (
    <StyledView className="flex-1">
      <Background>
          <DropDown />
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
