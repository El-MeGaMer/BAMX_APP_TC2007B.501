import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function ExpBit() {
  const [userData, setUserData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [fileName, setFileName] = useState('defaultFileName.pdf');
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://192.168.1.130:3000/bitacoras/export');

      const data = await response.json();
      const userData = Object.values(data)?.[0]?.["47"];
      const columns = Object.keys(userData);
  
      setColumnNames(columns);
      setUserData([userData]);

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
      return '<h1>No hay datos para mostrar</h1>';
    }
  
    // excluir valores
    const valoresAExcluir = new Set(['id', 'idArea', 'idUsuarioEmisor','nombre', 'idRecordatorio']);
  
    const tables = columnNames.map((columnName) => {
      const columnValues = userData.map((rowObject) => {
        const value = rowObject[columnName];
  
        if (typeof value === 'object') {
          const subTableRows = Object.entries(value).map(([key, val]) => {
            if (typeof val === 'object') {
              const nestedTableRows = Object.entries(val).map(([nestedKey, nestedVal]) => {
                if (!valoresAExcluir.has(nestedKey)) {
                  const formattedNestedValue =
                    typeof nestedVal === 'object' ? JSON.stringify(nestedVal) : nestedVal;
                  const formattedValue = formattedNestedValue === true ? 'hecho' : formattedNestedValue === false ? 'no hecho' : formattedNestedValue;
                  return `<tr><td>${nestedKey}</td><td>${formattedValue}</td></tr>`;
                } else {
                  return '';
                }
              });
  
              return `
                <table>
                  <tr><th colspan="2">día ${Number(key) + 1}</th></tr>
                  ${nestedTableRows.join('')}
                </table>
              `;
            } else {
              return `<tr><td>${key}</td><td>${val}</td></tr>`;
            }
          });
  
          return `
            <table>
              <tr><th colspan="2">${columnName}</th></tr>
              ${subTableRows.join('')}
            </table>
          `;
        } else {

          const formattedValue = value === true ? 'hecho' : value === false ? 'no hecho' : value;
          return `<tr><td>${columnName}</td><td style="white-space: pre-line;">${formattedValue}</td></tr>`;
        }
      });
  
      const tableRows = columnValues.join('');
  
      return `
        <table>
          ${tableRows}
        </table>
        <br/>
      `;
    });
  
    const htmlContent = `
      <html>
        <head>
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
          </style>
        </head>
        <body>
          ${tables.join('')}
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
