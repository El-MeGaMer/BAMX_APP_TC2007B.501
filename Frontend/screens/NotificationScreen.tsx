import { StyleSheet, FlatList, Image } from "react-native";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";

import { styled } from "nativewind";
import { getNotifications } from "../apis/NotificacionesApi";
import * as SecureStore from 'expo-secure-store';

export const IconI = require("../assets/images/favicon.png");

const StyledView = styled(View);

export default function NotificationScreen() {
  const [data, setData] = useState([]);

  const getNotifs = async () => {
    try {
      // Obtener el token almacenado desde SecureStore
      const token = await SecureStore.getItemAsync('token');
      if (token) {

        const tokenInfo = JSON.parse(token);

        const response = await getNotifications(tokenInfo.id);
        setData(response);
      } else {
        console.log('No se encontró ningún token almacenado.');
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
    }
  };
  

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
