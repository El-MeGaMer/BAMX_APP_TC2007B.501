import React, { useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker, { launchImageLibrary, ImageLibraryOptions, ImagePickerResponse } from 'react-native-image-picker';
import { DB_FILTERS } from '../constants/DB_constants';

const DropDown = () => {
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [items1, setItems1] = useState([
        { label: 'Recibo', value: DB_FILTERS.AREA1 },
        { label: 'CribaFV', value: DB_FILTERS.AREA2 },
        { label: 'Empaque', value: DB_FILTERS.AREA3 },
        { label: 'AlmacenComp', value: DB_FILTERS.AREA4 },
        { label: 'Almacen', value: DB_FILTERS.AREA5 },
        { label: 'CuartosFrios', value: DB_FILTERS.AREA6 }
    ]);

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        { label: 'Opción1', value: 'opcion1' },
        { label: 'Opción2', value: 'opcion2' },
        { label: 'Opción3', value: 'opcion3' }
    ]);

    const handleImagePicker = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (response.didCancel) {
                console.log('La operación fue cancelada');
            } else if (response.errorCode) {
                console.error(`Error: ${response.errorCode}`);
            } else if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15
        }}>
            <Text>Selecciona una área</Text>
            <DropDownPicker
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setItems1}
                multiple={false}
                theme="LIGHT"
                mode="SIMPLE"
            />

            <Text>Tipo de incidente</Text>
            <DropDownPicker
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                multiple={false}
                theme="LIGHT"
                mode="SIMPLE"
            />

            <Text>Adjunta foto</Text>
            <Button title="Adjuntar Foto" onPress={handleImagePicker} />
            {imageUri && (
                <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
            )}
        </View>
    );
};

export default DropDown;