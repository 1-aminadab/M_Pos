import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Clipboard } from 'react-native';
import { color } from '../../../styles/Styles';

const RandomOrderCard = ({onClick, newOrderID, message}) => {
  const [orderId, setOrderId] = useState(generateOrderId());
  const [buttonText, setButtonText] = useState('Copy');

  // Function to generate a random order ID
  function generateOrderId() {
    return Math.floor(100000000 + Math.random() * 900000000).toString(); // Generates a 6-digit random number
  }

  // Function to handle the "Copy" button click
  const handleCopyClick = () => {
    Clipboard.setString(orderId); // Copy the order ID to the clipboard
    setButtonText('Copied'); // Change the button text to "Copied"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
      <View style={styles.orderIdContainer}>
        <Text style={styles.label}>Order ID:</Text>
        <Text style={styles.orderId}>{orderId}</Text>
      </View>
      <TouchableOpacity onPress={handleCopyClick} style={[styles.copyButton,{backgroundColor:"#ddd"}]}>
        <Text style={styles.copyButtonText}>{buttonText}</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onClick} style={[styles.copyButton,{backgroundColor:"#ddd"}]}>
        <Text style={styles.copyButtonText}>Ok</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:90,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    
    elevation: 3,
    width:'100%',
    gap:10
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 5,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  copyButton: {
    background:"ddd",
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    paddingHorizontal:15
  },
  copyButtonText: {
    color: color.primary,
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default RandomOrderCard;
