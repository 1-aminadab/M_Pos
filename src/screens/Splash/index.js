import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, StyleSheet, Animated} from 'react-native';
import {color} from '../../styles/Styles';
import { StatusBar } from 'react-native';
import { theme } from '../../styles/stylesheet';

const SplashScreen = ({navigation, setSplashScreen}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideDown = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    });

    const slideUpAnimation = Animated.timing(slideAnim, {
      toValue: 30,
      duration: 1000,
      useNativeDriver: true,
    });

    const slideDownAnimation = Animated.timing(slideDown, {
      toValue: -25,
      duration: 1200,
      useNativeDriver: true,
    });

    Animated.parallel([
      fadeInAnimation,
      slideUpAnimation,
      slideDownAnimation,
    ]).start();

    const timer = setTimeout(() => {
      setSplashScreen(false);
      // navigation.navigate('home-screen'); // Replace 'MainScreen' with your desired screen name
    }, 3000);
    return () => clearTimeout(timer);
  }, [fadeAnim, navigation, slideAnim, slideDown]);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={theme.color.white}
        barStyle={'dark-content'}
      />
      <View style={{ position: 'relative', }}>
  <Image
    source={require('../../assets/icons/vectorimg4.png')}
    resizeMode="contain"
    style={{
      height: 200,
      width: 210,
      position: 'absolute',
      top: -280,
      left: -6,
      zIndex: 1, 
    }}
  />
</View>
      <View style={{gap: 55,justifyContent:'center', alignItems:"center"}}>
        <Animated.Image
          style={{
            width: 130,
            height: 130,
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          }}
          resizeMode="contain"
          source={require('../../assets/images/logo-02.png')}
        />
        <Animated.Text
          style={{
            textAlign: 'center',
            fontSize: 28,
            fontWeight: '600',
            color: color.secondary,
            opacity: fadeAnim,
            transform: [{translateY: slideDown}],
          }}>
          <Text style={{color: color.primary}}>Addispay </Text>MPOS
        </Animated.Text>
      </View>

      <View style={{ position: 'relative', }}>
  <Image
    source={require('../../assets/icons/vectorimg3.png')}
    resizeMode="contain"
    style={{
      height: 200,
      width: 210,
      position: 'absolute',
      bottom: -250,
      right: -25,
      zIndex: 1, 
    }}
  />
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
