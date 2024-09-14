import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from '../../styles/Styles';
import { scale } from 'react-native-size-matters';

const CartNotificationButton = ({cartNumber, onPress}) => {
  return (
    <TouchableOpacity
      style={[
        styles.cartContainer,
        {
          backgroundColor: color.lightSecondary
        },
      ]}
      onPress={onPress}>
      {cartNumber > 0 && (
        <View style={styles.notificationTextContainer}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: '500',
              transform: [{translateY: -2}, {translateX: 1}],
              marginRight: 1,
              
            }}>
            {cartNumber > 0 && cartNumber < 100 ? cartNumber : 99}
          </Text>
        </View>
      )}
      <AntDesign 
        name={'shoppingcart'}
        size={scale(24)}
        color={cartNumber > 0 ? color.secondary : color.secondary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    borderRadius: 10,
    padding: 5,
    // width: scale(35),
    // height:scale(35),
    justifyContent: 'center',
    alignItems: 'center',
   
  },

  notificationTextContainer: {
    position: 'absolute',
    right: -1,
    top: -5,
    borderRadius: 10,
    backgroundColor: color.secondary,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderWidth:2,
    borderColor:color.white,
  },
});

export default CartNotificationButton;
