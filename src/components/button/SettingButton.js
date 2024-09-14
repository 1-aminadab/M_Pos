import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {color, textStyles} from '../../styles/Styles';

function SettingButton({
  icon,
  text,
  statusText,
  onPressGo,
  goIcon,
  toggler,
  toggleOn,
  textColor,
  backcolor,
  IsPayment,
  borderwidth,
  bordercolor,
  radius,
}) {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          height: 50,
          alignItems: 'center',
          backgroundColor: backcolor ? backcolor : 'transparent',
          borderWidth: borderwidth ? borderwidth : 0,
          borderColor: bordercolor ? bordercolor : 'none',
          borderRadius: radius ? radius : 0,
        },
      ]}
      onPress={onPressGo}>
      <View style={[{flexDirection: 'row', gap: 10, alignItems: 'center'}]}>
        {icon}
        <Text
          style={[
            IsPayment ? textStyles.text_bold : textStyles.text_regular,
            {color: textColor ? textColor : color.textDark},
          ]}>
          {text}
        </Text>
      </View>
      <View
        onPress={onPressGo}
        style={[{flexDirection: 'row', gap: 10, alignItems: 'center'}]}>
        <Text style={[{color: color.textGray}]}>{statusText}</Text>
        {goIcon ? (
          goIcon
        ) : toggler ? (
          toggleOn ? (
            <Fontisto name="toggle-on" size={30} color={color.primary} />
          ) : (
            <Fontisto name="toggle-off" size={30} color={color.textGray} />
          )
        ) : (
          <FontAwesome
            name="angle-right"
            size={25}
            color={textColor ? textColor : color.textGray}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default SettingButton;
