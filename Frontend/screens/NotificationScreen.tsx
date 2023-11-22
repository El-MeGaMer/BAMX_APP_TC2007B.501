import { StyleSheet, FlatList, Image } from "react-native";
import { Text, View } from "../components/Themed";

import { styled } from "nativewind";

const IconI = "../assets/images/favicon.png";

const StyledView = styled(View);

export default function NotificationScreen() {
  const data=[
    {
      id: "1",
      IconImage: "../assets/images/favicon.png",
      notiTitle: "Atención, temperatura elevada!",
      notification: "Se detectó una temperatura mayor a la permitida en REFRIGERADOR 1",
    },
    {
      id: "2",
      IconImage: "../assets/images/favicon.png",
      notiTitle: "Atención, temperatura crítica!",
      notification: "Se detectó una temperatura mucho mayor a la permitida en REFRIGERADOR 2",
    }
  ];

  return (
    <StyledView className="flex-1">
      <View className="mt-4">
        <FlatList
          data={data}
          keyExtractor={(item, index) => {return index.toString()}}
          renderItem={({item}) => {
            return(
              <View style={styles.Container}>
                <Image
                  style={styles.Icon}
                  source={require(IconI)}
                />
                <View>
                  <Text style={styles.Title}>{item.notiTitle}</Text>
                  <Text style={styles.Text}>{item.notification}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  Container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  Icon: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
  Title: {
    marginRight: 90,
    fontSize: 14,
    fontWeight: "bold"
  },
  Text: {
    marginRight: 150,
    fontSize: 14,
  }
});
