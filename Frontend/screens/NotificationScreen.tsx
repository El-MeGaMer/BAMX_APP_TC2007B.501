import { StyleSheet, FlatList, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";

import { styled } from "nativewind";
import { getNotifications } from "../apis/NotificacionesApi";

export const IconI = require("../assets/images/favicon.png");

const StyledView = styled(View);

export default function NotificationScreen() {
  const [data,setData] = useState([]);

  async function getNotifs() {
    const response = await getNotifications(1);
    setData(response)
  }

  useEffect(() => {
    getNotifs();
  }, [])

  return (
    <StyledView className="flex-1">
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => {return index.toString()}}
          renderItem={({item}) => {
            return(
              <View style={styles.Container}>
                <Image
                  style={styles.Icon}
                  source={IconI}
                />
                <View style={styles.Text}>
                  <Text style={styles.Title}>{item.titulo}</Text>
                  <Text>{item.descripcion}</Text>
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
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center"
  },
  Icon: {
    width: 50,
    height: 50,
    marginHorizontal: 20,
  },
  Title: {
    fontSize: 15,
    fontWeight: "bold"
  },
  Text: {
    marginRight: 135,
  }
});
