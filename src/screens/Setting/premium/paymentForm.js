import React, { useState } from 'react';
import { View, Text, TextInput, Button, Animated, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { color } from '../../../styles/Styles';

const PremiumForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [paymentType, setPaymentType] = useState('Monthly');
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [bankDetail, setBankDetail] = useState(null);
  const [selectedBank, setSelectedBank] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
    // For demonstration, let's assume the form is submitted successfully
    setPaymentStatus(true);
    handleAnimation();
  };

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const togglePaymentType = () => {
    setPaymentType(paymentType === 'Monthly' ? 'Yearly' : 'Monthly');
  };

  const handleBankSelect = (bank) => {
    if (bankDetail === bank) {
      setBankDetail(null);
    } else {
      setBankDetail(bank);
    }
  };
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  const toggleX = isEnabled ? 24 : 4;
  const renderBankDetail = () => {
    if (!bankDetail) return null;
    return (
      <View style={styles.bankDetail}>
        <Text style={styles.bankDetailText}>Bank Account Number:</Text>
        <TextInput
          style={styles.bankDetailInput}
          placeholder="Enter account number"
          keyboardType="numeric"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.paymentTypeContainer}>
        <Text style={{color:color.deepLightGray}}>pay monthly</Text>
      <TouchableOpacity onPress={toggleSwitch} style={styles.toggleContainer}>
      <Animated.View style={[styles.toggleButton, { transform: [{ translateX: toggleX }] }]} />
    </TouchableOpacity>
    <Text style={{color:color.deepLightGray}}>pay Yearly</Text>

      </View>

      <View style={styles.paymentTextContainer}>
        <Text style={styles.paymentText}>Payment:</Text>
      </View>

      

       

        <Text style={styles.bankDetailTitle}>Card Details:</Text>
        <Button title={showCardDetails ? "Hide Card Details" : "Show Card Details"} onPress={() => setShowCardDetails(!showCardDetails)} />

        {showCardDetails &&
          <ScrollView horizontal={true} style={styles.bankScrollContainer}>
            <TouchableOpacity style={styles.bankButton} onPress={() => handleBankSelect('Bank 1')}>
              <Text style={styles.bankButtonText}>Bank 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bankButton} onPress={() => handleBankSelect('Bank 2')}>
              <Text style={styles.bankButtonText}>Bank 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bankButton} onPress={() => handleBankSelect('Bank 3')}>
              <Text style={styles.bankButtonText}>Bank 3</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bankButton} onPress={() => handleBankSelect('Bank 4')}>
              <Text style={styles.bankButtonText}>Bank 4</Text>
            </TouchableOpacity>
          </ScrollView>
        }

        {renderBankDetail()}

      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  paymentTypeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection:"row",
    gap:10
  },
  paymentTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentTypeText: {
    fontSize: 20,
    marginRight: 10,
    color: '#333',
  },
  paymentTextContainer: {
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginLeft: 20,
  },
  paymentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  submitButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paymentStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentStatusText: {
    fontSize: 18,
    fontFamily: 'Arial',
    color: '#333',
  },
  paymentStatusValue: {
    fontWeight: 'bold',
    marginLeft: 5,
  },
  animationContainer: {
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  animationText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontFamily: 'Arial',
    color: '#333',
  },
  bankDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  bankScrollContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
  },
  bankButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  bankButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bankDetail: {
    marginTop: 10,
  },
  bankDetailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  bankDetailInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  toggleContainer: {
    width: 50,
    height: 30,
    backgroundColor: '#ccc',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  toggleButton: {
    width: 26,
    height: 26,
    backgroundColor: '#fff',
    borderRadius: 13,
  },
});

export default PremiumForm;
