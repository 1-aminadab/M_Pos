import {View, Text, ActivityIndicator, Image} from 'react-native';
import React from 'react';
import { color } from '../../styles/Styles';

const LoginLoading = () => {
  return (
          <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <Image
            source={require('../../assets/images/logo-02.png')}
            style={{ width: 80, height: 80, marginTop: 10 }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10,}}>
          <ActivityIndicator size="small" color={color.primary} />
          <Text style={{  color: color.primary }}>Loading...</Text>
          </View>

        </View>
      </View>
  );
};

export default LoginLoading;
