import { StyleSheet } from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Container from "../components/Container";
import Background from "../components/Background";
import { styled } from "nativewind";

const StyledView = styled(View);

export default function HomeScreen() {
  return (
    <StyledView className="flex-1">
      <Background>
        <Container>
          <Text style={styles.title}>Home Screeen</Text>
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
