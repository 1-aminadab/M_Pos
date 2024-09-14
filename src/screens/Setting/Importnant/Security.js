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
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { color, componentStyles } from '../../../styles/Styles'
import SettingButton from '../../../components/button/SettingButton';


const Security = ({navigation}) => {
    const [isEnabled2S, setIsEnabled2S] = useState(true)
    const toggleSwitch2S = () => setIsEnabled2S(previousState => !previousState);
  const lables = [
    {
      lable: i18n.t("changepassword"),
      Icon: () => <Iconify icon="mdi:password" size={20} />,
      forwardTo: 'ChangePassword',
      arrow: false,
    },
    {
      lable: 'Sync',
      Icon: () => <Iconify icon="eva:sync-fill" size={20} />,
      forwardTo: 'SyncScreen',
      arrow: ()=><View>
      <View style={{alignItems:'flex-end'}}>{false?<Iconify icon='ic:baseline-wifi-off' size={16} color={theme.color.primary}/>:<Iconify icon='ic:baseline-wifi' size={16} color={theme.color.green}/>}
      <View style={{flexDirection:'row',alignItems:'center',gap:10}}><Text>1 sec ago</Text><Iconify icon='eva:sync-fill' size={18} color={false?theme.color.primary:theme.color.green}  /></View></View>
    </View>,
    },
    {
      lable: 'Two-Step Authentication',
      Icon: () => <Iconify icon="carbon:two-factor-authentication" size={20} />,
      forwardTo: '',
      arrow: ()=> (<View>
      <Switch
        trackColor={{false: '#d8d8d8', true: theme.color.green}}
        thumbColor={isEnabled2S ? '#fff' : '#fff'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch2S}
        value={isEnabled2S}
      />
    </View>),
    },
    {
      lable: 'Active Sessions',
      Icon: () => <Iconify icon="fluent:phone-24-filled" size={20} />,
      forwardTo: 'ActiveSessionScreen',
      arrow: false,
    },
  ];
  return (
    <View style={{flex: 1,}}>
              <TopNavigationBar
          // backIcon={true} 
          NavigationTitle={'Setting'}
          onPressBack={() => navigation.goBack()}
          middleLabel={'Setting'}
          IsSetting={true}
        />
         <Text style={componentStyles.settingTitle}>Privacy & Security</Text>
            <View style={componentStyles.settingGroup}>
             
                <SettingButton
                    icon={<Octicons name="key" size={20} color={color.textGray} />}
                    text={'Two-Step Verification'}
                    onPressGo={() => navigation.navigate('two-step')}
                /> 
                <SettingButton
                    icon={<MaterialIcons  name="lock-outline" size={25} color={color.textGray} />}
                    text={'App Lock'}
                    onPressGo={() => navigation.navigate('appLock')}

                /> 
                <SettingButton
                    icon={<MaterialIcons  name="devices" size={25} color={color.textGray} />}
                    text={'Devices'}
                    onPressGo={() => navigation.navigate('devices')}

                /> 
                <SettingButton
                    icon={<MaterialIcons  name="lock-outline" size={25} color={color.textGray} />}
                    text={'Change Password'}
                    onPressGo={() => navigation.navigate('changePassword', {screen:"changepassword"})}

                /> 

            </View>





      {/* <View style={{paddingHorizontal: 20}}>
        {lables.map(({lable, Icon, forwardTo, arrow}) => (
          <Lable
          key={lable}
            forward={forwardTo}
            arrow={arrow}
            lable={lable}
            Icon={Icon}
            navigation={navigation}
          />
        ))}
      </View> */}
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({


});
