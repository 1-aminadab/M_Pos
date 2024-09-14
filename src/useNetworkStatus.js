// useNetworkStatus.js
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState({
    isConnected: true,
    type: 'unknown',
    effectiveType: 'unknown',
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetworkStatus({
        isConnected: state.isConnected,
        type: state.type,
        effectiveType: state.effectiveType,
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return networkStatus;
};
