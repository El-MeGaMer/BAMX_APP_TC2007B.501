import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function ExpBit() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const html = `
  <html>
    <head>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        table, th, td {
          border: 1px solid black;
        }
        th, td {
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      ${userData && (
        `<table>
          <tr>
            <th colspan="2">bitacora_limpieza</th>
          </tr>
          <tr>
            <td>id</td>
            <td>${userData.id}</td>
          </tr>
          <tr>
            <td>title</td>
            <td>${userData.title}</td>
          </tr>
          <tr>
            <td>completed</td>
            <td>${userData.completed}</td>
          </tr>
        </table>`
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
      <Button title="Generate PDF" onPress={generatePdf} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    color: '#fff',
  },
});