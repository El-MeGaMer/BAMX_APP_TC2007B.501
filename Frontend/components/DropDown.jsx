import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { DB_FILTERS } from '../constants/DB_constants';
import { CreateIncidente } from '../apis/LogApi';
import ModalComponent from './ModalComponent';
import Container from "./Container";

const DropDown = () => {
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [imageAttachment, setImageAttachment] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [incidentDescription, setIncidentDescription] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const areas = [
        { label: 'Recibo', value: DB_FILTERS.AREA1 },
        { label: 'CribaFV', value: DB_FILTERS.AREA2 },
        { label: 'Empaque', value: DB_FILTERS.AREA3 },
        { label: 'Entrega', value: DB_FILTERS.AREA4 },
        { label: 'Almacen Comp', value: DB_FILTERS.AREA5 },
        { label: 'Almacen', value: DB_FILTERS.AREA6 },
        { label: 'Cuartos Frios', value: DB_FILTERS.AREA7 },
    ];

    const handleAreaChange = (area) => {
        setSelectedArea(area);
    };

    const handleDescriptionChange = (description) => {
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

    const showModal = (success) => {
        setSubmissionStatus(success);
        setIsModalVisible(true);
        setTimeout(() => {
            setIsModalVisible(false);
            setSelectedArea('');
            setIncidentDescription('');
            setImageAttachment('');
            setSubmissionStatus(null); 
        }, 2000);
    };

    const handleSubmit = async () => {
        if (selectedArea && incidentDescription && imageAttachment !== null) {
            try {
                await CreateIncidente(
                    'userId',
                    selectedArea,
                    incidentDescription,
                    imageAttachment
                );
                showModal(true);
            } catch (error) {
                showModal(false);
            }
        } else {
            showModal(false);
        }
    };    

    const styles = {
        imageButton: {
            backgroundColor: '#F9F9F9',
            padding: 10,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#D0D0D0',
            height: 100,
            width: '100%',
            justifyContent: 'center',
            marginBottom: 25
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
        textInput: {
            backgroundColor: '#EBEBEB',
            height: 138,
            width: '100%',
            borderRadius: 5,
            padding: 10,
            marginBottom: 11
        },
        dropDownInput: {
            inputIOS: {
                backgroundColor: '#EBEBEB',
                borderRadius: 4,
                color: 'black',
                width: '100%',
                height: 30,
                padding: 10,
                marginBottom: 11
            },
            inputAndroid: {
                backgroundColor: '#EBEBEB',
                borderRadius: 4,
                color: 'black',
                width: '100%',
                height: 30,
                padding: 10,
                marginBottom: 11
            }
        },
        imageText: {
            color: '#000000',
            textAlign: 'center',
            textAlignVertical: 'center'
        },
        buttonText: {
            color: '#FFFFFF',
            textAlign: 'center'
        },
        modal: {
            backgroundColor: 'white',
            padding: 50, 
            borderRadius: 6, 
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
        }
    };

    return (
        <View>
            <Container notCenter={true}>
                <View style={{ paddingLeft: 22, paddingRight: 22, paddingBottom: 25 }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 11 }}>Área involucrada</Text>
                    <RNPickerSelect
                        onValueChange={handleAreaChange}
                        items={areas}
                        value={selectedArea}
                        style={styles.dropDownInput}
                        placeholder={{
                            label: 'Selecciona un área...',
                            value: null,
                        }}
                    />
    
                    <Text style={{ fontWeight: 'bold', marginBottom: 11 }}>Descripción</Text>
                    <TextInput
                        multiline
                        numberOfLines={4}
                        value={incidentDescription}
                        onChangeText={handleDescriptionChange}
                        style={styles.textInput}
                    />
    
                    <Text style={{ fontWeight: 'bold', marginBottom: 11 }}>Adjuntar imagen</Text>
                    <TouchableOpacity
                        onPress={handleImageAttachment}
                        style={styles.imageButton}
                    >
                        <Text style={styles.imageText}>Seleccionar una foto</Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.submitButton}
                    >
                        <Text style={styles.buttonText}>Enviar Reporte</Text>
                    </TouchableOpacity>

                    <ModalComponent isVisible={isModalVisible} success={submissionStatus} />
                </View>
            </Container>
        </View>
    );    
};

export default DropDown;