import {Linking} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './hooks/useContext/AuthContext';
import Toast from 'react-native-toast-message';
import {store} from './reduxToolkit/store';
import {Provider} from 'react-redux';
import TopLevelStack from './navigation/TopLevelStack';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import IntroScreen from './screens/Intro';
import {getIntro, setIntro} from './database/services/introService';
// import realm from './database';
import SplashScreen from './screens/Splash';
import SyncService from './SyncService';
import useGetRealmData from './hooks/customHooks/useGetRealmData';
import orderSync from './orderSync';
import Sound from 'react-native-sound'
import { PreferenceProvider } from './hooks/useContext/PreferenceContext';
import DrawerStack from './navigation/DrawerStack';
// import {
//   startBackgroundService,
//   stopBackgroundService,
// // } from './utilities/background_action';
// import GetLocation from 'react-native-get-location'
// import { check, PERMISSIONS, request } from 'react-native-permissions';

const queryClient = new QueryClient();
const App = () => {
const [location, setLocation] = useState({})

useEffect(()=>{
  var addissyswellcome = new Sound('addissyswellcome.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    addissyswellcome.play((success)=> {
    if (success) {
      console.log('app started');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  })
  });

  SyncService.generateSessioId()
  SyncService.syncProductsFromServerToLocalDB()
  SyncService.syncProductsWithServer()
//   GetLocation.getCurrentPosition({
//     enableHighAccuracy: true,
//     timeout: 15000,
// })
// .then(location => {
//     console.log(location);
// })
// .catch(error => {
//     const { code, message } = error;
//     console.warn(code, message);
// })
},[])




console.log('location', location)

  const [splashScreen, setSplashScreen] = useState(true);
  const [introState, setIntroState] = useState(getIntro());
  getIntro();

  const linking = {
    prefixes: ['addissystems.mpos://', 'http://www.addissystems.mpos.com'],
    config: {
      screens: {
        LoginStack: 'login',
      },
    },
  };

  // useEffect(() => {set
  //   const handleDeepLink = async () => {
  //     const url = await Linking.getInitialURL();
  //     if (url) {
  //       // Handle the deep link URL and navigate to the appropriate screen
  //       console.log(url);
  //     } else {
  //       console.log(null);
  //     }
  //   };

  //   handleDeepLink();

  //   Linking.addEventListener('url', handleDeepLink);

  //   return () => {
  //     Linking.removeEventListener('url', handleDeepLink);
  //   };
  // }, []);
     
    useEffect(() => { 
    // Start auto-sync when the component mounts
    SyncService.startAutoSync();
    //orderSync.startAutoSync();
    
    // Stop auto-sync when the component unmounts
    return () => {
      SyncService.stopAutoSync();
    };
  }, []);
   
  return splashScreen ? (
    <SplashScreen setSplashScreen={setSplashScreen} />
  ) : !introState?.started ? (
    <IntroScreen setIntroState={setIntroState} />
  ) : (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PreferenceProvider>
        <AuthProvider>
        
          <NavigationContainer linking={linking}>
            <DrawerStack />
            <Toast />
          </NavigationContainer>
        </AuthProvider>
        </PreferenceProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

