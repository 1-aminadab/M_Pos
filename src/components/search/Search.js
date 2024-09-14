import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {verticalScale, scale} from 'react-native-size-matters';
import {Iconify} from 'react-native-iconify';
import {theme} from '../../styles/stylesheet';

const Search = ({value, search, placeholder}) => {
  return (
    <View
      style={{
        marginHorizontal: 25,
        backgroundColor: '#F9F7F7',
        height: 41,
        //width: "100%",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginBottom: verticalScale(10),
      }}>
      <Iconify icon="ion:search" size={18} color={theme.color.gray} />
      <TextInput
        value={value}
        onChangeText={search}
        placeholder={placeholder}
        style={{
          flex: 1,
          height: '100%',
          fontSize: 18,
          borderWidth: 0,
          fontWeight: '500',
          color: 'black',
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
