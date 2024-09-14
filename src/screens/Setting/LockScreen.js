import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from '../../styles/Styles';

const LockScreen = () => {
  const [pin, setPin] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const navigation = useNavigation();
  const [isWrongpin, setIsWrongPin] = useState(false)
  useEffect(() => {
    const retrievePin = async () => {
      try {
        const storedPin = await AsyncStorage.getItem('appLock');
        if (storedPin) {
          const parsedPin = JSON.parse(storedPin).pin;
          setCurrentPassword(parsedPin); // Assuming you meant to update 'setCurrentPassword'
        }
        else{
          navigation.navigate('appLock')
        }
      } catch (error) {
        console.error('Error retrieving pin from AsyncStorage:', error);
        // Handle errors gracefully, e.g., display an error message to the user
      }
    };
  
    retrievePin();
  
    // Optional dependency array:
    // If setCurrentPassword or other state variables that affect pin retrieval change,
    // re-run the effect to fetch the latest pin.
  }, [setCurrentPassword]);
  console.log("saved current password",currentPassword);
  const handleKeyPress = (key) => {
    if (key === 'back') {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 4) {
      setPin(pin + key);
      setIsWrongPin(false)
    }

    if (pin.length === 3 && key !== 'back') {
      // Check if PIN matches the current password
      if (pin + key === currentPassword) {
        navigation.goBack(); // Navigate to desired screen
      } else {
        // Shake the pins and display incorrect passcode text
        setPin('');
        setTimeout(() => setPin(''), 1000);
        setIsWrongPin(true)
      }
    }
  };

  const removeIcon = <FontAwesome5 name="backspace" size={24} color="white" />;
  const screenWidth = Dimensions.get('window').width;
  const keypadButtonWidth = screenWidth * 0.2; // Adjust as needed to fit 3 buttons in a row

  const renderKeypadButton = ({ item }) => (
    <TouchableOpacity
      style={[styles.keypadButton, { width: keypadButtonWidth }]}
      onPress={() => handleKeyPress(item)}
    >
      <Text style={[styles.keypadText]}>{item === 'back'? removeIcon: item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", width: "100%", gap: 2, padding: 10, marginBottom: 20 }}>
        <Entypo name="lock" size={44} color="white" />
        <Text style={{ color: "white", fontSize: 13 }}>Enter your m-pos Passcode</Text>
      </View>
      <View style={styles.pinContainer}>
        {[...Array(4)].map((_, index) => (
          <View key={index} style={styles.pinInput}>
            <Text style={styles.pinText}>{pin[index] || ''}</Text>
          </View>
        ))}
      </View>
      <View>
        {
          pin.length == 0  && isWrongpin && <Text style={{color:color.red}}>wrong pin</Text>
        }
      </View>
      <FlatList
        data={['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'back']}
        renderItem={renderKeypadButton}
        keyExtractor={(item) => item}
        numColumns={3}
        contentContainerStyle={styles.keypadContainer}
      />
      {pin.length === 4 && <Text style={{ color: 'red' }}>Incorrect passcode</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor:color.primary,
    paddingTop: "20%"

  },
  pinContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  pinInput: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 10,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pinText: {
    fontSize: 24,
  },
  keypadContainer: {
    marginBottom: 20,
    paddingVertical: 10,
  },
  keypadButton: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: color.primary, // Set your desired background color
    borderColor: 'white',
    borderWidth: 2,
    shadowColor: '#000',
    margin: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  keypadText: {
    fontSize: 24,
    color: 'white', // Set your desired text color
  },
});

export default LockScreen;
