import {View, Text} from 'react-native';
import React from 'react';
import moment from 'moment';
import {color} from '../../../styles/Styles';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TopHead = ({handleBack, handleCloseModal, selectedHistory}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Entypo
        style={{padding: 8}}
        name="arrow-left"
        size={24}
        color="black"
        onPress={handleBack}
      />
      <View style={{}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 21,
            fontWeight: '500',
            color: selectedHistory
              ? selectedHistory?.status.includes('Out')
                ? color.primary
                : color.green
              : color.black,
          }}>
          {selectedHistory ? selectedHistory?.status : 'Stock History'}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            display: selectedHistory ? 'flex' : 'none',
            fontSize: 14,
            fontWeight: '500',
          }}>
          {moment(selectedHistory?.time).format('hh:mm A - DD/MM/YY')}
        </Text>
      </View>
      <FontAwesome
        style={{padding: 8}}
        name="close"
        size={24}
        color={color.primary}
        onPress={handleCloseModal}
      />
    </View>
  );
};

export default TopHead;
