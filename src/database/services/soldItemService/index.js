import moment from 'moment';
import realm from '../../index';
import soldItemsDataConvertor from '../../../utilities/soldItemDataConverter';

export const getSoldItems = () => {
  const items = realm.objects('Sold_Items').filtered('payment_status == true');
  return items;
};
export const getAllSoldItems = () => {
  const items = realm.objects('Sold_Items')
  return items;
};
export const addToSoldItems = item => {
  realm.write(() => {
    realm.create('Sold_Items', item);
  });
};

// Sold Items filtered by date, you will input days earlier befor today in number. for ex sold items of the last 7 days, in this case the input will be 7
export const filteredSoldItems = earlierDay => {
  const today = new Date();
  const lastDay = new Date(today);
  lastDay.setDate(today.getDate() - parseInt(earlierDay));
  const lastToday = new Date(today);
  lastToday.setHours(0, 0, 0, 0);

  startDate = moment
    .utc(earlierDay > 0 ? lastDay : lastToday, 'DD-MM-YYYY')
    .toDate();
  endDate = moment.utc(today, 'DD-MM-YYYY').toDate();
  const soldItemsInRange = realm
    .objects('Sold_Items')
    .filtered(
      'payment_status == true && sold_date >= $0 AND sold_date <= $1',
      startDate,
      endDate,
    );

  return soldItemsDataConvertor(soldItemsInRange);
};

export const UpdateSoldItemHistory = (soldItemID, Update) => {
  console.log(soldItemID);
  console.log("sold item id ther we go ");
  realm.write(() => {
    const soldItemData = realm.objectForPrimaryKey('Sold_Items', soldItemID);
    console.log("is null"+ soldItemData);
    if (soldItemData) {
      soldItemData.payment_status = Update.hasOwnProperty('payment_status')
        ? Update.payment_status
        : soldItemData.payment_status;
      soldItemData.sub_total = Update.hasOwnProperty('sub_total')
        ? Update.sub_total
        : soldItemData.sub_total;
      }
      soldItemData.acknowledged = Update.hasOwnProperty('acknowledged')
        ? Update.acknowledged
        : soldItemData.acknowledged;
  });
};

export const deleteFromSoldItems = async (soldItemID) => {
  console.log("item to be deleted", soldItemID);

  try {
    realm.write(() => {
      const itemToBeDeleted = realm.objectForPrimaryKey('Sold_Items', soldItemID);
      console.log("item to be deleted", itemToBeDeleted);
      if (itemToBeDeleted) {
        
        realm.delete(itemToBeDeleted);
      }
    });
  } catch (error) {
    console.error("Error deleting item:", error);
    // Handle the error appropriately, e.g., return an error response
  }


};

// 
export const addToOrderedItems = order => {
  console.log("order",order);
  try {
    realm.write(()=> {
  realm.create('Ordered_items',order)
})
  } catch (error) {
    console.log("error Creating Order",error);
  }

}

export const getOrderedItems = ()=>{
  try {
    const orders  = realm.objects('Ordered_items')
   return orders
  } catch (error) {
     console.log("get order item error", error)
  }
  
}

export const deleteFromOrderedItems = soldItemID => {
  realm.write(() => {
    const itemToBeDeleted = realm.objectForPrimaryKey('Ordered_items', soldItemID);
    if (itemToBeDeleted) {
      realm.delete(itemToBeDeleted);
    }
  });
};
