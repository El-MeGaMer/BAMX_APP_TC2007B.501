import { Text, View } from 'react-native'
import React, { Component } from 'react'
import TwoColLog from '../components/TwoColLog'
import Container from '../components/Container';
import Background from '../components/Background';
import { styled } from "nativewind";

const StyledView = styled(View);

export default function DisplayLogs({route, navigation}) {
    const {desiredLog} = route.params;
    return (
        <StyledView className="flex-1">
            <TwoColLog type = {desiredLog}/>
      </StyledView>
    )
}