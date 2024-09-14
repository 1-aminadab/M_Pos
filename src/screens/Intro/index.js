import {View, Text, StyleSheet, Animated, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import Button from '../../components/button/Button';
import {color, fontSize} from '../../styles/Styles';
import {getIntro, setIntro} from '../../database/services/introService';
import { createPersist } from '../../database/services/persistService.js';
const slides = [
  {
    key: 'slide1',
    title: 'Track Your Sale at Home',
    text: 'Seamlessly monitor sales with AddisSystems, right from the comfort of your home.',
    image: require('../../assets/images/addproduct.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'slide2',
    title: 'Generate Electronic Invoice',
    text: 'Effortlessly Create digital invoices quickly and easily for smooth transactions',
    image: require('../../assets/images/sellyourproduct.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'slide3',
    title: 'Safe Cloud Storage',
    text: 'Taking your shop to a new heights. Securely store and accessible management.',
    image: require('../../assets/images/scanme.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'slide4',
    title: 'Inventory Management',
    text: 'Simplify stock control with AddisSystems efficient inventory management tools.',
    image: require('../../assets/images/configureinventory.png'),
    backgroundColor: '#febe29',
  },
  // Add more slides as needed
];

const IntroScreen = ({setIntroState}) => {
  const [localIntro, setLocalIntro] = useState(getIntro().started);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeInAnimation = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    });

    Animated.parallel([fadeInAnimation]).start();
  });

  function handleStart() {
    setIntro({started: true});
    setIntroState({started: true});
    setLocalIntro(getIntro().started);
  }
  useEffect(()=>{
    const createPersistData = async()=>{
      await createPersist()
    }
    createPersistData()
   },[])

  const renderItem = ({item, index}) => (
    <Animated.View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fadeAnim,
      }}>
      <Image
        style={{width: 250, height: 250}}
        resizeMode="contain"
        source={item.image}
      />
      <View
        style={{marginTop: 20, paddingHorizontal: 25, alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '700',
            color: color.secondary,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: 'center',
            paddingHorizontal: 25,
            opacity: 0.7,
          }}>
          {item.text}
        </Text>
      </View>
      <View
        style={{
          //   flex: 1,
          width: '100%',
          maxWidth: 350,
          marginTop: 15,
          paddingHorizontal: 25,
        }}>
        {index == slides.length - 1 && (
          <Button
            theme={'secondary'}
            label={'Get Started'}
            height={42}
            fontSize={17}
            onPress={handleStart}
          />
        )}
      </View>
    </Animated.View>
  );

  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        zIndex: 0,
      }}>
      <TouchableOpacity onPress={handleStart} style={styles.skipButton}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
         
        activeDotStyle={{backgroundColor: color.primary}}
        dotStyle={{backgroundColor: color.Neutral_90}}
        renderNextButton={() => {
          return <Text style={styles.controlTextStyle}>Next</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlTextStyle: {
    marginTop: 0,
    color: color.primary,
    borderWidth: 1,
    borderColor: color.lightPrimary,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 16,
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  startTextStyle: {
    marginTop: 0,
    color: color.primary,
    fontWeight: '600',
    fontSize: 18,
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },

  skipButton: {
    zIndex: 50,
    position: 'absolute',
    top: 15,
    right: 10,
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  skipText: {fontSize: 15, fontWeight: '500', color: color.gray},
});

export default IntroScreen;
