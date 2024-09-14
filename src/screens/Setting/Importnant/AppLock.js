import {
    View,
    StatusBar
} from 'react-native';

import React, { useContext, useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { color, componentStyles } from '../../../styles/Styles'
import SettingButton from '../../../components/button/SettingButton';
import CustomModal from '../../../components/modal/CustomModal';
import NumberPad from '../../../components/Common/NumberPad';
import { AuthContext } from '../../../hooks/useContext/AuthContext';
import { updateLockPin } from '../../../database/services/persistService.js';
import { getPersist } from '../../../database/services/persistService.js';
function AppLock({ navigation }) {
    const [lock, setlock] = useState(false)
    const [saleLock, setsaleLock] = useState(false)
    const [purpose, setPurpose] = useState('')
    const [pinmodalVisible, setPinModalVisible] = useState(false)
    const { appLock } = useContext(AuthContext)
    console.log("get persisit", getPersist())

    useEffect(() => {
        appLock?.appLock ? setlock(true) : setlock(false)
        appLock?.saleLock ? setsaleLock(true) : setsaleLock(false)
    }, [appLock])


    const togglelock = (purpose) => {
        setPinModalVisible(true)
        setPurpose(purpose)
    }
    const togglesaleLock = () => {
        setPinModalVisible(true)
        setPurpose('saleActivation')
    }

    const updateModalVisible = (value) => {
        setPinModalVisible(value);
    };

    return (
        <View style={{ flex: 1, backgroundColor: color.graybackground }}>
            <StatusBar backgroundColor={color.primary} />
            <CustomModal
                modalVisibility={pinmodalVisible}
                setModalVisibility={setPinModalVisible}
                innerModal={<View style={[{ padding: 20, margin: 20, backgroundColor: color.white, borderRadius: 20 }]}>
                    <NumberPad
                        pin={true}
                        purpose={purpose}
                        updateModalVisible={updateModalVisible}
                    /></View>} />
            <TopNavigationBar
                IsSetting={true}
                NavigationTitle={"App Lock"}
                onPressBack={() => navigation.goBack()}
            />
            
            <View style={[componentStyles.settingGroup, { marginTop: 25 }]}>
                <SettingButton
                    icon={<MaterialIcons name="lock-outline" size={25} color={color.textGray} />}
                    text={'App Lock'}
                    onPressGo={() => togglelock('activation')}
                    toggler={true}
                    toggleOn={lock}
                />
                <SettingButton
                    icon={<MaterialIcons name="lock-outline" size={25} color={color.textGray} />}
                    text={'Change PIN'}
                    onPressGo={() => togglelock('change-pin')}
                />
                <SettingButton
                    icon={<MaterialIcons name="lock-outline" size={25} color={color.textGray} />}
                    text={'Passcode to complete sale'}
                    onPressGo={() => togglelock('saleActivation')}
                    toggler={true}
                    toggleOn={saleLock}
                />
            </View>
        </View>

    )
}

export default AppLock