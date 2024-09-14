import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {color} from '../../../styles/Styles';
import UserInfo from './userInfo';
import PackagePlans from './plans';
import TopNavigationBar from '../../../components/top_navigation/TopNavigationBar';

const Device_Width = Dimensions.get('window').width;

const UserPackages = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={{paddingHorizontal: 16}}>
        <TopNavigationBar backIcon onPressBack={() => navigation.goBack()} />
      </View>
      <UserInfo navigation={navigation} />
      <View
        style={{
          marginTop: 25,
          flex: 1,
          backgroundColor: color.lightGray,
          paddingHorizontal: 18,
        }}>
        <PackagePlans />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  planContainer: {
    flex: 1,
    width: Device_Width - 40,
    backgroundColor: color.lightGreen,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    overflow: 'hidden',
  },

  basic: {
    fontSize: 22,
    fontWeight: '600',
    color: color.white,
    marginBottom: -5,
    textTransform: 'uppercase',
  },
});

export default UserPackages;
