import {View, Text} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {color} from '../../../styles/Styles';

export const FeatureHeadRow = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        gap: 5,
        alignItems: 'center',
        marginBottom: 5,
        paddingVertical: 10,
        backgroundColor: color.lightBlue,
      }}>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 17, fontWeight: '500', textAlign: 'center'}}>
          Package Features
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'flex-end',
          borderWidth: 0,
        }}>
        <View style={{}}>
          <Text style={{fontSize: 18, fontWeight: '500'}}>Basic</Text>
        </View>
        <View style={{}}>
          <Text style={{fontSize: 18, fontWeight: '700'}}>Premium</Text>
        </View>
      </View>
    </View>
  );
};

export const FeatureElementRow = ({featureData}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        gap: 15,
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text
          style={{
            fontSize: 15,
          }}>
          {featureData?.feature}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 0,
          width: 120,
          paddingLeft: 10,
        }}>
        <View style={{flex: 1, borderWidth: 0, borderColor: 'red'}}>
          <Ionicons
            name={
              featureData?.isAvailableInFree
                ? 'checkmark-circle-outline'
                : 'close-circle-outline'
            }
            size={24}
            color={featureData?.isAvailableInFree ? color.green : color.primary}
          />
        </View>
        <View style={{flex: 1, borderWidth: 0, borderColor: 'red'}}>
          <Ionicons
            name={
              featureData?.isAvailableInPremium
                ? 'checkmark-circle-outline'
                : 'close-circle-outline'
            }
            size={24}
            color={
              featureData?.isAvailableInPremium ? color.green : color.primary
            }
          />
        </View>
      </View>
    </View>
  );
};
