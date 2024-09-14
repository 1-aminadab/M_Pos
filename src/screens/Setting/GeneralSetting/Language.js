import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  TextInput, StatusBar
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { verticalScale, scale } from 'react-native-size-matters';
import { Iconify } from 'react-native-iconify';
import Feather from 'react-native-vector-icons/Feather';
import { phoneData } from '../../../../data/phonedata';
import i18n from '../../../language/i18n';
import { fonts } from '../../../styles/unistyle';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';
import { color, componentStyles } from '../../../styles/Styles'
import { getPersist } from '../../../database/services/persistService.js';



const Language = ({ navigation }) => {


  const flagLanguageName = [
    {
      countryCode: 'US',
      isRTL: false,
      languageCode: 'en',
      languageTag: 'en-US',
      languageName: 'English',
    },
    {
      countryCode: 'ET',
      isRTL: false,
      languageCode: 'am',
      languageTag: 'am-ET',
      languageName: 'Amharic',
    },
  ];
  const [activeRadio, setActiveRadio] = useState(
    flagLanguageName.find(i => i.languageCode == i18n.locale).languageName,
  );
  useEffect(()=>{
    const getPersistData = async()=>{
      return await getPersist()
    
    }
  console.log("persist data",getPersistData());
  },[])

  return (
    <View style={{ flex: 1, backgroundColor: color.graybackground }}>
      <StatusBar backgroundColor={color.primary} />

      <TopNavigationBar
        IsSetting={true}
        NavigationTitle={i18n.t("lang")}
        onPressBack={() => navigation.goBack()}
      />

      <Text style={componentStyles.settingTitle}>Choose Your Prefered Language</Text>
      <View style={styles.activeLang}>

        <RadioButton
          state={activeRadio}
          name={activeRadio}
          gap={'0'}
          icon={true}
        />
      </View>
      <View style={[styles.settingGroup]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={flagLanguageName}
          numColumns={1}
          renderItem={({ item }) => (
            <RadioButton
              langCode={item.languageCode}
              navigation={navigation}
              name={item.languageName}
              state={activeRadio}
              setState={setActiveRadio}
              Flag={item.countryCode}
              gap={'0'}
              icon={true}
            />
          )}
          keyExtractor={item => item.languageTag}
        />
      </View>
    </View>
  );
};

export default Language;
const styles = StyleSheet.create({
  settingGroup: {
    backgroundColor: color.white,
    margin: 20,
    borderRadius: 15
  }, activeLang: {
    borderRadius: 15,
    borderColor: color.outline,
    borderWidth: 2,
    marginHorizontal: 20
  }
});


const RadioButton = ({ name, state, setState, Flag, langCode, navigation, gap, icon }) => {
  const flagIcon = phoneData.find(country => country.code == Flag);
  const changeLanguage = async () => {
    i18n.locale = langCode;
    setState(name);
    // navigation.navigate('Preference');
  };
  return (
    <Pressable
      onPress={changeLanguage}
      style={{
        height: 61,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 32,
        justifyContent: 'space-between',
        marginBottom: gap ? gap : verticalScale(10),
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* {<flagIcon.Flag />} */}
        <Text style={[fonts.ptext, { fontWeight: state == name ? 600 : 400, color: color.textDark }]}>{name}</Text>
      </View>
      {state == name && icon ? (
        <Feather
          name="check"
          color={color.textDark}
          size={20}
        />
      ) : state == name ? (<Iconify
        icon="ic:outline-radio-button-checked"
        color={color.textDark}
      />) : icon ? null : (
        <Iconify
          icon="ic:round-radio-button-unchecked"
          color={color.textDark}
        />
      )}
    </Pressable>
  );
};
