import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { color, componentStyles } from '../../../styles/Styles'
import CustomTextInput from '../../../components/input/CustomTextInput';
import Button from '../../../components/button/Button';

function TwoStep({ navigation }) {
    return (
        <View style={{ flex: 1, }}>
            <TopNavigationBar
                NavigationTitle={'Two-Step Verification'}
                onPressBack={() => navigation.goBack()}
                middleLabel={'Setting'}
                IsSetting={true}
            />
            <View style={[componentStyles.settingGroup, { paddingBottom: 20, marginTop: 25 }]}>
                <Text style={[{ color: color.textDark, padding: 10, paddingBottom: 0, fontSize: 18, fontWeight: 500 }]}>Password</Text>
                <Text style={[{ color: color.textGray, padding: 10 }]}>Two-step Verification is enabled, Enter your password to proceed.</Text>
                <View style={[{ paddingVertical: 10 }]}>
                    <CustomTextInput
                        placeholder={'Password'}
                        icon={<MaterialIcons name="lock-outline" size={25} color={color.outline} />}
                    />
                </View>
                <Button
                    label={'Proceed'}
                    btnBG={color.primary}
                    textcolor={color.white}
                />
            </View>
        </View>
    )
}

export default TwoStep