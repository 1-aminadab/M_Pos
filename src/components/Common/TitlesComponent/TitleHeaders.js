import React from 'react';
import {View, Text} from 'react-native'
import { color } from '../../../styles/Styles';
const TitleHeaders = ({TitleOne, TitleTwo}) => {
    return (
        <View style={{flexDirection: 'column', alignItems:'flex-start', justifyContent: 'center', paddingHorizontal: 15}}>
            <Text style={{fontSize: 14, fontFamily: 'Nunito Sans', fontWeight: 600, color: color.Neutral_60}}>{TitleOne}</Text>
            <Text style={{fontSize: 25, fontFamily: 'Nunito Sans', fontWeight: 600, color: color.lightBlack}}>{TitleTwo}</Text>
        </View>
    );
}

export default TitleHeaders;
