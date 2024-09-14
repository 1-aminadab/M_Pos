import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {color} from '../../../styles/Styles';
import Button from '../../../components/button/Button';
import {FeatureElementRow, FeatureHeadRow} from './featureRow';

const Device_Width = Dimensions.get('window').width;

const PackagePlans = () => {
  const featuresData = [
    {
      feature: '120 Gb SSD Disk',
      isAvailableInFree: true,
      isAvailableInPremium: true,
    },
    {
      feature: '100 GB Band Width',
      isAvailableInFree: true,
      isAvailableInPremium: true,
    },
    {
      feature: 'Unlimited FTP Accounts',
      isAvailableInFree: true,
      isAvailableInPremium: true,
    },
    {
      feature: 'unlimited SUB domain',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: 'SSL Certification',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: 'CPanel',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: '5 Websites',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: '10 Admin Site with private email',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: 'CPanel',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: 'Unlitimte dflkha hsadf ',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: 'Admin private email',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: 'lkfghe sdlgkhue lhgoiw lhklwjef CPanel',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: ' Websites',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
    {
      feature: '17 Admin Site with private email',
      isAvailableInFree: false,
      isAvailableInPremium: true,
    },
  ];
  return (
    <View style={[styles.planContainer, {}]}>
      <View
        style={{
          backgroundColor: color.secondary,
          alignItems: 'center',
          paddingVertical: 15,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              //   marginTop: 10,
              fontSize: 20,
              fontWeight: '700',
              color: color.white,
            }}>
            Choose Your Plan
          </Text>
        </View>
      </View>
      <FeatureHeadRow />
      {/* Features Body Container */}
      <View
        style={{
          flex: 1,
          gap: 15,
        }}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 95,
          }}
          data={featuresData}
          renderItem={item => <FeatureElementRow featureData={item.item} />}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: color.gray,
                marginVertical: 10,
              }}
            />
          )}
        />
      </View>
      {/* Bottom Button */}
      <View
        style={{
          position: 'absolute',
          bottom: 10,
          width: '80%',
          maxWidth: 250,
          alignSelf: 'center',
        }}>
        <Button theme={'primary'} label={'Upgrade'} height={52} />
      </View>
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  planContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: color.lightGreen,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

export default PackagePlans;
