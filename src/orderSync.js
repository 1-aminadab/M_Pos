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
import {
  deleteFromOrderedItems,
  getOrderedItems,
} from './database/services/soldItemService';
import axios from 'axios';

class SyncService {
  constructor() {
    this.debouncedAutoSync = debounce(this.autoSync, 30000);
  }

  //   async oneTimeSyncService() {
  //     try {
  //       const syncProducts = await AsyncStorage.getItem('productOneTimeSync');

  //       if (syncProducts) {
  //         return null;
  //       } else {
  //         const localData = getItems();
  //         await AsyncStorage.setItem('offlineProducts', JSON.stringify(localData));
  //         await AsyncStorage.setItem('productOneTimeSync', 'true');
  //         logWithTimestamp('One-time sync completed successfully');
  //       }
  //     } catch (error) {
  //       console.error('Error in OneTimeSyncService:', error);
  //     }
  //   }

  startAutoSync(interval = 30000) {
    this.autoSyncInterval = setInterval(() => {
      this.performSync();
      this.syncProductsFromServerToLocalDB();
      this.syncOrderToserverFromDB();
      //  this.oneTimeSyncService();
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
      }
    } catch (error) {
      console.error('Error during auto-sync:', error);
    }
  };

  syncProductsWithServer = async () => {
    try {
      const offlineProducts = await this.loadProductsFromStorage();

      // if (offlineProducts.length > 0) {
      //  // const sendResult = await this.sendProductsToServer(offlineProducts);
      //   // if (sendResult.success) {
      //   //   await clearLocalStorage('offlineOrders');
      //   } else {
      //   }
      // }
    } catch (error) {
      console.error('Error syncing products:', error);
    }
  };

  loadProductsFromStorage = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('offlineOrders');

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
      const serverUrl = 'https://mpos-erp.addissystems.et/create/customer/sales_order/data';
      const headers = {
        'Content-Type': 'application/json',
        Cookie: `session_id=${sessionId}`,
      };
      const requestData = {
        "partner_id": 1,
        "company_id": 1,
        "order_line": products.passedData.map(product => {

          return [0,0,{ product_id: product.oddo_template_id, product_uom_qty: product.quantity }]}),
      };
      const response = await axios.post(serverUrl, requestData, {
        headers: headers,
        withCredentials: true,
      });
      console.log("order sync respons", response.data);
      logWithTimestamp('Server Response:', response);
      return response.data
    } catch (error) {
      console.error('Error sending order to server:', error);
      return error;
    }
  };
  
  syncOrderToserverFromDB = async () => {
    try {
      const OrderItems = getOrderedItems();
      if (OrderItems.length <= 0) {
        return;
      }
      console.log('here we go orderItems', OrderItems);
      OrderItems.forEach(async soldItem => {
        try {
          const response = await this.sendProductsToServer(soldItem);
          console.log('the response', response);
          if (response) {
            console.log('Sold item synced successfully:', soldItem);
            deleteFromOrderedItems(soldItem.soldItemID);

          } else {
            console.error('Failed to sync sold item:', soldItem);
          }
        } catch (error) {
          console.error('Error syncing sold item:', error);
        }
      });
    } catch (error) {
      console.error('Error retrieving sold items from local database:', error);
      // Handle errors related to retrieving data from the local database
    }
  };

  checkNetworkConnectivity = async () => {
    try {
      const state = await checkNetworkConnectivity();
      return state.isConnected;
    } catch (error) {
      console.error('Error checking network connectivity:', error);
      return false;
    }
  };

  syncProductsFromServerToLocalDB = async () => {
    try {
      const isConnected = await this.checkNetworkConnectivity();
      if (isConnected) {
        const serverProducts = await this.fetchProductsFromServer();
        this.saveProductsToLocalDB(serverProducts);
      }
    } catch (error) {
      console.error('Error during auto-sync from server to local DB:', error);
    }
  };

  fetchProductsFromServer = async () => {
    try {
      const serverUrl = 'https://odooconfig.qa.addissystems.et/get_products/2';
      const response = await performGetRequest(serverUrl);
      // console.log('response', response)
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

  saveProductsToLocalDB = async products => {
    try {
      const localData = getItems();

      for (const product of products) {
        if (product.name && typeof product.name === 'string') {
          const existingProduct = localData.filtered(
            `name == "${product.name}"`,
          )[0];

          if (!existingProduct) {
            const newItem = {
              name: product.name,
              _id: this.generateUniqueID(),
              price: Number(product.price) || 0,
              cost: Number(0) || 0,
              quantity: Number(0) || 0,
              image: 'newProductData.image',
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
            updateItem(existingProduct._id, {
              name: product.name,
              price: product.list_price,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error saving products to local DB:', error);
    }
  };
}

export default new SyncService();
