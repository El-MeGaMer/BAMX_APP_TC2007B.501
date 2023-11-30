// App.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getLogPending } from "../apis/VisualizationApi"; // Ajusta la ruta según tu estructura de carpetas
import Background from "../components/Background";
import Container from "../components/Container";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";

interface LogItem {
  id: number;
  estado: string;
  fechaHora: string;
  nombre: string;
  areaBitacora?: {
    id: number;
    nombreArea: string;
  };
}

class Item extends React.PureComponent<{ item: LogItem }> {
  render() {
    const { item } = this.props;

    const hora = new Date(item.fechaHora);
    console.log(hora);
    console.log(hora.getUTCHours());
    const horaAjustada = new Date(hora);
    console.log(horaAjustada);
    console.log(horaAjustada.getUTCHours());
    // horaAjustada.setHours(hora.getHours() - 7);
    // console.log(horaAjustada);

    const timeAgo = formatDistanceToNow(horaAjustada, {
      addSuffix: true,
      locale: es,
      includeSeconds: false, // Exclude seconds from the output
    });

    console.log(typeof hora);
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.nombre}</Text>
        <Text>{timeAgo}</Text>
        {item.areaBitacora && <Text>Área: {item.areaBitacora.nombreArea}</Text>}
      </View>
    );
  }
}

const LogsScreen = () => {
  const [data, setData] = useState<LogItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLogPending();
        // Combina los subarrays en un solo array para FlatList
        setData(result.flat());
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const porRevisar = data.filter((item) => item.estado === "enRevision");
  const revisados = data.filter((item) => item.estado === "revisado");

  return (
    <Background>
      <Container>
        <View style={styles.container}>
          <Text style={styles.subtitle}>- Por revisar -</Text>
          <FlatList
            data={porRevisar}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Item item={item} />}
          />
          <Text style={styles.subtitle}>- Revisados -</Text>
          <FlatList
            data={revisados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Item item={item} />}
          />
        </View>
      </Container>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 20,
    //marginHorizontal: 16,
  },
  item: {
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "gray",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    paddingLeft: 20,
  },
});

export default LogsScreen;
