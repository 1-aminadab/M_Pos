import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';
export const PreferenceContext = createContext();
import Toast from 'react-native-toast-message';


export const PreferenceProvider = ({ children }) => {
  const [store, setStore] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  
  const SetStore = async (store) => {
    try {
        // SetStore(JSON.stringify(store))
        setStore(store)
        const newstore=JSON.stringify(store)
        await AsyncStorage.setItem('store', newstore);
    } catch (error) {
console.log(error.message)
      Toast.show({
        type: 'error',
        text1: 'store not added',
        text2: error.message,
      });
    }
  };

  const Update = async () => {
    try {
      let store = await AsyncStorage.getItem('store');

      store = JSON.parse(store);
      if (store) {
        setStore(store)

      }
    } catch (error) {
      console.log('store error' + error);
    }
  };
console.log(AsyncStorage.getItem('store'))
  useEffect(() => {
    Update();
  }, []);

  return (
    <PreferenceContext.Provider
      value={{
        Update,
        store,
        SetStore,
      }}>
      {children}
    </PreferenceContext.Provider>
  );
};
