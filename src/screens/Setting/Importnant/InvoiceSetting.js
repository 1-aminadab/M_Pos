import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    TextInput, StatusBar
} from 'react-native';
import React, { useState } from 'react';
import { verticalScale, scale } from 'react-native-size-matters';
import { Iconify } from 'react-native-iconify';
import Feather from 'react-native-vector-icons/Feather';
import { phoneData } from '../../../data/phonedata';
// import i18n from '../../language/i18n';
import { fonts } from '../../styles/unistyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5  from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { color, componentStyles } from '../../../styles/Styles'
import SettingButton from '../../../components/button/SettingButton';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';

function InvoiceSetting({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: color.graybackground }}>
            <StatusBar backgroundColor={color.primary} />
            <TopNavigationBar
                IsSetting={true}
                NavigationTitle={"INvoice Setting"}
                onPressBack={() => navigation.goBack()}
            />
            <View style={componentStyles.settingGroup}>
                <SettingButton
                    icon={<MaterialCommunityIcons name="printer-outline" size={25} color={color.textGray} />}
                    text={'Printer Setting'}
                    onPressGo={() => navigation.navigate('printerSettingScreen')}
                />
                <SettingButton
                    icon={<FontAwesome5  name="money-bill" size={20} color={color.textGray} />}
                    text={'Currency'}
                    onPressGo={() => navigation.navigate('currency')}
                />
            </View>

        </View>
    )
}

export default InvoiceSetting