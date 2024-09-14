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
import { phoneData } from '../../../../data/phonedata';
import i18n from '../../../language/i18n';
import { fonts } from '../../../styles/unistyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { color, componentStyles } from '../../../styles/Styles'
import SettingButton from '../../../components/button/SettingButton';

function NotificationSetting({ navigation }) {

    const [sound, setSound]=useState(false)
    const [vibration, setVibration]=useState(true)

    const toggleSound=()=>{
        if(sound==true){
            setSound(false)
        }else{
            setSound(true)
        }
    }
    const toggleVibration=()=>{
        if(vibration==true){
            setVibration(false)
        }else{
            setVibration(true)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: color.graybackground }}>
        <StatusBar backgroundColor={color.primary}/>
        <TopNavigationBar
            IsSetting={true}
            NavigationTitle={i18n.t("notification")}
            onPressBack={() => navigation.goBack()}
        />

            <Text style={componentStyles.settingTitle}>Notification</Text>
            <View style={componentStyles.settingGroup}>
                <SettingButton
                    icon={<AntDesign name="sound" size={25} color={color.textGray} />}
                    text={'Sound'}
                    onPressGo={() => toggleSound()}
                    toggler={true}
                    toggleOn={sound}
                /> 
                <SettingButton
                    icon={<MaterialCommunityIcons name="music-note-outline" size={25} color={color.textGray} />}
                    text={'Ringtone'}
                    onPressGo={() => toggleVibration()}
                /> 
                <SettingButton
                    icon={<MaterialIcons  name="vibration" size={25} color={color.textGray} />}
                    text={'Vibration'}
                    onPressGo={() => toggleVibration()}
                    toggler={true}
                    toggleOn={vibration}  
                /> 
            </View>


            
        </View>
    )
}

export default NotificationSetting;
const styles = StyleSheet.create({

});