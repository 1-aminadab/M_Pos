import {
  StyleSheet,
  Image,
  Text,
  View,
  StatusBar,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from '../../styles/Styles';
import Button from '../../components/button/Button';
import LinearGradient from 'react-native-linear-gradient';

const ActionSignButtons = ({email, navigation}) => {
   return (
   <View
        style={{
          // alignItems: 'center',
          width: '100%',
          paddingHorizontal: scale(25),
          marginTop: 15,
          gap: 25,
          
        }}>
      
          {email===''?<Button
            theme={'secondary'}
            outlineColor={color.secondary}
            btnBG={color.secondary}
            label={'Sign up'}
            onPress={() => navigation.navigate('SignUp') }
          />:null}
        
          <Button
            theme={'primary'}
            label={'log in'}
            onPress={() =>email === '' ? navigation.navigate('RestoreAccount') : navigation.navigate('LogIn')}
          />
      
      </View>)
}


const WelcomeScreen = ({navigation}) => {
  const [timeLeft, setTimeLeft] = useState(2);
  const DeviceHeight = Dimensions.get('screen').height;
  const [email, setEmail] = useState('');

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(0);
    }, 2000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);
  useEffect(() => {
    if (!timeLeft) {
      // onDisplayNotification();
    }
  }, [timeLeft]);

   async function logEmail() {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
     const userData = JSON.parse(userDataString);
    if(userData && userData.email){
       setEmail(userData.email);
    }else{
      console.log('Email does not exist');
    }
      
    } catch (error) {
      console.error('Error retrieving email:', error);
    }
  }
  logEmail();
  
  return (
    <LinearGradient
      colors={[color.white, color.white]}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        gap: DeviceHeight > 500 ? 50 : 0,
      }}>
      <StatusBar
        translucent
        backgroundColor="rgba(0, 0, 0, 0.0)"
        barStyle="light-content"
      />
      <View style={{ position: 'relative', }}>
  <Image
    source={require('../../assets/icons/vectorimg4.png')}
    resizeMode="contain"
    style={{
      height: 200,
      width: 210,
      position: 'absolute',
      top: -90,
      left: -5,
      zIndex: 1, 
    }}
  />
</View>
      <View style={[{alignItems: 'center', marginTop: 15}]}>
        <Image
          source={require('../../assets/images/logowithname.png')}
          resizeMode="contain"
          style={{height: 200, width: 200}}
        />
        <Text
          style={{
            fontWeight: '600',
            fontSize: 24,
            color: color.white,
            marginTop: -15,
          }}>
          M-POS
        </Text>

      </View>
     
   {/* start */}
   <ActionSignButtons navigation ={navigation} email={email} />
        <View style={{ position: 'relative', }}>
  <Image
    source={require('../../assets/icons/vectorimg3.png')}
    resizeMode="contain"
    style={{
      height: 200,
      width: 210,
      position: 'absolute',
      right: -25,
      top: -30,
      zIndex: 1, 
    }}
  />
</View>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: '#2491CB',
  },
});
