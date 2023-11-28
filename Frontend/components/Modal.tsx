import React, { useState } from 'react';
import { StyleSheet, Image, Platform } from 'react-native';
import { Modal, Text, View, TouchableHighlight } from 'react-native';
import Background from "../components/Background";
import Container from './Container';

const checkmarkImage = require('../assets/images/checkmark.png');
const crossmarkImage = require('../assets/images/crossmark.png');

export default function ModalConfirm({ result }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [showCheckmark, setShowCheckmark] = useState(true);

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const toggleImage = () => {
        setShowCheckmark(!showCheckmark);
    };

    return (
        <Background style={styles.container}>
            <Container style={styles.content}>
                <TouchableHighlight onPress={toggleModal}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={isModalVisible}
                    onRequestClose={() => {
                        setIsModalVisible(!isModalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={styles.modalContent}>
                            {showCheckmark ? (
                                <Image source={checkmarkImage} style={[styles.image, { tintColor: 'green' }]} />
                            ) : (
                                <Image source={crossmarkImage} style={[styles.image, { tintColor: 'red' }]} />
                            )}
                            <Text style={styles.textModal}>
                                Bitacoras
                            </Text>
                            <TouchableHighlight onPress={toggleModal}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={toggleImage}>
                                <Text>Toggle Image</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </Container>
        </Background>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'black',
    },
    content: {
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'black',
        paddingVertical: 20,
    },
    image: {
        width: 180,
        height: 180,
        marginBottom: 10,
    },
    textModal: {
        marginBottom: '100%',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)', // Fondo del modal
    },
    modalContent: {
        backgroundColor: 'white',
        width: '88.4%',
        padding: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8, // Ajusta el radio para esquinas redondeadas
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'transparent',
        ...Platform.select({
            ios: {
                shadowColor: 'black', // Color de la sombra para iOS
                shadowOpacity: 0.5, // Opacidad de la sombra para iOS
                shadowRadius: 8, // Radio de difuminado para iOS
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
            },
            android: {
                elevation: 5, // Elevación para dispositivos Android
            },
        }),
    },
});
