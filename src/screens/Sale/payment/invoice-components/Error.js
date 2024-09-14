import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { color } from '../../../../styles/Styles';

const ErrorScreen = ({ onTryAgain, proccedToPay }) => (

  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>😟 Oops! Something went wrong</Text>
    <Text style={styles.errorMessage}>
      We couldn't create the invoice. Please check your connection and try again.
    </Text>
    <View style={{flexDirection:"row", gap:10}}>
    <TouchableOpacity onPress={()=>proccedToPay(true)} style={[styles.tryAgainButton,{backgroundColor:color.primary}]}>
      <Text style={[styles.tryAgainButtonText,{color:color.white}]}>Procced to pay</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onTryAgain} style={styles.tryAgainButton}>
      <Text style={styles.tryAgainButtonText}>Try Again</Text>
    </TouchableOpacity>
   
    </View>
  </View>
);

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Red background color
    padding: 20,
    borderRadius: 10,
  },
  errorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  errorMessage: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
  tryAgainButton: {
    backgroundColor: '#f005',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  tryAgainButtonText: {
    color: 'white', // Red button text color
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ErrorScreen;
