import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {color, textStyles} from '../../styles/Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductButton = ({
  style,
  height,
  textcolor,
  disabled,
  fontSize,
  label,
  onPress,
  btnBG,
  isInventory,
  IsOrder,
  onLongPress,
  key,
  navigation,
  selectedProduct,
  paddingHorizontal
}) => {
  const styles = StyleSheet.create({
    btnContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
      alignItems: 'center',
      justifyContent: 'center',
      height: height ? height : 40,
      width: '100%',
      borderRadius: 7,
      paddingHorizontal:paddingHorizontal ? paddingHorizontal : 5
    },
    btnLabel: {
      color: textcolor ? textcolor : '#fff',
      textAlign: 'center',
      fontSize: fontSize ? fontSize : 15,
      fontWeight: '500',
    },
    style: {
      style,
    },
  });
  return (
    <View style={[styles.btnContainer]}>
      {!isInventory ? (
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.5}
          onLongPress={onLongPress}
          key={key}
          style={[
            styles.btn,
            {
              backgroundColor: IsOrder
                ? selectedProduct
                  ? color.lightSecondary
                  : color.secondary
                : color.lightPrimary,
                
            },
          ]}
          onPress={onPress}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.btnLabel,
                textStyles.text_bold,
                {
                  color: IsOrder
                    ? selectedProduct
                      ? color.textGray
                      : color.white
                    : color.primary,
                    fontSize:fontSize
                },

              ]}>
              {label}
            </Text>
            {IsOrder ? (
              <Ionicons
                name="cart-outline"
                size={15}
                color={
                  IsOrder
                    ? selectedProduct
                      ? color.textGray
                      : color.white
                    : color.white
                }
              />
            ) : null}
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ProductButton;
