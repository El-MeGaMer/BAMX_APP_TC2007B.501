import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { DB_FILTERS } from '../constants/DB_constants';
import Container from "./Container";

const DropDown: React.FC = () => {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [imageAttachment, setImageAttachment] = useState('');
    const [selectedArea, setSelectedArea] = useState<string>('');
    const [incidentDescription, setIncidentDescription] = useState<string>('');

    const areas = [
        { label: 'Recibo', value: DB_FILTERS.AREA1 },
        { label: 'CribaFV', value: DB_FILTERS.AREA2 },
        { label: 'Empaque', value: DB_FILTERS.AREA3 },
        { label: 'Entrega', value: DB_FILTERS.AREA4 },
        { label: 'Almacen Comp', value: DB_FILTERS.AREA5 },
        { label: 'Almacen', value: DB_FILTERS.AREA6 },
        { label: 'Cuartos Frios', value: DB_FILTERS.AREA7 },
    ];

    const handleAreaChange = (area: string) => {
        setSelectedArea(area);
    };

    const handleDescriptionChange = (description: string) => {
        setIncidentDescription(description);
    };

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(status === 'granted');
        })();
    } , []);

    const handleImageAttachment = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (result && !result.canceled && result.assets && result.assets.length > 0) {
            const selectedImage = result.assets[0];
            setImageAttachment(selectedImage.uri);
        }
    };    

    if (hasGalleryPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    const handleSubmit = () => {
        if (selectedArea && incidentDescription && imageAttachment !== null) {
            console.log('Formulario enviado:', {
                area: selectedArea,
                description: incidentDescription,
                image: imageAttachment,
            });
        } else {
            console.log('Por favor, complete todos los campos antes de enviar.');
        }
    };

    const styles = {
        inputContainer: {
            backgroundColor: '#EBEBEB',
            padding: 10,
            borderRadius: 4,
            color: 'black',
            width: '100%',
            paddingLeft: 22,
            paddingRight: 22,
        },
        textInput: {
            backgroundColor: '#EBEBEB',
            height: 138,
            width: '100%',
            borderRadius: 5,
        },
        imageButton: {
            backgroundColor: '#F9F9F9',
            padding: 10,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#D0D0D0',
            height: 100,
            width: '100%',
            justifyContent: 'center',
        },
        submitButton: {
            backgroundColor: '#FF9225',
            borderRadius: 6,
            width: '60%',
            height: 45,
            alignSelf: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            justifyContent: 'center',
        },
    };

    const pickerSelectStyles = {
        inputIOS: {
            backgroundColor: '#EBEBEB',
            padding: 10,
            borderRadius: 4,
            color: 'black',
            width: '100%'
        },
        inputAndroid: {
            backgroundColor: '#EBEBEB',
            padding: 10,
            borderRadius: 4,
            color: 'black',
            width: '100%'
        },
    };

    return (
        <View>
            <Container notCenter={true}>
                <View style={{ paddingLeft: 22, paddingRight: 22 }}>
                    <Text style={{ fontWeight: 'bold' }}>Área involucrada</Text>
                    <RNPickerSelect
                        onValueChange={handleAreaChange}
                        items={areas}
                        value={selectedArea}
                        style={pickerSelectStyles}
                        placeholder={{
                            label: 'Selecciona un área...',
                            value: null,
                        }}
                    />

                    <Text style={{ fontWeight: 'bold' }}>Descripción</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        value={incidentDescription}
                        onChangeText={handleDescriptionChange}
                        style={{
                            backgroundColor: '#EBEBEB',
                            height: 138,
                            width: '100%',
                            borderRadius: 5,
                        }}
                    />

                    <Text style={{ fontWeight: 'bold' }}>Adjuntar imagen</Text>
                    <TouchableOpacity
                        onPress={handleImageAttachment}
                        style={styles.imageButton}
                    >
                        <Text style={{
                            color: '#000000',
                            textAlign: 'center',
                            textAlignVertical: 'center'
                        }}>
                            Seleccionar una foto
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.submitButton}
                    >
                        <Text style={{
                            color: '#FFFFFF',
                            textAlign: 'center'
                        }}>Enviar Reporte</Text>
                    </TouchableOpacity>
                </View>
            </Container>
    </View>
    );
};

export default DropDown;