import { StyleSheet, Image } from "react-native";

import { Text, View } from "./Themed";

const background = "../assets/images/favicon.png";

export default function NotificationInfo(){
    return (
        <View style={styles.Container}>
            <Image
                style={styles.Icon}
                source={require(background)}
            />
            <View>
                <Text style={styles.Title}>Atención, temperatura elevada!</Text>
                <Text style={styles.Text}>Se detectó una temperatura mayor a la permitida en REFRIGERADOR 1</Text>
            </View>
        </View>
    )
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
        marginRight: 90,
        fontSize: 14,
    }
  });
  