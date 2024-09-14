import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { color } from '../../../styles/Styles';
const DropDownComponent = ({ items ,reportData,sales}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [rotateValue] = useState(new Animated.Value(0));
  const [slideValue] = useState(new Animated.Value(0));

  const toggleDropDown = () => {
    setIsOpen(!isOpen);

    Animated.timing(rotateValue, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    Animated.timing(slideValue, {
      toValue: isOpen ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const rotateArrow = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const slideDropDown = slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, items.length * 40], // Assuming each item has a height of 40
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropDown} style={styles.header}>
      <View style={{flexDirection:"row",gap:5,alignItems:"center"}}>
        <AntDesign name="barschart" size={24} color="black" />
        <View>
          <Text style={{fontWeight: 'bold', fontSize: 16}}>{reportData} Report</Text>
          <Text style={{fontSize: 12, color: color.deepLightGray}}>
            january 2024
          </Text>
        </View>
      </View>
        <Animated.View style={{ transform: [{ rotate: rotateArrow }] }}>
        <Entypo name="chevron-up" size={27} color={color.gray} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[styles.dropDown, { height: slideDropDown }]}>
      <View style={{justifyContent:"space-around",height:'100%'}}>
        <View style={styles.reportList}>
          <Text style={{fontWeight:"bold"}}>Sales</Text>
          <View style={{flexDirection:"row"}}>
             <Text>{sales}</Text>
          <Entypo name="arrow-long-up" size={21} color="green" />
            <Text>2%</Text>
          </View>
        </View>
        <View style={styles.reportList}>
          <Text style={{fontWeight:"bold"}}>Revenue</Text>
          <View style={{flexDirection:"row"}}>
        
            <Text>12.00</Text>
            <Entypo name="arrow-long-down" size={21} color="red" />
            <Text>2%</Text>
          </View>
        </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius:10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor:color.deepLightGray,
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  dropDown: {
    overflow: 'hidden',
    paddingHorizontal:10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    paddingVertical: 5,
  },
  reportList:{
    flexDirection:"row",justifyContent:"space-between"
  }
});

export default DropDownComponent;
