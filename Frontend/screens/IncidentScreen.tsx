import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Container from "../components/Container";

import { styled } from 'nativewind';

import Background from "../components/Background";

const StyledView = styled(View)
const StyledText = styled(Text)

export default function IncidentScreen() {
  return (
    <StyledView className="flex-1">
      <Background>
              <Container>
        <StyledText className="text-black  text-xl font-bold">Incidentes</StyledText>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      </Container>
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
