import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function App() {
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Esta función se ejecutará al cargar el componente
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const html = `
  <html>
    <body>
      <h1>Hi ${name}</h1>
      ${userData && (
        `<div>
        <p>User Data:</p>
        <p>id: ${userData.id}</p>
        <p>title: ${userData.title}</p>
        <p>completed: ${userData.completed}</p>
        </div>`
      )}
    </body>
  </html>
`;


  const generatePdf = async () => {
    try {
      const file = await printToFileAsync({
        html: html,
        base64: true,
      });

      await shareAsync(file.uri);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        placeholder="Name"
        style={styles.textInput}
        onChangeText={(value) => setName(value)}
      />
      <Button title="Generate PDF" onPress={generatePdf} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 8,
    margin: 8,
  },
});