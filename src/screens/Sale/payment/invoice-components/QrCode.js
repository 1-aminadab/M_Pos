import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { color } from '../../../../styles/Styles';
import AlertPopupTop from './InvoiceAlert';

const SuccessScreen = ({ onProceed }) => (
  <View style={styles.successContainer}>

    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>🎉 Order Succesfully Sync</Text>
      <Text style={styles.subheaderText}>Thank you for your purchase!</Text>
    </View>
    {/* <QRCode value="InvoiceData" size={200} /> */}
    {/* <Text style={styles.successText}>🚀 Success!</Text> */}
    <TouchableOpacity onPress={()=>onProceed(true)} style={styles.proceedButton}>
      <Text style={styles.proceedButtonText}>Proceed to pay</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.deepLightGray, // Green background color
    padding: 20,
    borderRadius: 10,
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  subheaderText: {
    fontSize: 16,
    color: '#D8D8D8', // Light gray text color
  },
  successText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  proceedButton: {
    backgroundColor: '#2196F3', // Blue button color
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  proceedButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SuccessScreen;
