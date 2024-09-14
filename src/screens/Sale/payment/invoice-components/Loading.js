import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Loader5 from '../Loader5';
import { color } from '../../../../styles/Styles';

const LoadingScreen = () => (
  <View style={styles.loadingContainer}>
    <View style={styles.loaderContainer}>
      <Text style={{fontSize:17, fontWeight:"bold", color:color.primary}}>Creating Invoice...</Text>
      <Loader5/>
      <Text style={styles.loadingText}>Invoice creation almost complete. Please wait a moment...</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0', // Light gray background color
  },
  loaderContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width:"100%",
    height:"100%"
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#777', // Dark gray text color
  },
});

export default LoadingScreen;
