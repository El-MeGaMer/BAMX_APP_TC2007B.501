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
      const response = await fetch('http://10.41.34.161:3000/bitacoras/export');
      const data = await response.json();
      console.log(data);
  
      const userData = Object.values(data)?.[0]?.[47];
  
      const columns = Object.keys(userData);
  
      setColumnNames(columns);
      setUserData([userData]);
      console.log(userData);
      console.log(columns);
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
    
  
    const htmlContent = `

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
