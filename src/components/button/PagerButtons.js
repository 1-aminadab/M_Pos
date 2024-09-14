import {View, Text, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import { color } from '../../styles/Styles';
const PagerButtons = ({buttons, onClick}) => {
  const [btnContainerWidth, setBtnContainerWidth] = useState(0);
  const btnWidth = btnContainerWidth / buttons.length;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateXOppposit = translateX.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const onPress = i => {
    onClick(i + 1);
    Animated.spring(translateX, {
      toValue: i * btnWidth,
      useNativeDriver: true,
      bounciness: 0,
    }).start();
  };
  return ( 
    <View
      style={styles.btnContainer}
      onLayout={e => setBtnContainerWidth(e.nativeEvent.layout.width)}>
      {buttons.map((btn, i) => {
        return (
          <TouchableOpacity
            key={i}
            style={styles.btn}
            onPress={() => onPress(i)}>
            {btn.icon}
            <Text style={{fontWeight:"bold",color:color.gray}}>{btn.title}</Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View style={[styles.animatedBtnContainer, {width:btnWidth, transform:[{ translateX}]}]}>

     
      {buttons.map((btn, i) => {
        return (
          <Animated.View key={i} style={[styles.aminatedBtn, { width: btnWidth, transform: [{ translateX: translateXOppposit }] }]}>
            {btn.icon}
            <Text style={styles.btnTextActive}>{btn.title}</Text>
          </Animated.View>
        );
      })}
       </Animated.View>
    </View>
  );
  
};

const styles = StyleSheet.create({
  btnContainer: {
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor:color.lightSecondary,
    width: '100%',
  },
  btn: {
    flex: 1,
    flexDirection:"row",
    gap:5,
    paddingHorizontal:5,
    alignItems: 'center',
  },
  animatedBtnContainer: {
    height: 40,
    flexDirection: 'row',
    position: 'absolute',
    overflow: 'hidden',
    backgroundColor: color.secondary,
  },
  aminatedBtn: {
    height: 40,
    flexDirection:"row",
    paddingHorizontal: 5,
    gap:5,
    alignItems: 'center',
  },
  btnTextActive: {
    
    fontWeight: '700',
    
  },
});

export default PagerButtons;
