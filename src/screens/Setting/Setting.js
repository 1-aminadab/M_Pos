import { StyleSheet, Text, View, StatusBar, Image, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import TopNavigationBar from '../../components/top_navigation/TopNavigationBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SettingButton from '../../components/button/SettingButton';
import { color, componentStyles } from '../../styles/Styles'

import BottomModal from '../../components/modal/BottomModal';
import { PreferenceContext } from '../../hooks/useContext/PreferenceContext';


const Setting = ({ navigation }) => {
  const [showThemeModal, setshowThemeModal] = useState(false)
  const [theme, setTheme] = useState(['light'])

  const handleSelectedTheme = (selectedIndex) => {
    setTheme(selectedIndex)
  };
  const {store}=useContext(PreferenceContext)

  return (
    <View style={{ flex: 1, backgroundColor: color.graybackground }}>
      <StatusBar backgroundColor={color.primary} barStyle={'light-content'} />
      <View >
        <TopNavigationBar
          // backIcon={true} 
          NavigationTitle={'Setting'}
          onPressBack={() => navigation.goBack()}
          middleLabel={'Setting'}
          IsSetting={true}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={componentStyles.settingTitle}>General Setting</Text>
        <View style={componentStyles.settingGroup}>
          <SettingButton
            icon={<MaterialIcons name="person-pin" size={28} color={color.textGray} />}
            text={'Account'}
            onPressGo={() => navigation.navigate('profile')}
          />
          <SettingButton
            icon={<MaterialIcons name="sync" size={25} color={color.textGray} />}
            goIcon={<Ionicons name="sync" size={25} color={color.textGray} />}
            text={'Sync Data'}
            statusText={'1 sec ago'}
          />
          <SettingButton
            icon={<Ionicons name="globe-outline" size={25} color={color.textGray} />}
            text={'Language'}
            statusText={'English (USA)'}
            onPressGo={() => navigation.navigate('language')}

          />
          <SettingButton
            icon={<FontAwesome5 name="store" size={20} color={color.textGray} />}
            text={'Current Shop'}
            statusText={store?.name}
            onPressGo={() => navigation.navigate('inventory-config')}

            
          />
          <SettingButton
            icon={<Ionicons name="contrast" size={25} color={color.textGray} />}
            text={'Theme'}
            onPressGo={() => setshowThemeModal(true)}


          />
        </View>
        <Text style={componentStyles.settingTitle}>Important</Text>
        <View style={componentStyles.settingGroup}>
          <SettingButton
            icon={<MaterialCommunityIcons name="bell-outline" size={25} color={color.textGray} />}
            text={'Notifications'}
            onPressGo={() => navigation.navigate('notificationSetting')}
          />
          <SettingButton
            icon={<MaterialCommunityIcons name="shield-lock-outline" size={25} color={color.textGray} />}
            text={'Privacy & Security'}
            onPressGo={() => navigation.navigate('security')}

          />
          <SettingButton
            icon={<MaterialCommunityIcons name="note-text-outline" size={25} color={color.textGray} />}
            text={'Invoice Setting'}
            onPressGo={() => navigation.navigate('invoiceSetting')}

          />
        </View>
        <Text style={componentStyles.settingTitle}>Others</Text>
        <View style={componentStyles.settingGroup}>
          <SettingButton
            icon={<MaterialIcons name="info-outline" size={25} color={color.textGray} />}
            text={'About us'}
          // onPressGo={() => navigation.navigate('profile')}
          />
          <SettingButton
            icon={<MaterialCommunityIcons name="comment-alert-outline" size={25} color={color.textGray} />}
            text={'Feedback'}
            onPressGo={() => navigation.navigate('feedback')}

          />
          <SettingButton
            icon={<Image source={require('../../assets/icons/addispaylogogray.png')} width={20} style={[{ width: 22, height: 20, marginRight: 2 }]} />}
            text={'M-POS Version'}
            statusText={'1.0.1'}
            goIcon={true}
          />
        </View>
      </ScrollView>
      <BottomModal
        modalVisible={showThemeModal}
        setModalVisible={() => setshowThemeModal(false)}
        title={'choose your theme'}
        data={['dark', 'light']}
        defaultSelected={theme}
        radio={true}
        handleSelected={handleSelectedTheme}
      />
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: color.textDark,
    fontWeight: '500'
  },
  settingGroup: {
    paddingHorizontal: 20,
    backgroundColor: color.white,
    borderBottomWidth: 2,
    borderColor: color.darkTransparent
  }
});
