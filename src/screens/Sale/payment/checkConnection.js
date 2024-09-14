import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
// import Restart from 'react-native-restart';

const CheckConnection = ({proceed, updateModal}) => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    if(isConnected){
        updateModal(false, false)

    }
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
   
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const handleRefresh = () => {
    console.log("refresh handled")
  };

  const handleProceed = () => {
    console.log('hello there ');
     updateModal(false, true)
    proceed()
   
  };
  
  const handleCancel = () => {
    // Add your logic for cancelling
    console.log('Cancel');
  };

  return (
    <View style={styles.container}>
        <View style={{backgroundColor:"white", padding:10,justifyContent:'center',alignItems:"center"}}>
      <Text style={styles.title}>Internet Check</Text>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>
          Internet Connection: {isConnected ? 'Connected' : 'Disconnected'}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{flexDirection:'row',width:"100%"}}>
        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isConnected ? 'green' : 'gray' }]}
          onPress={()=>handleProceed()}
          
        >
          <Text style={styles.buttonText}>Proceed</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.button]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height:"100%",
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",
     backgroundColor:"#fff3",
    width:"100%",
    zIndex:2
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
  },
  buttonContainer: {
     zIndex:100,
    width: '60%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    margin: 5,
    
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CheckConnection;
