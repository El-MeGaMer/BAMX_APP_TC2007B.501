import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getLogPending } from "../apis/VisualizationApi";
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
    const ms = hora.getTime();
    const subsms = 420 * 60000;
    const horaAjustada = new Date(ms + subsms);
    console.log(horaAjustada);

    const timeAgo = formatDistanceToNow(horaAjustada, {
      addSuffix: true,
      locale: es,
      includeSeconds: false,
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
