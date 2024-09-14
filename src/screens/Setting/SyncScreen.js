import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Iconify} from 'react-native-iconify';
import {verticalScale, scale} from 'react-native-size-matters';
import {theme} from '../../styles/stylesheet';
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { fonts } from '../../styles/unistyle';

const SyncScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#fff',
          height: verticalScale(66),
          justifyContent: 'space-between',
          paddingHorizontal: scale(25),
          alignItems: 'center',
          //paddingVertical:0
        }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Iconify icon="ion:chevron-back-outline" size={20} />
        </Pressable>
        <Text style={[fonts.h1]}>{'Sync'}</Text>
        <Pressable onPress={() => navigation.navigate('SyncHistory')}>
          <Iconify icon="ic:outline-history" size={20} />
        </Pressable>
      </View>
      <View style={{paddingHorizontal: 25}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            paddingHorizontal: 21,
            paddingVertical: 20,
            marginTop: 10,
          }}>
          <View>
            <Text style={[fonts.h3]}>Total</Text>
          </View>
          <View>
            <Text style={[fonts.h3]}>Unsynced</Text>
          </View>
          <View>
            <Iconify
              icon="ic:baseline-wifi-off"
              size={20}
              color={theme.color.primary}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.color.blue,
            paddingVertical: 20,
            marginTop: 15,
            paddingHorizontal: 21,
          }}>
          <View style={styles.titlelable}>
            <Text style={[fonts.h3]}>Sale</Text>
          </View>
          <View>
            <Text style={[fonts.ptext]}>20</Text>
          </View>
          <View>
            <Text style={[fonts.ptext]}>2</Text>
          </View>
          <View>
            <Iconify
              icon="eva:sync-fill"
              size={18}
              color={theme.color.primary}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.color.blue,
            paddingVertical: 20,
            marginTop: 15,
            paddingHorizontal: 21,
          }}>
          <View style={styles.titlelable}>
            <Text style={[fonts.h3]}>Product</Text>
          </View>
          <View>
            <Text style={[fonts.ptext]}>10</Text>
          </View>
          <View>
            <Text style={[fonts.ptext]}></Text>
          </View>
          <View>
            <Iconify icon="eva:sync-fill" size={20} color={theme.color.green} />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: theme.color.blue,
            paddingVertical: 20,
            marginTop: 15,
            paddingHorizontal: 21,
          }}>
          <View style={styles.titlelable}>
            <Text style={[fonts.h3]}>Customer</Text>
          </View>
          <View>
            <Text style={[fonts.ptext]}>20</Text>
          </View>
          <View>
            <Text style={[fonts.ptext]}>10</Text>
          </View>
          <View>
            <Iconify
              icon="eva:sync-fill"
              size={20}
              color={theme.color.primary}
            />
          </View>
        </View>
        <Pressable
          style={{
            borderRadius: 10,
            backgroundColor: theme.color.primary,
            paddingVertical: 18,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: verticalScale(15),
          }}>
          <Text style={[{color: 'white', },fonts.h1]}>
            Sync Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SyncScreen;

const styles = StyleSheet.create({
  titlelable: {
    position: 'absolute',
    top: 0,
    left: 14,
    marginTop: -10,
    backgroundColor: theme.color.white,
    paddingHorizontal: 6,
  },
});
