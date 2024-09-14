import AsyncStorage from '@react-native-async-storage/async-storage';
import {getItems, updateItem} from './database/services/itemServices';
import realm from './database/index';
import {
  debounce,
  clearLocalStorage,
  checkNetworkConnectivity,
  performGetRequest,
  performPostRequest,
  formatDate,
  logWithTimestamp,
} from './syncFunctions';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import {
  createNotification,
  deleteNotification,
  getNotificationData,
} from './database/services/notificationService';

class SyncService {
  constructor() {
    this.debouncedAutoSync = debounce(this.autoSync, 30000);
  }

  async oneTimeSyncService() {
    try {
      const syncProducts = await AsyncStorage.getItem('productOneTimeSync');

      if (syncProducts) {
        return null;
      } else {
        const localData = getItems();
        await AsyncStorage.setItem(
          'offlineProducts',
          JSON.stringify(localData),
        );
        await AsyncStorage.setItem('productOneTimeSync', 'true');
        logWithTimestamp('One-time sync completed successfully');
        console.log('One-time sync completed successfully');
      }
    } catch (error) {
      console.error('Error in OneTimeSyncService:', error);
    }
  }

  startAutoSync(interval = 30000) {
    this.autoSyncInterval = setInterval(() => {
      this.performSync();
      this.oneTimeSyncService();
    }, interval);
  }

  stopAutoSync() {
    clearInterval(this.autoSyncInterval);
  }
  performSync = async () => {
    try {
      const isConnected = await checkNetworkConnectivity();
      if (isConnected) {
        await this.syncProductsWithServer();
        //await this.syncProductsFromServerToLocalDB()
      }
    } catch (error) {
      console.error('Error during auto-sync:', error);
    }
  };

  syncProductsWithServer = async () => {
    try {
      const offlineProducts = await this.loadProductsFromStorage();

      if (true) {
        const sendResult = await this.sendProductsToServer(offlineProducts);
        if (sendResult.success) {
          await clearLocalStorage('offlineProducts');
        } else {
          console.error('Error sending products to servr:', sendResult.error);
        }
      }
    } catch (error) {
      console.error('Error syncing products:', error);
    }
  };

  loadProductsFromStorage = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('offlineProducts');
      return storedProducts ? JSON.parse(storedProducts) : [];
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  };

  clearLocalStorage = async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error clearing local storage for ${key}:`, error);
    }
  };

  sendProductsToServer = async products => {
    try {
      const sessionId = await AsyncStorage.getItem('sessionId');
      console.log('sessionId for sending product', sessionId);
      const headers = {
        'Content-Type': 'application/json',
        Cookie: `session_id=${sessionId}`,
      };

      const convertImageToBase64 = async imagePath => {
        try {
          const response = await RNFetchBlob.fs.readFile(imagePath, 'base64');
          const base64Data = response;
          return base64Data;
        } catch (error) {
          console.error('Error converting image to base64:', error);
          return null;
        }
      };

      const handleConversion = async imagePath => {
        const convertedBase64 = await convertImageToBase64(imagePath);
        console.log('here is converted data', convertedBase64);
        return convertedBase64;
      };

      const serverUrl =
        'https://mpos-erp.addissystems.et/addisystems/create/product/data';

      for (const product of products) {
        console.log('/////////////////////');
        const convertedImage = await handleConversion(product.image);
        console.log(convertedImage);
        console.log('/////////////////////');

        const requestData = {
          company_id: 1,
          location_id: 8,
          detailed_type: 'product',
          name: product.name,
          list_price: product.price,
          standard_price: product.cost,
          quantity: product.quantity,
          image_1920: convertedImage,
        };

        const response = await axios.post(serverUrl, requestData, {
          headers: headers,
          withCredentials: true,
        });
        console.log('Server Response:', response.data);
      }

      return {success: true};
    } catch (error) {
      console.error('Error sending products to server:', error);
      return {success: false, error: error.message};
    }
  };

  checkNetworkConnectivity = async () => {
    try {
      const state = await checkNetworkConnectivity();
      return state.isConnected;
    } catch (error) {
      console.error('Erro checking network connectiviy:', error);
      return false;
    }
  };
  // Order sync
  syncOrderToServer = async order => {
    try {
      const isConnected = await this.checkNetworkConnectivity();

      if (isConnected) {
        const serverUrl = '';
        const order = await performPostRequest(serverUrl, order);
      }
    } catch (error) {
      console.error('Error Syncing Order:', error);
    }
  };
  //

  syncProductsFromServerToLocalDB = async () => {
    //   const isConnected = await NetInfo.isConnected.fetch();

    // if (!isConnected) {
    //   console.log("No internet connection");
    //   return; // Exit the function if there is no internet connection
    // }
    // setTimeout(() => {

    // }, 5000);
    try {
      const sessionId = await AsyncStorage.getItem('sessionId');
      console.log('sessionId localmodal', sessionId);
      const url =
        'https://mpos-erp.addissystems.et/AddisSystems/MPoS/get_products_by_company/1';
      const headers = {
        'Content-Type': 'application/json',
        Cookie: `session_id=${sessionId}`,
      };
      await axios
        .post(
          url,
          {},
          {
            headers: headers,
            withCredentials: true,
          },
        )
        .then(res => {
          this.saveProductsToLocalDB(res.data.result);
        })
        .catch(error => {
          console.error('the error', error);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  generateSessioId = async () => {
    const url = 'https://app.zmart.addissystems.et/web/session/authenticate';

    try {
      const data = {
        jsonrpc: '2.0',
        method: 'call',
        params: {
          db: 'mpos',
          login: 'addis_systems',
          password: 'addis_systems_administrator_password',
        },
        id: null,
      };

      const headers = {
        'Content-Type': 'application/json',
      };

      const response = await axios.post(
        'https://mpos-erp.addissystems.et/web/session/authenticate',
        data,
        {headers},
      );

      const session_id = response.headers['set-cookie'].find(cookie =>
        cookie.includes('session_id'),
      );
      const session_id_parts = session_id.split(';');
      const session_id_value = session_id_parts[0].split('=')[1];

      //const cookies = {session_id: session_id_value};
      // console.log(cookies);
      await AsyncStorage.setItem('sessionId', session_id_value);
    } catch (error) {
      console.error('Error authenticating:', error);
    }
  };
  fetchProductsFromServer = async () => {
    try {
      const serverUrl = 'https://odooconfig.qa.addissystems.et/get_products/2';
      const response = await performGetRequest(serverUrl);
      return response ? response.products : [];
    } catch (error) {
      console.error('Error fetching products from server:', error);
      return [];
    }
  };

  addItems = item => {
    try {
      realm.write(() => {
        realm.create('Items', item);
      });
    } catch (error) {
      console.error('Error adding item to Realm:', error);
    }
  };

  generateUniqueID = () => {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 1000);
    return timestamp + randomNum.toString();
  };

  checkNotificationsStatus = (notification,name, quantity) => {
    console.log(quantity, name)

    const allNotification = getNotificationData();
    let shouldExit = false
    console.log(allNotification.length)
    allNotification.forEach(notificaiton => {
        console.log("here we go again");
        if (notificaiton.product_name === name) {
          if(quantity > 10){
            shouldExit = true;
           return deleteNotification(notificaiton.id)
          }
          if(quantity <= 10){
            shouldExit = true;
            return
          }
        }
        
    });
    
    // Exit from the function
    if (shouldExit) {
      return; 
    }
    if(quantity <= 10){
      console.log("about to send");
      createNotification(notification)
     
    }
  };

  saveProductsToLocalDB = async products => {
    try {
      const localData = getItems();

      for (const product of products) {
       // console.log(product.quantity_on_hand);
          const notification = {
            id: this.generateUniqueID(),
            recepient_id: 'string',
            title: 'Low stock level',
            body: `${product.product_name} low in stock`,
            action: 'Check Item',
            link: 'stock-in',
            seen: false,
            time: new Date(),
            type: 'inventory',
            product_name:product.product_name
          };

         this.checkNotificationsStatus(notification, product.product_name,product.quantity_on_hand )
        
        if (product.product_name && typeof product.product_name === 'string') {
          const existingProduct = localData.filtered(
            `name == "${product.product_name}"`,
          )[0];

          if (!existingProduct) {
            //console.log('new about to added');
            const newItem = {
              name: product.product_name,
              _id: this.generateUniqueID(),
              price: Number(product.price) || 0,
              cost: Number(0) || 0,
              quantity: Number(product.quantity_on_hand) || 0,
              image: product.product_image,
              oddo_template_id: product.product_id,
              isFavourite: false,
              category_id: Number(1702037112815406),
              store: Number(1702037112815406),
              tag: 'tag',
              item_variant: '[]',
              internal_reference: 'reference',
              tax: Number(0) || 0,
              vendor: 'vendor',
              sales: 0,
              timestamp: Date.now().toString(),
            };
            await this.addItems(newItem);
          } else {
            //console.log('exissting item about to added');
            updateItem(existingProduct._id, {
              name: product.product_name,
              price: product.price,
              image: product.product_image,
            });
          }
        }
      }
      //console.log("product added successfully");
    } catch (error) {
      console.error('Error saving products to local DB:', error);
    }
  };
}

export default new SyncService();
