import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { printToFileAsync } from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function ExpBit_Semana() {
    const [BitSemana, setBitSemana] = useState([]);
    const [BitColumnNames, setBitColumnNames] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [fileName, setFileName] = useState('Bitacora_Semana_');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://10.41.55.139:3000/bitacoras/export');
            const data = await response.json();
            const bitSemanaData = Object.values(data);
            const bitSemanaColumnNames = Object.keys(bitSemanaData[0]);
            setBitSemana(bitSemanaData);
            setBitColumnNames(bitSemanaColumnNames);

        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    const generatePdf = async (selectedWeekData, columnName) => {
        try {
            const dataToUse = Object.values(selectedWeekData);


            const file = await printToFileAsync({
                html: generateHtml(dataToUse),
                base64: true,
            });
            const newFileUri = `${file.uri.substring(0, file.uri.lastIndexOf('/') + 1)}${fileName}${columnName}.pdf`;
            await FileSystem.moveAsync({
                from: file.uri,
                to: newFileUri,
            });

            await shareAsync(newFileUri);
        } catch (error) {
            console.error('Error al generar el PDF:', error);
        }
    };

    const generateHtml = (selectedWeekData) => {
        if (!selectedWeekData || selectedWeekData.length === 0) {
            return `<h1>No hay datos para mostrar</h1>`;
        }

        const Data = Object.values(selectedWeekData)?.[0];
        const userData = [Object.values(Data)];
        const columnNames = Object.keys(Data);

        const valoresAExcluir = new Set(['id', 'idArea', 'idUsuarioEmisor', 'nombre', 'idRecordatorio']);

        const tables = columnNames.map((columnName, data) => {
            const columnValues = userData.map((rowObject) => {
                const value = rowObject[data];
                console.log(value);
                if (typeof value === 'object') {
                    const subTableRows = Object.entries(value).map(([key, val]) => {
                        console.log(key);
                        if (typeof val === 'object') {
                            const nestedTableRows = Object.entries(val).map(([nestedKey, nestedVal]) => {
                                if (!valoresAExcluir.has(nestedKey)) {
                                    
                                    const formattedNestedValue =  nestedVal;
                                    if (formattedNestedValue === null) {
                                        return `<tr><td>${nestedKey}</td><td>Sin datos</td></tr>`;
                                    } else if (typeof formattedNestedValue === 'object') {
                                        const filteredObject = Object.fromEntries(
                                            Object.entries(formattedNestedValue).filter(([key, val]) => !valoresAExcluir.has(key))
                                        );
                                    
                                        const formattedNestedValueHtml = Object.entries(filteredObject).map(([key, val]) => {
                                            return `<tr><td>${nestedKey}</td><td>${val}</td></tr>`;
                                        }).join('');
                                    
                                        return formattedNestedValueHtml;
                                    }
                                    
                        
                                    
                                    const formattedValue =
                                        formattedNestedValue === true
                                            ? 'hecho'
                                            : formattedNestedValue === false
                                                ? 'no hecho'
                                                : formattedNestedValue;
                                    return `<tr><td>${nestedKey}</td><td>${formattedValue}</td></tr>`;
                                } else {
                                    return '';
                                }
                            });

                            return `
                    <table class="nested-table">
                      <tr><th colspan="2">día ${Number(key) + 1}</th></tr>
                      ${nestedTableRows.join('')}
                    </table>
                  `;
                        } else {
                            return `<tr><td>${key}</td><td>${val}</td></tr>`;
                        }
                    });

                    return `
                <table class="main-table">
                  <tr><th colspan="2">${columnName}</th></tr>
                  ${subTableRows.join('')}
                </table>
              `;
                } else {
                    const formattedValue =
                        value === true ? 'hecho' : value === false ? 'no hecho' : value;
                    return `<tr><td>${columnName}</td><td style="white-space: pre-line;">${formattedValue}</td></tr>`;
                }
            });

            const tableRows = columnValues.join('');

            return `
            <table class="main-table">
              ${tableRows}
            </table>
            <br/>
          `;
        });

        const htmlContent = `
          <html>
            <head>
              <style>
                table.main-table {
                  border-collapse: collapse;
                  width: 100%;
                  margin-bottom: 20px;
                }
                table.nested-table {
                  border-collapse: collapse;
                  width: 100%;
                  margin-top: 10px;
                  margin-bottom: 10px;
                }
                th, td {
                  border: 2px solid #dddddd;
                  text-align: left;
                  padding: 8px;
                }
                th {
                  background-color: #4CAF50;
                  color: white;
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

    const handleButtonClick = (columnName) => {
        const selectedWeekData = BitSemana.map((weekData) => weekData[columnName]);
        setSelectedWeek(selectedWeekData);
        generatePdf(selectedWeekData, columnName);
    };


    return (
        <View>
            {BitColumnNames.map((columnName, index) => (
                <Button
                    key={index}
                    title={`Semana ${columnName}`}
                    onPress={() => handleButtonClick(columnName)}
                    buttonStyle={styles.button}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 10,
        backgroundColor: '#FF8001',
    },
});
