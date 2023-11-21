import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function ExpBit() {
  const [userData, setUserData] = useState(null);
  const [columnNames, setColumnNames] = useState([]);
  const [fileName, setFileName] = useState('defaultFileName.pdf'); // Nombre predeterminado

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
      const data = await response.json();

      // Obtener nombres de columnas
      const columns = data.length > 0 ? Object.keys(data[0]) : [];
      setColumnNames(columns);

      setUserData(data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const generatePdf = async () => {
    try {
      const file = await printToFileAsync({
        html: generateHtml(),
        base64: true,
      });

      // Cambia el nombre del archivo antes de compartirlo
      const newFileUri = `${file.uri.substring(0, file.uri.lastIndexOf('/') + 1)}${fileName}`;
      await FileSystem.moveAsync({
        from: file.uri,
        to: newFileUri,
      });

      await shareAsync(newFileUri);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const generateHtml = () => {
    if (!userData || userData.length === 0 || columnNames.length === 0) {
      return '';
    }

    const htmlContent = `
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
          <table>
            <tr>
              ${columnNames.map((columnName, index) => `<th key=${index}>${columnName}</th>`).join('')}
            </tr>
            ${userData.map((data, index) => (
              `<tr key=${index}>
                ${columnNames.map(columnName => `<td key=${columnName}>${data[columnName]}</td>`).join('')}
              </tr>`
            )).join('')}
          </table>
        </body>
      </html>
    `;

    return htmlContent;
  };

  return (
    <View style={styles.container}>
      <Button title="Generate PDF" onPress={generatePdf} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
