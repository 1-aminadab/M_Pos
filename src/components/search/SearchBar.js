import {
  View,
  Text,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {color, textStyles} from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SearchBar = ({style, search, setSearch, placeholder, height, setshowScanBarcode,disablescan}) => {
  return (
    <View
      style={[
        {
          backgroundColor: color.white,
          borderRadius: 10,
          height: height ? height : 54,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 15,
          alignItems: 'center',
          borderColor: color.outline,
          borderWidth: 1,
          // ...Platform.select({
          //   ios: {
          //     shadowColor: 'black',
          //     shadowOffset: {width: 0, height: 2},
          //     shadowOpacity: 0.25,
          //     shadowRadius: 4,
          //   },
          //   android: {
          //     elevation: 4,
          //   },
          // }),
          // borderColor: color.gray,
        },
        style,
      ]}>
      <View
        style={[
          styles.flexRow,
          {
            flex: 1,
            justifyContent: 'space-between',
            gap: 10,
            height: '100%',
          },
        ]}>
        <TextInput
          style={[textStyles.text_regular_Gray,{flex: 1, height: '100%', borderWidth: 0, }]}
          value={search}
          placeholder={placeholder}
          onChangeText={text=>{if(text!='+'){setSearch(text)}}}
        />
        <Ionicons name="search" size={24} color={color.grayDark} />
           {disablescan==true ? null:
         <TouchableOpacity
        style={{
          borderWidth: 0,
          // paddingVertical: 10,
          paddingHorizontal: 8,
          borderLeftWidth:1,
          borderColor:color.grayDark,
          marginRight: 5,
        }}
        onPress={setshowScanBarcode}>
        <MaterialCommunityIcons name="line-scan" size={24} color={color.grayDark} />
      </TouchableOpacity>
    }

      </View>
      
      <TouchableOpacity
        style={{
          borderWidth: 0,
          // paddingVertical: 10,
          paddingHorizontal: 8,
          marginRight: 5,
          display: search?.length > 0 ? 'flex' : 'none',
        }}
        onPress={() => search && setSearch('')}>
        <Ionicons name="close" size={25} color={color.normal} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SearchBar;
