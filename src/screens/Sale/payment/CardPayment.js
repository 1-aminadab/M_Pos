import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Animated, Easing, NetInfo } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const InvoiceComponent = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // Defaulting to true for demonstration

  // Animation values
  const translateY = new Animated.Value(200);
  const opacity = new Animated.Value(0);

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveUp = () => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating a successful operation
        // You can replace this with actual API calls for creating the invoice
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setSuccess(true);
      } catch (error) {
        // Simulating a failed operation
        setSuccess(false);
      } finally {
        setLoading(false);
        fadeIn();
        if (success) {
          moveUp();
        }
      }
    };

    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    fetchData();

    // Unsubscribe when the component unmounts
    return () => {
      unsubscribe();
    };
  }, [success]);

  const renderLoadingScreen = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#00a8ff" />
      <Text style={styles.loadingText}>Creating Invoice...</Text>
    </View>
  );

  const renderSuccessScreen = () => (
    <Animated.View style={[styles.successContainer, { opacity, transform: [{ translateY }] }]}>
      <QRCode value="InvoiceData" size={200} />
      <Text style={styles.successText}>Invoice Created Successfully!</Text>
    </Animated.View>
  );

  const renderErrorScreen = () => (
    <Animated.View style={[styles.errorContainer, { opacity, transform: [{ translateY }] }]}>
      {isConnected ? (
        <>
          <Text style={styles.errorText}>Error: Unable to create invoice.</Text>
          <TouchableOpacity onPress={() => fetchData()} style={styles.tryAgainButton}>
            <Text style={styles.tryAgainButtonText}>Try Again</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View>
          <Text style={styles.noConnectionText}>No internet connection. Connect to the internet and try again.</Text>
        </View>
      )}
    </Animated.View>
  );

  // Ensure that you return the appropriate screen based on the current state
  return (
    <View style={styles.container}>
      {loading && renderLoadingScreen()}
      {!loading && success && renderSuccessScreen()}
      {!loading && !success && renderErrorScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
  },
  successContainer: {
    backgroundColor: 'rgba(144, 238, 144, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  successText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 99, 71, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    marginBottom: 10,
  },
  tryAgainButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  tryAgainButtonText: {
    color: 'rgba(255, 99, 71, 1)',
    fontWeight: 'bold',
  },
  noConnectionText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default InvoiceComponent;
