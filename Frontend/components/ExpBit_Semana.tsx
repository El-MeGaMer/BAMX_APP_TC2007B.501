import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { table } from 'react-native-table-component';

export default function ExpBit_Semana() {
    const [BitSemana, setBitSemana] = useState([]);
    const [BitColumnNames, setBitColumnNames] = useState([]);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://10.41.53.118:3000/bitacoras/export');
            const data = await response.json();
            const bitSemanaData = Object.values(data);
            const bitSemanaColumnNames = Object.keys(bitSemanaData[0]).map((columnName) => `semana ${columnName}`);
            setBitSemana(bitSemanaData);
            setBitColumnNames(bitSemanaColumnNames);
            console.log(data)
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }
    };

    const handleButtonClick = (columnName) => {

            console.log('Botón clicado:', BitSemana);

    };

    return (
        <View>
            {BitColumnNames.map((columnName, index) => (
                <Button
                    key={index}
                    title={columnName}
                    onPress={() => handleButtonClick(columnName)}
                />
            ))}
        </View>
    );
}
