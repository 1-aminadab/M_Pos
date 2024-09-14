import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
// import { color } from '../../styles/Styles';
import { color, textStyles } from '../../styles/Styles'

const Button = ({ label, theme, onPress, height, btnBG, disabled, fontSize, textcolor,style ,paddingHorizontal,uppercase, fontWeight, icon,outlineColor,thinBorder, justify}) => {
  const styles = StyleSheet.create({
    btnContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   
    },
    btn: {
      alignItems: 'center',
      flexDirection:'row',
      justifyContent: justify?justify:'center',
      height: height ? height : 55,
      width: '100%',
      borderRadius: thinBorder?25:10,
      paddingHorizontal:paddingHorizontal?paddingHorizontal: 20,
    },
    btnLabel: {
      color: textcolor ? textcolor : '#fff',
      textAlign: 'center',
      fontSize: fontSize ? fontSize : 18,
      // fontWeight: fontWeight?fontWeight:'600',
      textTransform: uppercase?uppercase:"capitalize",
    },
    thinBorder:{
      borderWidth:1,
      borderRadius:'50%'
    }

  });
  // console.log(Theme)
  if (theme && theme === 'primary') {
    return (
      <View style={[styles.btnContainer]}>
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.9}
          style={[
            styles.btn,
            {
              backgroundColor: disabled
                ? color.gray
                : btnBG
                  ? btnBG
                  : color.primary,
                  borderWidth:outlineColor?thinBorder?1:2:0,
                  borderColor:outlineColor?outlineColor:'none',
            },
          ]}
          onPress={!disabled ? onPress : null}>
             {icon}
          {label?<Text style={[styles.btnLabel,textStyles.text_semiBold, { fontSize: fontSize || 18,paddingHorizontal:5 }]}>
            {label}
          </Text>:null}
        </TouchableOpacity>
      </View>
    );
  }
  if (theme && theme === 'secondary') {
    return (
      <View style={[styles.btnContainer]}>
        <TouchableOpacity
          activeOpacity={disabled ? 1 : 0.5}
          style={[
            styles.btn,
            {
              borderWidth: 1.5,
              borderColor: disabled
                ? 
                 btnBG
                  ? btnBG
                  :color.outline:outlineColor?outlineColor: color.primary,
            },
          ]}
          onPress={!disabled ? onPress : null}>
            {icon}
          {label?<Text
            style={[
              styles.btnLabel,textStyles.text_semiBold,
              {
                color: textcolor?textcolor:disabled ? color.gray : btnBG ? btnBG : color.primary,
                fontSize: fontSize || 16,paddingHorizontal:5
              },
            ]}>
            {label}
          </Text>:null}
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={[styles.btnContainer]}>
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.5}
        style={[
          styles.btn,
          { backgroundColor: disabled ? color.gray : btnBG ? btnBG : '#fff' },
        ]}
        onPress={!disabled ? onPress : null}>
        <Text style={[styles.btnLabel,textStyles.text_semiBold,{}]}>{label}</Text>

        {icon?<View style={[{justifyContent:'flex-end'}]}>
        {icon}
        </View>:null}
        
      </TouchableOpacity>
    </View>
  );
};

export default Button;
