import realm from '../../';

export const getStore = () => {
  const store = realm.objects('StoreManagement');
  if (store) {
    return store;
  }
  return '0'; // Return 0 if the category object doesn't exist or the amount is not set
};

export const addStore = newStore => {
  realm.write(() => {
    realm.create('StoreManagement', newStore);
  });
};

export const updateStore = async (name, license, address) => {
  realm.write(() => {
    const storeTobeUpdated = realm.objectForPrimaryKey('StoreManagement', license);
    if (storeTobeUpdated) {
      storeTobeUpdated.license = newCustomerObject?.hasOwnProperty('license')
        ? newCustomerObject.license
        : storeTobeUpdated.license;
      storeTobeUpdated.name = newCustomerObject?.hasOwnProperty('name')
        ? newCustomerObject.name
        : storeTobeUpdated.name;
      storeTobeUpdated.address = newCustomerObject?.hasOwnProperty('address')
        ? newCustomerObject.address
        :storeTobeUpdated.address;
    }
  });
};

export const deleteStore = ID => {
  realm.write(() => {
    let store = realm.objectForPrimaryKey('StoreManagement', ID);
    if (store) {
      realm.delete(store);
    }
  });
};
