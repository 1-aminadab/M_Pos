// syncFunctions.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

export const debounce = (func, wait) => {
  let timeout;

  return function (...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const clearLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing local storage for ${key}:`, error);
  }
};

export const checkNetworkConnectivity = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    console.error('Error checking network connectivity:', error);
    return false;
  }
};

export const performGetRequest = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
   // console.error(`Error performing GET request to ${url}:`, error);
    return null;
  }
};

export const performPostRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    console.error(`Error performing POST request to ${url}:`, error);
    return null;
  }
};

export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

export const logWithTimestamp = (message) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
};
