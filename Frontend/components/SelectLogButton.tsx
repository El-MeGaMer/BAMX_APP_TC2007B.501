import { Text, View, TouchableOpacity, Pressable } from 'react-native'
import React, { Component } from 'react'

import { styled  } from "nativewind";

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

import { useNavigation } from '@react-navigation/native';

const SelectLogButton = ( {text, desiredLog}) => {  
    const navigation = useNavigation();

    // 
    const showLog = () => {
      navigation.removeListener
      navigation.navigate('DisplayLogs', { desiredLog: desiredLog })
    }

    return (
        <StyledPressable
          onPress={showLog}
          className=" bg-orange p-3 rounded-xl shadow px-8 pt-4 pb-4 mb-4 w-full max-w-xs items-center focus:bg-red-50"
        >
          <StyledText className="text-white font-bold text-md">{text? text: 'asdsd'}</StyledText>
        </StyledPressable>
    )
}

export default SelectLogButton