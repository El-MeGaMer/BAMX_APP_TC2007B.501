import React, { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { DB_FILTERS } from '../constants/DB_constants';

const DropDown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(['Recibo', 'CribaFV', 'Empaque', 'Entrega', 'AlmacenComp', 'Almacen', 'CuartosFrios']);
    const [items, setItems] = useState([
        {label: 'Recibo', value: DB_FILTERS.RECIBO},
        {label: 'CribaFV', value: DB_FILTERS.CRIBAFV},
        {label: 'Empaque', value: DB_FILTERS.EMPAQUE},
        {label: 'AlmacenComp', value: DB_FILTERS.ALMACENCOMP},
        {label: 'Almacen', value: DB_FILTERS.ALMACEN},
        {label: 'CuartosFrios', value: DB_FILTERS.CUARTOSFRIOS}
    ]);

    return (
        <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15
        }}>
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple={true}
            theme="LIGHT"
            mode="SIMPLE"
        />
        </View>
    );
};

export default DropDown;