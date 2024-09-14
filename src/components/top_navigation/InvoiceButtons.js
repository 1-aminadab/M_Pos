import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {color, textStyles, containerStyles} from '../../styles/Styles';

const {width, height} = Dimensions.get('window');

const InvoiceButtons = ({onSharePress, onPrintPress}) => {
  return (
    <View
      style={{
        // borderWidth: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        gap: 20,
      }}>
      <TouchableOpacity
        style={styles.invoiceBtnContainer}
        onPress={onSharePress}>
        <View
          style={{
            backgroundColor: color.lightBlue,
            padding: 5,
            borderRadius: 50,
          }}>
          <MaterialCommunityIcons
            name="share"
            size={22}
            color={color.secondary}
          />
        </View>
        <Text style={styles.text}>share</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.invoiceBtnContainer, {paddingHorizontal: 20}]}
        onPress={onPrintPress}>
        <View
          style={{
            backgroundColor: color.lightBlue,
            padding: 5,
            borderRadius: 50,
          }}>
          <AntDesign name="printer" size={22} color={color.secondary} />
        </View>
        <Text style={styles.text}>Print</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  invoiceBtnContainer: {
    flex: 1,
    borderWidth: 1.8,
    borderColor: color.secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: width > 400 ? 15 : 10,
    borderRadius: 10,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {width: 1, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  text: {fontSize: 18, fontWeight: '500'},
});

export default InvoiceButtons;
