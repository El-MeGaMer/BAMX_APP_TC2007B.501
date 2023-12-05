import React from 'react';
import { View, Text, Modal } from 'react-native';

const ModalComponent = ({ isVisible, success }) => {
    const message = success
        ? 'Formulario enviado con éxito'
        : 'Error al enviar el formulario. Por favor, complete todos los campos.';

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: 'white', padding: 50, borderRadius: 6, elevation: 5 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        {message}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default ModalComponent;
