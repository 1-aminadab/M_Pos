import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {color, textStyles} from '../../styles/Styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CartNotificationButton from '../button/CartNotificationButton';

const SellProductTopBar = ({
  onCancel,
  onDone,
  label1,
  label2,
  cartNumber,
  activeLabel2,
}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.topHeading}>
      <TouchableOpacity
        style={{}}
        /* Cancel Navigation Link Here */
        onPress={onCancel}>
        <Text style={[styles.topHeadingText, {color: color.primary}]}>
          Cancel
        </Text>
      </TouchableOpacity>
      <Text style={[styles.topHeadingText, {color: color.normal}]}>
        {label1}
      </Text>
      {cartNumber?.toString() ? (
        <CartNotificationButton cartNumber={cartNumber} onPress={onDone} />
      ) : (
        <TouchableOpacity style={{}} onPress={onDone}>
          <Text
            style={[
              styles.topHeadingText,
              {color: activeLabel2 ? color.primary : color.gray},
            ]}>
            {label2}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topHeading: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    // borderWidth: 1,
  },
  topHeadingText: {
    // flex: 1,
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SellProductTopBar;
