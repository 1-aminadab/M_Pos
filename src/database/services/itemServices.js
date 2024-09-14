import realm from '../index';

export const getItems = () => {
  const items = realm.objects('Items');
  return items;
};

export const addItem = item => {
  realm.write(() => {
    realm.create('Items', item);
  });
};

export const updateItem = (itemId, UPDATED_DATA) => {
  realm.write(() => {
    const itemTobeUpdated = realm.objectForPrimaryKey('Items', itemId);
    if (itemTobeUpdated) {
      // itemTobeUpdated._id = itemTobeUpdated._id;
      itemTobeUpdated.name = UPDATED_DATA?.hasOwnProperty('name')
        ? UPDATED_DATA.name
        : itemTobeUpdated.name;
      itemTobeUpdated.price = UPDATED_DATA?.hasOwnProperty('price')
        ? UPDATED_DATA.price
        : itemTobeUpdated.price;
      itemTobeUpdated.quantity = UPDATED_DATA?.hasOwnProperty('quantity')
        ? UPDATED_DATA.quantity
        : itemTobeUpdated.quantity;
      itemTobeUpdated.image = UPDATED_DATA?.hasOwnProperty('image')
        ? UPDATED_DATA.image
        : itemTobeUpdated.image;
      itemTobeUpdated.category_id = UPDATED_DATA?.hasOwnProperty('category_id')
        ? UPDATED_DATA.category_id
        : itemTobeUpdated.category_id;
      itemTobeUpdated.item_variant = UPDATED_DATA?.hasOwnProperty('item_variant')
        ? UPDATED_DATA.item_variant
        : itemTobeUpdated.item_variant;
      itemTobeUpdated.isFavourite = UPDATED_DATA?.hasOwnProperty('isFavourite')
        ? UPDATED_DATA.isFavourite
        : itemTobeUpdated.isFavourite;
      itemTobeUpdated.store = UPDATED_DATA?.hasOwnProperty('store')
        ? UPDATED_DATA.store
        : itemTobeUpdated.store;
      itemTobeUpdated.tag = UPDATED_DATA?.hasOwnProperty('tag')
        ? UPDATED_DATA.tag
        : itemTobeUpdated.tag;
      itemTobeUpdated.cost = UPDATED_DATA?.hasOwnProperty('cost')
        ? UPDATED_DATA.cost
        : itemTobeUpdated.cost;
      itemTobeUpdated.internal_reference = UPDATED_DATA?.hasOwnProperty('internal_reference')
        ? UPDATED_DATA.internal_reference
        : itemTobeUpdated.internal_reference;
      itemTobeUpdated.tax = UPDATED_DATA?.hasOwnProperty('tax')
        ? UPDATED_DATA.tax
        : itemTobeUpdated.tax;
      itemTobeUpdated.vendor = UPDATED_DATA?.hasOwnProperty('vendor')
        ? UPDATED_DATA.vendor
        : itemTobeUpdated.vendor;
    }
  });
};

export const deleteItem = itemId => {
  return new Promise((resolve, reject) => {
    realm.write(() => {
      const itemToBeDeleted = realm.objectForPrimaryKey('Items', itemId);
      if (itemToBeDeleted) {
        realm.delete(itemToBeDeleted);
        resolve();
      } else {
        reject(new Error('Item not found'));
      }
    });
  });
};
