import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, Platform, Modal, Text, View, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';


const StyledText = styled(Text);

const checkmarkImage = require('../assets/images/checkmark.png');
const crossmarkImage = require('../assets/images/crossmark.png');

export default function ModalConfirm({ result, isVisible, setIsModalVisible }) {
    const { status, message } = result || {status: 'error', message: 'Hubo un error al mandar la bitacora'};
    const [showCheckmark, setShowCheckmark] = useState(false);
    const navigation = useNavigation();

    const handleHideModal = () => {
        setIsModalVisible(false);
        navigation.navigate('HomeScreen');
    };

    const styles = StyleSheet.create({
        button: {
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 5,
            marginTop: 20,
        },
        buttonText: {
            color: 'white',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
        },
        image: {
            width: 180,
            height: 180,
            marginBottom: 10,
        },
        textModal: {
            marginBottom: '90%',
            textAlign: 'center'
        },
        modalView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0)',
        },
        modalContent: {
            backgroundColor: 'white',
            width: '88.4%',
            paddingTop: '30%',
            padding: '20%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 8,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'transparent',
            ...Platform.select({
                ios: {
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    shadowRadius: 8,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },
                },
                android: {
                    elevation: 5,
                },
            }),
        },
    });    

    useEffect(() => {
        console.log("hola2");
        console.log("result:" + result);
        // setIsModalVisible(true);
        if (isVisible && status == 'success') {
            setShowCheckmark(true);
        } else {
            setShowCheckmark(false);
        }
    }, [isVisible, status])

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                setIsModalVisible(false);
            }}
        >
            <View style={styles.modalView}>
                <View style={styles.modalContent}>
                    {showCheckmark ? (
                        <Image source={checkmarkImage} style={[styles.image, { tintColor: 'green' }]} />
                    ) : (
                        <Image source={crossmarkImage} style={[styles.image, { tintColor: 'red' }]} />
                    )}
                    <StyledText style={styles.textModal} className="text-black  text-xl font-bold">
                        {message}
                    </StyledText>
                    <TouchableOpacity onPress={handleHideModal} style={styles.button}>
                        <Text style={styles.buttonText}>Regresar!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


